"""Grid layout container."""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import (
    Align,
    ContainerComponent,
    Gap,
    Justify,
    _compile_layout_classes,
    _merge_css_classes,
)


class Grid(ContainerComponent):
    """Responsive CSS grid container.

    Args:
        columns: Number of columns (1-12). Defaults to 3.
        gap: Gap between children: int or (x, y) tuple. Defaults to 4.
        css_class: Additional CSS classes to apply.

    Example::

        with Grid(columns=3):
            Card(...)
            Card(...)
            Card(...)

        with Grid(2, gap=(6, 3)):
            Text("Left")
            Text("Right")
    """

    type: Literal["Grid"] = "Grid"
    columns: int = Field(
        default=3,
        ge=1,
        le=12,
        exclude=True,
    )
    gap: Gap = Field(default=None, exclude=True)
    align: Align = Field(default=None, exclude=True)
    justify: Justify = Field(default=None, exclude=True)

    @overload
    def __init__(self, columns: int, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, columns: int, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, **kwargs: Any) -> None: ...

    def __init__(self, columns: int | None = None, **kwargs: Any) -> None:
        if columns is not None:
            kwargs["columns"] = columns
        super().__init__(**kwargs)

    def model_post_init(self, __context: Any) -> None:
        layout = _compile_layout_classes(
            gap=self.gap,
            columns=self.columns,
            align=self.align,
            justify=self.justify,
        )
        self.css_class = _merge_css_classes(layout, self.css_class)
        super().model_post_init(__context)
