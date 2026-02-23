"""Tests for Prefab action serialization and lifecycle callbacks."""

from __future__ import annotations

import pytest

from prefab_ui.actions import (
    Action,
    AppendState,
    CloseOverlay,
    OpenFilePicker,
    OpenLink,
    PopState,
    SetInterval,
    SetState,
    ShowToast,
    ToggleState,
)
from prefab_ui.actions.mcp import CallTool, SendMessage, UpdateContext
from prefab_ui.components import Button, Checkbox, DropZone, Input, Slider


class TestActionSerialization:
    def test_tool_call_positional(self):
        a = CallTool("refresh")
        d = a.model_dump()
        assert d["action"] == "toolCall"
        assert d["tool"] == "refresh"
        assert d["arguments"] == {}

    def test_tool_call_with_args(self):
        a = CallTool("search", arguments={"q": "{{ query }}"})
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


class TestCloseOverlayAction:
    def test_serializes(self):
        a = CloseOverlay()
        d = a.model_dump()
        assert d["action"] == "closeOverlay"

    def test_on_button(self):
        b = Button(label="Cancel", on_click=CloseOverlay())
        j = b.to_json()
        assert j["onClick"]["action"] == "closeOverlay"

    def test_in_tool_call_on_success(self):
        a = CallTool(
            "remove_user",
            on_success=[ShowToast("Removed"), CloseOverlay()],
        )
        d = a.model_dump(by_alias=True, exclude_none=True)
        callbacks = d["onSuccess"]
        assert callbacks[1]["action"] == "closeOverlay"


