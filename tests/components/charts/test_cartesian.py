"""Tests for cartesian chart components."""

from __future__ import annotations

import pytest

from prefab_ui.components.charts import (
    AreaChart,
    BarChart,
    ChartSeries,
    LineChart,
    ScatterChart,
)
from prefab_ui.rx import Rx

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
        assert j["showLegend"] is True
        assert j["stacked"] is False

    def test_stacked_horizontal(self):
        j = BarChart(
            data=SAMPLE_DATA, series=SERIES, stacked=True, horizontal=True
        ).to_json()
        assert j["stacked"] is True
        assert j["horizontal"] is True

    def test_value_format(self):
        j = BarChart(data=SAMPLE_DATA, series=SERIES, value_format="currency").to_json()
        assert j["valueFormat"] == "currency"
        assert "yAxisFormat" not in j

    def test_axis_labels(self):
        j = BarChart(
            data=SAMPLE_DATA,
            series=SERIES,
            x_axis="month",
            x_axis_label="Month",
            y_axis_label="Users",
        ).to_json()
        assert j["xAxisLabel"] == "Month"
        assert j["yAxisLabel"] == "Users"


class TestLineChart:
    def test_serializes_basic(self):
        j = LineChart(data=SAMPLE_DATA, series=SERIES, x_axis="month").to_json()
        assert j["type"] == "LineChart"
        assert j["xAxis"] == "month"

    @pytest.mark.parametrize(
        ("series", "expected"),
        [
            (
                "{{ chart_series | selectattr:'visible' }}",
                "{{ chart_series | selectattr:'visible' }}",
            ),
            (
                Rx("chart_series").selectattr("visible"),
                "{{ chart_series | selectattr:visible }}",
            ),
        ],
    )
    def test_serializes_reactive_series(self, series, expected):
        chart = LineChart(data=SAMPLE_DATA, series=series, x_axis="month")

        assert chart.to_json()["series"] == expected

    def test_curve(self):
        j = LineChart(
            data=SAMPLE_DATA, series=SERIES, curve="smooth", show_dots=True
        ).to_json()
        assert j["curve"] == "smooth"
        assert j["showDots"] is True

    def test_percent_format(self):
        j = LineChart(
            data=SAMPLE_DATA, series=SERIES, value_format="percent:1"
        ).to_json()
        assert j["valueFormat"] == "percent:1"
        assert "yAxisFormat" not in j

    def test_axis_labels(self):
        j = LineChart(
            data=SAMPLE_DATA,
            series=SERIES,
            x_axis="month",
            x_axis_label="Month",
            y_axis_label="Revenue",
        ).to_json()
        assert j["xAxisLabel"] == "Month"
        assert j["yAxisLabel"] == "Revenue"


class TestAreaChart:
    def test_serializes_basic(self):
        j = AreaChart(data=SAMPLE_DATA, series=SERIES, x_axis="month").to_json()
        assert j["type"] == "AreaChart"

    def test_stacked(self):
        j = AreaChart(data=SAMPLE_DATA, series=SERIES, stacked=True).to_json()
        assert j["stacked"] is True

    def test_compact_format(self):
        j = AreaChart(data=SAMPLE_DATA, series=SERIES, value_format="compact").to_json()
        assert j["valueFormat"] == "compact"
        assert "yAxisFormat" not in j


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
        assert j["showLegend"] is True
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
