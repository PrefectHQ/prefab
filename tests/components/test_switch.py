"""Tests for Switch component."""

from __future__ import annotations

from prefab_ui.components import Switch


def test_switch_serializes():
    j = Switch(label="Enable notifications").to_json()
    assert j["type"] == "Switch"
    assert j["label"] == "Enable notifications"
