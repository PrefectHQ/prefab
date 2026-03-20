"""Tests for theming — Theme model and PrefabApp integration."""

from __future__ import annotations

from prefab_ui.app import PrefabApp
from prefab_ui.components import Text
from prefab_ui.themes import Basic, Presentation, Theme


class TestThemeModel:
    def test_string_light_only_serializes_to_both(self):
        theme = Theme(light_css="--primary: #3b82f6;")
        result = theme.to_json()
        assert result == {
            "light": "--primary: #3b82f6;",
            "dark": "--primary: #3b82f6;",
            "css": "",
        }

    def test_string_light_and_dark(self):
        theme = Theme(
            light_css="--primary: oklch(0.6 0.24 260);",
            dark_css="--primary: oklch(0.7 0.18 260);",
        )
        result = theme.to_json()
        assert result["light"] == "--primary: oklch(0.6 0.24 260);"
        assert result["dark"] == "--primary: oklch(0.7 0.18 260);"

    def test_css_field(self):
        theme = Theme(css=".pf-progress { height: 0.625rem; }")
        result = theme.to_json()
        assert result["css"] == ".pf-progress { height: 0.625rem; }"

    def test_all_three_fields(self):
        theme = Theme(
            light_css="--primary: red;",
            dark_css="--primary: blue;",
            css=".pf-button { border-radius: 0; }",
        )
        result = theme.to_json()
        assert result["light"] == "--primary: red;"
        assert result["dark"] == "--primary: blue;"
        assert result["css"] == ".pf-button { border-radius: 0; }"

    def test_empty_theme(self):
        theme = Theme()
        result = theme.to_json()
        assert result == {"light": "", "dark": "", "css": ""}

    def test_dark_none_falls_back_to_light(self):
        theme = Theme(light_css="--background: #fff;", dark_css=None)
        result = theme.to_json()
        assert result["dark"] == "--background: #fff;"


class TestAccentField:
    def test_numeric_accent_injects_hue_var(self):
        theme = Theme(accent=260)
        result = theme.to_json()
        assert "--accent-hue:" in result["light"]
        assert "260" in result["light"]
        assert "--accent-hue:" in result["dark"]
        assert "260" in result["dark"]

    def test_accent_prepends_to_existing_css(self):
        theme = Theme(light_css="--primary: red;", accent=260)
        result = theme.to_json()
        assert result["light"].startswith("--accent-hue:")
        assert "--primary: red;" in result["light"]

    def test_accent_in_light_and_dark(self):
        theme = Theme(
            light_css="--primary: oklch(0.6 0.24 var(--accent-hue));",
            dark_css="--primary: oklch(0.7 0.18 var(--accent-hue));",
            accent=155,
        )
        result = theme.to_json()
        assert "--accent-hue:" in result["light"]
        assert "155" in result["light"]
        assert "--accent-hue:" in result["dark"]
        assert "155" in result["dark"]

    def test_no_accent_omits_hue_var(self):
        theme = Theme(light_css="--primary: red;")
        result = theme.to_json()
        assert "--accent-hue" not in result["light"]

    def test_accent_dark_fallback(self):
        theme = Theme(light_css="--primary: red;", accent=100)
        result = theme.to_json()
        assert result["light"] == result["dark"]

    def test_string_accent_overrides_primary_and_ring(self):
        theme = Theme(accent="#ff0000")
        result = theme.to_json()
        assert "--primary: #ff0000;" in result["light"]
        assert "--ring: #ff0000;" in result["light"]
        assert "--accent-hue" not in result["light"]

    def test_tailwind_color_name_resolved(self):
        theme = Theme(accent="amber-500")
        assert theme.accent == "#f59e0b"

    def test_tailwind_bare_name_defaults_to_500(self):
        theme = Theme(accent="amber")
        assert theme.accent == "#f59e0b"

    def test_accent_none(self):
        theme = Theme(accent=None)
        result = theme.to_json()
        assert "--accent-hue" not in result["light"]
        assert "--primary" not in result["light"]


class TestModeField:
    def test_mode_included_when_set(self):
        theme = Theme(mode="dark")
        result = theme.to_json()
        assert result["mode"] == "dark"

    def test_mode_omitted_when_none(self):
        theme = Theme()
        result = theme.to_json()
        assert "mode" not in result

    def test_mode_light(self):
        theme = Theme(mode="light")
        result = theme.to_json()
        assert result["mode"] == "light"


class TestFontField:
    def test_font_sets_css_var(self):
        theme = Theme(font="Inter")
        result = theme.to_json()
        assert "--font-sans: 'Inter'" in result["light"]

    def test_font_generates_import(self):
        theme = Theme(font="Inter")
        result = theme.to_json()
        assert "@import" in result["css"]
        assert "Inter" in result["css"]

    def test_font_mono_sets_css_var(self):
        theme = Theme(font_mono="JetBrains Mono")
        result = theme.to_json()
        assert "--font-mono: 'JetBrains Mono'" in result["light"]

    def test_no_font_no_var(self):
        theme = Theme()
        result = theme.to_json()
        assert "--font-sans" not in result["light"]


