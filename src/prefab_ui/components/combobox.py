"""Combobox — searchable select dropdown.

A filterable dropdown for selecting from large option lists. Options are
defined as ``ComboboxOption`` children, similar to ``Select``/``SelectOption``.

Supports grouping options with ``ComboboxGroup`` and ``ComboboxLabel``,
and visual dividers with ``ComboboxSeparator``.

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
from prefab_ui.rx import RxStr


class ComboboxOption(Component):
    """A single option within a Combobox.

    Example::

        ComboboxOption("Next.js", value="nextjs")
    """

    type: Literal["ComboboxOption"] = "ComboboxOption"
    value: RxStr = Field(description="Option value")
    label: RxStr = Field(description="Display label")
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


class ComboboxGroup(ContainerComponent):
    """A group container for related combobox options.

    Children should be ``ComboboxLabel`` and ``ComboboxOption`` components.

    Example::

        with ComboboxGroup():
            ComboboxLabel("Planets")
            ComboboxOption("Earth", value="earth")
            ComboboxOption("Mars", value="mars")
    """

    type: Literal["ComboboxGroup"] = "ComboboxGroup"


class ComboboxLabel(Component):
    """A label/header for a ``ComboboxGroup``.

    Example::

        ComboboxLabel("Planets")
    """

    type: Literal["ComboboxLabel"] = "ComboboxLabel"
    label: RxStr = Field(description="Label text")

    @overload
    def __init__(self, label: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, label: str, **kwargs: Any) -> None: ...

    def __init__(self, label: str | None = None, **kwargs: Any) -> None:
        if label is not None and "label" not in kwargs:
            kwargs["label"] = label
        super().__init__(**kwargs)


class ComboboxSeparator(Component):
    """A visual divider between combobox options or groups.

    Example::

        ComboboxOption("Earth", value="earth")
        ComboboxSeparator()
        ComboboxOption("Mars", value="mars")
    """

    type: Literal["ComboboxSeparator"] = "ComboboxSeparator"


class Combobox(StatefulMixin, ContainerComponent):
    """Searchable select dropdown.

    Children must be ``ComboboxOption``, ``ComboboxGroup``,
    ``ComboboxLabel``, or ``ComboboxSeparator`` components.

    Args:
        placeholder: Placeholder text when no value selected
        search_placeholder: Placeholder text in the search input
        name: State key for the selected value
        disabled: Whether the combobox is disabled
        side: Which side to show the dropdown
        align: Alignment of the dropdown relative to the trigger
        invalid: Whether the combobox is in an error state

    Example::

        with Combobox(placeholder="Pick a language...", name="lang"):
            ComboboxOption("Python", value="python")
            ComboboxOption("TypeScript", value="typescript")
            ComboboxOption("Rust", value="rust")
    """

    _auto_name: ClassVar[str] = "combobox"
    type: Literal["Combobox"] = "Combobox"
    placeholder: RxStr | None = Field(
        default=None,
        description="Placeholder text shown when no value is selected",
    )
    search_placeholder: RxStr | None = Field(
        default=None,
        alias="searchPlaceholder",
        description="Placeholder text in the search input",
    )
    name: str | None = Field(
        default=None,
        description="State key for reactive binding. Auto-generated if omitted.",
    )
    disabled: bool = Field(default=False, description="Whether combobox is disabled")
    side: Literal["top", "right", "bottom", "left"] | None = Field(
        default=None, description="Which side to show the dropdown"
    )
    align: Literal["start", "center", "end"] | None = Field(
        default=None, description="Alignment of the dropdown relative to the trigger"
    )
    invalid: bool = Field(
        default=False, description="Whether the combobox is in an error state"
    )
    on_change: Action | list[Action] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) when the selected value changes",
    )
