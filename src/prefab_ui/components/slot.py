"""Dynamic view slot — renders a component tree from state."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import ContainerComponent


class Slot(ContainerComponent):
    """Render a component tree stored in state.

    ``Slot`` is a named placeholder in your layout. When the state key
    contains a component tree, Slot renders it. When the state key is
    empty, Slot renders its children as fallback content::

        with Slot("detail_view"):
            Text("Select an item to see details")

    The slot content is typically populated by an action with
    ``result_key``::

        Button(
            "Load Details",
            on_click=CallTool("get_detail", result_key="detail_view"),
        )
    """

    type: Literal["Slot"] = "Slot"
    name: str = Field(description="State key containing the component tree to render.")

    def __init__(self, name: str, **kwargs: Any) -> None:
        kwargs["name"] = name
        super().__init__(**kwargs)
