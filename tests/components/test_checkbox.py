"""Tests for Checkbox component."""

from __future__ import annotations

from prefab_ui.components import Checkbox


def test_checkbox_serializes():
    j = Checkbox(label="Accept terms", value=True).to_json()
    assert j["type"] == "Checkbox"
    assert j["label"] == "Accept terms"
    assert j["value"] is True


def test_checkbox_default_value():
    c = Checkbox(label="Test")
    assert c.value is False
    assert c.checked is False


def test_checkbox_checked_property():
    c = Checkbox(value=True)
    assert c.checked is True


def test_checkbox_wire_has_no_checked():
    j = Checkbox(value=True).to_json()
    assert "checked" not in j
    assert j["value"] is True
