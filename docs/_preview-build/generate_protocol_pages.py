"""Generate per-component Protocol Reference MDX pages from Pydantic models.

Introspects all Component and Action subclasses, calls model_json_schema(),
cleans up the output, and writes one MDX page per class into
docs/apps/protocol/.

Run via: uv run docs/_preview-build/generate_protocol_pages.py
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "src"))

import prefab_ui.actions as actions_mod
import prefab_ui.components as components_mod

PROTOCOL_DIR = Path(__file__).resolve().parents[1] / "protocol"

# ---------------------------------------------------------------------------
# Component / Action class registry
# ---------------------------------------------------------------------------

# All Component subclasses that should have protocol pages.
# Maps wire-format type name -> Python class.
COMPONENT_CLASSES: dict[str, type] = {}

# Subcomponents that share a doc page with their parent are excluded from
# individual pages. They still appear in the parent component doc.
_SKIP_COMPONENTS = {"Component", "ContainerComponent"}

for name in components_mod.__all__:
    cls = getattr(components_mod, name, None)
    if cls is None or name in _SKIP_COMPONENTS:
        continue
    # Get the wire-format type name from the Literal annotation
    type_field = cls.model_fields.get("type")
    if type_field is not None and type_field.default is not None:
        wire_name = type_field.default
    else:
        wire_name = name
    COMPONENT_CLASSES[wire_name] = cls

# Action subclasses
ACTION_CLASSES: dict[str, type] = {}
_SKIP_ACTIONS = {"ActionBase", "Action"}

for name in actions_mod.__all__:
    if name in _SKIP_ACTIONS:
        continue
    cls = getattr(actions_mod, name, None)
    if cls is None:
        continue
    ACTION_CLASSES[name] = cls

# ---------------------------------------------------------------------------
# Grouping for nav structure
# ---------------------------------------------------------------------------

LAYOUT_TYPES = {
    "Row",
    "Column",
    "Grid",
    "Div",
    "Span",
    "ForEach",
    "State",
    "Pages",
    "Page",
}
ACTION_TYPES = set(ACTION_CLASSES.keys())

# Everything else is a "Component"
COMPONENT_TYPES = set(COMPONENT_CLASSES.keys()) - LAYOUT_TYPES

# ---------------------------------------------------------------------------
# Schema cleaning
# ---------------------------------------------------------------------------

# Names of $defs entries that represent the action union or base types.
_ACTION_DEF_NAMES = {
    "ActionBase",
    "ToolCall",
    "SendMessage",
    "UpdateContext",
    "OpenLink",
    "SetState",
    "ToggleState",
    "ShowToast",
}
_BASE_DEF_NAMES = {"Component", "ContainerComponent"}


def _is_action_ref(info: dict[str, Any]) -> bool:
    """Check if a property schema references action types."""
    if "$ref" in info:
        ref_name = info["$ref"].rsplit("/", 1)[-1]
        return ref_name in _ACTION_DEF_NAMES
    if "anyOf" in info:
        for opt in info["anyOf"]:
            if _is_action_ref(opt):
                return True
            if opt.get("type") == "array" and "items" in opt:
                items = opt["items"]
                if "anyOf" in items:
                    for sub in items["anyOf"]:
                        if _is_action_ref(sub):
                            return True
    return False


def _is_children_ref(info: dict[str, Any]) -> bool:
    """Check if a property is the children array."""
    if info.get("type") == "array" and "items" in info:
        items = info["items"]
        if "$ref" in items:
            ref_name = items["$ref"].rsplit("/", 1)[-1]
            return ref_name in _BASE_DEF_NAMES
    return False


def _simplify_nullable(info: dict[str, Any]) -> dict[str, Any]:
    """Simplify anyOf nullable patterns.

    {"anyOf": [{"type": "string"}, {"type": "null"}]} -> {"type": ["string", "null"]}
    """
    if "anyOf" not in info:
        return info

    options = info["anyOf"]
    # Simple nullable: exactly 2 options, one is null
    if len(options) == 2:
        null_opts = [o for o in options if o.get("type") == "null"]
        non_null = [o for o in options if o.get("type") != "null"]
        if len(null_opts) == 1 and len(non_null) == 1:
            result = dict(non_null[0])
            # Make the type a list including null
            if "type" in result:
                result["type"] = [result["type"], "null"]
            elif "enum" in result:
                # enum with null option
                result["type"] = ["string", "null"]
            # Carry over other fields from the parent
            for k in ("default", "description"):
                if k in info and k not in result:
                    result[k] = info[k]
            return result

    return info


def _first_sentence(text: str) -> str:
    """Extract just the first sentence from a description."""
    # Strip RST-style markup
    text = text.replace("``", "`")
    # Find first sentence break
    for sep in (". ", ".\n", "\n\n"):
        idx = text.find(sep)
        if idx != -1:
            return text[: idx + 1].strip()
    return text.strip()


def _normalize_refs(info: dict[str, Any]) -> None:
    """Normalize $ref paths in-place: '#/$defs/Foo' -> 'Foo'."""
    if "$ref" in info:
        ref = info["$ref"]
        if "/" in ref:
            info["$ref"] = ref.rsplit("/", 1)[-1]
    # Recurse into anyOf, items, etc.
    for key in ("anyOf", "oneOf", "allOf"):
        if key in info:
            for opt in info[key]:
                if isinstance(opt, dict):
                    _normalize_refs(opt)
    if "items" in info and isinstance(info["items"], dict):
        _normalize_refs(info["items"])


def clean_schema(cls: type) -> dict[str, Any]:
    """Generate a cleaned JSON Schema for a component or action class."""
    raw = cls.model_json_schema()

    props = raw.get("properties", {})
    required = raw.get("required", [])

    cleaned_props: dict[str, Any] = {}

    # Put "type" or "action" discriminator first
    for disc_key in ("type", "action"):
        if disc_key in props:
            p = props[disc_key]
            entry: dict[str, Any] = {}
            if "const" in p:
                entry["const"] = p["const"]
            if "default" in p:
                entry["default"] = p["default"]
            if "type" in p:
                entry["type"] = p["type"]
            cleaned_props[disc_key] = entry

    for field_name, info in props.items():
        if field_name in ("type", "action"):
            continue  # Already handled

        # Skip internal lifecycle callbacks
        if field_name in ("onSuccess", "onError"):
            continue

        # Replace action refs with a simplified reference
        if _is_action_ref(info):
            entry = {"$ref": "Action", "description": "Action or Action[]"}
            if "description" in info:
                entry["description"] = info["description"]
            if "default" in info:
                entry["default"] = info["default"]
            cleaned_props[field_name] = entry
            continue

        # Replace children refs
        if _is_children_ref(info):
            cleaned_props[field_name] = {
                "type": "array",
                "items": {"$ref": "Component"},
            }
            continue

        # Simplify nullable types
        simplified = _simplify_nullable(info)

        # Strip title
        simplified.pop("title", None)

        # Normalize $ref paths: "#/$defs/Foo" -> "Foo"
        _normalize_refs(simplified)

        # Clean up nested items if present
        if "items" in simplified:
            items = simplified["items"]
            items.pop("title", None)
            _normalize_refs(items)
            if "anyOf" in items:
                items = _simplify_nullable(items)
                items.pop("title", None)
            simplified["items"] = items

        # Clean up prefixItems for tuple types
        if "prefixItems" in simplified:
            for item in simplified["prefixItems"]:
                if isinstance(item, dict):
                    item.pop("title", None)
                    if "anyOf" in item:
                        # Simplify nested anyOf in tuple items
                        new_item = _simplify_nullable(item)
                        item.clear()
                        item.update(new_item)

        cleaned_props[field_name] = simplified

    result: dict[str, Any] = {"type": "object", "properties": cleaned_props}

    # Filter required to only include fields we kept
    filtered_required = [r for r in required if r in cleaned_props]
    # Always include discriminator in required
    for disc_key in ("type", "action"):
        if disc_key in cleaned_props and disc_key not in filtered_required:
            filtered_required.insert(0, disc_key)
    if filtered_required:
        result["required"] = filtered_required

    return result


# ---------------------------------------------------------------------------
# MDX generation
# ---------------------------------------------------------------------------


def _class_to_filename(name: str) -> str:
    """Convert a class name to a kebab-case filename."""
    # Insert hyphens before uppercase letters (except at start)
    s = re.sub(r"(?<!^)(?=[A-Z])", "-", name).lower()
    # Handle special cases
    s = (
        s.replace("h-1", "h1")
        .replace("h-2", "h2")
        .replace("h-3", "h3")
        .replace("h-4", "h4")
    )
    return s


def _class_description(cls: type) -> str:
    """Extract a one-line description from the class."""
    doc = cls.__doc__
    if not doc:
        return ""
    # Get first line/sentence, strip RST markup
    line = doc.strip().split("\n")[0].strip()
    line = line.replace("``", "`")
    # Remove "Args:" sections etc.
    if line.lower().startswith("args:"):
        return ""
    return line


def generate_component_page(wire_name: str, cls: type) -> str:
    """Generate MDX content for a single component."""
    schema = clean_schema(cls)
    description = _class_description(cls)

    # Determine if this is an action (has "action" discriminator)
    is_action = "action" in schema.get("properties", {})
    schema_type = "action" if is_action else "component"

    lines = [
        "---",
        f"title: {wire_name}",
        f"description: JSON Schema for the {wire_name} {schema_type}.",
        "---",
        "",
    ]

    if description:
        lines.append(description)
        lines.append("")

    lines.append("```json")
    lines.append(json.dumps(schema, indent=2))
    lines.append("```")
    lines.append("")

    return "\n".join(lines)


def main() -> None:
    PROTOCOL_DIR.mkdir(parents=True, exist_ok=True)

    generated = 0
    written = 0

    # Generate component pages
    for wire_name, cls in sorted(COMPONENT_CLASSES.items()):
        filename = _class_to_filename(wire_name) + ".mdx"
        content = generate_component_page(wire_name, cls)
        path = PROTOCOL_DIR / filename
        if not path.exists() or path.read_text() != content:
            path.write_text(content)
            print(f"  {path.relative_to(PROTOCOL_DIR.parents[2])}")
            written += 1
        generated += 1

    # Generate action pages
    for name, cls in sorted(ACTION_CLASSES.items()):
        filename = _class_to_filename(name) + ".mdx"
        content = generate_component_page(name, cls)
        path = PROTOCOL_DIR / filename
        if not path.exists() or path.read_text() != content:
            path.write_text(content)
            print(f"  {path.relative_to(PROTOCOL_DIR.parents[2])}")
            written += 1
        generated += 1

    print(f"\nGenerated {generated} protocol reference pages, {written} updated")


if __name__ == "__main__":
    main()
