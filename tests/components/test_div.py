"""Tests for Div and Span components."""

from __future__ import annotations

from prefab_ui.components import Div, Span


class TestDivStyle:
    def test_style_serializes(self):
        d = Div(
            style={"mask-image": "linear-gradient(to bottom, black 70%, transparent)"}
        )
        j = d.to_json()
        assert j["style"] == {
            "mask-image": "linear-gradient(to bottom, black 70%, transparent)"
        }

    def test_style_excluded_when_none(self):
        d = Div()
        j = d.to_json()
        assert "style" not in j

    def test_style_alongside_css_class(self):
        d = Div(css_class="overflow-hidden", style={"max-height": "800px"})
        j = d.to_json()
        assert j["cssClass"] == "overflow-hidden"
        assert j["style"] == {"max-height": "800px"}


class TestSpanStyle:
    def test_style_serializes(self):
        s = Span("hello", style={"color": "red"})
        j = s.to_json()
        assert j["style"] == {"color": "red"}

    def test_style_excluded_when_none(self):
        s = Span("hello")
        j = s.to_json()
        assert "style" not in j
