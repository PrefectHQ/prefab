"""Tests for Popover component."""

from __future__ import annotations

from prefab_ui.components import Popover


class TestPopoverComponent:
    def test_popover_to_json(self):
        p = Popover(title="Settings", description="Configure options")
        j = p.to_json()
        assert j["type"] == "Popover"
        assert j["title"] == "Settings"
        assert j["description"] == "Configure options"
