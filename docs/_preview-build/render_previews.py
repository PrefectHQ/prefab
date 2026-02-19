"""Auto-render ComponentPreview data from Python code blocks.

Scans MDX files for ``<ComponentPreview>`` tags that contain Python code
blocks.  Executes each snippet, serializes the result to JSON, and inlines
it as the ``json`` prop on the tag so the React component can render the
live preview.

The authored Python code block stays as-is inside the tag — the build only
touches the opening ``<ComponentPreview ...>`` line and manages imports.

Run via: uv run docs/_preview-build/render_previews.py
"""

from __future__ import annotations

import json
import re
import shutil
import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "src"))

# ---------------------------------------------------------------------------
# Regex patterns
# ---------------------------------------------------------------------------

# Match <ComponentPreview ...>...</ComponentPreview>
_WRAPPING_RE = re.compile(
    r"(<ComponentPreview\b[^>]*>)(.*?)(</ComponentPreview>)",
    re.DOTALL,
)

# Match ```python ... ``` — group 1 = source code
_PYTHON_BLOCK_RE = re.compile(
    r"(```python[^\n]*\n)(.*?)(```)",
    re.DOTALL,
)

# Extract attributes from the opening tag
_HEIGHT_RE = re.compile(r'height="([^"]*)"')
_HIDE_JSON_RE = re.compile(r"\bhide-json\b")
_BARE_RE = re.compile(r"\bbare\b")
_RESIZABLE_RE = re.compile(r"\bresizable\b")
_ID_RE = re.compile(r'id="([^"]*)"')

# Match <ComponentCode for="..." /> (self-closing) or old generated markers
_COMPONENT_CODE_RE = re.compile(
    r"<ComponentCode\s+for=\"([^\"]*)\"[^/]*/>"
    r"|"
    r"(\{/\* ComponentCode:(\w+) \*/\}).*?(\{/\* /ComponentCode \*/\})"
    r"|"
    r"(\{/\* @code:(\w+) \*/\}\n<_C_\6 />)",
    re.DOTALL,
)

# Match generated import lines (for cleanup before re-adding)
_GEN_IMPORT_RE = re.compile(
    r"^import _(?:d|C_\w+) from '/snippets/_?gen/[^']*'\n",
    re.MULTILINE,
)


# ---------------------------------------------------------------------------
# Python execution
# ---------------------------------------------------------------------------


def _execute_and_serialize(
    source: str,
    *,
    shared_ns: dict[str, object] | None = None,
) -> dict[str, Any]:
    """Execute a Python snippet and return the JSON envelope as a dict."""
    from prefab_ui.app import clear_initial_state, get_initial_state
    from prefab_ui.components.base import (
        Component,
        ContainerComponent,
        _component_stack,
    )

    _component_stack.set(None)
    clear_initial_state()

    created: list[Component] = []
    original = Component.model_post_init

    def _tracking_post_init(self: Component, context: object) -> None:
        original(self, context)
        created.append(self)

    Component.model_post_init = _tracking_post_init  # type: ignore[assignment]
    try:
        ns: dict[str, object] = {}
        if shared_ns:
            ns.update(shared_ns)
        exec(source, ns)  # noqa: S102
        if shared_ns is not None:
            for k, v in ns.items():
                if not k.startswith("_"):
                    shared_ns[k] = v
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

    envelope: dict[str, Any] = {"view": tree}
    initial_state = get_initial_state()
    if initial_state:
        envelope["state"] = initial_state

    return envelope


# ---------------------------------------------------------------------------
# Attribute helpers
# ---------------------------------------------------------------------------


def _extract_attrs(tag_text: str) -> dict[str, Any]:
    """Extract preview attributes from an opening tag."""
    height_m = _HEIGHT_RE.search(tag_text)
    id_m = _ID_RE.search(tag_text)
    return {
        "height": height_m.group(1) if height_m else None,
        "resizable": bool(_RESIZABLE_RE.search(tag_text)),
        "bare": bool(_BARE_RE.search(tag_text)),
        "hide_json": bool(_HIDE_JSON_RE.search(tag_text)),
        "block_id": id_m.group(1) if id_m else None,
    }


def _build_opening_tag(attrs: dict[str, Any], json_str: str) -> str:
    """Build a <ComponentPreview ...> opening tag with inline JSON."""
    parts = ["<ComponentPreview"]
    if attrs["resizable"]:
        parts.append(" resizable")
    if attrs["bare"]:
        parts.append(" bare")
    if attrs["block_id"]:
        parts.append(f' id="{attrs["block_id"]}"')
    if attrs["height"]:
        parts.append(f' height="{attrs["height"]}"')
    if attrs["hide_json"]:
        parts.append(" hide-json")
    parts.append(f" json={{{json_str}}}")
    parts.append(">")
    return "".join(parts)


# ---------------------------------------------------------------------------
# Snippet generation (for ComponentCode references only)
# ---------------------------------------------------------------------------


def _generate_code_snippet(
    snippet_path: Path,
    python_block: str,
    pretty_json: str,
) -> None:
    """Generate a snippet MDX with a CodeGroup (for ComponentCode refs)."""
    json_block = (
        f'```json Protocol icon="brackets-curly" expandable\n{pretty_json}\n```'
    )
    snippet = f"<CodeGroup>\n{python_block}\n{json_block}\n</CodeGroup>\n"

    snippet_path.parent.mkdir(parents=True, exist_ok=True)
    snippet_path.write_text(snippet)


# ---------------------------------------------------------------------------
# File processing
# ---------------------------------------------------------------------------


