"""Tests for PrefabApp — the central application object."""

from __future__ import annotations

import pytest

from prefab_ui.app import PROTOCOL_VERSION, MCPPayload, PrefabApp
from prefab_ui.components import Column, Heading, Text


class TestPrefabAppToJson:
    def test_empty_app(self):
        app = PrefabApp()
        result = app.to_json()
        assert result == {"version": PROTOCOL_VERSION}

    def test_view_and_state(self):
        app = PrefabApp(
            view=Column(children=[Heading(content="{{ name }}")]),
            state={"name": "Alice"},
        )
        result = app.to_json()
        assert result["version"] == PROTOCOL_VERSION
        assert result["view"]["type"] == "Column"
        assert result["state"]["name"] == "Alice"

    def test_view_only(self):
        app = PrefabApp(view=Text(content="hi"))
        result = app.to_json()
        assert result["view"]["type"] == "Text"
        assert "state" not in result

    def test_state_only(self):
        app = PrefabApp(state={"x": 1})
        result = app.to_json()
        assert result["state"]["x"] == 1
        assert "view" not in result


class TestPrefabAppValidation:
    def test_reserved_state_key_rejected(self):
        with pytest.raises(ValueError, match="reserved prefix '\\$'"):
            PrefabApp(state={"$event": "bad"})

    def test_normal_state_keys_accepted(self):
        app = PrefabApp(state={"name": "ok", "count": 0})
        assert app.state == {"name": "ok", "count": 0}


class TestPrefabAppTextFallback:
    def test_custom_text(self):
        app = PrefabApp(text="Custom fallback")
        assert app.text_fallback() == "Custom fallback"

    def test_view_fallback(self):
        app = PrefabApp(view=Text(content="hi"))
        assert app.text_fallback() == "[UI content]"

    def test_state_fallback(self):
        app = PrefabApp(state={"hello": "world"})
        text = app.text_fallback()
        assert "hello" in text
        assert "world" in text

    def test_empty_fallback(self):
        app = PrefabApp()
        assert app.text_fallback() == "[No content]"


class TestPrefabAppForMcp:
    def test_returns_mcp_payload(self):
        app = PrefabApp(view=Text(content="hi"), state={"x": 1})
        payload = app.for_mcp()
        assert isinstance(payload, MCPPayload)

    def test_payload_has_html(self):
        app = PrefabApp(view=Text(content="hi"))
        payload = app.for_mcp()
        assert isinstance(payload.html, str)
        assert len(payload.html) > 0
        assert "<html" in payload.html.lower() or "<!doctype" in payload.html.lower()

    def test_payload_structured_content_matches_to_json(self):
        app = PrefabApp(view=Text(content="hi"), state={"x": 1})
        payload = app.for_mcp()
        assert payload.structured_content == app.to_json()

    def test_payload_csp_baseline(self):
        app = PrefabApp(view=Text(content="hi"))
        payload = app.for_mcp()
        assert isinstance(payload.csp, dict)

    def test_connect_domains_in_csp(self):
        app = PrefabApp(
            view=Text(content="hi"),
            connect_domains=["api.example.com", "data.example.com"],
        )
        payload = app.for_mcp()
        assert payload.csp["connect_domains"] == [
            "api.example.com",
            "data.example.com",
        ]

    def test_stylesheet_origins_in_csp(self):
        app = PrefabApp(
            view=Text(content="hi"),
            stylesheets=[
                "https://fonts.googleapis.com/css2?family=Inter",
                "https://fonts.googleapis.com/css2?family=Mono",
                "https://cdn.example.com/styles.css",
            ],
        )
        payload = app.for_mcp()
        origins = payload.csp["style_domains"]
        assert "https://fonts.googleapis.com" in origins
        assert "https://cdn.example.com" in origins

    def test_script_origins_in_csp(self):
        app = PrefabApp(
            view=Text(content="hi"),
            scripts=["https://cdn.example.com/chart.js"],
        )
        payload = app.for_mcp()
        assert "https://cdn.example.com" in payload.csp["script_domains"]


class TestPrefabAppNewFields:
    """Verify the new fields (stylesheets, scripts, connect_domains) don't
    leak into the wire format — they're deployment config, not protocol."""

    def test_stylesheets_not_in_wire_format(self):
        app = PrefabApp(
            view=Text(content="hi"),
            stylesheets=["https://example.com/style.css"],
        )
        result = app.to_json()
        assert "stylesheets" not in result

    def test_scripts_not_in_wire_format(self):
        app = PrefabApp(
            view=Text(content="hi"),
            scripts=["https://example.com/script.js"],
        )
        result = app.to_json()
        assert "scripts" not in result

    def test_connect_domains_not_in_wire_format(self):
        app = PrefabApp(
            view=Text(content="hi"),
            connect_domains=["api.example.com"],
        )
        result = app.to_json()
        assert "connect_domains" not in result
        assert "connectDomains" not in result
