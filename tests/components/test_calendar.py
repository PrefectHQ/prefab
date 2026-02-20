"""Tests for Calendar component."""

from __future__ import annotations

from prefab_ui.components import Calendar


class TestCalendarComponent:
    def test_calendar_to_json(self):
        c = Calendar(name="selectedDate")
        j = c.to_json()
        assert j["type"] == "Calendar"
        assert j["name"] == "selectedDate"
        assert j["mode"] == "single"

    def test_calendar_range_mode(self):
        c = Calendar(mode="range", name="dateRange")
        j = c.to_json()
        assert j["mode"] == "range"
