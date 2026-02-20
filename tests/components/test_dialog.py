"""Tests for Dialog component."""

from __future__ import annotations

from prefab_ui.components import Dialog


class TestDialogComponent:
    def test_dialog_to_json(self):
        d = Dialog(title="Confirm", description="Are you sure?")
        j = d.to_json()
        assert j["type"] == "Dialog"
        assert j["title"] == "Confirm"
        assert j["description"] == "Are you sure?"
