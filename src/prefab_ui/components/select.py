"""Select component for dropdown choices.

Select dropdowns let users pick from a list of options.

Example::

    from prefab_ui.components import Select, SelectOption

    with Select(placeholder="Choose size..."):
        SelectOption(value="sm", label="Small")
        SelectOption(value="md", label="Medium")
        SelectOption(value="lg", label="Large")
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component, ContainerComponent

SelectSize = Literal["sm", "default"]


class Select(ContainerComponent):
    """Select dropdown container.

    Args:
        placeholder: Placeholder text when no option selected
        name: Form field name
        size: Select size ("sm" or "default")
        disabled: Whether select is disabled
        required: Whether select is required
        css_class: Additional CSS classes

    Example::

        with Select(placeholder="Pick one...", name="choice"):
            SelectOption(value="a", label="Option A")
            SelectOption(value="b", label="Option B")
    """

    type: Literal["Select"] = "Select"
    placeholder: str | None = Field(
        default=None,
        description="Placeholder text (supports {{ field }} interpolation)",
    )
    name: str | None = Field(default=None, description="Form field name")
    size: SelectSize = Field(default="default", description="Select size (sm, default)")
    disabled: bool = Field(default=False, description="Whether select is disabled")
    required: bool = Field(default=False, description="Whether select is required")
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) to execute when selection changes",
    )


class SelectOption(Component):
    """Select dropdown option.

    Args:
        value: Option value
        label: Display text
        selected: Whether option is initially selected
        disabled: Whether option is disabled
        css_class: Additional CSS classes

    Example::

        SelectOption(value="yes", label="Yes")
        SelectOption(value="no", label="No", selected=True)
    """

    type: Literal["SelectOption"] = "SelectOption"
    value: str = Field(description="Option value (supports {{ field }} interpolation)")
    label: str = Field(description="Display text (supports {{ field }} interpolation)")
    selected: bool = Field(default=False, description="Whether option is selected")
    disabled: bool = Field(default=False, description="Whether option is disabled")
