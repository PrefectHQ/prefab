"""Tests for theming — Theme model and PrefabApp integration."""

from __future__ import annotations

import pytest

from prefab_ui import Theme, blue, green, orange, red, rose, violet
from prefab_ui.app import PrefabApp
from prefab_ui.components import Text


class TestThemeModel:
    def test_light_only_serializes_to_both(self):
        theme = Theme(light={"primary": "#3b82f6"})
        result = theme.to_json()
        assert result == {
            "light": {"primary": "#3b82f6"},
            "dark": {"primary": "#3b82f6"},
        }

    def test_light_and_dark(self):
        theme = Theme(
            light={"primary": "oklch(0.6 0.24 260)"},
            dark={"primary": "oklch(0.7 0.18 260)"},
        )
        result = theme.to_json()
        assert result["light"]["primary"] == "oklch(0.6 0.24 260)"
        assert result["dark"]["primary"] == "oklch(0.7 0.18 260)"

    def test_empty_theme(self):
        theme = Theme()
        result = theme.to_json()
        assert result == {"light": {}, "dark": {}}

    def test_dark_none_falls_back_to_light(self):
        theme = Theme(light={"background": "#fff"}, dark=None)
        result = theme.to_json()
        assert result["dark"] == {"background": "#fff"}

    def test_multiple_vars(self):
        theme = Theme(
            light={
                "primary": "oklch(0.72 0.19 149)",
                "background": "oklch(0.97 0.01 244)",
                "chart-1": "oklch(0.72 0.19 149)",
            },
        )
        result = theme.to_json()
        assert len(result["light"]) == 3
        assert "chart-1" in result["light"]


class TestBuiltinThemes:
    @pytest.mark.parametrize("theme", [blue, green, red, orange, violet, rose])
    def test_builtin_has_light_and_dark(self, theme: Theme):
        result = theme.to_json()
        assert "light" in result
        assert "dark" in result
        assert "primary" in result["light"]
        assert "primary" in result["dark"]

    @pytest.mark.parametrize("theme", [blue, green, red, orange, violet, rose])
    def test_builtin_has_charts(self, theme: Theme):
        result = theme.to_json()
        for i in range(1, 6):
            assert f"chart-{i}" in result["light"]
            assert f"chart-{i}" in result["dark"]

    def test_themes_have_distinct_primaries(self):
        primaries = {
            t.light["primary"] for t in [blue, green, red, orange, violet, rose]
        }
        assert len(primaries) == 6


class TestPrefabAppTheme:
    def test_theme_object_in_wire_format(self):
        app = PrefabApp(
            view=Text(content="hi"),
            theme=Theme(light={"primary": "#3b82f6"}),
        )
        result = app.to_json()
        assert result["theme"] == {
            "light": {"primary": "#3b82f6"},
            "dark": {"primary": "#3b82f6"},
        }

    def test_builtin_theme_in_wire_format(self):
        app = PrefabApp(view=Text(content="hi"), theme=blue)
        result = app.to_json()
        assert "primary" in result["theme"]["light"]
        assert "primary" in result["theme"]["dark"]

    def test_no_theme_omitted_from_wire_format(self):
        app = PrefabApp(view=Text(content="hi"))
        result = app.to_json()
        assert "theme" not in result

    def test_theme_in_html_output(self):
        app = PrefabApp(view=Text(content="hi"), theme=blue)
        html = app.html()
        assert '"theme":{' in html

    def test_empty_theme_in_wire_format(self):
        app = PrefabApp(view=Text(content="hi"), theme=Theme())
        result = app.to_json()
        assert result["theme"] == {"light": {}, "dark": {}}


class TestInlineStylesheets:
    def test_inline_css_rendered_as_style_tag(self):
        css = ":root { --primary: oklch(0.72 0.19 149); }"
        app = PrefabApp(view=Text(content="hi"), stylesheets=[css])
        html = app.html()
        assert f"<style>{css}</style>" in html

    def test_url_rendered_as_link_tag(self):
        url = "https://fonts.googleapis.com/css2?family=Inter"
        app = PrefabApp(view=Text(content="hi"), stylesheets=[url])
        html = app.html()
        assert f'<link rel="stylesheet" href="{url}">' in html

    def test_mixed_inline_and_url(self):
        css = ":root { --primary: red; }"
        url = "https://example.com/style.css"
        app = PrefabApp(view=Text(content="hi"), stylesheets=[css, url])
        html = app.html()
        assert "<style>" in html
        assert '<link rel="stylesheet"' in html

    def test_inline_css_excluded_from_csp(self):
        css = ":root { --primary: red; }"
        app = PrefabApp(view=Text(content="hi"), stylesheets=[css])
        csp = app.csp()
        assert "style_domains" not in csp


class TestThemeImport:
    def test_theme_importable_from_top_level(self):
        from prefab_ui import Theme as TopLevelTheme

        assert TopLevelTheme is Theme

    def test_builtins_importable_from_top_level(self):
        from prefab_ui import blue as top_blue

        assert top_blue is blue
