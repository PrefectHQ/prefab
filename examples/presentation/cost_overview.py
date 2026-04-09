"""Cost & Traffic Overview — presentation slide with pie chart and area chart.

Run with:
    prefab serve examples/presentation/cost_overview.py
    prefab export examples/presentation/cost_overview.py
"""

from prefab_ui import PrefabApp
from prefab_ui.components import (
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Column,
    Muted,
    Row,
    Text,
)
from prefab_ui.components.charts import AreaChart, ChartSeries, PieChart
from prefab_ui.themes import Presentation

cost_data = [
    {"category": "Compute", "cost": 42_000},
    {"category": "Storage", "cost": 18_500},
    {"category": "Network", "cost": 12_300},
    {"category": "Other", "cost": 8_200},
]

traffic_data = [
    {"hour": "6am", "requests": 1200, "errors": 8},
    {"hour": "9am", "requests": 8400, "errors": 12},
    {"hour": "12pm", "requests": 12800, "errors": 45},
    {"hour": "3pm", "requests": 11200, "errors": 22},
    {"hour": "6pm", "requests": 9600, "errors": 15},
    {"hour": "9pm", "requests": 5400, "errors": 9},
    {"hour": "12am", "requests": 2100, "errors": 4},
]


def slide(css_class: str = ""):
    """Return the cost & traffic overview slide as a Card."""
    with Card(css_class=css_class) as card:
        with CardHeader():
            Muted("March 2026")
            CardTitle("Cost & Traffic Overview", css_class="text-2xl font-bold")
        with CardContent():
            with Row(gap=8):
                with Column(gap=2, css_class="flex-1"):
                    Text(
                        "Monthly Costs",
                        css_class="text-sm font-semibold text-muted-foreground",
                    )
                    PieChart(
                        data=cost_data,
                        data_key="cost",
                        name_key="category",
                        height=240,
                        inner_radius=50,
                        show_legend=True,
                        show_tooltip=True,
                    )
                with Column(gap=2, css_class="flex-1"):
                    Text(
                        "Traffic Pattern",
                        css_class="text-sm font-semibold text-muted-foreground",
                    )
                    AreaChart(
                        data=traffic_data,
                        series=[
                            ChartSeries(dataKey="requests", label="Requests"),
                            ChartSeries(dataKey="errors", label="Errors"),
                        ],
                        x_axis="hour",
                        height=240,
                        show_legend=True,
                        show_tooltip=True,
                        show_grid=True,
                        y_axis_format="compact",
                    )
    return card


if __name__ == "__main__" or not __package__:
    with PrefabApp(theme=Presentation()) as app:
        slide()
