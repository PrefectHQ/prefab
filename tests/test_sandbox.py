"""Tests for prefab_ui.sandbox."""

from __future__ import annotations

from unittest.mock import AsyncMock

import pytest

from prefab_ui.components import Column, Heading, Row
from prefab_ui.components.base import Component
from prefab_ui.sandbox import (
    MontySandboxProvider,
    execute,
    get_component_namespace,
)


class TestGetComponentNamespace:
    def test_returns_dict_of_types(self):
        ns = get_component_namespace()
        assert isinstance(ns, dict)
        assert all(isinstance(v, type) for v in ns.values())

    def test_contains_core_components(self):
        ns = get_component_namespace()
        for name in ["Column", "Row", "Text", "Heading", "Button", "Slider"]:
            assert name in ns, f"{name} missing from namespace"

    def test_contains_chart_components(self):
        ns = get_component_namespace()
        for name in ["BarChart", "LineChart", "PieChart"]:
            assert name in ns, f"{name} missing from namespace"

    def test_excludes_non_components(self):
        ns = get_component_namespace()
        assert "defer" not in ns
        assert "insert" not in ns
        assert "Rx" not in ns
        assert "DataTableColumn" not in ns

    def test_all_are_component_subclasses(self):
        ns = get_component_namespace()
        for name, cls in ns.items():
            if name == "Component":
                continue
            assert issubclass(cls, Component), f"{name} is not a Component subclass"


class TestExecute:
    async def test_calls_sandbox_with_namespace(self):
        mock_sandbox = AsyncMock()
        mock_sandbox.run.return_value = Column()

        await execute("root = Column()", sandbox=mock_sandbox)

        mock_sandbox.run.assert_called_once()
        call_kwargs = mock_sandbox.run.call_args
        assert call_kwargs.args[0] == "root = Column()"
        assert "Column" in call_kwargs.kwargs["external_functions"]

    async def test_passes_data_as_inputs(self):
        mock_sandbox = AsyncMock()
        mock_sandbox.run.return_value = Column()

        await execute(
            "root = Column()",
            data={"revenue": 1_200_000},
            sandbox=mock_sandbox,
        )

        call_kwargs = mock_sandbox.run.call_args
        assert call_kwargs.kwargs["inputs"] == {"revenue": 1_200_000}

    async def test_defaults_to_monty_provider(self):
        with pytest.raises(ImportError, match="pydantic-monty"):
            await execute("root = Column()")


class TestMontySandboxProvider:
    async def test_raises_import_error_without_monty(self):
        provider = MontySandboxProvider()
        with pytest.raises(ImportError, match="pydantic-monty"):
            await provider.run("x = 1")

    def test_stores_limits(self):
        limits = {"max_duration_secs": 5.0}
        provider = MontySandboxProvider(limits=limits)
        assert provider.limits == limits


class TestComponentNamespaceWorksWithParent:
    def test_namespace_components_support_parent_kwarg(self):
        ns = get_component_namespace()
        root = ns["Column"]()
        heading = ns["Heading"]("hello", parent=root)
        assert len(root.children) == 1
        assert root.children[0] is heading

    def test_simulated_generative_code(self):
        """Simulate what LLM-generated code does via the namespace."""
        ns = get_component_namespace()
        root = ns["Column"](gap=4)
        ns["Heading"]("Sales Report", parent=root)
        row = ns["Row"](parent=root)
        ns["Text"](content="Revenue: $1.2M", parent=row)
        ns["Text"](content="Growth: 15%", parent=row)

        assert len(root.children) == 2
        assert isinstance(root.children[0], Heading)
        assert isinstance(root.children[1], Row)
        assert len(root.children[1].children) == 2
