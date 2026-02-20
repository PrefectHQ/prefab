"""Tests for Table components."""

from __future__ import annotations

from prefab_ui.components import (
    DataTable,
    DataTableColumn,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
)


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
            searchable=True,
            paginated=True,
            page_size=25,
        )
        j = dt.to_json()
        assert j["type"] == "DataTable"
        assert len(j["columns"]) == 2
        assert j["columns"][0]["key"] == "name"
        assert j["columns"][0]["sortable"] is True
        assert j["columns"][1]["sortable"] is False
        assert j["searchable"] is True
        assert j["paginated"] is True
        assert j["pageSize"] == 25
        assert len(j["rows"]) == 1