class TestDictBackwardsCompat:
    """Legacy dict format is auto-coerced to CSS declaration strings."""

    def test_dict_light_coerced(self):
        theme = Theme(light_css={"primary": "#3b82f6"})
        assert "--primary: #3b82f6;" in theme.light_css

    def test_dict_dark_coerced(self):
        theme = Theme(dark_css={"primary": "oklch(0.7 0.18 260)"})
        assert theme.dark_css is not None
        assert "--primary: oklch(0.7 0.18 260);" in theme.dark_css

    def test_dict_multiple_vars(self):
        theme = Theme(
            light_css={
                "primary": "oklch(0.72 0.19 149)",
                "background": "oklch(0.97 0.01 244)",
                "chart-1": "oklch(0.72 0.19 149)",
            },
        )
        assert "--primary:" in theme.light_css
        assert "--background:" in theme.light_css
        assert "--chart-1:" in theme.light_css

    def test_dict_round_trips_to_json(self):
        theme = Theme(light_css={"primary": "#3b82f6"})
        result = theme.to_json()
        assert "--primary: #3b82f6;" in result["light"]
        assert "--primary: #3b82f6;" in result["dark"]

    def test_dict_dark_none_falls_back(self):
        theme = Theme(light_css={"background": "#fff"}, dark_css=None)
        result = theme.to_json()
        assert result["dark"] == result["light"]


class TestBasicTheme:
    def test_basic_defaults_to_no_accent(self):
        theme = Basic()
        result = theme.to_json()
        assert "--accent-hue:" not in result["light"]
        assert "oklch" not in result["light"]

    def test_basic_with_numeric_accent(self):
        theme = Basic(accent=155)
        result = theme.to_json()
        assert "var(--accent-hue)" in result["light"]
        assert "var(--accent-hue)" in result["dark"]

    def test_basic_has_primary(self):
        theme = Basic(accent=260)
        result = theme.to_json()
        assert "--primary:" in result["light"]
        assert "--primary:" in result["dark"]

    def test_basic_has_chart_colors(self):
        theme = Basic(accent=260)
        result = theme.to_json()
        for i in range(1, 6):
            assert f"--chart-{i}:" in result["light"]
            assert f"--chart-{i}:" in result["dark"]

    def test_basic_chart_colors_use_calc_offsets(self):
        theme = Basic(accent=260)
        result = theme.to_json()
        assert "calc(var(--accent-hue) + 72)" in result["light"]
        assert "calc(var(--accent-hue) + 288)" in result["dark"]

    def test_basic_different_accents_produce_different_css(self):
        t1 = Basic(accent=260)
        t2 = Basic(accent=155)
        assert t1.to_json()["light"] != t2.to_json()["light"]

    def test_basic_with_tailwind_accent(self):
        theme = Basic(accent="blue")
        result = theme.to_json()
        assert "--primary: #3b82f6;" in result["light"]


class TestPresentationTheme:
    def test_has_light_and_dark(self):
        result = Presentation().to_json()
        assert "--primary:" in result["light"]
        assert "--primary:" in result["dark"]

    def test_has_chart_colors(self):
        result = Presentation().to_json()
        for i in range(1, 6):
            assert f"--chart-{i}:" in result["light"]
            assert f"--chart-{i}:" in result["dark"]

    def test_has_css_overrides(self):
        p = Presentation()
        assert ".pf-progress" in p.css
        assert ".pf-badge-variant-default" in p.css
        assert ".pf-table-row" in p.css

    def test_dark_matches_light(self):
        result = Presentation().to_json()
        assert result["light"] == result["dark"]

    def test_presentation_with_accent(self):
        result = Presentation(accent="cyan").to_json()
        assert "--primary: #06b6d4;" in result["light"]


class TestPrefabAppTheme:
    def test_theme_in_wire_format(self):
        app = PrefabApp(
            view=Text(content="hi"),
            theme=Theme(light_css="--primary: #3b82f6;"),
        )
        result = app.to_json()
        assert result["theme"]["light"] == "--primary: #3b82f6;"
        assert result["theme"]["dark"] == "--primary: #3b82f6;"
        assert result["theme"]["css"] == ""

    def test_builtin_theme_in_wire_format(self):
        app = PrefabApp(view=Text(content="hi"), theme=Basic(accent=260))
        result = app.to_json()
        assert "--primary:" in result["theme"]["light"]
        assert "--primary:" in result["theme"]["dark"]

    def test_no_theme_omitted_from_wire_format(self):
        app = PrefabApp(view=Text(content="hi"))
        result = app.to_json()
        assert "theme" not in result

    def test_theme_in_html_output(self):
        app = PrefabApp(view=Text(content="hi"), theme=Basic(accent=260))
        html = app.html()
        assert '"theme":{' in html

    def test_empty_theme_in_wire_format(self):
        app = PrefabApp(view=Text(content="hi"), theme=Theme())
        result = app.to_json()
        assert result["theme"] == {"light": "", "dark": "", "css": ""}

    def test_theme_with_css_in_wire_format(self):
        theme = Theme(
            light_css="--primary: red;",
            css=".pf-progress { height: 0.625rem; }",
        )
        app = PrefabApp(view=Text(content="hi"), theme=theme)
        result = app.to_json()
        assert result["theme"]["css"] == ".pf-progress { height: 0.625rem; }"

    def test_dict_compat_in_wire_format(self):
        app = PrefabApp(
            view=Text(content="hi"),
            theme=Theme(light_css={"primary": "#3b82f6"}),
        )
        result = app.to_json()
        assert "--primary: #3b82f6;" in result["theme"]["light"]


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
    def test_theme_importable_from_themes(self):
        from prefab_ui.themes import Theme as ThemesTheme

        assert ThemesTheme is Theme

    def test_basic_importable_from_themes(self):
        from prefab_ui.themes import Basic as ThemesBasic

        assert ThemesBasic is Basic

    def test_presentation_importable_from_themes(self):
        from prefab_ui.themes import Presentation as ThemesPresentation

        assert ThemesPresentation is Presentation
