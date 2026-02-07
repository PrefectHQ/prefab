"""Grid layout container."""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import ContainerComponent, Gap


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
        description="Number of grid columns (1-12)",
    )
    gap: Gap = Field(default=None, description="Gap between children: int or (x, y)")

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
