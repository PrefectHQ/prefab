"""Generate the playground Python source bundle as a JSON file.

Run via: uv run docs/_preview-build/generate_playground_bundle.py

Reads all .py files from the prefab_ui package and serializes them as
a JSON object mapping module paths to source code. The output is written
to renderer/src/playground/bundle.json, which Vite imports at build time.
"""

from __future__ import annotations

import json
from pathlib import Path

root = Path(__file__).resolve().parents[2]
src_root = root / "src" / "prefab_ui"
output = root / "renderer" / "src" / "playground" / "bundle.json"

bundle: dict[str, str] = {}

# Top-level package files
for py_file in sorted(src_root.glob("*.py")):
    module_path = f"prefab_ui/{py_file.name}"
    bundle[module_path] = py_file.read_text()

# Components subpackage
components_dir = src_root / "components"
for py_file in sorted(components_dir.glob("*.py")):
    module_path = f"prefab_ui/components/{py_file.name}"
    bundle[module_path] = py_file.read_text()

# Actions subpackage
actions_dir = src_root / "actions"
for py_file in sorted(actions_dir.glob("*.py")):
    module_path = f"prefab_ui/actions/{py_file.name}"
    bundle[module_path] = py_file.read_text()

# Renderer subpackage (just __init__.py)
renderer_dir = src_root / "renderer"
for py_file in sorted(renderer_dir.glob("*.py")):
    module_path = f"prefab_ui/renderer/{py_file.name}"
    bundle[module_path] = py_file.read_text()

output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(bundle, ensure_ascii=False, indent=2))
print(
    f"Wrote playground bundle with {len(bundle)} modules to {output.relative_to(root)}"
)
