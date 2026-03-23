"""Tests for prefab_ui.sandbox — Pyodide WASM sandbox."""

from __future__ import annotations

import pytest

from prefab_ui.sandbox import Sandbox


@pytest.fixture
async def sandbox():
    async with Sandbox() as sb:
        yield sb


class TestSandbox:
    async def test_basic_component(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.components import Column, Text
with Column() as view:
    Text("hello")
""")
        assert result["view"]["type"] == "Column"
        assert len(result["view"]["children"]) == 1
        assert result["view"]["children"][0]["content"] == "hello"

    async def test_context_managers(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.components import Column, Heading, Row, Text
with Column(gap=4) as view:
    Heading("Title")
    with Row():
        Text("left")
        Text("right")
""")
        assert result["view"]["cssClass"] == "gap-4"
        assert len(result["view"]["children"]) == 2
        row = result["view"]["children"][1]
        assert row["type"] == "Row"
        assert len(row["children"]) == 2

    async def test_rx_and_dot_rx(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.components import Column, Slider, Text
with Column() as view:
    slider = Slider(value=50, name="vol")
    Text(f"Value: {slider.rx}")
""")
        text = result["view"]["children"][1]
        assert "{{ vol }}" in text["content"]

    async def test_rx_pipes(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.rx import Rx
from prefab_ui.components import Column, Text
with Column() as view:
    Text(f"{Rx('name').upper()}")
    Text(f"{Rx('balance').currency()}")
""")
        children = result["view"]["children"]
        assert children[0]["content"] == "{{ name | upper }}"
        assert children[1]["content"] == "{{ balance | currency }}"

    async def test_prefab_app_with_state(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.components import Column, Heading
from prefab_ui.app import PrefabApp
with Column() as view:
    Heading("Dashboard")
app = PrefabApp(view=view, state={"count": 0})
""")
        assert result["state"] == {"count": 0}
        assert result["view"]["type"] == "Column"

    async def test_data_injection(self, sandbox: Sandbox):
        result = await sandbox.run(
            """
from prefab_ui.components import Column, Text
with Column() as view:
    Text(f"Hello {name}, you have {count} items")
""",
            data={"name": "Alice", "count": 42},
        )
        text = result["view"]["children"][0]
        assert text["content"] == "Hello Alice, you have 42 items"

    async def test_data_computation(self, sandbox: Sandbox):
        result = await sandbox.run(
            """
from prefab_ui.components import Column, Heading, Text
total = sum(r["revenue"] for r in regions)
with Column() as view:
    Heading(f"Total: ${total:,}")
    for r in regions:
        Text(f"{r['name']}: ${r['revenue']:,}")
""",
            data={
                "regions": [
                    {"name": "NA", "revenue": 1200},
                    {"name": "EU", "revenue": 800},
                ]
            },
        )
        assert result["view"]["children"][0]["content"] == "Total: $2,000"
        assert len(result["view"]["children"]) == 3

    async def test_parent_kwarg(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.components import Column, Heading, Text
root = Column(gap=4)
Heading("Title", parent=root)
Text("Body", parent=root)
""")
        assert result["view"]["type"] == "Column"
        assert len(result["view"]["children"]) == 2

    async def test_error_raises(self, sandbox: Sandbox):
        with pytest.raises(RuntimeError, match="ZeroDivisionError|division by zero"):
            await sandbox.run("x = 1 / 0")

    async def test_no_component_raises(self, sandbox: Sandbox):
        with pytest.raises(RuntimeError, match="must assign"):
            await sandbox.run("x = 42")

    async def test_multiple_runs_same_sandbox(self, sandbox: Sandbox):
        r1 = await sandbox.run("""
from prefab_ui.components import Column, Text
with Column() as view:
    Text("first")
""")
        r2 = await sandbox.run("""
from prefab_ui.components import Column, Text
with Column() as view:
    Text("second")
""")
        assert r1["view"]["children"][0]["content"] == "first"
        assert r2["view"]["children"][0]["content"] == "second"

    async def test_isolation_between_runs(self, sandbox: Sandbox):
        """Variables from one run don't leak into the next."""
        await sandbox.run("""
from prefab_ui.components import Column, Text
secret = "leaked"
with Column() as view:
    Text("first")
""")
        with pytest.raises(RuntimeError):
            await sandbox.run("""
from prefab_ui.components import Column, Text
with Column() as view:
    Text(secret)
""")
