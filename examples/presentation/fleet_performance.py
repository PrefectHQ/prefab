"""Fleet Performance vs Q1 Target — presentation slide with gauge bars.

Run with:
    prefab serve examples/presentation/fleet_performance.py
    prefab export examples/presentation/fleet_performance.py
"""

from prefab_ui import PrefabApp
from prefab_ui.components import (
    Badge,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    DataTable,
    DataTableColumn,
    Div,
    Progress,
    Span,
    Text,
)
from prefab_ui.themes import Presentation

metrics = [
    ("Jump Drives", "/hr", 842, 2_531, 3.0, 3_900),
    ("Cargo Transfers", "/hr", 15_200, 38_100, 2.5, 52_000),
    ("Sensor Sweeps", "/hr", 91_400, 245_800, 2.7, 475_000),
    ("Comm Relays", "msg/s", 2_180, 4_310, 2.0, 4_800),
    ("Shield Cycles", "/hr", 198_000, 631_500, 3.2, 490_000),
]

rows = []
for name, unit, avg, peak, burst, target in metrics:
    pct = round(peak / target * 100)
    variant = "destructive" if pct >= 100 else "warning" if pct >= 80 else "default"

    gauge = Progress(
        value=peak,
        target=target,
        max=target / 0.75,
        variant=variant,
        size="lg",
    )
    status = Badge(f"{pct}%", variant=variant)

    with Div(css_class="inline") as metric_cell:
        Span(name, css_class="font-semibold text-card-foreground")
        Span(f" {unit}", css_class="text-xs text-muted-foreground")

    rows.append(
        {
            "metric": metric_cell,
            "avg": f"{avg:,}",
            "peak": f"{peak:,}",
            "burst": Span(f"{burst:.1f}x", css_class="text-muted-foreground"),
            "target": f"{target:,}",
            "gauge": gauge,
            "status": status,
        }
    )


def slide(css_class: str = ""):
    """Return the fleet performance slide as a Card."""
    with Card(css_class=css_class) as card:
        with CardHeader():
            Text(
                "Week of Mar 9–16, 2026",
                css_class="text-sm font-semibold uppercase tracking-wider text-muted-foreground",
            )
            CardTitle(
                "Fleet Performance vs Q1 Target",
                css_class="text-2xl font-bold",
            )
        with CardContent():
            DataTable(
                columns=[
                    DataTableColumn(key="metric", header="Metric"),
                    DataTableColumn(key="avg", header="Avg", align="right"),
                    DataTableColumn(key="peak", header="Peak", align="right"),
                    DataTableColumn(key="burst", header="Burst", align="right"),
                    DataTableColumn(key="target", header="+30% Target", align="right"),
                    DataTableColumn(
                        key="gauge", header="vs Target", width="260px", align="right"
                    ),
                    DataTableColumn(key="status", header="", align="right"),
                ],
                rows=rows,
            )
    return card


if __name__ == "__main__" or not __package__:
    with PrefabApp(theme=Presentation()) as app:
        slide()
