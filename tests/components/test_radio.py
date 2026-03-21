"""Tests for Radio component."""

from __future__ import annotations

from prefab_ui.components import Radio, RadioGroup


def test_radio_group():
    with RadioGroup(name="size") as group:
        Radio(option="sm", label="Small")
        Radio(option="lg", label="Large")
    j = group.to_json()
    assert j["type"] == "RadioGroup"
    assert j["name"] == "size"
    assert len(j["children"]) == 2
    assert j["children"][0]["option"] == "sm"


def test_radio_option_defaults_from_label():
    r = Radio(label="Small")
    assert r.option == "Small"


def test_radio_value_is_bool():
    r = Radio(option="sm", label="Small", value=True)
    assert r.value is True
    assert r.checked is True


def test_radio_wire_format():
    j = Radio(option="sm", label="Small", value=True).to_json()
    assert j["option"] == "sm"
    assert j["value"] is True
    assert "checked" not in j


def test_radio_group_value():
    g = RadioGroup(name="size", value="lg")
    j = g.to_json()
    assert j["value"] == "lg"
