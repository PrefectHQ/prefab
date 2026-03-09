"""Tests for Combobox component."""

from __future__ import annotations

from prefab_ui.components import (
    Combobox,
    ComboboxGroup,
    ComboboxLabel,
    ComboboxOption,
    ComboboxSeparator,
)


def test_combobox_with_options():
    with Combobox(placeholder="Pick one", name="choice") as cb:
        ComboboxOption(value="a", label="Alpha")
        ComboboxOption(value="b", label="Beta")
    j = cb.to_json()
    assert j["type"] == "Combobox"
    assert j["placeholder"] == "Pick one"
    assert len(j["children"]) == 2
    assert j["children"][0]["value"] == "a"
    assert j["children"][1]["label"] == "Beta"


def test_combobox_option_positional_label():
    opt = ComboboxOption("My Option")
    j = opt.to_json()
    assert j["label"] == "My Option"
    assert j["value"] == "my-option"


def test_combobox_side_align_props():
    cb = Combobox(side="top", align="end")
    j = cb.to_json()
    assert j["side"] == "top"
    assert j["align"] == "end"


def test_combobox_invalid_prop():
    cb = Combobox(invalid=True)
    j = cb.to_json()
    assert j["invalid"] is True


def test_combobox_invalid_default_false():
    cb = Combobox()
    j = cb.to_json()
    assert j["invalid"] is False


def test_combobox_group_serialization():
    with Combobox(placeholder="Grouped") as cb:
        with ComboboxGroup():
            ComboboxLabel("Group A")
            ComboboxOption("Item 1", value="i1")
            ComboboxOption("Item 2", value="i2")
    j = cb.to_json()
    assert len(j["children"]) == 1
    group = j["children"][0]
    assert group["type"] == "ComboboxGroup"
    assert len(group["children"]) == 3
    assert group["children"][0]["type"] == "ComboboxLabel"
    assert group["children"][0]["label"] == "Group A"
    assert group["children"][1]["type"] == "ComboboxOption"
    assert group["children"][2]["type"] == "ComboboxOption"


def test_combobox_label_positional():
    lbl = ComboboxLabel("Planets")
    j = lbl.to_json()
    assert j["type"] == "ComboboxLabel"
    assert j["label"] == "Planets"


def test_combobox_separator_serialization():
    with Combobox(placeholder="With separator") as cb:
        ComboboxOption("A", value="a")
        ComboboxSeparator()
        ComboboxOption("B", value="b")
    j = cb.to_json()
    assert len(j["children"]) == 3
    assert j["children"][1]["type"] == "ComboboxSeparator"


def test_combobox_multiple_groups():
    with Combobox(placeholder="Multi") as cb:
        with ComboboxGroup():
            ComboboxLabel("Fruits")
            ComboboxOption("Apple", value="apple")
        with ComboboxGroup():
            ComboboxLabel("Vegs")
            ComboboxOption("Carrot", value="carrot")
    j = cb.to_json()
    assert len(j["children"]) == 2
    assert j["children"][0]["type"] == "ComboboxGroup"
    assert j["children"][1]["type"] == "ComboboxGroup"


def test_combobox_side_align_defaults_absent():
    """Side and align should not be in JSON when using defaults (None)."""
    cb = Combobox()
    j = cb.to_json()
    assert j.get("side") is None
    assert j.get("align") is None
