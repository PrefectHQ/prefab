"""Colored dot indicator component."""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.components.base import Component
from prefab_ui.rx import RxStr

DotVariant = (
    Literal[
        "default",
        "secondary",
        "success",
        "warning",
        "destructive",
        "info",
        "muted",
    ]
    | RxStr
)

DotSize = Literal["sm", "default", "lg"]

DotShape = Literal["circle", "square", "rounded"]


class Dot(Component):
    """A colored dot indicator.

    Args:
        variant: Color variant (default, secondary, success, warning, destructive, info, muted).
        size: Dot size (sm, default, lg).
        shape: Dot shape (circle, square, rounded).

    **Example:**

    ```python
    Dot()
    Dot(variant="success")
    Dot(variant="warning", size="lg")
    Dot(shape="square", css_class="bg-purple-500")
    ```
    """

    type: Literal["Dot"] = "Dot"
    variant: DotVariant = Field(
        default="default",
        description=(
            "Visual variant: default, secondary, success, warning,"
            " destructive, info, muted"
        ),
    )
    size: DotSize = Field(
        default="default",
        description="Dot size: sm, default, lg",
    )
    shape: DotShape = Field(
        default="circle",
        description="Dot shape: circle, square, rounded",
    )
