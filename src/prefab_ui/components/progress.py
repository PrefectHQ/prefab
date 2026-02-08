"""Progress bar component."""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.components.base import Component


class Progress(Component):
    """A progress bar showing completion status.

    Example::

        Progress(value=75)
        Progress(value=3, max=10)
        Progress(value=80, indicator_class="bg-green-500")
    """

    type: Literal["Progress"] = "Progress"
    value: float | str = Field(
        default=0,
        description="Current progress value",
    )
    max: float = Field(default=100, description="Maximum value (progress is value/max)")
    indicator_class: str | None = Field(
        default=None,
        alias="indicatorClass",
        description="Tailwind classes for the indicator bar (e.g. 'bg-green-500')",
    )
