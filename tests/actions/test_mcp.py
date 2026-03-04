"""Tests for MCP transport actions (CallTool, SendMessage, UpdateContext, RequestDisplayMode)."""

import pytest

from prefab_ui.actions.mcp import (
    CallTool,
    RequestDisplayMode,
    SendMessage,
    UpdateContext,
)
from prefab_ui.actions.ui import ShowToast
from prefab_ui.components import Button


class TestCallToolSerialization:
    def test_positional(self):
        a = CallTool("refresh")
        d = a.model_dump()
        assert d["action"] == "toolCall"
        assert d["tool"] == "refresh"
        assert d["arguments"] == {}

    def test_with_args(self):
        a = CallTool("search", arguments={"q": "{{ query }}"})
        d = a.model_dump()
        assert d["arguments"]["q"] == "{{ query }}"

    def test_result_key_serializes(self):
        action = CallTool("search", result_key="results")
        d = action.model_dump(by_alias=True, exclude_none=True)
        assert d["resultKey"] == "results"

    def test_result_key_excluded_when_none(self):
        action = CallTool("search")
        d = action.model_dump(by_alias=True, exclude_none=True)
        assert "resultKey" not in d

    def test_result_key_with_callbacks(self):
        action = CallTool(
            "search",
            result_key="results",
            on_success=ShowToast("Found results!"),
        )
        d = action.model_dump(by_alias=True, exclude_none=True)
        assert d["resultKey"] == "results"
        assert d["onSuccess"]["action"] == "showToast"

    def test_result_key_on_component(self):
        btn = Button(
            label="Search",
            on_click=CallTool("search", result_key="results"),
        )
        j = btn.to_json()
        assert j["onClick"]["resultKey"] == "results"


class TestSendMessageSerialization:
    def test_positional(self):
        a = SendMessage("Summarize this")
        d = a.model_dump()
        assert d["action"] == "sendMessage"
        assert d["content"] == "Summarize this"


class TestUpdateContextSerialization:
    def test_content(self):
        a = UpdateContext(content="context text")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["action"] == "updateContext"
        assert d["content"] == "context text"

    def test_structured_content(self):
        a = UpdateContext(structured_content={"key": "value"})
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["structuredContent"] == {"key": "value"}


class TestRequestDisplayModeSerialization:
    def test_positional(self):
        a = RequestDisplayMode("fullscreen")
        d = a.model_dump()
        assert d["action"] == "requestDisplayMode"
        assert d["mode"] == "fullscreen"

    @pytest.mark.parametrize("mode", ["inline", "fullscreen", "pip"])
    def test_all_modes(self, mode: str):
        a = RequestDisplayMode(mode)
        assert a.model_dump()["mode"] == mode
