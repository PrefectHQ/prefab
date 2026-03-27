"""Markdown display component."""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import Component
from prefab_ui.rx import RxStr


class Markdown(Component):
    """Render markdown content with full formatting support.

    Supports headings, bold, italic, links, lists, code blocks, and
    template expressions. Useful for displaying rich text from state
    or LLM responses.

    Args:
        content: Markdown string. Supports `{{ expr }}` templates.

    **Example:**

    ```python
    Markdown("# Welcome\\n\\nHello, **{{ name }}**!")
    Markdown("{{ ai_response }}")
    ```
    """

    type: Literal["Markdown"] = "Markdown"
    content: RxStr = Field(description="Markdown content")

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        if content is not None:
            kwargs["content"] = content
        super().__init__(**kwargs)
