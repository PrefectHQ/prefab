"""Tests for ForEach component."""

from __future__ import annotations

from prefab_ui.actions import AppendState, PopState
from prefab_ui.components import INDEX, ITEM, Column, Text
from prefab_ui.components.control_flow import ForEach
from prefab_ui.rx import Rx


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
        assert j["children"][0]["content"] == "{{ $item.name }}"

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
    def test_enter_returns_rx_item(self):
        with ForEach("users") as user:
            pass
        assert isinstance(user, Rx)
        assert user.key == "$item"

    def test_enter_returns_item_sentinel(self):
        with ForEach("users") as user:
            pass
        assert user is ITEM

    def test_enter_dot_path(self):
        with ForEach("users") as user:
            Text(content=user.name)
        assert str(user.name) == "{{ $item.name }}"


class TestRxPatterns:
    """Test Rx constants (ITEM, INDEX) in ForEach-related contexts."""

    def test_rx_in_let_dict_serializes(self):
        fe = ForEach("groups", let=dict(gi=INDEX, show_done=ITEM.show_done))
        j = fe.to_json()
        assert j["let"] == {"gi": "{{ $index }}", "show_done": "{{ $item.show_done }}"}

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
        assert t.content == "{{ $item.name }}"

    def test_item_fstring_with_pipes(self):
        with ForEach("files") as item:
            t = Text(f"{item.type} · {item.size} bytes")
        assert t.content == "{{ $item.type }} · {{ $item.size }} bytes"

    def test_popstate_with_index_rx(self):
        action = PopState("files", INDEX)
        j = action.model_dump(by_alias=True, exclude_none=True)
        assert j["index"] == "{{ $index }}"

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
        from prefab_ui.components.control_flow import If

        with ForEach("groups"):
            cond = If(ITEM.todos.length())
        assert cond.condition == "{{ $item.todos | length }}"

    def test_negation_in_disabled(self):
        from prefab_ui.components import Button

        with ForEach("groups"):
            btn = Button("Add", disabled=~ITEM.new_todo)
        j = btn.to_json()
        assert j["disabled"] == "{{ !$item.new_todo }}"