class TestActionOnComponents:
    def test_button_on_click(self):
        b = Button(label="Go", on_click=CallTool("refresh"))
        j = b.to_json()
        assert j["onClick"]["action"] == "toolCall"
        assert j["onClick"]["tool"] == "refresh"

    def test_button_action_list(self):
        b = Button(
            label="Submit",
            on_click=[SetState("loading", True), CallTool("process")],
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
        action = CallTool("save", on_success=ShowToast("Saved!"))
        d = action.model_dump(by_alias=True, exclude_none=True)
        assert d["onSuccess"]["action"] == "showToast"
        assert d["onSuccess"]["message"] == "Saved!"

    def test_on_error_serializes(self):
        action = CallTool("save", on_error=ShowToast("Failed", variant="error"))
        d = action.model_dump(by_alias=True, exclude_none=True)
        assert d["onError"]["action"] == "showToast"
        assert d["onError"]["variant"] == "error"

    def test_callbacks_excluded_when_none(self):
        action = CallTool("save")
        d = action.model_dump(by_alias=True, exclude_none=True)
        assert "onSuccess" not in d
        assert "onError" not in d

    def test_recursive_callbacks(self):
        action = CallTool(
            "save",
            on_success=CallTool("refresh", on_success=ShowToast("All done!")),
        )
        d = action.model_dump(by_alias=True, exclude_none=True)
        inner = d["onSuccess"]
        assert inner["action"] == "toolCall"
        assert inner["onSuccess"]["action"] == "showToast"
        assert inner["onSuccess"]["message"] == "All done!"

    def test_callback_list(self):
        action = CallTool(
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
            CallTool("t"),
            SendMessage("m"),
            UpdateContext(content="c"),
            OpenLink("http://example.com"),
            SetState("k"),
            ToggleState("k"),
            AppendState("k"),
            PopState("k", 0),
            ShowToast("m"),
            CloseOverlay(),
            OpenFilePicker(),
        ]
        for action in action_types:
            assert isinstance(action, Action), f"{type(action)} is not Action"
            with_callback = type(action).model_validate(
                {
                    **action.model_dump(),
                    "onSuccess": {"action": "showToast", "message": "ok"},
                }
            )
            d = with_callback.model_dump(by_alias=True, exclude_none=True)
            assert "onSuccess" in d, f"{type(action).__name__} missing onSuccess"


# ---------------------------------------------------------------------------
# CallTool result_key
# ---------------------------------------------------------------------------


class TestCallToolResultKey:
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

        form = Form.from_model(Simple, on_submit=CallTool("save"))
        j = form.to_json()
        button = j["children"][-1]
        assert button["type"] == "Button"
        assert button["onClick"]["action"] == "toolCall"


# ---------------------------------------------------------------------------
# Path validation
# ---------------------------------------------------------------------------


class TestPathValidation:
    def test_simple_key(self):
        a = SetState("count", 1)
        assert a.key == "count"

    def test_dot_path(self):
        a = SetState("todos.0.done", True)
        assert a.key == "todos.0.done"

    def test_underscore_key(self):
        a = SetState("_private", 1)
        assert a.key == "_private"

    @pytest.mark.parametrize("bad_key", ["", "foo-bar", "123abc", "a..b", "a.b-c"])
    def test_invalid_key_rejected(self, bad_key: str):
        with pytest.raises(ValueError, match="Invalid path segment"):
            SetState(bad_key, 1)

    def test_toggle_validates_path(self):
        a = ToggleState("user.active")
        assert a.key == "user.active"

    def test_toggle_rejects_invalid(self):
        with pytest.raises(ValueError, match="Invalid path segment"):
            ToggleState("bad-key")

    def test_append_validates_path(self):
        a = AppendState("items", "new")
        assert a.key == "items"

    def test_pop_validates_path(self):
        a = PopState("items", 0)
        assert a.key == "items"


# ---------------------------------------------------------------------------
# AppendState / PopState serialization
# ---------------------------------------------------------------------------


class TestAppendStateSerialization:
    def test_basic(self):
        a = AppendState("items", "new_item")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["action"] == "appendState"
        assert d["key"] == "items"
        assert d["value"] == "new_item"
        assert "index" not in d

    def test_default_event_value(self):
        a = AppendState("items")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["value"] == "{{ $event }}"

    def test_with_index(self):
        a = AppendState("items", "new_item", index=0)
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["index"] == 0

    def test_with_template_index(self):
        a = AppendState("items", "value", index="{{ $index }}")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["index"] == "{{ $index }}"

    def test_with_negative_index(self):
        a = AppendState("items", "value", index=-1)
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["index"] == -1

    def test_on_button(self):
        b = Button(
            label="Add", on_click=AppendState("todos", {"text": "New", "done": False})
        )
        j = b.to_json()
        assert j["onClick"]["action"] == "appendState"
        assert j["onClick"]["key"] == "todos"


class TestPopStateSerialization:
    def test_basic(self):
        a = PopState("items", 2)
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["action"] == "popState"
        assert d["key"] == "items"
        assert d["index"] == 2

    def test_with_template_index(self):
        a = PopState("todos", "{{ $index }}")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["index"] == "{{ $index }}"

    def test_negative_index(self):
        a = PopState("items", -1)
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["index"] == -1

    def test_on_button(self):
        b = Button(label="Delete", on_click=PopState("todos", "{{ $index }}"))
        j = b.to_json()
        assert j["onClick"]["action"] == "popState"

    def test_callbacks(self):
        a = PopState("items", 0, on_success=ShowToast("Removed!"))
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["onSuccess"]["action"] == "showToast"


# ---------------------------------------------------------------------------
# OpenFilePicker serialization
# ---------------------------------------------------------------------------


class TestOpenFilePickerSerialization:
    def test_minimal(self):
        a = OpenFilePicker()
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["action"] == "openFilePicker"
        assert "accept" not in d
        assert "maxSize" not in d

    def test_with_options(self):
        a = OpenFilePicker(accept="image/*", multiple=True, max_size=5_000_000)
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["accept"] == "image/*"
        assert d["multiple"] is True
        assert d["maxSize"] == 5_000_000

    def test_on_button(self):
        b = Button(
            label="Upload",
            on_click=OpenFilePicker(
                accept=".csv",
                on_success=CallTool("process", arguments={"file": "{{ $event }}"}),
            ),
        )
        j = b.to_json()
        assert j["onClick"]["action"] == "openFilePicker"
        assert j["onClick"]["accept"] == ".csv"
        assert j["onClick"]["onSuccess"]["action"] == "toolCall"

    def test_callbacks(self):
        a = OpenFilePicker(
            on_success=CallTool("upload"),
            on_error=ShowToast("Upload failed", variant="error"),
        )
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["onSuccess"]["action"] == "toolCall"
        assert d["onError"]["action"] == "showToast"


# ---------------------------------------------------------------------------
# DropZone on_change
# ---------------------------------------------------------------------------


class TestDropZoneOnChange:
    def test_on_change_serializes(self):
        dz = DropZone(
            label="Drop here",
            on_change=CallTool("process", arguments={"files": "{{ $event }}"}),
        )
        j = dz.to_json()
        assert j["onChange"]["action"] == "toolCall"
        assert j["onChange"]["arguments"]["files"] == "{{ $event }}"

    def test_on_change_action_list(self):
        dz = DropZone(
            on_change=[SetState("uploading", True), CallTool("upload")],
        )
        j = dz.to_json()
        assert isinstance(j["onChange"], list)
        assert len(j["onChange"]) == 2

    def test_on_change_excluded_when_none(self):
        dz = DropZone(label="Upload")
        j = dz.to_json()
        assert "onChange" not in j


# ---------------------------------------------------------------------------
# SetInterval
# ---------------------------------------------------------------------------


class TestSetIntervalSerialization:
    def test_basic(self):
        a = SetInterval(1000)
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["action"] == "setInterval"
        assert d["duration"] == 1000
        assert "while" not in d
        assert "count" not in d

    def test_positional_duration(self):
        a = SetInterval(500)
        assert a.duration == 500

    def test_with_while(self):
        a = SetInterval(1000, while_="{{ seconds > 0 }}")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["while"] == "{{ seconds > 0 }}"

    def test_with_count(self):
        a = SetInterval(3000, count=1)
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["count"] == 1

    def test_on_tick_serializes(self):
        a = SetInterval(1000, on_tick=SetState("ticks", "{{ $event }}"))
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["onTick"]["action"] == "setState"

    def test_on_complete_serializes(self):
        a = SetInterval(1000, count=5, on_complete=ShowToast("Done!"))
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["onComplete"]["action"] == "showToast"

    def test_on_tick_list(self):
        a = SetInterval(
            1000,
            on_tick=[SetState("count", "{{ count - 1 }}"), ShowToast("Tick")],
        )
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert isinstance(d["onTick"], list)
        assert len(d["onTick"]) == 2

    def test_callbacks_excluded_when_none(self):
        a = SetInterval(1000)
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert "onTick" not in d
        assert "onComplete" not in d
        assert "onSuccess" not in d
        assert "onError" not in d

    def test_one_shot_delay_pattern(self):
        a = SetInterval(3000, count=1, on_complete=ShowToast("Still there?"))
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["duration"] == 3000
        assert d["count"] == 1
        assert d["onComplete"]["action"] == "showToast"

    def test_on_button(self):
        b = Button(
            label="Start",
            on_click=SetInterval(
                1000,
                count=10,
                on_tick=SetState("seconds", "{{ seconds - 1 }}"),
            ),
        )
        j = b.to_json()
        assert j["onClick"]["action"] == "setInterval"

    def test_inherits_action_base_callbacks(self):
        a = SetInterval(1000, on_success=ShowToast("Started"))
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["onSuccess"]["action"] == "showToast"

    def test_while_and_count_together(self):
        a = SetInterval(
            500,
            while_="{{ active }}",
            count=20,
            on_tick=SetState("t", "{{ $event }}"),
            on_complete=SetState("done", True),
        )
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["while"] == "{{ active }}"
        assert d["count"] == 20
        assert d["onTick"]["action"] == "setState"
        assert d["onComplete"]["action"] == "setState"
