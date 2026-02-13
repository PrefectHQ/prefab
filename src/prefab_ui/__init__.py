"""Prefab — the agentic frontend framework that even humans can use.

A JSON component format that renders to real interactive frontends.
Transport-agnostic: works with MCP servers, REST APIs, or any backend
that can return JSON.

Usage::

    from prefab_ui.components import Column, Heading, Text
    from prefab_ui.response import UIResponse

    def show_user(name: str) -> UIResponse:
        return UIResponse(
            state={"name": name},
            view=Column(Heading("{{ name }}")),
        )

Submodules:

- ``prefab_ui.components`` — UI components (Button, Grid, Card, etc.)
- ``prefab_ui.actions`` — state actions (SetState, AppendState, etc.)
- ``prefab_ui.css`` — CSS helpers (Responsive, Hover, Md, etc.)
- ``prefab_ui.response`` — UIResponse
- ``prefab_ui.define`` — Define (reusable component definitions)
- ``prefab_ui.use`` — Use (component instantiation)
"""

from __future__ import annotations

import importlib.metadata

try:
    __version__ = importlib.metadata.version("prefab-ui")
except importlib.metadata.PackageNotFoundError:
    __version__ = "0.0.0-dev"
