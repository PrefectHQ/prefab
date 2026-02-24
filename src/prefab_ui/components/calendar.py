"""Calendar component for date selection.

Example::

    import datetime

    from prefab_ui.components import Calendar, Text

    cal = Calendar(value=datetime.date(2026, 5, 4))
    Text(f"Selected: {cal.rx.date('long')}")

    Calendar(mode="range", name="dateRange")
"""

from __future__ import annotations

import datetime
import json as _json
from typing import Any, ClassVar, Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component, StatefulMixin
from prefab_ui.rx import Rx


def _date_to_iso(d: datetime.date) -> str:
    """Convert a date to an ISO string with noon UTC time."""
    return f"{d.isoformat()}T12:00:00.000Z"


class Calendar(StatefulMixin, Component):
    """Date picker calendar.

    Selected date(s) stored in state as ISO strings.

    Example::

        Calendar(value=datetime.date(2026, 5, 4))
        Calendar(mode="range", name="dateRange")
    """

    _auto_name: ClassVar[str] = "calendar"
    type: Literal["Calendar"] = "Calendar"
    mode: Literal["single", "multiple", "range"] = Field(
        default="single",
        description="Selection mode: single date, multiple dates, or date range",
    )
    value: (
        datetime.date
        | Rx
        | dict[str, datetime.date | Rx]
        | list[datetime.date | Rx]
        | str
        | None
    ) = Field(
        default=None,
        exclude=True,
        description="Initial selected date(s). Single: a date or Rx. Range: {'from': date, 'to': date}. Multiple: list of dates. Any position accepts an Rx for reactive binding.",
    )
    name: str | None = Field(
        default=None,
        description="State key for reactive binding. Auto-generated if omitted.",
    )
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) when selection changes",
    )

    def _get_initial_value(self) -> str | None:
        if isinstance(self.value, str):
            return self.value
        return None

    def model_post_init(self, __context: Any) -> None:
        if self.value is not None and not isinstance(self.value, str):
            if isinstance(self.value, datetime.date):
                object.__setattr__(self, "value", _date_to_iso(self.value))
            elif isinstance(self.value, dict):
                object.__setattr__(
                    self,
                    "value",
                    _json.dumps(
                        {
                            k: _date_to_iso(v)
                            if isinstance(v, datetime.date)
                            else str(v)
                            for k, v in self.value.items()
                        }
                    ),
                )
            elif isinstance(self.value, (list, tuple)):
                iso = [
                    _date_to_iso(d) if isinstance(d, datetime.date) else str(d)
                    for d in self.value
                ]
                object.__setattr__(self, "value", _json.dumps(iso))
        super().model_post_init(__context)
