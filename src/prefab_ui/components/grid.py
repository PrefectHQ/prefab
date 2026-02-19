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


def _compile_column_template(columns: list[int | str]) -> str:
    """Compile a column list to a CSS grid-template-columns value.

    Integers become ``Nfr`` (fractional units); strings pass through as-is.

        [1, "auto", 1]  → "1fr auto 1fr"
        [2, 1]          → "2fr 1fr"
        ["200px", 1, 1] → "200px 1fr 1fr"
    """
    parts: list[str] = []
    for v in columns:
        if isinstance(v, int):
            parts.append(f"{v}fr")
        else:
            parts.append(v)
    return " ".join(parts)


class Grid(ContainerComponent):
    """Responsive CSS grid container.

    Args:
        columns: Number of columns (1-12), a list of column widths, a
            Responsive mapping, or a dict of breakpoint→column-count.
            Defaults to 3 equal columns. Pass a list for custom widths::

                Grid(columns=[1, "auto", 1])  # 1fr auto 1fr

            In a list, integers become fractional units (``1`` → ``1fr``)
            and strings pass through (``"auto"``, ``"200px"``).
        min_column_width: Minimum column width for auto-fill responsive
            grids (e.g. ``"16rem"``). Mutually exclusive with *columns*.
        gap: Gap between children: int, (x, y) tuple, or Responsive.
        css_class: Additional CSS classes to apply.

    Example::

        with Grid(columns=3):
            Card(...)
            Card(...)
            Card(...)

        # Custom widths: sidebar + content
        with Grid(columns=[1, 3]):
            Sidebar(...)
            MainContent(...)

        # Responsive: 1 col on mobile, 2 on md, 3 on lg
        with Grid(columns={"default": 1, "md": 2, "lg": 3}):
            Card(...)

        # Auto-fill: as many columns as fit, each ≥ 16rem
        with Grid(min_column_width="16rem"):
            Card(...)
    """

    type: Literal["Grid"] = "Grid"
    columns: int | list[int | str] | dict[str, int] | Responsive | None = Field(
        default=None,
        exclude=True,
    )
    column_template: str | None = Field(
        default=None,
        alias="columnTemplate",
        description="CSS grid-template-columns value for custom column widths.",
    )
    min_column_width: str | None = Field(default=None, alias="minColumnWidth")
    gap: Gap = Field(default=None, exclude=True)
    align: Align = Field(default=None, exclude=True)
    justify: Justify = Field(default=None, exclude=True)

    @overload
    def __init__(self, columns: int, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(
        self,
        *,
        columns: int | list[int | str] | dict[str, int] | Responsive,
        **kwargs: Any,
    ) -> None: ...

    @overload
    def __init__(self, *, min_column_width: str, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, **kwargs: Any) -> None: ...

    def __init__(
        self,
        columns: int | list[int | str] | dict[str, int] | Responsive | None = None,
        **kwargs: Any,
    ) -> None:
        if columns is not None:
            kwargs["columns"] = columns
        # Default to 3 columns when neither columns nor min_column_width given
        if columns is None and "min_column_width" not in kwargs:
            kwargs.setdefault("columns", 3)
        super().__init__(**kwargs)

    def model_post_init(self, __context: Any) -> None:
        # List columns → inline style via column_template (not a Tailwind class)
        columns_for_layout: int | dict[str, int] | Responsive | None
        if isinstance(self.columns, list):
            self.column_template = _compile_column_template(self.columns)
            columns_for_layout = None
        else:
            columns_for_layout = self.columns

        layout = _compile_layout_classes(
            gap=self.gap,
            columns=columns_for_layout,
            align=self.align,
            justify=self.justify,
        )
        self.css_class = _merge_css_classes(layout, self.css_class)
        super().model_post_init(__context)
