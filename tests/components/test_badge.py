"""Tests for Badge component."""

from __future__ import annotations

from prefab_ui.components import Badge


def test_badge_serializes():
    j = Badge("New", variant="destructive").to_json()
    assert j["type"] == "Badge"
    assert j["label"] == "New"
    assert j["variant"] == "destructive"
