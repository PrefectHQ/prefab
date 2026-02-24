"""Slider component for range input.

Sliders let users select a numeric value from a range. Set ``range=True``
for a two-thumb range slider that emits ``[min, max]`` values.

Example::

    from prefab_ui.components import Slider

    Slider(min=0, max=100, value=50)
    Slider(min=0, max=10, step=0.5, value=5)
    Slider(min=0, max=100, value=[20, 80], range=True)

    # Styled slider with variant
    Slider(min=0, max=100, value=75, variant="success")

    # Vertical slider
    Slider(min=0, max=100, value=50, orientation="vertical")

    # Bar-style handle
    Slider(min=0, max=100, value=50, handle_style="bar")

    # Access reactive value
    slider = Slider(min=0, max=100, value=50)
    Text(f"Value: {slider.rx}")
"""

from __future__ import annotations

from typing import Any, ClassVar, Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component, StatefulMixin

SliderVariant = Literal["default", "success", "warning", "destructive", "info", "muted"]

SliderHandleStyle = Literal["circle", "bar"]

SliderOrientation = Literal["horizontal", "vertical"]


class Slider(StatefulMixin, Component):
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
        variant: Visual variant for the filled track
        indicator_class: Custom CSS classes for the filled track
        orientation: Layout direction (horizontal or vertical)
        handle_style: Thumb shape (circle or bar)
        css_class: Additional CSS classes

    Example::

        Slider(min=0, max=100, value=50)
        Slider(min=0, max=1, step=0.1, value=0.5)
        Slider(min=0, max=100, value=[20, 80], range=True)
        Slider(min=0, max=100, value=75, variant="success")
        Slider(min=0, max=100, value=50, orientation="vertical")
        Slider(min=0, max=100, value=50, handle_style="bar")
    """

    _auto_name: ClassVar[str] = "slider"
    type: Literal["Slider"] = "Slider"
    min: float = Field(default=0, description="Minimum value")
    max: float = Field(default=100, description="Maximum value")
    value: float | list[float] | None = Field(
        default=None,
        description="Initial value (number, or [low, high] list when range=True)",
    )
    step: float | None = Field(default=None, description="Step increment")
    range: bool = Field(default=False, description="Enable two-thumb range selection")
    name: str | None = Field(
        default=None,
        description="State key for reactive binding. Auto-generated if omitted.",
    )
    disabled: bool = Field(default=False, description="Whether slider is disabled")
    variant: SliderVariant = Field(
        default="default",
        description="Visual variant for the filled track: default, success, warning, destructive, info, muted",
    )
    indicator_class: str | None = Field(
        default=None,
        alias="indicatorClass",
        description="Tailwind classes for the filled track (e.g. 'bg-green-500')",
    )
    orientation: SliderOrientation = Field(
        default="horizontal",
        description="Layout direction: horizontal or vertical",
    )
    handle_style: SliderHandleStyle = Field(
        default="circle",
        alias="handleStyle",
        description="Thumb shape: circle (default round) or bar (tall rounded rectangle)",
    )
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) to execute when value changes",
    )

    def _get_initial_value(self) -> float | list[float] | None:
        return self.value

    def model_post_init(self, __context: Any) -> None:
        if self.step is not None and self.value is not None:
            if isinstance(self.value, list):
                self.value = [self._snap(v) for v in self.value]
            else:
                self.value = self._snap(self.value)
        super().model_post_init(__context)

    def _snap(self, v: float) -> float:
        assert self.step is not None
        snapped = round((v - self.min) / self.step) * self.step + self.min
        return max(self.min, min(self.max, snapped))

    def to_json(self) -> dict[str, Any]:
        d = super().to_json()
        if not self.range:
            d.pop("range", None)
        if self.variant == "default":
            d.pop("variant", None)
        if self.orientation == "horizontal":
            d.pop("orientation", None)
        if self.handle_style == "circle":
            d.pop("handleStyle", None)
        return d
