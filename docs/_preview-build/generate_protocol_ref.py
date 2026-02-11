"""Generate Protocol Reference sections from Pydantic JSON schemas.

Produces compact pseudocode JSON blocks that show the wire format at a glance,
plus links to the full JSON Schema protocol pages.

Run via: uv run docs/_preview-build/generate_protocol_ref.py
"""

from __future__ import annotations

import re
import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "src"))

PROTOCOL_DIR = Path(__file__).resolve().parents[1] / "protocol"

# Fields we always skip (internal, redundant, or handled specially)
_SKIP_FIELDS = {"onSuccess", "onError"}

# Base fields that go at the bottom of pseudocode blocks
_BASE_FIELDS = {"cssClass"}


def _get_class(name: str) -> type | None:
    """Resolve a component/action name to its Python class."""
    try:
        import prefab_ui.components as comp

        cls = getattr(comp, name, None)
        if cls is not None:
            return cls
    except ImportError:
        pass

    try:
        import prefab_ui.actions as act

        cls = getattr(act, name, None)
        if cls is not None:
            return cls
    except ImportError:
        pass

    return None


def _format_value(info: dict[str, Any], defs: dict[str, Any]) -> str:
    """Format a field's type/default as a compact pseudocode value."""
    # Enum → pipe-separated values
    if "enum" in info:
        return " | ".join(str(v) for v in info["enum"])

    # Const (like type discriminator)
    if "const" in info:
        return f'"{info["const"]}"'

    # anyOf → resolve each branch
    if "anyOf" in info:
        parts: list[str] = []
        for opt in info["anyOf"]:
            if "$ref" in opt:
                ref = opt["$ref"].rsplit("/", 1)[-1]
                if "Action" not in parts:
                    parts.append("Action")
            elif opt.get("type") == "null":
                continue  # skip null in display, the ? suffix handles optionality
            elif opt.get("type") == "array":
                if "Action[]" not in parts:
                    parts.append("Action[]")
            else:
                parts.append(_format_value(opt, defs))
        return " | ".join(parts) if parts else "any"

    # Array of components (children)
    if info.get("type") == "array" and "items" in info:
        items = info["items"]
        if "$ref" in items:
            ref = items["$ref"].rsplit("/", 1)[-1]
            return f"[{ref}]"
        return "array"

    # Simple types with defaults
    t = info.get("type", "any")
    if isinstance(t, list):
        # e.g. ["string", "null"] → "string"
        t = next((x for x in t if x != "null"), t[0])

    if t == "integer":
        t = "number"

    default = info.get("default")

    # Boolean with default → show the default value directly (unquoted)
    if t == "boolean" and default is not None:
        return str(default).lower()

    # Number with default (unquoted)
    if t == "number" and default is not None:
        return str(default)

    return t


def _generate_pseudocode(
    title: str,
    class_name: str,
) -> str | None:
    """Generate a pseudocode JSON block for a component/action."""
    cls = _get_class(class_name)
    if cls is None:
        return None

    schema = cls.model_json_schema()
    props = schema.get("properties", {})
    required = set(schema.get("required", []))
    defs = schema.get("$defs", {})

    # Values that should not be quoted (booleans, numbers)
    _unquoted = {"true", "false"} | {str(i) for i in range(-10, 101)}

    def format_line(field_name: str, info: dict[str, Any]) -> str:
        is_req = field_name in required
        value = _format_value(info, defs)
        suffix = "" if is_req else "?"
        annotation = " (required)" if is_req else ""

        if value in _unquoted:
            return f'  "{field_name}{suffix}": {value}'
        return f'  "{field_name}{suffix}": "{value}{annotation}"'

    # Order: type first, then component-specific fields, then base fields last
    type_lines: list[str] = []
    field_lines: list[str] = []
    base_lines: list[str] = []

    for field_name, info in props.items():
        if field_name in _SKIP_FIELDS:
            continue
        if field_name in ("type", "action"):
            value = _format_value(info, defs)
            type_lines.append(f'  "{field_name}": {value}')
        elif field_name in _BASE_FIELDS:
            base_lines.append(format_line(field_name, info))
        else:
            field_lines.append(format_line(field_name, info))

    all_lines = type_lines + field_lines + base_lines
    body = ",\n".join(all_lines)
    return f"```json {title}\n{{\n{body}\n}}\n```"


