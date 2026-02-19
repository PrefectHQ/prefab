"""Tests for PrefabApp — the central application object."""

from __future__ import annotations

import json

import pytest

from prefab_ui.app import PROTOCOL_VERSION, PrefabApp
from prefab_ui.components import Column, Heading, Text
from prefab_ui.components.base import clear_initial_state, set_initial_state


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


class TestPrefabAppHtml:
    def test_produces_valid_html(self):
        app = PrefabApp(view=Text(content="hi"))
        html = app.html()
        assert "<!doctype html>" in html.lower()
        assert "<html" in html
        assert '<div id="root"></div>' in html

    def test_contains_baked_in_data(self):
        app = PrefabApp(view=Text(content="hi"), state={"x": 1})
        html = app.html()
        assert '<script id="prefab:initial-data" type="application/json">' in html
        # Parse the baked-in JSON to verify it matches to_json()
        start = html.index('type="application/json">') + len('type="application/json">')
        end = html.index("</script>", start)
        baked = json.loads(html[start:end])
        assert baked == app.to_json()

    def test_empty_app_produces_valid_html(self):
        app = PrefabApp()
        html = app.html()
        assert "<!doctype html>" in html.lower()
        start = html.index('type="application/json">') + len('type="application/json">')
        end = html.index("</script>", start)
        baked = json.loads(html[start:end])
        assert baked == {"version": PROTOCOL_VERSION}

    def test_includes_stylesheets(self):
        app = PrefabApp(
            view=Text(content="hi"),
            stylesheets=["https://fonts.googleapis.com/css2?family=Inter"],
        )
        html = app.html()
        assert (
            '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter">'
            in html
        )

    def test_includes_scripts(self):
        app = PrefabApp(
            view=Text(content="hi"),
            scripts=["https://cdn.example.com/chart.js"],
        )
        html = app.html()
        assert '<script src="https://cdn.example.com/chart.js"></script>' in html

    def test_escapes_script_closing_tag_in_json(self):
        app = PrefabApp(state={"html": "</script>"})
        html = app.html()
        # The raw </script> must be escaped so it doesn't break the HTML
        assert "</script></script>" not in html
        assert r"<\/script>" in html


class TestPrefabAppCsp:
    def test_baseline_csp(self):
        app = PrefabApp(view=Text(content="hi"))
        csp = app.csp()
        assert isinstance(csp, dict)
        assert "resource_domains" in csp

    def test_connect_domains(self):
        app = PrefabApp(
            view=Text(content="hi"),
            connect_domains=["api.example.com", "data.example.com"],
        )
        csp = app.csp()
        assert csp["connect_domains"] == ["api.example.com", "data.example.com"]

    def test_stylesheet_origins(self):
        app = PrefabApp(
            view=Text(content="hi"),
            stylesheets=[
                "https://fonts.googleapis.com/css2?family=Inter",
                "https://fonts.googleapis.com/css2?family=Mono",
                "https://cdn.example.com/styles.css",
            ],
        )
        csp = app.csp()
        origins = csp["style_domains"]
        assert "https://fonts.googleapis.com" in origins
        assert "https://cdn.example.com" in origins

    def test_script_origins(self):
        app = PrefabApp(
            view=Text(content="hi"),
            scripts=["https://cdn.example.com/chart.js"],
        )
        csp = app.csp()
        assert "https://cdn.example.com" in csp["script_domains"]


class TestSetInitialState:
    def setup_method(self):
        clear_initial_state()

    def teardown_method(self):
        clear_initial_state()

    def test_consumed_by_prefab_app(self):
        set_initial_state(name="world")
        app = PrefabApp(view=Text(content="hi"))
        assert app.state == {"name": "world"}

    def test_cleared_after_consumption(self):
        set_initial_state(name="world")
        PrefabApp()
        app2 = PrefabApp()
        assert app2.state is None

    def test_explicit_state_overrides(self):
        set_initial_state(name="world", count=0)
        app = PrefabApp(state={"name": "Alice"})
        assert app.state == {"name": "Alice", "count": 0}

    def test_accumulates_across_calls(self):
        set_initial_state(name="world")
        set_initial_state(count=0)
        app = PrefabApp()
        assert app.state == {"name": "world", "count": 0}

    def test_no_initial_state_means_none(self):
        app = PrefabApp()
        assert app.state is None


class TestPrefabAppWireFormatIsolation:
    """Deployment config (stylesheets, scripts, connect_domains) stays out
    of the wire format — it only affects HTML and CSP."""

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
