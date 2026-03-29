"""Generative UI — component introspection, sandbox execution, and guides.

Prefab-side business logic for generative UI features. This module
provides the functions and descriptions that MCP servers (like FastMCP's
`GenerativeUI` provider) wrap as tools and resources.

**Component introspection:**

```python
from prefab_ui.generative import search_components

# Compact catalog
print(search_components())

# Detailed view for specific components
print(search_components("Chart", detail=True))
```

**Sandbox execution:**

```python
from prefab_ui.generative import execute
app = await execute('from prefab_ui.components import Text; Text("hi")')
```

**Coding guides:**

```python
from prefab_ui.generative import get_guide
print(get_guide("writing-prefab-python"))
```
"""

from __future__ import annotations

import inspect
from pathlib import Path
from typing import Any

from prefab_ui.app import PrefabApp
from prefab_ui.components.base import Component, ContainerComponent, StatefulMixin

RESOURCE_URI = "ui://prefab/generative.html"
MIME_TYPE = "text/html;profile=mcp-app"

_SKILLS_DIR = Path(__file__).parent.parent.parent / "skills"

__all__ = [
    "MIME_TYPE",
    "RESOURCE_URI",
    "describe_component",
    "execute",
    "get_all_components",
    "get_guide",
    "list_guides",
    "search_components",
]


# ---------------------------------------------------------------------------
# Component introspection
# ---------------------------------------------------------------------------


def get_all_components() -> dict[str, type[Component]]:
    """Discover all Prefab component classes from the public API."""
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


def _import_path(name: str, cls: type[Component]) -> str:
    """Resolve the shortest public import path for a component."""
    import prefab_ui.components
    import prefab_ui.components.charts

    for module in (prefab_ui.components, prefab_ui.components.charts):
        if getattr(module, name, None) is cls:
            return f"from {module.__name__} import {name}"
    return f"from {cls.__module__} import {name}"


def _first_doc_line(cls: type[Component]) -> str:
    """Extract the first line of a component's docstring."""
    doc = inspect.getdoc(cls)
    return (doc or "").split("\n")[0].rstrip(".")


def _summarize_component(name: str, cls: type[Component]) -> str:
    """Compact summary: Name (tags) — description."""
    tags: list[str] = []
    if issubclass(cls, ContainerComponent):
        tags.append("container")
    if issubclass(cls, StatefulMixin):
        tags.append("stateful")
    tag_str = f" ({', '.join(tags)})" if tags else ""

    first_line = _first_doc_line(cls)
    desc = f" — {first_line}." if first_line else ""

    return f"{name}{tag_str}{desc}"


def describe_component(name: str, cls: type[Component]) -> str:
    """Full component description: tags and docstring."""
    parts = [name]

    tags: list[str] = []
    if issubclass(cls, ContainerComponent):
        tags.append("container")
    if issubclass(cls, StatefulMixin):
        tags.append("stateful")
    if tags:
        parts[0] += f" ({', '.join(tags)})"

    doc = inspect.getdoc(cls)
    if doc:
        parts.append(f"  {doc}")

    return "\n".join(parts)


def _group_by_module(
    components: dict[str, type[Component]],
) -> dict[str, dict[str, type[Component]]]:
    """Group components by their import module."""
    groups: dict[str, dict[str, type[Component]]] = {}
    for name, cls in sorted(components.items()):
        path = _import_path(name, cls)
        module = path.split(" import ")[0].replace("from ", "")
        groups.setdefault(module, {})[name] = cls
    return groups


def _module_heading(module: str) -> str:
    """Convert a module path to a section heading."""
    return module.split(".")[-1].title()


_AUTO_DETAIL_THRESHOLD = 5
_DEFAULT_DETAIL_LIMIT = 8


def search_components(
    query: str = "",
    *,
    detail: bool | None = None,
    limit: int | None = None,
    components: dict[str, type[Component]] | None = None,
) -> str:
    """Search the Prefab component library.

    Use this tool to look up exact argument names, accepted values,
    and usage examples before writing component code. The skill
    covers patterns and layout; this tool has the API details.

    The query matches component names and descriptions.
    Space-separated terms match independently, so
    `"Card Badge Metric"` returns all three.

    When a query matches a small number of components, full details
    (docstrings, args, examples) are shown automatically. For broad
    searches, a compact listing is returned instead. Use `detail` to
    override this behavior.

    Args:
        query: Filter by component name or description.
            Space-separated terms are OR-matched.
        detail: Show full docstrings and args. Defaults to automatic
            (detailed for ≤5 matches, compact otherwise).
        limit: Max components to return in detail mode (default 8).
            No limit in compact mode.
    """
    if components is None:
        components = get_all_components()

    terms = query.lower().split()
    matches = {
        name: cls
        for name, cls in components.items()
        if not terms
        or any(t in name.lower() or t in _first_doc_line(cls).lower() for t in terms)
    }
    if not matches:
        return f"No components matching '{query}'. Try a broader search."

    # Resolve detail mode: auto-escalate for small result sets.
    use_detail = (
        detail if detail is not None else len(matches) <= _AUTO_DETAIL_THRESHOLD
    )

    # Apply limit in detail mode.
    if use_detail and limit is None:
        limit = _DEFAULT_DETAIL_LIMIT
    total = len(matches)
    if limit is not None and len(matches) > limit:
        matches = dict(sorted(matches.items())[:limit])

    header = (
        f"{total} components" if not terms else f"{total} components matching '{query}'"
    )
    if limit is not None and total > limit:
        header += f" (showing {limit})"

    groups = _group_by_module(matches)
    sections: list[str] = [header + ":"]

    for module, group in groups.items():
        heading = _module_heading(module)
        sections.append(f"\n## {heading}")
        sections.append(f"Import: `from {module} import <name>`")

        if use_detail:
            entries = [describe_component(name, cls) for name, cls in group.items()]
            sections.append("\n" + "\n\n".join(entries))
        else:
            lines = [_summarize_component(name, cls) for name, cls in group.items()]
            sections.append("\n".join(lines))

    return "\n".join(sections)


