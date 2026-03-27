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

    Lays children out left-to-right. Best for inline elements like
    badges, icons next to text, or button groups. Children are not
    equal-width — they size to their content.

    For equal-width or proportional layouts (e.g. a row of cards),
    use `Grid` instead: `Grid(columns=3, gap=4)` gives
    three equal columns without any flex classes.

    Args:
        gap: Space between children (Tailwind scale, e.g. 2, 4, 6).
        align: Cross-axis alignment — start, center, end, stretch,
            or baseline.
        justify: Main-axis distribution — start, center, end, between,
            around, evenly, or stretch.
        css_class: Additional Tailwind classes.

    **Example:**

    ```python
    with Row(gap=2, align="center"):
        Dot(variant="success")
        Text("Online")

    with Row(gap=4, align="center", justify="between"):
        Text("Label")
        Badge("Status", variant="success")
    ```
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
