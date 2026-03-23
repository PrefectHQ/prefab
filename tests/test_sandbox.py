"""Tests for prefab_ui.sandbox."""

from __future__ import annotations

import pytest

from prefab_ui.app import PrefabApp
from prefab_ui.components import Column, Heading, Row, Slider, Text
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

    def test_resolve_handle_from_dict(self):
        reg = ComponentRegistry()
        col = Column()
        handle = reg.store(col)
        assert reg.resolve_handle({"_handle": handle}) is col

    def test_resolve_handle_from_int(self):
        reg = ComponentRegistry()
        col = Column()
        handle = reg.store(col)
        assert reg.resolve_handle(handle) is col


class TestBuildNamespace:
    def test_contains_core_components(self):
        _, ns = build_namespace()
        for name in ["Column", "Row", "Text", "Heading", "Button", "Slider"]:
            assert name in ns, f"{name} missing from namespace"

    def test_contains_chart_components(self):
        _, ns = build_namespace()
        for name in ["BarChart", "LineChart", "PieChart"]:
            assert name in ns, f"{name} missing from namespace"

    def test_contains_prefab_app(self):
        _, ns = build_namespace()
        assert "PrefabApp" in ns

    def test_shim_returns_dict_handle(self):
        reg, ns = build_namespace()
        handle = ns["Column"](gap=4)
        assert isinstance(handle, dict)
        assert "_handle" in handle
        col = reg.resolve_handle(handle)
        assert isinstance(col, Column)

    def test_stateful_shim_includes_rx(self):
        reg, ns = build_namespace()
        root = ns["Column"]()
        slider = ns["Slider"](value=50, parent=root)
        assert "rx" in slider
        assert "name" in slider
        assert slider["rx"].startswith("{{")

    def test_non_stateful_shim_omits_rx(self):
        _, ns = build_namespace()
        handle = ns["Column"](gap=4)
        assert "rx" not in handle

    def test_shim_resolves_parent_handle(self):
        reg, ns = build_namespace()
        root = ns["Column"](gap=4)
        ns["Heading"]("hello", parent=root)
        root_comp = reg.resolve_handle(root)
        assert isinstance(root_comp, ContainerComponent)
        assert len(root_comp.children) == 1
        assert isinstance(root_comp.children[0], Heading)

    def test_shim_parent_type_error(self):
        _, ns = build_namespace()
        text = ns["Text"](content="leaf")
        with pytest.raises(TypeError, match="container component"):
            ns["Text"](content="child", parent=text)

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

        root_comp = reg.resolve_handle(root)
        assert isinstance(root_comp, ContainerComponent)
        assert len(root_comp.children) == 2
        assert isinstance(root_comp.children[0], Heading)
        assert isinstance(root_comp.children[1], Row)
        assert len(root_comp.children[1].children) == 2

    def test_prefab_app_shim(self):
        reg, ns = build_namespace()
        root = ns["Column"](gap=4)
        ns["Heading"]("Title", parent=root)
        app_handle = ns["PrefabApp"](view=root, state={"count": 0})
        app = reg.resolve_handle(app_handle)
        assert isinstance(app, PrefabApp)
        assert app.state == {"count": 0}
        assert isinstance(app.view, Column)
        assert len(app.view.children) == 1

    def test_reactive_reference_pattern(self):
        reg, ns = build_namespace()
        root = ns["Column"]()
        slider = ns["Slider"](value=50, parent=root)
        ns["Text"](content="Value: " + slider["rx"], parent=root)

        root_comp = reg.resolve_handle(root)
        assert isinstance(root_comp, ContainerComponent)
        text = root_comp.children[1]
        assert "{{" in text.content


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

    async def test_reactive_slider(self):
        root = await execute("""
root = Column()
slider = Slider(value=50, parent=root)
Text(content='Value: ' + slider['rx'], parent=root)
return root
""")
        assert isinstance(root, Column)
        assert len(root.children) == 2
        assert isinstance(root.children[0], Slider)
        text = root.children[1]
        assert "{{" in text.content  # type: ignore[attr-defined]

    async def test_prefab_app_with_state(self):
        app = await execute("""
root = Column(gap=4)
Heading('Dashboard', parent=root)
return PrefabApp(view=root, state={"count": 0})
""")
        assert isinstance(app, PrefabApp)
        assert app.state == {"count": 0}
        j = app.to_json()
        assert j["state"] == {"count": 0}
        assert j["view"]["type"] == "Column"

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
