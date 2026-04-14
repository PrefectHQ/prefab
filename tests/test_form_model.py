"""Tests for Form.from_model() — Pydantic model → form generation and auto-fill."""

from __future__ import annotations

import datetime
from typing import Literal

import pytest
from pydantic import BaseModel, Field, SecretStr

from prefab_ui.actions import (
    SetState,
    ShowToast,
)
from prefab_ui.actions.mcp import CallTool
from prefab_ui.components import (
    Button,
    Card,
    CardContent,
    CardFooter,
    Column,
    Form,
    Input,
    Label,
)

# ---------------------------------------------------------------------------
# Form component + from_model
# ---------------------------------------------------------------------------


class TestFormComponent:
    def test_form_serializes_as_container(self):
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
        assert checkbox["value"] is True

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

        form = Form.from_model(Simple, on_submit=CallTool("save"))
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

    def test_optional_label_indicator(self):
        class M(BaseModel):
            required_field: str
            optional_field: str = "default"

        form = Form.from_model(M)
        j = form.to_json()
        required_label = j["children"][0]["children"][0]
        optional_label = j["children"][1]["children"][0]
        assert required_label.get("optional") is not True
        assert optional_label["optional"] is True

    def test_optional_type_label_indicator(self):
        class M(BaseModel):
            name: str
            nickname: str | None = None

        form = Form.from_model(M)
        j = form.to_json()
        required_label = j["children"][0]["children"][0]
        optional_label = j["children"][1]["children"][0]
        assert required_label.get("optional") is not True
        assert optional_label["optional"] is True

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

        form = Form.from_model(Contact, on_submit=CallTool("save"))
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
            on_submit=CallTool("save", arguments={"custom": "value"}),
        )
        j = form.to_json()
        assert j["onSubmit"]["arguments"] == {"custom": "value"}

    def test_default_on_error_added(self):
        class M(BaseModel):
            name: str

        form = Form.from_model(M, on_submit=CallTool("save"))
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
            on_submit=CallTool(
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
            on_submit=CallTool(
                "save",
                on_success=ShowToast("Saved!"),
            ),
        )
        j = form.to_json()
        assert j["onSubmit"]["onSuccess"]["message"] == "Saved!"

    def test_action_list_not_auto_filled(self):
        class M(BaseModel):
            name: str

        actions = [SetState("loading", True), CallTool("save")]
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

        form = Form.from_model(M, on_submit=CallTool("save"))
        j = form.to_json()
        assert "internal" not in j["onSubmit"]["arguments"]["data"]

    def test_button_has_no_on_click(self):
        """Submit button relies on HTML form submit, not its own onClick."""

        class M(BaseModel):
            name: str

        form = Form.from_model(M, on_submit=CallTool("save"))
        j = form.to_json()
        button = j["children"][-1]
        assert button["type"] == "Button"
        assert "onClick" not in button

    def test_form_on_submit_set(self):
        class M(BaseModel):
            name: str

        form = Form.from_model(M, on_submit=CallTool("save"))
        j = form.to_json()
        assert j["onSubmit"]["tool"] == "save"

    def test_callable_tool_ref_preserved_through_from_model(self):
        """CallTool(fn) should resolve via tool_resolver after from_model enrichment."""
        from prefab_ui.app import PrefabApp

        def save_item(name: str) -> dict:
            return {"name": name}

        class M(BaseModel):
            name: str

        from prefab_ui.app import ResolvedTool

        def resolver(fn: object) -> ResolvedTool:
            assert fn is save_item
            return ResolvedTool(name="save_item-abc123")

        form = Form.from_model(M, on_submit=CallTool(save_item))
        app = PrefabApp(view=form)
        j = app.to_json(tool_resolver=resolver)
        # view is wrapped in Div with pf-app-root; form is inside
        form_view = j["view"]["children"][0]

        assert form_view["onSubmit"]["tool"] == "save_item-abc123"
        button = form_view["children"][-1]
        assert "onClick" not in button

    def test_callable_tool_ref_preserved_with_explicit_arguments(self):
        """When arguments are provided (no enrichment), callable still resolves."""
        from prefab_ui.app import PrefabApp

        def save_item(name: str) -> dict:
            return {"name": name}

        class M(BaseModel):
            name: str

        form = Form.from_model(
            M,
            on_submit=CallTool(save_item, arguments={"custom": "val"}),
        )
        app = PrefabApp(view=form)
        from prefab_ui.app import ResolvedTool

        j = app.to_json(
            tool_resolver=lambda fn: ResolvedTool(name=fn.__name__ + "-resolved")
        )
        form_view = j["view"]["children"][0]
        assert form_view["onSubmit"]["tool"] == "save_item-resolved"
        assert form_view["onSubmit"]["arguments"] == {"custom": "val"}

    def test_callable_without_resolver_uses_name(self):
        """Without a resolver, CallTool(fn) falls back to fn.__name__."""

        def my_tool(x: str) -> str:
            return x

        class M(BaseModel):
            name: str

        form = Form.from_model(M, on_submit=CallTool(my_tool))
        j = form.to_json()
        assert j["onSubmit"]["tool"] == "my_tool"


