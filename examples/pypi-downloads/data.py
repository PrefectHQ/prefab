"""Data loading and reshaping for the PyPI downloads dashboard."""


def load_total_data(total_rows: list[dict]) -> dict:
    """Reshape total download rows into chart data.

    Args:
        total_rows: List of dicts with ``"week"`` and ``"downloads"`` keys.

    Returns:
        A dict with ``chart_data`` (list of week dicts) and ``weeks``.
    """
    weeks = sorted({r["week"] for r in total_rows})
    by_week = {}
    for r in total_rows:
        by_week[r["week"]] = {"week": r["week"], "downloads": int(r["downloads"])}

    return {
        "chart_data": [by_week[w] for w in weeks],
        "weeks": weeks,
    }


def load_data(
    rows: list[dict],
    total_rows: list[dict] | None = None,
) -> dict:
    """Reshape dependent download rows for charting.

    Args:
        rows: List of dicts with ``"week"``, ``"package"``, ``"downloads"`` keys.
        total_rows: Optional list of dicts with ``"week"`` and ``"downloads"``
            keys for the package's own total downloads. When provided, a
            ``"direct"`` series is computed and injected.

    Returns:
        A dict with ``chart_data``, ``packages``, ``table_rows``,
        ``latest_week``, ``prev_week``, ``top_gainers``, and ``top_losers``.
    """
    totals: dict[str, int] = {}
    for r in rows:
        totals[r["package"]] = totals.get(r["package"], 0) + int(r["downloads"])
    packages = sorted(totals, key=totals.get, reverse=True)
    weeks = sorted({r["week"] for r in rows})

    by_week: dict[str, dict] = {}
    for r in rows:
        week = r["week"]
        if week not in by_week:
            by_week[week] = {"week": week}
        by_week[week][r["package"]] = int(r["downloads"])

    if total_rows:
        total_by_week = {r["week"]: int(r["downloads"]) for r in total_rows}
        for week in weeks:
            total = total_by_week.get(week, 0)
            dep_sum = sum(by_week[week].get(pkg, 0) for pkg in packages)
            by_week[week]["direct"] = max(0, total - dep_sum)
        packages = ["direct", *packages]

    chart_data = [by_week[w] for w in weeks]
    latest_week = weeks[-1] if weeks else ""
    prev_week = weeks[-2] if len(weeks) >= 2 else None

    prev_downloads: dict[str, int] = {}
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
        table_rows.append(
            {
                "package": r["package"],
                "prev": f"{prev:,}" if prev is not None else "N/A",
                "downloads": f"{cur:,}",
                "change": f"{change:+.1f}%" if change is not None else "N/A",
                "_change_sort": change if change is not None else 0,
            }
        )

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
