"""Top 10 Tenants — ranked table with progress bars and ratio badges."""

from prefab_ui.components import (
    Badge,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    DataTable,
    DataTableColumn,
    Progress,
    Span,
    Text,
)

# ── Data: (rank, name, requests, jobs, jobs_raw, ratio, ratio_tier) ──
# jobs_raw is the numeric value for the bar; max is 2_800_000 (Arclight)

MAX_JOBS = 2_800_000

tenants = [
    (1, "Arclight Systems", "92K", "920K", 920_000, "10:1", "med"),
    (2, "Bridgewater Analytics", "87K", "510K", 510_000, "6:1", "low"),
    (3, "ClearPoint Data", "74K", "2.8M", 2_800_000, "38:1", "high"),
    (4, "Dawnforge AI", "68K", "1.4M", 1_400_000, "21:1", "high"),
    (5, "Embark Logic", "51K", "3.1K", 3_100, "<1:1", "low"),
    (6, "Foxglove Labs", "47K", "55K", 55_000, "1:1", "low"),
    (7, "Greenvault Health", "41K", "225K", 225_000, "5:1", "low"),
    (8, "Helix Robotics", "38K", "42K", 42_000, "1:1", "low"),
    (9, "Ioncraft Pharma", "33K", "2.2M", 2_200_000, "67:1", "high"),
    (10, "Juniper Cloud", "26K", "130K", 130_000, "5:1", "low"),
]

TIER_VARIANT = {"high": "destructive", "med": "default", "low": "secondary"}

# ── Build rows ──────────────────────────────────────────────────────

rows = []
for rank, name, reqs, jobs, jobs_raw, ratio, tier in tenants:
    bar = Progress(
        value=jobs_raw,
        max=MAX_JOBS,
        variant="success",
        size="lg",
    )

    badge = Badge(ratio, variant=TIER_VARIANT[tier])

    rows.append(
        {
            "rank": Span(
                str(rank), css_class="text-xs font-semibold text-muted-foreground"
            ),
            "tenant": Span(name, css_class="font-semibold text-card-foreground"),
            "reqs": reqs,
            "jobs": jobs,
            "bar": bar,
            "ratio": badge,
        }
    )

# ── Layout ──────────────────────────────────────────────────────────

with Card(css_class="px-10 py-8"):
    with CardHeader():
        Text(
            "Last 30 Days",
            css_class="text-sm font-semibold uppercase tracking-wider text-muted-foreground",
        )
        CardTitle("Top 10 Tenants", css_class="text-2xl font-bold")

    with CardContent():
        DataTable(
            columns=[
                DataTableColumn(
                    key="rank",
                    header="#",
                    align="center",
                    width="2rem",
                ),
                DataTableColumn(key="tenant", header="Tenant"),
                DataTableColumn(
                    key="reqs",
                    header="Requests / Day",
                    align="right",
                ),
                DataTableColumn(
                    key="jobs",
                    header="Jobs / Day",
                    align="right",
                ),
                DataTableColumn(
                    key="bar",
                    header="Jobs",
                    width="200px",
                ),
                DataTableColumn(
                    key="ratio",
                    header="Ratio",
                    align="right",
                ),
            ],
            rows=rows,
        )
