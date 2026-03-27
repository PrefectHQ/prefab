"""Slider component for range input.

Sliders let users select a numeric value from a range. Set `range=True`
for a two-thumb range slider that emits `[min, max]` values.

**Example:**

```python
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
```
"""

from __future__ import annotations

from typing import Any, ClassVar, Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component, StatefulMixin, _merge_css_classes
from prefab_ui.rx import RxStr

SliderVariant = (
    Literal["default", "success", "warning", "destructive", "info", "muted"] | RxStr
)

SliderSize = Literal["sm", "default", "lg"]

SliderHandleStyle = Literal["circle", "bar"]

SliderOrientation = Literal["horizontal", "vertical"]


class Slider(StatefulMixin, Component):
    """Range slider input component.

    When `range=True`, renders two thumbs for selecting a range. The
    `value` field accepts a `[low, high]` list and `on_change`
    emits the pair as `[low, high]`.

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

    **Example:**

    ```python
    Slider(min=0, max=100, value=50)
    Slider(min=0, max=1, step=0.1, value=0.5)
    Slider(min=0, max=100, value=[20, 80], range=True)
    Slider(min=0, max=100, value=75, variant="success")
    Slider(min=0, max=100, value=50, orientation="vertical")
    Slider(min=0, max=100, value=50, handle_style="bar")
    ```
    """

    _auto_name: ClassVar[str] = "slider"
    type: Literal["Slider"] = "Slider"
    min: float = Field(default=0, description="Minimum value")
    max: float = Field(default=100, description="Maximum value")
    value: float | list[float] | RxStr | None = Field(
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
    size: SliderSize = Field(
        default="default",
        description="Track thickness: sm (4px), default (6px), lg (10px)",
    )
    indicator_class: RxStr | None = Field(
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
    handle_class: RxStr | None = Field(
        default=None,
        alias="handleClass",
        description="Tailwind classes for the thumb (e.g. 'bg-blue-500')",
    )
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) to execute when value changes",
    )
    gradient: bool | None = Field(
        default=None,
        exclude=True,
        description="Gradient fill: None (inherit from theme), True (force on), False (force off)",
    )

    def model_post_init(self, __context: Any) -> None:
        if self.indicator_class is not None or self.gradient is False:
            self.css_class = _merge_css_classes("pf-slider-flat", self.css_class)
        elif self.gradient is True:
            self.css_class = _merge_css_classes("pf-slider-gradient", self.css_class)
        if self.step is not None and isinstance(self.value, (int, float)):
            self.value = self._snap(self.value)
        elif self.step is not None and isinstance(self.value, list):
            self.value = [self._snap(v) for v in self.value]
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
