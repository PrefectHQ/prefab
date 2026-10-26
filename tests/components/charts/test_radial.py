"""Tests for radial chart components."""

from __future__ import annotations

import pytest

from prefab_ui.components.charts import ChartSeries, PieChart, RadarChart, RadialChart
from prefab_ui.rx import Rx


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


class TestPieAggregation:
    def test_defaults_omit_options(self):
        j = PieChart(data=[], data_key="value", name_key="name").to_json()
        assert "aggregateBelow" not in j
        assert "aggregateExcept" not in j

    def test_aliases_and_reactive_selection(self):
        from prefab_ui.rx import Rx

        j = PieChart(
            data=[], data_key="value", name_key="name", aggregate_below=0.2
        ).to_json()
        assert j["aggregateBelow"] == 0.2
        for selection, expected in [
            ([], []),
            (["A"], ["A"]),
            (Rx("selected"), "{{ selected }}"),
        ]:
            j = PieChart(
                data=[], data_key="value", name_key="name", aggregate_except=selection
            ).to_json()
            assert j["aggregateExcept"] == expected

    def test_invalid_options(self):
        import pytest
        from pydantic import ValidationError

        for options in [
            {"aggregate_below": -0.1},
            {"aggregate_below": 1.1},
            {"aggregate_below": float("nan")},
            {"aggregate_below": float("inf")},
            {"aggregate_below": True},
            {"aggregate_below": "0.2"},
            {"aggregate_except": [1]},
            {"aggregate_below": 0, "aggregate_except": []},
        ]:
            with pytest.raises(ValidationError):
                PieChart(data=[], data_key="value", name_key="name", **options)

    def test_enabled_data_validation(self):
        import pytest
        from pydantic import ValidationError

        for value in [-1, float("nan"), float("inf"), "1", True, None]:
            data = [{"name": "A", "value": value}]
            with pytest.raises(ValidationError):
                PieChart(
                    data=data, data_key="value", name_key="name", aggregate_except=[]
                )
            PieChart(data=data, data_key="value", name_key="name")
        with pytest.raises(ValidationError):
            PieChart(data=[], data_key="value", name_key="value", aggregate_except=[])

    def test_existing_other_is_allowed(self):
        data = [{"name": "Other", "value": 9}, {"name": "A", "value": 1}]
        PieChart(
            data=data, data_key="value", name_key="name", aggregate_except=["Other"]
        )

    def test_inline_reactive_values(self):
        from prefab_ui.rx import STATE

        for value in ["{{ amount }}", STATE.amount]:
            j = PieChart(
                data=[{"name": STATE.label, "value": value}],
                data_key="value",
                name_key="name",
                aggregate_below=0.2,
            ).to_json()
            assert j["data"] == [{"name": "{{ label }}", "value": "{{ amount }}"}]

    def test_reactive_selection_animation_default(self):
        from prefab_ui.rx import STATE

        for selection in [STATE.selected, "{{ selected }}"]:
            chart = PieChart(
                data=[{"name": "A", "value": 1}],
                data_key="value",
                name_key="name",
                aggregate_except=selection,
            )
            assert chart.animate is False
            assert (
                PieChart(
                    data=[],
                    data_key="value",
                    name_key="name",
                    aggregate_except=selection,
                    animate=True,
                ).animate
                is True
            )
        assert (
            PieChart(
                data=[], data_key="value", name_key="name", aggregate_except=["A"]
            ).animate
            is True
        )


@pytest.mark.parametrize(
    "height", [420, "{{ rows.length * 30 }}", Rx("rows").length() * 30]
)
def test_piechart_serializes_reactive_height(height):
    chart = PieChart(data=[], data_key="value", name_key="name", height=height)

    assert chart.to_json()["height"] == (
        height if isinstance(height, int) else str(height)
    )


@pytest.mark.parametrize(
    "height", [420, "{{ rows.length * 30 }}", Rx("rows").length() * 30]
)
def test_radarchart_serializes_reactive_height(height):
    chart = RadarChart(data=[], series=[], height=height)

    assert chart.to_json()["height"] == (
        height if isinstance(height, int) else str(height)
    )


@pytest.mark.parametrize(
    "height", [420, "{{ rows.length * 30 }}", Rx("rows").length() * 30]
)
def test_radialchart_serializes_reactive_height(height):
    chart = RadialChart(data=[], data_key="value", name_key="name", height=height)

    assert chart.to_json()["height"] == (
        height if isinstance(height, int) else str(height)
    )
