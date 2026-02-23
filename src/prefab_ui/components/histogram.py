"""Histogram component — auto-bins raw values and renders as a BarChart.

Binning happens in Python at construction time. The renderer receives a
standard BarChart payload with pre-computed bin labels and counts, so no
new React component or Zod schema is needed.

Example::

    from prefab_ui.components import Histogram

    Histogram(values=[1, 2, 2, 3, 3, 3, 4, 4, 5])

    Histogram(
        values=[10.5, 20.3, 15.7, 30.1, 25.0],
        bins=5,
        color="#4f46e5",
    )

    Histogram(
        values=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        bin_edges=[0, 3, 7, 10],
    )
"""

from __future__ import annotations

import math
from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import Component
from prefab_ui.components.charts import ChartSeries


def _format_edge(value: float) -> str:
    """Format a bin edge as a human-readable string.

    Integers render without decimals; floats keep up to 2 decimal places.
    """
    if value == int(value) and math.isfinite(value):
        return str(int(value))
    return f"{value:.2g}"


def _compute_bins(
    values: list[int | float],
    bins: int,
    bin_edges: list[float] | None,
) -> list[dict[str, Any]]:
    """Compute histogram bin counts from raw values.

    Returns a list of ``{"bin": "lo-hi", "count": n}`` dicts suitable for
    BarChart data.
    """
    if not values:
        return []

    if bin_edges is not None:
        edges = sorted(bin_edges)
    else:
        lo = float(min(values))
        hi = float(max(values))
        if lo == hi:
            edges = [lo, hi + 1]
            bins = 1
        else:
            step = (hi - lo) / bins
            edges = [lo + i * step for i in range(bins)] + [hi]

    n_bins = len(edges) - 1
    counts = [0] * n_bins

    for v in values:
        for i in range(n_bins):
            lower = edges[i]
            upper = edges[i + 1]
            if i == n_bins - 1:
                if lower <= v <= upper:
                    counts[i] += 1
                    break
            else:
                if lower <= v < upper:
                    counts[i] += 1
                    break

    data: list[dict[str, Any]] = []
    for i in range(n_bins):
        label = f"{_format_edge(edges[i])}\u2013{_format_edge(edges[i + 1])}"
        data.append({"bin": label, "count": counts[i]})

    return data


class Histogram(Component):
    """Histogram that auto-bins raw values and renders as a BarChart.

    The ``values``, ``bins``, and ``bin_edges`` fields are consumed during
    construction and excluded from the serialized output. The renderer
    receives a standard BarChart payload.

    Args:
        values: Raw numeric values to bin.
        bins: Number of equal-width bins (ignored when *bin_edges* is set).
        bin_edges: Explicit bin boundaries. Overrides *bins* when provided.
        height: Chart height in pixels.
        show_tooltip: Show tooltip on hover.
        show_legend: Show legend.
        show_grid: Show cartesian grid.
        color: Bar fill color (CSS color string).
        bar_radius: Corner radius on bars.

    Example::

        Histogram(values=[1, 2, 2, 3, 3, 3, 4, 4, 5])
    """

    type: Literal["BarChart"] = "BarChart"

    values: list[int | float] = Field(exclude=True)
    bins: int = Field(default=10, exclude=True)
    bin_edges: list[float] | None = Field(default=None, exclude=True)

    data: list[dict[str, Any]] = Field(default_factory=list)
    series: list[ChartSeries] = Field(default_factory=list)
    x_axis: str | None = Field(default=None, alias="xAxis")

    height: int = Field(default=300, description="Chart height in pixels")
    show_tooltip: bool = Field(
        default=True, alias="showTooltip", description="Show tooltip on hover"
    )
    show_legend: bool = Field(
        default=False, alias="showLegend", description="Show legend"
    )
    show_grid: bool = Field(
        default=True, alias="showGrid", description="Show cartesian grid"
    )
    color: str | None = Field(default=None, exclude=True)
    bar_radius: int = Field(
        default=4, alias="barRadius", description="Corner radius on bars"
    )

    def model_post_init(self, __context: Any) -> None:
        self.data = _compute_bins(self.values, self.bins, self.bin_edges)
        series_kwargs: dict[str, Any] = {"data_key": "count"}
        if self.color is not None:
            series_kwargs["color"] = self.color
        self.series = [ChartSeries(**series_kwargs)]
        self.x_axis = "bin"
        super().model_post_init(__context)
