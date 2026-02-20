"""Tests for Progress component."""

from __future__ import annotations

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
