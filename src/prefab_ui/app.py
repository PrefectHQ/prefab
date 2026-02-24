"""PrefabApp — the central application object for Prefab.

Describes what to render, what state to initialize, and what external
assets to load.  Pure data model — transport-agnostic.

Usage::

    from prefab_ui.app import PrefabApp
    from prefab_ui.components import Column, Heading, DataTable

    app = PrefabApp(
        view=Column(Heading("Dashboard"), DataTable(data=users)),
        state={"users": users},
    )

    html = app.html()      # complete self-contained page
    csp = app.csp()        # CSP domains for sandboxed delivery
"""

from __future__ import annotations

import json
from contextvars import ContextVar
from typing import Any

import pydantic_core
from pydantic import BaseModel, Field, model_validator

from prefab_ui.renderer import _get_origin, get_renderer_csp, get_renderer_head
from prefab_ui.themes import Theme

PROTOCOL_VERSION = "0.2"

# ── Initial State ─────────────────────────────────────────────────────

_initial_state: ContextVar[dict[str, Any] | None] = ContextVar(
    "_initial_state", default=None
)


def set_initial_state(**kwargs: Any) -> None:
    """Declare initial client-side state for the current app.

    Called alongside component construction to define the starting
    values that templates like ``{{ name }}`` resolve against::

        set_initial_state(name="world")

        with Card():
            H3("Hello, {{ name }}!")
    """
    current = _initial_state.get()
    if current is None:
        current = {}
        _initial_state.set(current)
    current.update(kwargs)


def get_initial_state() -> dict[str, Any] | None:
    """Retrieve state set by :func:`set_initial_state`, or ``None``."""
    return _initial_state.get()


def clear_initial_state() -> None:
    """Reset the initial-state accumulator."""
    _initial_state.set(None)


_PAGE_TEMPLATE = """\
<!doctype html>
<html lang="en">
<head>
  <title>{title}</title>
{head}
</head>
<body>
  <div id="root" style="max-width:64rem;margin:0 auto;padding:2rem"></div>
  <script id="prefab:initial-data" type="application/json">{data}</script>
</body>
</html>"""


class PrefabApp(BaseModel):
    """A complete Prefab application.

    Describes the view, initial state, reusable component definitions,
    and external assets.  Use ``html()`` to produce a self-contained
    HTML page, or ``to_json()`` for the wire-format envelope.
    """

    title: str = Field(default="Prefab", description="HTML page title")
    view: Any | None = Field(default=None, description="Component tree to render")
    state: dict[str, Any] | None = Field(
        default=None,
        description="Initial client-side state",
    )
    defs: list[Any] | None = Field(
        default=None,
        description="Reusable component definitions (Define instances)",
    )
    stylesheets: list[str] | None = Field(
        default=None,
        description="CSS URLs or inline CSS strings to load in <head>",
    )
    scripts: list[str] | None = Field(
        default=None,
        description="External JS URLs to load in <head>",
    )
    theme: Theme | None = Field(
        default=None,
        description="Theme object with CSS variable overrides",
    )
    connect_domains: list[str] | None = Field(
        default=None,
        description="Domains to allow in CSP connect-src (for Fetch actions)",
    )

    model_config = {"arbitrary_types_allowed": True}

    @model_validator(mode="after")
    def _consume_initial_state(self) -> PrefabApp:
        accumulated = get_initial_state()
        if accumulated:
            clear_initial_state()
            if self.state is None:
                self.state = accumulated
            else:
                # Explicit state= wins; accumulated values fill in gaps
                self.state = {**accumulated, **self.state}

        if self.state is not None:
            for key in self.state:
                if key.startswith("$"):
                    raise ValueError(f"State key {key!r} uses reserved prefix '$'")
        return self

    def to_json(self) -> dict[str, Any]:
        """Produce the Prefab wire format.

        Returns a dict with ``version``, ``view``, ``defs``, and ``state``
        as top-level keys (omitting any that are None).
        """
        result: dict[str, Any] = {"version": PROTOCOL_VERSION}

        if self.view is not None:
            result["view"] = self.view.to_json()

        if self.defs:
            result["defs"] = {d.name: d.to_json() for d in self.defs}

        if self.state is not None:
            result["state"] = pydantic_core.to_jsonable_python(self.state)

        if self.theme is not None:
            result["theme"] = self.theme.to_json()

        return result

    def html(self) -> str:
        """Produce a complete, self-contained HTML page.

        The page includes the Prefab renderer (JS/CSS), any user-specified
        stylesheets and scripts, and the application data baked in as a
        JSON ``<script>`` tag.
        """
        head_parts = [get_renderer_head()]

        if self.stylesheets:
            for entry in self.stylesheets:
                if "{" in entry:
                    head_parts.append(f"  <style>{entry}</style>")
                else:
                    head_parts.append(f'  <link rel="stylesheet" href="{entry}">')

        if self.scripts:
            for url in self.scripts:
                head_parts.append(f'  <script src="{url}"></script>')

        data_json = json.dumps(self.to_json(), separators=(",", ":"))
        # Escape </ to prevent premature closing of the script tag
        safe_json = data_json.replace("</", r"<\/")

        return _PAGE_TEMPLATE.format(
            title=self.title,
            head="\n".join(head_parts),
            data=safe_json,
        )

    def csp(self) -> dict[str, list[str]]:
        """Compute CSP domains from the app's asset configuration.

        Merges the renderer's base CSP with origins extracted from
        ``stylesheets``, ``scripts``, and ``connect_domains``.
        """
        result = get_renderer_csp()

        if self.connect_domains:
            result["connect_domains"] = list(self.connect_domains)

        if self.stylesheets:
            urls = [s for s in self.stylesheets if "{" not in s]
            if urls:
                origins = sorted({_get_origin(url) for url in urls})
                result["style_domains"] = origins

        if self.scripts:
            origins = sorted({_get_origin(url) for url in self.scripts})
            result["script_domains"] = origins

        return result
