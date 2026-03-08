"""Tests for Select component."""

from __future__ import annotations

import pytest

from prefab_ui.components import Select, SelectGroup, SelectLabel, SelectOption


def test_select_with_options():
    with Select(placeholder="Pick one", name="choice") as sel:
        SelectOption(value="a", label="Alpha")
        SelectOption(value="b", label="Beta")
    j = sel.to_json()
    assert j["type"] == "Select"
    assert j["placeholder"] == "Pick one"
    assert len(j["children"]) == 2
    assert j["children"][0]["value"] == "a"
    assert j["children"][1]["label"] == "Beta"


@pytest.mark.parametrize(
    "side",
    ["top", "right", "bottom", "left"],
)
def test_select_side(side: str):
    sel = Select(placeholder="Pick", side=side)
    j = sel.to_json()
    assert j["side"] == side


@pytest.mark.parametrize(
    "align",
    ["start", "center", "end"],
)
def test_select_align(align: str):
    sel = Select(placeholder="Pick", align=align)
    j = sel.to_json()
    assert j["align"] == align


def test_select_side_and_align_default_none():
    sel = Select(placeholder="Pick")
    j = sel.to_json()
    assert "side" not in j or j["side"] is None
    assert "align" not in j or j["align"] is None


def test_select_group_with_label():
    with Select(placeholder="Pick a food...") as sel:
        with SelectGroup():
            SelectLabel("Fruits")
            SelectOption(value="apple", label="Apple")
            SelectOption(value="banana", label="Banana")
        with SelectGroup():
            SelectLabel("Vegetables")
            SelectOption(value="carrot", label="Carrot")
    j = sel.to_json()
    assert j["type"] == "Select"
    assert len(j["children"]) == 2

    group1 = j["children"][0]
    assert group1["type"] == "SelectGroup"
    assert len(group1["children"]) == 3
    assert group1["children"][0]["type"] == "SelectLabel"
    assert group1["children"][0]["label"] == "Fruits"
    assert group1["children"][1]["type"] == "SelectOption"
    assert group1["children"][1]["value"] == "apple"
    assert group1["children"][2]["value"] == "banana"

    group2 = j["children"][1]
    assert group2["type"] == "SelectGroup"
    assert group2["children"][0]["label"] == "Vegetables"
    assert group2["children"][1]["value"] == "carrot"


def test_select_label_positional():
    lbl = SelectLabel("My Label")
    j = lbl.to_json()
    assert j["type"] == "SelectLabel"
    assert j["label"] == "My Label"


def test_select_label_keyword():
    lbl = SelectLabel(label="My Label")
    j = lbl.to_json()
    assert j["label"] == "My Label"


def test_select_group_serialization():
    grp = SelectGroup()
    j = grp.to_json()
    assert j["type"] == "SelectGroup"
