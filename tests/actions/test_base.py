"""Tests for base action behavior."""

from prefab_ui.actions import SetState
from prefab_ui.actions.mcp import CallTool
from prefab_ui.components import Button


class TestActionChain:
    def test_serializes_on_component(self):
        button = Button(
            label="Submit",
            on_click=SetState("loading", True)
            | CallTool("process")
            | SetState("loading", False),
        )

        data = button.to_json()

        assert [action["action"] for action in data["onClick"]] == [
            "setState",
            "toolCall",
            "setState",
        ]

    def test_is_a_list(self):
        actions = SetState("loading", True) | CallTool("process")

        assert isinstance(actions, list)
