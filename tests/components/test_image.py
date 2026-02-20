"""Tests for Image component."""

from __future__ import annotations

from prefab_ui.components import Image


def test_image_to_json():
    img = Image(src="https://img.example.com/pic.png", alt="A picture")
    j = img.to_json()
    assert j["type"] == "Image"
    assert j["src"] == "https://img.example.com/pic.png"
    assert j["alt"] == "A picture"
