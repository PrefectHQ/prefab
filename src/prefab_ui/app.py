"""PrefabApp — the central application object for Prefab.

Describes what to render, what state to initialize, and what external
assets to load.  Pure data model — transport-agnostic.

**Usage:**

```python
from prefab_ui.app import PrefabApp
from prefab_ui.components import Column, Heading, DataTable

app = PrefabApp(
    view=Column(Heading("Dashboard"), DataTable(data=users)),
    state={"users": users},
)

html = app.html()      # complete self-contained page
csp = app.csp()        # CSP domains for sandboxed delivery
```
"""

from __future__ import annotations

import dataclasses
import json
from collections.abc import Callable
from contextvars import ContextVar
from typing import Any

import pydantic_core
from pydantic import BaseModel, Field, PrivateAttr, model_validator

from prefab_ui.renderer import (
    RendererMode,
    _get_origin,
    get_renderer_csp,
    get_renderer_head,
)
from prefab_ui.rx import _sanitize_floats
from prefab_ui.themes import Theme

PROTOCOL_VERSION = "0.2"

# ── Tool Resolver ─────────────────────────────────────────────────────


@dataclasses.dataclass(frozen=True)
class ResolvedTool:
    """Enriched result from a tool resolver.

    Beyond the tool `name`, the resolver can set flags that influence
    how the renderer handles the tool's result.  This keeps the contract
    typed and extensible without allowing arbitrary key injection.
    """

    name: str
    unwrap_result: bool = False


_tool_resolver: ContextVar[Callable[[Any], ResolvedTool] | None] = ContextVar(
    "_tool_resolver", default=None
)


def get_tool_resolver() -> Callable[[Any], ResolvedTool] | None:
    """Return the active tool resolver, or `None`."""
    return _tool_resolver.get()


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


def _serialize_state(state: dict[str, Any]) -> dict[str, Any]:
    """Serialize state for the wire protocol."""
    return {
        key: _sanitize_floats(pydantic_core.to_jsonable_python(value))
        for key, value in state.items()
    }


