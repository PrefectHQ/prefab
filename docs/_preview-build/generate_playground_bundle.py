"""Regenerate the playground Python source bundle and CSS in docs/playground.js.

Run via: uv run docs/_preview-build/generate_playground_bundle.py

Reads all .py files from src/prefab_ui/components/, serializes them as
a JSON object mapping module paths to source code, and replaces the
window.__PLAYGROUND_BUNDLE assignment in docs/playground.js.

Also inlines preview.css into the __PLAYGROUND_CSS variable so the
playground iframe can render components without loading external CSS.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

src_dir = (
    Path(__file__).resolve().parents[2] / "src" / "prefab_ui" / "components"
)
build_dir = Path(__file__).resolve().parent
playground_js = build_dir.parent / "playground.js"
preview_css = build_dir.parent / "css" / "preview.css"

# Build the bundle: module path -> source code
bundle: dict[str, str] = {
    "prefab_ui/__init__.py": "",
    "prefab_ui/__init__.py": "",
}

for py_file in sorted(src_dir.glob("*.py")):
    module_path = f"prefab_ui/components/{py_file.name}"
    bundle[module_path] = py_file.read_text()

# Read the existing playground.js (skip if it doesn't exist yet)
if not playground_js.exists():
    print("docs/playground.js not found — skipping playground bundle generation")
    raise SystemExit(0)
content = playground_js.read_text()

# Replace the __PLAYGROUND_BUNDLE assignment (single line, ends with ;).
bundle_json = json.dumps(bundle, ensure_ascii=False)
new_line = f"window.__PLAYGROUND_BUNDLE = {bundle_json};"
content = re.sub(
    r"^window\.__PLAYGROUND_BUNDLE\s*=\s*\{.*\};$",
    lambda _: new_line,
    content,
    count=1,
    flags=re.MULTILINE,
)

# Inline preview.css as __PLAYGROUND_CSS so the preview iframe doesn't need
# to load it via <link> (which fails in sandboxed srcdoc iframes).
css_text = preview_css.read_text()
css_json = json.dumps(css_text, ensure_ascii=False)
new_css_line = f"window.__PLAYGROUND_CSS = {css_json};"
content = re.sub(
    r"^window\.__PLAYGROUND_CSS\s*=\s*.*?;$",
    lambda _: new_css_line,
    content,
    count=1,
    flags=re.MULTILINE,
)

playground_js.write_text(content)
print(f"Updated playground bundle with {len(bundle)} modules")
print(f"Inlined {len(css_text)} bytes of preview CSS")
