"""Quarterly Platform Growth — dashboard table with dot indicators and progress bars."""

from prefab_ui.components import (
    Badge,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    DataTable,
    DataTableColumn,
    Div,
    Dot,
    Progress,
    Span,
    Text,
)

# ── Data: (name, q3, q4, growth_pct, dot_variant, bar_variant) ────

metrics = [
    ("API Calls / day", "4.2M", "4.8M", 14, "default", "default"),
    ("Jobs Processed / day", "850K", "1.3M", 53, "success", "success"),
    ("Events Ingested / day", "62M", "95M", 53, "warning", "warning"),
    ("Log Lines / day", "180M", "310M", 72, "destructive", "destructive"),
]

# ── Build rows ──────────────────────────────────────────────────────

rows = []
for name, q3, q4, growth, dot_var, bar_var in metrics:
    with Div(css_class="inline-flex items-center gap-2") as metric_cell:
        Dot(variant=dot_var, shape="rounded", size="lg")
        Span(name, css_class="font-medium text-card-foreground")

    bar = Progress(value=growth, max=100, variant=bar_var, size="lg")
    badge = Badge(f"+{growth}%", variant=bar_var)

    rows.append(
        {
            "metric": metric_cell,
            "q3": q3,
            "q4": q4,
            "growth": badge,
            "bar": bar,
        }
    )

# ── Layout ──────────────────────────────────────────────────────────

with Card(css_class="px-10 py-8"):
    with CardHeader():
        Text(
            "Q3 2025 → Q4 2025",
            css_class="text-sm font-semibold uppercase tracking-wider text-muted-foreground",
        )
        CardTitle("Quarterly Platform Growth", css_class="text-2xl font-bold")

    with CardContent():
        DataTable(
            columns=[
                DataTableColumn(key="metric", header="Metric"),
                DataTableColumn(key="q3", header="Q3 2025", align="right"),
                DataTableColumn(key="q4", header="Q4 2025", align="right"),
                DataTableColumn(key="growth", header="Growth", align="right"),
                DataTableColumn(key="bar", header="", width="160px"),
            ],
            rows=rows,
        )
