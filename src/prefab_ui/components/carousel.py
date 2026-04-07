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
    - **Reel**: auto-advances on a timer. Set ``auto_advance`` and
      ``show_controls=False``.
    - **Marquee**: continuous smooth scroll. Set ``continuous=True``.

    Args:
        visible: How many slides are visible at once. Use a float for
            peek: ``1.3`` shows 1 full slide + 15% of prev/next peeking
            on each side. ``None`` = natural slide sizing (default for
            marquee when ``continuous=True`` and ``visible`` is omitted).
        gap: Pixels between slides.
        height: Fixed height in pixels. Auto-detected for vertical
            carousels from the first slide's content.
        direction: Scroll direction.
        loop: Whether to loop back to the start.
        auto_advance: Milliseconds between auto-advances. 0 = off.
        continuous: Smooth continuous scroll (marquee mode).
        speed: Scroll speed for continuous mode (1-10).
        effect: Visual transition effect.
        dim_inactive: Reduce opacity of non-active slides.
        show_controls: Show navigation arrows.
        controls_position: Position controls over slides, outside the viewport,
            or in the same gutter as pagination dots.
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
    visible: float | None = Field(
        default=1,
        description="Slides visible at once. Float for peek: 1.3 = 1 slide + 15% peek each side. None = natural sizing (default for marquee when visible is omitted).",
    )
    gap: int = Field(
        default=16,
        description="Pixels between slides",
    )
    height: int | None = Field(
        default=None,
        description="Fixed height in pixels. Auto-detected for vertical carousels.",
    )
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
        description="Smooth continuous scroll (marquee mode)",
    )
    speed: int = Field(
        default=2,
        description="Scroll speed for continuous mode (1-10)",
    )
    effect: Literal["slide", "fade"] = Field(
        default="slide",
        description="Transition effect: slide or fade",
    )
    dim_inactive: bool = Field(
        default=False,
        alias="dimInactive",
        description="Reduce opacity of non-active slides",
    )
    show_controls: bool = Field(
        default=True,
        alias="showControls",
        description="Show previous/next navigation arrows",
    )
    controls_position: Literal["overlay", "outside", "gutter"] = Field(
        default="outside",
        alias="controlsPosition",
        description="Position controls over slides (overlay), outside the viewport, or in the dots gutter",
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
        # Marquee defaults to natural sizing unless visible is explicitly set.
        if kwargs.get("continuous") and "visible" not in kwargs:
            kwargs["visible"] = None
        # Fade mode is single-slide only.
        if kwargs.get("effect") == "fade":
            kwargs["visible"] = 1
        super().__init__(**kwargs)

    def to_json(self) -> dict[str, Any]:
        data = super().to_json()
        # Keep explicit visible=None on the wire so the renderer can
        # differentiate it from an omitted value.
        if "visible" in self.model_fields_set and self.visible is None:
            data["visible"] = None
        return data
