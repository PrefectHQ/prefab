"""Hitchhiker's Guide — MCP App (FastMCP + Prefab).

Browse the Guide's entries, search by keyword, and submit new ones.
Demonstrates CallTool, ForEach, Dialog, and error handling — all
wired through MCP's structured content protocol.

Run with:
    uv run examples/hitchhikers-guide/mcp_server.py
"""

from __future__ import annotations

from data import ENTRIES, add_entry, delete_entry, search_entries
from fastmcp import FastMCP
from fastmcp.server.apps import AppConfig

from prefab_ui.actions import CloseOverlay, SetState, ShowToast
from prefab_ui.actions.mcp import CallTool, SendMessage, UpdateContext
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
    Tooltip,
)
from prefab_ui.components.control_flow import ForEach
from prefab_ui.rx import ERROR, EVENT

mcp = FastMCP("Hitchhiker's Guide")


@mcp.tool(app=True)
def browse() -> PrefabApp:
    """Open the Hitchhiker's Guide. Browse, search, and add entries."""
    with Column(gap=6, css_class="p-6") as view:
        with Row(gap=3, align="center"):
            H3("The Hitchhiker's Guide")
            Badge("MCP edition", variant="secondary")
            with Dialog(
                title="New Entry",
                description="Add an entry to the Guide.",
            ):
                Button("+ Add", size="sm")
                with Form(
                    on_submit=CallTool(
                        "add_entry_tool",
                        arguments={
                            "title": "{{ new_title }}",
                            "category": "{{ new_category }}",
                            "description": "{{ new_description }}",
                        },
                        result_key="entries",
                        on_success=[
                            ShowToast("Entry added!", variant="success"),
                            SetState("new_title", ""),
                            SetState("new_category", ""),
                            SetState("new_description", ""),
                            CloseOverlay(),
                        ],
                        on_error=ShowToast(ERROR, variant="error"),
                    ),
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
                CallTool(
                    "search",
                    arguments={"q": EVENT},
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
                            with Row(gap=1):
                                with Tooltip("Ask the AI about this entry", delay=0):
                                    Button(
                                        "Ask AI",
                                        icon="message-circle",
                                        size="icon-xs",
                                        variant="ghost",
                                        on_click=SendMessage(
                                            f"Tell me more about '{entry.title}' from the Hitchhiker's Guide"
                                        ),
                                    )
                                with Tooltip(
                                    "Add this entry to the AI's context", delay=0
                                ):
                                    Button(
                                        "Send to Chat",
                                        icon="send",
                                        size="icon-xs",
                                        variant="ghost",
                                        on_click=[
                                            UpdateContext(
                                                content=f"Guide entry — {entry.title} ({entry.category}): {entry.description}"
                                            ),
                                            ShowToast(
                                                "Sent to chat context",
                                                variant="success",
                                            ),
                                        ],
                                    )
                                with Tooltip("Delete this entry", delay=0):
                                    Button(
                                        "Delete",
                                        icon="trash-2",
                                        size="icon-xs",
                                        variant="ghost",
                                        on_click=CallTool(
                                            "delete_entry_tool",
                                            arguments={"title": entry.title},
                                            result_key="entries",
                                            on_error=ShowToast(
                                                ERROR,
                                                variant="error",
                                            ),
                                        ),
                                    )
                    with CardContent():
                        Text(entry.description)

    return PrefabApp(
        title="Hitchhiker's Guide",
        view=view,
        state={
            "q": "",
            "new_title": "",
            "new_category": "",
            "new_description": "",
            "entries": ENTRIES,
        },
    )


app_only = AppConfig(visibility=["app"])


@mcp.tool(app=app_only)
def search(q: str = "") -> PrefabApp:
    """Search the Guide by keyword."""
    return PrefabApp(state={"entries": search_entries(q)})


@mcp.tool(app=app_only)
def add_entry_tool(
    title: str, category: str = "Uncategorized", description: str = ""
) -> PrefabApp:
    """Add a new entry to the Guide."""
    add_entry(title, category, description)
    return PrefabApp(state={"entries": ENTRIES})


@mcp.tool(app=app_only)
def delete_entry_tool(title: str) -> PrefabApp:
    """Remove an entry from the Guide."""
    delete_entry(title)
    return PrefabApp(state={"entries": ENTRIES})


if __name__ == "__main__":
    mcp.run(transport="http")
