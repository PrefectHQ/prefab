"""Generic div and span containers with no default styling."""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import Component, ContainerComponent


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


class Span(Component):
    """An inline text element with no default styling.

    Example::

        Span("14m ago", css_class="text-sm text-muted-foreground")
    """

    type: Literal["Span"] = "Span"
    content: str = Field(description="Text content")
    style: dict[str, str] | None = Field(
        default=None, description="Inline CSS styles as a dict of property/value pairs."
    )

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        if content is not None:
            kwargs["content"] = content
        super().__init__(**kwargs)
