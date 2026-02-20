"""Tests for HoverCard component."""

from __future__ import annotations

from prefab_ui.components import Badge, Column, HoverCard, Muted, Text


class TestHoverCardComponent:
    def test_hover_card_to_json(self):
        with HoverCard(side="top") as hc:
            Badge("Trigger")
            with Column(gap=2):
                Text("Content")

        j = hc.to_json()
        assert j["type"] == "HoverCard"
        assert j["side"] == "top"
        assert len(j["children"]) == 2

    def test_hover_card_delays(self):
        hc = HoverCard(open_delay=0, close_delay=300)
        j = hc.to_json()
        assert j["openDelay"] == 0
        assert j["closeDelay"] == 300

    def test_hover_card_delays_omitted_when_none(self):
        hc = HoverCard()
        j = hc.to_json()
        assert "openDelay" not in j
        assert "closeDelay" not in j

    def test_hover_card_first_child_is_trigger(self):
        with HoverCard() as hc:
            Badge("Trigger badge")
            Text("Hover content")
            Muted("More content")

        j = hc.to_json()
        assert j["children"][0]["type"] == "Badge"
        assert j["children"][1]["type"] == "Text"
        assert j["children"][2]["type"] == "Muted"
