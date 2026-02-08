"""Icon component for rendering lucide icons by name.

Uses the lucide-react icon library. Pass any icon name in kebab-case.
Browse available icons at https://lucide.dev/icons.

Example::

    from prefab_ui.components import Icon, Button

    # Standalone icon
    Icon("circle-alert")

    # Inside a button (renders inline)
    with Button():
        Icon("download")
        "Download file"
"""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import Component


class Icon(Component):
    """Renders a lucide icon by name.

    Args:
        name: Lucide icon name in kebab-case (e.g., "arrow-right", "circle-alert")
        size: Icon size — "sm" (16px), "default" (16px with standard spacing),
            or "lg" (24px)

    Example::

        Icon("check")
        Icon("arrow-right", size="lg")
    """

    type: Literal["Icon"] = "Icon"
    name: str = Field(description="Lucide icon name in kebab-case")
    size: Literal["sm", "default", "lg"] = Field(
        default="default",
        description="Icon size variant",
    )

    @overload
    def __init__(self, name: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, name: str, **kwargs: Any) -> None: ...

    def __init__(self, name: str | None = None, **kwargs: Any) -> None:
        if name is not None and "name" not in kwargs:
            kwargs["name"] = name
        super().__init__(**kwargs)
