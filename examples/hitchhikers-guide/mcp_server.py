"""Hitchhiker's Guide — MCP App (FastMCP + Prefab).

Browse the Guide's entries, search by keyword, and submit new ones.
Demonstrates CallTool, ForEach, Dialog, and error handling — all
wired through MCP's structured content protocol.

Run with:
    cd examples/hitchhikers-guide && uv run mcp_server.py
"""

from __future__ import annotations

from data import ENTRIES, add_entry, delete_entry, search_entries
from fastmcp import FastMCP

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
from prefab_ui.rx import ERROR, EVENT, RESULT

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
                        on_success=[
                            SetState("entries", RESULT),
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
                    on_success=SetState("entries", RESULT),
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
                                            on_success=SetState("entries", RESULT),
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


@mcp.tool()
def search(q: str = "") -> list[dict]:
    """Search the Guide by keyword."""
    return search_entries(q)


@mcp.tool()
def add_entry_tool(
    title: str, category: str = "Uncategorized", description: str = ""
) -> list[dict]:
    """Add a new entry to the Guide."""
    add_entry(title, category, description)
    return ENTRIES


@mcp.tool()
def delete_entry_tool(title: str) -> list[dict]:
    """Remove an entry from the Guide."""
    delete_entry(title)
    return ENTRIES


if __name__ == "__main__":
    mcp.run(transport="http")
