"""Tests for Checkbox component."""

from __future__ import annotations

from prefab_ui.components import Checkbox


def test_checkbox_serializes():
    j = Checkbox(label="Accept terms", checked=True).to_json()
    assert j["type"] == "Checkbox"
    assert j["label"] == "Accept terms"
    assert j["checked"] is True
