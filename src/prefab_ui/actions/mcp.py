"""MCP transport actions.

These actions communicate with an MCP server via the MCP Apps protocol.
They're only meaningful when the renderer is connected to an MCP host.

For transport-agnostic actions (state, navigation, toasts), see the parent
module.
"""

from __future__ import annotations

import types
from collections.abc import Callable
from typing import Any, Literal

from pydantic import Field, PrivateAttr, model_serializer

from prefab_ui.actions.base import Action
from prefab_ui.app import get_tool_resolver
from prefab_ui.rx import RxStr, _coerce_rx


class CallTool(Action):
    """Call an MCP server tool via `app.callServerTool()`.

    The `tool` argument can be a string name or a callable reference
    to the tool function.  Callables are resolved at serialization time
    via the resolver passed to `PrefabApp.to_json(tool_resolver=...)`.

    The resolver may return a plain name string or a `ResolvedTool`
    carrying the name plus flags (e.g. `unwrap_result`) that the
    renderer can act on.

    The tool's return value is available as `$result` in `on_success`
    callbacks.
    """

    action: Literal["toolCall"] = "toolCall"
    tool: RxStr = Field(description="Name of the server tool to call")
    arguments: dict[str, Any] = Field(
        default_factory=dict,
        description="Arguments to pass. Supports `{{ key }}` interpolation.",
    )
    _tool_ref: Callable[..., Any] | None = PrivateAttr(default=None)

    def __init__(self, tool: str | Callable[..., Any], **kwargs: Any) -> None:
        if isinstance(tool, types.FunctionType):
            kwargs["tool"] = tool.__name__
            super().__init__(**kwargs)
            self._tool_ref = tool
        else:
            kwargs["tool"] = tool
            super().__init__(**kwargs)

    @model_serializer(mode="wrap")
    def _serialize_with_resolver(self, handler: Any) -> dict[str, Any]:
        data: dict[str, Any] = _coerce_rx(handler(self))  # type: ignore[assignment]  # ty:ignore[invalid-assignment]
        resolver = get_tool_resolver()
        if resolver is not None:
            ref = self._tool_ref if self._tool_ref is not None else self.tool
            resolved = resolver(ref)
            data["tool"] = resolved.name
            if resolved.unwrap_result:
                data["unwrapResult"] = True
        return {k: v for k, v in data.items() if v is not None}


class SendMessage(Action):
    """Send a message to the chat via `app.sendMessage()`."""

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


class RequestDisplayMode(Action):
    """Request a display mode change via `app.requestDisplayMode()`.

    The host decides whether to honor the request — the actual mode may
    differ from what was asked for.
    """

    action: Literal["requestDisplayMode"] = "requestDisplayMode"
    mode: Literal["inline", "fullscreen", "pip"] = Field(
        description="Display mode to request: inline, fullscreen, or pip",
    )

    def __init__(self, mode: str, **kwargs: Any) -> None:
        kwargs["mode"] = mode
        super().__init__(**kwargs)
