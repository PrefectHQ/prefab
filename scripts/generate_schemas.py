#!/usr/bin/env python3
"""Generate JSON fixtures and manifest for Prefab contract tests.

Discovers all concrete Component subclasses and Action subclasses, creates
minimal instances, serializes them to JSON, and writes fixture files that
TypeScript contract tests validate against Zod schemas.

Usage:
    python scripts/generate_schemas.py          # Generate fixtures
    python scripts/generate_schemas.py --check  # Check freshness (CI mode)
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any, get_args, get_origin

from pydantic import BaseModel
from pydantic.fields import FieldInfo
from pydantic_core import PydanticUndefined

from prefab_ui.actions import Action
from prefab_ui.actions.fetch import Fetch
from prefab_ui.actions.file import OpenFilePicker
from prefab_ui.actions.mcp import CallTool, SendMessage, UpdateContext
from prefab_ui.actions.navigation import OpenLink
from prefab_ui.actions.state import AppendState, PopState, SetState, ToggleState
from prefab_ui.actions.timing import SetInterval
from prefab_ui.actions.ui import CloseOverlay, ShowToast
from prefab_ui.components import __all__ as component_names
from prefab_ui.components.base import Component, ContainerComponent
from prefab_ui.components.charts import (
    AreaChart,
    BarChart,
    LineChart,
    PieChart,
    RadarChart,
    RadialChart,
    ScatterChart,
)
from prefab_ui.components.control_flow import ForEach

SCHEMAS_DIR = Path(__file__).resolve().parent.parent / "schemas"
FIXTURES_DIR = SCHEMAS_DIR / "fixtures"
COMPONENTS_DIR = FIXTURES_DIR / "components"
ACTIONS_DIR = FIXTURES_DIR / "actions"

# Python-only authoring constructs that never appear on the wire.
# Excluded from manifest/fixtures (no corresponding Zod schema needed).
# Histogram is excluded because it serializes as BarChart (type="BarChart").
_AUTHORING_ONLY = {"If", "Elif", "Else", "Histogram"}

# Wire-only types produced by serialization transforms.
# Added to manifest with hand-crafted fixtures (no Python class).
_WIRE_ONLY_FIXTURES: dict[str, dict[str, Any]] = {
    "Condition": {
        "type": "Condition",
        "cases": [{"when": "true", "children": []}],
    },
}


def _minimal_value(field_info: FieldInfo, field_name: str) -> Any:
    """Produce a minimal valid value for a required Pydantic field."""
    annotation = field_info.annotation
    if annotation is None:
        return None

    origin = get_origin(annotation)
    args = get_args(annotation)

    # Unwrap Optional / Union with None
    if origin is type(None):
        return None

    # Handle Union types (e.g., str | None)
    import types

    if origin is types.UnionType or (origin and hasattr(origin, "__origin__")):
        non_none = [a for a in args if a is not type(None)]
        if non_none:
            annotation = non_none[0]
            origin = get_origin(annotation)
            args = get_args(annotation)

    # Primitives
    if annotation is str:
        return f"test_{field_name}"
    if annotation is int:
        return 1
    if annotation is float:
        return 1.0
    if annotation is bool:
        return False

    # Literal — pick first value
    if origin is type(None):
        return None
    try:
        from typing import Literal

        if origin is Literal:
            return args[0] if args else None
    except ImportError:
        pass

    # list[X]
    if origin is list:
        return []

    # dict[K, V]
    if origin is dict:
        return {}

    # Pydantic BaseModel subclass
    if isinstance(annotation, type) and issubclass(annotation, BaseModel):
        return _minimal_instance(annotation)

    return None


def _minimal_instance(cls: type[BaseModel]) -> BaseModel:
    """Create a minimal valid instance of a Pydantic model."""
    kwargs: dict[str, Any] = {}
    for name, field_info in cls.model_fields.items():
        has_default = (
            field_info.default is not PydanticUndefined
            or field_info.default_factory is not None
        )
        if has_default:
            continue
        kwargs[name] = _minimal_value(field_info, name)
    return cls(**kwargs)


def discover_components() -> dict[str, type[Component]]:
    """Discover all concrete Component subclasses from __all__ and submodules."""
    import prefab_ui.components as mod

    result: dict[str, type[Component]] = {}
    for name in component_names:
        if name in _AUTHORING_ONLY:
            continue
        cls = getattr(mod, name)
        if not isinstance(cls, type):
            continue
        if not issubclass(cls, Component):
            continue
        if cls in (Component, ContainerComponent):
            continue
        result[name] = cls

    # Submodule components (not re-exported from the flat namespace)
    _SUBMODULE_COMPONENTS: list[type[Component]] = [
        AreaChart,
        BarChart,
        LineChart,
        PieChart,
        RadarChart,
        RadialChart,
        ScatterChart,
        ForEach,
    ]
    for cls in _SUBMODULE_COMPONENTS:
        wire_name = cls.model_fields["type"].default
        result[wire_name] = cls

    return result


def discover_actions() -> dict[str, type[Action]]:
    """Return all concrete action types keyed by their discriminator."""
    actions = [
        CallTool,
        SendMessage,
        UpdateContext,
        OpenLink,
        SetState,
        ToggleState,
        AppendState,
        PopState,
        ShowToast,
        CloseOverlay,
        OpenFilePicker,
        Fetch,
        SetInterval,
    ]
    result: dict[str, type[Action]] = {}
    for cls in actions:
        instance = _minimal_instance(cls)
        discriminator = instance.model_dump(by_alias=True).get("action", "")
        result[discriminator] = cls
    return result


def generate_component_fixture(cls: type[Component]) -> dict[str, Any]:
    """Generate a JSON fixture for a component."""
    import warnings

    instance = _minimal_instance(cls)
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", UserWarning)
        return instance.to_json()


def generate_action_fixture(cls: type[Action]) -> dict[str, Any]:
    """Generate a JSON fixture for an action."""
    import warnings

    instance = _minimal_instance(cls)
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", UserWarning)
        return instance.model_dump(by_alias=True, exclude_none=True)


def generate_all() -> dict[str, Any]:
    """Generate all fixtures and return the manifest."""
    components = discover_components()
    actions = discover_actions()

    COMPONENTS_DIR.mkdir(parents=True, exist_ok=True)
    ACTIONS_DIR.mkdir(parents=True, exist_ok=True)

    component_names_list = sorted([*components.keys(), *_WIRE_ONLY_FIXTURES.keys()])
    action_names_list = sorted(actions.keys())

    for name, cls in components.items():
        fixture = generate_component_fixture(cls)
        (COMPONENTS_DIR / f"{name}.json").write_text(
            json.dumps(fixture, indent=2) + "\n"
        )

    for name, fixture in _WIRE_ONLY_FIXTURES.items():
        (COMPONENTS_DIR / f"{name}.json").write_text(
            json.dumps(fixture, indent=2) + "\n"
        )

    for discriminator, cls in actions.items():
        fixture = generate_action_fixture(cls)
        (ACTIONS_DIR / f"{discriminator}.json").write_text(
            json.dumps(fixture, indent=2) + "\n"
        )

    manifest = {
        "components": component_names_list,
        "actions": action_names_list,
    }
    (SCHEMAS_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")

    return manifest


def check_freshness() -> bool:
    """Check whether fixtures are up-to-date. Returns True if fresh."""
    manifest_path = SCHEMAS_DIR / "manifest.json"
    if not manifest_path.exists():
        print("manifest.json does not exist — run generate first")
        return False

    existing_manifest = json.loads(manifest_path.read_text())

    components = discover_components()
    actions = discover_actions()

    expected_components = sorted([*components.keys(), *_WIRE_ONLY_FIXTURES.keys()])
    expected_actions = sorted(actions.keys())

    if existing_manifest.get("components") != expected_components:
        print("Component list mismatch:")
        print(f"  Expected: {expected_components}")
        print(f"  Got:      {existing_manifest.get('components')}")
        return False

    if existing_manifest.get("actions") != expected_actions:
        print("Action list mismatch:")
        print(f"  Expected: {expected_actions}")
        print(f"  Got:      {existing_manifest.get('actions')}")
        return False

    # Check each fixture matches current output
    for name, cls in components.items():
        fixture_path = COMPONENTS_DIR / f"{name}.json"
        if not fixture_path.exists():
            print(f"Missing fixture: {fixture_path}")
            return False
        existing = json.loads(fixture_path.read_text())
        expected = generate_component_fixture(cls)
        if existing != expected:
            print(f"Fixture drift: {name}")
            print(f"  Expected: {json.dumps(expected, indent=2)}")
            print(f"  Got:      {json.dumps(existing, indent=2)}")
            return False

    for discriminator, cls in actions.items():
        fixture_path = ACTIONS_DIR / f"{discriminator}.json"
        if not fixture_path.exists():
            print(f"Missing fixture: {fixture_path}")
            return False
        existing = json.loads(fixture_path.read_text())
        expected = generate_action_fixture(cls)
        if existing != expected:
            print(f"Fixture drift: {discriminator}")
            return False

    print("All fixtures are up-to-date.")
    return True


if __name__ == "__main__":
    if "--check" in sys.argv:
        sys.exit(0 if check_freshness() else 1)
    else:
        manifest = generate_all()
        print(f"Generated {len(manifest['components'])} component fixtures")
        print(f"Generated {len(manifest['actions'])} action fixtures")
        print(f"Manifest: {SCHEMAS_DIR / 'manifest.json'}")
