"""Tests for Prefab action serialization and lifecycle callbacks."""

from __future__ import annotations

from prefab_ui.actions import (
    ActionBase,
    OpenLink,
    SetState,
    ShowToast,
    ToggleState,
    UpdateContext,
)
from prefab_ui.actions.mcp import SendMessage, ToolCall
from prefab_ui.components import Button, Checkbox, Input, Slider


class TestActionSerialization:
    def test_tool_call_positional(self):
        a = ToolCall("refresh")
        d = a.model_dump()
        assert d["action"] == "toolCall"
        assert d["tool"] == "refresh"
        assert d["arguments"] == {}

    def test_tool_call_with_args(self):
        a = ToolCall("search", arguments={"q": "{{ query }}"})
        d = a.model_dump()
        assert d["arguments"]["q"] == "{{ query }}"

    def test_send_message(self):
        a = SendMessage("Summarize this")
        d = a.model_dump()
        assert d["action"] == "sendMessage"
        assert d["content"] == "Summarize this"

    def test_set_state_default_event(self):
        a = SetState("brightness")
        d = a.model_dump()
        assert d["action"] == "setState"
        assert d["key"] == "brightness"
        assert d["value"] == "{{ $event }}"

    def test_set_state_explicit_value(self):
        a = SetState("loading", True)
        d = a.model_dump()
        assert d["value"] is True

    def test_toggle_state(self):
        a = ToggleState("showDetails")
        d = a.model_dump()
        assert d["action"] == "toggleState"
        assert d["key"] == "showDetails"


class TestShowToastAction:
    def test_show_toast_positional(self):
        a = ShowToast("Saved!")
        d = a.model_dump()
        assert d["action"] == "showToast"
        assert d["message"] == "Saved!"

    def test_show_toast_with_variant(self):
        a = ShowToast("Error occurred", variant="error", duration=5000)
        d = a.model_dump()
        assert d["variant"] == "error"
        assert d["duration"] == 5000

    def test_show_toast_on_button(self):
        b = Button(label="Save", on_click=ShowToast("Done!", variant="success"))
        j = b.to_json()
        assert j["onClick"]["action"] == "showToast"
        assert j["onClick"]["message"] == "Done!"
        assert j["onClick"]["variant"] == "success"


class TestActionOnComponents:
    def test_button_on_click(self):
        b = Button(label="Go", on_click=ToolCall("refresh"))
        j = b.to_json()
        assert j["onClick"]["action"] == "toolCall"
        assert j["onClick"]["tool"] == "refresh"

    def test_button_action_list(self):
        b = Button(
            label="Submit",
            on_click=[SetState("loading", True), ToolCall("process")],
        )
        j = b.to_json()
        assert isinstance(j["onClick"], list)
        assert len(j["onClick"]) == 2
        assert j["onClick"][0]["action"] == "setState"
        assert j["onClick"][1]["action"] == "toolCall"

    def test_slider_on_change(self):
        s = Slider(min=0, max=100, on_change=SetState("volume"))
        j = s.to_json()
        assert j["onChange"]["action"] == "setState"
        assert j["onChange"]["key"] == "volume"

    def test_input_on_change(self):
        i = Input(placeholder="Name", on_change=SetState("name"))
        j = i.to_json()
        assert j["onChange"]["action"] == "setState"

    def test_checkbox_on_change(self):
        c = Checkbox(label="Agree", on_change=ToggleState("agreed"))
        j = c.to_json()
        assert j["onChange"]["action"] == "toggleState"


# ---------------------------------------------------------------------------
# Action callbacks (on_success / on_error)
# ---------------------------------------------------------------------------


