"""Tests for Metric component."""

from __future__ import annotations

import pytest

from prefab_ui.components import Metric


class TestMetricSerialization:
    def test_minimal(self):
        j = Metric(label="Revenue", value="$42M").to_json()
        assert j["type"] == "Metric"
        assert j["label"] == "Revenue"
        assert j["value"] == "$42M"
        assert "delta" not in j
        assert "trend" not in j
        assert "trendSentiment" not in j
        assert "description" not in j

    def test_numeric_value(self):
        j = Metric(label="Users", value=1842).to_json()
        assert j["value"] == 1842

    def test_float_value(self):
        j = Metric(label="Uptime", value=99.9).to_json()
        assert j["value"] == 99.9

    def test_with_delta(self):
        j = Metric(label="Revenue", value="$42M", delta="+23.4%").to_json()
        assert j["delta"] == "+23.4%"

    def test_numeric_delta(self):
        j = Metric(label="Count", value=100, delta=-15).to_json()
        assert j["delta"] == -15

    def test_with_description(self):
        j = Metric(
            label="Revenue",
            value="$42M",
            description="Compared to last quarter",
        ).to_json()
        assert j["description"] == "Compared to last quarter"

    def test_with_trend(self):
        j = Metric(label="Revenue", value="$42M", delta="+12%", trend="up").to_json()
        assert j["trend"] == "up"

    def test_with_trend_sentiment(self):
        j = Metric(
            label="Costs",
            value="$1.2M",
            delta="-15%",
            trend="down",
            trend_sentiment="positive",
        ).to_json()
        assert j["trend"] == "down"
        assert j["trendSentiment"] == "positive"

    def test_trend_sentiment_alias(self):
        m = Metric(label="X", value=1, trendSentiment="negative")
        assert m.trend_sentiment == "negative"
        j = m.to_json()
        assert j["trendSentiment"] == "negative"

    def test_all_fields(self):
        j = Metric(
            label="Active Users",
            value=1842,
            description="Daily active users",
            delta="+23.4%",
            trend="up",
            trend_sentiment="positive",
        ).to_json()
        assert j == {
            "type": "Metric",
            "label": "Active Users",
            "value": 1842,
            "description": "Daily active users",
            "delta": "+23.4%",
            "trend": "up",
            "trendSentiment": "positive",
        }

    def test_css_class(self):
        j = Metric(label="X", value=1, css_class="mt-4").to_json()
        assert j["cssClass"] == "mt-4"


class TestMetricDefaults:
    def test_none_fields_excluded_from_json(self):
        j = Metric(label="X", value=0).to_json()
        assert set(j.keys()) == {"type", "label", "value"}

    def test_trend_none_by_default(self):
        m = Metric(label="X", value=0)
        assert m.trend is None
        assert m.trend_sentiment is None
        assert m.delta is None
        assert m.description is None


class TestMetricValidation:
    @pytest.mark.parametrize("trend", ["up", "down", "neutral"])
    def test_valid_trend_values(self, trend: str):
        m = Metric(label="X", value=0, trend=trend)
        assert m.trend == trend

    @pytest.mark.parametrize("sentiment", ["positive", "negative", "neutral"])
    def test_valid_sentiment_values(self, sentiment: str):
        m = Metric(label="X", value=0, trend_sentiment=sentiment)
        assert m.trend_sentiment == sentiment

    def test_invalid_trend_rejected(self):
        with pytest.raises(ValueError):
            Metric(label="X", value=0, trend="sideways")

    def test_invalid_sentiment_rejected(self):
        with pytest.raises(ValueError):
            Metric(label="X", value=0, trend_sentiment="amazing")