class PrefabApp(BaseModel):
    """A complete Prefab application.

    Describes the view, initial state, reusable component definitions,
    and external assets.  Use `html()` to produce a self-contained
    HTML page, or `to_json()` for the wire-format envelope.

    Can be used as a context manager to build the component tree inline:

    ```python
    with PrefabApp(state={"count": 0}, css_class="p-6") as app:
        Heading("Dashboard")
        Slider(value=50, name="count")
    ```
    """

    title: str = Field(default="Prefab", description="HTML page title")
    view: Any | None = Field(default=None, description="Component tree to render")
    css_class: str | None = Field(
        default=None,
        description="Extra CSS/Tailwind classes merged onto the pf-app-root wrapper Div",
    )
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
    js_pipes: dict[str, str] | None = Field(
        default=None,
        description="Custom JS pipe functions: name → function expression",
    )
    js_actions: dict[str, str] | None = Field(
        default=None,
        description="Custom JS action handlers: name → function expression",
    )
    on_mount: Any | None = Field(
        default=None,
        description="Action(s) to execute when the app mounts",
    )
    key_bindings: dict[str, Any] | None = Field(
        default=None,
        description=(
            "Keyboard shortcuts mapping key names to actions. "
            "Keys are DOM KeyboardEvent.key values, optionally prefixed "
            "with modifiers: Shift+, Ctrl+, Alt+, Meta+. "
            "Values are actions or lists of actions."
        ),
    )

    _context_root: Any = PrivateAttr(default=None)

    model_config = {"arbitrary_types_allowed": True}

    def __enter__(self) -> PrefabApp:
        if self.view is not None:
            raise RuntimeError(
                "Cannot use PrefabApp as a context manager when view= "
                "is already set. Use either `with PrefabApp():` or "
                "`PrefabApp(view=...)`, not both."
            )
        from prefab_ui.components.div import Div

        root = Div(defer=True)  # type: ignore[call-arg]  # ty:ignore[unknown-argument]
        self._context_root = root
        root.__enter__()
        return self

    def __exit__(self, *args: Any) -> None:
        if self._context_root is not None:
            self._context_root.__exit__(*args)
            self.view = self._context_root
            self._context_root = None

    @model_validator(mode="after")
    def _validate_state(self) -> PrefabApp:
        if self.state is not None:
            for key in self.state:
                if key.startswith("$"):
                    raise ValueError(f"State key {key!r} uses reserved prefix '$'")
        return self

    @classmethod
    def from_json(
        cls,
        wire: dict[str, Any],
        *,
        view: Any | None = None,
        state: dict[str, Any] | None = None,
        defs: list[Any] | dict[str, Any] | None = None,
        theme: Theme | dict[str, Any] | None = None,
    ) -> PrefabApp:
        """Create a PrefabApp from a wire protocol dict.

        Explicit keyword arguments override values from the wire:

        ```python
        wire = await sandbox.run(code)
        app = PrefabApp.from_json(wire, state={"extra": "value"})
        ```
        """
        return cls.model_construct(
            view=view if view is not None else wire.get("view"),
            state=state if state is not None else wire.get("state"),
            defs=defs if defs is not None else wire.get("defs"),
            theme=theme if theme is not None else wire.get("theme"),
        )

    def _wrap_view(self) -> dict[str, Any] | None:
        """Wrap the view in a `Div` with `pf-app-root` and serialize.

        Every PrefabApp view is wrapped in a root `<div>` that carries
        the `pf-app-root` CSS class plus any user-supplied `css_class`.
        Themes target `.pf-app-root` for default padding, background,
        and other app-level styling.

        If the view is already the bare `Div` created by `__enter__`,
        the class is stamped directly onto it (no extra nesting).
        Otherwise a new `Div` wrapper is created around the view.
        """
        if self.view is None:
            return None

        from prefab_ui.components.div import Div

        cls = f"pf-app-root {self.css_class}" if self.css_class else "pf-app-root"

        if isinstance(self.view, dict):
            # Pre-serialized dict — wrap in a serialized Div
            wrapper = Div(css_class=cls, on_mount=self.on_mount)
            wrapper_json = wrapper.to_json()
            wrapper_json["children"] = [self.view]
            return wrapper_json

        if (
            isinstance(self.view, Div)
            and not self.view.css_class
            and not self.view.style
        ):
            # Bare Div from context manager — stamp the class directly
            self.view.css_class = cls
            if self.on_mount is not None:
                self.view.on_mount = self.on_mount
            return self.view.to_json()

        # Wrap the user's view in a new Div
        return Div(
            children=[self.view], css_class=cls, on_mount=self.on_mount
        ).to_json()

    def to_json(
        self,
        *,
        tool_resolver: Callable[[Any], ResolvedTool] | None = None,
    ) -> dict[str, Any]:
        """Produce the Prefab wire format.

        Returns a dict with `$prefab`, `view`, `defs`, and `state`
        as top-level keys (omitting any that are None).

        The view is always wrapped in a root `Div` carrying the
        `pf-app-root` CSS class.  This div is the theme's styling
        target — it provides default padding and can be customized via
        `PrefabApp(css_class="...")`:

        ```python
        # Center a narrow app
        PrefabApp(view=my_view, css_class="max-w-2xl mx-auto")
        ```

        Args:
            tool_resolver: Resolves callable tool references to
                `ResolvedTool` instances during serialization. Scoped to
                this call — safe for concurrent use with different resolvers.
        """
        token = _tool_resolver.set(tool_resolver) if tool_resolver is not None else None
        try:
            result: dict[str, Any] = {
                "$prefab": {"version": PROTOCOL_VERSION},
            }

            wrapped = self._wrap_view()
            if wrapped is not None:
                result["view"] = wrapped

            if self.defs:
                if isinstance(self.defs, dict):
                    result["defs"] = self.defs
                else:
                    result["defs"] = {d.name: d.to_json() for d in self.defs}

            if self.state is not None:
                result["state"] = _serialize_state(self.state)

            if self.theme is not None:
                if isinstance(self.theme, dict):
                    result["theme"] = self.theme
                else:
                    result["theme"] = self.theme.to_json()

            if self.key_bindings:
                from prefab_ui.actions import Action

                serialized: dict[str, Any] = {}
                for key, action in self.key_bindings.items():
                    if isinstance(action, list):
                        serialized[key] = [
                            a.model_dump(by_alias=True, exclude_none=True)
                            if isinstance(a, Action)
                            else a
                            for a in action
                        ]
                    elif isinstance(action, Action):
                        serialized[key] = action.model_dump(
                            by_alias=True, exclude_none=True
                        )
                    else:
                        serialized[key] = action
                result["keyBindings"] = serialized

            return result
        finally:
            if token is not None:
                _tool_resolver.reset(token)

    def html(
        self,
        *,
        renderer_mode: RendererMode | None = None,
        cdn_version: str | None = None,
        pretty: bool = False,
        tool_resolver: Callable[[Any], ResolvedTool] | None = None,
    ) -> str:
        """Produce a complete, self-contained HTML page.

        The page includes the Prefab renderer (JS/CSS), any user-specified
        stylesheets and scripts, and the application data baked in as a
        JSON `<script>` tag.

        `renderer_mode` controls how the renderer is delivered: `"cdn"`
        (lightweight stub loading JS from jsDelivr, pinned to the installed
        version) or `"bundled"` (all JS/CSS inlined, no network needed).
        When `None`, the mode is resolved automatically.

        `cdn_version` overrides the version pinned in CDN URLs. Ignored
        in bundled mode.
        """
        head_parts = [get_renderer_head(mode=renderer_mode, cdn_version=cdn_version)]

        if self.stylesheets:
            for entry in self.stylesheets:
                if "{" in entry:
                    head_parts.append(f"  <style>{entry}</style>")
                else:
                    head_parts.append(f'  <link rel="stylesheet" href="{entry}">')

        if self.scripts:
            for url in self.scripts:
                head_parts.append(f'  <script src="{url}"></script>')

        if self.js_pipes or self.js_actions:
            handler_parts = []
            if self.js_pipes:
                pipe_entries = ",\n    ".join(
                    f"{name}: {body}" for name, body in self.js_pipes.items()
                )
                handler_parts.append(f"  pipes: {{\n    {pipe_entries}\n  }}")
            if self.js_actions:
                action_entries = ",\n    ".join(
                    f"{name}: {body}" for name, body in self.js_actions.items()
                )
                handler_parts.append(f"  actions: {{\n    {action_entries}\n  }}")
            obj = ",\n".join(handler_parts)
            head_parts.append(
                f"  <script>\nwindow.__prefab_handlers = {{\n{obj}\n}};\n  </script>"
            )

        if pretty:
            data_json = json.dumps(
                self.to_json(tool_resolver=tool_resolver),
                indent=2,
            )
        else:
            data_json = json.dumps(
                self.to_json(tool_resolver=tool_resolver),
                separators=(",", ":"),
            )
        # Escape </ to prevent premature closing of the script tag
        safe_json = data_json.replace("</", r"<\/")

        return _PAGE_TEMPLATE.format(
            title=self.title,
            head="\n".join(head_parts),
            data=safe_json,
        )

    def csp(
        self,
        *,
        renderer_mode: RendererMode | None = None,
    ) -> dict[str, list[str]]:
        """Compute CSP domains from the app's asset configuration.

        Merges the renderer's base CSP with origins extracted from
        `stylesheets`, `scripts`, and `connect_domains`.

        `renderer_mode` should match the mode passed to `html()` so
        the CSP allows the same resources the page actually loads.
        """
        result = get_renderer_csp(mode=renderer_mode)

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
