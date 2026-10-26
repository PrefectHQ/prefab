"""Tests for Tabs components."""

from __future__ import annotations

from prefab_ui.components import Tab, Tabs, Text


class TestTabsComponents:
    def test_tabs_structure(self):
        with Tabs(value="general") as tabs:
            with Tab("General"):
                Text(content="General content")
            with Tab("Advanced", disabled=True):
                Text(content="Advanced content")

        j = tabs.to_json()
        assert j["type"] == "Tabs"
        assert j["value"] == "general"
        assert "defaultValue" not in j
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

    def test_tabs_default_variant(self):
        tabs = Tabs()
        j = tabs.to_json()
        assert j.get("variant") == "default"

    def test_tabs_line_variant(self):
        tabs = Tabs(variant="line")
        j = tabs.to_json()
        assert j["variant"] == "line"

    def test_tabs_default_value_property(self):
        tabs = Tabs(value="settings")
        assert tabs.default_value == "settings"

    def test_public_change_callback_serializes_in_app_envelope(self):
        from prefab_ui.actions import SetState
        from prefab_ui.app import PrefabApp

        with Tabs(
            name="active", value="a", on_change=SetState("seen", "{{ active }}")
        ) as tabs:
            Tab("Alpha", value="a")
            Tab("Beta", value="b")
        payload = PrefabApp(view=tabs, state={"active": "a"}).to_json()
        wire = payload["view"]["children"][0]
        assert wire["onChange"] == {
            "action": "setState",
            "key": "seen",
            "value": "{{ active }}",
        }
        assert "onValueChange" not in wire
