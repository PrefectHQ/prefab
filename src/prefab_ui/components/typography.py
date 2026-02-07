"""Typography components following shadcn/ui conventions.

These components provide semantic text styling with automatic dark mode support.
All text content supports ``{{ field }}`` interpolation.

Example::

    from prefab_ui.components import H1, H2, P, Muted, Lead

    H1("Dashboard")
    H2("User Profile")
    P("Welcome to the application.")
    Muted("Last updated 5 minutes ago")
    Lead("A comprehensive guide to getting started.")
"""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import Component


class _TextComponent(Component):
    """Base class for text components that accept positional content."""

    content: str = Field(description="Text content with {{ field }} interpolation")
    bold: bool | None = Field(default=None, description="Render text in bold")
    italic: bool | None = Field(default=None, description="Render text in italic")

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        """Accept content as positional or keyword argument."""
        if content is not None:
            kwargs["content"] = content
        super().__init__(**kwargs)


def _text_init(self: _TextComponent, content: str | None = None, **kwargs: Any) -> None:
    """Shared init implementation for text components."""
    if content is not None:
        kwargs["content"] = content
    Component.__init__(self, **kwargs)


class H1(_TextComponent):
    """Large page heading (h1).

    Example::

        H1("Dashboard")
        H1("{{ title }}")  # With interpolation
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

    Example::

        H2("User Settings")
        H2("{{ section_name }}")
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

    Example::

        H3("Account Details")
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

    Example::

        H4("Additional Options")
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

    Example::

        P("Welcome to the application.")
        P("Hello, {{ name }}!")
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

    Example::

        Lead("A comprehensive guide to building MCP applications.")
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

    Example::

        Large("Important information")
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

    Example::

        Small("Terms and conditions apply")
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

    Example::

        Muted("Last updated 5 minutes ago")
        Muted("{{ subtitle }}")
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

    Example::

        BlockQuote("The best way to predict the future is to invent it.")
    """

    type: Literal["BlockQuote"] = "BlockQuote"

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        _text_init(self, content, **kwargs)


class InlineCode(_TextComponent):
    """Inline code snippet.

    Example::

        InlineCode("npm install")
        InlineCode("{{ command }}")
    """

    type: Literal["InlineCode"] = "InlineCode"

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        _text_init(self, content, **kwargs)
