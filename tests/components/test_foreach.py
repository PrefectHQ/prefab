"""Tests for ForEach component."""

from __future__ import annotations

from prefab_ui.components import Column, ForEach, Text


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

    def test_nested_children(self):
        with ForEach("users") as fe:
            with Column():
                Text(content="{{ name }}")
                Text(content="{{ email }}")
        j = fe.to_json()
        child = j["children"][0]
        assert child["type"] == "Column"
        assert len(child["children"]) == 2
