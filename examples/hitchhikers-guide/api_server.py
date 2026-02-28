"""Hitchhiker's Guide — FastAPI + Prefab.

Browse the Guide's entries, search by keyword, and submit new ones.
Demonstrates Fetch.get, Fetch.post, Fetch.delete, error handling, and
live search — all wired to plain FastAPI routes.

Run with:
    uvicorn examples.hitchhikers_guide.api_server:app --reload
"""

from data import ENTRIES, add_entry, delete_entry, search_entries
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse

from prefab_ui.actions import CloseOverlay, Fetch, SetState, ShowToast
from prefab_ui.app import PrefabApp
from prefab_ui.components import (
    H3,
    Badge,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Column,
    Dialog,
    Form,
    Input,
    Row,
    Text,
)
from prefab_ui.components.control_flow import ForEach
from prefab_ui.rx import ERROR, EVENT

app = FastAPI()

# -- API routes ---------------------------------------------------------------


@app.get("/api/entries")
def list_entries(q: str = ""):
    return search_entries(q)


@app.delete("/api/entries/{title}")
def remove_entry(title: str):
    for e in ENTRIES:
        if e["title"] == title:
            delete_entry(title)
            return {"deleted": title}
    raise HTTPException(status_code=404, detail="Entry not found")


@app.post("/api/entries")
def create_entry(entry: dict):
    try:
        return add_entry(
            title=entry.get("title", ""),
            category=entry.get("category", "Uncategorized"),
            description=entry.get("description", ""),
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


# -- Page route ---------------------------------------------------------------


@app.get("/", response_class=HTMLResponse)
def guide():
    with Column(gap=6, css_class="max-w-2xl mx-auto") as view:
        with Row(gap=3, align="center"):
            H3("The Hitchhiker's Guide")
            Badge("FastAPI edition", variant="secondary")
            with Dialog(title="New Entry", description="Add an entry to the Guide."):
                Button("+ Add", size="sm")
                with Form(
                    on_submit=[
                        Fetch.post(
                            "/api/entries",
                            body={
                                "title": "{{ new_title }}",
                                "category": "{{ new_category }}",
                                "description": "{{ new_description }}",
                            },
                            on_success=[
                                ShowToast("Entry added!", variant="success"),
                                SetState("new_title", ""),
                                SetState("new_category", ""),
                                SetState("new_description", ""),
                                Fetch.get("/api/entries", result_key="entries"),
                                CloseOverlay(),
                            ],
                            on_error=ShowToast(ERROR, variant="error"),
                        ),
                    ],
                ):
                    with Column(gap=3):
                        Input(name="new_title", placeholder="Title")
                        Input(name="new_category", placeholder="Category")
                        Input(name="new_description", placeholder="Description")
                        Button("Add Entry", disabled="{{ not new_title }}")

        Input(
            name="q",
            placeholder="Search the Guide...",
            on_change=[
                SetState("q", EVENT),
                Fetch.get(
                    "/api/entries",
                    params={"q": EVENT},
                    result_key="entries",
                ),
            ],
        )

        with Column(gap=3):
            with ForEach("entries") as entry:
                with Card():
                    with CardHeader():
                        with Row(align="center", css_class="justify-between"):
                            with Row(gap=2, align="center"):
                                CardTitle(entry.title)
                                Badge(entry.category, variant="success")
                            Button(
                                "Delete",
                                icon="trash-2",
                                size="icon-xs",
                                variant="ghost",
                                on_click=Fetch.delete(
                                    f"/api/entries/{entry.title}",
                                    on_success=Fetch.get(
                                        "/api/entries",
                                        params={"q": "{{ q }}"},
                                        result_key="entries",
                                    ),
                                    on_error=ShowToast(ERROR, variant="error"),
                                ),
                            )
                    with CardContent():
                        Text(entry.description)

    return HTMLResponse(
        PrefabApp(
            title="Hitchhiker's Guide",
            view=view,
            state={
                "q": "",
                "entries": ENTRIES,
                "new_title": "",
                "new_category": "",
                "new_description": "",
            },
        ).html()
    )
