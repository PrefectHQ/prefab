"""Image display component."""

from __future__ import annotations

from pydantic import Field

from prefab_ui.components.base import Component


class Image(Component):
    """Image element with ``{{ field }}`` interpolation on src/alt.

    Example::

        Image(src="{{ avatar_url }}", alt="{{ name }}")
    """

    src: str = Field(description="Image URL with {{ field }} interpolation")
    alt: str = Field(default="", description="Alt text")
    width: str | None = Field(default=None, description="CSS width")
    height: str | None = Field(default=None, description="CSS height")
