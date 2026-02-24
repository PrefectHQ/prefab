"""Circular progress ring component."""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.components.base import ContainerComponent

RingVariant = Literal["default", "success", "warning", "destructive", "info", "muted"]
RingSize = Literal["sm", "default", "lg"]


class Ring(ContainerComponent):
    """A circular progress indicator with an optional centered label.

    Renders an SVG ring that fills clockwise from 12 o'clock based on the
    current value within the min/max range. Accepts children for custom
    center content; when no children are present, ``label`` is shown.

    Example::

        Ring(value=75, label="75%", variant="success")
        Ring(value=3, max=5, label="3/5", variant="info", size="lg")

        with Ring(value=75, variant="success", size="lg"):
            H1("75%")
    """

    type: Literal["Ring"] = "Ring"
    value: float | str = Field(
        default=0,
        description="Current value (number or template expression)",
    )
    min: float = Field(default=0, description="Minimum value")
    max: float = Field(default=100, description="Maximum value")
    label: str | None = Field(
        default=None,
        description="Text displayed in the center of the ring",
    )
    variant: RingVariant = Field(
        default="default",
        description="Visual variant: default, success, warning, destructive, info, muted",
    )
    size: RingSize = Field(
        default="default",
        description="Ring size: sm (64px), default (96px), lg (128px)",
    )
    thickness: float = Field(
        default=6,
        description="Stroke width of the ring in pixels",
    )
