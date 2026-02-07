"""Column layout container."""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.components.base import ContainerComponent, Gap


class Column(ContainerComponent):
    """Vertical flex container.

    Example::

        with Column():
            Heading("Title")
            Text("Body")

        with Column(gap=4):
            Heading("Title")
            Text("Body")
    """

    type: Literal["Column"] = "Column"
    gap: Gap = Field(default=None, description="Gap between children: int or (x, y)")
