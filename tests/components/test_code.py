"""Tests for Code component."""

from __future__ import annotations

from prefab_ui.components import Code


def test_code_to_json():
    c = Code(content="print('hi')", language="python")
    j = c.to_json()
    assert j["type"] == "Code"
    assert j["content"] == "print('hi')"
    assert j["language"] == "python"


def test_code_without_language():
    c = Code(content="hello")
    j = c.to_json()
    assert "language" not in j
