"""Auto-render ComponentPreview content from Python code blocks.

Scans MDX files for wrapping ``<ComponentPreview auto>...</ComponentPreview>``
tags. For each one, extracts the Python code block (the authored source),
executes it, serializes the component tree to JSON, and rebuilds the tag
interior as a CodeGroup with Python + JSON tabs.

The Python code block is the only authored content inside ComponentPreview.
Everything else (CodeGroup, JSON tab, json prop) is derived and regenerated
on every run.

Run via: uv run docs/_preview-build/render_previews.py
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "src"))

# Match wrapping <ComponentPreview auto ...>...</ComponentPreview>
_WRAPPING_RE = re.compile(
    r"(<ComponentPreview\s+auto\b[^>]*>)(.*?)(</ComponentPreview>)",
    re.DOTALL,
)

# Extract attributes from the opening tag
_HEIGHT_RE = re.compile(r'height="([^"]*)"')
_HIDE_JSON_RE = re.compile(r"\bhide-json\b")

# Match ```python ... ``` code block inside the tag (full block including fences)
_PYTHON_BLOCK_RE = re.compile(
    r"(```python[^\n]*\n)(.*?)(```)",
    re.DOTALL,
)


def _execute_and_serialize(source: str) -> tuple[str, str]:
    """Execute a Python snippet and return (compact_json, pretty_json).

    compact_json is for the iframe preview prop (no whitespace).
    pretty_json is for the JSON tab in CodeGroup (human-readable).
    """
    from typing import Any

    from prefab_ui.components.base import (
        Component,
        ContainerComponent,
        _component_stack,
    )

    _component_stack.set(None)

    initial_state: dict[str, Any] = {}
    sample_data: dict[str, Any] = {}

    def set_initial_state(**kwargs: Any) -> None:
        initial_state.update(kwargs)

    def set_data(**kwargs: Any) -> None:
        sample_data.update(kwargs)

    created: list[Component] = []
    original = Component.model_post_init

    def _tracking_post_init(self: Component, context: object) -> None:
        original(self, context)
        created.append(self)

    Component.model_post_init = _tracking_post_init  # type: ignore[assignment]
    try:
        ns: dict[str, object] = {
            "set_initial_state": set_initial_state,
            "set_data": set_data,
        }
        exec(source, ns)  # noqa: S102
    finally:
        Component.model_post_init = original  # type: ignore[assignment]

    if not created:
        raise ValueError("No component found in code block")

    all_children: set[int] = set()
    for c in created:
        if isinstance(c, ContainerComponent):
            for child in c.children:
                all_children.add(id(child))

    roots = [c for c in created if id(c) not in all_children]
    if not roots:
        raise ValueError("No root component found")

    tree = roots[0].to_json()

    if initial_state or sample_data:
        wrapper: dict[str, Any] = {"_tree": tree}
        if initial_state:
            wrapper["_state"] = initial_state
        wrapper.update(sample_data)
        compact = json.dumps(wrapper, separators=(",", ":"))
        pretty = json.dumps(wrapper, indent=2)
    else:
        compact = json.dumps(tree, separators=(",", ":"))
        pretty = json.dumps(tree, indent=2)

    return compact, pretty


def _escape_template_literal(s: str) -> str:
    """Escape a string for embedding in a JS template literal (`...`)."""
    s = s.replace("\\", "\\\\")
    s = s.replace("`", "\\`")
    return s


def _rebuild_block(
    opening_tag: str,
    interior: str,
    closing_tag: str,
) -> str:
    """Rebuild a ComponentPreview block from its opening tag and interior."""
    # Extract attributes from the opening tag
    height_m = _HEIGHT_RE.search(opening_tag)
    height = height_m.group(1) if height_m else None
    hide_json = bool(_HIDE_JSON_RE.search(opening_tag))

    # Find the Python code block (the authored source)
    python_m = _PYTHON_BLOCK_RE.search(interior)
    if not python_m:
        return opening_tag + interior + closing_tag

    python_fence_open = python_m.group(1)  # ```python Title\n
    python_source = python_m.group(2)  # the code
    python_fence_close = python_m.group(3)  # ```
    python_block = python_fence_open + python_source + python_fence_close

    # Execute the Python and get JSON
    compact_json, pretty_json = _execute_and_serialize(python_source)

    # Build the opening tag with json prop (and preserved height)
    escaped_json = _escape_template_literal(compact_json)
    height_attr = f' height="{height}"' if height else ""
    new_opening = f"<ComponentPreview auto{height_attr} json={{`{escaped_json}`}}>"

    # Build the interior
    if hide_json:
        new_interior = f"\n{python_block}\n"
    else:
        json_block = f"```json Wire Format\n{pretty_json}\n```"
        new_interior = f"\n<CodeGroup>\n{python_block}\n{json_block}\n</CodeGroup>\n"

    return new_opening + new_interior + closing_tag


def process_file(path: Path) -> bool:
    """Process a single MDX file. Returns True if the file was modified."""
    content = path.read_text()
    original = content

    matches = list(_WRAPPING_RE.finditer(content))
    if not matches:
        return False

    for match in reversed(matches):
        opening_tag = match.group(1)
        interior = match.group(2)
        closing_tag = match.group(3)

        try:
            replacement = _rebuild_block(opening_tag, interior, closing_tag)
            content = content[: match.start()] + replacement + content[match.end() :]
        except Exception as e:
            print(f"  ERROR: {e}")
            continue

    if content != original:
        path.write_text(content)
        return True
    return False


def main() -> None:
    docs_dir = Path(__file__).resolve().parents[1] / "apps"
    mdx_files = sorted(docs_dir.rglob("*.mdx"))

    if not mdx_files:
        print("No MDX files found in docs/apps/")
        return

    modified = 0
    for path in mdx_files:
        text = path.read_text()
        count = len(_WRAPPING_RE.findall(text))
        if count == 0:
            continue
        rel = path.relative_to(docs_dir.parent)
        print(f"  {rel}: {count} preview(s)")
        if process_file(path):
            modified += 1

    print(f"Updated {modified} file(s)")


if __name__ == "__main__":
    main()
