"""Extract Python examples from MDX docs for the playground.

Run via: uv run docs-build/extract_examples.py

Scans docs/apps/**/*.mdx for Python code blocks, extracts the title
(from the code fence info string) and category (from the file path),
and outputs renderer/src/playground/examples.json.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
docs_dir = root / "docs"
output = root / "renderer" / "src" / "playground" / "examples.json"

# Match ```python Optional Title\n...code...\n```
CODE_BLOCK_RE = re.compile(r"```python\s*([^\n]*)\n(.*?)```", re.DOTALL)

examples: list[dict[str, str]] = []
seen_codes: set[str] = set()


def category_from_path(path: Path) -> str:
    """Derive a category like 'Components' or 'Patterns' from the file path."""
    rel = path.relative_to(docs_dir)
    parts = rel.parts
    if len(parts) >= 2:
        return parts[0].replace("-", " ").title()
    return "General"


def title_from_path(path: Path) -> str:
    """Derive a fallback title from the filename."""
    return path.stem.replace("-", " ").replace("_", " ").title()


for mdx_file in sorted(docs_dir.rglob("*.mdx")):
    cat = category_from_path(mdx_file)
    fallback_title = title_from_path(mdx_file)

    for match in CODE_BLOCK_RE.finditer(mdx_file.read_text()):
        info_title = match.group(1).strip()
        code = match.group(2).strip()

        if not code or code in seen_codes:
            continue
        seen_codes.add(code)

        title = info_title if info_title else fallback_title
        examples.append({"title": title, "category": cat, "code": code})

output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(examples, ensure_ascii=False, indent=2))
print(f"Extracted {len(examples)} examples to {output.relative_to(root)}")
