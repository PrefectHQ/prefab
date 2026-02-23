"""Radio button components for mutually exclusive choices.

Radio buttons let users select exactly one option from a set.

Example::

    from prefab_ui.components import RadioGroup, Radio

    with RadioGroup(name="size"):
        Radio(value="sm", label="Small")
        Radio(value="md", label="Medium", checked=True)
        Radio(value="lg", label="Large")

    # Access reactive value
    group = RadioGroup()
    Text(f"Selected: {group.rx}")
"""

from __future__ import annotations

from typing import ClassVar, Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component, ContainerComponent, StatefulMixin


class RadioGroup(StatefulMixin, ContainerComponent):
    """Container for radio button options.

    Args:
        name: Form field name (shared by all radios in group)
        css_class: Additional CSS classes

    Example::

        with RadioGroup(name="theme"):
            Radio(value="light", label="Light")
            Radio(value="dark", label="Dark")
    """

    _auto_name: ClassVar[str] = "radiogroup"
    type: Literal["RadioGroup"] = "RadioGroup"
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
        value: Form value for this option
        label: Label text to display
        checked: Whether radio is initially selected
        name: Form field name (usually set by RadioGroup)
        disabled: Whether radio is disabled
        required: Whether radio is required
        css_class: Additional CSS classes

    Example::

        Radio(value="yes", label="Yes")
        Radio(value="no", label="No", checked=True)
    """

    _auto_name: ClassVar[str] = "radio"
    type: Literal["Radio"] = "Radio"
    value: str = Field(description="Form value")
    label: str | None = Field(default=None, description="Label text")
    checked: bool = Field(default=False, description="Whether radio is selected")
    name: str | None = Field(
        default=None,
        description="State key for reactive binding. Auto-generated if omitted.",
    )
    disabled: bool = Field(default=False, description="Whether radio is disabled")
    required: bool = Field(default=False, description="Whether radio is required")
