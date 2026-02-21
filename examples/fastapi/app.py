"""Hitchhiker's Guide — a FastAPI-backed Prefab app.

Browse the Guide's entries, search by keyword, and submit new ones.
Demonstrates Fetch.get, Fetch.post, result_key, error handling, and
live search — all wired to plain FastAPI routes.

Run with:
    uvicorn examples.fastapi.app:app --reload
"""

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
    ForEach,
    Form,
    If,
    Input,
    Row,
    Text,
)

# ── In-memory data store ────────────────────────────────────────────

ENTRIES: list[dict] = [
    {
        "title": "Earth",
        "category": "Planets",
        "description": "Mostly harmless.",
    },
    {
        "title": "Towel",
        "category": "Items",
        "description": (
            "A towel is about the most massively useful thing "
            "an interstellar hitchhiker can have."
        ),
    },
    {
        "title": "Babel Fish",
        "category": "Creatures",
        "description": (
            "Small, yellow, leech-like — and probably the oddest thing in the Universe."
        ),
    },
    {
        "title": "Deep Thought",
        "category": "Computers",
        "description": "The second greatest computer in the Universe of Time and Space.",
    },
    {
        "title": "Magrathea",
        "category": "Planets",
        "description": "A planet whose inhabitants designed custom luxury planets.",
    },
    {
        "title": "Pan Galactic Gargle Blaster",
        "category": "Drinks",
        "description": "The best drink in existence. The effect is like having "
        "your brains smashed out by a slice of lemon wrapped round "
        "a large gold brick.",
    },
]

app = FastAPI()

# ── API routes ──────────────────────────────────────────────────────


@app.get("/api/entries")
def list_entries(q: str = ""):
    if q:
        q_lower = q.lower()
        return [
            e
            for e in ENTRIES
            if q_lower in e["title"].lower()
            or q_lower in e["description"].lower()
            or q_lower in e["category"].lower()
        ]
    return ENTRIES


@app.delete("/api/entries/{title}")
def delete_entry(title: str):
    for i, e in enumerate(ENTRIES):
        if e["title"] == title:
            ENTRIES.pop(i)
            return {"deleted": title}
    raise HTTPException(status_code=404, detail="Entry not found")


@app.post("/api/entries")
def create_entry(entry: dict):
    title = (entry.get("title") or "").strip()
    if not title:
        raise HTTPException(status_code=400, detail="Title is required")
    new_entry = {
        "title": title,
        "category": (entry.get("category") or "Uncategorized").strip(),
        "description": (entry.get("description") or "").strip(),
    }
    ENTRIES.append(new_entry)
    return new_entry


# ── Prefab UI ───────────────────────────────────────────────────────


@app.get("/", response_class=HTMLResponse)
def guide():
    with Column(gap=6, css_class="max-w-2xl mx-auto") as view:
        # Header
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
                            on_error=ShowToast("{{ $error }}", variant="error"),
                        ),
                    ],
                ):
                    with Column(gap=3):
                        Input(name="new_title", placeholder="Title")
                        Input(name="new_category", placeholder="Category")
                        Input(name="new_description", placeholder="Description")
                        Button("Add Entry", disabled="{{ not new_title }}")

        # Search — fires on every keystroke
        Input(
            name="q",
            placeholder="Search the Guide...",
            on_change=[
                SetState("q", "{{ $event }}"),
                Fetch.get(
                    "/api/entries",
                    params={"q": "{{ $event }}"},
                    result_key="entries",
                ),
            ],
        )

        # Results
        with If("{{ entries }}"):
            with Column(gap=3):
                with ForEach("entries"):
                    with Card():
                        with CardHeader():
                            with Row(align="center", css_class="justify-between"):
                                with Row(gap=2, align="center"):
                                    CardTitle("{{ title }}")
                                    Badge("{{ category }}", variant="success")
                                Button(
                                    "Delete",
                                    icon="trash-2",
                                    size="icon-xs",
                                    variant="ghost",
                                    on_click=Fetch.delete(
                                        "/api/entries/{{ title }}",
                                        on_success=Fetch.get(
                                            "/api/entries",
                                            params={"q": "{{ q }}"},
                                            result_key="entries",
                                        ),
                                        on_error=ShowToast(
                                            "{{ $error }}", variant="error"
                                        ),
                                    ),
                                )
                        with CardContent():
                            Text("{{ description }}")

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
