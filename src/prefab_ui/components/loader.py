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
    - ``"bars"`` — three vertical bars oscillating (equalizer / processing)
    - ``"ios"`` — segmented circle with chasing opacity (iOS-style)

    Args:
        variant: Animation style — "spin", "dots", "pulse", "bars", or "ios"
        size: Indicator size — "sm", "default", or "lg"

    Example::

        Loader()
        Loader(variant="dots")
        Loader(variant="pulse", size="lg")
        Loader(variant="bars")
        Loader(variant="ios")
    """

    type: Literal["Loader"] = "Loader"
    variant: Literal["spin", "dots", "pulse", "bars", "ios"] = Field(
        default="spin",
        description="Animation style: spin (rotating arc), dots (bouncing dots), pulse (pulsing dot), bars (oscillating bars), or ios (segmented circle)",
    )
    size: Literal["sm", "default", "lg"] = Field(
        default="default",
        description="Indicator size variant",
    )
