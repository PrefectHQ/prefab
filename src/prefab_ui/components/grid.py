"""Grid layout container."""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import (
    Align,
    ContainerComponent,
    Gap,
    Justify,
    Responsive,
    _compile_layout_classes,
    _merge_css_classes,
)


class Grid(ContainerComponent):
    """Responsive CSS grid container.

    Args:
        columns: Number of columns (1-12), a Responsive mapping, or a
            dict of breakpoint→column-count. Defaults to 3.
        min_column_width: Minimum column width for auto-fill responsive
            grids (e.g. ``"16rem"``). Mutually exclusive with *columns*.
        gap: Gap between children: int, (x, y) tuple, or Responsive.
        css_class: Additional CSS classes to apply.

    Example::

        with Grid(columns=3):
            Card(...)
            Card(...)
            Card(...)

        # Responsive: 1 col on mobile, 2 on md, 3 on lg
        with Grid(columns={"default": 1, "md": 2, "lg": 3}):
            Card(...)

        # Auto-fill: as many columns as fit, each ≥ 16rem
        with Grid(min_column_width="16rem"):
            Card(...)
    """

    type: Literal["Grid"] = "Grid"
    columns: int | dict[str, int] | Responsive | None = Field(
        default=None,
        exclude=True,
    )
    min_column_width: str | None = Field(default=None, exclude=True)
    gap: Gap = Field(default=None, exclude=True)
    align: Align = Field(default=None, exclude=True)
    justify: Justify = Field(default=None, exclude=True)

    @overload
    def __init__(self, columns: int, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(
        self, *, columns: int | dict[str, int] | Responsive, **kwargs: Any
    ) -> None: ...

    @overload
    def __init__(self, *, min_column_width: str, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, **kwargs: Any) -> None: ...

    def __init__(
        self,
        columns: int | dict[str, int] | Responsive | None = None,
        **kwargs: Any,
    ) -> None:
        if columns is not None:
            kwargs["columns"] = columns
        # Default to 3 columns when neither columns nor min_column_width given
        if columns is None and "min_column_width" not in kwargs:
            kwargs.setdefault("columns", 3)
        super().__init__(**kwargs)

    def model_post_init(self, __context: Any) -> None:
        layout = _compile_layout_classes(
            gap=self.gap,
            columns=self.columns,
            min_column_width=self.min_column_width,
            align=self.align,
            justify=self.justify,
        )
        self.css_class = _merge_css_classes(layout, self.css_class)
        super().model_post_init(__context)
