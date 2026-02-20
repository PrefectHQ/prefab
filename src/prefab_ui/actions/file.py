"""File upload actions and data types.

Provides the :class:`OpenFilePicker` action (triggers the browser file
picker from any clickable element) and the :class:`FileUpload` data type
(describes the shape of uploaded file data in ``$event``).

Example::

    from prefab_ui.components import Button
    from prefab_ui.actions import OpenFilePicker, ToolCall

    Button("Upload CSV", on_click=OpenFilePicker(
        accept=".csv",
        on_success=ToolCall("process_csv", arguments={"file": "{{ $event }}"}),
    ))
"""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field

from prefab_ui.actions.base import ActionBase


class FileUpload(BaseModel):
    """Data for a single uploaded file.

    Produced by :class:`~prefab_ui.components.DropZone` and
    :class:`OpenFilePicker` events.  Use this type to annotate MCP tool
    parameters that receive file data::

        from prefab_ui.actions import FileUpload

        @server.tool()
        def process_csv(file: FileUpload):
            contents = base64.b64decode(file.data)
            ...

    For multiple-file uploads, annotate as ``list[FileUpload]``.
    """

    name: str = Field(description="Original filename")
    size: int = Field(description="File size in bytes")
    type: str = Field(description="MIME type (e.g. 'image/png')")
    data: str = Field(description="Base64-encoded file content (no data: URL prefix)")


class OpenFilePicker(ActionBase):
    """Open the browser file picker and read selected files to base64.

    Fires ``onSuccess`` with the file data as ``$event``:
    - Single file mode: ``{name, size, type, data}``
    - Multiple file mode: ``[{name, size, type, data}, ...]``

    Must execute before any async server actions in the action chain
    (ToolCall, SendMessage) since those break the browser's
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
