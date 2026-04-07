"""Platform Health — presentation slide with KPI metrics and sparklines.

Run with:
    prefab serve examples/presentation/platform_health.py
    prefab export examples/presentation/platform_health.py
"""

from prefab_ui import PrefabApp
from prefab_ui.components import (
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Grid,
    Metric,
    Ring,
    Text,
)
from prefab_ui.components.charts import Sparkline
from prefab_ui.themes import Presentation

with PrefabApp(theme=Presentation()) as app:
    with Card():
        with CardHeader():
            CardTitle("Platform Health", css_class="text-2xl font-bold")
            CardDescription("Real-time infrastructure overview")

        with CardContent():
            with Grid(columns=4, gap=6):
                with Card(css_class="gap-0 pb-0"):
                    with CardContent():
                        Metric(
                            label="Requests / sec",
                            value="12,847",
                            delta="+8.3%",
                        )
                    Sparkline(
                        data=[
                            9200,
                            9800,
                            10400,
                            11200,
                            10800,
                            11600,
                            12100,
                            11900,
                            12400,
                            12847,
                        ],
                        variant="success",
                        fill=True,
                        css_class="h-12",
                    )

                with Card(css_class="gap-0 pb-0"):
                    with CardContent():
                        Metric(
                            label="p99 Latency",
                            value="142ms",
                            delta="-12ms",
                        )
                    Sparkline(
                        data=[
                            180,
                            172,
                            165,
                            158,
                            160,
                            155,
                            148,
                            150,
                            145,
                            142,
                        ],
                        variant="info",
                        fill=True,
                        css_class="h-12",
                    )

                with Card(css_class="gap-0 pb-0"):
                    with CardContent():
                        Metric(
                            label="Error Rate",
                            value="0.03%",
                            delta="-0.01%",
                        )
                    Sparkline(
                        data=[
                            0.08,
                            0.06,
                            0.05,
                            0.04,
                            0.05,
                            0.04,
                            0.03,
                            0.04,
                            0.03,
                            0.03,
                        ],
                        variant="warning",
                        fill=True,
                        css_class="h-12",
                    )

                with Card():
                    with CardContent(css_class="items-center"):
                        Ring(
                            value=99.97,
                            label="99.97%",
                            variant="success",
                            size="lg",
                            thickness=10,
                        )
                        Text(
                            "Uptime (30d)",
                            css_class="text-sm text-muted-foreground",
                        )
