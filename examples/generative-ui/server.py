"""Generative UI demo server.

Two tools:
- execute_ui: takes Prefab Python code, runs it in a Pyodide sandbox, renders the result
- components: search/browse the Prefab component library

Run with:
    cd examples/generative-ui && uv run server.py
"""

from __future__ import annotations

import json
from typing import Any

from fastmcp import FastMCP

from prefab_ui.app import PrefabApp
from prefab_ui.components.base import Component, ContainerComponent, StatefulMixin
from prefab_ui.sandbox import Sandbox

mcp = FastMCP("Generative UI")
sandbox = Sandbox()


# ── Component registry for the search tool ───────────────────────────


def _get_all_components() -> dict[str, type[Component]]:
    import prefab_ui.components
    import prefab_ui.components.charts

    result: dict[str, type[Component]] = {}
    for module in (prefab_ui.components, prefab_ui.components.charts):
        names = getattr(module, "__all__", None) or [
            n for n in dir(module) if not n.startswith("_")
        ]
        for name in names:
            obj = getattr(module, name)
            if (
                isinstance(obj, type)
                and issubclass(obj, Component)
                and obj is not Component
            ):
                result[name] = obj
    return result


def _describe_component(name: str, cls: type[Component]) -> str:
    """One-line summary + fields for a component."""
    parts = [name]

    tags: list[str] = []
    if issubclass(cls, ContainerComponent):
        tags.append("container")
    if issubclass(cls, StatefulMixin):
        tags.append("stateful")
    if tags:
        parts[0] += f" ({', '.join(tags)})"

    parts.append(f"  from {cls.__module__} import {name}")

    doc = (cls.__doc__ or "").strip().split("\n")[0]
    if doc:
        parts.append(f"  {doc}")

    for field_name, info in cls.model_fields.items():
        if field_name in ("type", "css_class", "id", "children", "let"):
            continue
        desc = info.description or ""
        anno = str(info.annotation).replace("typing.", "")
        line = f"  {field_name}: {anno}"
        if desc:
            line += f" — {desc[:80]}"
        parts.append(line)

    return "\n".join(parts)


ALL_COMPONENTS = _get_all_components()


# ── Tools ────────────────────────────────────────────────────────────


@mcp.tool(app=True)
async def execute_ui(
    code: str,
    data: str | dict[str, Any] | None = None,
) -> PrefabApp:
    """Execute Prefab Python code in a sandbox and render the result.

    The code runs in a Pyodide WASM sandbox with full Python support.
    You must import everything you use. Use the `components` tool to
    look up available components and their correct import paths.

    Key patterns:

    1. Use PrefabApp as a context manager — it's the root of your app:

    ```python
    from prefab_ui.components import Heading, Text, Row, Badge
    from prefab_ui.app import PrefabApp

    with PrefabApp(css_class="p-6") as app:
        Heading("Dashboard")
        with Row(gap=2):
            Text("Revenue: $1.2M")
            Badge("On Track", variant="success")
    ```

    2. For interactive UIs, use stateful components and .rx for
       reactive bindings. Set initial state on PrefabApp:

    ```python
    from prefab_ui.components import Heading, Slider, Text
    from prefab_ui.app import PrefabApp

    with PrefabApp(state={"threshold": 50}, css_class="p-6") as app:
        Heading("Controls")
        slider = Slider(value=50, min=0, max=100, name="threshold")
        Text(f"Threshold: {slider.rx}%")
    ```

    3. Charts are in prefab_ui.components.charts:

    ```python
    from prefab_ui.components.charts import BarChart, ChartSeries

    BarChart(
        data=[{"month": "Jan", "rev": 100}, {"month": "Feb", "rev": 200}],
        series=[ChartSeries(data_key="rev", label="Revenue")],
        x_axis="month",
    )
    ```

    4. Data values passed via the `data` parameter are available as
       global variables in your code. Use Python freely — loops,
       f-strings, computation, list comprehensions all work.
    """
    # Normalize data — some clients send "" instead of null
    if isinstance(data, str):
        if data.strip():
            data = json.loads(data)
        else:
            data = None

    try:
        wire = await sandbox.run(code, data=data)
    except RuntimeError as exc:
        raise ValueError(f"Code execution failed: {exc}") from exc

    return PrefabApp.from_json(wire)


@mcp.tool()
def components(query: str = "") -> str:
    """Search the Prefab component library.

    Returns component names, descriptions, and their fields.
    Pass a query to filter by name, or leave empty for the full catalog.
    """
    q = query.lower()
    matches = {
        name: cls for name, cls in ALL_COMPONENTS.items() if not q or q in name.lower()
    }

    if not matches:
        return f"No components matching '{query}'. Try a broader search."

    sections = [_describe_component(name, cls) for name, cls in sorted(matches.items())]
    header = (
        f"{len(matches)} components"
        if not q
        else f"{len(matches)} components matching '{query}'"
    )
    return f"{header}:\n\n" + "\n\n".join(sections)


if __name__ == "__main__":
    mcp.run(transport="http")
