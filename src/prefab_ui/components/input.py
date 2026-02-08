"""Input component for text entry.

Text inputs with full form validation styling and dark mode support.

Example::

    from prefab_ui.components import Input, Label

    Input(placeholder="Enter your name")
    Input(input_type="email", placeholder="you@example.com")
    Input(input_type="password", placeholder="••••••••")
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component

InputType = Literal[
    "text",
    "email",
    "password",
    "number",
    "tel",
    "url",
    "search",
    "date",
    "time",
    "datetime-local",
    "file",
]


class Input(Component):
    """Text input field component.

    Args:
        input_type: Input type (text, email, password, etc.)
        placeholder: Placeholder text
        value: Initial value
        name: Form field name
        disabled: Whether input is disabled
        required: Whether input is required
        css_class: Additional CSS classes

    Example::

        Input(placeholder="Search...")
        Input(input_type="email", placeholder="Email", required=True)
        Input(input_type="password", value="{{ user_password }}")
    """

    type: Literal["Input"] = "Input"
    input_type: InputType = Field(
        default="text",
        alias="inputType",
        description="Input type (text, email, password, etc.)",
    )
    placeholder: str | None = Field(
        default=None,
        description="Placeholder text",
    )
    value: str | None = Field(default=None, description="Input value")
    name: str | None = Field(default=None, description="Form field name")
    disabled: bool = Field(default=False, description="Whether input is disabled")
    required: bool = Field(default=False, description="Whether input is required")
    min_length: int | None = Field(
        default=None,
        alias="minLength",
        description="Minimum character length",
    )
    max_length: int | None = Field(
        default=None,
        alias="maxLength",
        description="Maximum character length",
    )
    min: float | None = Field(
        default=None, description="Minimum value (for number inputs)"
    )
    max: float | None = Field(
        default=None, description="Maximum value (for number inputs)"
    )
    step: float | None = Field(
        default=None, description="Step increment (for number inputs)"
    )
    pattern: str | None = Field(
        default=None, description="Regex pattern for validation"
    )
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) to execute when value changes",
    )
