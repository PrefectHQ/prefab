"""Tests for generative UI — component introspection, guides, and sandbox execution."""

from __future__ import annotations

import pytest

from prefab_ui.app import PrefabApp
from prefab_ui.generative import (
    describe_component,
    execute,
    get_all_components,
    get_guide,
    list_guides,
    search_components,
)


@pytest.fixture
async def sandbox():
    from prefab_ui.sandbox import Sandbox

    sb = Sandbox()
    try:
        yield sb
    finally:
        sb._stop()


# ---------------------------------------------------------------------------
# Component introspection
# ---------------------------------------------------------------------------


class TestGetAllComponents:
    def test_discovers_components(self):
        components = get_all_components()
        assert len(components) > 10
        assert "Text" in components
        assert "Column" in components
        assert "Heading" in components

    def test_includes_charts(self):
        components = get_all_components()
        assert "BarChart" in components or "LineChart" in components

    def test_excludes_base_class(self):
        from prefab_ui.components.base import Component

        components = get_all_components()
        assert Component not in components.values()

    def test_all_are_component_subclasses(self):
        from prefab_ui.components.base import Component

        for name, cls in get_all_components().items():
            assert issubclass(cls, Component), f"{name} is not a Component"


class TestDescribeComponent:
    def test_includes_name(self):
        from prefab_ui.components import Text

        desc = describe_component("Text", Text)
        assert desc.startswith("Text")

    def test_includes_import_path(self):
        from prefab_ui.components import Text

        desc = describe_component("Text", Text)
        assert "from prefab_ui.components" in desc
        assert "import Text" in desc

    def test_container_tag(self):
        from prefab_ui.components import Column

        desc = describe_component("Column", Column)
        assert "container" in desc

    def test_stateful_tag(self):
        from prefab_ui.components import Slider

        desc = describe_component("Slider", Slider)
        assert "stateful" in desc

    def test_includes_docstring(self):
        from prefab_ui.components import Slider

        desc = describe_component("Slider", Slider)
        assert "slider" in desc.lower()

    def test_includes_fields_section(self):
        from prefab_ui.components import Slider

        desc = describe_component("Slider", Slider)
        assert "Fields:" in desc
        assert "min" in desc
        assert "max" in desc

    def test_skips_internal_fields(self):
        from prefab_ui.components import Column

        desc = describe_component("Column", Column)
        lines = desc.split("\n")
        field_lines = [line.strip() for line in lines if line.startswith("    ")]
        field_names = [line.split(":")[0] for line in field_lines if ":" in line]
        assert "type" not in field_names
        assert "children" not in field_names


# ---------------------------------------------------------------------------
# Search — two-tiered
# ---------------------------------------------------------------------------


class TestSearchCompact:
    """Default mode: compact one-line-per-component listing."""

    def test_empty_query_returns_all(self):
        result = search_components()
        assert "components:" in result.split("\n")[0]
        # Should have many lines (one per component)
        assert result.count("\n") > 10

    def test_compact_has_import_path(self):
        result = search_components("Button")
        assert "from prefab_ui" in result
        assert "import Button" in result

    def test_compact_has_tags(self):
        result = search_components("Column")
        assert "container" in result

    def test_compact_no_fields(self):
        result = search_components("Slider")
        # Compact mode should NOT list individual fields
        assert "Fields:" not in result

    def test_query_filters(self):
        result = search_components("Text")
        assert "Text" in result
        assert "Slider" not in result

    def test_no_match(self):
        result = search_components("xyznonexistent")
        assert "No components matching" in result

    def test_case_insensitive(self):
        result = search_components("text")
        assert "Text" in result


class TestSearchDetail:
    """detail=True: full docstrings and field listings."""

    def test_detail_includes_docstring(self):

        result = search_components("Slider", detail=True)
        # Should include the class docstring
        assert "slider" in result.lower()

    def test_detail_includes_fields(self):
        result = search_components("Slider", detail=True)
        assert "Fields:" in result
        assert "min" in result
        assert "max" in result

    def test_detail_with_query(self):
        result = search_components("Badge", detail=True)
        assert "1 components matching" in result
        assert "Fields:" in result

    def test_accepts_preloaded_components(self):
        from prefab_ui.components import Text

        result = search_components("Text", components={"Text": Text})
        assert "1 components matching" in result


# ---------------------------------------------------------------------------
# Guides
# ---------------------------------------------------------------------------


class TestListGuides:
    def test_returns_list(self):
        guides = list_guides()
        assert isinstance(guides, list)

    def test_includes_writing_prefab_python(self):
        guides = list_guides()
        assert "writing-prefab-python" in guides


class TestGetGuide:
    def test_loads_writing_prefab_python(self):
        guide = get_guide("writing-prefab-python")
        assert "Prefab" in guide
        assert "PrefabApp" in guide or "UIResponse" in guide

    def test_includes_reference_files(self):
        guide = get_guide("generative-prefab-ui")
        # Should include content from references/ subdirectory
        assert "expressions" in guide.lower()
        assert "actions" in guide.lower()

    def test_unknown_guide_raises(self):
        with pytest.raises(ValueError, match="not found"):
            get_guide("nonexistent-guide")

    def test_error_lists_available(self):
        with pytest.raises(ValueError, match="writing-prefab-python"):
            get_guide("nonexistent-guide")


# ---------------------------------------------------------------------------
# Tool description
# ---------------------------------------------------------------------------


class TestExecuteDocstring:
    def test_has_docstring(self):
        assert execute.__doc__

    def test_mentions_prefab_app(self):
        assert "PrefabApp" in execute.__doc__

    def test_mentions_streaming(self):
        assert "streaming" in execute.__doc__.lower()

    def test_has_code_examples(self):
        assert "PrefabApp()" in execute.__doc__

    def test_explains_rx(self):
        assert "Rx" in execute.__doc__
        assert ".rx" in execute.__doc__


# ---------------------------------------------------------------------------
# Sandbox execution
# ---------------------------------------------------------------------------


class TestExecute:
    async def test_basic_execution(self, sandbox):
        app = await execute(
            'from prefab_ui.components import Text\nview = Text("hello")',
            sandbox=sandbox,
        )
        j = app.to_json()
        assert j["view"]["children"][0]["content"] == "hello"

    async def test_with_data(self, sandbox):
        app = await execute(
            'from prefab_ui.components import Text\nview = Text(f"Hello {name}")',
            data={"name": "Alice"},
            sandbox=sandbox,
        )
        j = app.to_json()
        assert j["view"]["children"][0]["content"] == "Hello Alice"

    async def test_execution_error_raises_value_error(self, sandbox):
        with pytest.raises(ValueError, match="Code execution failed"):
            await execute("raise RuntimeError('boom')", sandbox=sandbox)

    async def test_returns_prefab_app(self, sandbox):
        app = await execute(
            'from prefab_ui.components import Text\nview = Text("hi")',
            sandbox=sandbox,
        )
        assert isinstance(app, PrefabApp)
