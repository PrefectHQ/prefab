"""Calendar component for date selection.

Example::

    from prefab_ui.components import Calendar

    Calendar(name="selectedDate")
    Calendar(mode="range", name="dateRange")

    # Access reactive value
    cal = Calendar()
    Text(f"Selected: {cal.rx}")
"""

from __future__ import annotations

from typing import ClassVar, Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component, StatefulMixin


class Calendar(StatefulMixin, Component):
    """Date picker calendar.

    Selected date(s) stored in state as ISO strings.

    Example::

        Calendar(name="selectedDate")
        Calendar(mode="range", name="dateRange")
    """

    _auto_name: ClassVar[str] = "calendar"
    type: Literal["Calendar"] = "Calendar"
    mode: Literal["single", "multiple", "range"] = Field(
        default="single",
        description="Selection mode: single date, multiple dates, or date range",
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
