"""ButtonGroup component following shadcn/ui v4 conventions.

Groups buttons together with merged borders and adjusted corners.

Example::

    from prefab_ui.components import Button, ButtonGroup

    with ButtonGroup():
        Button("Previous")
        Button("Next")
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.components.base import ContainerComponent


class ButtonGroup(ContainerComponent):
    """A container that groups buttons with merged borders.

    Args:
        orientation: Layout direction - "horizontal" or "vertical"
        css_class: Additional CSS classes to apply

    Example::

        from prefab_ui.components import Button, ButtonGroup

        with ButtonGroup():
            Button("Save")
            Button("Cancel", variant="outline")

        with ButtonGroup(orientation="vertical"):
            Button("Top")
            Button("Middle")
            Button("Bottom")
    """

    type: Literal["ButtonGroup"] = "ButtonGroup"
    orientation: Literal["horizontal", "vertical"] = Field(
        default="horizontal",
        description="Layout direction: horizontal or vertical",
    )
