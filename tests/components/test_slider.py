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


def test_slider_range_serializes():
    j = Slider(min=0, max=100, value=[20, 80], range=True).to_json()
    assert j["type"] == "Slider"
    assert j["value"] == [20, 80]
    assert j["range"] is True


def test_slider_range_omitted_when_false():
    j = Slider(min=0, max=100, value=50).to_json()
    assert "range" not in j


def test_slider_range_with_step():
    j = Slider(min=0, max=100, value=[10, 90], step=10, range=True).to_json()
    assert j["value"] == [10, 90]
    assert j["step"] == 10
    assert j["range"] is True


def test_slider_single_value_backward_compatible():
    s = Slider(min=0, max=100, value=50)
    assert s.value == 50
    assert s.range is False
