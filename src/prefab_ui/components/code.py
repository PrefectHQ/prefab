"""Code block display component."""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import Component
from prefab_ui.rx import RxStr


class Code(Component):
    """Code block with optional syntax highlighting.

    Example::

        Code("{{ source_code }}", language="python")
    """

    type: Literal["Code"] = "Code"
    content: RxStr = Field(description="Code content")
    language: str | None = Field(
        default=None, description="Syntax highlighting language"
    )

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        """Accept content as positional or keyword argument."""
        if content is not None:
            kwargs["content"] = content
        super().__init__(**kwargs)
