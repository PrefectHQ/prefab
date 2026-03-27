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

    Stacks children top-to-bottom. Use as a context manager to add
    children declaratively.

    Args:
        gap: Space between children (Tailwind scale, e.g. 2, 4, 6).
        align: Cross-axis alignment — start, center, end, stretch,
            or baseline.
        justify: Main-axis distribution — start, center, end, between,
            around, evenly, or stretch.
        css_class: Additional Tailwind classes (e.g. "p-6 max-w-2xl").

    **Example:**

    ```python
    with Column(gap=4):
        Heading("Title")
        Text("Body")

    with Column(gap=2, align="center", css_class="p-6"):
        Icon("check")
        Text("Confirmed")
    ```
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
