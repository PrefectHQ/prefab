"""Navigation actions."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.actions.base import ActionBase


class OpenLink(ActionBase):
    """Open a URL via the host."""

    action: Literal["openLink"] = "openLink"
    url: str = Field(description="URL to open")

    def __init__(self, url: str, **kwargs: Any) -> None:
        kwargs["url"] = url
        super().__init__(**kwargs)
