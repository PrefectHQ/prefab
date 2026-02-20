"""Tests for Accordion components."""

from __future__ import annotations

from prefab_ui.components import Accordion, AccordionItem, Text


class TestAccordionComponents:
    def test_accordion_structure(self):
        with Accordion(multiple=True) as acc:
            with AccordionItem("First"):
                Text(content="Content 1")
            with AccordionItem("Second"):
                Text(content="Content 2")

        j = acc.to_json()
        assert j["type"] == "Accordion"
        assert j["multiple"] is True
        assert len(j["children"]) == 2
        assert j["children"][0]["title"] == "First"

    def test_accordion_item_positional(self):
        item = AccordionItem("Getting Started")
        assert item.title == "Getting Started"

    def test_accordion_default_single(self):
        acc = Accordion()
        j = acc.to_json()
        assert j["multiple"] is False
        assert j["collapsible"] is True

    def test_accordion_default_open_items_int(self):
        with Accordion(default_open_items=0) as acc:
            with AccordionItem("First"):
                Text(content="Content 1")
            with AccordionItem("Second"):
                Text(content="Content 2")

        j = acc.to_json()
        assert j["defaultValues"] == ["First"]

    def test_accordion_default_open_items_list(self):
        with Accordion(multiple=True, default_open_items=[0, 1]) as acc:
            with AccordionItem("First"):
                Text(content="Content 1")
            with AccordionItem("Second"):
                Text(content="Content 2")

        j = acc.to_json()
        assert j["defaultValues"] == ["First", "Second"]

    def test_accordion_default_open_items_str(self):
        with Accordion(default_open_items="faq") as acc:
            with AccordionItem("FAQ", value="faq"):
                Text(content="Content")

        j = acc.to_json()
        assert j["defaultValues"] == ["faq"]
