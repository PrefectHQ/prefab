"""Declarative actions for interactive Prefab components.

Actions define what happens when a user interacts with a component (clicks a
button, changes a slider, etc.). They serialize to JSON and are executed by the
client-side renderer.

**Transport-agnostic actions** — work with any backend:

    Slider(on_change=SetState("brightness"))
    Button("Toggle", on_click=ToggleState("showDetails"))
    Button("Open", on_click=OpenLink("https://example.com"))

**MCP transport actions** — communicate with an MCP server:

    from prefab_ui.actions.mcp import CallTool, SendMessage

    Button("Refresh", on_click=CallTool("get_data"))
    Button("Ask AI", on_click=SendMessage("Summarize this"))

Actions compose — pass a list for sequential execution::

    Button("Submit", on_click=[
        SetState("loading", True),
        CallTool("process", arguments={"query": "{{ query }}"}),
    ])
"""

from __future__ import annotations

from prefab_ui.actions.base import Action
from prefab_ui.actions.fetch import Fetch
from prefab_ui.actions.file import FileUpload, OpenFilePicker
from prefab_ui.actions.navigation import OpenLink
from prefab_ui.actions.state import AppendState, PopState, SetState, ToggleState
from prefab_ui.actions.timing import SetInterval
from prefab_ui.actions.ui import CloseOverlay, ShowToast

__all__ = [
    "Action",
    "AppendState",
    "CloseOverlay",
    "Fetch",
    "FileUpload",
    "OpenFilePicker",
    "OpenLink",
    "PopState",
    "SetInterval",
    "SetState",
    "ShowToast",
    "ToggleState",
]
