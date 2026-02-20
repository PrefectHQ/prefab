"""Tests for Slot component."""

from __future__ import annotations

from prefab_ui.components import Column, Slot, Text


class TestSlotComponent:
    def test_slot_positional_name(self):
        s = Slot("detail_view")
        j = s.to_json()
        assert j["type"] == "Slot"
        assert j["name"] == "detail_view"

    def test_slot_no_children_excluded(self):
        j = Slot("chart").to_json()
        assert "children" not in j

    def test_slot_with_fallback_children(self):
        with Slot("chart") as s:
            Text(content="No chart loaded")

        j = s.to_json()
        assert j["type"] == "Slot"
        assert j["name"] == "chart"
        assert len(j["children"]) == 1
        assert j["children"][0]["type"] == "Text"
        assert j["children"][0]["content"] == "No chart loaded"

    def test_slot_with_css_class(self):
        j = Slot("content", css_class="min-h-40").to_json()
        assert j["cssClass"] == "min-h-40"

    def test_slot_in_container(self):
        with Column() as col:
            Text(content="Header")
            Slot("dynamic_content")

        j = col.to_json()
        assert len(j["children"]) == 2
        assert j["children"][1]["type"] == "Slot"
        assert j["children"][1]["name"] == "dynamic_content"
