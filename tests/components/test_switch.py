"""Tests for Switch component."""

from __future__ import annotations

from prefab_ui.components import Switch


def test_switch_serializes():
    j = Switch(label="Enable notifications").to_json()
    assert j["type"] == "Switch"
    assert j["label"] == "Enable notifications"


def test_switch_value():
    j = Switch(label="Toggle", value=True).to_json()
    assert j["value"] is True


def test_switch_checked_property():
    s = Switch(value=True)
    assert s.checked is True


def test_switch_wire_has_no_checked():
    j = Switch(value=True).to_json()
    assert "checked" not in j
