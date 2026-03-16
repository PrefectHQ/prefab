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


class DataTable(Component):
    """High-level data table with sorting, filtering, and pagination.

    Accepts flat ``columns`` and ``rows`` — the renderer handles the rest.
    Pass a pandas DataFrame as ``rows`` and columns are auto-generated.

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
    """

    type: Literal["DataTable"] = "DataTable"
    columns: list[DataTableColumn] = Field(
        default_factory=list, description="Column definitions"
    )
    rows: list[dict[str, Any]] | str = Field(
        default_factory=list,
        description="Row data or {{ interpolation }} reference",
    )
    searchable: bool = Field(default=False, description="Show search/filter input")
    paginated: bool = Field(default=False, description="Show pagination controls")
    page_size: int = Field(
        default=10, alias="pageSize", description="Rows per page when paginated"
    )

    @model_validator(mode="before")
    @classmethod
    def _coerce_dataframe(cls, data: Any) -> Any:
        if not isinstance(data, dict):
            return data
        rows = data.get("rows")
        if rows is None:
            return data
        try:
            import pandas as pd
        except ImportError:
            return data
        if not isinstance(rows, pd.DataFrame):
            return data
        if not data.get("columns"):
            data = dict(data)
            data["columns"] = [
                DataTableColumn(key=str(col), header=str(col)) for col in rows.columns
            ]
        data["rows"] = rows.to_dict(orient="records")
        return data

    @classmethod
    def from_dataframe(
        cls,
        df: Any,
        sortable: bool = False,
        **kwargs: Any,
    ) -> DataTable:
        """Create a DataTable from a pandas DataFrame.

        All columns are generated from ``df.columns``. Pass ``sortable=True``
        to enable sorting on every column, or build ``columns`` manually for
        per-column control.
        """
        columns = [
            DataTableColumn(key=str(col), header=str(col), sortable=sortable)
            for col in df.columns
        ]
        rows = df.to_dict(orient="records")
        return cls(columns=columns, rows=rows, **kwargs)

    def to_json(self) -> dict[str, Any]:
        d = super().to_json()
        if isinstance(self.rows, list):
            d["rows"] = [
                {k: _serialize_cell_value(v) for k, v in row.items()}
                for row in self.rows
            ]
        return d
