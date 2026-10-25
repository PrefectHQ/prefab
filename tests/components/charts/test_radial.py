"""Tests for radial chart components."""

from __future__ import annotations

from prefab_ui.components.charts import ChartSeries, PieChart, RadarChart, RadialChart


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

    def test_value_format(self):
        data = [{"name": "A", "share": 0.4}]
        j = PieChart(
            data=data,
            data_key="share",
            name_key="name",
            value_format="percent:1",
        ).to_json()
        assert j["valueFormat"] == "percent:1"


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

    def test_value_format(self):
        data = [{"browser": "Chrome", "revenue": 275}]
        j = RadialChart(
            data=data,
            data_key="revenue",
            name_key="browser",
            value_format="currency",
        ).to_json()
        assert j["valueFormat"] == "currency"
