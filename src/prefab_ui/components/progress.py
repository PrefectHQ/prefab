"""Progress bar component."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import Component, _merge_css_classes
from prefab_ui.rx import RxStr

ProgressVariant = (
    Literal["default", "success", "warning", "destructive", "info", "muted"] | RxStr
)

ProgressSize = Literal["sm", "default", "lg"]

ProgressOrientation = Literal["horizontal", "vertical"]


class Progress(Component):
    """A progress bar showing completion status.

    Args:
        value: Current progress value.
        min: Minimum value (default 0).
        max: Maximum value (default 100).
        variant: Visual variant (default, success, warning, destructive, info, muted).
        size: Bar thickness (sm, default, lg).
        target: Target marker position (renders a vertical line at this value).
        indicator_class: Tailwind classes for the indicator bar (e.g. `"bg-green-500"`).
        target_class: Tailwind classes for the target marker line.
        orientation: Layout direction (horizontal or vertical).
        gradient: Gradient fill — None inherits theme, True forces on, False forces off.

    **Example:**

    ```python
    Progress(value=75)
    Progress(value=3, max=10)
    Progress(value=80, variant="success")
    Progress(value=80, indicator_class="bg-green-500")
    Progress(value=60, orientation="vertical")
    ```
    """

    type: Literal["Progress"] = "Progress"
    value: float | RxStr = Field(
        default=0,
        description="Current progress value",
    )
    min: float | None = Field(default=None, description="Minimum value (default 0)")
    max: float | None = Field(default=None, description="Maximum value (default 100)")
    variant: ProgressVariant = Field(
        default="default",
        description="Visual variant: default, success, warning, destructive, info, muted",
    )
    size: ProgressSize = Field(
        default="default",
        description="Bar thickness: sm (4px), default (6px), lg (10px)",
    )
    target: float | RxStr | None = Field(
        default=None,
        description="Target marker position (renders a vertical line at this value)",
    )
    indicator_class: RxStr | None = Field(
        default=None,
        alias="indicatorClass",
        description="Tailwind classes for the indicator bar (e.g. 'bg-green-500')",
    )
    target_class: RxStr | None = Field(
        default=None,
        alias="targetClass",
        description="Tailwind classes for the target marker line",
    )
    orientation: ProgressOrientation = Field(
        default="horizontal",
        description="Layout direction: horizontal or vertical",
    )
    gradient: bool | None = Field(
        default=None,
        exclude=True,
        description="Gradient fill: None (inherit from theme), True (force on), False (force off)",
    )

    def model_post_init(self, __context: Any) -> None:
        if self.indicator_class is not None or self.gradient is False:
            self.css_class = _merge_css_classes("pf-progress-flat", self.css_class)
        elif self.gradient is True:
            self.css_class = _merge_css_classes("pf-progress-gradient", self.css_class)
        super().model_post_init(__context)

    def to_json(self) -> dict[str, Any]:
        d = super().to_json()
        if self.orientation == "horizontal":
            d.pop("orientation", None)
        return d
