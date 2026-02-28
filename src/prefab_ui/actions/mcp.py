"""MCP transport actions.

These actions communicate with an MCP server via the MCP Apps protocol.
They're only meaningful when the renderer is connected to an MCP host.

For transport-agnostic actions (state, navigation, toasts), see the parent
module.
"""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.actions.base import Action
from prefab_ui.rx import RxStr


class CallTool(Action):
    """Call an MCP server tool via ``app.callServerTool()``.

    If ``result_key`` is set, the tool's return value is written into
    client-side state at that key. The key supports interpolation:
    ``result_key="detail_{{ selectedId }}"``.
    """

    action: Literal["toolCall"] = "toolCall"
    tool: RxStr = Field(description="Name of the server tool to call")
    arguments: dict[str, Any] = Field(
        default_factory=dict,
        description="Arguments to pass. Supports {{ key }} interpolation.",
    )
    result_key: str | None = Field(
        default=None,
        alias="resultKey",
        description="State key to store the tool result under",
    )

    def __init__(self, tool: str, **kwargs: Any) -> None:
        kwargs["tool"] = tool
        super().__init__(**kwargs)


class SendMessage(Action):
    """Send a message to the chat via ``app.sendMessage()``."""

    action: Literal["sendMessage"] = "sendMessage"
    content: RxStr = Field(description="Message text to send")

    def __init__(self, content: str, **kwargs: Any) -> None:
        kwargs["content"] = content
        super().__init__(**kwargs)


class UpdateContext(Action):
    """Update model context without triggering a response."""

    action: Literal["updateContext"] = "updateContext"
    content: RxStr | None = Field(default=None, description="Text content to add")
    structured_content: dict[str, Any] | None = Field(
        default=None,
        alias="structuredContent",
        description="Structured content to add",
    )
