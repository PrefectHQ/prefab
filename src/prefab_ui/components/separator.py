"""Separator component for visual dividers.

Separators create visual divisions between content sections.

Example::

    from prefab_ui.components import Separator

    Separator()
    Separator(orientation="vertical")
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.components.base import Component

SeparatorOrientation = Literal["horizontal", "vertical"]


class Separator(Component):
    """Visual divider component.

    Args:
        orientation: Separator direction (horizontal or vertical)
        css_class: Additional CSS classes

    Example::

        Separator()  # Horizontal by default
        Separator(orientation="vertical")
    """

    type: Literal["Separator"] = "Separator"
    orientation: SeparatorOrientation = Field(
        default="horizontal", description="Separator orientation"
    )
