"""Tests for PrefabApp — the central application object."""

from __future__ import annotations

import json

import pytest

from prefab_ui.app import PROTOCOL_VERSION, PrefabApp
from prefab_ui.components import Column, Heading, Text


class TestPrefabAppToJson:
    def test_empty_app(self):
        app = PrefabApp()
        result = app.to_json()
        assert result == {"$prefab": {"version": PROTOCOL_VERSION}}

    def test_view_and_state(self):
        app = PrefabApp(
            view=Column(children=[Heading(content="{{ name }}")]),
            state={"name": "Alice"},
        )
        result = app.to_json()
        assert result["$prefab"]["version"] == PROTOCOL_VERSION
        # view= path: wrapped in Div with pf-app-root
        assert result["view"]["type"] == "Div"
        assert result["view"]["cssClass"] == "pf-app-root"
        assert result["view"]["children"][0]["type"] == "Column"
        assert result["state"]["name"] == "Alice"

    def test_view_only(self):
        app = PrefabApp(view=Text(content="hi"))
        result = app.to_json()
        assert result["view"]["type"] == "Div"
        assert result["view"]["children"][0]["type"] == "Text"
        assert "state" not in result

    def test_state_only(self):
        app = PrefabApp(state={"x": 1})
        result = app.to_json()
        assert result["state"]["x"] == 1
        assert "view" not in result


class TestPrefabAppFromJson:
    def test_round_trip(self):
        wire = {
            "view": {"type": "Column", "children": [{"type": "Text", "content": "hi"}]},
            "state": {"x": 1},
        }
        app = PrefabApp.from_json(wire)
        result = app.to_json()
        assert result["$prefab"] == {"version": PROTOCOL_VERSION}
        # Dict views get wrapped in a Div with pf-app-root
        assert result["view"]["type"] == "Div"
        assert result["view"]["children"] == [wire["view"]]
        assert result["state"] == wire["state"]

    def test_override_state(self):
        wire = {
            "view": {"type": "Text", "content": "hi"},
            "state": {"x": 1},
        }
        app = PrefabApp.from_json(wire, state={"y": 2})
        result = app.to_json()
        assert result["state"] == {"y": 2}

    def test_override_theme(self):
        from prefab_ui.themes import Theme

        theme = Theme(light={"primary": "#000"})
        wire = {"view": {"type": "Text", "content": "hi"}}
        app = PrefabApp.from_json(wire, theme=theme)
        result = app.to_json()
        assert "theme" in result

    def test_dict_view_wrapped(self):
        view_dict = {"type": "Column", "children": []}
        app = PrefabApp(view=view_dict)
        result = app.to_json()
        assert result["view"]["type"] == "Div"
        assert result["view"]["cssClass"] == "pf-app-root"
        assert result["view"]["children"] == [view_dict]


class TestNonFiniteFloatSanitization:
    """Non-finite floats (NaN, Inf) must become null in JSON output."""

    def test_nan_in_component_data(self):
        from prefab_ui.components.charts import BarChart, ChartSeries

        data = [{"x": "a", "y": float("nan")}]
        chart = BarChart(
            data=data, series=[ChartSeries(dataKey="y", label="y")], xAxis="x"
        )
        result = chart.to_json()
        assert result["data"][0]["y"] is None

    def test_inf_in_component_data(self):
        from prefab_ui.components.charts import BarChart, ChartSeries

        data = [{"x": "a", "y": float("inf")}, {"x": "b", "y": float("-inf")}]
        chart = BarChart(
            data=data, series=[ChartSeries(dataKey="y", label="y")], xAxis="x"
        )
        result = chart.to_json()
        assert result["data"][0]["y"] is None
        assert result["data"][1]["y"] is None

    def test_nan_in_state(self):
        app = PrefabApp(state={"score": float("nan"), "count": 3})
        result = app.to_json()
        assert result["state"]["score"] is None
        assert result["state"]["count"] == 3

    def test_html_output_is_valid_json(self):
        from prefab_ui.components.charts import BarChart, ChartSeries

        data = [{"x": "a", "y": float("nan")}]
        with Column() as view:
            BarChart(data=data, series=[ChartSeries(dataKey="y", label="y")], xAxis="x")
        app = PrefabApp(view=view)
        html = app.html()
        # Extract the JSON blob from the script tag
        start = html.index('type="application/json">') + len('type="application/json">')
        end = html.index("</script>", start)
        raw = html[start:end].replace(r"<\/", "</")
        parsed = json.loads(raw)
        assert parsed["view"]["children"][0]["children"][0]["data"][0]["y"] is None

    def test_finite_floats_preserved(self):
        app = PrefabApp(state={"val": 3.14, "neg": -2.5, "zero": 0.0})
        result = app.to_json()
        assert result["state"]["val"] == 3.14
        assert result["state"]["neg"] == -2.5
        assert result["state"]["zero"] == 0.0


class TestPrefabAppContextManager:
    def test_basic(self):
        with PrefabApp(state={"x": 1}) as app:
            Heading("Title")
            Text("body")
        result = app.to_json()
        # Context manager: bare Div gets pf-app-root stamped on it
        assert result["view"]["type"] == "Div"
        assert result["view"]["cssClass"] == "pf-app-root"
        assert len(result["view"]["children"]) == 2
        assert result["state"] == {"x": 1}

    def test_css_class(self):
        with PrefabApp(css_class="max-w-3xl") as app:
            Text("hi")
        assert app.to_json()["view"]["cssClass"] == "pf-app-root max-w-3xl"

    def test_nested_containers(self):
        with PrefabApp() as app:
            Heading("Title")
            with Column(gap=2):
                Text("a")
                Text("b")
        children = app.to_json()["view"]["children"]
        assert len(children) == 2
        assert children[1]["type"] == "Column"

    def test_defer_excluded(self):
        with PrefabApp() as app:
            Text("attached")
            Text("deferred", defer=True)
        children = app.to_json()["view"]["children"]
        assert len(children) == 1
        assert children[0]["content"] == "attached"

    def test_no_css_class(self):
        with PrefabApp() as app:
            Text("hi")
        assert app.to_json()["view"]["cssClass"] == "pf-app-root"

    def test_not_attached_to_outer_stack(self):
        """PrefabApp's implicit Div should not leak to an outer context."""
        with Column() as outer:
            Text("outer child")
            with PrefabApp() as app:
                Text("inner")
        assert len(outer.children) == 1
        assert len(app.to_json()["view"]["children"]) == 1

    def test_reentrant(self):
        """Same PrefabApp can be used as context manager multiple times."""
        app = PrefabApp(state={"x": 1})

        with app:
            Text("version 1")
        assert app.to_json()["view"]["children"][0]["content"] == "version 1"

        # Reset view for re-entry
        app.view = None
        with app:
            Text("version 2")
            Text("extra")
        children = app.to_json()["view"]["children"]
        assert len(children) == 2
        assert children[0]["content"] == "version 2"

    def test_error_if_view_already_set(self):
        app = PrefabApp(view=Text("existing"))
        with pytest.raises(RuntimeError, match="view= is already set"):
            with app:
                Text("conflict")


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
        assert '<div id="root"' in html

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
        assert baked == {"$prefab": {"version": PROTOCOL_VERSION}}

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
