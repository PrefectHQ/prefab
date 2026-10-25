"""Local invocation of a declared app interaction."""

from __future__ import annotations

from typing import TYPE_CHECKING, Any, Literal

from pydantic import Field, PrivateAttr, model_serializer

from prefab_ui.actions.base import Action
from prefab_ui.rx import _coerce_rx

if TYPE_CHECKING:
    from prefab_ui.app_tools import AppTool


class InvokeAppTool(Action):
    """Invoke an app tool locally, using the same dispatcher as the host.

    Prefer `app_tool.invoke(amount=1)` to retain the definition's identity
    until serialization. String names also support JSON-authored interactions.
    The definition must be included in `PrefabApp.app_tools`.
    """

    action: Literal["invokeAppTool"] = "invokeAppTool"
    tool: str
    arguments: dict[str, Any] = Field(default_factory=dict)
    _definition: AppTool | None = PrivateAttr(default=None)

    def __init__(self, tool: str | AppTool, **kwargs: Any) -> None:
        kwargs["tool"] = tool if isinstance(tool, str) else ""
        super().__init__(**kwargs)
        if not isinstance(tool, str):
            self._definition = tool

    @model_serializer(mode="wrap")
    def _serialize_invocation(self, handler: Any) -> dict[str, Any]:
        data = handler(self)
        if self._definition is not None:
            data["tool"] = self._definition._resolve_name()
        return _coerce_rx(data)  # type: ignore[return-value]  # ty:ignore[invalid-return-type]
