"""Waterfall chart component."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import Component
from prefab_ui.components.charts._shared import (
    ChartValueFormat,
    _is_reactive_chart_data,
)
from prefab_ui.rx import RxStr


class WaterfallChart(Component):
    """Waterfall chart showing how sequential increases and decreases build to a total.

    Each row is either a delta (added to the running total) or a total
    (drawn from zero, resetting the running total for subsequent rows).
    Bars float between the running total before and after each row, colored
    by whether they increase, decrease, or represent a total.

    Args:
        data: Row data or reactive interpolation reference.
        data_key: Data key for each row's value. Positive values increase the running total, negative values decrease it.
        name_key: Data key for bar labels.
        total_key: Data key marking a row as a total (bool). Total bars are drawn from zero instead of stacking on the running total.
        height: Chart height in pixels.
        increase_color: CSS color for increase bars.
        decrease_color: CSS color for decrease bars.
        total_color: CSS color for total bars.
        bar_radius: Corner radius on bars.
        show_connectors: Show dashed bridge lines connecting each bar's ending height to the next bar.
        show_legend: Show legend.
        show_tooltip: Show tooltip on hover.
        animate: Animate transitions. Defaults to `False` for reactive data.
        show_grid: Show cartesian grid.
        show_y_axis: Show y-axis with tick labels.
        value_format: Pipe format for value-axis ticks and tooltip values.

    **Example:**

    ```python
    from prefab_ui.components.charts import WaterfallChart

    WaterfallChart(
        data=[
            {"label": "Starting Cash", "value": 5000, "total": True},
            {"label": "Sales", "value": 3200},
            {"label": "Marketing", "value": -1200},
            {"label": "Payroll", "value": -2500},
            {"label": "Ending Cash", "value": 4500, "total": True},
        ],
        data_key="value",
        name_key="label",
        total_key="total",
    )
    ```
    """

    type: Literal["WaterfallChart"] = "WaterfallChart"
    data: list[dict[str, Any]] | RxStr = Field(
        description="Row data or `{{ interpolation }}` reference"
    )
    data_key: str = Field(
        alias="dataKey",
        description=(
            "Data key for each row's value (positive increases, negative "
            "decreases the running total)"
        ),
    )
    name_key: str = Field(alias="nameKey", description="Data key for bar labels")
    total_key: str | None = Field(
        default=None,
        alias="totalKey",
        description=(
            "Data key marking a row as a total, drawn from zero instead of "
            "stacking on the running total"
        ),
    )
    height: int = Field(default=300, description="Chart height in pixels")
    increase_color: str | None = Field(
        default=None, alias="increaseColor", description="CSS color for increase bars"
    )
    decrease_color: str | None = Field(
        default=None, alias="decreaseColor", description="CSS color for decrease bars"
    )
    total_color: str | None = Field(
        default=None, alias="totalColor", description="CSS color for total bars"
    )
    bar_radius: int = Field(
        default=4, alias="barRadius", description="Corner radius on bars"
    )
    show_connectors: bool = Field(
        default=True,
        alias="showConnectors",
        description=(
            "Show dashed bridge lines connecting each bar's ending height "
            "to the next bar"
        ),
    )
    show_legend: bool = Field(
        default=True, alias="showLegend", description="Show legend"
    )
    show_tooltip: bool = Field(
        default=True, alias="showTooltip", description="Show tooltip on hover"
    )
    animate: bool = Field(
        default=True, description="Animate transitions when data changes"
    )
    show_grid: bool = Field(
        default=True, alias="showGrid", description="Show cartesian grid"
    )
    show_y_axis: bool = Field(
        default=True, alias="showYAxis", description="Show y-axis with tick labels"
    )
    value_format: ChartValueFormat = Field(
        default="auto",
        alias="valueFormat",
        description=(
            "Value-axis tick and tooltip value format pipe, such as 'compact', "
            "'currency', or 'percent:1'"
        ),
    )

    def model_post_init(self, __context: Any) -> None:
        if "animate" not in self.model_fields_set and _is_reactive_chart_data(
            self.data
        ):
            self.animate = False
        super().model_post_init(__context)
