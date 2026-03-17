"""Tests for Progress component."""

from __future__ import annotations

import pytest

from prefab_ui.components import Progress


class TestProgressComponent:
    def test_progress_to_json(self):
        p = Progress(value=75)
        j = p.to_json()
        assert j["type"] == "Progress"
        assert j["value"] == 75

    def test_progress_with_max(self):
        p = Progress(value=3, max=10)
        j = p.to_json()
        assert j["value"] == 3
        assert j["max"] == 10

    def test_progress_with_min(self):
        p = Progress(value=50, min=20, max=80)
        j = p.to_json()
        assert j["value"] == 50
        assert j["min"] == 20
        assert j["max"] == 80

    def test_progress_defaults(self):
        p = Progress(value=50)
        j = p.to_json()
        assert j["value"] == 50
        assert "min" not in j
        assert "max" not in j
        assert j["variant"] == "default"

    def test_progress_target(self):
        p = Progress(value=50, target=80, max=100)
        j = p.to_json()
        assert j["value"] == 50
        assert j["target"] == 80
        assert j["max"] == 100

    def test_progress_target_class(self):
        p = Progress(value=50, target=80, target_class="bg-red-500")
        j = p.to_json()
        assert j["targetClass"] == "bg-red-500"

    @pytest.mark.parametrize(
        "variant",
        ["default", "success", "warning", "destructive", "info", "muted"],
    )
    def test_progress_variant(self, variant: str):
        p = Progress(value=50, variant=variant)
        j = p.to_json()
        assert j["variant"] == variant

    def test_progress_indicator_class(self):
        p = Progress(value=50, indicator_class="bg-green-500")
        j = p.to_json()
        assert j["indicatorClass"] == "bg-green-500"

    def test_progress_variant_with_indicator_class(self):
        p = Progress(value=50, variant="success", indicator_class="rounded-full")
        j = p.to_json()
        assert j["variant"] == "success"
        assert j["indicatorClass"] == "rounded-full"

    def test_progress_orientation_default_omitted(self):
        p = Progress(value=50)
        j = p.to_json()
        assert "orientation" not in j

    def test_progress_orientation_vertical(self):
        p = Progress(value=50, orientation="vertical")
        j = p.to_json()
        assert j["orientation"] == "vertical"

    def test_progress_orientation_horizontal_omitted(self):
        p = Progress(value=50, orientation="horizontal")
        j = p.to_json()
        assert "orientation" not in j
