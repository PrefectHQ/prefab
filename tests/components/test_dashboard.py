"""Tests for Dashboard and DashboardItem components."""

import pytest

from prefab_ui.components.dashboard import Dashboard, DashboardItem
from prefab_ui.components.text import Text


class TestDashboard:
    def test_default_serialization(self) -> None:
        grid = Dashboard()
        d = grid.to_json()
        assert d["type"] == "Dashboard"
        assert d["columns"] == 12
        assert d["rowHeight"] == 120
        assert "rows" not in d
        assert "gap" not in d
        assert "cssClass" not in d

    def test_custom_columns_and_row_height(self) -> None:
        grid = Dashboard(columns=6, row_height=200)
        d = grid.to_json()
        assert d["columns"] == 6
        assert d["rowHeight"] == 200

    def test_string_row_height(self) -> None:
        grid = Dashboard(row_height="auto")
        d = grid.to_json()
        assert d["rowHeight"] == "auto"

    def test_fixed_rows(self) -> None:
        grid = Dashboard(rows=4)
        d = grid.to_json()
        assert d["rows"] == 4

    def test_gap_compiles_to_css_class(self) -> None:
        grid = Dashboard(gap=4)
        d = grid.to_json()
        assert d["cssClass"] == "gap-4"
        assert "gap" not in d

    def test_gap_tuple_compiles_to_css_class(self) -> None:
        grid = Dashboard(gap=(2, 4))
        d = grid.to_json()
        assert d["cssClass"] == "gap-x-2 gap-y-4"

    def test_gap_merges_with_css_class(self) -> None:
        grid = Dashboard(gap=4, css_class="p-2")
        d = grid.to_json()
        assert "gap-4" in d["cssClass"]
        assert "p-2" in d["cssClass"]

    def test_context_manager_collects_children(self) -> None:
        with Dashboard() as grid:
            with DashboardItem():
                Text("cell 1")
            with DashboardItem():
                Text("cell 2")
        assert len(grid.children) == 2

    def test_children_serialized(self) -> None:
        with Dashboard() as grid:
            with DashboardItem():
                Text("hello")
        d = grid.to_json()
        assert len(d["children"]) == 1
        item = d["children"][0]
        assert item["type"] == "DashboardItem"
        assert len(item["children"]) == 1
        assert item["children"][0]["type"] == "Text"


class TestDashboardItem:
    def test_default_serialization(self) -> None:
        item = DashboardItem()
        d = item.to_json()
        assert d["type"] == "DashboardItem"
        assert d["col"] == 1
        assert d["row"] == 1
        assert d["colSpan"] == 1
        assert d["rowSpan"] == 1
        assert "zIndex" not in d

    def test_custom_position_and_span(self) -> None:
        item = DashboardItem(col=3, row=2, col_span=4, row_span=2)
        d = item.to_json()
        assert d["col"] == 3
        assert d["row"] == 2
        assert d["colSpan"] == 4
        assert d["rowSpan"] == 2

    def test_z_index(self) -> None:
        item = DashboardItem(z_index=10)
        d = item.to_json()
        assert d["zIndex"] == 10

    def test_z_index_excluded_when_none(self) -> None:
        item = DashboardItem()
        d = item.to_json()
        assert "zIndex" not in d

    def test_css_class_passthrough(self) -> None:
        item = DashboardItem(css_class="bg-blue-500")
        d = item.to_json()
        assert d["cssClass"] == "bg-blue-500"

    def test_context_manager_collects_children(self) -> None:
        with DashboardItem() as item:
            Text("content")
        assert len(item.children) == 1

    @pytest.mark.parametrize(
        ("col", "row", "col_span", "row_span"),
        [
            (1, 1, 12, 1),
            (5, 3, 4, 2),
            (1, 1, 1, 1),
        ],
    )
    def test_various_positions(
        self, col: int, row: int, col_span: int, row_span: int
    ) -> None:
        item = DashboardItem(col=col, row=row, col_span=col_span, row_span=row_span)
        d = item.to_json()
        assert d["col"] == col
        assert d["row"] == row
        assert d["colSpan"] == col_span
        assert d["rowSpan"] == row_span
