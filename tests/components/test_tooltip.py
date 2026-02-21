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

    def test_tooltip_delay(self):
        with Tooltip("Fast", delay=0) as tip:
            Button(label="Save")

        j = tip.to_json()
        assert j["delay"] == 0

    def test_tooltip_delay_omitted_when_none(self):
        t = Tooltip("Default delay")
        j = t.to_json()
        assert "delay" not in j
