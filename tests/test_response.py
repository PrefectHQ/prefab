"""Tests for UIResponse — Prefab's wire format builder."""

from __future__ import annotations

import pytest

from prefab_ui.components import Column, Heading, Text
from prefab_ui.response import PROTOCOL_VERSION, UIResponse


class TestUIResponse:
    def test_state_and_view(self):
        resp = UIResponse(
            state={"name": "Alice"},
            view=Column(children=[Heading(content="{{ name }}")]),
        )
        result = resp.to_json()
        assert result["state"]["name"] == "Alice"
        assert "view" in result
        view = result["view"]
        assert view["type"] == "Column"
        assert view["children"][0]["type"] == "Heading"
        assert view["children"][0]["content"] == "{{ name }}"

    def test_state_only(self):
        resp = UIResponse(state={"x": 1})
        result = resp.to_json()
        assert result["state"]["x"] == 1
        assert result["version"] == PROTOCOL_VERSION

    def test_view_only(self):
        resp = UIResponse(view=Text(content="hi"))
        result = resp.to_json()
        assert "view" in result
        assert result["view"]["type"] == "Text"

    def test_text_fallback_from_state(self):
        resp = UIResponse(state={"hello": "world"})
        text = resp.text_fallback()
        assert "hello" in text
        assert "world" in text

    def test_text_fallback_from_view(self):
        resp = UIResponse(view=Text(content="hi"))
        text = resp.text_fallback()
        assert text == "[UI content]"

    def test_custom_text(self):
        resp = UIResponse(state={"x": 1}, text="Custom fallback")
        text = resp.text_fallback()
        assert text == "Custom fallback"

    def test_empty_response(self):
        resp = UIResponse()
        result = resp.to_json()
        assert result == {"version": PROTOCOL_VERSION}
        assert resp.text_fallback() == "[No content]"

    def test_reserved_key_validation_dollar(self):
        with pytest.raises(ValueError, match="reserved prefix '\\$'"):
            UIResponse(state={"$event": "bad"})


class TestProtocolVersion:
    def test_version_always_present(self):
        resp = UIResponse(view=Text(content="hi"))
        result = resp.to_json()
        assert result["version"] == PROTOCOL_VERSION

    def test_version_with_state(self):
        resp = UIResponse(state={"x": 1}, view=Text(content="hi"))
        result = resp.to_json()
        assert result["version"] == PROTOCOL_VERSION
        assert result["state"]["x"] == 1

    def test_version_value(self):
        assert PROTOCOL_VERSION == "0.2"


class TestUIResponseState:
    def test_state_nested(self):
        resp = UIResponse(
            view=Text(content="hi"),
            state={"count": 0, "name": ""},
        )
        result = resp.to_json()
        assert result["state"]["count"] == 0
        assert result["state"]["name"] == ""

    def test_state_coexists_with_view(self):
        resp = UIResponse(state={"x": 1}, view=Text(content="hi"))
        result = resp.to_json()
        assert result["state"]["x"] == 1
        assert "view" in result
