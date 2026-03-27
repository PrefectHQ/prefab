"""Radio button components for mutually exclusive choices.

Radio buttons let users select exactly one option from a set.

**Example:**

```python
from prefab_ui.components import RadioGroup, Radio

with RadioGroup(name="size"):
    Radio(option="sm", label="Small")
    Radio(option="md", label="Medium", value=True)
    Radio(option="lg", label="Large")

# Access reactive value
group = RadioGroup()
Text(f"Selected: {group.rx}")
```
"""

from __future__ import annotations

from typing import Any, ClassVar, Literal

from pydantic import Field, model_validator

from prefab_ui.actions import Action
from prefab_ui.components.base import Component, ContainerComponent, StatefulMixin
from prefab_ui.rx import RxStr


class RadioGroup(StatefulMixin, ContainerComponent):
    """Container for radio button options.

    Args:
        value: Initially selected radio option string
        name: Form field name (shared by all radios in group)
        css_class: Additional CSS classes

    **Example:**

    ```python
    with RadioGroup(name="theme", value="light"):
        Radio(option="light", label="Light")
        Radio(option="dark", label="Dark")
    ```
    """

    _auto_name: ClassVar[str] = "radiogroup"
    type: Literal["RadioGroup"] = "RadioGroup"
    value: RxStr | None = Field(
        default=None,
        description="Initially selected radio option string",
    )
    name: str | None = Field(
        default=None,
        description="State key for reactive binding. Auto-generated if omitted.",
    )
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) to execute when selection changes",
    )


class Radio(StatefulMixin, Component):
    """Radio button input component.

    Args:
        option: Option identifier for this radio within its group
        label: Label text to display
        value: Whether radio is initially selected
        name: Form field name (usually set by RadioGroup)
        disabled: Whether radio is disabled
        required: Whether radio is required
        css_class: Additional CSS classes

    **Example:**

    ```python
    Radio(option="yes", label="Yes")
    Radio(option="no", label="No", value=True)
    ```
    """

    _auto_name: ClassVar[str] = "radio"
    type: Literal["Radio"] = "Radio"
    option: RxStr = Field(description="Option identifier within the group")
    label: RxStr | None = Field(default=None, description="Label text")
    value: bool | RxStr = Field(default=False, description="Whether radio is selected")
    name: str | None = Field(
        default=None,
        description="State key for reactive binding. Auto-generated if omitted.",
    )
    disabled: bool = Field(default=False, description="Whether radio is disabled")
    required: bool = Field(default=False, description="Whether radio is required")

    @model_validator(mode="before")
    @classmethod
    def _default_option_from_label(cls, data: Any) -> Any:
        """Default `option` from `label` if not provided."""
        if isinstance(data, dict) and "option" not in data:
            label = data.get("label")
            if label is not None:
                data["option"] = label
        return data

    @property
    def checked(self) -> bool | RxStr:
        """Alias for `value` — whether radio is selected."""
        return self.value
