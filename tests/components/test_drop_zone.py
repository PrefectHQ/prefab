"""Tests for DropZone component."""

from __future__ import annotations

from prefab_ui.components import DropZone


class TestDropZone:
    def test_minimal_excludes_none_fields(self):
        j = DropZone().to_json()
        assert j["type"] == "DropZone"
        for key in ("label", "description", "accept", "maxSize", "name", "onChange"):
            assert key not in j

    def test_with_all_props(self):
        j = DropZone(
            label="Drop files here",
            description="PNG, JPG up to 10MB",
            accept="image/*",
            multiple=True,
            max_size=10_000_000,
            disabled=True,
            name="uploaded_files",
        ).to_json()
        assert j["label"] == "Drop files here"
        assert j["description"] == "PNG, JPG up to 10MB"
        assert j["accept"] == "image/*"
        assert j["multiple"] is True
        assert j["maxSize"] == 10_000_000
        assert j["disabled"] is True
        assert j["name"] == "uploaded_files"
