"""Badge component following shadcn/ui conventions.

Badges display short status indicators or labels.

Example::

    from prefab_ui.components import Badge

    Badge("New")
    Badge("{{ status }}")
    Badge("Error", variant="destructive")
    Badge("Draft", variant="secondary")
    Badge("Custom", variant="outline")
"""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import Component

BadgeVariant = Literal[
    "default",
    "secondary",
    "destructive",
    "success",
    "warning",
    "info",
    "outline",
    "ghost",
]


class Badge(Component):
    """A badge component for displaying status or labels.

    Args:
        label: Badge text
        variant: Visual style - "default", "secondary", "destructive", "outline",
            "ghost", "success", "warning", "info"
        css_class: Additional CSS classes to apply

    Example::

        Badge("Active")
        Badge("{{ user.role }}")
        Badge("Error", variant="destructive")
        Badge("Draft", variant="secondary")
        Badge("Custom", variant="outline")
        Badge("Ghost", variant="ghost")
    """

    type: Literal["Badge"] = "Badge"
    label: str = Field(description="Badge text")
    variant: BadgeVariant = Field(
        default="default",
        description="Visual variant: default, secondary, destructive, outline, ghost, success, warning, or info",
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
