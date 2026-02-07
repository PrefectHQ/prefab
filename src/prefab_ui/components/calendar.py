"""Calendar component for date selection.

Example::

    from prefab_ui.components import Calendar

    Calendar(name="selectedDate")
    Calendar(mode="range", name="dateRange")
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component


class Calendar(Component):
    """Date picker calendar.

    Selected date(s) stored in state as ISO strings.

    Example::

        Calendar(name="selectedDate")
        Calendar(mode="range", name="dateRange")
    """

    type: Literal["Calendar"] = "Calendar"
    mode: Literal["single", "multiple", "range"] = Field(
        default="single",
        description="Selection mode: single date, multiple dates, or date range",
    )
    name: str | None = Field(
        default=None,
        description="State key for storing the selected date (ISO string)",
    )
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) when selection changes",
    )
