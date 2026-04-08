"""Kbd — keyboard key indicator."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import Component
from prefab_ui.rx import RxStr


class Kbd(Component):
    """Keyboard key indicator for displaying shortcuts.

    Renders as an inline `<kbd>` element with subtle styling.

    Args:
        label: The key label to display (e.g. "⌘", "K", "→", "Ctrl + B").

    **Example:**

    ```python
    from prefab_ui.components import Kbd, Row

    with Row(gap=1):
        Kbd("⌘")
        Kbd("K")
    ```
    """

    type: Literal["Kbd"] = "Kbd"
    label: str | RxStr = Field(description="Key label to display")

    def __init__(self, label: str | RxStr = "", **kwargs: Any) -> None:
        kwargs["label"] = label
        super().__init__(**kwargs)
