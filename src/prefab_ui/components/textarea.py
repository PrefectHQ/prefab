"""Textarea component for multi-line text entry.

Multi-line text inputs with auto-sizing and form validation styling.

Example::

    from prefab_ui.components import Textarea, Label

    Textarea(placeholder="Enter your message...")
    Textarea(rows=5, placeholder="Feedback")

    # Access reactive value
    textarea = Textarea(placeholder="Your feedback...")
    Text(f"Comment: {textarea.rx}")
"""

from __future__ import annotations

from typing import ClassVar, Literal

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component, StatefulMixin


class Textarea(StatefulMixin, Component):
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

    _auto_name: ClassVar[str] = "textarea"
    type: Literal["Textarea"] = "Textarea"
    placeholder: str | None = Field(
        default=None,
        description="Placeholder text",
    )
    value: str | None = Field(default=None, description="Textarea value")
    name: str | None = Field(
        default=None,
        description="State key for reactive binding. Auto-generated if omitted.",
    )
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

    def _get_initial_value(self) -> str | None:
        return self.value
