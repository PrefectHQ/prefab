"""Dialog (modal) — overlay with a trigger and content.

The first child becomes the trigger; remaining children become the dialog body.

Example::

    from prefab_ui.components import Dialog, Button, Text, Row
    from prefab_ui.actions import ToolCall

    with Dialog(title="Confirm Delete", description="This action cannot be undone."):
        Button("Delete", variant="destructive")  # trigger
        Text("Are you sure you want to delete this item?")
        with Row(gap=2):
            Button("Cancel", variant="outline")
            Button("Confirm", on_click=ToolCall("delete_item"))
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.components.base import ContainerComponent


class Dialog(ContainerComponent):
    """Modal dialog overlay.

    First child = trigger, remaining children = dialog body.

    Example::

        with Dialog(title="Edit Profile"):
            Button("Edit")
            with Column(gap=3):
                Input(name="displayName", placeholder="Display name")
                Button("Save", on_click=ToolCall("update_profile"))
    """

    type: Literal["Dialog"] = "Dialog"
    title: str | None = Field(default=None, description="Dialog header title")
    description: str | None = Field(
        default=None, description="Dialog header description"
    )
