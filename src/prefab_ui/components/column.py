"""Column layout container."""

from __future__ import annotations

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

    gap: Gap = Field(default=None, description="Gap between children: int or (x, y)")
