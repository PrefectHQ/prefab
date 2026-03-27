"""Inline SVG component."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import Component
from prefab_ui.rx import RxStr


class Svg(Component):
    """Inline SVG element.

    Content is sanitized in the renderer to strip scripts and event
    handlers, making it safe to render user- or LLM-generated SVG.

    Args:
        content: SVG markup string.
        width: CSS width (e.g. `"100px"`).
        height: CSS height (e.g. `"100px"`).

    **Example:**

    ```python
    Svg('<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg>')
    ```
    """

    type: Literal["Svg"] = "Svg"
    content: RxStr = Field(description="SVG markup")
    width: str | None = Field(default=None, description="CSS width")
    height: str | None = Field(default=None, description="CSS height")

    def __init__(self, content: str | None = None, /, **kwargs: Any) -> None:
        if content is not None and "content" not in kwargs:
            kwargs["content"] = content
        super().__init__(**kwargs)
