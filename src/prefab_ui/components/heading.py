"""Heading display component."""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import Component


class Heading(Component):
    """Section heading (h1-h4).

    Example::

        Heading("{{ name }}", level=2)
    """

    type: Literal["Heading"] = "Heading"
    content: str = Field(description="Heading text")
    level: Literal[1, 2, 3, 4] = Field(
        default=1, description="Heading level (1=h1, 4=h4)"
    )

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        if content is not None:
            kwargs["content"] = content
        super().__init__(**kwargs)
