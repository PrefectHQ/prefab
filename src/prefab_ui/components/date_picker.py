"""DatePicker — popover with a calendar for selecting dates.

Example::

    from prefab_ui.components import DatePicker

    DatePicker(placeholder="Select deadline", name="deadline")
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component


class DatePicker(Component):
    """Date picker with a popover calendar.

    A button trigger shows the selected date; clicking opens a calendar.

    Example::

        DatePicker(placeholder="Pick a date", name="deadline")
    """

    type: Literal["DatePicker"] = "DatePicker"
    placeholder: str = Field(
        default="Pick a date",
        description="Button text when no date is selected",
    )
    name: str | None = Field(
        default=None,
        description="State key for the selected date (ISO string)",
    )
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) when date changes",
    )
