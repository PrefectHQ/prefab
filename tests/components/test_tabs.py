"""Tests for Tabs components."""

from __future__ import annotations

from prefab_ui.components import Tab, Tabs, Text


class TestTabsComponents:
    def test_tabs_structure(self):
        with Tabs(default_value="general") as tabs:
            with Tab("General"):
                Text(content="General content")
            with Tab("Advanced", disabled=True):
                Text(content="Advanced content")

        j = tabs.to_json()
        assert j["type"] == "Tabs"
        assert j["defaultValue"] == "general"
        assert len(j["children"]) == 2
        assert j["children"][0]["type"] == "Tab"
        assert j["children"][0]["title"] == "General"
        assert j["children"][1]["disabled"] is True

    def test_tab_positional_title(self):
        t = Tab("Settings")
        assert t.title == "Settings"

    def test_tab_value_defaults_to_none(self):
        t = Tab("Settings")
        j = t.to_json()
        assert "value" not in j
