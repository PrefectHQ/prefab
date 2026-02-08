"""Switch component for toggle controls.

Switches provide an alternative to checkboxes for on/off states.

Example::

    from prefab_ui.components import Switch

    Switch(label="Enable notifications", checked=True)
    Switch(label="Dark mode", size="sm")
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component

SwitchSize = Literal["sm", "default"]


class Switch(Component):
    """Toggle switch component.

    Args:
        label: Label text to display next to switch
        checked: Whether switch is on
        size: Switch size ("sm" or "default")
        name: Form field name
        disabled: Whether switch is disabled
        required: Whether switch is required
        css_class: Additional CSS classes

    Example::

        Switch(label="Enabled")
        Switch(checked=True, label="Active", size="sm")
    """

    type: Literal["Switch"] = "Switch"
    label: str | None = Field(default=None, description="Label text")
    checked: bool = Field(default=False, description="Whether switch is on")
    size: SwitchSize = Field(default="default", description="Switch size (sm, default)")
    name: str | None = Field(default=None, description="Form field name")
    disabled: bool = Field(default=False, description="Whether switch is disabled")
    required: bool = Field(default=False, description="Whether switch is required")
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) to execute when toggled",
    )
