"""Generate Protocol Reference sections from Pydantic JSON schemas.

For each MDX file with an ``## API Reference`` section, generates a matching
``## Protocol Reference`` section showing the JSON wire format fields derived
from the component's Pydantic model.

Run via: uv run docs/_preview-build/generate_protocol_ref.py
"""

from __future__ import annotations

import re
import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "src"))

# Map Card title names to Python class import paths
_CLASS_MAP: dict[str, str] = {}


def _get_class(name: str) -> type | None:
    """Resolve a component/action name to its Python class."""
    # Try components first, then actions
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


def _resolve_type(info: dict[str, Any], defs: dict[str, Any]) -> str:
    """Convert a JSON Schema property definition to a display type string."""
    if "const" in info:
        return str(info["const"])

    if "type" in info:
        t = info["type"]
        if t == "integer":
            return "number"
        if "enum" in info:
            return "string"
        return t

    if "enum" in info:
        return "string"

    if "anyOf" in info:
        types = []
        for opt in info["anyOf"]:
            if "$ref" in opt:
                # Action reference — simplify to "Action"
                ref_name = opt["$ref"].rsplit("/", 1)[-1]
                if ref_name not in types:
                    types.append("Action")
            elif opt.get("type") == "null":
                types.append("null")
            elif opt.get("type") == "array":
                # Array of actions
                if "Action[]" not in types:
                    types.append("Action[]")
            else:
                types.append(_resolve_type(opt, defs))
        # Deduplicate while preserving order
        seen: set[str] = set()
        unique = []
        for t in types:
            if t not in seen:
                seen.add(t)
                unique.append(t)
        return " | ".join(unique)

    if "$ref" in info:
        ref_name = info["$ref"].rsplit("/", 1)[-1]
        return ref_name

    if "items" in info:
        item_type = _resolve_type(info["items"], defs)
        return f"{item_type}[]"

    return "any"


def _extract_enum(info: dict[str, Any]) -> list[str] | None:
    """Extract enum values from a JSON Schema property, if any."""
    if "enum" in info:
        return info["enum"]
    # Check inside type+enum combo
    if "type" in info and "enum" in info:
        return info["enum"]
    return None


# Fields inherited from ComponentBase that appear on every component.
# We'll show them in a condensed way or skip entirely.
_BASE_FIELDS = {"cssClass"}

# Fields we always skip (internal or redundant)
_SKIP_FIELDS = {"onSuccess", "onError"}


def _generate_card(
    title: str,
    class_name: str,
    is_action: bool = False,
) -> str | None:
    """Generate a Protocol Reference <Card> for a given component/action."""
    cls = _get_class(class_name)
    if cls is None:
        return None

    schema = cls.model_json_schema()
    props = schema.get("properties", {})
    required = set(schema.get("required", []))
    defs = schema.get("$defs", {})

    lines = [f'<Card icon="braces" title="{title} Protocol">']

    for field_name, info in props.items():
        if field_name in _SKIP_FIELDS:
            continue

        type_str = _resolve_type(info, defs)
        desc = info.get("description", "")
        is_required = field_name in required
        default = info.get("default")

        # Add enum values to description
        enum_values = _extract_enum(info)
        if enum_values:
            quoted = ", ".join(f'`"{v}"`' for v in enum_values)
            if desc:
                desc = f"{desc}. One of: {quoted}"
            else:
                desc = f"One of: {quoted}"

        # Build ParamField attributes
        attrs = f'body="{field_name}" type="{type_str}"'
        if is_required:
            attrs += " required"
        elif default is not None:
            if isinstance(default, bool):
                attrs += f' default="{str(default).lower()}"'
            elif isinstance(default, str):
                attrs += f' default="{default}"'
            else:
                attrs += f' default="{default}"'

        # Escape {{ ... }} templates so MDX doesn't evaluate them as JSX
        desc = re.sub(r"\{\{([^}]*)\}\}", r"`{{\1}}`", desc)

        if not desc and field_name == "type":
            desc = "Component discriminator."

        lines.append(f"<ParamField {attrs}>")
        if desc:
            lines.append(f"  {desc}")
        lines.append("</ParamField>")
        lines.append("")

    lines.append("</Card>")
    return "\n".join(lines)


# Pattern to find Card titles in API Reference: <Card icon="code" title="X Parameters">
_CARD_TITLE_RE = re.compile(r'<Card\s+icon="code"\s+title="([^"]*)\s+Parameters">')

# Pattern to find ## API Reference section
_API_REF_RE = re.compile(r"^## API Reference\s*$", re.MULTILINE)

# Pattern to find ## Protocol Reference section (existing, for replacement)
_PROTOCOL_REF_RE = re.compile(
    r"^## Protocol Reference\s*\n.*",
    re.MULTILINE | re.DOTALL,
)


def _name_to_class(card_name: str) -> tuple[str, bool]:
    """Map a Card title name to (class_name, is_action).

    Returns the Python class name and whether it's an action.
    """
    # Special cases
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


def process_file(path: Path) -> bool:
    """Process a single MDX file. Returns True if modified."""
    content = path.read_text()

    # Find API Reference section
    api_ref_m = _API_REF_RE.search(content)
    if not api_ref_m:
        return False

    # Find all Card titles in the API Reference
    card_titles = _CARD_TITLE_RE.findall(content[api_ref_m.start() :])
    if not card_titles:
        return False

    # Generate Protocol Reference cards
    protocol_cards: list[str] = []
    for title in card_titles:
        # Skip non-component cards like "Styled Text Components"
        if "Components" in title or "Component" in title:
            continue

        class_name, is_action = _name_to_class(title)
        card = _generate_card(title, class_name, is_action)
        if card:
            protocol_cards.append(card)

    if not protocol_cards:
        return False

    protocol_section = "## Protocol Reference\n\n" + "\n\n".join(protocol_cards) + "\n"

    # Remove existing Protocol Reference section if present
    existing_m = _PROTOCOL_REF_RE.search(content)
    if existing_m:
        content = content[: existing_m.start()] + protocol_section
    else:
        # Append after the file content (at the end)
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
            print(f"  {rel}: added Protocol Reference")
            modified += 1

    print(f"Updated {modified} file(s)")


if __name__ == "__main__":
    main()
