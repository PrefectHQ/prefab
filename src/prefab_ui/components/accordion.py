"""Accordion component for collapsible content sections.

Example::

    from prefab_ui.components import Accordion, AccordionItem, Text

    with Accordion():
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

        with Accordion(accordion_type="multiple"):
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
    default_value: str | list[str] | None = Field(
        default=None,
        alias="defaultValue",
        description="Initially expanded item(s)",
    )
