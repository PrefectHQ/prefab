"""Checkbox component for binary choices.

Checkboxes let users select one or more options from a set.

Example::

    from prefab_ui.components import Checkbox, Label

    Checkbox(checked=True, label="Accept terms")
    Checkbox(label="Subscribe to newsletter")
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component


class Checkbox(Component):
    """Checkbox input component.

    Args:
        label: Label text to display next to checkbox
        checked: Whether checkbox is checked
        name: Form field name
        value: Form value when checked
        disabled: Whether checkbox is disabled
        required: Whether checkbox is required
        css_class: Additional CSS classes

    Example::

        Checkbox(label="Remember me")
        Checkbox(checked=True, label="Agreed")
        Checkbox(label="Enable {{ feature_name }}", checked="{{ is_enabled }}")
    """

    type: Literal["Checkbox"] = "Checkbox"
    label: str | None = Field(
        default=None, description="Label text (supports {{ field }} interpolation)"
    )
    checked: bool = Field(default=False, description="Whether checkbox is checked")
    name: str | None = Field(default=None, description="Form field name")
    value: str | None = Field(
        default=None, description="Form value (supports {{ field }} interpolation)"
    )
    disabled: bool = Field(default=False, description="Whether checkbox is disabled")
    required: bool = Field(default=False, description="Whether checkbox is required")
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) to execute when checked state changes",
    )
