"""Tests for on_mount action support."""

from __future__ import annotations

from prefab_ui.actions import SetState, ShowToast
from prefab_ui.actions.timing import SetInterval
from prefab_ui.app import PrefabApp
from prefab_ui.components import Column, Text


class TestComponentOnMount:
    def test_on_mount_serializes(self):
        t = Text("Hi", on_mount=SetState("loaded", True))
        j = t.to_json()
        assert j["onMount"] == {"action": "setState", "key": "loaded", "value": True}

    def test_on_mount_list(self):
        t = Text(
            "Hi",
            on_mount=[
                SetState("loaded", True),
                ShowToast("Ready"),
            ],
        )
        j = t.to_json()
        assert isinstance(j["onMount"], list)
        assert len(j["onMount"]) == 2

    def test_on_mount_excluded_when_none(self):
        t = Text("Hi")
        j = t.to_json()
        assert "onMount" not in j

    def test_on_mount_on_container(self):
        with Column(on_mount=ShowToast("Loaded")) as col:
            Text("Child")
        j = col.to_json()
        assert j["onMount"]["action"] == "showToast"


class TestPrefabAppOnMount:
    def test_on_mount_propagates_to_root_div(self):
        app = PrefabApp(
            view=Text("Hello"),
            on_mount=ShowToast("App loaded!"),
        )
        j = app.to_json()
        assert j["view"]["onMount"]["action"] == "showToast"

    def test_on_mount_with_context_manager(self):
        with PrefabApp(on_mount=ShowToast("Ready")) as app:
            Text("Content")
        j = app.to_json()
        assert j["view"]["onMount"]["action"] == "showToast"

    def test_on_mount_none_excluded(self):
        app = PrefabApp(view=Text("Hello"))
        j = app.to_json()
        assert "onMount" not in j["view"]

    def test_on_mount_with_set_interval(self):
        app = PrefabApp(
            view=Text("Dashboard"),
            on_mount=SetInterval(
                duration=3000,
                on_tick=SetState("tick", True),
            ),
        )
        j = app.to_json()
        assert j["view"]["onMount"]["action"] == "setInterval"
        assert j["view"]["onMount"]["duration"] == 3000
