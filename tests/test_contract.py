"""Python-side contract tests for the Prefab wire format.

Verifies that:
1. to_json() output validates against the model's own JSON Schema
2. Fixtures and manifest are fresh (no drift from Python model changes)
"""

from __future__ import annotations

import json
import warnings
from pathlib import Path

import jsonschema
import pytest

from prefab_ui.actions import ActionBase
from prefab_ui.actions.mcp import SendMessage, ToolCall, UpdateContext
from prefab_ui.actions.navigation import OpenLink
from prefab_ui.actions.state import SetState, ToggleState
from prefab_ui.actions.ui import ShowToast
from prefab_ui.components.base import Component, ContainerComponent

SCHEMAS_DIR = Path(__file__).resolve().parent.parent / "schemas"


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _all_concrete_components() -> list[type[Component]]:
    """Discover all concrete Component subclasses."""
    import prefab_ui.components as mod
    from prefab_ui.components import __all__ as names

    result = []
    for name in names:
        cls = getattr(mod, name)
        if isinstance(cls, type) and issubclass(cls, Component) and cls not in (
            Component,
            ContainerComponent,
        ):
            result.append(cls)
    return result


def _all_action_classes() -> list[type[ActionBase]]:
    return [ToolCall, SendMessage, UpdateContext, OpenLink, SetState, ToggleState, ShowToast]


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
    from scripts.generate_schemas import _minimal_instance

    instance = _minimal_instance(cls)
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", UserWarning)
        json_output = instance.to_json()
    schema = cls.model_json_schema()

    jsonschema.validate(instance=json_output, schema=schema)


@pytest.mark.parametrize(
    "cls",
    _all_action_classes(),
    ids=lambda c: c.__name__,
)
def test_action_json_validates_against_own_schema(cls: type[ActionBase]) -> None:
    """Each action's serialized output should validate against its JSON Schema."""
    from scripts.generate_schemas import _minimal_instance

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
    assert manifest_path.exists(), "Run `python scripts/generate_schemas.py` to generate fixtures"


def test_fixtures_are_fresh() -> None:
    """Fixtures match what the current Python models produce."""
    from scripts.generate_schemas import check_freshness

    assert check_freshness(), (
        "Fixtures are stale — run `python scripts/generate_schemas.py` to regenerate"
    )


def test_manifest_components_match_discovered() -> None:
    """Manifest component list matches discovered components."""
    manifest = json.loads((SCHEMAS_DIR / "manifest.json").read_text())
    discovered = sorted(cls.__name__ for cls in _all_concrete_components())
    assert manifest["components"] == discovered


def test_manifest_actions_match_discovered() -> None:
    """Manifest action list matches discovered actions."""
    from scripts.generate_schemas import discover_actions

    manifest = json.loads((SCHEMAS_DIR / "manifest.json").read_text())
    discovered = sorted(discover_actions().keys())
    assert manifest["actions"] == discovered
