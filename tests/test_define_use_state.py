"""Tests for Define, Use, and State primitives."""

from __future__ import annotations

from typing import Any

from prefab_ui.components import (
    Badge,
    Card,
    Column,
    Heading,
    State,
    Text,
)
from prefab_ui.define import Define
from prefab_ui.response import PROTOCOL_VERSION, UIResponse
from prefab_ui.use import Use

# ---------------------------------------------------------------------------
# State
# ---------------------------------------------------------------------------


class TestState:
    def test_kwargs_collected_into_state(self) -> None:
        s = State(name="Alice", role="Engineer")
        assert s.state == {"name": "Alice", "role": "Engineer"}

    def test_positional_dict(self) -> None:
        s = State({"x": 1, "y": 2})
        assert s.state == {"x": 1, "y": 2}

    def test_positional_dict_merged_with_kwargs(self) -> None:
        s = State({"x": 1}, y=2)
        assert s.state == {"x": 1, "y": 2}

    def test_kwargs_override_positional(self) -> None:
        s = State({"x": 1}, x=99)
        assert s.state == {"x": 99}

    def test_base_fields_not_in_state(self) -> None:
        s = State(name="Alice", css_class="hidden")
        assert s.state == {"name": "Alice"}
        assert s.css_class == "hidden"

    def test_unknown_kwargs_go_to_state(self) -> None:
        s = State(name="Alice", visible_when="show")
        # visible_when is no longer a base field, so it lands in state
        assert s.state == {"name": "Alice", "visible_when": "show"}

    def test_to_json_basic(self) -> None:
        s = State(name="Alice")
        result = s.to_json()
        assert result == {"type": "State", "state": {"name": "Alice"}}

    def test_to_json_with_children(self) -> None:
        with State(name="Alice") as s:
            Text("{{ name }}")
        result = s.to_json()
        assert result["type"] == "State"
        assert result["state"] == {"name": "Alice"}
        assert len(result["children"]) == 1
        assert result["children"][0]["type"] == "Text"

    def test_to_json_with_css_class(self) -> None:
        result = State(name="Alice", css_class="mt-4").to_json()
        assert result["cssClass"] == "mt-4"
        assert result["state"] == {"name": "Alice"}

    def test_auto_appends_to_parent(self) -> None:
        with Column() as col:
            State(name="Alice")
        assert len(col.children) == 1
        assert isinstance(col.children[0], State)

    def test_empty_state(self) -> None:
        s = State()
        assert s.state == {}
        assert s.to_json() == {"type": "State", "state": {}}


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
        assert result["type"] == "State"
        assert result["state"] == {"name": "Alice", "role": "Engineer"}
        assert result["children"] == [{"$ref": "user-card"}]

    def test_css_class_on_wrapper(self) -> None:
        result = Use("card", css_class="mt-4").to_json()
        assert result["type"] == "State"
        assert result["state"] == {}
        assert result["cssClass"] == "mt-4"
        assert result["children"] == [{"$ref": "card"}]

    def test_unknown_kwargs_become_overrides(self) -> None:
        # visible_when is no longer a base field, so it becomes a state override
        result = Use("card", visible_when="show").to_json()
        assert result["type"] == "State"
        assert result["state"] == {"visible_when": "show"}

    def test_overrides_with_base_fields(self) -> None:
        result = Use("card", name="Alice", css_class="mt-4").to_json()
        assert result["type"] == "State"
        assert result["state"] == {"name": "Alice"}
        assert result["cssClass"] == "mt-4"
        assert result["children"] == [{"$ref": "card"}]

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
    """Verify the exact wire format from the issue spec."""
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
                    "type": "State",
                    "state": {"name": "Alice", "role": "Engineer"},
                    "children": [{"$ref": "user-card"}],
                },
                {
                    "type": "State",
                    "state": {"name": "Bob", "role": "Designer"},
                    "children": [{"$ref": "user-card"}],
                },
            ],
        },
    }
    assert result == expected
