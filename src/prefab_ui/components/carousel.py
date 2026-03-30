"""Carousel — scrollable container with auto-advance and navigation."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import ContainerComponent


class Carousel(ContainerComponent):
    """Scrollable container that cycles through children.

    Supports three modes depending on configuration:

    - **Carousel** (default): one item visible, user navigates with
      arrows/dots/swipe.
    - **Reel**: all items visible, auto-advances on a timer. Set
      ``auto_advance`` and ``show_controls=False``.
    - **Marquee**: all items visible, continuous smooth scroll. Set
      ``continuous=True``.

    Args:
        direction: Scroll direction.
        loop: Whether to loop back to the start.
        auto_advance: Milliseconds between auto-advances (reel mode). 0 = off.
        continuous: Smooth continuous scroll instead of discrete ticks (marquee mode).
        speed: Scroll speed for continuous mode (1-10).
        show_controls: Show navigation arrows.
        show_dots: Show pagination dots.
        pause_on_hover: Pause auto-advance/continuous scroll on hover.
        align: Slide alignment within the viewport.
        slides_to_scroll: Number of slides to advance per step.
        drag: Allow drag/swipe to navigate.

    **Example:**

    ```python
    with Carousel(auto_advance=3000, loop=True):
        Card(children=[Heading("Slide 1")])
        Card(children=[Heading("Slide 2")])
        Card(children=[Heading("Slide 3")])
    ```
    """

    type: Literal["Carousel"] = "Carousel"
    direction: Literal["left", "right", "up", "down"] = Field(
        default="left",
        description="Scroll direction",
    )
    loop: bool = Field(
        default=True,
        description="Loop back to start after reaching the end",
    )
    auto_advance: int = Field(
        default=0,
        alias="autoAdvance",
        description="Milliseconds between auto-advances. 0 = manual only.",
    )
    continuous: bool = Field(
        default=False,
        description="Smooth continuous scroll (marquee mode) instead of discrete ticks",
    )
    speed: int = Field(
        default=2,
        description="Scroll speed for continuous mode (1-10)",
    )
    show_controls: bool = Field(
        default=True,
        alias="showControls",
        description="Show previous/next navigation arrows",
    )
    show_dots: bool = Field(
        default=False,
        alias="showDots",
        description="Show pagination dots",
    )
    pause_on_hover: bool = Field(
        default=True,
        alias="pauseOnHover",
        description="Pause auto-advance or continuous scroll on hover",
    )
    align: Literal["start", "center", "end"] = Field(
        default="start",
        description="Slide alignment within the viewport",
    )
    slides_to_scroll: int = Field(
        default=1,
        alias="slidesToScroll",
        description="Number of slides to advance per step",
    )
    drag: bool = Field(
        default=True,
        description="Allow drag/swipe to navigate",
    )

    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
