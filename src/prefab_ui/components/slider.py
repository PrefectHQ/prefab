"""Slider component for range input.

Sliders let users select a numeric value from a range.

Example::

    from prefab_ui.components import Slider

    Slider(min=0, max=100, value=50)
    Slider(min=0, max=10, step=0.5, value=5)
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component


class Slider(Component):
    """Range slider input component.

    Args:
        min: Minimum value
        max: Maximum value
        value: Initial value
        step: Step increment
        name: Form field name
        disabled: Whether slider is disabled
        css_class: Additional CSS classes

    Example::

        Slider(min=0, max=100, value=50)
        Slider(min=0, max=1, step=0.1, value=0.5)
    """

    type: Literal["Slider"] = "Slider"
    min: float = Field(default=0, description="Minimum value")
    max: float = Field(default=100, description="Maximum value")
    value: float | None = Field(default=None, description="Initial value")
    step: float | None = Field(default=None, description="Step increment")
    name: str | None = Field(default=None, description="Form field name")
    disabled: bool = Field(default=False, description="Whether slider is disabled")
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) to execute when value changes",
    )
