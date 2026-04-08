"""Dialog (modal) — overlay with a trigger and content.

The first child becomes the trigger; remaining children become the dialog body.

**Example:**

```python
from prefab_ui.components import Dialog, Button, Text, Row
from prefab_ui.actions.mcp import CallTool

with Dialog(title="Confirm Delete", description="This action cannot be undone."):
    Button("Delete", variant="destructive")  # trigger
    Text("Are you sure you want to delete this item?")
    with Row(gap=2):
        Button("Cancel", variant="outline")
        Button("Confirm", on_click=CallTool("delete_item"))
```
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.components.base import ContainerComponent
from prefab_ui.rx import RxStr


class Dialog(ContainerComponent):
    """Modal dialog overlay.

    The first child is the trigger element (what the user clicks to
    open the dialog). All remaining children form the dialog body.

    Args:
        title: Header title displayed at the top of the dialog.
        description: Subtitle text below the title.

    **Example:**

    ```python
    with Dialog(title="Edit Profile", description="Update your info."):
        Button("Edit")
        with Column(gap=3):
            Input(name="displayName", placeholder="Display name")
            Button("Save", on_click=CallTool("update_profile"))
    ```
    """

    type: Literal["Dialog"] = "Dialog"
    title: RxStr | None = Field(default=None, description="Dialog header title")
    description: RxStr | None = Field(
        default=None, description="Dialog header description"
    )
    name: str | None = Field(
        default=None,
        description=(
            "State key to bind open/close state. When set, the dialog "
            "can be opened programmatically via SetState(name, True)."
        ),
    )
    dismissible: bool = Field(
        default=True,
        description=(
            "Whether the dialog can be closed by clicking outside "
            "or pressing Escape. When False, the user must use an "
            "explicit close action."
        ),
    )
