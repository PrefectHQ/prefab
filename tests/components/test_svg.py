"""Tests for Svg component."""

from __future__ import annotations

from prefab_ui.components import Svg


def test_svg_to_json():
    s = Svg(content='<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg>')
    j = s.to_json()
    assert j["type"] == "Svg"
    assert "<circle" in j["content"]


def test_svg_positional():
    s = Svg("<svg><rect width='10' height='10'/></svg>")
    assert "<rect" in s.to_json()["content"]


def test_svg_dimensions():
    s = Svg(content="<svg></svg>", width="200px", height="200px")
    j = s.to_json()
    assert j["width"] == "200px"
    assert j["height"] == "200px"


def test_svg_none_fields_excluded():
    s = Svg(content="<svg></svg>")
    j = s.to_json()
    assert "width" not in j
    assert "height" not in j
