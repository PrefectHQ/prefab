"""Local app-tool invocations retain identity until serialization."""

from prefab_ui.actions.app_tool import InvokeAppTool
from prefab_ui.app import AppTool
from prefab_ui.rx import EVENT


def test_invoke_constructs_a_declarative_action_with_reactive_arguments():
    definition = AppTool("increment", result={})
    action = definition.invoke(amount=EVENT)
    definition.name = "add"
    assert action.model_dump(by_alias=True, exclude_none=True) == {
        "action": "invokeAppTool",
        "tool": "add",
        "arguments": {"amount": "{{ $event }}"},
    }


def test_string_reference_supports_json_authored_tools():
    assert InvokeAppTool("increment", arguments={"amount": 1}).model_dump(
        exclude_none=True
    ) == {
        "action": "invokeAppTool",
        "tool": "increment",
        "arguments": {"amount": 1},
    }
