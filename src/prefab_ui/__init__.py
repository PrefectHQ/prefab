"""Prefab — build dynamic UIs in Python.

A JSON DSL compiled to React. Transport-agnostic: works with MCP servers,
REST APIs, or any backend that can return JSON.

Usage::

    from prefab_ui import UIResponse, Column, Heading, Text

    def show_user(name: str) -> UIResponse:
        return UIResponse(
            state={"name": name},
            view=Column(Heading("{{ name }}")),
        )
"""

from __future__ import annotations

from prefab_ui.actions import (
    Action,
    ActionBase,
    OpenLink,
    SendMessage,
    SetState,
    ShowToast,
    ToggleState,
    ToolCall,
    UpdateContext,
)
from prefab_ui.components import (
    Code,
    Column,
    Component,
    ContainerComponent,
    Heading,
    Image,
    Markdown,
    Row,
    Text,
)
from prefab_ui.response import UIResponse

__all__ = [
    "Action",
    "ActionBase",
    "Code",
    "Column",
    "Component",
    "ContainerComponent",
    "Heading",
    "Image",
    "Markdown",
    "OpenLink",
    "Row",
    "SendMessage",
    "SetState",
    "ShowToast",
    "Text",
    "ToggleState",
    "ToolCall",
    "UIResponse",
    "UpdateContext",
]