def process_file(path: Path, *, docs_dir: Path) -> bool:
    """Process a single MDX file. Returns True if the file was modified."""
    content = path.read_text()
    original = content

    rel = path.relative_to(docs_dir)
    page_path = rel.with_suffix("")  # e.g. "components/button"

    matches = list(_WRAPPING_RE.finditer(content))
    if not matches:
        return False

    # ------------------------------------------------------------------
    # Execute Python and collect results
    # ------------------------------------------------------------------

    shared_ns: dict[str, object] = {}
    code_registry: dict[str, tuple[str, str]] = {}
    replacements: list[tuple[re.Match[str], str, str]] = []

    for i, match in enumerate(matches):
        opening_tag = match.group(1)
        interior = match.group(2)

        python_m = _PYTHON_BLOCK_RE.search(interior)
        if not python_m:
            continue

        python_fence_open = python_m.group(1)
        python_source = python_m.group(2)
        python_fence_close = python_m.group(3)

        try:
            envelope = _execute_and_serialize(
                python_source,
                shared_ns=shared_ns,
            )
        except Exception as e:
            print(f"  ERROR preview {i}: {e}")
            continue

        # Compact JSON for the inline prop
        compact_json = json.dumps(envelope, separators=(",", ":"))

        # Build new opening tag with inline JSON
        attrs = _extract_attrs(opening_tag)
        new_opening = _build_opening_tag(attrs, compact_json)

        # Ensure icon attribute on the Python fence line
        if "icon=" not in python_fence_open:
            python_fence_open = python_fence_open.rstrip("\n") + ' icon="python"\n'

        # Build interior: CodeGroup with Python + Protocol tabs
        pretty_json = json.dumps(envelope, indent=2)
        python_block = f"{python_fence_open}{python_source}{python_fence_close}"
        if attrs["hide_json"]:
            new_interior = f"\n{python_block}\n"
        else:
            json_block = f'```json Protocol icon="brackets-curly"\n{pretty_json}\n```'
            new_interior = (
                f"\n<CodeGroup>\n{python_block}\n{json_block}\n</CodeGroup>\n"
            )

        replacements.append((match, new_opening, new_interior))

        # Register for ComponentCode references
        block_id = attrs["block_id"]
        if block_id:
            python_block = python_fence_open + python_source + python_fence_close
            pretty_json = json.dumps(envelope, indent=2)
            code_registry[block_id] = (python_block, pretty_json)

    # ------------------------------------------------------------------
    # Apply replacements (reverse order to preserve offsets)
    # ------------------------------------------------------------------

    for match, new_opening, new_interior in reversed(replacements):
        content = (
            content[: match.start()]
            + new_opening
            + new_interior
            + match.group(3)  # closing tag
            + content[match.end() :]
        )

    # ------------------------------------------------------------------
    # Handle ComponentCode references
    # ------------------------------------------------------------------

    snippet_base = docs_dir / "snippets" / "gen" / page_path
    code_imports: list[str] = []

    def _replace_code_ref(m: re.Match[str]) -> str:
        # Group 1 = self-closing <ComponentCode for="id" />
        # Group 3 = old marker id, Group 6 = new marker id
        ref_id = m.group(1) or m.group(3) or m.group(6)
        if ref_id not in code_registry:
            print(f"  WARNING: ComponentCode references unknown id '{ref_id}'")
            return m.group(0)

        python_block, pretty_json = code_registry[ref_id]
        snippet_path = snippet_base / f"code_{ref_id}.mdx"
        _generate_code_snippet(snippet_path, python_block, pretty_json)

        import_path = f"/snippets/gen/{page_path}/code_{ref_id}"
        code_imports.append(f"import _C_{ref_id} from '{import_path}.mdx'")

        return f"{{/* @code:{ref_id} */}}\n<_C_{ref_id} />"

    content = _COMPONENT_CODE_RE.sub(_replace_code_ref, content)

    # ------------------------------------------------------------------
    # Manage imports
    # ------------------------------------------------------------------

    # Remove old generated imports (data files and code snippets)
    content = _GEN_IMPORT_RE.sub("", content)

    # Build new imports (only ComponentCode snippet imports now)
    imports: list[str] = sorted(code_imports)

    if imports:
        import_block = "\n".join(imports) + "\n"

        # Insert right after frontmatter
        fm = re.search(r"^---\n.*?\n---\n", content, re.DOTALL)
        insert_pos = fm.end() if fm else 0
        content = content[:insert_pos] + import_block + content[insert_pos:]

    if content != original:
        path.write_text(content)
        return True
    return False


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main() -> None:
    docs_dir = Path(__file__).resolve().parents[1]

    # Clean generated directories so stale files are removed
    for name in ("gen", "_gen"):
        d = docs_dir / "snippets" / name
        if d.exists():
            shutil.rmtree(d)

    mdx_files = sorted(docs_dir.rglob("*.mdx"))
    mdx_files = [
        f
        for f in mdx_files
        if "snippets/gen" not in str(f)
        and "snippets/_gen" not in str(f)
        and f.name != "component-preview.mdx"
        and f.name != "component-playground.mdx"
    ]

    if not mdx_files:
        print("No MDX files found in docs/")
        return

    modified = 0
    for path in mdx_files:
        text = path.read_text()
        has_previews = bool(_WRAPPING_RE.search(text))
        has_code = bool(_COMPONENT_CODE_RE.search(text))

        if not has_previews and not has_code:
            continue

        rel = path.relative_to(docs_dir.parent)
        n = len(_WRAPPING_RE.findall(text))
        print(f"  {rel}: {n} preview(s)")

        if process_file(path, docs_dir=docs_dir):
            modified += 1

    print(f"Updated {modified} file(s)")


if __name__ == "__main__":
    main()
