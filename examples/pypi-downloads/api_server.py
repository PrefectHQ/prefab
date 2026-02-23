"""FastAPI server for the PyPI downloads dashboard."""

import csv
import datetime
import json

from dashboard import downloads_chart, downloads_table, gainers_losers
from data import load_data
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from query import CSV_PATH, META_PATH, run_query

from prefab_ui.actions import Fetch, SetState, ShowToast
from prefab_ui.app import PrefabApp
from prefab_ui.components import (
    Button,
    Card,
    CardContent,
    Column,
    Form,
    Input,
    Row,
    Slot,
    Text,
)

app = FastAPI()


def _dashboard_view(package_name: str, d: dict) -> dict:
    """Build the dashboard content as a component tree.

    Args:
        package_name: The PyPI package name shown in the header.
        d: Data dict as returned by ``load_data``, containing keys
            ``chart_data``, ``packages``, ``prev_week``, ``latest_week``,
            ``top_gainers``, ``top_losers``, and ``table_rows``.

    Returns:
        A JSON-serializable component tree for the Prefab renderer.
    """
    with Column(gap=4) as content:
        downloads_chart(package_name, d["chart_data"], d["packages"])
        Text(
            f"Week over Week ({d['prev_week']} vs {d['latest_week']})",
            css_class="text-lg font-semibold",
        )
        gainers_losers(d["top_gainers"], d["top_losers"])
        downloads_table(d["table_rows"], d["latest_week"], d["prev_week"])
    return content.to_json()


@app.get("/api/data")
def api_data():
    """Return current dashboard data as JSON.

    Reads the cached CSV and metadata from disk and returns a rendered
    component tree without querying ClickHouse.

    Returns:
        A JSON-serializable component tree for the Prefab renderer.
    """
    with open(META_PATH) as f:
        meta = json.load(f)
    return _dashboard_view(meta["package_name"], load_data())


@app.post("/api/fetch")
def api_fetch(body: dict):
    """Fetch fresh data from ClickHouse and return updated dashboard data.

    Args:
        body: JSON request body with optional keys ``package_name``,
            ``min_date``, and ``max_date``. Defaults to ``"fastmcp"``
            and the last 8 weeks if not provided.

    Returns:
        A JSON-serializable component tree for the Prefab renderer.
    """
    package_name = (body.get("package_name") or "fastmcp").strip()
    min_date = body.get("min_date") or ""
    max_date = body.get("max_date") or ""

    yesterday = datetime.date.today() - datetime.timedelta(days=1)
    eight_weeks_ago = yesterday - datetime.timedelta(weeks=8)

    rows = run_query(
        package_name=package_name,
        min_date=min_date or eight_weeks_ago.isoformat(),
        max_date=max_date or yesterday.isoformat(),
    )
    if rows:
        with open(CSV_PATH, "w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=rows[0].keys())
            writer.writeheader()
            writer.writerows(rows)

        with open(META_PATH, "w") as f:
            json.dump({"package_name": package_name}, f)

    d = load_data(rows if rows else None)
    return _dashboard_view(package_name, d)


@app.get("/", response_class=HTMLResponse)
def page():
    """Serve the full HTML page for the PyPI downloads dashboard.

    Loads cached data, builds the search form and dashboard layout,
    and returns a complete ``PrefabApp`` HTML response.

    Returns:
        An HTMLResponse containing the rendered single-page application.
    """
    with open(META_PATH) as f:
        meta = json.load(f)
    package_name = meta["package_name"]

    d = load_data()
    dashboard_content = _dashboard_view(package_name, d)

    with Column(gap=4, css_class="p-6") as view:
        with Card():
            with CardContent():
                with Form(
                    on_submit=Fetch.post(
                        "/api/fetch",
                        body={
                            "package_name": "{{ package_name }}",
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
                            Input(
                                name="package_name",
                                value=package_name,
                                placeholder="e.g. fastmcp",
                                on_change=SetState("package_name", "{{ $event }}"),
                            )
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
        Slot("dashboard_content")

    return HTMLResponse(
        PrefabApp(
            title=f"{package_name} Dependents Dashboard",
            view=view,
            state={
                "package_name": package_name,
                "min_date": "",
                "max_date": "",
                "dashboard_content": dashboard_content,
            },
        ).html()
    )
