"""Typography components following shadcn/ui conventions.

These components provide semantic text styling with automatic dark mode support.
**Example:**

```python
from prefab_ui.components import H1, H2, P, Muted, Lead

H1("Dashboard")
H2("User Profile")
P("Welcome to the application.")
Muted("Last updated 5 minutes ago")
Lead("A comprehensive guide to getting started.")
```
"""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import Component, _merge_css_classes
from prefab_ui.rx import RxStr

TextAlign = Literal["left", "center", "right", "justify"] | None


class _TextComponent(Component):
    """Base class for text components that accept positional content.

    Args:
        content: Text content (positional or keyword).
        bold: Render text in bold.
        italic: Render text in italic.
        underline: Render text with underline.
        strikethrough: Render text with strikethrough.
        uppercase: Transform text to uppercase.
        lowercase: Transform text to lowercase.
        code: Render text in monospace font.
        align: Horizontal text alignment.
    """

    content: RxStr = Field(description="Text content")
    bold: bool | None = Field(default=None, exclude=True)
    italic: bool | None = Field(default=None, exclude=True)
    underline: bool | None = Field(default=None, exclude=True)
    strikethrough: bool | None = Field(default=None, exclude=True)
    uppercase: bool | None = Field(default=None, exclude=True)
    lowercase: bool | None = Field(default=None, exclude=True)
    code: bool | None = Field(default=None, exclude=True)
    align: TextAlign = Field(default=None, exclude=True)

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        """Accept content as positional or keyword argument."""
        if content is not None:
            kwargs["content"] = content
        super().__init__(**kwargs)

    def model_post_init(self, __context: Any) -> None:
        parts: list[str] = []
        if self.bold:
            parts.append("font-bold")
        if self.italic:
            parts.append("italic")
        if self.underline:
            parts.append("underline")
        if self.strikethrough:
            parts.append("line-through")
        if self.uppercase:
            parts.append("uppercase")
        if self.lowercase:
            parts.append("lowercase")
        if self.code:
            parts.append("font-mono")
        if self.align is not None:
            parts.append(f"text-{self.align}")
        if parts:
            self.css_class = _merge_css_classes(" ".join(parts), self.css_class)
        super().model_post_init(__context)


def _text_init(self: _TextComponent, content: str | None = None, **kwargs: Any) -> None:
    """Shared init implementation for text components."""
    if content is not None:
        kwargs["content"] = content
    Component.__init__(self, **kwargs)


class H1(_TextComponent):
    """Large page heading (h1).

    Args:
        content: Heading text.

    **Example:**

    ```python
    H1("Dashboard")
    H1("{{ title }}")  # With interpolation
    ```
    """

    type: Literal["H1"] = "H1"

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        _text_init(self, content, **kwargs)


class H2(_TextComponent):
    """Section heading (h2).

    Args:
        content: Heading text.

    **Example:**

    ```python
    H2("User Settings")
    H2("{{ section_name }}")
    ```
    """

    type: Literal["H2"] = "H2"

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        _text_init(self, content, **kwargs)


class H3(_TextComponent):
    """Subsection heading (h3).

    Args:
        content: Heading text.

    **Example:**

    ```python
    H3("Account Details")
    ```
    """

    type: Literal["H3"] = "H3"

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        _text_init(self, content, **kwargs)


class H4(_TextComponent):
    """Small heading (h4).

    Args:
        content: Heading text.

    **Example:**

    ```python
    H4("Additional Options")
    ```
    """

    type: Literal["H4"] = "H4"

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        _text_init(self, content, **kwargs)


class P(_TextComponent):
    """Paragraph text.

    Args:
        content: Paragraph text.

    **Example:**

    ```python
    P("Welcome to the application.")
    P("Hello, {{ name }}!")
    ```
    """

    type: Literal["P"] = "P"

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        _text_init(self, content, **kwargs)


class Lead(_TextComponent):
    """Lead paragraph with larger text for introductions.

    Args:
        content: Lead paragraph text.

    **Example:**

    ```python
    Lead("A comprehensive guide to building MCP applications.")
    ```
    """

    type: Literal["Lead"] = "Lead"

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        _text_init(self, content, **kwargs)


class Large(_TextComponent):
    """Large text for emphasis.

    Args:
        content: Text content.

    **Example:**

    ```python
    Large("Important information")
    ```
    """

    type: Literal["Large"] = "Large"

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        _text_init(self, content, **kwargs)


class Small(_TextComponent):
    """Small text for fine print or metadata.

    Args:
        content: Text content.

    **Example:**

    ```python
    Small("Terms and conditions apply")
    ```
    """

    type: Literal["Small"] = "Small"

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        _text_init(self, content, **kwargs)


class Muted(_TextComponent):
    """Muted/secondary text for less prominent information.

    Args:
        content: Text content.

    **Example:**

    ```python
    Muted("Last updated 5 minutes ago")
    Muted("{{ subtitle }}")
    ```
    """

    type: Literal["Muted"] = "Muted"

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        _text_init(self, content, **kwargs)


class BlockQuote(_TextComponent):
    """Block quotation.

    Args:
        content: Quotation text.

    **Example:**

    ```python
    BlockQuote("The best way to predict the future is to invent it.")
    ```
    """

    type: Literal["BlockQuote"] = "BlockQuote"

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        _text_init(self, content, **kwargs)
