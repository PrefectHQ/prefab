"""Chart components — BarChart, LineChart, AreaChart, PieChart, RadarChart, RadialChart.

Built on Recharts + shadcn ChartContainer in the renderer.

Example::

    from prefab_ui.components import BarChart, ChartSeries

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
    show_legend: bool = Field(
        default=False, alias="showLegend", description="Show legend"
    )
    show_tooltip: bool = Field(
        default=True, alias="showTooltip", description="Show tooltip on hover"
    )
    show_grid: bool = Field(
        default=True, alias="showGrid", description="Show cartesian grid"
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
    show_legend: bool = Field(
        default=False, alias="showLegend", description="Show legend"
    )
    show_tooltip: bool = Field(
        default=True, alias="showTooltip", description="Show tooltip on hover"
    )
    show_grid: bool = Field(
        default=True, alias="showGrid", description="Show cartesian grid"
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
    show_legend: bool = Field(
        default=False, alias="showLegend", description="Show legend"
    )
    show_tooltip: bool = Field(
        default=True, alias="showTooltip", description="Show tooltip on hover"
    )
    show_grid: bool = Field(
        default=True, alias="showGrid", description="Show cartesian grid"
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
    show_legend: bool = Field(
        default=False, alias="showLegend", description="Show legend"
    )
    show_tooltip: bool = Field(
        default=True, alias="showTooltip", description="Show tooltip on hover"
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
    show_legend: bool = Field(
        default=False, alias="showLegend", description="Show legend"
    )
    show_tooltip: bool = Field(
        default=True, alias="showTooltip", description="Show tooltip on hover"
    )
