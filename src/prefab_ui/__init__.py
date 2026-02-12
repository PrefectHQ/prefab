"""Prefab — the agentic frontend framework that even humans can use.

A JSON component format that renders to real interactive frontends.
Transport-agnostic: works with MCP servers, REST APIs, or any backend
that can return JSON.

Usage::

    from prefab_ui import UIResponse, Column, Heading, Text

    def show_user(name: str) -> UIResponse:
        return UIResponse(
            state={"name": name},
            view=Column(Heading("{{ name }}")),
        )
"""

from __future__ import annotations

import importlib.metadata

from prefab_ui.actions import (
    Action,
    ActionBase,
    AppendState,
    OpenLink,
    PopState,
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
    Responsive,
    Row,
    State,
    Text,
)
from prefab_ui.define import Define
from prefab_ui.response import UIResponse
from prefab_ui.use import Use

try:
    __version__ = importlib.metadata.version("prefab-ui")
except importlib.metadata.PackageNotFoundError:
    __version__ = "0.0.0-dev"

__all__ = [
    "Action",
    "ActionBase",
    "AppendState",
    "Code",
    "Column",
    "Component",
    "ContainerComponent",
    "Define",
    "Heading",
    "Image",
    "Markdown",
    "OpenLink",
    "PopState",
    "Responsive",
    "Row",
    "SendMessage",
    "SetState",
    "ShowToast",
    "State",
    "Text",
    "ToggleState",
    "ToolCall",
    "UIResponse",
    "UpdateContext",
    "Use",
]
