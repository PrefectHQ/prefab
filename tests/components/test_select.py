"""Tests for Select component."""

from __future__ import annotations

from prefab_ui.components import Select, SelectOption


def test_select_with_options():
    with Select(placeholder="Pick one", name="choice") as sel:
        SelectOption(value="a", label="Alpha")
        SelectOption(value="b", label="Beta")
    j = sel.to_json()
    assert j["type"] == "Select"
    assert j["placeholder"] == "Pick one"
    assert len(j["children"]) == 2
    assert j["children"][0]["value"] == "a"
    assert j["children"][1]["label"] == "Beta"
