"""Extract CSS classes from rendered component previews.

Scans MDX files for ComponentPreview JSON props, collects all cssClass
values, and writes them to a file that Tailwind can scan. This replaces
the hand-maintained safelist — Tailwind generates CSS for exactly the
classes used in previews.

Run after render_previews.py and before the Tailwind build.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

# Valid Tailwind class: starts with a letter, !, or - and contains only
# word chars, hyphens, brackets, colons, slashes, dots, percent, parens.
# Filters out expression fragments like {{ or ? from reactive values.
_CLASS_RE = re.compile(r"^[!\w\-][\w\-\[\]:./%()#,]+$")

DOCS_DIR = Path(__file__).parent.parent / "docs"
OUTPUT = Path(__file__).parent / "preview-classes.html"

# Match json={{...}} props on ComponentPreview tags.
# The JSX double-brace wraps compact JSON. We match greedily to the last }}
# before a space or > (the next prop or tag close).
JSON_PROP_RE = re.compile(r"\bjson=\{\{(.+?)\}\}(?=\s|>)")


def collect_classes(node: object) -> set[str]:
    """Recursively extract cssClass tokens from a JSON tree."""
    classes: set[str] = set()
    _walk(node, classes)
    return classes


def _walk(node: object, out: set[str]) -> None:
    if isinstance(node, dict):
        for key, value in node.items():
            # Collect from any class-carrying prop (cssClass, indicatorClass,
            # targetClass, headerClass, cellClass, handleClass, etc.)
            if key.endswith("Class") and isinstance(value, str):
                out.update(value.split())
            else:
                _walk(value, out)
    elif isinstance(node, list):
        for item in node:
            _walk(item, out)


def main() -> None:
    all_classes: set[str] = set()

    for mdx_file in sorted(DOCS_DIR.rglob("*.mdx")):
        text = mdx_file.read_text()
        for match in JSON_PROP_RE.finditer(text):
            try:
                tree = json.loads("{" + match.group(1) + "}")
                all_classes.update(collect_classes(tree))
            except json.JSONDecodeError:
                continue

    # Filter out expression fragments and other non-class junk
    valid_classes = {c for c in all_classes if _CLASS_RE.match(c)}

    # Write as an HTML file with classes on a div — Tailwind's scanner picks them up
    escaped = " ".join(sorted(valid_classes))
    OUTPUT.write_text(f'<div class="{escaped}"></div>\n')
    print(f"Extracted {len(all_classes)} classes → {OUTPUT}")


if __name__ == "__main__":
    main()
