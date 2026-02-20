"""Tests for Radio component."""

from __future__ import annotations

from prefab_ui.components import Radio, RadioGroup


def test_radio_group():
    with RadioGroup(name="size") as group:
        Radio(value="sm", label="Small")
        Radio(value="lg", label="Large")
    j = group.to_json()
    assert j["type"] == "RadioGroup"
    assert j["name"] == "size"
    assert len(j["children"]) == 2
    assert j["children"][0]["value"] == "sm"
