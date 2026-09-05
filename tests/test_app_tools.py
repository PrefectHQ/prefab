"""App tools survive the same wire serialization used by FastMCP."""

import json
import runpy
from pathlib import Path
from typing import Any

import pytest
from pydantic import BaseModel, ValidationError

from prefab_ui.actions import CallTool, SetState
from prefab_ui.app import AppTool, PrefabApp, ResolvedTool
from prefab_ui.components import Button
from prefab_ui.rx import ERROR, RESULT, STATE

EXAMPLE = Path(__file__).parents[1] / "examples" / "app_tools.py"


def test_counter_serializes_for_standard_renderer():
    app = runpy.run_path(str(EXAMPLE))["app"]
    wire = json.loads(json.dumps(app.to_json()))
    assert wire["state"] == {"count": 0}
    get_count, increment = wire["tools"]
    assert get_count["result"] == {"count": "{{ count }}"}
    assert increment["inputSchema"]["properties"]["amount"]["type"] == "integer"
    assert increment["inputSchema"]["required"] == ["amount"]
    assert increment["inputSchema"]["additionalProperties"] is False
    assert increment["actions"] == {
        "action": "setState",
        "key": "count",
        "value": "{{ count + $event.amount }}",
    }
    assert PrefabApp.from_json(wire).to_json()["tools"] == wire["tools"]
    fixture = EXAMPLE.parents[1] / "renderer/src/testing/counter-app.json"
    assert wire == json.loads(fixture.read_text())


def test_result_is_required():
    with pytest.raises(ValidationError, match="result"):
        AppTool("get_count")


def test_only_explicit_result_is_serialized():
    app = PrefabApp(
        state={"count": 0, "private": "hidden"},
        app_tools=[AppTool("get_count", result={"count": STATE.count})],
    )
    assert app.to_json()["tools"][0]["result"] == {"count": "{{ count }}"}


@pytest.mark.parametrize("schema", [{"type": "array"}, {"properties": {}}, str])
def test_requires_object_input_schema(schema):
    with pytest.raises(ValidationError, match="must describe an object"):
        AppTool("bad", input_schema=schema, result={})


@pytest.mark.parametrize("name", ["", "has space", "a" * 129])
def test_invalid_name(name):
    with pytest.raises(ValidationError):
        AppTool(name, result={})


def test_duplicate_names():
    with pytest.raises(ValidationError, match="unique"):
        PrefabApp(app_tools=[AppTool("x", result={}), AppTool("x", result={})])


def test_nested_pydantic_schema_and_actions():
    class Amount(BaseModel):
        value: int

    class Args(BaseModel):
        amount: Amount

    tool = AppTool(
        "x",
        input_schema=Args,
        actions=[SetState("count", STATE.count + 1, on_success=SetState("done", True))],
        result={"nested": [{"count": STATE.count}]},
    )
    wire = tool.model_dump(by_alias=True, exclude_none=True)
    assert (
        wire["inputSchema"]["$defs"]["Amount"]["properties"]["value"]["type"]
        == "integer"
    )
    assert wire["actions"][0]["onSuccess"]["action"] == "setState"
    assert wire["result"] == {"nested": [{"count": "{{ count }}"}]}


def test_app_tools_use_existing_server_tool_resolver():
    def server_tool():
        pass

    app = PrefabApp(
        app_tools=[AppTool("x", actions=CallTool(server_tool), result={})]
    )
    wire = app.to_json(tool_resolver=lambda ref: ResolvedTool("resolved"))
    assert wire["tools"][0]["actions"]["tool"] == "resolved"


def backend_increment(counter_id: str, amount: int = 1) -> dict[str, int]:
    raise AssertionError("Serialization must never execute the backend")


BACKEND_SCHEMA: dict[str, Any] = {
    "type": "object",
    "properties": {
        "counter_id": {"type": "string"},
        "amount": {"type": "integer", "default": 1},
        "options": {"$ref": "#/$defs/Options"},
    },
    "required": ["counter_id"],
    "additionalProperties": False,
    "$defs": {
        "Options": {"type": "object", "properties": {"label": {"type": "string"}}}
    },
}


def backend_resolver(ref):
    assert ref is backend_increment
    return ResolvedTool(
        "counters_increment_abc123",
        local_name="increment",
        description="Increment this counter",
        input_schema=BACKEND_SCHEMA,
        unwrap_result=True,
    )


def test_callable_compiles_bindings_and_callbacks_without_executing():
    interaction = AppTool(
        backend_increment,
        bind={"counter_id": STATE.counter_id},
        on_success=SetState("count", RESULT.count),
        on_error=SetState("error", ERROR),
        result={"count": STATE.count},
    )
    app = PrefabApp(
        view=Button("Increment", on_click=interaction.invoke(amount=1)),
        state={"counter_id": "counter-a", "count": 0},
        app_tools=[interaction],
    )
    wire = app.to_json(tool_resolver=backend_resolver)
    tool = wire["tools"][0]
    assert tool["name"] == "increment"
    assert tool["description"] == "Increment this counter"
    assert tool["bind"] == {"counter_id": "{{ counter_id }}"}
    assert tool["inputSchema"]["required"] == []
    assert "counter_id" not in tool["inputSchema"]["properties"]
    assert tool["actions"] == {
        "action": "toolCall",
        "tool": "counters_increment_abc123",
        "arguments": "{{ $event }}",
        "unwrapResult": True,
        "onSuccess": {
            "action": "setState",
            "key": "count",
            "value": "{{ $result.count }}",
        },
        "onError": {"action": "setState", "key": "error", "value": "{{ $error }}"},
    }
    assert wire["view"]["children"][0]["onClick"] == {
        "action": "invokeAppTool",
        "tool": "increment",
        "arguments": {"amount": 1},
    }
    restored = PrefabApp.from_json(wire)
    assert restored.to_json()["tools"] == wire["tools"]
    assert restored.view == wire["view"]


