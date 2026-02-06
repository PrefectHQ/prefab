"""Textarea component for multi-line text entry.

Multi-line text inputs with auto-sizing and form validation styling.

Example::

    from prefab_ui.components import Textarea, Label

    Textarea(placeholder="Enter your message...")
    Textarea(rows=5, placeholder="Feedback")
"""

from __future__ import annotations

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component


class Textarea(Component):
    """Multi-line text input component.

    Args:
        placeholder: Placeholder text
        value: Initial value
        name: Form field name
        rows: Number of visible text rows
        disabled: Whether textarea is disabled
        required: Whether textarea is required
        css_class: Additional CSS classes

    Example::

        Textarea(placeholder="Write something...")
        Textarea(rows=10, value="{{ comment_text }}")
    """

    placeholder: str | None = Field(
        default=None,
        description="Placeholder text (supports {{ field }} interpolation)",
    )
    value: str | None = Field(
        default=None, description="Textarea value (supports {{ field }} interpolation)"
    )
    name: str | None = Field(default=None, description="Form field name")
    rows: int | None = Field(default=None, description="Number of visible text rows")
    disabled: bool = Field(default=False, description="Whether textarea is disabled")
    required: bool = Field(default=False, description="Whether textarea is required")
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
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) to execute when value changes",
    )
