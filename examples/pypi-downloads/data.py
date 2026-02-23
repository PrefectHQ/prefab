"""Data loading and reshaping for the PyPI downloads dashboard."""

import csv

from query import CSV_PATH


def load_data(rows: list[dict] | None = None):
    """Reshape download rows for charting.

    Args:
        rows: List of dicts with ``"week"``, ``"package"``, ``"downloads"``
            keys. If ``None``, reads from the CSV file on disk.

    Returns:
        A dict with the following keys:

        - ``chart_data``: List of dicts (one per week) for the line chart.
        - ``packages``: Package names sorted by total downloads descending.
        - ``table_rows``: Per-package rows for the downloads table.
        - ``latest_week``: ISO date string of the most recent week.
        - ``prev_week``: ISO date string of the previous week, or ``None``.
        - ``top_gainers``: Top 5 packages by week-over-week increase.
        - ``top_losers``: Bottom 5 packages by week-over-week change.
    """
    if rows is None:
        with open(CSV_PATH) as f:
            rows = list(csv.DictReader(f))

    totals = {}
    for r in rows:
        totals[r["package"]] = totals.get(r["package"], 0) + int(r["downloads"])
    packages = sorted(totals, key=totals.get, reverse=True)
    weeks = sorted({r["week"] for r in rows})

    by_week = {}
    for r in rows:
        week = r["week"]
        if week not in by_week:
            by_week[week] = {"week": week}
        by_week[week][r["package"]] = int(r["downloads"])

    chart_data = [by_week[w] for w in weeks]
    latest_week = weeks[-1] if weeks else ""
    prev_week = weeks[-2] if len(weeks) >= 2 else None

    prev_downloads = {}
    if prev_week:
        for r in rows:
            if r["week"] == prev_week:
                prev_downloads[r["package"]] = int(r["downloads"])

    table_rows = []
    for r in sorted(
        [r for r in rows if r["week"] == latest_week],
        key=lambda r: int(r["downloads"]),
        reverse=True,
    ):
        cur = int(r["downloads"])
        prev = prev_downloads.get(r["package"])
        if prev and prev > 0:
            change = (cur - prev) / prev * 100
        else:
            change = None
        table_rows.append({
            "package": r["package"],
            "prev": f"{prev:,}" if prev is not None else "N/A",
            "downloads": f"{cur:,}",
            "change": f"{change:+.1f}%" if change is not None else "N/A",
            "_change_sort": change if change is not None else 0,
        })

    sorted_by_change = sorted(
        [r for r in table_rows if r["_change_sort"] is not None],
        key=lambda r: r["_change_sort"],
        reverse=True,
    )

    return {
        "chart_data": chart_data,
        "packages": packages,
        "table_rows": table_rows,
        "latest_week": latest_week,
        "prev_week": prev_week,
        "top_gainers": sorted_by_change[:5],
        "top_losers": sorted_by_change[-5:][::-1],
    }
