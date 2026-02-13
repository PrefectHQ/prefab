"""Tests for Define, Use, and let bindings."""

from __future__ import annotations

from typing import Any

from prefab_ui.components import (
    Badge,
    Card,
    Column,
    Heading,
    If,
    Text,
)
from prefab_ui.define import Define
from prefab_ui.response import PROTOCOL_VERSION, UIResponse
from prefab_ui.use import Use

# ---------------------------------------------------------------------------
# let on ContainerComponent
# ---------------------------------------------------------------------------


class TestLet:
    def test_let_in_to_json(self) -> None:
        col = Column(let={"name": "Alice", "role": "Engineer"})
        result = col.to_json()
        assert result["let"] == {"name": "Alice", "role": "Engineer"}
        assert result["type"] == "Column"

    def test_let_none_omitted(self) -> None:
        col = Column()
        result = col.to_json()
        assert "let" not in result

    def test_let_with_children(self) -> None:
        with Column(let={"name": "Alice"}) as col:
            Text("{{ name }}")
        result = col.to_json()
        assert result["let"] == {"name": "Alice"}
        assert len(result["children"]) == 1

    def test_let_with_css_class(self) -> None:
        result = Column(let={"x": 1}, css_class="mt-4").to_json()
        assert result["let"] == {"x": 1}
        assert result["cssClass"] == "mt-4"

    def test_let_empty_dict_in_to_json(self) -> None:
        col = Column(let={})
        result = col.to_json()
        # Empty dict is truthy, so it should appear
        assert result["let"] == {}


# ---------------------------------------------------------------------------
# Condition when wrapping
# ---------------------------------------------------------------------------


class TestConditionWhen:
    def test_when_wrapped_in_braces(self) -> None:
        with Column() as col:
            with If("{{ count > 0 }}"):
                Text("positive")
        result = col.to_json()
        condition = result["children"][0]
        assert condition["type"] == "Condition"
        assert condition["cases"][0]["when"] == "{{ count > 0 }}"

    def test_bare_expression_wrapped(self) -> None:
        """The SDK wraps bare expressions in {{ }} for protocol consistency."""
        with Column() as col:
            with If("count > 0"):
                Text("positive")
        result = col.to_json()
        condition = result["children"][0]
        assert condition["cases"][0]["when"] == "{{ count > 0 }}"


# ---------------------------------------------------------------------------
# Define
# ---------------------------------------------------------------------------


class TestDefine:
    def test_captures_children(self) -> None:
        with Define("card") as d:
            Text("hello")
        assert len(d.children) == 1
        assert d.name == "card"

    def test_does_not_auto_append(self) -> None:
        with Column() as col:
            with Define("card"):
                Text("hello")
        # Define should NOT appear in Column's children
        assert len(col.children) == 0

    def test_to_json_single_child(self) -> None:
        with Define("card") as d:
            Text("hello")
        result = d.to_json()
        # Returns the child directly, not wrapped
        assert result == {"type": "Text", "content": "hello"}

    def test_to_json_multiple_children(self) -> None:
        with Define("card") as d:
            Text("hello")
            Text("world")
        result = d.to_json()
        # Wrapped in implicit Column
        assert result["type"] == "Column"
        assert len(result["children"]) == 2

    def test_nested_containers(self) -> None:
        with Define("user-card") as d:
            with Card():
                Heading("{{ name }}")
                Badge("{{ role }}")
        result = d.to_json()
        assert result["type"] == "Card"
        assert len(result["children"]) == 2


# ---------------------------------------------------------------------------
# Use
# ---------------------------------------------------------------------------


class TestUse:
    def test_bare_ref(self) -> None:
        result = Use("user-card").to_json()
        assert result == {"$ref": "user-card"}

    def test_with_overrides(self) -> None:
        result = Use("user-card", name="Alice", role="Engineer").to_json()
        assert result == {
            "$ref": "user-card",
            "let": {"name": "Alice", "role": "Engineer"},
        }

    def test_css_class_on_ref(self) -> None:
        result = Use("card", css_class="mt-4").to_json()
        assert result == {"$ref": "card", "cssClass": "mt-4"}

    def test_unknown_kwargs_become_let(self) -> None:
        result = Use("card", visible_when="show").to_json()
        assert result == {"$ref": "card", "let": {"visible_when": "show"}}

    def test_overrides_with_base_fields(self) -> None:
        result = Use("card", name="Alice", css_class="mt-4").to_json()
        assert result == {
            "$ref": "card",
            "let": {"name": "Alice"},
            "cssClass": "mt-4",
        }

    def test_auto_appends_to_parent(self) -> None:
        with Column() as col:
            Use("card")
        assert len(col.children) == 1
        assert isinstance(col.children[0], Use)


# ---------------------------------------------------------------------------
# UIResponse integration
# ---------------------------------------------------------------------------


class TestUIResponseDefs:
    def test_defs_in_envelope(self) -> None:
        with Define("card") as d:
            Text("hello")
        result = UIResponse(defs=[d]).to_json()
        assert "defs" in result
        assert result["defs"] == {"card": {"type": "Text", "content": "hello"}}

    def test_no_defs_omits_key(self) -> None:
        result = UIResponse().to_json()
        assert "defs" not in result

    def test_empty_defs_omits_key(self) -> None:
        result = UIResponse(defs=[]).to_json()
        assert "defs" not in result

    def test_multiple_defs(self) -> None:
        with Define("a") as da:
            Text("A")
        with Define("b") as db:
            Text("B")
        result = UIResponse(defs=[da, db]).to_json()
        assert set(result["defs"]) == {"a", "b"}


# ---------------------------------------------------------------------------
# End-to-end wire format
# ---------------------------------------------------------------------------


def test_full_wire_format() -> None:
    """Verify the exact wire format with let bindings."""
    with Define("user-card") as user_card:
        with Card():
            Heading("{{ name }}")
            Badge("{{ role }}")

    with Column() as layout:
        Use("user-card", name="Alice", role="Engineer")
        Use("user-card", name="Bob", role="Designer")

    result = UIResponse(view=layout, defs=[user_card]).to_json()

    expected: dict[str, Any] = {
        "version": PROTOCOL_VERSION,
        "defs": {
            "user-card": {
                "type": "Card",
                "children": [
                    {"type": "Heading", "content": "{{ name }}", "level": 1},
                    {"type": "Badge", "label": "{{ role }}", "variant": "default"},
                ],
            },
        },
        "view": {
            "type": "Column",
            "children": [
                {
                    "$ref": "user-card",
                    "let": {"name": "Alice", "role": "Engineer"},
                },
                {
                    "$ref": "user-card",
                    "let": {"name": "Bob", "role": "Designer"},
                },
            ],
        },
    }
    assert result == expected
