"""Tests for Separator component."""

from __future__ import annotations

from prefab_ui.components import Separator


def test_separator_serializes():
    j = Separator(orientation="vertical").to_json()
    assert j["type"] == "Separator"
    assert j["orientation"] == "vertical"
