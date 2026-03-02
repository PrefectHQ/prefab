"""Tests for ForEach component."""

from __future__ import annotations

from prefab_ui.actions import AppendState, PopState
from prefab_ui.components import INDEX, ITEM, Button, Column, Text
from prefab_ui.components.control_flow import ForEach, If
from prefab_ui.rx import LoopItem, Rx


class TestForEachSerialization:
    def test_positional_key(self):
        fe = ForEach("items")
        assert fe.key == "items"

    def test_serializes_with_children(self):
        fe = ForEach("users")
        with fe as user:
            Text(content=user.name)
        j = fe.to_json()
        assert j["type"] == "ForEach"
        assert j["key"] == "users"
        assert len(j["children"]) == 1
        # Content uses the auto-generated let-binding name
        assert j["children"][0]["content"] == "{{ _loop_1.name }}"
        # Auto-let bindings are present
        assert j["let"]["_loop_1"] == "{{ $item }}"
        assert j["let"]["_loop_1_idx"] == "{{ $index }}"

    def test_rx_as_key(self):
        r = Rx("files")
        fe = ForEach(r)
        assert fe.key == "files"

    def test_rx_as_keyword_key(self):
        r = Rx("uploads")
        fe = ForEach(key=r)
        assert fe.key == "uploads"

    def test_rx_serializes_to_plain_key(self):
        r = Rx("items")
        fe = ForEach(r)
        with fe as item:
            Text(content=item.name)
        j = fe.to_json()
        assert j["key"] == "items"

    def test_nested_children(self):
        fe = ForEach("users")
        with fe as user:
            with Column():
                Text(content=user.name)
                Text(content=user.email)
        j = fe.to_json()
        child = j["children"][0]
        assert child["type"] == "Column"
        assert len(child["children"]) == 2


class TestForEachEnter:
    def test_enter_returns_loop_item(self):
        with ForEach("users") as user:
            pass
        assert isinstance(user, LoopItem)
        assert isinstance(user, Rx)

    def test_enter_key_is_auto_bound(self):
        with ForEach("users") as user:
            pass
        assert user.key == "_loop_1"

    def test_enter_dot_path(self):
        with ForEach("users") as user:
            Text(content=user.name)
        assert str(user.name) == "{{ _loop_1.name }}"

    def test_enter_get_index(self):
        with ForEach("users") as user:
            pass
        idx = user.get_index()
        assert isinstance(idx, Rx)
        assert idx.key == "_loop_1_idx"

    def test_enter_destructure(self):
        with ForEach("users") as (i, user):
            pass
        assert isinstance(i, Rx)
        assert isinstance(user, Rx)
        assert i.key == "_loop_1_idx"
        assert user.key == "_loop_1"

    def test_destructured_item_is_plain_rx(self):
        with ForEach("users") as (_, user):
            pass
        assert type(user) is Rx
        assert not isinstance(user, LoopItem)

    def test_auto_let_in_json(self):
        fe = ForEach("items")
        with fe:
            pass
        j = fe.to_json()
        assert j["let"] == {
            "_loop_1": "{{ $item }}",
            "_loop_1_idx": "{{ $index }}",
        }

    def test_user_let_merges_with_auto(self):
        fe = ForEach("groups", let=dict(custom=ITEM.name))
        with fe:
            pass
        j = fe.to_json()
        assert "_loop_1" in j["let"]
        assert "_loop_1_idx" in j["let"]
        assert j["let"]["custom"] == "{{ $item.name }}"


class TestNestedForEach:
    """Nested loops: outer bindings survive inner-loop shadowing."""

    def test_outer_item_survives_nesting(self):
        outer_fe = ForEach("groups")
        with outer_fe as (gi, group):
            inner_fe = ForEach(f"groups.{gi}.todos")
            with inner_fe as (_, todo):
                Text(content=todo.name)
                Text(content=group.name)

        # Outer and inner have distinct let-binding names
        assert group.key == "_loop_1"
        assert todo.key == "_loop_2"
        assert gi.key == "_loop_1_idx"

        # Both ForEach nodes have their own let dicts
        outer_j = outer_fe.to_json()
        inner_j = inner_fe.to_json()
        assert "_loop_1" in outer_j["let"]
        assert "_loop_2" in inner_j["let"]

        # Inner key uses outer index binding
        assert inner_j["key"] == "groups.{{ _loop_1_idx }}.todos"

    def test_nested_children_reference_correct_scope(self):
        outer_fe = ForEach("groups")
        with outer_fe as (_, group):
            inner_fe = ForEach("items")
            with inner_fe as item:
                t_inner = Text(f"{item.name}")
                t_outer = Text(f"{group.name}")

        assert t_inner.content == "{{ _loop_2.name }}"
        assert t_outer.content == "{{ _loop_1.name }}"


class TestRxPatterns:
    """Test Rx constants (ITEM, INDEX) in ForEach-related contexts."""

    def test_rx_in_let_dict_serializes(self):
        fe = ForEach("groups", let=dict(gi=INDEX, show_done=ITEM.show_done))
        with fe:
            pass
        j = fe.to_json()
        # User let entries merge with auto-let
        assert j["let"]["gi"] == "{{ $index }}"
        assert j["let"]["show_done"] == "{{ $item.show_done }}"

    def test_fstring_key_with_rx(self):
        gi = Rx("gi")
        fe = ForEach(f"groups.{gi}.todos")
        assert fe.key == "groups.{{ gi }}.todos"

    def test_fstring_key_with_index(self):
        fe = ForEach(f"groups.{INDEX}.todos")
        assert fe.key == "groups.{{ $index }}.todos"

    def test_item_dot_path_in_text(self):
        with ForEach("files") as item:
            t = Text(f"{item.name}")
        assert t.content == "{{ _loop_1.name }}"

    def test_item_fstring_with_pipes(self):
        with ForEach("files") as item:
            t = Text(f"{item.type} · {item.size} bytes")
        assert t.content == "{{ _loop_1.type }} · {{ _loop_1.size }} bytes"

    def test_popstate_with_index_rx(self):
        action = PopState("files", INDEX)
        j = action.model_dump(by_alias=True, exclude_none=True)
        assert j["index"] == "{{ $index }}"

    def test_popstate_with_loop_index(self):
        with ForEach("files") as item:
            action = PopState("files", item.get_index())
        j = action.model_dump(by_alias=True, exclude_none=True)
        assert j["index"] == "{{ _loop_1_idx }}"

    def test_popstate_with_let_rx(self):
        gi = Rx("gi")
        action = PopState(f"groups.{gi}.todos", INDEX)
        j = action.model_dump(by_alias=True, exclude_none=True)
        assert j["key"] == "groups.{{ gi }}.todos"
        assert j["index"] == "{{ $index }}"

    def test_appendstate_with_rx_index(self):
        action = AppendState("items", "value", index=INDEX)
        j = action.model_dump(by_alias=True, exclude_none=True)
        assert j["index"] == "{{ $index }}"

    def test_item_pipe_in_condition(self):
        with ForEach("groups") as group:
            cond = If(group.todos.length())
        assert cond.condition == "{{ _loop_1.todos | length }}"

    def test_negation_in_disabled(self):
        with ForEach("groups") as group:
            btn = Button("Add", disabled=~group.new_todo)
        j = btn.to_json()
        assert j["disabled"] == "{{ !_loop_1.new_todo }}"

    def test_get_index_in_fstring(self):
        with ForEach("items") as item:
            t = Text(f"{item.get_index() + 1}. {item.name}")
        assert t.content == "{{ _loop_1_idx + 1 }}. {{ _loop_1.name }}"
