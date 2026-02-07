"""Tabs component for switching between panels of content.

Example::

    from prefab_ui.components import Tabs, Tab, Text

    with Tabs(default_value="general"):
        with Tab("General"):
            Text("General settings here.")
        with Tab("Advanced"):
            Text("Advanced settings here.")
"""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import ContainerComponent


class Tab(ContainerComponent):
    """A single tab panel within a Tabs container.

    The ``title`` appears in the tab trigger; children are the panel content.

    Example::

        with Tab("Settings"):
            Text("Content shown when this tab is active.")
    """

    type: Literal["Tab"] = "Tab"
    title: str = Field(description="Tab trigger label")
    value: str | None = Field(
        default=None,
        description="Unique value for this tab (defaults to title)",
    )
    disabled: bool = Field(default=False, description="Disable this tab")

    @overload
    def __init__(self, title: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, title: str, **kwargs: Any) -> None: ...

    def __init__(self, title: str | None = None, **kwargs: Any) -> None:
        if title is not None and "title" not in kwargs:
            kwargs["title"] = title
        super().__init__(**kwargs)


class Tabs(ContainerComponent):
    """Tab container — children must be ``Tab`` components.

    Example::

        with Tabs(default_value="general"):
            with Tab("General"):
                Text("General settings")
            with Tab("Advanced"):
                Text("Advanced settings")
    """

    type: Literal["Tabs"] = "Tabs"
    default_value: str | None = Field(
        default=None,
        alias="defaultValue",
        description="Value of the initially active tab",
    )
    name: str | None = Field(
        default=None,
        description="State key for tracking the active tab",
    )
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) when the active tab changes",
    )
