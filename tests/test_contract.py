"""Python-side contract tests for the Prefab wire format.

Verifies that:
1. to_json() output validates against the model's own JSON Schema
2. Fixtures and manifest are fresh (no drift from Python model changes)
"""

from __future__ import annotations

import json
import warnings
from pathlib import Path
from typing import Any, TypeVar

import jsonschema
import pytest
from pydantic import BaseModel
from pydantic.fields import FieldInfo
from pydantic_core import PydanticUndefined

from prefab_ui.actions import ActionBase
from prefab_ui.actions.mcp import SendMessage, ToolCall, UpdateContext
from prefab_ui.actions.navigation import OpenLink
from prefab_ui.actions.state import AppendState, PopState, SetState, ToggleState
from prefab_ui.actions.ui import ShowToast
from prefab_ui.components import __all__ as component_names
from prefab_ui.components.base import Component, ContainerComponent

SCHEMAS_DIR = Path(__file__).resolve().parent.parent / "schemas"
FIXTURES_DIR = SCHEMAS_DIR / "fixtures"
COMPONENTS_DIR = FIXTURES_DIR / "components"
ACTIONS_DIR = FIXTURES_DIR / "actions"

ALL_ACTION_CLASSES: list[type[ActionBase]] = [
    ToolCall,
    SendMessage,
    UpdateContext,
    OpenLink,
    SetState,
    ToggleState,
    AppendState,
    PopState,
    ShowToast,
]


# ---------------------------------------------------------------------------
# Helpers: minimal instance construction (also used by scripts/generate_schemas.py)
# ---------------------------------------------------------------------------


def _minimal_value(field_info: FieldInfo, field_name: str) -> Any:
    """Produce a minimal valid value for a required Pydantic field."""
    import types
    from typing import Literal, get_args, get_origin

    annotation = field_info.annotation
    if annotation is None:
        return None

    origin = get_origin(annotation)
    args = get_args(annotation)

    if origin is type(None):
        return None

    if origin is types.UnionType or (origin and hasattr(origin, "__origin__")):
        non_none = [a for a in args if a is not type(None)]
        if non_none:
            annotation = non_none[0]
            origin = get_origin(annotation)
            args = get_args(annotation)

    if annotation is str:
        return f"test_{field_name}"
    if annotation is int:
        return 1
    if annotation is float:
        return 1.0
    if annotation is bool:
        return False

    if origin is type(None):
        return None
    if origin is Literal:
        return args[0] if args else None
    if origin is list:
        return []
    if origin is dict:
        return {}
    if isinstance(annotation, type) and issubclass(annotation, BaseModel):
        return _minimal_instance(annotation)

    return None


_M = TypeVar("_M", bound=BaseModel)


def _minimal_instance(cls: type[_M]) -> _M:
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


# Python-only authoring constructs — excluded from wire format contract tests
_AUTHORING_ONLY = {"If", "Elif", "Else"}

# Wire-only types produced by serialization transforms (no Python class)
_WIRE_ONLY = {"Condition"}


def _all_concrete_components() -> list[type[Component]]:
    """Discover all concrete Component subclasses (excluding authoring-only)."""
    import prefab_ui.components as mod

    result = []
    for name in component_names:
        if name in _AUTHORING_ONLY:
            continue
        cls = getattr(mod, name)
        if (
            isinstance(cls, type)
            and issubclass(cls, Component)
            and cls
            not in (
                Component,
                ContainerComponent,
            )
        ):
            result.append(cls)
    return result


def _discover_actions() -> dict[str, type[ActionBase]]:
    """Return all concrete action types keyed by their discriminator."""
    result: dict[str, type[ActionBase]] = {}
    for cls in ALL_ACTION_CLASSES:
        instance = _minimal_instance(cls)
        discriminator = instance.model_dump(by_alias=True).get("action", "")
        result[discriminator] = cls
    return result


def _generate_component_fixture(cls: type[Component]) -> dict[str, Any]:
    """Generate a JSON fixture for a component."""
    instance = _minimal_instance(cls)
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", UserWarning)
        return instance.to_json()


def _generate_action_fixture(cls: type[ActionBase]) -> dict[str, Any]:
    """Generate a JSON fixture for an action."""
    instance = _minimal_instance(cls)
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", UserWarning)
        return instance.model_dump(by_alias=True, exclude_none=True)


# ---------------------------------------------------------------------------
# Schema conformance: to_json() ↔ model_json_schema()
# ---------------------------------------------------------------------------


@pytest.mark.parametrize(
    "cls",
    _all_concrete_components(),
    ids=lambda c: c.__name__,
)
def test_component_json_validates_against_own_schema(cls: type[Component]) -> None:
    """Each component's to_json() output should validate against its JSON Schema."""
    instance = _minimal_instance(cls)
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", UserWarning)
        json_output = instance.to_json()
    schema = cls.model_json_schema()

    jsonschema.validate(instance=json_output, schema=schema)


@pytest.mark.parametrize(
    "cls",
    ALL_ACTION_CLASSES,
    ids=lambda c: c.__name__,
)
def test_action_json_validates_against_own_schema(cls: type[ActionBase]) -> None:
    """Each action's serialized output should validate against its JSON Schema."""
    instance = _minimal_instance(cls)
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", UserWarning)
        json_output = instance.model_dump(by_alias=True, exclude_none=True)
    schema = cls.model_json_schema()

    jsonschema.validate(instance=json_output, schema=schema)


# ---------------------------------------------------------------------------
# Fixture freshness
# ---------------------------------------------------------------------------


def test_manifest_exists() -> None:
    manifest_path = SCHEMAS_DIR / "manifest.json"
    assert manifest_path.exists(), (
        "Run `uv run python scripts/generate_schemas.py` to generate fixtures"
    )


def test_fixtures_are_fresh() -> None:
    """Fixtures match what the current Python models produce."""
    components = {cls.__name__: cls for cls in _all_concrete_components()}
    actions = _discover_actions()

    manifest = json.loads((SCHEMAS_DIR / "manifest.json").read_text())

    for name, cls in components.items():
        fixture_path = COMPONENTS_DIR / f"{name}.json"
        assert fixture_path.exists(), f"Missing fixture: {fixture_path}"
        existing = json.loads(fixture_path.read_text())
        expected = _generate_component_fixture(cls)
        assert existing == expected, f"Fixture drift: {name}"

    for discriminator, cls in actions.items():
        fixture_path = ACTIONS_DIR / f"{discriminator}.json"
        assert fixture_path.exists(), f"Missing fixture: {fixture_path}"
        existing = json.loads(fixture_path.read_text())
        expected = _generate_action_fixture(cls)
        assert existing == expected, f"Fixture drift: {discriminator}"

    assert manifest["components"] == sorted([*components.keys(), *_WIRE_ONLY])
    assert manifest["actions"] == sorted(actions.keys())


def test_manifest_components_match_discovered() -> None:
    """Manifest component list matches discovered + wire-only components."""
    manifest = json.loads((SCHEMAS_DIR / "manifest.json").read_text())
    discovered = sorted(
        [*(cls.__name__ for cls in _all_concrete_components()), *_WIRE_ONLY]
    )
    assert manifest["components"] == discovered


def test_manifest_actions_match_discovered() -> None:
    """Manifest action list matches discovered actions."""
    manifest = json.loads((SCHEMAS_DIR / "manifest.json").read_text())
    discovered = sorted(_discover_actions().keys())
    assert manifest["actions"] == discovered
