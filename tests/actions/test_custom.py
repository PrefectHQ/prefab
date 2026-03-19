"""Tests for CallHandler action."""

from __future__ import annotations

from prefab_ui.actions import CallHandler, SetState


class TestCallHandler:
    def test_positional_init(self):
        h = CallHandler("myHandler")
        assert h.handler == "myHandler"
        assert h.action == "callHandler"

    def test_keyword_init(self):
        h = CallHandler(handler="myHandler")
        assert h.handler == "myHandler"

    def test_wire_format(self):
        h = CallHandler("myHandler")
        d = h.model_dump(by_alias=True, exclude_none=True)
        assert d == {"action": "callHandler", "handler": "myHandler"}

    def test_with_arguments(self):
        h = CallHandler("myHandler", arguments={"max": 100, "key": "infra"})
        d = h.model_dump(by_alias=True, exclude_none=True)
        assert d == {
            "action": "callHandler",
            "handler": "myHandler",
            "arguments": {"max": 100, "key": "infra"},
        }

    def test_arguments_none_excluded(self):
        h = CallHandler("myHandler")
        d = h.model_dump(by_alias=True, exclude_none=True)
        assert "arguments" not in d

    def test_in_action_list(self):
        actions = [SetState("loading", True), CallHandler("refresh")]
        dumps = [a.model_dump(by_alias=True, exclude_none=True) for a in actions]
        assert dumps[0]["action"] == "setState"
        assert dumps[1]["action"] == "callHandler"
        assert dumps[1]["handler"] == "refresh"
