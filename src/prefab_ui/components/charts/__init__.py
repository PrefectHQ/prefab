"""Chart components — BarChart, LineChart, AreaChart, PieChart, RadarChart, RadialChart, ScatterChart.

Built on Recharts + shadcn ChartContainer in the renderer.

Example::

    from prefab_ui.components.charts import BarChart, ChartSeries

    BarChart(
        data=[
            {"month": "Jan", "desktop": 186, "mobile": 80},
            {"month": "Feb", "desktop": 305, "mobile": 200},
        ],
        series=[
            ChartSeries(data_key="desktop", label="Desktop"),
            ChartSeries(data_key="mobile", label="Mobile"),
        ],
        x_axis="month",
    )
"""

from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, Field

from prefab_ui.components.base import Component


class ChartSeries(BaseModel):
    """Series definition for cartesian charts (Bar, Line, Area)."""

    model_config = {"populate_by_name": True}

    data_key: str = Field(alias="dataKey", description="Data field to plot")
    label: str | None = Field(
        default=None, description="Display label (defaults to dataKey)"
    )
    color: str | None = Field(default=None, description="CSS color override")


class BarChart(Component):
    """Bar chart with one or more series.

    Example::

        BarChart(
            data=[{"month": "Jan", "a": 10, "b": 20}],
            series=[ChartSeries(data_key="a"), ChartSeries(data_key="b")],
            x_axis="month",
            stacked=True,
        )
    """

    type: Literal["BarChart"] = "BarChart"
    data: list[dict[str, Any]] | str = Field(
        description="Row data or {{ interpolation }} reference"
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
        default=False, alias="showLegend", description="Show legend"
    )
    show_tooltip: bool = Field(
        default=True, alias="showTooltip", description="Show tooltip on hover"
    )
    show_grid: bool = Field(
        default=True, alias="showGrid", description="Show cartesian grid"
    )
    show_y_axis: bool = Field(
        default=True, alias="showYAxis", description="Show y-axis with tick labels"
    )
    y_axis_format: Literal["auto", "compact"] = Field(
        default="auto",
        alias="yAxisFormat",
        description="Y-axis tick format: 'compact' shows 60K instead of 60000",
    )


class LineChart(Component):
    """Line chart with one or more series.

    Example::

        LineChart(
            data=[{"month": "Jan", "a": 10}],
            series=[ChartSeries(data_key="a")],
            x_axis="month",
        )
    """

    type: Literal["LineChart"] = "LineChart"
    data: list[dict[str, Any]] | str = Field(
        description="Row data or {{ interpolation }} reference"
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
        default=False, alias="showLegend", description="Show legend"
    )
    show_tooltip: bool = Field(
        default=True, alias="showTooltip", description="Show tooltip on hover"
    )
    show_grid: bool = Field(
        default=True, alias="showGrid", description="Show cartesian grid"
    )
    show_y_axis: bool = Field(
        default=True, alias="showYAxis", description="Show y-axis with tick labels"
    )
    y_axis_format: Literal["auto", "compact"] = Field(
        default="auto",
        alias="yAxisFormat",
        description="Y-axis tick format: 'compact' shows 60K instead of 60000",
    )


class AreaChart(Component):
    """Area chart with one or more series.

    Example::

        AreaChart(
            data=[{"month": "Jan", "a": 10, "b": 20}],
            series=[ChartSeries(data_key="a"), ChartSeries(data_key="b")],
            x_axis="month",
            stacked=True,
        )
    """

    type: Literal["AreaChart"] = "AreaChart"
    data: list[dict[str, Any]] | str = Field(
        description="Row data or {{ interpolation }} reference"
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
        default=False, alias="showLegend", description="Show legend"
    )
    show_tooltip: bool = Field(
        default=True, alias="showTooltip", description="Show tooltip on hover"
    )
    show_grid: bool = Field(
        default=True, alias="showGrid", description="Show cartesian grid"
    )
    show_y_axis: bool = Field(
        default=True, alias="showYAxis", description="Show y-axis with tick labels"
    )
    y_axis_format: Literal["auto", "compact"] = Field(
        default="auto",
        alias="yAxisFormat",
        description="Y-axis tick format: 'compact' shows 60K instead of 60000",
    )


class PieChart(Component):
    """Pie or donut chart.

    Example::

        PieChart(
            data=[
                {"browser": "Chrome", "visitors": 275},
                {"browser": "Safari", "visitors": 200},
            ],
            data_key="visitors",
            name_key="browser",
            inner_radius=60,
        )
    """

    type: Literal["PieChart"] = "PieChart"
    data: list[dict[str, Any]] | str = Field(
        description="Row data or {{ interpolation }} reference"
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
        default=False, alias="showLegend", description="Show legend"
    )
    show_tooltip: bool = Field(
        default=True, alias="showTooltip", description="Show tooltip on hover"
    )


class ScatterChart(Component):
    """Scatter (or bubble) chart plotting points from shared data.

    Each series references the same dataset and plots (x_axis, y_axis) pairs.
    Optionally set ``z_axis`` to size dots proportionally (bubble chart).

    Example::

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
    """

    type: Literal["ScatterChart"] = "ScatterChart"
    data: list[dict[str, Any]] | str = Field(
        description="Row data or {{ interpolation }} reference"
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
        default=False, alias="showLegend", description="Show legend"
    )
    show_tooltip: bool = Field(
        default=True, alias="showTooltip", description="Show tooltip on hover"
    )
    show_grid: bool = Field(
        default=True, alias="showGrid", description="Show cartesian grid"
    )


class RadarChart(Component):
    """Radar (spider) chart with one or more series plotted on radial axes.

    Example::

        RadarChart(
            data=[
                {"subject": "Math", "alice": 120, "bob": 98},
                {"subject": "English", "alice": 98, "bob": 130},
            ],
            series=[ChartSeries(data_key="alice"), ChartSeries(data_key="bob")],
            axis_key="subject",
        )
    """

    type: Literal["RadarChart"] = "RadarChart"
    data: list[dict[str, Any]] | str = Field(
        description="Row data or {{ interpolation }} reference"
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
        default=False, alias="showLegend", description="Show legend"
    )
    show_tooltip: bool = Field(
        default=True, alias="showTooltip", description="Show tooltip on hover"
    )
    show_grid: bool = Field(
        default=True, alias="showGrid", description="Show polar grid"
    )


class RadialChart(Component):
    """Radial bar chart — categorical data as concentric rings.

    Example::

        RadialChart(
            data=[
                {"browser": "Chrome", "visitors": 275},
                {"browser": "Safari", "visitors": 200},
            ],
            data_key="visitors",
            name_key="browser",
        )
    """

    type: Literal["RadialChart"] = "RadialChart"
    data: list[dict[str, Any]] | str = Field(
        description="Row data or {{ interpolation }} reference"
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
        default=False, alias="showLegend", description="Show legend"
    )
    show_tooltip: bool = Field(
        default=True, alias="showTooltip", description="Show tooltip on hover"
    )
