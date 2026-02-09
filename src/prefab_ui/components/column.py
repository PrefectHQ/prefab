"""Column layout container."""

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
    gap: Gap = Field(default=None, exclude=True)
    align: Align = Field(default=None, exclude=True)
    justify: Justify = Field(default=None, exclude=True)

    def model_post_init(self, __context: Any) -> None:
        layout = _compile_layout_classes(
            gap=self.gap, align=self.align, justify=self.justify
        )
        self.css_class = _merge_css_classes(layout, self.css_class)
        super().model_post_init(__context)
