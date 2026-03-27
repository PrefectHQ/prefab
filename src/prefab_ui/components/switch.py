"""Switch component for toggle controls.

Switches provide an alternative to checkboxes for on/off states.

**Example:**

```python
from prefab_ui.components import Switch

Switch(label="Enable notifications", value=True)
Switch(label="Dark mode", size="sm")

# Access reactive value
toggle = Switch(label="Enable feature")
Text(f"Enabled: {toggle.rx}")
```
"""

from __future__ import annotations

from typing import ClassVar, Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component, StatefulMixin
from prefab_ui.rx import RxStr

SwitchSize = Literal["sm", "default"]


class Switch(StatefulMixin, Component):
    """Toggle switch component.

    Args:
        label: Label text to display next to switch
        value: Whether switch is on
        size: Switch size ("sm" or "default")
        name: Form field name
        disabled: Whether switch is disabled
        required: Whether switch is required
        css_class: Additional CSS classes

    **Example:**

    ```python
    Switch(label="Enabled")
    Switch(value=True, label="Active", size="sm")
    ```
    """

    _auto_name: ClassVar[str] = "switch"
    type: Literal["Switch"] = "Switch"
    label: RxStr | None = Field(default=None, description="Label text")
    value: bool | RxStr = Field(default=False, description="Whether switch is on")
    size: SwitchSize = Field(default="default", description="Switch size (sm, default)")
    name: str | None = Field(
        default=None,
        description="State key for reactive binding. Auto-generated if omitted.",
    )
    disabled: bool = Field(default=False, description="Whether switch is disabled")
    required: bool = Field(default=False, description="Whether switch is required")
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) to execute when toggled",
    )

    @property
    def checked(self) -> bool | RxStr:
        """Alias for `value` — whether switch is on."""
        return self.value
