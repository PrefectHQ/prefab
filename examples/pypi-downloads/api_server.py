"""FastAPI server for the PyPI downloads dashboard."""

import datetime

from dashboard import (
    downloads_chart,
    downloads_table,
    gainers_losers,
    total_downloads_chart,
)
from data import load_data, load_total_data
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from query import run_query, run_total_query

from prefab_ui.actions import Fetch, SetState, ShowToast
from prefab_ui.app import PrefabApp
from prefab_ui.components import (
    Button,
    Card,
    CardContent,
    Checkbox,
    Column,
    Form,
    Input,
    Row,
    Separator,
    Slot,
    Text,
)
from prefab_ui.components.base import insert

app = FastAPI()

_cache: dict = {}


def _dashboard_view(
    package_name: str,
    total_data: dict,
    dep_data: dict,
    show_direct: bool = True,
) -> dict:
    """Build the dashboard content as a component tree."""
    with Column(gap=4) as content:
        total_downloads_chart(package_name, total_data["chart_data"])
        if dep_data["packages"]:
            series = dep_data["packages"]
            if not show_direct:
                series = [p for p in series if p != "direct"]
            downloads_chart(package_name, dep_data["chart_data"], series)
            Text(
                f"Week over Week ({dep_data['prev_week']} vs {dep_data['latest_week']})",
                css_class="text-lg font-semibold",
            )
            gainers_losers(dep_data["top_gainers"], dep_data["top_losers"])
            downloads_table(
                dep_data["table_rows"], dep_data["latest_week"], dep_data["prev_week"]
            )
    return content.to_json()


def _render_from_cache(show_direct: bool = True) -> dict | None:
    if not _cache.get("total_rows"):
        return None
    package_name = _cache["package_name"]
    total_data = load_total_data(_cache["total_rows"])
    dep_rows = _cache.get("dep_rows", [])
    dep_data = (
        load_data(dep_rows, total_rows=_cache["total_rows"])
        if dep_rows
        else _empty_dep_data()
    )
    return _dashboard_view(package_name, total_data, dep_data, show_direct=show_direct)


def _default_dates() -> tuple[str, str]:
    yesterday = datetime.date.today() - datetime.timedelta(days=1)
    six_months_ago = yesterday - datetime.timedelta(weeks=26)
    return six_months_ago.isoformat(), yesterday.isoformat()


@app.post("/api/fetch")
def api_fetch(body: dict):
    """Fetch fresh data from ClickHouse and return updated dashboard."""
    package_name = (body.get("package_name") or "fastmcp").strip()
    show_direct = body.get("show_direct", True)
    min_date = body.get("min_date") or ""
    max_date = body.get("max_date") or ""

    default_min, default_max = _default_dates()

    total_rows = run_total_query(
        package_name=package_name,
        min_date=min_date or default_min,
        max_date=max_date or default_max,
    )

    if not total_rows:
        _cache.clear()
        return None

    dep_rows = run_query(
        package_name=package_name,
        min_date=min_date or default_min,
        max_date=max_date or default_max,
    )

    _cache.update(
        package_name=package_name,
        total_rows=total_rows,
        dep_rows=dep_rows,
    )

    total_data = load_total_data(total_rows)
    dep_data = (
        load_data(dep_rows, total_rows=total_rows) if dep_rows else _empty_dep_data()
    )
    return _dashboard_view(package_name, total_data, dep_data, show_direct=show_direct)


@app.post("/api/render")
def api_render(body: dict):
    """Re-render dashboard from cache (no ClickHouse query)."""
    show_direct = body.get("show_direct", True)
    return _render_from_cache(show_direct=show_direct)


def _empty_dep_data() -> dict:
    return {
        "chart_data": [],
        "packages": [],
        "table_rows": [],
        "latest_week": "",
        "prev_week": None,
        "top_gainers": [],
        "top_losers": [],
    }


@app.get("/", response_class=HTMLResponse)
def page():
    """Serve the full HTML page for the PyPI downloads dashboard."""
    package_name = _cache.get("package_name", "fastmcp")
    dashboard_content = _render_from_cache()

    pkg_input = Input(
        name="package_name",
        value=package_name,
        placeholder="e.g. fastmcp",
        on_change=SetState("package_name", "{{ $event }}"),
        defer=True,
    )

    with Column(gap=4, css_class="p-6") as view:
        with Column(gap=1):
            Text(
                f"PyPI Downloads: {pkg_input.rx}",
                css_class="text-3xl font-bold tracking-tight",
            )
            Text(
                f"Total downloads and top dependents for {pkg_input.rx},"
                " powered by ClickHouse.",
                css_class="text-muted-foreground",
            )
        Separator()
        with Card():
            with CardContent():
                with Form(
                    on_submit=Fetch.post(
                        "/api/fetch",
                        body={
                            "package_name": "{{ package_name }}",
                            "show_direct": "{{ show_direct }}",
                            "min_date": "{{ min_date }}",
                            "max_date": "{{ max_date }}",
                        },
                        result_key="dashboard_content",
                        on_success=ShowToast(
                            "Dashboard updated",
                            variant="success",
                        ),
                        on_error=ShowToast("{{ $error }}", variant="error"),
                    ),
                ):
                    with Row(gap=4, align="end"):
                        with Column(gap=1, css_class="flex-[3]"):
                            Text("Package", css_class="text-sm font-medium")
                            insert(pkg_input)
                        with Column(gap=1):
                            Text("Start date", css_class="text-sm font-medium")
                            Input(
                                name="min_date",
                                input_type="date",
                                placeholder="YYYY-MM-DD",
                                on_change=SetState("min_date", "{{ $event }}"),
                            )
                        with Column(gap=1):
                            Text("End date", css_class="text-sm font-medium")
                            Input(
                                name="max_date",
                                input_type="date",
                                placeholder="YYYY-MM-DD",
                                on_change=SetState("max_date", "{{ $event }}"),
                            )
                        Button("Fetch")
                    Checkbox(
                        name="show_direct",
                        label="Show direct downloads",
                        checked=True,
                        on_change=[
                            SetState("show_direct", "{{ $event }}"),
                            Fetch.post(
                                "/api/render",
                                body={"show_direct": "{{ $event }}"},
                                result_key="dashboard_content",
                            ),
                        ],
                    )
        Slot("dashboard_content")

    return HTMLResponse(
        PrefabApp(
            title=f"{package_name} Dependents Dashboard",
            view=view,
            state={
                "package_name": package_name,
                "min_date": "",
                "max_date": "",
                "show_direct": True,
                "dashboard_content": dashboard_content,
            },
        ).html()
    )
