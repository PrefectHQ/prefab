"""Progress bar component."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import Component

ProgressVariant = Literal[
    "default", "success", "warning", "destructive", "info", "muted"
]

ProgressOrientation = Literal["horizontal", "vertical"]


class Progress(Component):
    """A progress bar showing completion status.

    Example::

        Progress(value=75)
        Progress(value=3, max=10)
        Progress(value=80, variant="success")
        Progress(value=80, indicator_class="bg-green-500")
        Progress(value=60, orientation="vertical")
    """

    type: Literal["Progress"] = "Progress"
    value: float | str = Field(
        default=0,
        description="Current progress value",
    )
    min: float = Field(default=0, description="Minimum value")
    max: float = Field(default=100, description="Maximum value (progress is value/max)")
    variant: ProgressVariant = Field(
        default="default",
        description="Visual variant: default, success, warning, destructive, info, muted",
    )
    indicator_class: str | None = Field(
        default=None,
        alias="indicatorClass",
        description="Tailwind classes for the indicator bar (e.g. 'bg-green-500')",
    )
    orientation: ProgressOrientation = Field(
        default="horizontal",
        description="Layout direction: horizontal or vertical",
    )

    def to_json(self) -> dict[str, Any]:
        d = super().to_json()
        if self.orientation == "horizontal":
            d.pop("orientation", None)
        return d
