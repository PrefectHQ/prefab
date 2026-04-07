"""Tests for prefab_ui.sandbox — Pyodide WASM sandbox.

These are integration tests that run real code in a Deno/Pyodide
subprocess. They require Deno to be installed.
"""

from __future__ import annotations

import shutil

import pytest

from prefab_ui.sandbox import Sandbox

pytestmark = [
    pytest.mark.timeout(120),
    pytest.mark.skipif(
        shutil.which("deno") is None,
        reason="Deno not installed",
    ),
]


@pytest.fixture
async def sandbox():
    """Per-test sandbox with lazy start (auto-starts on first .run())."""
    sb = Sandbox()
    try:
        await sb._start()
    except RuntimeError as exc:
        if "failed to start" in str(exc):
            pytest.skip(f"Pyodide sandbox unavailable: {exc}")
        raise
    try:
        yield sb
    finally:
        sb._stop()


# ── Context managers ─────────────────────────────────────────────────


class TestContextManagers:
    async def test_basic(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.components import Column, Text
with Column() as view:
    Text("hello")
""")
        assert result["view"]["type"] == "Column"
        assert len(result["view"]["children"]) == 1
        assert result["view"]["children"][0]["content"] == "hello"

    async def test_nested(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.components import Column, Heading, Row, Text
with Column(gap=4) as view:
    Heading("Title")
    with Row():
        Text("left")
        Text("right")
""")
        assert result["view"]["cssClass"] == "gap-4"
        children = result["view"]["children"]
        assert len(children) == 2
        assert children[0]["type"] == "Heading"
        row = children[1]
        assert row["type"] == "Row"
        assert len(row["children"]) == 2

    async def test_deeply_nested(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.components import Column, Row, Card, CardContent, Text
with Column() as view:
    with Card():
        with CardContent():
            with Row():
                Text("deep")
""")
        card = result["view"]["children"][0]
        assert card["type"] == "Card"
        content = card["children"][0]
        assert content["type"] == "CardContent"
        row = content["children"][0]
        assert row["type"] == "Row"
        assert row["children"][0]["content"] == "deep"


# ── Reactive state (.rx) ────────────────────────────────────────────


class TestReactiveState:
    async def test_slider_rx(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.components import Column, Slider, Text
with Column() as view:
    slider = Slider(value=50, name="vol")
    Text(f"Value: {slider.rx}")
""")
        text = result["view"]["children"][1]
        assert text["content"] == "Value: {{ vol }}"

    async def test_rx_pipes(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.rx import Rx
from prefab_ui.components import Column, Text
with Column() as view:
    Text(f"{Rx('name').upper()}")
    Text(f"{Rx('balance').currency()}")
    Text(f"{Rx('items').length()}")
""")
        children = result["view"]["children"]
        assert children[0]["content"] == "{{ name | upper }}"
        assert children[1]["content"] == "{{ balance | currency }}"
        assert children[2]["content"] == "{{ items | length }}"

    async def test_rx_arithmetic(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.rx import Rx
from prefab_ui.components import Column, Text
with Column() as view:
    Text(f"{Rx('a') + Rx('b')}")
""")
        assert result["view"]["children"][0]["content"] == "{{ a + b }}"

    async def test_input_rx(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.components import Column, Input, Text
with Column() as view:
    inp = Input(name="query", placeholder="Search...")
    Text(f"Searching: {inp.rx}")
""")
        text = result["view"]["children"][1]
        assert "{{ query }}" in text["content"]


# ── PrefabApp ────────────────────────────────────────────────────────


class TestPrefabApp:
    async def test_with_state(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.components import Column, Heading
from prefab_ui.app import PrefabApp
with Column() as view:
    Heading("Dashboard")
app = PrefabApp(view=view, state={"count": 0})
""")
        assert result["state"] == {"count": 0}
        assert result["view"]["type"] == "Div"
        assert result["view"]["children"][0]["type"] == "Column"

    async def test_prefab_envelope(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.components import Column, Text
from prefab_ui.app import PrefabApp
with Column() as view:
    Text("hi")
app = PrefabApp(view=view)
""")
        assert "$prefab" in result
        assert result["$prefab"]["version"] == "0.2"

    async def test_bare_component_gets_envelope(self, sandbox: Sandbox):
        """A root Component (no PrefabApp) still gets the $prefab envelope."""
        result = await sandbox.run("""
from prefab_ui.components import Column, Text
with Column() as view:
    Text("hi")
""")
        assert "$prefab" in result
        assert "view" in result


# ── Data injection ───────────────────────────────────────────────────


class TestDataInjection:
    async def test_simple_values(self, sandbox: Sandbox):
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

    async def test_list_data(self, sandbox: Sandbox):
        result = await sandbox.run(
            """
from prefab_ui.components import Column, Text
with Column() as view:
    for item in items:
        Text(item)
""",
            data={"items": ["one", "two", "three"]},
        )
        children = result["view"]["children"]
        assert len(children) == 3
        assert [c["content"] for c in children] == ["one", "two", "three"]

    async def test_dict_data_computation(self, sandbox: Sandbox):
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
        heading = result["view"]["children"][0]
        assert heading["content"] == "Total: $2,000"
        assert len(result["view"]["children"]) == 3


# ── Charts ───────────────────────────────────────────────────────────


class TestCharts:
    async def test_bar_chart(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.components import Column
from prefab_ui.components.charts import BarChart, ChartSeries
with Column() as view:
    BarChart(
        data=[{"month": "Jan", "rev": 100}, {"month": "Feb", "rev": 200}],
        series=[ChartSeries(data_key="rev", label="Revenue")],
        x_axis="month",
    )
""")
        chart = result["view"]["children"][0]
        assert chart["type"] == "BarChart"
        assert len(chart["data"]) == 2
        assert chart["series"][0]["dataKey"] == "rev"

    async def test_sparkline(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.components import Column
from prefab_ui.components.charts import Sparkline
with Column() as view:
    Sparkline(data=[10, 20, 30, 25, 35], height=60)
""")
        spark = result["view"]["children"][0]
        assert spark["type"] == "Sparkline"
        assert spark["data"] == [10, 20, 30, 25, 35]


# ── parent= kwarg ───────────────────────────────────────────────────


class TestParentKwarg:
    async def test_basic(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.components import Column, Heading, Text
root = Column(gap=4)
Heading("Title", parent=root)
Text("Body", parent=root)
""")
        assert result["view"]["type"] == "Column"
        assert len(result["view"]["children"]) == 2

    async def test_nested(self, sandbox: Sandbox):
        result = await sandbox.run("""
from prefab_ui.components import Column, Row, Text
root = Column()
row = Row(parent=root)
Text("left", parent=row)
Text("right", parent=row)
""")
        row = result["view"]["children"][0]
        assert row["type"] == "Row"
        assert len(row["children"]) == 2


