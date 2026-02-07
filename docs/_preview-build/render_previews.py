"""Auto-render ComponentPreview JSON from Python code blocks.

Scans MDX files for ``<ComponentPreview auto ... />`` tags. For each one,
finds the next Python code block, executes it, captures the top-level
component, serializes it to JSON via ``.to_json()``, and writes the JSON
back into the tag's ``json`` prop.

Run via: uv run docs/_preview-build/render_previews.py
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "src"))

# Pattern: <ComponentPreview auto ... /> (self-closing, with optional json/html and height)
_PREVIEW_TAG_RE = re.compile(
    r'<ComponentPreview\s+auto\b(?:\s+(?:(?:json|html)=\{`[^`]*`\}|height="[^"]*"))*\s*/\s*>',
    re.DOTALL,
)

# Extract height="..." from a matched tag
_HEIGHT_RE = re.compile(r'height="([^"]*)"')

# Pattern: ```python ... ``` code block (captures the Python source)
_CODE_BLOCK_RE = re.compile(
    r"```python[^\n]*\n(.*?)```",
    re.DOTALL,
)


def _execute_and_serialize(source: str) -> str:
    """Execute a Python snippet and return JSON (tree or {_tree, _state} wrapper)."""
    from typing import Any

    from prefab_ui.components.base import (
        Component,
        ContainerComponent,
        _component_stack,
    )

    # Reset the component stack
    _component_stack.set(None)

    # Capture initial state and sample data from helper calls
    initial_state: dict[str, Any] = {}
    sample_data: dict[str, Any] = {}

    def set_initial_state(**kwargs: Any) -> None:
        initial_state.update(kwargs)

    def set_data(**kwargs: Any) -> None:
        sample_data.update(kwargs)

    # Track every component created during execution
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

    # Find roots: components that aren't a child of any container
    all_children: set[int] = set()
    for c in created:
        if isinstance(c, ContainerComponent):
            for child in c.children:
                all_children.add(id(child))

    roots = [c for c in created if id(c) not in all_children]
    if not roots:
        raise ValueError("No root component found")

    tree = roots[0].to_json()

    # Wrap with state/data if any helpers were called
    if initial_state or sample_data:
        wrapper: dict[str, Any] = {"_tree": tree}
        if initial_state:
            wrapper["_state"] = initial_state
        wrapper.update(sample_data)
        return json.dumps(wrapper, separators=(",", ":"))
    return json.dumps(tree, separators=(",", ":"))


def _render_tag(source: str, height: str | None = None) -> str:
    """Build a new <ComponentPreview auto ... /> tag, preserving height if set."""
    json_str = _execute_and_serialize(source)

    # Escape for template literal embedding: backslashes first, then backticks.
    # This matters when JSON contains escaped quotes (e.g. nested JSON strings
    # like range calendar state: '{"from":"...","to":"..."}').
    json_str = json_str.replace("\\", "\\\\")
    json_str = json_str.replace("`", "\\`")
    height_attr = f' height="{height}"' if height else ""
    return f"<ComponentPreview auto{height_attr} json={{`{json_str}`}} />"


def process_file(path: Path) -> bool:
    """Process a single MDX file. Returns True if the file was modified."""
    content = path.read_text()
    original = content

    # Find all <ComponentPreview auto .../> tags and their positions
    matches = list(_PREVIEW_TAG_RE.finditer(content))
    if not matches:
        return False

    # Process in reverse order so replacements don't shift positions
    for match in reversed(matches):
        tag_end = match.end()

        # Find the next Python code block after this tag
        code_match = _CODE_BLOCK_RE.search(content, tag_end)
        if not code_match:
            print(
                f"  WARNING: No Python code block found after auto tag at offset {match.start()}"
            )
            continue

        # Check there isn't another ComponentPreview between the tag and the code block
        between = content[tag_end : code_match.start()]
        if "<ComponentPreview" in between:
            print(
                "  WARNING: Another ComponentPreview found between auto tag and code block"
            )
            continue

        source = code_match.group(1)
        try:
            # Preserve height attribute if present
            height_m = _HEIGHT_RE.search(match.group(0))
            height = height_m.group(1) if height_m else None
            new_tag = _render_tag(source, height=height)
            content = content[: match.start()] + new_tag + content[match.end() :]
        except Exception as e:
            print(f"  ERROR rendering code block: {e}")
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
        rel = path.relative_to(docs_dir.parent)
        count = len(_PREVIEW_TAG_RE.findall(path.read_text()))
        if count == 0:
            continue
        print(f"  {rel}: {count} auto preview(s)")
        if process_file(path):
            modified += 1

    print(f"Updated {modified} file(s)")


if __name__ == "__main__":
    main()
