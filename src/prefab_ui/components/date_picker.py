"""DatePicker — popover with a calendar for selecting dates.

**Example:**

```python
from prefab_ui.components import DatePicker

DatePicker(placeholder="Select deadline", name="deadline")

# Access reactive value
picker = DatePicker(placeholder="Choose date...")
Text(f"Date: {picker.rx}")
```
"""

from __future__ import annotations

from typing import ClassVar, Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component, StatefulMixin
from prefab_ui.rx import RxStr


class DatePicker(StatefulMixin, Component):
    """Date picker with a popover calendar.

    A button trigger shows the selected date; clicking opens a calendar.

    Args:
        placeholder: Button text when no date is selected.
        value: Initially selected date as an ISO string.
        name: State key for reactive binding. Auto-generated if omitted.
        on_change: Action(s) fired when the date changes.

    **Example:**

    ```python
    DatePicker(placeholder="Pick a date", name="deadline")
    ```
    """

    _auto_name: ClassVar[str] = "datepicker"
    type: Literal["DatePicker"] = "DatePicker"
    placeholder: RxStr = Field(
        default="Pick a date",
        description="Button text when no date is selected",
    )
    value: str | None = Field(
        default=None,
        description="Initially selected date (ISO string)",
    )
    name: str | None = Field(
        default=None,
        description="State key for reactive binding. Auto-generated if omitted.",
    )
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) when date changes",
    )
