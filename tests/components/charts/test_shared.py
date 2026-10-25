"""Tests for shared chart series and reactive-data defaults."""

from __future__ import annotations

import pytest

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
from prefab_ui.rx import Rx

SAMPLE_DATA = [
    {"month": "Jan", "desktop": 186, "mobile": 80},
    {"month": "Feb", "desktop": 305, "mobile": 200},
]

SERIES = [
    ChartSeries(data_key="desktop", label="Desktop"),
    ChartSeries(data_key="mobile", label="Mobile"),
]

CHART_CASES = [
    (BarChart, {"series": SERIES}),
    (LineChart, {"series": SERIES}),
    (AreaChart, {"series": SERIES}),
    (PieChart, {"data_key": "desktop", "name_key": "month"}),
    (ScatterChart, {"series": SERIES, "x_axis": "month", "y_axis": "desktop"}),
    (RadarChart, {"series": SERIES}),
    (RadialChart, {"data_key": "desktop", "name_key": "month"}),
]


@pytest.mark.parametrize(("chart_type", "kwargs"), CHART_CASES)
def test_literal_chart_data_animates_by_default(chart_type, kwargs):
    chart = chart_type(data=SAMPLE_DATA, **kwargs)

    assert chart.to_json()["animate"] is True


@pytest.mark.parametrize(("chart_type", "kwargs"), CHART_CASES)
@pytest.mark.parametrize("reactive_data", [Rx("chart_data"), "{{ chart_data }}"])
def test_reactive_chart_data_does_not_animate_by_default(
    chart_type, kwargs, reactive_data
):
    chart = chart_type(data=reactive_data, **kwargs)

    assert chart.to_json()["animate"] is False


@pytest.mark.parametrize(("chart_type", "kwargs"), CHART_CASES)
def test_reactive_chart_data_can_explicitly_animate(chart_type, kwargs):
    chart = chart_type(data=Rx("chart_data"), animate=True, **kwargs)

    assert chart.to_json()["animate"] is True


@pytest.mark.parametrize(("chart_type", "kwargs"), CHART_CASES)
@pytest.mark.parametrize("reactive_value", [Rx("value"), "{{ value }}"])
def test_nested_reactive_chart_data_does_not_animate_by_default(
    chart_type, kwargs, reactive_value
):
    chart = chart_type(data=[{"month": "Jan", "desktop": reactive_value}], **kwargs)

    assert chart.to_json()["animate"] is False


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
