"""Tests for Slider component."""

from __future__ import annotations

from prefab_ui.components import Slider


def test_slider_serializes():
    j = Slider(min=0, max=100, value=50, step=5).to_json()
    assert j["type"] == "Slider"
    assert j["min"] == 0
    assert j["max"] == 100
    assert j["value"] == 50
    assert j["step"] == 5
