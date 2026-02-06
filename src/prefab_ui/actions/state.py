"""Client-side state management actions."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.actions.base import ActionBase


class SetState(ActionBase):
    """Set a client-side state variable. No server round-trip.

    The default ``value`` of ``{{ $event }}`` captures the event value
    (slider position, input text, checkbox state, etc.).
    """

    action: Literal["setState"] = "setState"
    key: str = Field(description="State key to set")
    value: Any = Field(
        default="{{ $event }}",
        description="Value to set. Use '{{ $event }}' for the event value.",
    )

    def __init__(self, key: str, value: Any = "{{ $event }}", **kwargs: Any) -> None:
        kwargs["key"] = key
        kwargs["value"] = value
        super().__init__(**kwargs)


class ToggleState(ActionBase):
    """Flip a boolean state variable. No server round-trip."""

    action: Literal["toggleState"] = "toggleState"
    key: str = Field(description="State key to toggle")

    def __init__(self, key: str, **kwargs: Any) -> None:
        kwargs["key"] = key
        super().__init__(**kwargs)
