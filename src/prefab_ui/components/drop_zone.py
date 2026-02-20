"""DropZone component for drag-and-drop file uploads.

A styled drag-and-drop area where users can drop files or click to browse.
Reads selected files to base64 and fires ``onChange`` with structured file data.

Example::

    from prefab_ui.components import DropZone
    from prefab_ui.actions import CallTool

    DropZone(
        label="Drop files here",
        accept="image/*",
        multiple=True,
        on_change=CallTool("process_images", arguments={"files": "{{ $event }}"}),
    )
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component


class DropZone(Component):
    """Drag-and-drop file upload area.

    Fires ``onChange`` with file data as ``$event``:
    - Single file mode: ``{name, size, type, data}`` (data = raw base64)
    - Multiple file mode: ``[{name, size, type, data}, ...]``

    Args:
        label: Primary prompt text shown in the drop zone.
        description: Secondary text below the label (e.g. file type hints).
        accept: File type filter (e.g. ``"image/*"``, ``".csv,.xlsx"``).
        multiple: Allow dropping multiple files.
        max_size: Maximum file size in bytes per file.
        disabled: Whether the drop zone is disabled.
        name: State key for auto-state binding.
        on_change: Action(s) to execute when files are selected.
    """

    type: Literal["DropZone"] = "DropZone"
    icon: str | None = Field(
        default=None,
        description="Lucide icon name (kebab-case, e.g. 'cloud-upload'). "
        "Defaults to an upload icon when not specified.",
    )
    label: str | None = Field(
        default=None,
        description="Primary prompt text (e.g. 'Drop files here')",
    )
    description: str | None = Field(
        default=None,
        description="Secondary helper text (e.g. 'PNG, JPG up to 10MB')",
    )
    accept: str | None = Field(
        default=None,
        description="File type filter (e.g. 'image/*', '.csv,.xlsx')",
    )
    multiple: bool = Field(
        default=False,
        description="Allow selecting multiple files",
    )
    max_size: int | None = Field(
        default=None,
        alias="maxSize",
        description="Maximum file size in bytes per file",
    )
    disabled: bool = Field(
        default=False,
        description="Whether the drop zone is disabled",
    )
    name: str | None = Field(
        default=None,
        description="State key for auto-state binding",
    )
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) to execute when files are selected",
    )
