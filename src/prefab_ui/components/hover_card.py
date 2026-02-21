"""HoverCard — rich content panel that appears on hover.

The first child becomes the trigger; remaining children become the content.

Example::

    from prefab_ui.components import HoverCard, Badge, Column, Text, Progress

    with HoverCard(open_delay=0):
        Badge("In Orbit")          # trigger
        with Column(gap=2):        # content
            Text("heart-of-gold")
            Progress(value=100, indicator_class="bg-green-500")
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.components.base import ContainerComponent


class HoverCard(ContainerComponent):
    """Hover card with rich content.

    First child = trigger, remaining children = content.
    Appears on hover and auto-dismisses on mouse leave.

    Example::

        with HoverCard(open_delay=0):
            Badge("Healthy")
            with Column(gap=2):
                Text("weather-api")
                Muted("Uptime: 99.97%")
    """

    type: Literal["HoverCard"] = "HoverCard"
    side: Literal["top", "right", "bottom", "left"] | None = Field(
        default=None, description="Which side to show the hover card"
    )
    open_delay: int | None = Field(
        default=None,
        alias="openDelay",
        description="Delay in milliseconds before opening",
    )
    close_delay: int | None = Field(
        default=None,
        alias="closeDelay",
        description="Delay in milliseconds before closing",
    )
