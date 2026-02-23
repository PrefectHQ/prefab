"""Combobox — searchable select dropdown.

A filterable dropdown for selecting from large option lists. Options are
defined as ``ComboboxOption`` children, similar to ``Select``/``SelectOption``.

Example::

    from prefab_ui.components import Combobox, ComboboxOption

    with Combobox(placeholder="Select a framework...", name="framework"):
        ComboboxOption("Next.js", value="nextjs")
        ComboboxOption("Remix", value="remix")
        ComboboxOption("Astro", value="astro")
        ComboboxOption("SvelteKit", value="sveltekit")

    # Access reactive value
    combo = Combobox(placeholder="Choose framework...")
    Text(f"Selected: {combo.rx}")
"""

from __future__ import annotations

from typing import Any, ClassVar, Literal, overload

from pydantic import Field

from prefab_ui.actions import Action
from prefab_ui.components.base import Component, ContainerComponent, StatefulMixin


class ComboboxOption(Component):
    """A single option within a Combobox.

    Example::

        ComboboxOption("Next.js", value="nextjs")
    """

    type: Literal["ComboboxOption"] = "ComboboxOption"
    value: str = Field(description="Option value")
    label: str = Field(description="Display label")
    disabled: bool = Field(default=False, description="Whether option is disabled")

    @overload
    def __init__(self, label: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, label: str, **kwargs: Any) -> None: ...

    def __init__(self, label: str | None = None, **kwargs: Any) -> None:
        if label is not None and "label" not in kwargs:
            kwargs["label"] = label
        if "value" not in kwargs and label is not None:
            kwargs["value"] = label.lower().replace(" ", "-")
        super().__init__(**kwargs)


class Combobox(StatefulMixin, ContainerComponent):
    """Searchable select dropdown.

    Children must be ``ComboboxOption`` components.

    Args:
        placeholder: Placeholder text when no value selected
        search_placeholder: Placeholder text in the search input
        name: State key for the selected value
        disabled: Whether the combobox is disabled

    Example::

        with Combobox(placeholder="Pick a language...", name="lang"):
            ComboboxOption("Python", value="python")
            ComboboxOption("TypeScript", value="typescript")
            ComboboxOption("Rust", value="rust")
    """

    _auto_name: ClassVar[str] = "combobox"
    type: Literal["Combobox"] = "Combobox"
    placeholder: str | None = Field(
        default=None,
        description="Placeholder text shown when no value is selected",
    )
    search_placeholder: str | None = Field(
        default=None,
        alias="searchPlaceholder",
        description="Placeholder text in the search input",
    )
    name: str | None = Field(
        default=None,
        description="State key for reactive binding. Auto-generated if omitted.",
    )
    disabled: bool = Field(default=False, description="Whether combobox is disabled")
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) when the selected value changes",
    )
