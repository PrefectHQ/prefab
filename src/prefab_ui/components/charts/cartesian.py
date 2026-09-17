"""Cartesian chart components — Bar, Line, Area, Scatter."""

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


class BarChart(Component):
    """Bar chart with one or more series.

    Each series is a `ChartSeries(data_key=..., label=..., color=...)`
    from `prefab_ui.components.charts`. The `data_key` selects which
    field in each data row to plot.

    Args:
        data: Row data or reactive interpolation reference.
        series: Series to render as bars.
        x_axis: Data key for x-axis labels.
        height: Chart height in pixels.
        stacked: Stack bars instead of grouping side-by-side.
        horizontal: Render as horizontal bar chart.
        bar_radius: Corner radius on bars.
        show_legend: Show legend.
        show_tooltip: Show tooltip on hover.
        animate: Animate transitions. Defaults to `False` for reactive data.
        show_grid: Show cartesian grid.
        show_y_axis: Show y-axis with tick labels.
        value_format: Pipe format for value-axis ticks and tooltip values.

    **Example:**

    ```python
    from prefab_ui.components.charts import BarChart, ChartSeries

    BarChart(
        data=[{"month": "Jan", "a": 10, "b": 20}],
        series=[ChartSeries(data_key="a"), ChartSeries(data_key="b")],
        x_axis="month",
        stacked=True,
        value_format="compact",
    )
    ```
    """

    type: Literal["BarChart"] = "BarChart"
    data: list[dict[str, Any]] | RxStr = Field(
        description="Row data or `{{ interpolation }}` reference"
    )
    series: list[ChartSeries] = Field(description="Series to render as bars")
    x_axis: str | None = Field(
        default=None, alias="xAxis", description="Data key for x-axis labels"
    )
    height: int = Field(default=300, description="Chart height in pixels")
    stacked: bool = Field(default=False, description="Stack bars")
    horizontal: bool = Field(
        default=False, description="Render as horizontal bar chart"
    )
    bar_radius: int = Field(
        default=4, alias="barRadius", description="Corner radius on bars"
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
        default=True, alias="showGrid", description="Show cartesian grid"
    )
    show_y_axis: bool = Field(
        default=True, alias="showYAxis", description="Show y-axis with tick labels"
    )
    value_format: ChartValueFormat = Field(
        default="auto",
        alias="valueFormat",
        description=(
            "Value-axis tick and tooltip value format pipe, such as 'compact', "
            "'currency', or 'percent:1'"
        ),
    )

    def model_post_init(self, __context: Any) -> None:
        if "animate" not in self.model_fields_set and _is_reactive_chart_data(
            self.data
        ):
            self.animate = False
        super().model_post_init(__context)


class LineChart(Component):
    """Line chart with one or more series.

    Series are defined with `ChartSeries` from
    `prefab_ui.components.charts`.

    Args:
        data: Row data or reactive interpolation reference.
        series: Series to render as lines.
        x_axis: Data key for x-axis labels.
        height: Chart height in pixels.
        curve: Line interpolation style ("linear", "smooth", or "step").
        show_dots: Show dots at data points.
        show_legend: Show legend.
        show_tooltip: Show tooltip on hover.
        animate: Animate transitions. Defaults to `False` for reactive data.
        show_grid: Show cartesian grid.
        show_y_axis: Show y-axis with tick labels.
        value_format: Pipe format for value-axis ticks and tooltip values.

    **Example:**

    ```python
    from prefab_ui.components.charts import LineChart, ChartSeries

    LineChart(
        data=[{"month": "Jan", "a": 10}],
        series=[ChartSeries(data_key="a")],
        x_axis="month",
        value_format="percent:1",
    )
    ```
    """

    type: Literal["LineChart"] = "LineChart"
    data: list[dict[str, Any]] | RxStr = Field(
        description="Row data or `{{ interpolation }}` reference"
    )
    series: list[ChartSeries] = Field(description="Series to render as lines")
    x_axis: str | None = Field(
        default=None, alias="xAxis", description="Data key for x-axis labels"
    )
    height: int = Field(default=300, description="Chart height in pixels")
    curve: Literal["linear", "smooth", "step"] = Field(
        default="linear", description="Line interpolation style"
    )
    show_dots: bool = Field(
        default=False, alias="showDots", description="Show dots at data points"
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
        default=True, alias="showGrid", description="Show cartesian grid"
    )
    show_y_axis: bool = Field(
        default=True, alias="showYAxis", description="Show y-axis with tick labels"
    )
    value_format: ChartValueFormat = Field(
        default="auto",
        alias="valueFormat",
        description=(
            "Value-axis tick and tooltip value format pipe, such as 'compact', "
            "'currency', or 'percent:1'"
        ),
    )

    def model_post_init(self, __context: Any) -> None:
        if "animate" not in self.model_fields_set and _is_reactive_chart_data(
            self.data
        ):
            self.animate = False
        super().model_post_init(__context)


