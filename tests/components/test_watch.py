"""Tests for Watch component."""

from __future__ import annotations

from prefab_ui.actions import SetState, ShowToast, ToggleState
from prefab_ui.components import Column, Text, Watch
from prefab_ui.rx import Rx


class TestWatchCreation:
    def test_positional_key(self):
        w = Watch("slider_a")
        assert w.key == "slider_a"

    def test_keyword_key(self):
        w = Watch(key="slider_a")
        assert w.key == "slider_a"

    def test_rx_key(self):
        w = Watch(Rx("slider_a"))
        assert w.key == "{{ slider_a }}"

    def test_with_on_change_action(self):
        w = Watch("theme", on_change=SetState("palette", "dark"))
        assert w.on_change is not None

    def test_with_on_change_action_list(self):
        actions = [SetState("a", 1), ShowToast("Updated")]
        w = Watch("x", on_change=actions)
        assert isinstance(w.on_change, list)
        assert len(w.on_change) == 2

    def test_no_on_change(self):
        w = Watch("x")
        assert w.on_change is None


class TestWatchSerialization:
    def test_basic_serialization(self):
        w = Watch("count", on_change=SetState("doubled", "{{ count * 2 }}"))
        j = w.to_json()
        assert j["type"] == "Watch"
        assert j["key"] == "count"
        assert j["onChange"]["action"] == "setState"
        assert j["onChange"]["key"] == "doubled"

    def test_serialization_with_list(self):
        w = Watch(
            "items",
            on_change=[
                SetState("count", "{{ items | length }}"),
                ShowToast("Items changed"),
            ],
        )
        j = w.to_json()
        assert j["type"] == "Watch"
        assert j["key"] == "items"
        assert isinstance(j["onChange"], list)
        assert len(j["onChange"]) == 2
        assert j["onChange"][0]["action"] == "setState"
        assert j["onChange"][1]["action"] == "showToast"

    def test_serialization_excludes_none(self):
        j = Watch("x").to_json()
        assert "onChange" not in j
        assert j["type"] == "Watch"
        assert j["key"] == "x"

    def test_rx_expression_key(self):
        w = Watch("{{ a + b }}", on_change=SetState("sum_changed", True))
        j = w.to_json()
        assert j["key"] == "{{ a + b }}"

    def test_bare_key_stays_bare(self):
        j = Watch("slider_a").to_json()
        assert j["key"] == "slider_a"


class TestWatchInTree:
    def test_watch_in_column(self):
        with Column() as col:
            Watch("slider_a", on_change=SetState("normalized", "{{ slider_a / 100 }}"))
            Text(content="Hello")

        j = col.to_json()
        assert len(j["children"]) == 2
        assert j["children"][0]["type"] == "Watch"
        assert j["children"][1]["type"] == "Text"

    def test_multiple_watchers(self):
        with Column() as col:
            Watch("a", on_change=SetState("sum", "{{ a + b }}"))
            Watch("b", on_change=SetState("sum", "{{ a + b }}"))

        j = col.to_json()
        assert len(j["children"]) == 2
        assert j["children"][0]["key"] == "a"
        assert j["children"][1]["key"] == "b"

    def test_watch_with_toggle(self):
        w = Watch("dark_mode", on_change=ToggleState("needs_refresh"))
        j = w.to_json()
        assert j["onChange"]["action"] == "toggleState"

    def test_watch_with_css_class(self):
        j = Watch("x", css_class="hidden").to_json()
        assert j["cssClass"] == "hidden"
