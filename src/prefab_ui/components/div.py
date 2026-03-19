"""Generic div and span containers with no default styling."""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import ContainerComponent
from prefab_ui.components.typography import _text_init, _TextComponent


class Div(ContainerComponent):
    """A bare container with no default styling.

    This is the Python equivalent of ``<div className="...">`` in React.
    Use when you need a wrapper with custom Tailwind classes that
    Column/Row/Grid don't naturally express.

    Example::

        with Div(css_class="flex items-center gap-4 px-6 py-4"):
            Badge("deploy", variant="outline")
            P("Deployed v2.4.1")

    For CSS that Tailwind can't express (vendor prefixes, ``clamp()``,
    ``mask-image``, etc.), use the *style* escape hatch::

        Div(style={"mask-image": "linear-gradient(to bottom, black 70%, transparent)"})
    """

    type: Literal["Div"] = "Div"
    style: dict[str, str] | None = Field(
        default=None, description="Inline CSS styles as a dict of property/value pairs."
    )


class Span(_TextComponent):
    """An inline text element with text modifiers.

    Supports bold, italic, underline, strikethrough, uppercase, lowercase,
    `code` for inline code styling, plus arbitrary CSS via `css_class` or `style`.

    Example::

        Span("14m ago", css_class="text-sm text-muted-foreground")
        Span("important", bold=True, underline=True)
        Span("pip install prefab-ui", code=True)
    """

    type: Literal["Span"] = "Span"
    # Override _TextComponent.code: Span sends it to the renderer (changes <span> to <code>),
    # while other text components just get font-mono via CSS.
    code: bool = Field(
        default=False, description="Render as inline code with monospace font"
    )
    align: None = Field(default=None, exclude=True)
    style: dict[str, str] | None = Field(
        default=None, description="Inline CSS styles as a dict of property/value pairs."
    )

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        _text_init(self, content, **kwargs)