# ---------------------------------------------------------------------------
# Coding guides
# ---------------------------------------------------------------------------


def list_guides() -> list[str]:
    """Return available guide names.

    Guides are Prefab coding references that explain how to write
    effective Prefab code — the Python DSL, wire protocol, expressions,
    actions, and more.
    """
    if not _SKILLS_DIR.is_dir():
        return []
    return sorted(d.name for d in _SKILLS_DIR.iterdir() if (d / "SKILL.md").is_file())


def get_guide(name: str) -> str:
    """Load a Prefab coding guide by name.

    Returns the raw guide content (markdown with frontmatter) as a
    single string, with any reference files appended.
    Use `list_guides()` to see available names.
    """
    skill_dir = _SKILLS_DIR / name
    skill_file = skill_dir / "SKILL.md"
    if not skill_file.is_file():
        available = list_guides()
        raise ValueError(
            f"Guide {name!r} not found. Available: {', '.join(available) or '(none)'}"
        )

    parts = [skill_file.read_text(encoding="utf-8")]

    refs_dir = skill_dir / "references"
    if refs_dir.is_dir():
        for ref_file in sorted(refs_dir.glob("*.md")):
            parts.append(ref_file.read_text(encoding="utf-8"))

    return "\n\n".join(parts)


# ---------------------------------------------------------------------------
# Sandbox execution
# ---------------------------------------------------------------------------


async def execute(
    code: str,
    *,
    data: dict[str, Any] | None = None,
    sandbox: Any | None = None,
) -> PrefabApp:
    """Execute Prefab Python code in a sandbox and render the result.

    The code runs in a Pyodide WASM sandbox with full Python support.
    Import everything you use. Use the `components` tool to look up
    available components and their import paths.

    Always use PrefabApp as the outermost context manager — this enables
    streaming so the UI renders progressively as code is written:

    ```python
    from prefab_ui.components import Column, Heading, Text, Row, Badge
    from prefab_ui.app import PrefabApp

    with PrefabApp() as app:
        with Column(gap=4):
            Heading("Dashboard")
            with Row(gap=2):
                Text("Revenue: $1.2M")
                Badge("On Track", variant="success")
    ```

    For interactive UIs, pass initial state as a dict and use `.rx`
    on stateful components for reactive bindings:

    ```python
    from prefab_ui.components import Column, Slider, Text
    from prefab_ui.app import PrefabApp

    with PrefabApp(state={"threshold": 50}) as app:
        with Column(gap=4):
            slider = Slider(value=50, min=0, max=100, name="threshold")
            Text(f"Threshold: {slider.rx}%")
    ```

    `slider.rx` produces `{{ threshold }}`, a template expression
    that resolves against client-side state. Use `Rx("key")` directly,
    or apply pipe filters: `Rx("balance").currency()` produces
    `{{ balance | currency }}`.

    Available pipes: upper, lower, currency, length, json, round(n),
    default(val), truncate(n).

    Charts live in `prefab_ui.components.charts`:

    ```python
    from prefab_ui.components.charts import BarChart, ChartSeries

    BarChart(
        data=[{"month": "Jan", "rev": 100}, {"month": "Feb", "rev": 200}],
        series=[ChartSeries(data_key="rev", label="Revenue")],
        x_axis="month",
    )
    ```

    Values passed via `data` are available as global variables in the
    code. Python features like loops, f-strings, and comprehensions all
    work.

    **Layout patterns:**

    - Card sub-components (CardHeader, CardContent, CardFooter) have
      built-in padding. Don't add extra padding to them. For a simple
      card without sub-components, use `Card(css_class="p-6")`.
    - Use `Grid(columns=N, gap=4)` for equal-width cards or panels.
      Grid handles sizing automatically — no flex classes needed.
      For unequal widths, pass a list: `Grid(columns=[2, 1], gap=4)`
      gives a 2:1 ratio.
    - Row is for inline elements (badges, icons + text, buttons).
      Prefer Grid when children should have equal or proportional
      widths. Row does not wrap by default.
    - Column and Row accept `gap` (Tailwind scale: 1-12),
      `align` (cross-axis), and `justify` (main-axis) as native
      props — prefer these over raw css_class for spacing.
    - Use `css_class="overflow-hidden"` on containers if chart
      or content edges should clip to the container boundary.

    Args:
        code: Python code that builds a Prefab component tree.
        data: Values injected as variables in the sandbox namespace.
        sandbox: A Sandbox instance. If not provided, a new one is
            created on each call.
    """
    if sandbox is None:
        from prefab_ui.sandbox import Sandbox

        sandbox = Sandbox()

    try:
        wire = await sandbox.run(code, data=data)
    except RuntimeError as exc:
        raise ValueError(f"Code execution failed: {exc}") from exc

    return PrefabApp.from_json(wire)
