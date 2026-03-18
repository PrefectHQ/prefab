"""Hyperspace Fleet Performance vs Q1 Target — dashboard table with gauge bars.

Demonstrates DataTable with Progress target markers and Badge component cells.
"""

from prefab_ui.components import (
    Badge,
    Card,
    CardContent,
    CardHeader,
    DataTable,
    DataTableColumn,
    Muted,
    Progress,
    Text,
)

# ── Data ────────────────────────────────────────────────────────────────

metrics = [
    ("Jump Drives", "/hr", 842, 2_531, 3.0, 3_900),
    ("Cargo Transfers", "/hr", 15_200, 38_100, 2.5, 52_000),
    ("Sensor Sweeps", "/hr", 91_400, 245_800, 2.7, 475_000),
    ("Comm Relays", "msg/s", 2_180, 4_310, 2.0, 4_800),
    ("Shield Cycles", "/hr", 198_000, 631_500, 3.2, 490_000),
]

# ── Build rows with component cells ─────────────────────────────────────

rows = []
for name, unit, avg, peak, burst, target in metrics:
    pct = round(peak / target * 100)

    # Gauge: set max so the target marker lands at ~75%
    gauge = Progress(
        value=peak,
        target=target,
        max=target / 0.75,
    )

    status = Badge(f"{pct}%")

    rows.append(
        {
            "metric": f"{name} {unit}",
            "avg": f"{avg:,}",
            "peak": f"{peak:,}",
            "burst": f"{burst:.1f}x",
            "target": f"{target:,}",
            "gauge": gauge,
            "status": status,
        }
    )

# ── Layout ──────────────────────────────────────────────────────────────

with Card():
    with CardHeader():
        Muted("Week of Mar 9–16, 2026")
        Text("Fleet Performance vs Q1 Target", bold=True)

    with CardContent():
        DataTable(
            columns=[
                DataTableColumn(key="metric", header="Metric"),
                DataTableColumn(key="avg", header="Avg", align="right"),
                DataTableColumn(key="peak", header="Peak", align="right"),
                DataTableColumn(
                    key="burst",
                    header="Burst",
                    align="right",
                ),
                DataTableColumn(
                    key="target",
                    header="+30% Target",
                    align="right",
                ),
                DataTableColumn(
                    key="gauge",
                    header="vs Target",
                    width="260px",
                ),
                DataTableColumn(key="status", header=""),
            ],
            rows=rows,
        )
