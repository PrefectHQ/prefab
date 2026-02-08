"""Spinner loading indicator.

Example::

    from prefab_ui.components import Spinner

    Spinner()
    Spinner(size="lg")
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.components.base import Component


class Spinner(Component):
    """Animated loading spinner.

    Args:
        size: Spinner size — "sm", "default", or "lg"

    Example::

        Spinner()
        Spinner(size="lg")
    """

    type: Literal["Spinner"] = "Spinner"
    size: Literal["sm", "default", "lg"] = Field(
        default="default",
        description="Spinner size variant",
    )
