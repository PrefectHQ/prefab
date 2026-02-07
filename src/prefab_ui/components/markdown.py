"""Markdown display component."""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import Component


class Markdown(Component):
    """Rendered markdown with ``{{ field }}`` interpolation.

    Example::

        Markdown("**Name:** {{ name }}\\n\\n{{ bio }}")
    """

    type: Literal["Markdown"] = "Markdown"
    content: str = Field(description="Markdown content with {{ field }} interpolation")

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        if content is not None:
            kwargs["content"] = content
        super().__init__(**kwargs)
