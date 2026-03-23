"""Tests for prefab_ui.sandbox."""

from __future__ import annotations

import pytest

from prefab_ui.components import Column, Heading, Row, Text
from prefab_ui.components.base import ContainerComponent
from prefab_ui.sandbox import ComponentRegistry, build_namespace, execute


class TestComponentRegistry:
    def test_store_and_get(self):
        reg = ComponentRegistry()
        col = Column()
        handle = reg.store(col)
        assert reg.get(handle) is col

    def test_handles_are_sequential(self):
        reg = ComponentRegistry()
        h0 = reg.store(Column())
        h1 = reg.store(Text(content="a"))
        h2 = reg.store(Text(content="b"))
        assert (h0, h1, h2) == (0, 1, 2)


class TestBuildNamespace:
    def test_contains_core_components(self):
        _, ns = build_namespace()
        for name in ["Column", "Row", "Text", "Heading", "Button", "Slider"]:
            assert name in ns, f"{name} missing from namespace"

    def test_contains_chart_components(self):
        _, ns = build_namespace()
        for name in ["BarChart", "LineChart", "PieChart"]:
            assert name in ns, f"{name} missing from namespace"

    def test_excludes_non_components(self):
        _, ns = build_namespace()
        assert "defer" not in ns
        assert "insert" not in ns
        assert "Rx" not in ns

    def test_shim_returns_int_handle(self):
        reg, ns = build_namespace()
        handle = ns["Column"](gap=4)
        assert isinstance(handle, int)
        col = reg.get(handle)
        assert isinstance(col, Column)

    def test_shim_resolves_parent_handle(self):
        reg, ns = build_namespace()
        root_handle = ns["Column"](gap=4)
        ns["Heading"]("hello", parent=root_handle)
        root = reg.get(root_handle)
        assert isinstance(root, ContainerComponent)
        assert len(root.children) == 1
        assert isinstance(root.children[0], Heading)

    def test_shim_parent_type_error(self):
        _, ns = build_namespace()
        text_handle = ns["Text"](content="leaf")
        with pytest.raises(TypeError, match="container component"):
            ns["Text"](content="child", parent=text_handle)

    def test_extra_functions_included(self):
        _, ns = build_namespace(extra={"my_func": lambda: 42})
        assert "my_func" in ns
        assert ns["my_func"]() == 42

    def test_full_tree_building(self):
        reg, ns = build_namespace()
        root = ns["Column"](gap=4)
        ns["Heading"]("Sales Report", parent=root)
        row = ns["Row"](parent=root)
        ns["Text"](content="Revenue", parent=row)
        ns["Text"](content="Growth", parent=row)

        root_component = reg.get(root)
        assert isinstance(root_component, ContainerComponent)
        assert len(root_component.children) == 2
        assert isinstance(root_component.children[0], Heading)
        assert isinstance(root_component.children[1], Row)
        assert len(root_component.children[1].children) == 2

    def test_shared_registry(self):
        reg = ComponentRegistry()
        _, ns = build_namespace(registry=reg)
        handle = ns["Column"]()
        assert reg.get(handle) is not None


class TestExecuteWithMonty:
    async def test_basic_tree(self):
        root = await execute("""
root = Column(gap=4)
Heading('Sales Report', parent=root)
Text(content='Revenue: $1.2M', parent=root)
return root
""")
        assert isinstance(root, Column)
        assert len(root.children) == 2
        assert isinstance(root.children[0], Heading)

    async def test_nested_tree(self):
        root = await execute("""
root = Column()
row = Row(parent=root)
Text(content='left', parent=row)
Text(content='right', parent=row)
return root
""")
        assert isinstance(root, Column)
        assert len(root.children) == 1
        row = root.children[0]
        assert isinstance(row, Row)
        assert len(row.children) == 2

    async def test_with_data(self):
        root = await execute(
            """
root = Column()
Text(content=message, parent=root)
return root
""",
            data={"message": "hello from data"},
        )
        assert isinstance(root, Column)
        assert root.children[0].content == "hello from data"  # type: ignore[attr-defined]

    async def test_serializes_to_valid_json(self):
        root = await execute("""
root = Column(gap=4)
Heading('Title', parent=root)
return root
""")
        j = root.to_json()
        assert j["type"] == "Column"
        assert j["cssClass"] == "gap-4"
        assert len(j["children"]) == 1
        assert j["children"][0]["type"] == "Heading"
