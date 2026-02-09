"""Tests for Form.from_model() — Pydantic model → form generation and auto-fill."""

from __future__ import annotations

import datetime
from typing import Literal

from pydantic import BaseModel, Field, SecretStr

from prefab_ui.actions import (
    SetState,
    ShowToast,
)
from prefab_ui.actions.mcp import ToolCall
from prefab_ui.components import (
    Form,
)

# ---------------------------------------------------------------------------
# Form component + from_model
# ---------------------------------------------------------------------------


class TestFormComponent:
    def test_form_serializes_as_container(self):
        from prefab_ui.components import Input, Label

        with Form() as f:
            Label("Name")
            Input(name="name")
        j = f.to_json()
        assert j["type"] == "Form"
        assert j["cssClass"] == "gap-4"
        assert len(j["children"]) == 2

    def test_from_model_basic_fields(self):
        class Profile(BaseModel):
            name: str
            age: int
            active: bool = True

        form = Form.from_model(Profile)
        j = form.to_json()
        assert j["type"] == "Form"
        assert len(j["children"]) == 3

        name_col = j["children"][0]
        assert name_col["type"] == "Column"
        assert name_col["children"][0]["type"] == "Label"
        assert name_col["children"][1]["inputType"] == "text"
        assert name_col["children"][1]["name"] == "name"

        age_col = j["children"][1]
        assert age_col["children"][1]["inputType"] == "number"

        checkbox = j["children"][2]
        assert checkbox["type"] == "Checkbox"
        assert checkbox["checked"] is True

    def test_from_model_email_detection(self):
        class Contact(BaseModel):
            email: str

        form = Form.from_model(Contact)
        j = form.to_json()
        input_j = j["children"][0]["children"][1]
        assert input_j["inputType"] == "email"

    def test_from_model_literal_becomes_select(self):
        class Pref(BaseModel):
            size: Literal["sm", "md", "lg"]

        form = Form.from_model(Pref)
        j = form.to_json()
        col = j["children"][0]
        select = col["children"][1]
        assert select["type"] == "Select"
        assert len(select["children"]) == 3
        assert select["children"][0]["value"] == "sm"

    def test_from_model_with_submit(self):
        class Simple(BaseModel):
            name: str

        form = Form.from_model(Simple, on_submit=ToolCall("save"))
        j = form.to_json()
        assert len(j["children"]) == 2
        assert j["children"][1]["type"] == "Button"
        assert j["children"][1]["label"] == "Submit"

    def test_from_model_date_field(self):
        class Event(BaseModel):
            date: datetime.date
            time: datetime.time

        form = Form.from_model(Event)
        j = form.to_json()
        assert j["children"][0]["children"][1]["inputType"] == "date"
        assert j["children"][1]["children"][1]["inputType"] == "time"


# ---------------------------------------------------------------------------
# from_model() metadata enrichment
# ---------------------------------------------------------------------------


class TestFromModelMetadata:
    def test_title_becomes_label(self):
        class M(BaseModel):
            name: str = Field(title="Full Name")

        form = Form.from_model(M)
        j = form.to_json()
        label = j["children"][0]["children"][0]
        assert label["text"] == "Full Name"

    def test_description_becomes_placeholder(self):
        class M(BaseModel):
            name: str = Field(description="Enter your name")

        form = Form.from_model(M)
        j = form.to_json()
        input_j = j["children"][0]["children"][1]
        assert input_j["placeholder"] == "Enter your name"

    def test_secret_str_becomes_password(self):
        class M(BaseModel):
            password: SecretStr

        form = Form.from_model(M)
        j = form.to_json()
        input_j = j["children"][0]["children"][1]
        assert input_j["inputType"] == "password"

    def test_min_length_constraint(self):
        class M(BaseModel):
            name: str = Field(min_length=1, max_length=50)

        form = Form.from_model(M)
        j = form.to_json()
        input_j = j["children"][0]["children"][1]
        assert input_j["minLength"] == 1
        assert input_j["maxLength"] == 50

    def test_ge_le_constraints_on_number(self):
        class M(BaseModel):
            age: int = Field(ge=0, le=150)

        form = Form.from_model(M)
        j = form.to_json()
        input_j = j["children"][0]["children"][1]
        assert input_j["min"] == 0
        assert input_j["max"] == 150

    def test_json_schema_extra_textarea(self):
        class M(BaseModel):
            bio: str = Field(
                default="",
                json_schema_extra={"ui": {"type": "textarea", "rows": 5}},
            )

        form = Form.from_model(M)
        j = form.to_json()
        textarea = j["children"][0]["children"][1]
        assert textarea["type"] == "Textarea"
        assert textarea["rows"] == 5

    def test_excluded_field_skipped(self):
        class M(BaseModel):
            visible: str
            hidden: str = Field(exclude=True)

        form = Form.from_model(M)
        j = form.to_json()
        assert len(j["children"]) == 1

    def test_required_field_detection(self):
        class M(BaseModel):
            required_field: str
            optional_field: str = "default"

        form = Form.from_model(M)
        j = form.to_json()
        required_input = j["children"][0]["children"][1]
        optional_input = j["children"][1]["children"][1]
        assert required_input.get("required") is True
        assert optional_input.get("required") is not True

    def test_list_field_skipped(self):
        class M(BaseModel):
            name: str
            tags: list[str] = []

        form = Form.from_model(M)
        j = form.to_json()
        assert len(j["children"]) == 1

    def test_nested_model_field_skipped(self):
        class Address(BaseModel):
            street: str

        class M(BaseModel):
            name: str
            address: Address | None = None

        form = Form.from_model(M)
        j = form.to_json()
        assert len(j["children"]) == 1


