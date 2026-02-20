"""Tests for Tooltip component."""

from __future__ import annotations

from prefab_ui.components import Button, Tooltip


class TestTooltipComponent:
    def test_tooltip_to_json(self):
        with Tooltip("Save changes", side="top") as tip:
            Button(label="Save")

        j = tip.to_json()
        assert j["type"] == "Tooltip"
        assert j["content"] == "Save changes"
        assert j["side"] == "top"
        assert len(j["children"]) == 1

    def test_tooltip_positional(self):
        t = Tooltip("Hover text")
        assert t.content == "Hover text"