def _class_to_slug(name: str) -> str:
    """Convert a class name to a kebab-case slug for protocol page links."""
    s = re.sub(r"(?<!^)(?=[A-Z])", "-", name).lower()
    s = (
        s.replace("h-1", "h1")
        .replace("h-2", "h2")
        .replace("h-3", "h3")
        .replace("h-4", "h4")
    )
    return s


def _name_to_class(card_name: str) -> tuple[str, bool]:
    """Map a Card title name to (class_name, is_action)."""
    special: dict[str, tuple[str, bool]] = {
        "ToolCall": ("ToolCall", True),
        "SendMessage": ("SendMessage", True),
        "UpdateContext": ("UpdateContext", True),
        "OpenLink": ("OpenLink", True),
        "SetState": ("SetState", True),
        "ToggleState": ("ToggleState", True),
        "ShowToast": ("ShowToast", True),
        "Radio": ("RadioGroup", False),
        "TableHead / TableCell": ("TableCell", False),
    }
    if card_name in special:
        return special[card_name]
    return (card_name, False)


# Pattern to find Card titles in API Reference
_CARD_TITLE_RE = re.compile(r'<Card\s+icon="code"\s+title="([^"]*)\s+Parameters">')

# Pattern to find ## API Reference section
_API_REF_RE = re.compile(r"^## API Reference\s*$", re.MULTILINE)

# Pattern to find ## Protocol Reference section (existing, for replacement)
_PROTOCOL_REF_RE = re.compile(
    r"^## Protocol Reference\s*\n.*",
    re.MULTILINE | re.DOTALL,
)


def process_file(path: Path) -> bool:
    """Process a single MDX file. Returns True if modified."""
    content = path.read_text()

    api_ref_m = _API_REF_RE.search(content)
    if not api_ref_m:
        return False

    card_titles = _CARD_TITLE_RE.findall(content[api_ref_m.start() :])
    if not card_titles:
        return False

    # Generate pseudocode blocks
    blocks: list[str] = []
    slugs: list[str] = []
    titles_used: list[str] = []
    for title in card_titles:
        if "Components" in title or "Component" in title:
            continue

        class_name, _is_action = _name_to_class(title)
        block = _generate_pseudocode(title, class_name)
        if block:
            blocks.append(block)
            slugs.append(_class_to_slug(class_name))
            titles_used.append(title)

    if not blocks:
        return False

    # Build protocol page links
    links: list[str] = []
    for title, slug in zip(titles_used, slugs):
        if (PROTOCOL_DIR / f"{slug}.mdx").exists():
            links.append(f"[{title}](/protocol/{slug})")

    link_line = ""
    if links:
        link_line = (
            "\nFor the complete protocol schema, see " + ", ".join(links) + ".\n"
        )

    protocol_section = (
        "## Protocol Reference\n\n" + "\n\n".join(blocks) + "\n" + link_line
    )

    existing_m = _PROTOCOL_REF_RE.search(content)
    if existing_m:
        content = content[: existing_m.start()] + protocol_section
    else:
        content = content.rstrip() + "\n\n" + protocol_section

    if content != path.read_text():
        path.write_text(content)
        return True
    return False


def main() -> None:
    docs_dir = Path(__file__).resolve().parents[1]
    mdx_files = sorted(docs_dir.rglob("*.mdx"))

    modified = 0
    for path in mdx_files:
        if "## API Reference" not in path.read_text():
            continue
        rel = path.relative_to(docs_dir.parent)
        if process_file(path):
            print(f"  {rel}: updated")
            modified += 1

    print(f"Updated {modified} file(s)")


if __name__ == "__main__":
    main()
