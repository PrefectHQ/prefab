"""File upload actions and data types.

Provides the :class:`OpenFilePicker` action (triggers the browser file
picker from any clickable element) and the :class:`FileUpload` data type
(describes the shape of uploaded file data in ``$event``).

Example::

    from prefab_ui.components import Button
    from prefab_ui.actions import OpenFilePicker
    from prefab_ui.actions.mcp import CallTool

    Button("Upload CSV", on_click=OpenFilePicker(
        accept=".csv",
        on_success=CallTool("process_csv", arguments={"file": "{{ $event }}"}),
    ))
"""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field

from prefab_ui.actions.base import Action


class FileUpload(BaseModel):
    """Data for a single uploaded file.

    Produced by :class:`~prefab_ui.components.DropZone` and
    :class:`OpenFilePicker` events.  Both always produce ``list[FileUpload]``
    as ``$event``, even for single-file uploads::

        from prefab_ui.actions import FileUpload

        @server.tool()
        def process_csv(files: list[FileUpload]):
            for f in files:
                contents = base64.b64decode(f.data)
                ...
    """

    name: str = Field(description="Original filename")
    size: int = Field(description="File size in bytes")
    type: str = Field(description="MIME type (e.g. 'image/png')")
    data: str = Field(description="Base64-encoded file content (no data: URL prefix)")


class OpenFilePicker(Action):
    """Open the browser file picker and read selected files to base64.

    Fires ``onSuccess`` with the file data as ``$event``:
    ``[{name, size, type, data}, ...]`` (always an array, even for single files).

    Must execute before any async server actions in the action chain
    (CallTool, SendMessage) since those break the browser's
    user-activation window needed to open the file picker.

    Args:
        accept: File type filter (e.g. ``"image/*"``, ``".csv,.xlsx"``).
        multiple: Allow selecting multiple files.
        max_size: Maximum file size in bytes. Files exceeding this are
            rejected with an error toast.
    """

    action: Literal["openFilePicker"] = "openFilePicker"
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
        description="Maximum file size in bytes",
    )
