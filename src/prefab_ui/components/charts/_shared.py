"""Shared helpers and types used across chart components."""

from __future__ import annotations

from collections.abc import Mapping, Sequence

from pydantic import BaseModel, Field

from prefab_ui.rx import Rx

ChartValueFormat = str


def _contains_reactive_value(value: object) -> bool:
    if isinstance(value, Rx):
        return True
    if isinstance(value, str):
        return "{{" in value and "}}" in value
    if isinstance(value, Mapping):
        return any(_contains_reactive_value(item) for item in value.values())
    if isinstance(value, Sequence):
        return any(_contains_reactive_value(item) for item in value)
    return False


def _is_reactive_chart_data(data: object) -> bool:
    return isinstance(data, (str, Rx)) or _contains_reactive_value(data)


class ChartSeries(BaseModel):
    """Series definition for cartesian charts (Bar, Line, Area).

    Args:
        data_key: Data field to plot.
        label: Display label (defaults to data_key).
        color: CSS color override.
    """

    model_config = {"populate_by_name": True}

    data_key: str = Field(alias="dataKey", description="Data field to plot")
    label: str | None = Field(
        default=None, description="Display label (defaults to dataKey)"
    )
    color: str | None = Field(default=None, description="CSS color override")
