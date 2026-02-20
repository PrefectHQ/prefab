"""Tests for text/typography components."""

from __future__ import annotations

import pytest

from prefab_ui.components import H1, Heading, P, Text


class TestTextAlign:
    @pytest.mark.parametrize("cls", [Text, H1, P, Heading], ids=lambda c: c.__name__)
    def test_align_compiles_to_css_class(self, cls):
        if cls is Heading:
            t = cls("hello", level=2, align="center")
        else:
            t = cls("hello", align="center")
        assert t.css_class == "text-center"

    @pytest.mark.parametrize("value", ["left", "center", "right", "justify"])
    def test_all_values(self, value):
        t = Text("hello", align=value)
        assert t.css_class == f"text-{value}"

    def test_align_excluded_from_json(self):
        t = Text("hello", align="center")
        j = t.to_json()
        assert "align" not in j
        assert j["cssClass"] == "text-center"

    def test_align_merges_with_css_class(self):
        t = Text("hello", align="center", css_class="font-bold")
        assert "text-center" in (t.css_class or "")
        assert "font-bold" in (t.css_class or "")

    def test_no_align_no_css_class(self):
        t = Text("hello")
        assert t.css_class is None

    def test_heading_inherits_bold_italic(self):
        h = Heading("title", level=1, bold=True, italic=True)
        j = h.to_json()
        assert j["bold"] is True
        assert j["italic"] is True


def test_text_to_json():
    t = Text(content="hello")
    j = t.to_json()
    assert j["type"] == "Text"
    assert j["content"] == "hello"
    assert "cssClass" not in j


def test_text_bold_italic():
    t = Text(content="important", bold=True, italic=True)
    j = t.to_json()
    assert j["bold"] is True
    assert j["italic"] is True

    t2 = Text(content="plain")
    j2 = t2.to_json()
    assert "bold" not in j2
    assert "italic" not in j2


def test_typography_bold_italic():
    h = H1("Title", bold=True)
    j = h.to_json()
    assert j["bold"] is True
    assert "italic" not in j

    p = P("body", italic=True)
    j = p.to_json()
    assert j["italic"] is True
    assert "bold" not in j
