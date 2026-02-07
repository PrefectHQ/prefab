"""Accordion component for collapsible content sections.

Example::

    from prefab_ui.components import Accordion, AccordionItem, Text

    with Accordion(open_item=0):
        with AccordionItem("Getting Started"):
            Text("Install with pip install fastmcp")
        with AccordionItem("Configuration"):
            Text("Edit config.toml to customize settings.")
"""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import ContainerComponent


class AccordionItem(ContainerComponent):
    """A single collapsible section within an Accordion.

    The ``title`` appears in the trigger; children are revealed on expand.

    Example::

        with AccordionItem("Details"):
            Text("Hidden content revealed on click.")
    """

    type: Literal["AccordionItem"] = "AccordionItem"
    title: str = Field(description="Accordion trigger label")
    value: str | None = Field(
        default=None,
        description="Unique value (defaults to title)",
    )

    @overload
    def __init__(self, title: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, title: str, **kwargs: Any) -> None: ...

    def __init__(self, title: str | None = None, **kwargs: Any) -> None:
        if title is not None and "title" not in kwargs:
            kwargs["title"] = title
        super().__init__(**kwargs)


class Accordion(ContainerComponent):
    """Accordion container — children must be ``AccordionItem`` components.

    Example::

        with Accordion(open_item=0):
            with AccordionItem("Section 1"):
                Text("Content 1")
            with AccordionItem("Section 2"):
                Text("Content 2")
    """

    type: Literal["Accordion"] = "Accordion"
    accordion_type: Literal["single", "multiple"] = Field(
        default="single",
        alias="accordionType",
        description="Whether one or multiple items can be open simultaneously",
    )
    collapsible: bool = Field(
        default=True,
        description="Whether items can be fully collapsed (single mode)",
    )
    open_item: int | str | list[int | str] | None = Field(
        default=None,
        exclude=True,
        description=(
            "Initially expanded item(s). Pass an int for index-based "
            "selection, or a str to match by value/title."
        ),
    )
    default_value: str | list[str] | None = Field(
        default=None,
        alias="defaultValue",
        description="Initially expanded item(s) by value. Prefer open_item.",
    )

    def _resolve_item(self, item: int | str) -> str:
        if isinstance(item, int):
            child = self.children[item]
            if not isinstance(child, AccordionItem):
                raise TypeError(
                    f"Child at index {item} is {type(child).__name__}, "
                    f"not AccordionItem"
                )
            return child.value or child.title
        return item

    def to_json(self) -> dict[str, Any]:
        if self.open_item is not None and self.default_value is None:
            if isinstance(self.open_item, list):
                self.default_value = [self._resolve_item(i) for i in self.open_item]
            else:
                self.default_value = self._resolve_item(self.open_item)
        return super().to_json()
