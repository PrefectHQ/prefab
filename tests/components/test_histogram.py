"""Tests for Histogram component."""

from __future__ import annotations

import pytest

from prefab_ui.components import Histogram
from prefab_ui.components.histogram import _compute_bins, _format_edge


class TestFormatEdge:
    def test_integer_value(self):
        assert _format_edge(5.0) == "5"

    def test_float_value(self):
        assert _format_edge(3.14) == "3.1"

    def test_zero(self):
        assert _format_edge(0.0) == "0"

    def test_large_integer(self):
        assert _format_edge(1000.0) == "1000"

    def test_small_float(self):
        assert _format_edge(0.005) == "0.005"


class TestComputeBins:
    def test_empty_values(self):
        assert _compute_bins([], 10, None) == []

    def test_single_value(self):
        result = _compute_bins([5], 10, None)
        assert len(result) == 1
        assert result[0]["count"] == 1

    def test_all_same_values(self):
        result = _compute_bins([3, 3, 3, 3], 10, None)
        assert len(result) == 1
        assert result[0]["count"] == 4

    def test_basic_binning(self):
        values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        result = _compute_bins(values, 5, None)
        assert len(result) == 5
        total = sum(row["count"] for row in result)
        assert total == 10

    def test_custom_bin_edges(self):
        values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        result = _compute_bins(values, 10, [0, 5, 10])
        assert len(result) == 2
        assert result[0]["count"] == 4
        assert result[1]["count"] == 6

    def test_bin_labels_use_en_dash(self):
        result = _compute_bins([1, 2, 3], 1, None)
        assert "\u2013" in result[0]["bin"]

    def test_negative_values(self):
        values = [-5, -3, -1, 0, 1, 3, 5]
        result = _compute_bins(values, 5, None)
        assert len(result) == 5
        total = sum(row["count"] for row in result)
        assert total == 7

    def test_unsorted_bin_edges_are_sorted(self):
        values = [1, 5, 10]
        result = _compute_bins(values, 10, [10, 0, 5])
        assert len(result) == 2


class TestHistogramSerialization:
    def test_type_is_bar_chart(self):
        h = Histogram(values=[1, 2, 3])
        j = h.to_json()
        assert j["type"] == "BarChart"

    def test_values_excluded_from_json(self):
        h = Histogram(values=[1, 2, 3])
        j = h.to_json()
        assert "values" not in j

    def test_bins_excluded_from_json(self):
        h = Histogram(values=[1, 2, 3], bins=5)
        j = h.to_json()
        assert "bins" not in j

    def test_bin_edges_excluded_from_json(self):
        h = Histogram(values=[1, 2, 3], bin_edges=[0, 2, 4])
        j = h.to_json()
        assert "bin_edges" not in j
        assert "binEdges" not in j

    def test_color_excluded_from_json(self):
        h = Histogram(values=[1, 2, 3], color="#ff0000")
        j = h.to_json()
        assert "color" not in j

    def test_data_field_present(self):
        h = Histogram(values=[1, 2, 3])
        j = h.to_json()
        assert "data" in j
        assert isinstance(j["data"], list)
        assert all("bin" in row and "count" in row for row in j["data"])

    def test_series_field_present(self):
        h = Histogram(values=[1, 2, 3])
        j = h.to_json()
        assert "series" in j
        assert len(j["series"]) == 1
        assert j["series"][0]["dataKey"] == "count"

    def test_x_axis_is_bin(self):
        h = Histogram(values=[1, 2, 3])
        j = h.to_json()
        assert j["xAxis"] == "bin"

    def test_color_passed_to_series(self):
        h = Histogram(values=[1, 2, 3], color="#4f46e5")
        j = h.to_json()
        assert j["series"][0]["color"] == "#4f46e5"

    def test_color_absent_from_series_when_none(self):
        h = Histogram(values=[1, 2, 3])
        j = h.to_json()
        assert "color" not in j["series"][0]


class TestHistogramDefaults:
    def test_default_bins(self):
        h = Histogram(values=list(range(100)))
        assert len(h.data) == 10

    def test_custom_bin_count(self):
        h = Histogram(values=list(range(100)), bins=5)
        assert len(h.data) == 5

    def test_custom_bin_edges(self):
        h = Histogram(values=[1, 2, 3, 4, 5], bin_edges=[0, 2.5, 5])
        assert len(h.data) == 2

    def test_default_height(self):
        h = Histogram(values=[1, 2, 3])
        assert h.to_json()["height"] == 300

    def test_default_bar_radius(self):
        h = Histogram(values=[1, 2, 3])
        assert h.to_json()["barRadius"] == 4

    def test_default_show_tooltip(self):
        h = Histogram(values=[1, 2, 3])
        assert h.to_json()["showTooltip"] is True

    def test_default_show_grid(self):
        h = Histogram(values=[1, 2, 3])
        assert h.to_json()["showGrid"] is True

    def test_show_legend_false_excluded(self):
        h = Histogram(values=[1, 2, 3])
        j = h.to_json()
        assert j.get("showLegend", False) is False


class TestHistogramEdgeCases:
    def test_empty_values(self):
        h = Histogram(values=[])
        j = h.to_json()
        assert j["data"] == []

    def test_single_value(self):
        h = Histogram(values=[42])
        j = h.to_json()
        assert len(j["data"]) == 1
        assert j["data"][0]["count"] == 1

    def test_all_same_values(self):
        h = Histogram(values=[7, 7, 7, 7, 7])
        j = h.to_json()
        assert len(j["data"]) == 1
        assert j["data"][0]["count"] == 5

    def test_negative_values(self):
        h = Histogram(values=[-10, -5, 0, 5, 10])
        j = h.to_json()
        total = sum(row["count"] for row in j["data"])
        assert total == 5

    def test_float_values(self):
        h = Histogram(values=[0.1, 0.2, 0.3, 0.4, 0.5], bins=2)
        j = h.to_json()
        total = sum(row["count"] for row in j["data"])
        assert total == 5

    def test_total_count_matches_input_length(self):
        values = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
        h = Histogram(values=values, bins=4)
        j = h.to_json()
        total = sum(row["count"] for row in j["data"])
        assert total == len(values)

    @pytest.mark.parametrize("n_bins", [1, 2, 3, 5, 10, 20, 50])
    def test_various_bin_counts(self, n_bins: int):
        values = list(range(100))
        h = Histogram(values=values, bins=n_bins)
        assert len(h.data) == n_bins
        total = sum(row["count"] for row in h.data)
        assert total == 100
