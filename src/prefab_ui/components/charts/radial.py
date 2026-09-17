"""Radial chart components — Pie, Radar, Radial."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import Component
from prefab_ui.components.charts._shared import (
    ChartSeries,
    ChartValueFormat,
    _is_reactive_chart_data,
)
from prefab_ui.rx import RxStr


class PieChart(Component):
    """Pie or donut chart.

    Args:
        data: Row data or reactive interpolation reference.
        data_key: Numeric value field.
        name_key: Label field.
        height: Chart height in pixels.
        inner_radius: Inner radius in pixels (> 0 for donut).
        show_label: Show labels on slices.
        padding_angle: Gap between slices in degrees.
        show_legend: Show legend.
        show_tooltip: Show tooltip on hover.
        animate: Animate transitions. Defaults to `False` for reactive data.
        value_format: Pipe format for tooltip values.

    **Example:**

    ```python
    PieChart(
        data=[
            {"browser": "Chrome", "visitors": 275},
            {"browser": "Safari", "visitors": 200},
        ],
        data_key="visitors",
        name_key="browser",
        inner_radius=60,
        value_format="compact",
    )
    ```
    """

    type: Literal["PieChart"] = "PieChart"
    data: list[dict[str, Any]] | RxStr = Field(
        description="Row data or `{{ interpolation }}` reference"
    )
    data_key: str = Field(alias="dataKey", description="Numeric value field")
    name_key: str = Field(alias="nameKey", description="Label field")
    height: int = Field(default=300, description="Chart height in pixels")
    inner_radius: int = Field(
        default=0, alias="innerRadius", description="Inner radius (>0 for donut)"
    )
    show_label: bool = Field(
        default=False, alias="showLabel", description="Show labels on slices"
    )
    padding_angle: int = Field(
        default=0, alias="paddingAngle", description="Gap between slices in degrees"
    )
    show_legend: bool = Field(
        default=True, alias="showLegend", description="Show legend"
    )
    show_tooltip: bool = Field(
        default=True, alias="showTooltip", description="Show tooltip on hover"
    )
    animate: bool = Field(
        default=True, description="Animate transitions when data changes"
    )
    value_format: ChartValueFormat = Field(
        default="auto",
        alias="valueFormat",
        description="Tooltip value format pipe, such as 'currency' or 'percent:1'",
    )

    def model_post_init(self, __context: Any) -> None:
        if "animate" not in self.model_fields_set and _is_reactive_chart_data(
            self.data
        ):
            self.animate = False
        super().model_post_init(__context)


class RadarChart(Component):
    """Radar (spider) chart with one or more series plotted on radial axes.

    Args:
        data: Row data or reactive interpolation reference.
        series: Series to render as radar areas.
        axis_key: Data key for angular axis labels.
        height: Chart height in pixels.
        filled: Fill radar polygons (False for lines only).
        show_dots: Show dots at vertices.
        show_legend: Show legend.
        show_tooltip: Show tooltip on hover.
        animate: Animate transitions. Defaults to `False` for reactive data.
        show_grid: Show polar grid.

    **Example:**

    ```python
    RadarChart(
        data=[
            {"subject": "Math", "alice": 120, "bob": 98},
            {"subject": "English", "alice": 98, "bob": 130},
        ],
        series=[ChartSeries(data_key="alice"), ChartSeries(data_key="bob")],
        axis_key="subject",
    )
    ```
    """

    type: Literal["RadarChart"] = "RadarChart"
    data: list[dict[str, Any]] | RxStr = Field(
        description="Row data or `{{ interpolation }}` reference"
    )
    series: list[ChartSeries] = Field(description="Series to render as radar areas")
    axis_key: str | None = Field(
        default=None, alias="axisKey", description="Data key for angular axis labels"
    )
    height: int = Field(default=300, description="Chart height in pixels")
    filled: bool = Field(
        default=True, description="Fill radar polygons (False for lines only)"
    )
    show_dots: bool = Field(
        default=False, alias="showDots", description="Show dots at vertices"
    )
    show_legend: bool = Field(
        default=True, alias="showLegend", description="Show legend"
    )
    show_tooltip: bool = Field(
        default=True, alias="showTooltip", description="Show tooltip on hover"
    )
    animate: bool = Field(
        default=True, description="Animate transitions when data changes"
    )
    show_grid: bool = Field(
        default=True, alias="showGrid", description="Show polar grid"
    )

    def model_post_init(self, __context: Any) -> None:
        if "animate" not in self.model_fields_set and _is_reactive_chart_data(
            self.data
        ):
            self.animate = False
        super().model_post_init(__context)


class RadialChart(Component):
    """Radial bar chart — categorical data as concentric rings.

    Args:
        data: Row data or reactive interpolation reference.
        data_key: Numeric value field.
        name_key: Label field.
        height: Chart height in pixels.
        inner_radius: Inner radius in pixels.
        start_angle: Arc start angle in degrees.
        end_angle: Arc end angle in degrees.
        show_legend: Show legend.
        show_tooltip: Show tooltip on hover.
        animate: Animate transitions. Defaults to `False` for reactive data.
        value_format: Pipe format for tooltip values.

    **Example:**

    ```python
    RadialChart(
        data=[
            {"browser": "Chrome", "visitors": 275},
            {"browser": "Safari", "visitors": 200},
        ],
        data_key="visitors",
        name_key="browser",
        value_format="compact",
    )
    ```
    """

    type: Literal["RadialChart"] = "RadialChart"
    data: list[dict[str, Any]] | RxStr = Field(
        description="Row data or `{{ interpolation }}` reference"
    )
    data_key: str = Field(alias="dataKey", description="Numeric value field")
    name_key: str = Field(alias="nameKey", description="Label field")
    height: int = Field(default=300, description="Chart height in pixels")
    inner_radius: int = Field(
        default=30, alias="innerRadius", description="Inner radius in pixels"
    )
    start_angle: int = Field(
        default=180, alias="startAngle", description="Arc start angle in degrees"
    )
    end_angle: int = Field(
        default=0, alias="endAngle", description="Arc end angle in degrees"
    )
    show_legend: bool = Field(
        default=True, alias="showLegend", description="Show legend"
    )
    show_tooltip: bool = Field(
        default=True, alias="showTooltip", description="Show tooltip on hover"
    )
    animate: bool = Field(
        default=True, description="Animate transitions when data changes"
    )
    value_format: ChartValueFormat = Field(
        default="auto",
        alias="valueFormat",
        description="Tooltip value format pipe, such as 'currency' or 'percent:1'",
    )

    def model_post_init(self, __context: Any) -> None:
        if "animate" not in self.model_fields_set and _is_reactive_chart_data(
            self.data
        ):
            self.animate = False
        super().model_post_init(__context)
