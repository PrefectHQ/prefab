"""Sparkline component."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import Component
from prefab_ui.rx import RxStr

SparklineVariant = (
    Literal["default", "success", "warning", "destructive", "info", "muted"] | RxStr
)
SparklineCurve = Literal["linear", "smooth", "step"]
SparklineMode = Literal["line", "bar"]


class Sparkline(Component):
    """Compact inline chart for showing trends at a glance.

    Takes a flat list of numbers and renders a tiny line (or area) chart
    with no axes, labels, or tooltips. Designed to sit inline next to text.

    Args:
        data: Flat list of numeric values or reactive interpolation reference.
        height: Chart height in pixels (default 24px via CSS).
        variant: Visual variant ("default", "success", "warning", "destructive", "info", "muted").
        indicator_class: Tailwind classes for the line/fill (e.g. "stroke-blue-500").
        fill: Show area fill under the line.
        curve: Line interpolation ("linear", "smooth", or "step").
        stroke_width: Line thickness in pixels.
        mode: Chart mode ("line" or "bar").

    **Example:**

    ```python
    Sparkline(data=[10, 15, 8, 22, 18, 25, 20])
    Sparkline(data=[10, 15, 8, 22], variant="success", fill=True)
    Sparkline(data=[5, 12, 8, 3, 15], indicator_class="stroke-blue-500")
    Sparkline(data=[5, 12, 8, 3, 15], curve="smooth", css_class="w-24")
    ```
    """

    type: Literal["Sparkline"] = "Sparkline"
    data: list[int | float] | RxStr = Field(
        description="Flat list of numeric values or `{{ interpolation }}` reference",
    )
    height: int | None = Field(
        default=None, description="Chart height in pixels (default 24px via CSS)"
    )
    variant: SparklineVariant = Field(
        default="default",
        description="Visual variant: default, success, warning, destructive, info, muted",
    )
    indicator_class: RxStr | None = Field(
        default=None,
        alias="indicatorClass",
        description="Tailwind classes for the line/fill (e.g. 'stroke-blue-500')",
    )
    fill: bool = Field(
        default=False,
        description="Show area fill under the line",
    )
    curve: SparklineCurve = Field(
        default="linear",
        description="Line interpolation: linear, smooth, or step",
    )
    stroke_width: float = Field(
        default=1.5,
        alias="strokeWidth",
        description="Line thickness in pixels",
    )
    mode: SparklineMode = Field(
        default="line",
        description="Chart mode: line or bar",
    )

    def to_json(self) -> dict[str, Any]:
        d = super().to_json()
        if self.variant == "default":
            d.pop("variant", None)
        if self.mode == "line":
            d.pop("mode", None)
        return d
