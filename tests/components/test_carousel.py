"""Tests for the Carousel component."""

from __future__ import annotations

from prefab_ui.components import Card, Carousel, Text


class TestCarousel:
    def test_basic_serialization(self):
        with Carousel() as c:
            Text("Slide 1")
            Text("Slide 2")
        j = c.to_json()
        assert j["type"] == "Carousel"
        assert len(j["children"]) == 2

    def test_defaults(self):
        c = Carousel()
        j = c.to_json()
        assert j["direction"] == "left"
        assert j["loop"] is True
        assert j.get("autoAdvance", 0) == 0
        assert j.get("continuous", False) is False
        assert j["showControls"] is True

    def test_reel_mode(self):
        c = Carousel(auto_advance=3000, show_controls=False, direction="down")
        j = c.to_json()
        assert j["autoAdvance"] == 3000
        assert j["showControls"] is False
        assert j["direction"] == "down"

    def test_marquee_mode(self):
        c = Carousel(continuous=True, speed=5, direction="left")
        j = c.to_json()
        assert j["continuous"] is True
        assert j["speed"] == 5

    def test_children_via_context_manager(self):
        with Carousel(loop=True) as c:
            Card()
            Card()
            Card()
        j = c.to_json()
        assert len(j["children"]) == 3
        assert all(child["type"] == "Card" for child in j["children"])

    def test_css_class(self):
        c = Carousel(css_class="h-[400px]")
        j = c.to_json()
        assert j["cssClass"] == "h-[400px]"
