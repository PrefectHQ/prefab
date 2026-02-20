"""Tests for DatePicker component."""

from __future__ import annotations

from prefab_ui.components import DatePicker


class TestDatePickerComponent:
    def test_date_picker_to_json(self):
        dp = DatePicker(placeholder="Select date", name="deadline")
        j = dp.to_json()
        assert j["type"] == "DatePicker"
        assert j["placeholder"] == "Select date"
        assert j["name"] == "deadline"

    def test_date_picker_default_placeholder(self):
        dp = DatePicker(name="date")
        j = dp.to_json()
        assert j["placeholder"] == "Pick a date"
