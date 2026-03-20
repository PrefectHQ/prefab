"""Compact JSON formatter that keeps short values on a single line.

Standard ``json.dumps(indent=2)`` puts every key-value pair on its own
line, which makes even simple component trees extremely tall.  This
module provides a formatter that collapses objects and arrays onto a
single line when they're short enough, and only expands when a node
exceeds a character threshold.
"""

from __future__ import annotations

import json
from typing import Any

_DEFAULT_MAX_LINE = 80


def compact_json(obj: Any, *, max_line: int = _DEFAULT_MAX_LINE) -> str:
    """Serialize *obj* to a compact-but-readable JSON string.

    Objects and arrays that serialize to fewer than *max_line* characters
    (excluding leading indentation) are kept on a single line.  Longer
    structures are expanded with 2-space indentation, recursing into
    children with the same rule.
    """
    return _format(obj, indent=0, max_line=max_line)


def _format(obj: Any, *, indent: int, max_line: int) -> str:
    # Try a one-liner first.  json.dumps gives us correct escaping for
    # strings, booleans, null, and numbers — no need to hand-roll that.
    one_line = json.dumps(obj, separators=(", ", ": "))
    if len(one_line) <= max_line or not isinstance(obj, (dict, list)):
        return one_line

    pad = "  " * indent
    inner = "  " * (indent + 1)

    if isinstance(obj, dict):
        parts: list[str] = []
        for key, value in obj.items():
            formatted_value = _format(value, indent=indent + 1, max_line=max_line)
            parts.append(f"{inner}{json.dumps(key)}: {formatted_value}")
        return "{\n" + ",\n".join(parts) + "\n" + pad + "}"

    # list
    parts = []
    for item in obj:
        formatted_item = _format(item, indent=indent + 1, max_line=max_line)
        parts.append(f"{inner}{formatted_item}")
    return "[\n" + ",\n".join(parts) + "\n" + pad + "]"
