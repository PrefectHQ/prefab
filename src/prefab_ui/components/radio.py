"""Radio button components for mutually exclusive choices.

Radio buttons let users select exactly one option from a set.

Example::

    from prefab_ui.components import RadioGroup, Radio

    with RadioGroup(name="size"):
        Radio(value="sm", label="Small")
        Radio(value="md", label="Medium", checked=True)
        Radio(value="lg", label="Large")
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component, ContainerComponent


class RadioGroup(ContainerComponent):
    """Container for radio button options.

    Args:
        name: Form field name (shared by all radios in group)
        css_class: Additional CSS classes

    Example::

        with RadioGroup(name="theme"):
            Radio(value="light", label="Light")
            Radio(value="dark", label="Dark")
    """

    type: Literal["RadioGroup"] = "RadioGroup"
    name: str | None = Field(default=None, description="Form field name for all radios")
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) to execute when selection changes",
    )


class Radio(Component):
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

    type: Literal["Radio"] = "Radio"
    value: str = Field(description="Form value")
    label: str | None = Field(default=None, description="Label text")
    checked: bool = Field(default=False, description="Whether radio is selected")
    name: str | None = Field(default=None, description="Form field name")
    disabled: bool = Field(default=False, description="Whether radio is disabled")
    required: bool = Field(default=False, description="Whether radio is required")
