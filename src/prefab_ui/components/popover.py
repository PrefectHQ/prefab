"""Popover — floating content panel triggered by a child element.

The first child becomes the trigger; remaining children become the content.

Example::

    from prefab_ui.components import Popover, Button, Column, Label, Slider

    with Popover(title="Settings"):
        Button("Open")          # trigger
        with Column(gap=3):     # content
            Label("Volume")
            Slider(name="volume")
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.components.base import ContainerComponent
from prefab_ui.rx import RxStr


class Popover(ContainerComponent):
    """Popover floating panel.

    First child = trigger, remaining children = content.

    Example::

        with Popover(title="Options"):
            Button("Configure")
            with Column(gap=2):
                Label("Setting")
                Input(name="value")
    """

    type: Literal["Popover"] = "Popover"
    title: RxStr | None = Field(
        default=None, description="Optional popover header title"
    )
    description: RxStr | None = Field(
        default=None, description="Optional popover description"
    )
    side: Literal["top", "right", "bottom", "left"] | None = Field(
        default=None, description="Which side to show the popover"
    )
