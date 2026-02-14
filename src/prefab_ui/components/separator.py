"""Separator component for visual dividers.

Separators create visual divisions between content sections.

Example::

    from prefab_ui.components import Separator

    Separator()
    Separator(orientation="vertical")
    Separator(spacing=4)
"""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import Component, _merge_css_classes

SeparatorOrientation = Literal["horizontal", "vertical"]


class Separator(Component):
    """Visual divider component.

    Args:
        orientation: Separator direction (horizontal or vertical)
        spacing: Space around the separator (Tailwind spacing scale).
            Adds vertical margin for horizontal separators and horizontal
            margin for vertical separators.
        css_class: Additional CSS classes

    Example::

        Separator()  # Horizontal by default
        Separator(orientation="vertical")
        Separator(spacing=4)  # Extra breathing room
    """

    type: Literal["Separator"] = "Separator"
    orientation: SeparatorOrientation = Field(
        default="horizontal", description="Separator orientation"
    )
    spacing: int | None = Field(
        default=None,
        exclude=True,
        description="Space around the separator (Tailwind spacing scale)",
    )

    def model_post_init(self, __context: Any) -> None:
        if self.spacing is not None:
            direction = "mx" if self.orientation == "vertical" else "my"
            self.css_class = _merge_css_classes(
                f"{direction}-{self.spacing}", self.css_class
            )
        super().model_post_init(__context)
