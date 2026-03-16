"""DataTable — a high-level table with built-in sorting, filtering, pagination.

Built on @tanstack/react-table in the renderer.

Example::

    from prefab_ui.components import DataTable, DataTableColumn

    DataTable(
        columns=[
            DataTableColumn(key="name", header="Name", sortable=True),
            DataTableColumn(key="email", header="Email"),
            DataTableColumn(key="role", header="Role"),
        ],
        rows="{{ users }}",
        searchable=True,
        paginated=True,
    )
"""

from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, Field, model_validator

from prefab_ui.components.base import Component


def _serialize_cell_value(value: Any) -> Any:
    """Serialize a cell value, recursively calling to_json() for Component instances."""
    if isinstance(value, Component):
        return value.to_json()
    return value


class DataTableColumn(BaseModel):
    """Column definition for DataTable."""

    model_config = {"populate_by_name": True}

    key: str = Field(description="Data key to display in this column")
    header: str = Field(description="Column header text")
    sortable: bool = Field(default=False, description="Enable sorting for this column")
    format: str | None = Field(
        default=None,
        description=(
            "Cell format: 'number', 'number:2' (decimals), 'currency', 'currency:EUR',"
            " 'percent', 'percent:1', 'date', 'date:long'"
        ),
    )


class DataTable(Component):
    """High-level data table with sorting, filtering, and pagination.

    Accepts flat ``columns`` and ``rows`` — the renderer handles the rest.

    Example::

        DataTable(
            columns=[
                DataTableColumn(key="name", header="Name", sortable=True),
                DataTableColumn(key="email", header="Email"),
            ],
            rows=data["users"],
            searchable=True,
            paginated=True,
        )

    Also accepts a pandas, polars, or any DataFrame-like object as ``rows``.
    Columns are auto-generated from the DataFrame's column names if not provided.
    """

    type: Literal["DataTable"] = "DataTable"

    @model_validator(mode="before")
    @classmethod
    def _coerce_dataframe(cls, data: Any) -> Any:
        if isinstance(data, dict):
            rows = data.get("rows")
        else:
            return data
        if rows is None:
            return data
        if hasattr(rows, "columns") and hasattr(rows, "to_dict"):
            if hasattr(rows, "to_dicts"):
                # polars-style API
                data["rows"] = rows.to_dicts()
            else:
                # pandas-style API
                data["rows"] = rows.to_dict(orient="records")
            if not data.get("columns"):
                data["columns"] = [
                    {"key": str(col), "header": str(col)} for col in rows.columns
                ]
        return data

    columns: list[DataTableColumn] = Field(description="Column definitions")
    rows: list[dict[str, Any]] | str = Field(
        default_factory=list,
        description="Row data or {{ interpolation }} reference",
    )
    searchable: bool = Field(default=False, description="Show search/filter input")
    paginated: bool = Field(default=False, description="Show pagination controls")
    page_size: int = Field(
        default=10, alias="pageSize", description="Rows per page when paginated"
    )

    def to_json(self) -> dict[str, Any]:
        d = super().to_json()
        if isinstance(self.rows, list):
            d["rows"] = [
                {k: _serialize_cell_value(v) for k, v in row.items()}
                for row in self.rows
            ]
        return d