# ---------------------------------------------------------------------------
# Auto-fill convention
# ---------------------------------------------------------------------------


class TestAutoFillConvention:
    def test_empty_toolcall_gets_auto_filled(self):
        class Contact(BaseModel):
            name: str
            email: str

        form = Form.from_model(Contact, on_submit=ToolCall("save"))
        j = form.to_json()
        on_submit = j["onSubmit"]
        assert on_submit["action"] == "toolCall"
        assert on_submit["tool"] == "save"
        assert on_submit["arguments"] == {
            "data": {"name": "{{ name }}", "email": "{{ email }}"}
        }

    def test_explicit_arguments_preserved(self):
        class Contact(BaseModel):
            name: str

        form = Form.from_model(
            Contact,
            on_submit=ToolCall("save", arguments={"custom": "value"}),
        )
        j = form.to_json()
        assert j["onSubmit"]["arguments"] == {"custom": "value"}

    def test_default_on_error_added(self):
        class M(BaseModel):
            name: str

        form = Form.from_model(M, on_submit=ToolCall("save"))
        j = form.to_json()
        on_error = j["onSubmit"]["onError"]
        assert on_error["action"] == "showToast"
        assert on_error["message"] == "{{ $error }}"
        assert on_error["variant"] == "error"

    def test_explicit_on_error_preserved(self):
        class M(BaseModel):
            name: str

        form = Form.from_model(
            M,
            on_submit=ToolCall(
                "save",
                on_error=ShowToast("Custom error"),
            ),
        )
        j = form.to_json()
        assert j["onSubmit"]["onError"]["message"] == "Custom error"

    def test_callbacks_preserved(self):
        class M(BaseModel):
            name: str

        form = Form.from_model(
            M,
            on_submit=ToolCall(
                "save",
                result_key="result",
                on_success=ShowToast("Saved!"),
            ),
        )
        j = form.to_json()
        assert j["onSubmit"]["resultKey"] == "result"
        assert j["onSubmit"]["onSuccess"]["message"] == "Saved!"

    def test_action_list_not_auto_filled(self):
        class M(BaseModel):
            name: str

        actions = [SetState("loading", True), ToolCall("save")]
        form = Form.from_model(M, on_submit=actions)
        j = form.to_json()
        assert j["onSubmit"][0]["action"] == "setState"

    def test_non_toolcall_not_auto_filled(self):
        class M(BaseModel):
            name: str

        form = Form.from_model(M, on_submit=ShowToast("hi"))
        j = form.to_json()
        assert j["onSubmit"]["action"] == "showToast"

    def test_excluded_fields_not_in_arguments(self):
        class M(BaseModel):
            name: str
            internal: str = Field(exclude=True)

        form = Form.from_model(M, on_submit=ToolCall("save"))
        j = form.to_json()
        assert "internal" not in j["onSubmit"]["arguments"]["data"]

    def test_button_gets_same_action(self):
        class M(BaseModel):
            name: str

        form = Form.from_model(M, on_submit=ToolCall("save"))
        j = form.to_json()
        button = j["children"][-1]
        assert button["type"] == "Button"
        assert button["onClick"]["tool"] == "save"
        assert "data" in button["onClick"]["arguments"]

    def test_form_on_submit_set(self):
        class M(BaseModel):
            name: str

        form = Form.from_model(M, on_submit=ToolCall("save"))
        j = form.to_json()
        assert j["onSubmit"]["tool"] == "save"