# ---------------------------------------------------------------------------
# Context-manager isolation
# ---------------------------------------------------------------------------


class TestFromModelContextIsolation:
    """from_model() must not leak internal components into outer containers."""

    def test_from_model_inside_card_only_adds_form(self):
        class M(BaseModel):
            name: str
            email: str

        with Card() as card:
            Form.from_model(M, on_submit=CallTool("save"))

        # Card should have exactly one child: the Form
        assert len(card.children) == 1
        child = card.children[0]
        assert isinstance(child, Form)
        assert len(child.children) == 3  # name col, email col, button

    def test_from_model_inside_nested_containers(self):
        class M(BaseModel):
            name: str

        with Column() as col:
            with Card() as card:
                Form.from_model(M, on_submit=CallTool("save"))

        # Column has one child (Card), Card has one child (Form)
        assert len(col.children) == 1
        assert len(card.children) == 1
        assert isinstance(card.children[0], Form)

    def test_from_model_without_context_still_works(self):
        class M(BaseModel):
            name: str

        form = Form.from_model(M)
        assert form.type == "Form"
        assert len(form.children) == 1  # name col, no button (no on_submit)


# ---------------------------------------------------------------------------
# defaults (runtime prefill)
# ---------------------------------------------------------------------------


class TestDefaults:
    """`defaults=` overrides model Field defaults for this render only."""

    def test_defaults_prefill_text_input(self):
        class M(BaseModel):
            title: str

        form = Form.from_model(M, defaults={"title": "Login broken"})
        j = form.to_json()
        input_j = j["children"][0]["children"][1]
        assert input_j["value"] == "Login broken"

    def test_defaults_override_field_default(self):
        class M(BaseModel):
            severity: str = "low"

        form = Form.from_model(M, defaults={"severity": "high"})
        j = form.to_json()
        input_j = j["children"][0]["children"][1]
        assert input_j["value"] == "high"

    def test_defaults_prefill_number(self):
        class M(BaseModel):
            age: int

        form = Form.from_model(M, defaults={"age": 42})
        j = form.to_json()
        input_j = j["children"][0]["children"][1]
        assert input_j["value"] == "42"

    def test_defaults_prefill_bool(self):
        class M(BaseModel):
            active: bool = False

        form = Form.from_model(M, defaults={"active": True})
        j = form.to_json()
        checkbox = j["children"][0]
        assert checkbox["type"] == "Checkbox"
        assert checkbox["value"] is True

    def test_defaults_prefill_literal_selects_option(self):
        class M(BaseModel):
            size: Literal["sm", "md", "lg"] = "sm"

        form = Form.from_model(M, defaults={"size": "lg"})
        j = form.to_json()
        select = j["children"][0]["children"][1]
        selected = [o for o in select["children"] if o.get("selected")]
        assert len(selected) == 1
        assert selected[0]["value"] == "lg"

    def test_defaults_prefill_textarea(self):
        class M(BaseModel):
            bio: str = Field(
                default="",
                json_schema_extra={"ui": {"type": "textarea", "rows": 3}},
            )

        form = Form.from_model(M, defaults={"bio": "Hello world"})
        j = form.to_json()
        textarea = j["children"][0]["children"][1]
        assert textarea["value"] == "Hello world"

    def test_defaults_prefill_date(self):
        class M(BaseModel):
            when: datetime.date

        form = Form.from_model(M, defaults={"when": datetime.date(2026, 4, 14)})
        j = form.to_json()
        input_j = j["children"][0]["children"][1]
        assert input_j["value"] == "2026-04-14"

    def test_defaults_prefill_datetime(self):
        class M(BaseModel):
            when: datetime.datetime

        form = Form.from_model(
            M,
            defaults={"when": datetime.datetime(2026, 4, 14, 9, 30)},
        )
        j = form.to_json()
        input_j = j["children"][0]["children"][1]
        assert input_j["value"] == "2026-04-14T09:30"

    def test_defaults_prefill_date_from_string(self):
        """ISO strings pass through — what FastMCP will send over the wire."""

        class M(BaseModel):
            when: datetime.date

        form = Form.from_model(M, defaults={"when": "2026-04-14"})
        j = form.to_json()
        input_j = j["children"][0]["children"][1]
        assert input_j["value"] == "2026-04-14"

    def test_defaults_partial_leaves_other_fields_alone(self):
        class M(BaseModel):
            title: str
            severity: str = "low"

        form = Form.from_model(M, defaults={"title": "Only title"})
        j = form.to_json()
        title_input = j["children"][0]["children"][1]
        severity_input = j["children"][1]["children"][1]
        assert title_input["value"] == "Only title"
        assert severity_input["value"] == "low"

    def test_defaults_unknown_key_raises(self):
        class M(BaseModel):
            title: str

        with pytest.raises(ValueError, match="unknown field"):
            Form.from_model(M, defaults={"not_a_field": "typo"})

    def test_defaults_works_with_fields_only(self):
        class M(BaseModel):
            title: str

        [col] = Form.from_model(M, fields_only=True, defaults={"title": "hi"})
        input_j = col.children[1].to_json()
        assert input_j["value"] == "hi"

    def test_defaults_prefill_secret_str(self):
        """SecretStr input renders without leaking the value back into HTML."""

        class M(BaseModel):
            password: SecretStr

        # Passing a default should render as a password input; we don't
        # assert the value is exposed — secrets shouldn't round-trip.
        form = Form.from_model(M, defaults={"password": "hunter2"})
        j = form.to_json()
        input_j = j["children"][0]["children"][1]
        assert input_j["inputType"] == "password"


