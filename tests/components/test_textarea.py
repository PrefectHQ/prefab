"""Tests for Textarea component."""

from __future__ import annotations

from prefab_ui.components import Textarea


def test_textarea_serializes():
    j = Textarea(placeholder="Enter text", name="body").to_json()
    assert j["type"] == "Textarea"
    assert j["placeholder"] == "Enter text"


def test_textarea_min_max_length():
    j = Textarea(name="bio", min_length=10, max_length=500).to_json()
    assert j["minLength"] == 10
    assert j["maxLength"] == 500
