"""Tests for Pages components."""

from __future__ import annotations

from prefab_ui.components import Page, Pages, Text


class TestPagesComponents:
    def test_pages_structure(self):
        with Pages(name="currentPage", default_value="home") as pages:
            with Page("Home"):
                Text(content="Home content")
            with Page("Settings"):
                Text(content="Settings content")

        j = pages.to_json()
        assert j["type"] == "Pages"
        assert j["name"] == "currentPage"
        assert j["defaultValue"] == "home"
        assert len(j["children"]) == 2
        assert j["children"][0]["title"] == "Home"

    def test_page_positional(self):
        p = Page("Profile")
        assert p.title == "Profile"
