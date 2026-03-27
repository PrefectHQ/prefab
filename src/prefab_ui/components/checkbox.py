"""Checkbox component for binary choices.

Checkboxes let users select one or more options from a set.

**Example:**

```python
from prefab_ui.components import Checkbox, Label

Checkbox(value=True, label="Accept terms")
Checkbox(label="Subscribe to newsletter")

# Access reactive value
agree = Checkbox(label="I agree")
Text(f"Agreed: {agree.rx}")
```
"""

from __future__ import annotations

from typing import ClassVar, Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component, StatefulMixin
from prefab_ui.rx import RxStr


class Checkbox(StatefulMixin, Component):
    """Checkbox input component.

    Args:
        label: Label text to display next to checkbox
        value: Whether checkbox is checked
        name: Form field name
        disabled: Whether checkbox is disabled
        required: Whether checkbox is required
        css_class: Additional CSS classes

    **Example:**

    ```python
    Checkbox(label="Remember me")
    Checkbox(value=True, label="Agreed")
    Checkbox(label="Enable {{ feature_name }}", value="{{ is_enabled }}")
    ```
    """

    _auto_name: ClassVar[str] = "checkbox"
    type: Literal["Checkbox"] = "Checkbox"
    label: RxStr | None = Field(default=None, description="Label text")
    value: bool | RxStr = Field(
        default=False, description="Whether checkbox is checked"
    )
    name: str | None = Field(
        default=None,
        description="State key for reactive binding. Auto-generated if omitted.",
    )
    disabled: bool = Field(default=False, description="Whether checkbox is disabled")
    required: bool = Field(default=False, description="Whether checkbox is required")
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) to execute when checked state changes",
    )

    @property
    def checked(self) -> bool | RxStr:
        """Alias for `value` — whether checkbox is checked."""
        return self.value
