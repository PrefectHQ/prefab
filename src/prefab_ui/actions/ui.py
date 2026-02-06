"""UI-focused client-side actions."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.actions.base import ActionBase


class ShowToast(ActionBase):
    """Display a toast notification. Client-side only, no server trip."""

    action: Literal["showToast"] = "showToast"
    message: str = Field(description="Toast message text")
    description: str | None = Field(default=None, description="Optional secondary text")
    variant: Literal["default", "success", "error", "warning", "info"] | None = Field(
        default=None, description="Toast style variant"
    )
    duration: int | None = Field(
        default=None, description="Auto-dismiss duration in milliseconds"
    )

    def __init__(self, message: str, **kwargs: Any) -> None:
        kwargs["message"] = message
        super().__init__(**kwargs)