class AreaChart(Component):
    """Area chart with one or more series.

    Series are defined with `ChartSeries` from
    `prefab_ui.components.charts`.

    Args:
        data: Row data or reactive interpolation reference.
        series: Series to render as areas.
        x_axis: Data key for x-axis labels.
        height: Chart height in pixels.
        stacked: Stack areas instead of overlaying.
        curve: Line interpolation style ("linear", "smooth", or "step").
        show_dots: Show dots at data points.
        show_legend: Show legend.
        show_tooltip: Show tooltip on hover.
        animate: Animate transitions. Defaults to `False` for reactive data.
        show_grid: Show cartesian grid.
        show_y_axis: Show y-axis with tick labels.
        value_format: Pipe format for value-axis ticks and tooltip values.

    **Example:**

    ```python
    from prefab_ui.components.charts import AreaChart, ChartSeries

    AreaChart(
        data=[{"month": "Jan", "a": 10, "b": 20}],
        series=[ChartSeries(data_key="a"), ChartSeries(data_key="b")],
        x_axis="month",
        stacked=True,
        value_format="currency",
    )
    ```
    """

    type: Literal["AreaChart"] = "AreaChart"
    data: list[dict[str, Any]] | RxStr = Field(
        description="Row data or `{{ interpolation }}` reference"
    )
    series: list[ChartSeries] = Field(description="Series to render as areas")
    x_axis: str | None = Field(
        default=None, alias="xAxis", description="Data key for x-axis labels"
    )
    height: int = Field(default=300, description="Chart height in pixels")
    stacked: bool = Field(default=False, description="Stack areas")
    curve: Literal["linear", "smooth", "step"] = Field(
        default="linear", description="Line interpolation style"
    )
    show_dots: bool = Field(
        default=False, alias="showDots", description="Show dots at data points"
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
        default=True, alias="showGrid", description="Show cartesian grid"
    )
    show_y_axis: bool = Field(
        default=True, alias="showYAxis", description="Show y-axis with tick labels"
    )
    value_format: ChartValueFormat = Field(
        default="auto",
        alias="valueFormat",
        description=(
            "Value-axis tick and tooltip value format pipe, such as 'compact', "
            "'currency', or 'percent:1'"
        ),
    )

    def model_post_init(self, __context: Any) -> None:
        if "animate" not in self.model_fields_set and _is_reactive_chart_data(
            self.data
        ):
            self.animate = False
        super().model_post_init(__context)


class ScatterChart(Component):
    """Scatter (or bubble) chart plotting points from shared data.

    Each series references the same dataset and plots (x_axis, y_axis) pairs.
    Optionally set `z_axis` to size dots proportionally (bubble chart).

    Args:
        data: Row data or reactive interpolation reference.
        series: Series to render as scatter groups.
        x_axis: Data key for x-axis values.
        y_axis: Data key for y-axis values.
        z_axis: Data key for bubble size (optional).
        height: Chart height in pixels.
        show_legend: Show legend.
        show_tooltip: Show tooltip on hover.
        animate: Animate transitions. Defaults to `False` for reactive data.
        show_grid: Show cartesian grid.

    **Example:**

    ```python
    ScatterChart(
        data=[
            {"height": 170, "weight": 65, "age": 25},
            {"height": 180, "weight": 80, "age": 30},
        ],
        series=[ChartSeries(data_key="group1", label="Group 1")],
        x_axis="height",
        y_axis="weight",
        z_axis="age",
    )
    ```
    """

    type: Literal["ScatterChart"] = "ScatterChart"
    data: list[dict[str, Any]] | RxStr = Field(
        description="Row data or `{{ interpolation }}` reference"
    )
    series: list[ChartSeries] = Field(description="Series to render as scatter groups")
    x_axis: str = Field(alias="xAxis", description="Data key for x-axis values")
    y_axis: str = Field(alias="yAxis", description="Data key for y-axis values")
    z_axis: str | None = Field(
        default=None,
        alias="zAxis",
        description="Data key for bubble size (optional)",
    )
    height: int = Field(default=300, description="Chart height in pixels")
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
        default=True, alias="showGrid", description="Show cartesian grid"
    )

    def model_post_init(self, __context: Any) -> None:
        if "animate" not in self.model_fields_set and _is_reactive_chart_data(
            self.data
        ):
            self.animate = False
        super().model_post_init(__context)
