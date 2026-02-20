"""Tests for Heading component."""

from __future__ import annotations

from prefab_ui.components import Heading


def test_heading_to_json():
    h = Heading(content="Title", level=2, css_class="mb-4")
    j = h.to_json()
    assert j["type"] == "Heading"
    assert j["content"] == "Title"
    assert j["level"] == 2
    assert j["cssClass"] == "mb-4"
