"""Tests for the Mermaid diagram component."""

from __future__ import annotations

from prefab_ui.components.mermaid import Mermaid


class TestMermaid:
    def test_positional_chart(self):
        m = Mermaid("graph LR; A-->B")
        j = m.to_json()
        assert j["type"] == "Mermaid"
        assert j["chart"] == "graph LR; A-->B"

    def test_keyword_chart(self):
        m = Mermaid(chart="sequenceDiagram\n  A->>B: Hello")
        j = m.to_json()
        assert j["chart"] == "sequenceDiagram\n  A->>B: Hello"

    def test_css_class(self):
        m = Mermaid("graph TD; X-->Y", css_class="my-4")
        j = m.to_json()
        assert j["cssClass"] == "my-4"

    def test_no_optional_fields_in_json(self):
        m = Mermaid("graph LR; A-->B")
        j = m.to_json()
        assert "children" not in j
