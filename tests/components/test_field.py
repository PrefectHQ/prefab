"""Tests for Field, ChoiceCard, and sub-components."""

from __future__ import annotations

from prefab_ui.components import (
    ChoiceCard,
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldTitle,
    Label,
    Rx,
    Switch,
)


class TestField:
    def test_default_serialization(self):
        field = Field()
        j = field.to_json()
        assert j["type"] == "Field"
        assert j["invalid"] is False
        assert j["disabled"] is False
        assert "orientation" not in j

    def test_invalid_bool(self):
        j = Field(invalid=True).to_json()
        assert j["invalid"] is True

    def test_invalid_reactive(self):
        j = Field(invalid=Rx("!email")).to_json()
        assert j["invalid"] == "{{ !email }}"

    def test_disabled_prop(self):
        j = Field(disabled=True).to_json()
        assert j["disabled"] is True

    def test_children(self):
        with Field() as f:
            Label("Email")
        j = f.to_json()
        assert len(j["children"]) == 1
        assert j["children"][0]["type"] == "Label"


class TestChoiceCard:
    def test_serialization(self):
        j = ChoiceCard().to_json()
        assert j["type"] == "ChoiceCard"
        assert j["invalid"] is False
        assert j["disabled"] is False

    def test_inherits_invalid(self):
        j = ChoiceCard(invalid=True).to_json()
        assert j["invalid"] is True

    def test_inherits_disabled(self):
        j = ChoiceCard(disabled=True).to_json()
        assert j["disabled"] is True

    def test_is_field_subclass(self):
        assert issubclass(ChoiceCard, Field)

    def test_with_children(self):
        with ChoiceCard() as cc:
            with FieldContent():
                FieldTitle("Dark mode")
                FieldDescription("Use dark theme.")
            Switch()
        j = cc.to_json()
        assert len(j["children"]) == 2
        assert j["children"][0]["type"] == "FieldContent"
        assert j["children"][1]["type"] == "Switch"


class TestFieldTitle:
    def test_positional_content(self):
        j = FieldTitle("Dark mode").to_json()
        assert j["type"] == "FieldTitle"
        assert j["content"] == "Dark mode"

    def test_keyword_content(self):
        j = FieldTitle(content="Dark mode").to_json()
        assert j["content"] == "Dark mode"


class TestFieldDescription:
    def test_positional_content(self):
        j = FieldDescription("Use dark theme").to_json()
        assert j["type"] == "FieldDescription"
        assert j["content"] == "Use dark theme"

    def test_keyword_content(self):
        j = FieldDescription(content="Use dark theme").to_json()
        assert j["content"] == "Use dark theme"


class TestFieldContent:
    def test_container(self):
        with FieldContent() as fc:
            FieldTitle("Title")
            FieldDescription("Desc")
        j = fc.to_json()
        assert j["type"] == "FieldContent"
        assert len(j["children"]) == 2


class TestFieldError:
    def test_positional_content(self):
        j = FieldError("Email is required.").to_json()
        assert j["type"] == "FieldError"
        assert j["content"] == "Email is required."

    def test_keyword_content(self):
        j = FieldError(content="Email is required.").to_json()
        assert j["content"] == "Email is required."


class TestFieldComposition:
    def test_form_validation_layout(self):
        with Field(invalid=True) as f:
            Label("Email")
            FieldError("Email is required.")
        j = f.to_json()
        assert j["invalid"] is True
        assert len(j["children"]) == 2
        assert j["children"][0]["type"] == "Label"
        assert j["children"][1]["type"] == "FieldError"

    def test_choice_card_layout(self):
        with ChoiceCard() as cc:
            with FieldContent():
                FieldTitle("Share across devices")
                FieldDescription("Focus is shared across devices.")
            Switch()
        j = cc.to_json()
        assert j["type"] == "ChoiceCard"
        assert len(j["children"]) == 2
        assert j["children"][0]["type"] == "FieldContent"
        assert j["children"][1]["type"] == "Switch"
