"""Field component for choice card layouts.

Field wraps a form control (Switch, Checkbox, etc.) in a bordered card
with a title and optional description. Clicking anywhere on the card
activates the wrapped control.

Example::

    from prefab_ui.components import Field, Switch

    with Field(title="Dark mode", description="Use dark theme"):
        Switch(name="dark_mode")
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field as PydanticField

from prefab_ui.components.base import ContainerComponent


class Field(ContainerComponent):
    """Choice card container for form controls.

    Renders a bordered card with title/description on the left and
    the child control on the right. The entire card is clickable.

    Args:
        title: Card heading text (required).
        description: Secondary text below the title.
        disabled: Whether the field is dimmed and non-interactive.

    Example::

        with Field(title="Notifications", description="Get notified"):
            Switch(name="notifications")
    """

    type: Literal["Field"] = "Field"
    title: str = PydanticField(description="Card heading text")
    description: str | None = PydanticField(
        default=None, description="Secondary text below the title"
    )
    disabled: bool = PydanticField(
        default=False, description="Whether the field is dimmed and non-interactive"
    )
