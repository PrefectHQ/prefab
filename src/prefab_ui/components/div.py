"""Generic div and span containers with no default styling."""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import ContainerComponent
from prefab_ui.components.typography import _text_init, _TextComponent
from prefab_ui.rx import RxStr


class Div(ContainerComponent):
    """A bare container with no default styling.

    The Python equivalent of `<div className="...">` in React.
    Use when you need a wrapper with custom Tailwind classes that
    Column/Row/Grid don't naturally express.

    Args:
        style: Inline CSS styles as a dict of property/value pairs.

    **Example:**

    ```python
    with Div(css_class="flex items-center gap-4 px-6 py-4"):
        Badge("deploy", variant="outline")
        P("Deployed v2.4.1")
    ```
    """

    type: Literal["Div"] = "Div"
    style: dict[str, str] | None = Field(
        default=None, description="Inline CSS styles as a dict of property/value pairs."
    )


class Span(_TextComponent):
    """An inline text element with text modifiers.

    Supports bold, italic, underline, strikethrough, uppercase, lowercase,
    `code` for inline code styling, plus arbitrary CSS via `css_class`
    or `style`.

    Args:
        content: Text content.
        bold: Render text in bold.
        italic: Render text in italic.
        underline: Render text with underline.
        strikethrough: Render text with strikethrough.
        uppercase: Transform text to uppercase.
        lowercase: Transform text to lowercase.
        code: Render as inline `<code>` with monospace font.
        style: Inline CSS styles as a dict of property/value pairs.

    **Example:**

    ```python
    Span("14m ago", css_class="text-sm text-muted-foreground")
    Span("important", bold=True, underline=True)
    Span("pip install prefab-ui", code=True)
    ```
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


class Link(_TextComponent):
    """An inline link that renders as an anchor tag.

    Use inside Text for inline links within prose.

    Args:
        content: Link text.
        href: URL to navigate to.
        target: Link target (`'_blank'` for new tab, `'_self'` for same tab).
        bold: Render link text in bold.
        italic: Render link text in italic.
        underline: Render link text with underline.
        code: Render as inline code with monospace font.
        style: Inline CSS styles as a dict of property/value pairs.

    **Example:**

    ```python
    Link("Prefab docs", href="https://prefab.prefect.io")
    Text("Visit ", Link("our docs", href="https://docs.example.com"), " for more.")
    ```
    """

    type: Literal["Link"] = "Link"
    href: RxStr = Field(description="URL to navigate to")
    target: str | None = Field(
        default="_blank",
        description="Link target: '_blank' (new tab), '_self' (same tab)",
    )
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
