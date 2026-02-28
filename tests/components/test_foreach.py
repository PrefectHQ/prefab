"""Tests for ForEach component."""

from __future__ import annotations

from prefab_ui.components import Column, Text
from prefab_ui.components.control_flow import ForEach
from prefab_ui.rx import ITEM, Rx


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
