"""Reusable dashboard UI components for PyPI downloads."""

from prefab_ui.components import (
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Column,
    DataTable,
    DataTableColumn,
    Progress,
    Row,
    Text,
)
from prefab_ui.components.charts import ChartSeries, LineChart


def downloads_chart(package_name: str, chart_data, series_keys, **line_chart_kwargs):
    """Render a line chart of weekly downloads for a package's dependents.

    Args:
        package_name: The PyPI package whose dependents are charted.
        chart_data: List of dicts, one per week, with a ``"week"`` key and
            one key per dependent package containing its download count.
        series_keys: Ordered list of package names to include as chart series.
        **line_chart_kwargs: Additional keyword arguments forwarded to
            ``LineChart``.

    Returns:
        A ``Card`` component containing the rendered line chart.
    """
    with Card() as card:
        with CardHeader():
            CardTitle(f"{package_name} Dependents - Weekly Downloads")
        with CardContent():
            LineChart(
                data=chart_data,
                series=[ChartSeries(data_key=pkg, label=pkg) for pkg in series_keys],
                x_axis="week",
                height=500,
                curve="smooth",
                show_legend=True,
                show_tooltip=True,
                show_grid=True,
                **line_chart_kwargs,
            )
    return card


def _change_card(title: str, items: list, max_value: float, color: str):
    """Render a single gainers or losers card.

    Args:
        title: Card heading text (e.g. ``"Top Gainers"``).
        items: List of table-row dicts, each containing ``"package"``,
            ``"change"``, ``"prev"``, ``"downloads"``, and
            ``"_change_sort"`` keys.
        max_value: The maximum absolute change value, used to scale
            progress bars.
        color: Tailwind CSS class for the progress bar indicator
            (e.g. ``"bg-green-500"``).

    Returns:
        A ``Card`` component displaying the ranked list with progress bars.
    """
    with Card(css_class="flex-1") as card:
        with CardHeader():
            CardTitle(title)
        with CardContent():
            with Column(gap=4):
                for r in items:
                    with Column(gap=1):
                        with Row(justify="between"):
                            Text(r["package"], css_class="font-medium text-sm")
                            Text(r["change"], css_class="text-sm")
                        Text(f"{r['prev']} -> {r['downloads']}", css_class="text-xs text-muted-foreground")
                        Progress(value=abs(r["_change_sort"]), max=max_value, indicator_class=color, css_class="h-1.5")
    return card


def gainers_losers(top_gainers: list, top_losers: list):
    """Render side-by-side cards for top gainers and top losers.

    Args:
        top_gainers: List of table-row dicts for the biggest week-over-week
            increases, sorted descending by change percentage.
        top_losers: List of table-row dicts for the biggest week-over-week
            decreases, sorted ascending by change percentage.

    Returns:
        A ``Row`` component containing the two cards side by side.
    """
    max_gainer = max(abs(r["_change_sort"]) for r in top_gainers) if top_gainers else 1
    max_loser = max(abs(r["_change_sort"]) for r in top_losers) if top_losers else 1

    with Row(gap=4) as row:
        _change_card("Top Gainers", top_gainers, max_gainer, "bg-green-500")
        _change_card("Top Losers", top_losers, max_loser, "bg-red-500")
    return row


def downloads_table(table_rows, latest_week: str, prev_week: str | None, **data_table_kwargs):
    """Render a sortable data table of download counts.

    Args:
        table_rows: List of dicts with ``"package"``, ``"prev"``,
            ``"downloads"``, and ``"change"`` keys.
        latest_week: ISO date string for the most recent week column header.
        prev_week: ISO date string for the previous week column header,
            or ``None`` if unavailable.
        **data_table_kwargs: Additional keyword arguments forwarded to
            ``DataTable``.

    Returns:
        A ``Card`` component containing the sortable table.
    """
    with Card() as card:
        with CardContent():
            DataTable(
                columns=[
                    DataTableColumn(key="package", header="Package"),
                    DataTableColumn(key="prev", header=f"Downloads ({prev_week})", sortable=True),
                    DataTableColumn(key="downloads", header=f"Downloads ({latest_week})", sortable=True),
                    DataTableColumn(key="change", header="Change", sortable=True),
                ],
                rows=table_rows,
                **data_table_kwargs,
            )
    return card
