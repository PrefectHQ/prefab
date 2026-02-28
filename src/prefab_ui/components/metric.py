"""Metric/KPI card component for displaying headline numbers with optional deltas.

Example::

    from prefab_ui.components import Metric

    Metric(label="Revenue", value="$42M")
    Metric(label="Active Users", value=1842, delta="+23.4%", trend="up")
    Metric(label="Costs", value="$1.2M", delta="-15%", trend="down", trend_sentiment="positive")
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.components.base import Component
from prefab_ui.rx import RxStr

TrendDirection = Literal["up", "down", "neutral"]
TrendSentiment = Literal["positive", "negative", "neutral"]


class Metric(Component):
    """A metric/KPI display showing a headline number with optional change indicator.

    Args:
        label: The metric name (e.g. "Revenue", "Active Users").
        value: The headline number (e.g. "$42M", 1842, "99.9%").
        description: Optional description text shown below the value.
        delta: Optional change indicator (e.g. "+23.4%", -15, "+$2.3M").
        trend: Arrow direction — "up", "down", or "neutral". If None,
            inferred from delta (positive=up, negative=down, zero=neutral).
        trend_sentiment: Color control — "positive" (green), "negative" (red),
            or "neutral" (muted). If None, inferred: up=positive, down=negative.

    Example::

        Metric(label="Revenue", value="$42M", delta="+12%")
        Metric(label="Costs", value="$1.2M", delta="-15%", trend="down", trend_sentiment="positive")
    """

    type: Literal["Metric"] = "Metric"
    label: RxStr = Field(description="The metric name")
    value: int | float | RxStr = Field(description="The headline number")
    description: RxStr | None = Field(
        default=None,
        description="Optional description text",
    )
    delta: int | float | RxStr | None = Field(
        default=None,
        description="Change indicator (e.g. '+23.4%', -15)",
    )
    trend: TrendDirection | None = Field(
        default=None,
        description="Arrow direction: 'up', 'down', or 'neutral'. Inferred from delta if None.",
    )
    trend_sentiment: TrendSentiment | None = Field(
        default=None,
        alias="trendSentiment",
        description="Color: 'positive' (green), 'negative' (red), 'neutral' (muted). Inferred from trend if None.",
    )
