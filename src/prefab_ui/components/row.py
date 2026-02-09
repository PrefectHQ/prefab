"""Row layout container."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import (
    Align,
    ContainerComponent,
    Gap,
    Justify,
    _compile_layout_classes,
    _merge_css_classes,
)


class Row(ContainerComponent):
    """Horizontal flex container.

    Example::

        with Row():
            Text("Left")
            Text("Right")

        with Row(gap=4, align="center"):
            Icon("check")
            Text("Confirmed")
    """

    type: Literal["Row"] = "Row"
    gap: Gap = Field(default=None, exclude=True)
    align: Align = Field(default=None, exclude=True)
    justify: Justify = Field(default=None, exclude=True)

    def model_post_init(self, __context: Any) -> None:
        layout = _compile_layout_classes(
            gap=self.gap, align=self.align, justify=self.justify
        )
        self.css_class = _merge_css_classes(layout, self.css_class)
        super().model_post_init(__context)
