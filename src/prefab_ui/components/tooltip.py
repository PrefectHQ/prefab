"""Tooltip — hover text on any component.

Example::

    from prefab_ui.components import Tooltip, Button

    with Tooltip("Click to save your changes"):
        Button("Save")
"""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import ContainerComponent


class Tooltip(ContainerComponent):
    """Tooltip that appears on hover over its child.

    Wrap any single component to show tooltip text on hover.

    Example::

        with Tooltip("Saves the current document"):
            Button("Save")
    """

    type: Literal["Tooltip"] = "Tooltip"
    content: str = Field(description="Tooltip text")
    side: Literal["top", "right", "bottom", "left"] | None = Field(
        default=None, description="Which side to show the tooltip"
    )
    delay: int | None = Field(
        default=None, description="Delay in milliseconds before showing the tooltip"
    )

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        if content is not None and "content" not in kwargs:
            kwargs["content"] = content
        super().__init__(**kwargs)
