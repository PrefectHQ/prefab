"""Tests for arbitrary Tailwind value CSS generation."""

import pytest

from prefab_ui.css import collect_classes, collect_css_classes, generate_arbitrary_css


class TestCollectClasses:
    def test_simple_tree(self):
        tree = {"type": "Div", "cssClass": "p-4 h-[500px]"}
        assert collect_classes(tree) == {"p-4", "h-[500px]"}

    def test_nested_children(self):
        tree = {
            "type": "Column",
            "cssClass": "gap-4",
            "children": [
                {"type": "Div", "cssClass": "h-[200px] w-[300px]"},
                {"type": "Text", "content": "hello"},
            ],
        }
        assert collect_classes(tree) == {"gap-4", "h-[200px]", "w-[300px]"}

    def test_no_css_class(self):
        tree = {"type": "Text", "content": "hello"}
        assert collect_classes(tree) == set()

    def test_deeply_nested(self):
        tree = {
            "type": "Column",
            "children": [
                {
                    "type": "Row",
                    "children": [
                        {"type": "Div", "cssClass": "min-h-[100px]"},
                    ],
                },
            ],
        }
        assert collect_classes(tree) == {"min-h-[100px]"}


class TestGenerateArbitraryCss:
    def test_height(self):
        css = generate_arbitrary_css(["h-[500px]"])
        assert css == r".h-\[500px\] { height: 500px; }"

    def test_width(self):
        css = generate_arbitrary_css(["w-[300px]"])
        assert css == r".w-\[300px\] { width: 300px; }"

    def test_min_max_dimensions(self):
        css = generate_arbitrary_css(["min-h-[100px]"])
        assert css == r".min-h-\[100px\] { min-height: 100px; }"

        css = generate_arbitrary_css(["max-w-[800px]"])
        assert css == r".max-w-\[800px\] { max-width: 800px; }"

    def test_size_expands_to_width_and_height(self):
        css = generate_arbitrary_css(["size-[48px]"])
        assert "width: 48px;" in css
        assert "height: 48px;" in css

    def test_padding(self):
        css = generate_arbitrary_css(["p-[20px]"])
        assert css == r".p-\[20px\] { padding: 20px; }"

    def test_padding_axis(self):
        css = generate_arbitrary_css(["px-[10px]"])
        assert "padding-left: 10px;" in css
        assert "padding-right: 10px;" in css

    def test_margin(self):
        css = generate_arbitrary_css(["m-[8px]"])
        assert css == r".m-\[8px\] { margin: 8px; }"

    def test_gap(self):
        css = generate_arbitrary_css(["gap-[16px]"])
        assert css == r".gap-\[16px\] { gap: 16px; }"

    def test_gap_axis(self):
        css = generate_arbitrary_css(["gap-x-[12px]"])
        assert css == r".gap-x-\[12px\] { column-gap: 12px; }"

    def test_inset(self):
        css = generate_arbitrary_css(["top-[10px]"])
        assert css == r".top-\[10px\] { top: 10px; }"

    def test_rounded(self):
        css = generate_arbitrary_css(["rounded-[8px]"])
        assert css == r".rounded-\[8px\] { border-radius: 8px; }"

    def test_text_size(self):
        css = generate_arbitrary_css(["text-[18px]"])
        assert css == r".text-\[18px\] { font-size: 18px; }"

    def test_z_index(self):
        css = generate_arbitrary_css(["z-[50]"])
        assert css == r".z-\[50\] { z-index: 50; }"

    def test_opacity(self):
        css = generate_arbitrary_css(["opacity-[0.5]"])
        assert css == r".opacity-\[0\.5\] { opacity: 0.5; }"

    def test_rem_values(self):
        css = generate_arbitrary_css(["h-[10rem]"])
        assert css == r".h-\[10rem\] { height: 10rem; }"

    def test_percent_values(self):
        css = generate_arbitrary_css(["w-[50%]"])
        assert r"w-\[50\%\]" in css
        assert "width: 50%;" in css

    def test_ignores_standard_classes(self):
        css = generate_arbitrary_css(["p-4", "bg-blue-500", "h-80"])
        assert css == ""

    def test_ignores_unknown_prefixes(self):
        css = generate_arbitrary_css(["bg-[#ff0000]", "border-[#ccc]"])
        assert css == ""

    def test_deduplicates(self):
        css = generate_arbitrary_css(["h-[500px]", "h-[500px]"])
        assert css.count("h-") == 1

    def test_multiple_classes(self):
        css = generate_arbitrary_css(["h-[500px]", "w-[300px]"])
        assert r".h-\[500px\]" in css
        assert r".w-\[300px\]" in css

    def test_calc_values(self):
        css = generate_arbitrary_css(["h-[calc(100vh-64px)]"])
        assert "height: calc(100vh-64px);" in css


class TestCollectCssClasses:
    def test_from_component(self):
        from prefab_ui.components import Div

        classes = collect_css_classes(Div(css_class="h-[500px] p-4"))
        assert "h-[500px]" in classes
        assert "p-4" in classes

    def test_from_nested_component(self):
        from prefab_ui.components import Column, Div

        with Column(css_class="gap-4") as col:
            Div(css_class="w-[300px]")
        classes = collect_css_classes(col)
        assert "gap-4" in classes
        assert "w-[300px]" in classes

    def test_from_dict(self):
        classes = collect_css_classes({"type": "Div", "cssClass": "h-[500px]"})
        assert "h-[500px]" in classes

    def test_multiple_sources(self):
        from prefab_ui.components import Div

        a = Div(css_class="h-[500px]")
        b = Div(css_class="w-[800px]")
        classes = collect_css_classes(a, b)
        assert "h-[500px]" in classes
        assert "w-[800px]" in classes

    def test_invalid_source(self):

        with pytest.raises(TypeError, match="Expected a Component or dict"):
            collect_css_classes("not a component")


class TestPrefabAppIntegration:
    def test_html_includes_style_tag_for_arbitrary_values(self):
        from prefab_ui import PrefabApp
        from prefab_ui.components import Div

        app = PrefabApp(view=Div(css_class="h-[500px]"))
        html = app.html()
        assert "<style>" in html
        assert "height: 500px" in html

    def test_html_no_style_tag_when_no_arbitrary(self):
        from prefab_ui import PrefabApp
        from prefab_ui.components import Div

        app = PrefabApp(view=Div(css_class="p-4"))
        html = app.html()
        assert "prefab:arbitrary-css" not in html

    def test_extra_classes_in_wire_format(self):
        from prefab_ui import PrefabApp
        from prefab_ui.components import Div

        app = PrefabApp(
            view=Div(css_class="p-4"),
            extra_classes=["w-[800px]", "h-[600px]"],
        )
        wire = app.to_json()
        assert wire["extraClasses"] == ["w-[800px]", "h-[600px]"]

    def test_no_extra_classes_when_none(self):
        from prefab_ui import PrefabApp
        from prefab_ui.components import Div

        app = PrefabApp(view=Div(css_class="p-4"))
        wire = app.to_json()
        assert "extraClasses" not in wire

    def test_extra_classes_in_html(self):
        from prefab_ui import PrefabApp
        from prefab_ui.components import Div

        app = PrefabApp(
            view=Div(css_class="p-4"),
            extra_classes=["w-[800px]"],
        )
        html = app.html()
        assert "width: 800px" in html
