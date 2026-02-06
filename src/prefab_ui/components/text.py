"""Text display component."""

from __future__ import annotations

from typing import Any, overload

from pydantic import Field

from prefab_ui.components.base import Component


class Text(Component):
    """Body text with ``{{ field }}`` interpolation support.

    Example::

        Text("Hello, {{ name }}!")
    """

    content: str = Field(description="Text content with {{ field }} interpolation")
    bold: bool | None = Field(default=None, description="Render text in bold")
    italic: bool | None = Field(default=None, description="Render text in italic")

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        if content is not None:
            kwargs["content"] = content
        super().__init__(**kwargs)