# ── Error handling ───────────────────────────────────────────────────


class TestErrors:
    async def test_syntax_error(self, sandbox: Sandbox):
        with pytest.raises(RuntimeError, match="SyntaxError"):
            await sandbox.run("def f(")

    async def test_runtime_error(self, sandbox: Sandbox):
        with pytest.raises(RuntimeError, match="ZeroDivisionError|division by zero"):
            await sandbox.run("x = 1 / 0")

    async def test_import_error(self, sandbox: Sandbox):
        with pytest.raises(RuntimeError, match="ModuleNotFoundError|No module"):
            await sandbox.run("import nonexistent_module")

    async def test_no_component(self, sandbox: Sandbox):
        with pytest.raises(RuntimeError, match="must assign"):
            await sandbox.run("x = 42")

    async def test_error_does_not_kill_sandbox(self, sandbox: Sandbox):
        """After an error, the sandbox still works for the next call."""
        with pytest.raises(RuntimeError):
            await sandbox.run("x = 1 / 0")

        result = await sandbox.run("""
from prefab_ui.components import Column, Text
with Column() as view:
    Text("recovered")
""")
        assert result["view"]["children"][0]["content"] == "recovered"


# ── Isolation ────────────────────────────────────────────────────────


class TestIsolation:
    async def test_variables_dont_leak(self, sandbox: Sandbox):
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

    async def test_component_stack_reset(self, sandbox: Sandbox):
        """Component stack is reset between runs."""
        r1 = await sandbox.run("""
from prefab_ui.components import Column, Text
with Column() as view:
    Text("run 1")
""")
        r2 = await sandbox.run("""
from prefab_ui.components import Column, Text
with Column() as view:
    Text("run 2")
""")
        assert r1["view"]["children"][0]["content"] == "run 1"
        assert r2["view"]["children"][0]["content"] == "run 2"
        assert len(r2["view"]["children"]) == 1


# ── Lifecycle ────────────────────────────────────────────────────────


class TestLifecycle:
    async def test_multiple_runs(self, sandbox: Sandbox):
        for i in range(5):
            result = await sandbox.run(f"""
from prefab_ui.components import Column, Text
with Column() as view:
    Text("run {i}")
""")
            assert result["view"]["children"][0]["content"] == f"run {i}"

    async def test_lazy_start(self):
        """Sandbox starts lazily on first run() without context manager."""
        sandbox = Sandbox()
        try:
            result = await sandbox.run("""
from prefab_ui.components import Column, Text
with Column() as view:
    Text("lazy")
""")
            assert result["view"]["children"][0]["content"] == "lazy"
        finally:
            sandbox._stop()
