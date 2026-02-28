"""Button component following shadcn/ui conventions.

Buttons support multiple variants and sizes, with automatic dark mode styling.

Example::

    from prefab_ui.components import Button

    Button("Click me")
    Button("Save", variant="default")
    Button("Delete", variant="destructive")
    Button("Cancel", variant="outline")
    Button("More options", variant="ghost")
    Button("Learn more", variant="link")

    # Sizes
    Button("Small", size="sm")
    Button("Large", size="lg")
    Button("Icon", size="icon")
"""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component
from prefab_ui.rx import RxStr

ButtonVariant = Literal[
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
    "success",
    "warning",
    "info",
]
ButtonSize = Literal[
    "default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"
]


class Button(Component):
    """A button component with multiple variants and sizes.

    Args:
        label: Button text
        variant: Visual style - "default", "destructive", "outline", "secondary", "ghost", "link"
        size: Button size - "default", "sm", "lg", "icon"
        disabled: Whether the button is disabled
        css_class: Additional CSS classes to apply

    Example::

        Button("Save Changes")
        Button("Delete", variant="destructive")
        Button("Cancel", variant="outline", size="sm")
    """

    type: Literal["Button"] = "Button"
    label: RxStr = Field(description="Button text")
    icon: str | None = Field(
        default=None,
        description="Lucide icon name (kebab-case, e.g. 'arrow-right')",
    )
    variant: ButtonVariant = Field(
        default="default",
        description="Visual variant: default, destructive, outline, secondary, ghost, link",
    )
    size: ButtonSize = Field(
        default="default",
        description="Size: default, sm, lg, icon",
    )
    disabled: bool | RxStr = Field(
        default=False, description="Whether the button is disabled"
    )
    on_click: Action | list[Action] | None = Field(
        default=None,
        alias="onClick",
        description="Action(s) to execute when clicked",
    )

    @overload
    def __init__(self, label: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, label: str, **kwargs: Any) -> None: ...

    def __init__(self, label: str | None = None, **kwargs: Any) -> None:
        """Accept label as positional or keyword argument."""
        if label is not None:
            kwargs["label"] = label
        super().__init__(**kwargs)
