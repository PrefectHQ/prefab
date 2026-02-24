"""Tests for Input component."""

from __future__ import annotations

from prefab_ui.components import Input


def test_input_serializes():
    j = Input(input_type="email", placeholder="you@example.com", name="email").to_json()
    assert j["type"] == "Input"
    assert j["inputType"] == "email"
    assert j["placeholder"] == "you@example.com"
    assert j["name"] == "email"


def test_input_none_fields_excluded():
    j = Input(placeholder="Search").to_json()
    assert "value" not in j
    assert "onChange" not in j
    assert j["type"] == "Input"
    # name is now auto-generated
    assert j["name"] == "input_1"


class TestInputConstraintProps:
    def test_input_min_max_length(self):
        j = Input(name="x", min_length=1, max_length=100).to_json()
        assert j["minLength"] == 1
        assert j["maxLength"] == 100

    def test_input_number_constraints(self):
        j = Input(input_type="number", name="age", min=0, max=150, step=1).to_json()
        assert j["min"] == 0
        assert j["max"] == 150
        assert j["step"] == 1

    def test_input_pattern(self):
        j = Input(name="code", pattern=r"[A-Z]{3}").to_json()
        assert j["pattern"] == "[A-Z]{3}"

    def test_constraint_props_excluded_when_none(self):
        j = Input(name="x").to_json()
        assert "minLength" not in j
        assert "maxLength" not in j
        assert "min" not in j
        assert "max" not in j
        assert "step" not in j
        assert "pattern" not in j
