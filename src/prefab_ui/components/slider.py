"""Slider component for range input.

Sliders let users select a numeric value from a range. Set ``range=True``
for a two-thumb range slider that emits ``[min, max]`` values.

Example::

    from prefab_ui.components import Slider

    Slider(min=0, max=100, value=50)
    Slider(min=0, max=10, step=0.5, value=5)
    Slider(min=0, max=100, value=[20, 80], range=True)
"""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component


class Slider(Component):
    """Range slider input component.

    When ``range=True``, renders two thumbs for selecting a range. The
    ``value`` field accepts a ``[low, high]`` list and ``on_change``
    emits the pair as ``[low, high]``.

    Args:
        min: Minimum value
        max: Maximum value
        value: Initial value (number, or [low, high] list when range=True)
        step: Step increment
        range: Enable two-thumb range selection
        name: Form field name
        disabled: Whether slider is disabled
        css_class: Additional CSS classes

    Example::

        Slider(min=0, max=100, value=50)
        Slider(min=0, max=1, step=0.1, value=0.5)
        Slider(min=0, max=100, value=[20, 80], range=True)
    """

    type: Literal["Slider"] = "Slider"
    min: float = Field(default=0, description="Minimum value")
    max: float = Field(default=100, description="Maximum value")
    value: float | list[float] | None = Field(
        default=None,
        description="Initial value (number, or [low, high] list when range=True)",
    )
    step: float | None = Field(default=None, description="Step increment")
    range: bool = Field(default=False, description="Enable two-thumb range selection")
    name: str | None = Field(default=None, description="Form field name")
    disabled: bool = Field(default=False, description="Whether slider is disabled")
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) to execute when value changes",
    )

    def to_json(self) -> dict[str, Any]:
        d = super().to_json()
        if not self.range:
            d.pop("range", None)
        return d
