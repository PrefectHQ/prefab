"""Video playback component."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import Component
from prefab_ui.rx import RxStr


class Video(Component):
    """HTML5 video element.

    Example::

        Video(src="https://example.com/video.mp4")
        Video(src="...", controls=True, autoplay=True, muted=True)
    """

    type: Literal["Video"] = "Video"
    src: RxStr = Field(description="Video URL")
    poster: RxStr | None = Field(default=None, description="Poster image URL")
    controls: bool = Field(default=True, description="Show playback controls")
    autoplay: bool = Field(default=False, description="Auto-start playback")
    loop: bool = Field(default=False, description="Loop playback")
    muted: bool = Field(default=False, description="Mute audio")
    width: str | None = Field(default=None, description="CSS width")
    height: str | None = Field(default=None, description="CSS height")

    def __init__(self, src: str | None = None, /, **kwargs: Any) -> None:
        if src is not None and "src" not in kwargs:
            kwargs["src"] = src
        super().__init__(**kwargs)
