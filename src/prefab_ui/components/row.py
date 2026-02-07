"""Row layout container."""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.components.base import ContainerComponent, Gap


class Row(ContainerComponent):
    """Horizontal flex container.

    Example::

        with Row():
            Text("Left")
            Text("Right")

        with Row(gap=4):
            Button("A")
            Button("B")

        with Row(gap=(4, 2)):
            Button("A")
            Button("B")
    """

    type: Literal["Row"] = "Row"
    gap: Gap = Field(default=None, description="Gap between children: int or (x, y)")
