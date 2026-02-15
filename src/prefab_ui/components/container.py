"""Responsive container with sensible defaults."""

from __future__ import annotations

from typing import Literal

from prefab_ui.components.base import ContainerComponent


class Container(ContainerComponent):
    """A centered, max-width container with responsive padding.

    Wraps content in Tailwind's ``container`` with automatic horizontal
    centering and padding that scales with the viewport.

    Example::

        with Container():
            H1("Dashboard")
            Grid(columns=3):
                ...
    """

    type: Literal["Container"] = "Container"
