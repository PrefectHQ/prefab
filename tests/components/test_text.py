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
        t = Text("hello", align="center", css_class="text-red-500")
        assert "text-center" in (t.css_class or "")
        assert "text-red-500" in (t.css_class or "")

    def test_no_align_no_css_class(self):
        t = Text("hello")
        assert t.css_class is None


class TestTextBoldItalic:
    def test_bold_compiles_to_css_class(self):
        t = Text("important", bold=True)
        j = t.to_json()
        assert "bold" not in j
        assert "font-bold" in (j.get("cssClass") or "")

    def test_italic_compiles_to_css_class(self):
        t = Text("emphasis", italic=True)
        j = t.to_json()
        assert "italic" not in j
        assert "italic" in (j.get("cssClass") or "")

    def test_bold_and_italic_together(self):
        t = Text("strong emphasis", bold=True, italic=True)
        j = t.to_json()
        assert "bold" not in j
        assert not j.get("italic")
        css = j.get("cssClass") or ""
        assert "font-bold" in css
        assert "italic" in css

    def test_none_values_no_css_class(self):
        t = Text("plain")
        j = t.to_json()
        assert "bold" not in j
        assert "italic" not in j
        assert "cssClass" not in j

    def test_merges_with_existing_css_class(self):
        t = Text("hello", bold=True, css_class="text-red-500")
        css = t.css_class or ""
        assert "font-bold" in css
        assert "text-red-500" in css

    def test_heading_bold_italic(self):
        h = Heading("title", level=1, bold=True, italic=True)
        j = h.to_json()
        assert "bold" not in j
        assert "italic" not in j
        css = j.get("cssClass") or ""
        assert "font-bold" in css
        assert "italic" in css

    @pytest.mark.parametrize("cls", [H1, P], ids=lambda c: c.__name__)
    def test_typography_subclasses(self, cls):
        t = cls("content", bold=True)
        j = t.to_json()
        assert "bold" not in j
        assert "font-bold" in (j.get("cssClass") or "")

    def test_bold_italic_with_align(self):
        t = Text("hello", bold=True, italic=True, align="center")
        css = t.css_class or ""
        assert "font-bold" in css
        assert "italic" in css
        assert "text-center" in css


def test_text_to_json():
    t = Text(content="hello")
    j = t.to_json()
    assert j["type"] == "Text"
    assert j["content"] == "hello"
    assert "cssClass" not in j
