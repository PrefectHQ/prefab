"""Dashboard layout for explicit cell placement."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import (
    ContainerComponent,
    Gap,
    _compile_layout_classes,
    _merge_css_classes,
)


class Dashboard(ContainerComponent):
    """Explicit-placement grid for dashboard layouts.

    Unlike ``Grid`` (auto-flow), ``Dashboard`` places children at
    specific grid coordinates using ``DashboardItem`` wrappers::

        with Dashboard(columns=12, row_height=120, gap=4):
            with DashboardItem(col=1, row=1, col_span=8, row_span=3):
                LineChart(...)
            with DashboardItem(col=9, row=1, col_span=4, row_span=1):
                Text("Revenue: $42M")

    Positions are **1-indexed** (matching CSS Grid conventions).
    """

    type: Literal["Dashboard"] = "Dashboard"
    columns: int = Field(default=12, description="Number of grid columns.")
    row_height: int | str = Field(
        default=120,
        alias="rowHeight",
        description="Height of each auto-generated row. Integer for pixels, string for any CSS value.",
    )
    rows: int | None = Field(
        default=None,
        description="Fixed number of rows. Omit for auto-expanding rows.",
    )
    gap: Gap = Field(default=None, exclude=True)

    def model_post_init(self, __context: Any) -> None:
        layout = _compile_layout_classes(gap=self.gap)
        self.css_class = _merge_css_classes(layout, self.css_class)
        super().model_post_init(__context)


class DashboardItem(ContainerComponent):
    """A positioned cell within a ``Dashboard``.

    Specifies where this item sits and how many columns/rows it spans::

        DashboardItem(col=1, row=1, col_span=4, row_span=2)

    Positions are **1-indexed**.
    """

    type: Literal["DashboardItem"] = "DashboardItem"
    col: int = Field(default=1, description="Starting column (1-indexed).")
    row: int = Field(default=1, description="Starting row (1-indexed).")
    col_span: int = Field(
        default=1, alias="colSpan", description="Number of columns to span."
    )
    row_span: int = Field(
        default=1, alias="rowSpan", description="Number of rows to span."
    )
    z_index: int | None = Field(
        default=None, alias="zIndex", description="CSS z-index for layering."
    )
