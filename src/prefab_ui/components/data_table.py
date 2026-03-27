"""DataTable — a high-level table with built-in sorting, filtering, pagination.

Built on @tanstack/react-table in the renderer.

**Example:**

```python
from prefab_ui.components import DataTable, DataTableColumn

DataTable(
    columns=[
        DataTableColumn(key="name", header="Name", sortable=True),
        DataTableColumn(key="email", header="Email"),
        DataTableColumn(key="role", header="Role"),
    ],
    rows="{{ users }}",
    search=True,
    paginated=True,
)

# DataFrame support — auto-generates columns from df.columns
import pandas as pd
DataTable(rows=pd.DataFrame({"name": ["Alice"], "score": [90]}))
```
"""

from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, Field, model_validator

from prefab_ui.actions import Action
from prefab_ui.components.base import Component, _merge_css_classes
from prefab_ui.rx import Rx


def _serialize_cell_value(value: Any) -> Any:
    """Serialize a cell value, recursively calling to_json() for Component instances."""
    if isinstance(value, Component):
        return value.to_json()
    return value


class ExpandableRow:
    """A DataTable row that can expand to reveal detail content.

    Wraps a row data dict with a detail Component that renders in a
    full-width sub-row when the user clicks the expand toggle.

    Args:
        data: Column values for the row (same as a plain row dict).
        detail: Component tree shown when the row is expanded.

    **Example:**

    ```python
    from prefab_ui.components import DataTable, DataTableColumn, ExpandableRow, Text

    DataTable(
        columns=[
            DataTableColumn(key="time", header="Time", sortable=True),
            DataTableColumn(key="title", header="Title"),
        ],
        rows=[
            ExpandableRow(
                {"time": "9:00 AM", "title": "Opening Keynote"},
                detail=Text("This talk covers..."),
            ),
            {"time": "10:30 AM", "title": "Workshop"},
        ],
    )
    ```
    """

    __slots__ = ("data", "detail")

    def __init__(self, data: dict[str, Any], /, *, detail: Component) -> None:
        self.data = data
        self.detail = detail


DataTableAlign = Literal["left", "center", "right"]

_ALIGN_CSS: dict[str, str] = {
    "left": "text-left",
    "center": "text-center",
    "right": "text-right",
}


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
    width: str | None = Field(
        default=None,
        description="Column width as CSS value (e.g. '200px', '30%')",
    )
    min_width: str | None = Field(
        default=None,
        alias="minWidth",
        description="Minimum column width as CSS value",
    )
    max_width: str | None = Field(
        default=None,
        alias="maxWidth",
        description="Maximum column width as CSS value",
    )
    align: DataTableAlign | None = Field(
        default=None,
        exclude=True,
        description="Cell text alignment — resolves to cell_class",
    )
    header_class: str | None = Field(
        default=None,
        alias="headerClass",
        description="Tailwind classes for header cells",
    )
    cell_class: str | None = Field(
        default=None,
        alias="cellClass",
        description="Tailwind classes for data cells",
    )

    def model_post_init(self, __context: Any) -> None:
        if self.align is not None:
            css = _ALIGN_CSS[self.align]
            self.cell_class = _merge_css_classes(self.cell_class, css)
            self.header_class = _merge_css_classes(self.header_class, css)


class DataTable(Component):
    """High-level data table with sorting, filtering, and pagination.

    Accepts flat `columns` and `rows` — the renderer handles the rest.
    Also accepts a pandas, polars, or any DataFrame-like object as `rows`.
    Columns are auto-generated from the DataFrame's column names if not provided.

    Rows can be plain dicts or `ExpandableRow` instances. Expandable rows
    show a toggle that reveals a full-width detail area with arbitrary content.

    Args:
        columns: Column definitions.
        rows: Row data as a list of dicts/ExpandableRows, a `{{ template }}` string, or a DataFrame.
        search: Show a search input above the table.
        paginated: Show pagination controls.
        page_size: Rows per page when paginated.
        on_row_click: Action(s) when a row is clicked. `$event` is the row dict.

    **Example:**

    ```python
    DataTable(
        columns=[
            DataTableColumn(key="name", header="Name", sortable=True),
            DataTableColumn(key="email", header="Email"),
        ],
        rows=[
            ExpandableRow(
                {"name": "Alice", "email": "alice@example.com"},
                detail=Column(Text("Senior engineer, joined 2020.")),
            ),
            {"name": "Bob", "email": "bob@example.com"},
        ],
        search=True,
        paginated=True,
    )
    ```
    """

    type: Literal["DataTable"] = "DataTable"

    @model_validator(mode="before")
    @classmethod
    def _coerce_dataframe(cls, data: Any) -> Any:
        if isinstance(data, dict):
            rows = data.get("rows")
        else:
            return data
        if rows is None or isinstance(rows, (str, Rx)):
            return data
        if hasattr(rows, "columns") and hasattr(rows, "to_dict"):
            if hasattr(rows, "to_dicts"):
                data["rows"] = rows.to_dicts()
            else:
                data["rows"] = rows.to_dict(orient="records")
            if not data.get("columns"):
                data["columns"] = [
                    {"key": str(col), "header": str(col)} for col in rows.columns
                ]
        return data

    columns: list[DataTableColumn] = Field(description="Column definitions")
    rows: list[dict[str, Any] | ExpandableRow] | str | Rx = Field(
        default_factory=list,
        description="Row data, `{{ interpolation }}` reference, or DataFrame",
    )
    search: bool = Field(default=False, description="Show search input")
    paginated: bool = Field(default=False, description="Show pagination controls")
    page_size: int = Field(
        default=10, alias="pageSize", description="Rows per page when paginated"
    )
    on_row_click: Action | list[Action] | None = Field(
        default=None,
        alias="onRowClick",
        description="Action(s) when a row is clicked. $event is the row data dict.",
    )

    def to_json(self) -> dict[str, Any]:
        d = super().to_json()
        if isinstance(self.rows, list):
            serialized: list[dict[str, Any]] = []
            for row in self.rows:
                if isinstance(row, ExpandableRow):
                    cells = {k: _serialize_cell_value(v) for k, v in row.data.items()}
                    cells["_detail"] = row.detail.to_json()
                    serialized.append(cells)
                else:
                    serialized.append(
                        {k: _serialize_cell_value(v) for k, v in row.items()}
                    )
            d["rows"] = serialized
        return d
