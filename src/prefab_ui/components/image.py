"""Image display component."""

from __future__ import annotations

from typing import Literal

from pydantic import Field

from prefab_ui.components.base import Component
from prefab_ui.rx import RxStr


class Image(Component):
    """Image element.

    Example::

        Image(src="{{ avatar_url }}", alt="{{ name }}")
    """

    type: Literal["Image"] = "Image"
    src: RxStr = Field(description="Image URL")
    alt: RxStr = Field(default="", description="Alt text")
    width: str | None = Field(default=None, description="CSS width")
    height: str | None = Field(default=None, description="CSS height")
