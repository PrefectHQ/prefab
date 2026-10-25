"""Tests for WaterfallChart."""

from __future__ import annotations

import pytest

from prefab_ui.components.charts import WaterfallChart
from prefab_ui.rx import Rx

WATERFALL_DATA = [
    {"label": "Start", "value": 5000, "total": True},
    {"label": "Sales", "value": 3200},
    {"label": "Marketing", "value": -1200},
    {"label": "End", "value": 7000, "total": True},
]


def test_literal_chart_data_animates_by_default():
    chart = WaterfallChart(data=WATERFALL_DATA, data_key="value", name_key="label")

    assert chart.to_json()["animate"] is True


@pytest.mark.parametrize("reactive_data", [Rx("chart_data"), "{{ chart_data }}"])
def test_reactive_chart_data_does_not_animate_by_default(reactive_data):
    chart = WaterfallChart(data=reactive_data, data_key="value", name_key="label")

    assert chart.to_json()["animate"] is False


def test_reactive_chart_data_can_explicitly_animate():
    chart = WaterfallChart(
        data=Rx("chart_data"), data_key="value", name_key="label", animate=True
    )

    assert chart.to_json()["animate"] is True


@pytest.mark.parametrize("reactive_value", [Rx("value"), "{{ value }}"])
def test_nested_reactive_chart_data_does_not_animate_by_default(reactive_value):
    chart = WaterfallChart(
        data=[{"label": "Jan", "value": reactive_value}],
        data_key="value",
        name_key="label",
    )

    assert chart.to_json()["animate"] is False


class TestWaterfallChart:
    def test_serializes_basic(self):
        j = WaterfallChart(
            data=WATERFALL_DATA, data_key="value", name_key="label"
        ).to_json()
        assert j["type"] == "WaterfallChart"
        assert j["dataKey"] == "value"
        assert j["nameKey"] == "label"
        assert "totalKey" not in j

    def test_defaults(self):
        j = WaterfallChart(
            data=WATERFALL_DATA, data_key="value", name_key="label"
        ).to_json()
        assert j["height"] == 300
        assert j["barRadius"] == 4
        assert j["showConnectors"] is True
        assert j["showLegend"] is True
        assert j["showTooltip"] is True
        assert j["showGrid"] is True
        assert j["showYAxis"] is True

    def test_total_key(self):
        j = WaterfallChart(
            data=WATERFALL_DATA,
            data_key="value",
            name_key="label",
            total_key="total",
        ).to_json()
        assert j["totalKey"] == "total"

    def test_custom_colors(self):
        j = WaterfallChart(
            data=WATERFALL_DATA,
            data_key="value",
            name_key="label",
            increase_color="#22c55e",
            decrease_color="#ef4444",
            total_color="#3b82f6",
        ).to_json()
        assert j["increaseColor"] == "#22c55e"
        assert j["decreaseColor"] == "#ef4444"
        assert j["totalColor"] == "#3b82f6"

    def test_hide_connectors(self):
        j = WaterfallChart(
            data=WATERFALL_DATA,
            data_key="value",
            name_key="label",
            show_connectors=False,
        ).to_json()
        assert j["showConnectors"] is False

    def test_value_format(self):
        j = WaterfallChart(
            data=WATERFALL_DATA,
            data_key="value",
            name_key="label",
            value_format="currency",
        ).to_json()
        assert j["valueFormat"] == "currency"

    def test_data_as_interpolation_string(self):
        j = WaterfallChart(
            data="{{ myData }}", data_key="value", name_key="label"
        ).to_json()
        assert j["data"] == "{{ myData }}"
