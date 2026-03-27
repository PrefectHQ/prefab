"""Audio playback component."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import Component
from prefab_ui.rx import RxStr


class Audio(Component):
    """HTML5 audio element.

    Args:
        src: Audio URL.
        controls: Show playback controls.
        autoplay: Auto-start playback.
        loop: Loop playback.
        muted: Mute audio.

    **Example:**

    ```python
    Audio(src="https://example.com/track.mp3")
    Audio(src="...", controls=True, loop=True)
    ```
    """

    type: Literal["Audio"] = "Audio"
    src: RxStr = Field(description="Audio URL")
    controls: bool = Field(default=True, description="Show playback controls")
    autoplay: bool = Field(default=False, description="Auto-start playback")
    loop: bool = Field(default=False, description="Loop playback")
    muted: bool = Field(default=False, description="Mute audio")

    def __init__(self, src: str | None = None, /, **kwargs: Any) -> None:
        if src is not None and "src" not in kwargs:
            kwargs["src"] = src
        super().__init__(**kwargs)
