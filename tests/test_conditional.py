"""Tests for If/Elif/Else → Condition wire-format serialization."""

from __future__ import annotations

import pytest

from prefab_ui.components import Badge, Column, Text
from prefab_ui.components.control_flow import Elif, Else, If


class TestConditionalSerialization:
    """If/Elif/Else siblings are grouped into Condition nodes on the wire."""

    def test_if_alone(self):
        with Column() as col:
            with If("count > 0"):
                Text("has items")
        j = col.to_json()
        cond = j["children"][0]
        assert cond["type"] == "Condition"
        assert len(cond["cases"]) == 1
        assert cond["cases"][0]["when"] == "{{ count > 0 }}"
        assert cond["cases"][0]["children"][0]["content"] == "has items"
        assert "else" not in cond

    def test_if_else(self):
        with Column() as col:
            with If("active"):
                Badge("On")
            with Else():
                Badge("Off")
        j = col.to_json()
        cond = j["children"][0]
        assert cond["type"] == "Condition"
        assert len(cond["cases"]) == 1
        assert cond["cases"][0]["when"] == "{{ active }}"
        assert cond["else"][0]["label"] == "Off"

    def test_if_elif_else(self):
        with Column() as col:
            with If("inventory == 0"):
                Text("Out of stock")
            with Elif("inventory < 10"):
                Text("Low stock")
            with Else():
                Badge("In stock")
        j = col.to_json()
        cond = j["children"][0]
        assert cond["type"] == "Condition"
        assert len(cond["cases"]) == 2
        assert cond["cases"][0]["when"] == "{{ inventory == 0 }}"
        assert cond["cases"][1]["when"] == "{{ inventory < 10 }}"
        assert cond["else"][0]["label"] == "In stock"

    def test_if_elif_elif_else(self):
        with Column() as col:
            with If("x == 1"):
                Text("one")
            with Elif("x == 2"):
                Text("two")
            with Elif("x == 3"):
                Text("three")
            with Else():
                Text("other")
        j = col.to_json()
        cond = j["children"][0]
        assert len(cond["cases"]) == 3
        assert cond["cases"][2]["when"] == "{{ x == 3 }}"
        assert cond["else"][0]["content"] == "other"

    def test_multiple_independent_chains(self):
        """If/Else then Text then If → two Conditions + Text."""
        with Column() as col:
            with If("a"):
                Text("a")
            with Else():
                Text("not a")
            Text("separator")
            with If("b"):
                Text("b")
        j = col.to_json()
        assert len(j["children"]) == 3
        assert j["children"][0]["type"] == "Condition"
        assert j["children"][1]["type"] == "Text"
        assert j["children"][2]["type"] == "Condition"

    def test_consecutive_ifs_are_separate(self):
        """If / If → two separate Conditions (each with one case)."""
        with Column() as col:
            with If("a"):
                Text("a")
            with If("b"):
                Text("b")
        j = col.to_json()
        assert len(j["children"]) == 2
        assert j["children"][0]["type"] == "Condition"
        assert j["children"][0]["cases"][0]["when"] == "{{ a }}"
        assert j["children"][1]["type"] == "Condition"
        assert j["children"][1]["cases"][0]["when"] == "{{ b }}"


class TestConditionalErrors:
    """Orphaned Elif/Else without preceding If raise ValueError."""

    def test_orphaned_elif_raises(self):
        with Column() as col:
            Text("hi")
            with Elif("x"):
                Text("oops")
        with pytest.raises(ValueError, match="Elif without preceding If"):
            col.to_json()

    def test_orphaned_else_raises(self):
        with Column() as col:
            with Else():
                Text("oops")
        with pytest.raises(ValueError, match="Else without preceding If"):
            col.to_json()

    def test_elif_after_chain_broken_raises(self):
        """If / Text / Elif → ValueError because Text breaks the chain."""
        with Column() as col:
            with If("a"):
                Text("a")
            Text("break")
            with Elif("b"):
                Text("b")
        with pytest.raises(ValueError, match="Elif without preceding If"):
            col.to_json()


class TestConditionalEdgeCases:
    """Edge cases for conditional serialization."""

    def test_if_empty_children(self):
        """If with no children produces a case with no children key."""
        with Column() as col:
            If("empty")
        j = col.to_json()
        cond = j["children"][0]
        assert cond["cases"][0]["when"] == "{{ empty }}"
        assert "children" not in cond["cases"][0]

    def test_if_multiple_children(self):
        with Column() as col:
            with If("show"):
                Text("a")
                Text("b")
                Badge("c")
        j = col.to_json()
        case_children = j["children"][0]["cases"][0]["children"]
        assert len(case_children) == 3

    def test_nested_if_inside_if(self):
        """Inner If inside an outer If branch → inner becomes its own Condition."""
        with Column() as col:
            with If("outer"):
                with If("inner"):
                    Text("deep")
        j = col.to_json()
        outer = j["children"][0]
        assert outer["type"] == "Condition"
        inner = outer["cases"][0]["children"][0]
        assert inner["type"] == "Condition"
        assert inner["cases"][0]["when"] == "{{ inner }}"

    def test_positional_condition_arg(self):
        """If/Elif accept condition as positional arg."""
        node = If("x > 0")
        assert node.condition == "x > 0"
        node2 = Elif("x < 0")
        assert node2.condition == "x < 0"

    def test_keyword_condition_arg(self):
        node = If(condition="x > 0")
        assert node.condition == "x > 0"

    def test_if_with_css_class(self):
        """css_class on If doesn't leak into the Condition wire format."""
        with Column() as col:
            with If("show", css_class="mt-4"):
                Text("styled")
        j = col.to_json()
        cond = j["children"][0]
        assert cond["type"] == "Condition"


class TestVisibleWhenRemoved:
    """visible_when was removed in favor of If/Elif/Else."""

    def test_visible_when_not_in_schema(self):
        assert "visible_when" not in Text.model_fields
        assert "visibleWhen" not in Text.model_fields

    def test_visible_when_not_serialized(self):
        t = Text(content="x")
        j = t.to_json()
        assert "visibleWhen" not in j