# ---------------------------------------------------------------------------
# fields_only mode
# ---------------------------------------------------------------------------


class TestFieldsOnly:
    """from_model(fields_only=True) generates fields without Form or button."""

    def test_fields_only_returns_list(self):
        class M(BaseModel):
            name: str
            email: str

        result = Form.from_model(M, fields_only=True)
        assert isinstance(result, list)
        assert len(result) == 2

    def test_fields_only_no_form_wrapper(self):
        class M(BaseModel):
            name: str

        result = Form.from_model(M, fields_only=True)
        assert all(not isinstance(c, Form) for c in result)

    def test_fields_only_no_button(self):
        class M(BaseModel):
            name: str

        result = Form.from_model(M, fields_only=True, on_submit=CallTool("save"))
        assert all(not isinstance(c, Button) for c in result)

    def test_fields_only_auto_parents_to_context(self):
        class M(BaseModel):
            name: str
            email: str

        with Column() as col:
            Form.from_model(M, fields_only=True)

        assert len(col.children) == 2
        assert isinstance(col.children[0], Column)
        assert isinstance(col.children[1], Column)

    def test_fields_only_no_duplicate_children(self):
        """Internal Labels/Inputs must not leak into the outer context."""

        class M(BaseModel):
            name: str
            email: str

        with Column() as col:
            Form.from_model(M, fields_only=True)

        # Only 2 top-level Columns, not 2 Columns + 2 Labels + 2 Inputs
        assert len(col.children) == 2

    def test_fields_only_composes_with_card(self):
        class M(BaseModel):
            name: str

        with Card() as card:
            with Form(on_submit=CallTool("save")) as form:
                with CardContent() as content:
                    Form.from_model(M, fields_only=True)
                with CardFooter() as footer:
                    Button("Submit")

        # Card > Form > [CardContent, CardFooter]
        assert len(card.children) == 1
        assert isinstance(card.children[0], Form)
        assert len(form.children) == 2
        assert isinstance(form.children[0], CardContent)
        assert isinstance(form.children[1], CardFooter)
        # Fields are inside CardContent
        assert len(content.children) == 1
        assert isinstance(content.children[0], Column)
        # Button is inside CardFooter
        assert len(footer.children) == 1
        assert isinstance(footer.children[0], Button)
