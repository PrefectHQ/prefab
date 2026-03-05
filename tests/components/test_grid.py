"""Tests for Grid and GridItem components."""

from prefab_ui.components import Card, Grid, GridItem, Text


class TestGridItem:
    def test_default_spans(self) -> None:
        item = GridItem()
        data = item.to_json()
        assert data["type"] == "GridItem"
        assert data["colSpan"] == 1
        assert data["rowSpan"] == 1

    def test_col_span(self) -> None:
        item = GridItem(col_span=3)
        data = item.to_json()
        assert data["colSpan"] == 3
        assert data["rowSpan"] == 1

    def test_row_span(self) -> None:
        item = GridItem(row_span=2)
        data = item.to_json()
        assert data["rowSpan"] == 2

    def test_both_spans(self) -> None:
        item = GridItem(col_span=2, row_span=3)
        data = item.to_json()
        assert data["colSpan"] == 2
        assert data["rowSpan"] == 3

    def test_context_manager_children(self) -> None:
        with GridItem(col_span=2) as item:
            Text("hello")
        assert len(item.children) == 1
        assert item.children[0].to_json()["content"] == "hello"

    def test_inside_grid(self) -> None:
        with Grid(columns=4, gap=4) as g:
            with GridItem(col_span=2):
                Card()
            Card()
        assert len(g.children) == 2
        assert g.children[0].to_json()["type"] == "GridItem"
        assert g.children[0].to_json()["colSpan"] == 2
        assert g.children[1].to_json()["type"] == "Card"

    def test_css_class_passthrough(self) -> None:
        item = GridItem(col_span=2, css_class="p-4")
        assert "p-4" in (item.css_class or "")
