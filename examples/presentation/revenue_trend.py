"""Monthly Revenue Trend — presentation slide with area chart.

Run with:
    prefab serve examples/presentation/revenue_trend.py
    prefab export examples/presentation/revenue_trend.py
"""

from prefab_ui import PrefabApp
from prefab_ui.components import (
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Column,
    Metric,
    Row,
)
from prefab_ui.components.charts import AreaChart, ChartSeries
from prefab_ui.themes import Presentation

data = [
    {"month": "Jul", "revenue": 42_000, "target": 45_000},
    {"month": "Aug", "revenue": 48_500, "target": 47_000},
    {"month": "Sep", "revenue": 51_200, "target": 49_000},
    {"month": "Oct", "revenue": 47_800, "target": 51_000},
    {"month": "Nov", "revenue": 56_300, "target": 53_000},
    {"month": "Dec", "revenue": 61_000, "target": 55_000},
    {"month": "Jan", "revenue": 58_200, "target": 57_000},
    {"month": "Feb", "revenue": 64_700, "target": 59_000},
    {"month": "Mar", "revenue": 71_400, "target": 61_000},
]

with PrefabApp(theme=Presentation()) as app:
    with Card():
        with CardHeader():
            CardTitle("Monthly Revenue", css_class="text-2xl font-bold")
            CardDescription("Jul 2025 – Mar 2026")

        with CardContent():
            with Column(gap=6):
                with Row(gap=8):
                    Metric(
                        label="Current MRR",
                        value="$71.4K",
                        delta="+17% vs target",
                    )
                    Metric(
                        label="Avg Growth",
                        value="7.2%",
                        delta="+$3.3K/mo",
                    )

                AreaChart(
                    data=data,
                    series=[
                        ChartSeries(dataKey="revenue", label="Revenue"),
                        ChartSeries(dataKey="target", label="Target"),
                    ],
                    x_axis="month",
                    height=300,
                    show_legend=True,
                    show_tooltip=True,
                    show_grid=True,
                )
