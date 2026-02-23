"""Tests for chart components."""

from __future__ import annotations

from prefab_ui.components.charts import (
    AreaChart,
    BarChart,
    ChartSeries,
    LineChart,
    PieChart,
    RadarChart,
    RadialChart,
    ScatterChart,
)

SAMPLE_DATA = [
    {"month": "Jan", "desktop": 186, "mobile": 80},
    {"month": "Feb", "desktop": 305, "mobile": 200},
]

SERIES = [
    ChartSeries(data_key="desktop", label="Desktop"),
    ChartSeries(data_key="mobile", label="Mobile"),
]


class TestBarChart:
    def test_serializes_basic(self):
        j = BarChart(data=SAMPLE_DATA, series=SERIES, x_axis="month").to_json()
        assert j["type"] == "BarChart"
        assert j["xAxis"] == "month"
        assert len(j["series"]) == 2
        assert j["series"][0]["dataKey"] == "desktop"

    def test_defaults(self):
        j = BarChart(data=SAMPLE_DATA, series=SERIES).to_json()
        assert j["height"] == 300
        assert j["showTooltip"] is True
        assert j["showLegend"] is False
        assert j["stacked"] is False

    def test_stacked_horizontal(self):
        j = BarChart(
            data=SAMPLE_DATA, series=SERIES, stacked=True, horizontal=True
        ).to_json()
        assert j["stacked"] is True
        assert j["horizontal"] is True


class TestLineChart:
    def test_serializes_basic(self):
        j = LineChart(data=SAMPLE_DATA, series=SERIES, x_axis="month").to_json()
        assert j["type"] == "LineChart"
        assert j["xAxis"] == "month"

    def test_curve(self):
        j = LineChart(
            data=SAMPLE_DATA, series=SERIES, curve="smooth", show_dots=True
        ).to_json()
        assert j["curve"] == "smooth"
        assert j["showDots"] is True


class TestAreaChart:
    def test_serializes_basic(self):
        j = AreaChart(data=SAMPLE_DATA, series=SERIES, x_axis="month").to_json()
        assert j["type"] == "AreaChart"

    def test_stacked(self):
        j = AreaChart(data=SAMPLE_DATA, series=SERIES, stacked=True).to_json()
        assert j["stacked"] is True


class TestPieChart:
    def test_serializes_basic(self):
        data = [
            {"browser": "Chrome", "visitors": 275},
            {"browser": "Safari", "visitors": 200},
        ]
        j = PieChart(data=data, data_key="visitors", name_key="browser").to_json()
        assert j["type"] == "PieChart"
        assert j["dataKey"] == "visitors"
        assert j["nameKey"] == "browser"

    def test_donut(self):
        data = [{"name": "A", "val": 10}]
        j = PieChart(
            data=data, data_key="val", name_key="name", inner_radius=60
        ).to_json()
        assert j["innerRadius"] == 60


class TestRadarChart:
    def test_serializes_basic(self):
        data = [
            {"subject": "Math", "alice": 120},
            {"subject": "English", "alice": 98},
        ]
        series = [ChartSeries(data_key="alice")]
        j = RadarChart(data=data, series=series, axis_key="subject").to_json()
        assert j["type"] == "RadarChart"
        assert j["axisKey"] == "subject"


class TestRadialChart:
    def test_serializes_basic(self):
        data = [
            {"browser": "Chrome", "visitors": 275},
            {"browser": "Safari", "visitors": 200},
        ]
        j = RadialChart(data=data, data_key="visitors", name_key="browser").to_json()
        assert j["type"] == "RadialChart"
        assert j["dataKey"] == "visitors"
        assert j["nameKey"] == "browser"


class TestScatterChart:
    def test_serializes_basic(self):
        data = [
            {"height": 170, "weight": 65},
            {"height": 180, "weight": 80},
        ]
        series = [ChartSeries(data_key="group1", label="Group 1")]
        j = ScatterChart(
            data=data, series=series, x_axis="height", y_axis="weight"
        ).to_json()
        assert j["type"] == "ScatterChart"
        assert j["xAxis"] == "height"
        assert j["yAxis"] == "weight"
        assert len(j["series"]) == 1
        assert j["series"][0]["dataKey"] == "group1"

    def test_defaults(self):
        data = [{"x": 1, "y": 2}]
        series = [ChartSeries(data_key="s1")]
        j = ScatterChart(data=data, series=series, x_axis="x", y_axis="y").to_json()
        assert j["height"] == 300
        assert j["showTooltip"] is True
        assert j["showGrid"] is True
        assert j["showLegend"] is False
        assert "zAxis" not in j

    def test_z_axis_bubble(self):
        data = [{"x": 1, "y": 2, "size": 10}]
        series = [ChartSeries(data_key="s1")]
        j = ScatterChart(
            data=data, series=series, x_axis="x", y_axis="y", z_axis="size"
        ).to_json()
        assert j["zAxis"] == "size"

    def test_multiple_series(self):
        data = [{"x": 1, "y": 2}]
        series = [
            ChartSeries(data_key="group_a", label="Group A", color="red"),
            ChartSeries(data_key="group_b", label="Group B"),
        ]
        j = ScatterChart(data=data, series=series, x_axis="x", y_axis="y").to_json()
        assert len(j["series"]) == 2
        assert j["series"][0]["color"] == "red"
        assert j["series"][1]["dataKey"] == "group_b"

    def test_show_legend_and_hide_grid(self):
        data = [{"x": 1, "y": 2}]
        series = [ChartSeries(data_key="s1")]
        j = ScatterChart(
            data=data,
            series=series,
            x_axis="x",
            y_axis="y",
            show_legend=True,
            show_grid=False,
        ).to_json()
        assert j["showLegend"] is True
        assert j["showGrid"] is False

    def test_custom_height(self):
        data = [{"x": 1, "y": 2}]
        series = [ChartSeries(data_key="s1")]
        j = ScatterChart(
            data=data, series=series, x_axis="x", y_axis="y", height=500
        ).to_json()
        assert j["height"] == 500

    def test_data_as_interpolation_string(self):
        series = [ChartSeries(data_key="s1")]
        j = ScatterChart(
            data="{{ myData }}", series=series, x_axis="x", y_axis="y"
        ).to_json()
        assert j["data"] == "{{ myData }}"


class TestChartSeries:
    def test_serializes_with_alias(self):
        s = ChartSeries(data_key="revenue", label="Revenue", color="#ff0000")
        d = s.model_dump(by_alias=True, exclude_none=True)
        assert d["dataKey"] == "revenue"
        assert d["label"] == "Revenue"
        assert d["color"] == "#ff0000"

    def test_defaults(self):
        s = ChartSeries(data_key="val")
        d = s.model_dump(by_alias=True, exclude_none=True)
        assert d["dataKey"] == "val"
        assert "label" not in d
        assert "color" not in d
