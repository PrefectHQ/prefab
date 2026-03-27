"""Circular progress ring component."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import ContainerComponent, _merge_css_classes
from prefab_ui.rx import RxStr

RingVariant = (
    Literal["default", "success", "warning", "destructive", "info", "muted"] | RxStr
)
RingSize = Literal["sm", "default", "lg"]


class Ring(ContainerComponent):
    """A circular progress indicator with an optional centered label.

    Renders an SVG ring that fills clockwise from 12 o'clock based on the
    current value within the min/max range. Accepts children for custom
    center content; when no children are present, `label` is shown.

    Args:
        value: Current value (number or template expression).
        min: Minimum value.
        max: Maximum value.
        label: Text displayed in the center of the ring.
        variant: Visual variant (default, success, warning, destructive, info, muted).
        size: Ring size (sm, default, lg).
        thickness: Stroke width of the ring in pixels.
        target: Target marker position (renders a tick mark on the ring).
        indicator_class: Tailwind classes for the filled arc.
        target_class: Tailwind classes for the target marker.
        gradient: Gradient stroke — None inherits theme, True forces on, False forces off.

    **Example:**

    ```python
    Ring(value=75, label="75%", variant="success")
    Ring(value=3, max=5, label="3/5", variant="info", size="lg")

    with Ring(value=75, variant="success", size="lg"):
        H1("75%")
    ```
    """

    type: Literal["Ring"] = "Ring"
    value: float | RxStr = Field(
        default=0,
        description="Current value (number or template expression)",
    )
    min: float = Field(default=0, description="Minimum value")
    max: float = Field(default=100, description="Maximum value")
    label: RxStr | None = Field(
        default=None,
        description="Text displayed in the center of the ring",
    )
    variant: RingVariant = Field(
        default="default",
        description="Visual variant: default, success, warning, destructive, info, muted",
    )
    size: RingSize = Field(
        default="default",
        description="Ring size: sm (64px), default (96px), lg (128px)",
    )
    thickness: float = Field(
        default=6,
        description="Stroke width of the ring in pixels",
    )
    target: float | RxStr | None = Field(
        default=None,
        description="Target marker position (renders a tick mark on the ring at this value)",
    )
    indicator_class: RxStr | None = Field(
        default=None,
        alias="indicatorClass",
        description="Tailwind classes for the filled arc (e.g. 'hover:drop-shadow-lg')",
    )
    target_class: RxStr | None = Field(
        default=None,
        alias="targetClass",
        description="Tailwind classes for the target marker",
    )
    gradient: bool | None = Field(
        default=None,
        exclude=True,
        description="Gradient stroke: None (inherit from theme), True (force on), False (force off)",
    )

    def model_post_init(self, __context: Any) -> None:
        if self.gradient is False:
            self.css_class = _merge_css_classes("pf-ring-flat", self.css_class)
        elif self.gradient is True:
            self.css_class = _merge_css_classes("pf-ring-gradient", self.css_class)
        super().model_post_init(__context)
