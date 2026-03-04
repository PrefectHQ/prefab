"""Tests for MCP transport actions (CallTool, SendMessage, UpdateContext, RequestDisplayMode)."""

import types

import pytest

from prefab_ui.actions.mcp import (
    CallTool,
    RequestDisplayMode,
    SendMessage,
    UpdateContext,
)
from prefab_ui.actions.ui import ShowToast
from prefab_ui.app import PrefabApp, _tool_resolver
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


class TestCallToolCallableRef:
    """CallTool accepts callable function references for the tool argument."""

    def _dummy_tool(self) -> dict[str, str]:
        return {"status": "ok"}

    def test_callable_serializes_to_name(self):
        def save_contact(name: str) -> dict[str, str]:
            return {"name": name}

        a = CallTool(save_contact)
        d = a.model_dump()
        assert d["tool"] == "save_contact"

    def test_callable_with_resolver(self):
        def save_contact(name: str) -> dict[str, str]:
            return {"name": name}

        token = _tool_resolver.set(lambda fn: f"{fn.__name__}-abc123")
        try:
            a = CallTool(save_contact)
            d = a.model_dump()
            assert d["tool"] == "save_contact-abc123"
        finally:
            _tool_resolver.reset(token)

    def test_string_tool_unchanged(self):
        a = CallTool("refresh")
        d = a.model_dump()
        assert d["tool"] == "refresh"

    def test_callable_on_component(self):
        def save_contact(name: str) -> dict[str, str]:
            return {"name": name}

        btn = Button(label="Save", on_click=CallTool(save_contact))
        j = btn.to_json()
        assert j["onClick"]["tool"] == "save_contact"

    def test_callable_with_prefab_app(self):
        def save_contact(name: str) -> dict[str, str]:
            return {"name": name}

        app = PrefabApp(
            view=Button(
                label="Save",
                on_click=CallTool(save_contact),
            ),
        )

        def resolver(fn: types.FunctionType) -> str:
            return f"{fn.__name__}-resolved"

        data = app.to_json(tool_resolver=resolver)
        assert data["view"]["onClick"]["tool"] == "save_contact-resolved"

    def test_resolver_scoped_to_call(self):
        """Resolver ContextVar resets after to_json() returns."""

        def my_tool() -> None:
            pass

        def resolver(fn: object) -> str:
            return "resolved"

        app = PrefabApp(
            view=Button(label="Go", on_click=CallTool(my_tool)),
        )
        app.to_json(tool_resolver=resolver)

        # After the call, the ContextVar should be reset
        a = CallTool(my_tool)
        d = a.model_dump()
        assert d["tool"] == "my_tool"

    def test_callable_with_arguments(self):
        def search(query: str) -> list[str]:
            return []

        a = CallTool(search, arguments={"q": "{{ query }}"})
        d = a.model_dump()
        assert d["tool"] == "search"
        assert d["arguments"]["q"] == "{{ query }}"

    def test_callable_preserves_result_key(self):
        def search(query: str) -> list[str]:
            return []

        a = CallTool(search, result_key="results")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["tool"] == "search"
        assert d["resultKey"] == "results"


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
