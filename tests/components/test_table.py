"""Tests for Table components."""

from __future__ import annotations

from prefab_ui.actions import ShowToast
from prefab_ui.components import (
    Badge,
    DataTable,
    DataTableColumn,
    ExpandableRow,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Text,
)
from prefab_ui.components.charts import Sparkline
from prefab_ui.rx import Rx


class TestTableComponents:
    def test_table_structure(self):
        with Table() as table:
            TableCaption("Invoices")
            with TableHeader():
                with TableRow():
                    TableHead("Name")
                    TableHead("Amount")
            with TableBody():
                with TableRow():
                    TableCell("Alice")
                    TableCell("$100")

        j = table.to_json()
        assert j["type"] == "Table"
        assert len(j["children"]) == 3
        assert j["children"][0]["type"] == "TableCaption"
        assert j["children"][0]["content"] == "Invoices"
        assert j["children"][1]["type"] == "TableHeader"
        assert j["children"][2]["type"] == "TableBody"

    def test_table_cell_positional(self):
        c = TableCell("$250.00")
        j = c.to_json()
        assert j["content"] == "$250.00"

    def test_table_head_positional(self):
        h = TableHead("Name")
        j = h.to_json()
        assert j["content"] == "Name"

    def test_table_caption_positional(self):
        c = TableCaption("A list of items")
        j = c.to_json()
        assert j["content"] == "A list of items"


class TestDataTableComponent:
    def test_data_table_to_json(self):
        dt = DataTable(
            columns=[
                DataTableColumn(key="name", header="Name", sortable=True),
                DataTableColumn(key="email", header="Email"),
            ],
            rows=[{"name": "Alice", "email": "alice@example.com"}],
            search=True,
            paginated=True,
            page_size=25,
        )
        j = dt.to_json()
        assert j["type"] == "DataTable"
        assert len(j["columns"]) == 2
        assert j["columns"][0]["key"] == "name"
        assert j["columns"][0]["sortable"] is True
        assert j["columns"][1]["sortable"] is False
        assert j["search"] is True
        assert j["paginated"] is True
        assert j["pageSize"] == 25
        assert len(j["rows"]) == 1

    def test_data_table_component_cell(self):
        badge = Badge("Active")
        dt = DataTable(
            columns=[
                DataTableColumn(key="name", header="Name"),
                DataTableColumn(key="status", header="Status"),
            ],
            rows=[{"name": "Alice", "status": badge}],
        )
        j = dt.to_json()
        row = j["rows"][0]
        assert row["name"] == "Alice"
        assert isinstance(row["status"], dict)
        assert row["status"]["type"] == "Badge"

    def test_data_table_sparkline_cell(self):
        sparkline = Sparkline(data=[1, 2, 3, 4, 5])
        dt = DataTable(
            columns=[
                DataTableColumn(key="trend", header="Trend"),
            ],
            rows=[{"trend": sparkline}],
        )
        j = dt.to_json()
        cell = j["rows"][0]["trend"]
        assert isinstance(cell, dict)
        assert cell["type"] == "Sparkline"
        assert cell["data"] == [1, 2, 3, 4, 5]

    def test_data_table_mixed_cells(self):
        dt = DataTable(
            columns=[
                DataTableColumn(key="name", header="Name"),
                DataTableColumn(key="score", header="Score"),
                DataTableColumn(key="badge", header="Badge"),
            ],
            rows=[
                {"name": "Alice", "score": 95, "badge": Badge("gold")},
                {"name": "Bob", "score": 80, "badge": "silver"},
            ],
        )
        j = dt.to_json()
        assert j["rows"][0]["name"] == "Alice"
        assert j["rows"][0]["score"] == 95
        assert isinstance(j["rows"][0]["badge"], dict)
        assert j["rows"][0]["badge"]["type"] == "Badge"
        assert j["rows"][1]["badge"] == "silver"

    def test_data_table_string_rows_unchanged(self):
        dt = DataTable(
            columns=[DataTableColumn(key="name", header="Name")],
            rows="{{ users }}",
        )
        j = dt.to_json()
        assert j["rows"] == "{{ users }}"

    def test_data_table_on_row_click(self):
        dt = DataTable(
            columns=[DataTableColumn(key="name", header="Name")],
            rows=[{"name": "Alice"}],
            on_row_click=ShowToast("Row clicked"),
        )
        j = dt.to_json()
        assert "onRowClick" in j
        assert j["onRowClick"]["action"] == "showToast"
        assert j["onRowClick"]["message"] == "Row clicked"

    def test_data_table_rx_rows(self):
        rx = Rx("users")
        dt = DataTable(
            columns=[DataTableColumn(key="name", header="Name")],
            rows=rx,
        )
        j = dt.to_json()
        assert j["rows"] == "{{ users }}"

    def test_data_table_on_row_click_list(self):
        dt = DataTable(
            columns=[DataTableColumn(key="name", header="Name")],
            rows=[{"name": "Alice"}],
            on_row_click=[ShowToast("First"), ShowToast("Second")],
        )
        j = dt.to_json()
        assert isinstance(j["onRowClick"], list)
        assert len(j["onRowClick"]) == 2
        assert j["onRowClick"][0]["action"] == "showToast"


class TestExpandableRow:
    def test_expandable_row_serialization(self):
        dt = DataTable(
            columns=[DataTableColumn(key="name", header="Name")],
            rows=[
                ExpandableRow({"name": "Alice"}, detail=Text("Details here")),
            ],
        )
        j = dt.to_json()
        row = j["rows"][0]
        assert row["name"] == "Alice"
        assert "_detail" in row
        assert row["_detail"]["type"] == "Text"

    def test_mixed_expandable_and_plain_rows(self):
        dt = DataTable(
            columns=[DataTableColumn(key="name", header="Name")],
            rows=[
                ExpandableRow({"name": "Alice"}, detail=Text("Alice details")),
                {"name": "Bob"},
                ExpandableRow({"name": "Charlie"}, detail=Text("Charlie details")),
            ],
        )
        j = dt.to_json()
        assert j["rows"][0]["name"] == "Alice"
        assert "_detail" in j["rows"][0]
        assert j["rows"][1]["name"] == "Bob"
        assert "_detail" not in j["rows"][1]
        assert j["rows"][2]["name"] == "Charlie"
        assert "_detail" in j["rows"][2]

    def test_expandable_row_preserves_cell_components(self):
        dt = DataTable(
            columns=[
                DataTableColumn(key="name", header="Name"),
                DataTableColumn(key="status", header="Status"),
            ],
            rows=[
                ExpandableRow(
                    {"name": "Alice", "status": Badge("Active")},
                    detail=Text("Full profile"),
                ),
            ],
        )
        j = dt.to_json()
        row = j["rows"][0]
        assert row["name"] == "Alice"
        assert isinstance(row["status"], dict)
        assert row["status"]["type"] == "Badge"
        assert row["_detail"]["type"] == "Text"

    def test_no_expandable_rows_unchanged(self):
        dt = DataTable(
            columns=[DataTableColumn(key="name", header="Name")],
            rows=[{"name": "Alice"}, {"name": "Bob"}],
        )
        j = dt.to_json()
        assert len(j["rows"]) == 2
        assert "_detail" not in j["rows"][0]
        assert "_detail" not in j["rows"][1]
