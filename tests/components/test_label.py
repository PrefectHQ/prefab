"""Tests for Label component."""

from __future__ import annotations

from prefab_ui.components import Label


def test_label_serializes():
    j = Label("Username").to_json()
    assert j["type"] == "Label"
    assert j["text"] == "Username"
