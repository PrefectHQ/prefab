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

from pydantic import BaseModel, Field

from prefab_ui.components.base import Component
from prefab_ui.rx import RxStr


class DataTableColumn(BaseModel):
    """Column definition for DataTable."""

    model_config = {"populate_by_name": True}

    key: str = Field(description="Data key to display in this column")
    header: str = Field(description="Column header text")
    sortable: bool = Field(default=False, description="Enable sorting for this column")


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
    """

    type: Literal["DataTable"] = "DataTable"
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
    caption: RxStr | None = Field(default=None, description="Optional table caption")
