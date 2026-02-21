"""Loader activity indicator.

Loaders communicate that something is happening — a request in flight,
content loading, or a background process running.

Example::

    from prefab_ui.components import Loader

    Loader()
    Loader(variant="dots")
    Loader(variant="pulse")
    Loader(size="lg")
"""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.components.base import Component


class Loader(Component):
    """Animated activity indicator.

    Three visual variants convey "something is happening":

    - ``"spin"`` — a rotating arc (default, classic loading spinner)
    - ``"dots"`` — three dots bouncing in sequence (typing / processing)
    - ``"pulse"`` — a pulsing dot (background activity / heartbeat)

    Args:
        variant: Animation style — "spin", "dots", or "pulse"
        size: Indicator size — "sm", "default", or "lg"

    Example::

        Loader()
        Loader(variant="dots")
        Loader(variant="pulse", size="lg")
    """

    type: Literal["Loader"] = "Loader"
    variant: Literal["spin", "dots", "pulse"] = Field(
        default="spin",
        description="Animation style: spin (rotating arc), dots (bouncing dots), or pulse (pulsing dot)",
    )
    size: Literal["sm", "default", "lg"] = Field(
        default="default",
        description="Indicator size variant",
    )
