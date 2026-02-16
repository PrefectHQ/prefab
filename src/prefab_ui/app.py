"""PrefabApp — the central application object for Prefab.

Describes what to render, what state to initialize, what actions to fire on
mount, and what external assets to load. Transport-agnostic — the same
PrefabApp can be served via MCP, REST, or the CLI.

Usage::

    from prefab_ui.app import PrefabApp
    from prefab_ui.components import Column, Heading, DataTable

    app = PrefabApp(
        view=Column(Heading("Dashboard"), DataTable(data=users)),
        state={"users": users},
    )

For MCP delivery::

    payload = app.for_mcp()
    # payload.html — renderer HTML (empty shell)
    # payload.csp — CSP domains for sandbox config
    # payload.structured_content — wire format for structuredContent
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any
from urllib.parse import urlparse

import pydantic_core
from pydantic import BaseModel, Field, model_validator

PROTOCOL_VERSION = "0.2"


def _get_origin(url: str) -> str:
    """Extract the origin (scheme + host + port) from a URL."""
    parsed = urlparse(url)
    origin = f"{parsed.scheme}://{parsed.hostname}"
    if parsed.port:
        origin += f":{parsed.port}"
    return origin


@dataclass
class MCPPayload:
    """Payload returned by ``PrefabApp.for_mcp()``.

    Contains everything FastMCP needs to serve a Prefab app:

    - ``html`` — self-contained renderer HTML (empty shell, no data baked in)
    - ``csp`` — CSP domains for the sandbox Content-Security-Policy
    - ``structured_content`` — the Prefab wire format (view, state, etc.)
    """

    html: str
    csp: dict[str, list[str]]
    structured_content: dict[str, Any]


class PrefabApp(BaseModel):
    """A complete Prefab application.

    Describes the view, initial state, lifecycle actions, and deployment
    config. Transport-agnostic — ``for_mcp()`` packages it for MCP,
    ``to_html()`` (future) produces a self-contained HTML page.

    Tools return a PrefabApp (or a bare Component, which gets auto-wrapped).
    Mini-apps and full apps are the same object.
    """

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
        description="External CSS URLs to load in <head>",
    )
    scripts: list[str] | None = Field(
        default=None,
        description="External JS URLs to load in <head>",
    )
    connect_domains: list[str] | None = Field(
        default=None,
        description="Domains to allow in CSP connect-src (for Fetch actions)",
    )
    text: str | None = Field(
        default=None,
        description="Text fallback for non-UI hosts",
    )

    model_config = {"arbitrary_types_allowed": True}

    @model_validator(mode="after")
    def _validate_state_keys(self) -> PrefabApp:
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

        return result

    def for_mcp(self) -> MCPPayload:
        """Package this app for MCP delivery.

        Returns an ``MCPPayload`` containing the renderer HTML (empty shell),
        CSP domains, and structured content. FastMCP consumes this directly —
        it never needs to know about Prefab internals.
        """
        from prefab_ui.renderer import get_renderer_csp, get_renderer_html

        csp = get_renderer_csp()

        if self.connect_domains:
            csp["connect_domains"] = list(self.connect_domains)

        if self.stylesheets:
            origins = sorted({_get_origin(url) for url in self.stylesheets})
            csp["style_domains"] = origins

        if self.scripts:
            origins = sorted({_get_origin(url) for url in self.scripts})
            csp["script_domains"] = origins

        return MCPPayload(
            html=get_renderer_html(),
            csp=csp,
            structured_content=self.to_json(),
        )

    def text_fallback(self) -> str:
        """Generate a plain-text fallback for hosts that don't render UIs."""
        if self.text is not None:
            return self.text
        if self.view is not None:
            return "[UI content]"
        if self.state is not None:
            return str(pydantic_core.to_jsonable_python(self.state))
        return "[No content]"
