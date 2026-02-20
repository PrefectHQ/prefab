"""Tests for Markdown component."""

from __future__ import annotations

from prefab_ui.components import Markdown


def test_markdown_to_json():
    m = Markdown(content="**bold**")
    j = m.to_json()
    assert j["type"] == "Markdown"
    assert j["content"] == "**bold**"


class TestMarkdownPositionalArg:
    def test_markdown_positional(self):
        m = Markdown("# Hello")
        assert m.content == "# Hello"

    def test_markdown_keyword(self):
        m = Markdown(content="**bold**")
        assert m.content == "**bold**"
