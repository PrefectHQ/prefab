"""Tests for Calendar component."""

from __future__ import annotations

import datetime
import json

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


class TestCalendarValue:
    def test_single_date_converts_to_iso(self):
        c = Calendar(value=datetime.date(2026, 5, 4))
        assert c.value == "2026-05-04T12:00:00.000Z"

    def test_value_excluded_from_json(self):
        c = Calendar(value=datetime.date(2026, 5, 4))
        j = c.to_json()
        assert "value" not in j

    def test_range_dict_converts_to_json_object(self):
        c = Calendar(
            mode="range",
            value={
                "from": datetime.date(2025, 6, 10),
                "to": datetime.date(2025, 6, 20),
            },
        )
        parsed = json.loads(c.value)
        assert parsed == {
            "from": "2025-06-10T12:00:00.000Z",
            "to": "2025-06-20T12:00:00.000Z",
        }

    def test_multiple_dates_convert_to_json_array(self):
        c = Calendar(
            mode="multiple",
            value=[
                datetime.date(2025, 6, 10),
                datetime.date(2025, 6, 15),
                datetime.date(2025, 6, 22),
            ],
        )
        parsed = json.loads(c.value)
        assert parsed == [
            "2025-06-10T12:00:00.000Z",
            "2025-06-15T12:00:00.000Z",
            "2025-06-22T12:00:00.000Z",
        ]

    def test_none_value_by_default(self):
        c = Calendar()
        assert c.value is None

    def test_string_value_passthrough(self):
        c = Calendar(value="2026-05-04T12:00:00.000Z")
        assert c.value == "2026-05-04T12:00:00.000Z"


class TestCalendarGetInitialValue:
    def test_returns_none_when_no_value(self):
        c = Calendar()
        assert c._get_initial_value() is None

    def test_returns_iso_string_for_date(self):
        c = Calendar(value=datetime.date(2026, 5, 4))
        assert c._get_initial_value() == "2026-05-04T12:00:00.000Z"

    def test_returns_json_for_range(self):
        c = Calendar(
            mode="range",
            value={
                "from": datetime.date(2025, 6, 10),
                "to": datetime.date(2025, 6, 20),
            },
        )
        val = c._get_initial_value()
        assert val is not None
        parsed = json.loads(val)
        assert "from" in parsed
        assert "to" in parsed