class TestActionCallbacks:
    def test_on_success_serializes(self):
        action = ToolCall("save", on_success=ShowToast("Saved!"))
        d = action.model_dump(by_alias=True, exclude_none=True)
        assert d["onSuccess"]["action"] == "showToast"
        assert d["onSuccess"]["message"] == "Saved!"

    def test_on_error_serializes(self):
        action = ToolCall("save", on_error=ShowToast("Failed", variant="error"))
        d = action.model_dump(by_alias=True, exclude_none=True)
        assert d["onError"]["action"] == "showToast"
        assert d["onError"]["variant"] == "error"

    def test_callbacks_excluded_when_none(self):
        action = ToolCall("save")
        d = action.model_dump(by_alias=True, exclude_none=True)
        assert "onSuccess" not in d
        assert "onError" not in d

    def test_recursive_callbacks(self):
        action = ToolCall(
            "save",
            on_success=ToolCall("refresh", on_success=ShowToast("All done!")),
        )
        d = action.model_dump(by_alias=True, exclude_none=True)
        inner = d["onSuccess"]
        assert inner["action"] == "toolCall"
        assert inner["onSuccess"]["action"] == "showToast"
        assert inner["onSuccess"]["message"] == "All done!"

    def test_callback_list(self):
        action = ToolCall(
            "save",
            on_success=[SetState("saved", True), ShowToast("Done!")],
        )
        d = action.model_dump(by_alias=True, exclude_none=True)
        callbacks = d["onSuccess"]
        assert isinstance(callbacks, list)
        assert len(callbacks) == 2
        assert callbacks[0]["action"] == "setState"
        assert callbacks[1]["action"] == "showToast"

    def test_all_action_types_have_callbacks(self):
        action_types = [
            ToolCall("t"),
            SendMessage("m"),
            UpdateContext(content="c"),
            OpenLink("http://example.com"),
            SetState("k"),
            ToggleState("k"),
            ShowToast("m"),
        ]
        for action in action_types:
            assert isinstance(action, ActionBase), f"{type(action)} is not ActionBase"
            with_callback = type(action).model_validate(
                {
                    **action.model_dump(),
                    "onSuccess": {"action": "showToast", "message": "ok"},
                }
            )
            d = with_callback.model_dump(by_alias=True, exclude_none=True)
            assert "onSuccess" in d, f"{type(action).__name__} missing onSuccess"


# ---------------------------------------------------------------------------
# ToolCall result_key
# ---------------------------------------------------------------------------


class TestToolCallResultKey:
    def test_result_key_serializes(self):
        action = ToolCall("search", result_key="results")
        d = action.model_dump(by_alias=True, exclude_none=True)
        assert d["resultKey"] == "results"

    def test_result_key_excluded_when_none(self):
        action = ToolCall("search")
        d = action.model_dump(by_alias=True, exclude_none=True)
        assert "resultKey" not in d

    def test_result_key_with_callbacks(self):
        action = ToolCall(
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
            on_click=ToolCall("search", result_key="results"),
        )
        j = btn.to_json()
        assert j["onClick"]["resultKey"] == "results"


# ---------------------------------------------------------------------------
# Form on_submit serialization
# ---------------------------------------------------------------------------


class TestFormOnSubmit:
    def test_on_submit_serializes(self):
        from prefab_ui.components import Form

        form = Form(on_submit=UpdateContext(structured_content={"name": "{{ name }}"}))
        j = form.to_json()
        assert j["onSubmit"]["action"] == "updateContext"
        assert j["onSubmit"]["structuredContent"]["name"] == "{{ name }}"

    def test_on_submit_action_list(self):
        from prefab_ui.components import Form

        form = Form(
            on_submit=[
                UpdateContext(structured_content={"date": "{{ date }}"}),
                ShowToast("Saved!"),
            ]
        )
        j = form.to_json()
        assert isinstance(j["onSubmit"], list)
        assert len(j["onSubmit"]) == 2
        assert j["onSubmit"][0]["action"] == "updateContext"
        assert j["onSubmit"][1]["action"] == "showToast"

    def test_on_submit_excluded_when_none(self):
        from prefab_ui.components import Form

        form = Form()
        j = form.to_json()
        assert "onSubmit" not in j

    def test_from_model_passes_on_submit(self):
        from pydantic import BaseModel

        from prefab_ui.components import Form

        class Simple(BaseModel):
            name: str

        form = Form.from_model(Simple, on_submit=ToolCall("save"))
        j = form.to_json()
        button = j["children"][-1]
        assert button["type"] == "Button"
        assert button["onClick"]["action"] == "toolCall"
