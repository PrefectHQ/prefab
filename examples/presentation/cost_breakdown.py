"""Infrastructure Cost Breakdown — presentation slide with pie chart.

Run with:
    prefab serve examples/presentation/cost_breakdown.py
    prefab export examples/presentation/cost_breakdown.py
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
from prefab_ui.components.charts import PieChart
from prefab_ui.themes import Presentation

data = [
    {"category": "Compute", "cost": 42_000},
    {"category": "Storage", "cost": 18_500},
    {"category": "Network", "cost": 12_300},
    {"category": "Databases", "cost": 9_800},
    {"category": "Monitoring", "cost": 4_200},
    {"category": "Other", "cost": 3_100},
]

total = sum(d["cost"] for d in data)

with PrefabApp(theme=Presentation()) as app:
    with Card():
        with CardHeader():
            CardTitle("Infrastructure Costs", css_class="text-2xl font-bold")
            CardDescription("March 2026 — by category")

        with CardContent():
            with Row(gap=8, align="center"):
                PieChart(
                    data=data,
                    data_key="cost",
                    name_key="category",
                    height=280,
                    inner_radius=60,
                    show_legend=True,
                    show_tooltip=True,
                )

                with Column(gap=4):
                    Metric(
                        label="Total Monthly",
                        value=f"${total:,}",
                        delta="+6.2% MoM",
                    )
                    Metric(
                        label="Per Request",
                        value="$0.0070",
                        delta="-2.1%",
                    )
                    Metric(
                        label="Budget Utilization",
                        value="87%",
                        delta="$12K remaining",
                    )
