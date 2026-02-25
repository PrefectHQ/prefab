"""Tests for ForEach component."""

from __future__ import annotations

from prefab_ui.components import Column, Text
from prefab_ui.components.control_flow import ForEach
from prefab_ui.rx import Rx


class TestForEachSerialization:
    def test_positional_key(self):
        fe = ForEach("items")
        assert fe.key == "items"

    def test_serializes_with_children(self):
        with ForEach("users") as fe:
            Text(content="{{ name }}")
        j = fe.to_json()
        assert j["type"] == "ForEach"
        assert j["key"] == "users"
        assert len(j["children"]) == 1
        assert j["children"][0]["content"] == "{{ name }}"

    def test_rx_as_key(self):
        rx = Rx("files")
        fe = ForEach(rx)
        assert fe.key == "files"

    def test_rx_as_keyword_key(self):
        rx = Rx("uploads")
        fe = ForEach(key=rx)
        assert fe.key == "uploads"

    def test_rx_serializes_to_plain_key(self):
        rx = Rx("items")
        with ForEach(rx) as fe:
            Text(content="{{ $item.name }}")
        j = fe.to_json()
        assert j["key"] == "items"

    def test_nested_children(self):
        with ForEach("users") as fe:
            with Column():
                Text(content="{{ name }}")
                Text(content="{{ email }}")
        j = fe.to_json()
        child = j["children"][0]
        assert child["type"] == "Column"
        assert len(child["children"]) == 2