def test_projection_preserves_defaults_and_refs_without_mutating_registration():
    interaction = AppTool(backend_increment, bind={"counter_id": "a"}, result={})
    schema = PrefabApp(app_tools=[interaction]).to_json(
        tool_resolver=backend_resolver
    )["tools"][0]["inputSchema"]
    assert schema["properties"]["amount"] == {"type": "integer", "default": 1}
    assert schema["properties"]["options"] == {"$ref": "#/$defs/Options"}
    assert schema["$defs"] == BACKEND_SCHEMA["$defs"]
    assert BACKEND_SCHEMA["required"] == ["counter_id"]
    assert "counter_id" in BACKEND_SCHEMA["properties"]


def test_explicit_name_and_description_override_registered_metadata():
    interaction = AppTool(backend_increment, name="add", description="Add", result={})
    app = PrefabApp(
        view=Button("Add", on_click=interaction.invoke()), app_tools=[interaction]
    )
    wire = app.to_json(tool_resolver=backend_resolver)
    assert wire["tools"][0]["name"] == "add"
    assert wire["tools"][0]["description"] == "Add"
    assert wire["view"]["children"][0]["onClick"]["tool"] == "add"


@pytest.mark.parametrize(
    "metadata, message",
    [
        (ResolvedTool("address"), "local_name"),
        (ResolvedTool("address", local_name="increment"), "input_schema"),
    ],
)
def test_callable_requires_registered_metadata(metadata, message):
    with pytest.raises(ValueError, match=message):
        PrefabApp(app_tools=[AppTool(backend_increment, result={})]).to_json(
            tool_resolver=lambda ref: metadata
        )


def test_callable_requires_serialization_resolver():
    with pytest.raises(ValueError, match="tool_resolver"):
        PrefabApp(app_tools=[AppTool(backend_increment, result={})]).to_json()


def test_explicit_metadata_can_use_name_only_resolver():
    app = PrefabApp(
        app_tools=[
            AppTool(
                backend_increment,
                name="increment",
                input_schema=BACKEND_SCHEMA,
                result={},
            )
        ]
    )
    assert (
        app.to_json(tool_resolver=lambda ref: ResolvedTool("address"))["tools"][0][
            "name"
        ]
        == "increment"
    )


def test_bind_rejects_unknown_parameter():
    with pytest.raises(ValueError, match="Unknown bound backend parameters"):
        PrefabApp(
            app_tools=[AppTool(backend_increment, bind={"typo": "a"}, result={})]
        ).to_json(tool_resolver=backend_resolver)


def test_bound_parameters_rejected_even_with_additional_properties():
    schema = {**BACKEND_SCHEMA, "additionalProperties": True}
    app = PrefabApp(
        app_tools=[
            AppTool(
                backend_increment,
                name="increment",
                input_schema=schema,
                bind={"counter_id": "a"},
                result={},
            )
        ]
    )
    exposed = app.to_json(tool_resolver=backend_resolver)["tools"][0]["inputSchema"]
    assert exposed["additionalProperties"] is True
    assert exposed["not"] == {"anyOf": [{"required": ["counter_id"]}]}


def test_cross_parameter_constraints_fail_clearly_instead_of_weakening_schema():
    schema = {**BACKEND_SCHEMA, "dependentRequired": {"counter_id": ["amount"]}}
    with pytest.raises(ValueError, match="top-level constraints"):
        PrefabApp(
            app_tools=[
                AppTool(
                    backend_increment,
                    input_schema=schema,
                    bind={"counter_id": "a"},
                    result={},
                )
            ]
        ).to_json(tool_resolver=backend_resolver)


def test_duplicate_names_detected_after_resolution():
    with pytest.raises(ValueError, match="unique after resolution"):
        PrefabApp(
            app_tools=[
                AppTool(backend_increment, result={}),
                AppTool("increment", result={}),
            ]
        ).to_json(tool_resolver=backend_resolver)


def test_repeated_serialization_uses_current_resolver_for_local_calls_too():
    interaction = AppTool(backend_increment, result={})
    app = PrefabApp(
        view=Button("Run", on_click=interaction.invoke()), app_tools=[interaction]
    )
    for name in ("first", "second"):
        wire = app.to_json(
            tool_resolver=lambda ref: ResolvedTool(
                f"prefix_{name}", local_name=name, input_schema=BACKEND_SCHEMA
            )
        )
        assert wire["tools"][0]["name"] == name
        assert wire["tools"][0]["actions"]["tool"] == f"prefix_{name}"
        assert wire["view"]["children"][0]["onClick"]["tool"] == name


def test_callable_and_explicit_actions_are_mutually_exclusive():
    with pytest.raises(ValueError, match="generates its own actions"):
        AppTool(backend_increment, actions=[], result={})


def test_backend_example_matches_standard_renderer_fixture():
    builder = runpy.run_path(str(EXAMPLE.with_name("app_tools_backend.py")))[
        "counter_app"
    ]
    schema = {
        **BACKEND_SCHEMA,
        "properties": {
            k: v for k, v in BACKEND_SCHEMA["properties"].items() if k != "options"
        },
    }
    schema.pop("$defs")
    app = builder(backend_increment, "counter-a")
    wire = app.to_json(
        tool_resolver=lambda ref: ResolvedTool(
            "counters_increment_abc123",
            local_name="increment",
            description="Increment this counter",
            input_schema=schema,
        )
    )
    fixture = EXAMPLE.parents[1] / "renderer/src/testing/backend-counter-app.json"
    assert wire == json.loads(fixture.read_text())
