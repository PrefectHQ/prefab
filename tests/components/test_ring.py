"""Tests for Ring component."""

from __future__ import annotations

import pytest

from prefab_ui.components import H1, Ring, Text


class TestRingComponent:
    def test_ring_defaults(self):
        r = Ring(value=50)
        j = r.to_json()
        assert j["type"] == "Ring"
        assert j["value"] == 50
        assert j["min"] == 0
        assert j["max"] == 100
        assert j["variant"] == "default"
        assert j["size"] == "default"
        assert j["thickness"] == 6

    def test_ring_with_label(self):
        r = Ring(value=75, label="75%")
        j = r.to_json()
        assert j["label"] == "75%"

    def test_ring_with_min_max(self):
        r = Ring(value=30, min=10, max=50)
        j = r.to_json()
        assert j["value"] == 30
        assert j["min"] == 10
        assert j["max"] == 50

    @pytest.mark.parametrize(
        "variant",
        ["default", "success", "warning", "destructive", "info", "muted"],
    )
    def test_ring_variant(self, variant: str):
        r = Ring(value=50, variant=variant)
        j = r.to_json()
        assert j["variant"] == variant

    @pytest.mark.parametrize("size", ["sm", "default", "lg"])
    def test_ring_size(self, size: str):
        r = Ring(value=50, size=size)
        j = r.to_json()
        assert j["size"] == size

    def test_ring_thickness(self):
        r = Ring(value=50, thickness=10)
        j = r.to_json()
        assert j["thickness"] == 10

    def test_ring_expression_value(self):
        r = Ring(value="{{ cpu }}", label="{{ cpu }}%")
        j = r.to_json()
        assert j["value"] == "{{ cpu }}"
        assert j["label"] == "{{ cpu }}%"

    def test_ring_with_children(self):
        with Ring(value=75, variant="success", size="lg") as r:
            H1("75%")
        j = r.to_json()
        assert j["value"] == 75
        assert len(j["children"]) == 1
        assert j["children"][0]["type"] == "H1"

    def test_ring_children_and_label(self):
        with Ring(value=50, label="fallback") as r:
            Text("custom")
        j = r.to_json()
        assert j["label"] == "fallback"
        assert len(j["children"]) == 1
