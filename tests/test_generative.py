"""Tests for generative UI — component introspection, guides, and sandbox execution."""

from __future__ import annotations

import shutil

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

_requires_deno = [
    pytest.mark.timeout(120),
    pytest.mark.skipif(
        shutil.which("deno") is None,
        reason="Deno not installed",
    ),
]


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

    def test_includes_args_from_docstring(self):
        from prefab_ui.components import Slider

        desc = describe_component("Slider", Slider)
        assert "Args:" in desc
        assert "min" in desc
        assert "max" in desc

    def test_no_fields_section(self):
        from prefab_ui.components import Slider

        desc = describe_component("Slider", Slider)
        assert "Fields:" not in desc


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

    def test_group_heading_has_import(self):
        result = search_components("Button", detail=False)
        assert "from prefab_ui.components import <name>" in result

    def test_compact_has_tags(self):
        result = search_components("Column")
        assert "container" in result

    def test_compact_no_fields(self):
        result = search_components("Slider", detail=False)
        assert "Fields:" not in result
        assert "Args:" not in result

    def test_query_filters(self):
        result = search_components("Text")
        assert "Text" in result
        assert "Slider" not in result

    def test_no_match(self):
        result = search_components("xyznonexistent")
        assert "No components matching" in result

    def test_case_insensitive(self):
        result = search_components("text", detail=False)
        assert "Text" in result

    def test_matches_description(self):
        result = search_components("status", detail=False)
        assert "Badge" in result


class TestSearchDetail:
    """detail=True: full docstrings and args."""

    def test_detail_includes_docstring(self):
        result = search_components("Slider", detail=True)
        assert "slider" in result.lower()

    def test_detail_includes_args(self):
        result = search_components("Slider", detail=True)
        assert "Args:" in result
        assert "min" in result
        assert "max" in result

    def test_detail_no_fields_section(self):
        result = search_components("Slider", detail=True)
        assert "Fields:" not in result

    def test_detail_with_query(self):
        result = search_components("Badge", detail=True)
        assert "1 components matching" in result

    def test_detail_has_group_heading(self):
        result = search_components("Badge", detail=True)
        assert "## Components" in result
        assert "from prefab_ui.components import <name>" in result

    def test_auto_detail_small_result(self):
        result = search_components("Badge")
        # 1 match should auto-escalate to detail
        assert "Args:" in result

    def test_auto_compact_large_result(self):
        result = search_components()
        # All components should stay compact
        assert "Args:" not in result

    def test_detail_default_limit(self):
        result = search_components("Chart", detail=True)
        assert "showing 8" in result

    def test_explicit_limit(self):
        result = search_components("Chart", detail=True, limit=3)
        assert "showing 3" in result

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

    def test_includes_prefab_ui(self):
        guides = list_guides()
        assert "prefab-ui" in guides


class TestGetGuide:
    def test_loads_prefab_ui(self):
        guide = get_guide("prefab-ui")
        assert "Prefab" in guide
        assert "PrefabApp" in guide

    def test_includes_reference_files(self):
        guide = get_guide("prefab-ui")
        # Should include content from references/ subdirectory
        assert "chart" in guide.lower()
        assert "form" in guide.lower()

    def test_unknown_guide_raises(self):
        with pytest.raises(ValueError, match="not found"):
            get_guide("nonexistent-guide")

    def test_error_lists_available(self):
        with pytest.raises(ValueError, match="prefab-ui"):
            get_guide("nonexistent-guide")


# ---------------------------------------------------------------------------
# Tool description
# ---------------------------------------------------------------------------


class TestExecuteDocstring:
    def test_has_docstring(self):
        doc = execute.__doc__
        assert doc is not None

    def test_mentions_prefab_app(self):
        doc = execute.__doc__
        assert doc is not None
        assert "PrefabApp" in doc

    def test_mentions_streaming(self):
        doc = execute.__doc__
        assert doc is not None
        assert "streaming" in doc.lower()

    def test_has_code_examples(self):
        doc = execute.__doc__
        assert doc is not None
        assert "PrefabApp()" in doc

    def test_explains_rx(self):
        doc = execute.__doc__
        assert doc is not None
        assert "Rx" in doc
        assert ".rx" in doc


# ---------------------------------------------------------------------------
# Sandbox execution
# ---------------------------------------------------------------------------


class TestExecute:
    pytestmark = _requires_deno

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
