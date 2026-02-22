"""Timing actions — periodic and delayed execution."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field, SerializeAsAny

from prefab_ui.actions.base import ActionBase


class SetInterval(ActionBase):
    """Execute actions on a repeating schedule.

    Starts a client-side timer that fires ``on_tick`` every ``duration``
    milliseconds.  The interval stops when ``while_`` evaluates to falsy
    or ``count`` ticks have elapsed — whichever comes first.  When it
    stops, ``on_complete`` fires.

    Use ``count=1`` for a one-shot delay::

        SetInterval(3000, count=1, on_complete=ShowToast("Still there?"))
    """

    action: Literal["setInterval"] = "setInterval"
    duration: int = Field(description="Interval between ticks, in milliseconds.")
    while_: str | None = Field(
        default=None,
        alias="while",
        description=(
            "Condition expression re-evaluated each tick. "
            "When falsy, the interval stops."
        ),
    )
    count: int | None = Field(
        default=None,
        description="Maximum number of ticks. The interval stops after this many.",
    )
    on_tick: SerializeAsAny[ActionBase] | list[SerializeAsAny[ActionBase]] | None = (
        Field(
            default=None,
            alias="onTick",
            description="Action(s) to run each tick. $event is the tick number (1, 2, …).",
        )
    )
    on_complete: (
        SerializeAsAny[ActionBase] | list[SerializeAsAny[ActionBase]] | None
    ) = Field(
        default=None,
        alias="onComplete",
        description="Action(s) to run when the interval finishes.",
    )

    def __init__(self, duration: int, **kwargs: Any) -> None:
        kwargs["duration"] = duration
        super().__init__(**kwargs)
