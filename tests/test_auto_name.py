"""Tests for auto-naming and .rx property on components."""

from __future__ import annotations

import pytest

from prefab_ui.components import (
    Checkbox,
    Input,
    Metric,
    Select,
    SelectOption,
    Slider,
    Switch,
    Text,
)
from prefab_ui.rx import Rx


class TestAutoName:
    def test_slider_auto_generates_name(self) -> None:
        s = Slider(min=0, max=100)
        assert s.name == "slider_1"

    def test_slider_preserves_explicit_name(self) -> None:
        s = Slider(name="custom", min=0, max=100)
        assert s.name == "custom"

    def test_two_sliders_get_different_names(self) -> None:
        s1 = Slider(min=0, max=100)
        s2 = Slider(min=0, max=100)
        assert s1.name == "slider_1"
        assert s2.name == "slider_2"

    def test_input_auto_generates_name(self) -> None:
        i = Input()
        assert i.name == "input_1"

    def test_checkbox_auto_generates_name(self) -> None:
        c = Checkbox()
        assert c.name == "checkbox_1"

    def test_switch_auto_generates_name(self) -> None:
        s = Switch()
        assert s.name == "switch_1"

    def test_select_auto_generates_name(self) -> None:
        s = Select()
        assert s.name == "select_1"

    def test_different_types_have_independent_counters(self) -> None:
        s = Slider(min=0, max=100)
        i = Input()
        assert s.name == "slider_1"
        assert i.name == "input_1"

    def test_text_has_no_auto_name(self) -> None:
        t = Text("hello")
        assert not hasattr(t, "name") or "name" not in t.model_fields


class TestAutoNameSerialization:
    def test_auto_name_appears_in_json(self) -> None:
        s = Slider(min=0, max=100)
        j = s.to_json()
        assert j["name"] == "slider_1"

    def test_explicit_name_appears_in_json(self) -> None:
        s = Slider(name="my_slider", min=0, max=100)
        j = s.to_json()
        assert j["name"] == "my_slider"


class TestRxProperty:
    def test_rx_returns_rx_for_auto_named(self) -> None:
        s = Slider(min=0, max=100)
        assert isinstance(s.rx, Rx)
        assert str(s.rx) == "{{ slider_1 }}"

    def test_rx_returns_rx_for_explicit_name(self) -> None:
        s = Slider(name="threshold", min=0, max=100)
        assert str(s.rx) == "{{ threshold }}"

    def test_rx_on_component_without_mixin_raises(self) -> None:
        t = Text("hello")
        with pytest.raises(AttributeError):
            t.rx  # type: ignore[attr-defined]

    def test_rx_dot_path(self) -> None:
        s = Slider(name="data", min=0, max=100)
        assert str(s.rx.value) == "{{ data.value }}"


class TestRxCoercion:
    def test_rx_in_str_field(self) -> None:
        r = Rx("total")
        m = Metric(label="Total", value=r)
        j = m.to_json()
        assert j["value"] == "{{ total }}"

    def test_rx_in_fstring_field(self) -> None:
        r = Rx("n")
        t = Text(f"Count: {r}")
        j = t.to_json()
        assert j["content"] == "Count: {{ n }}"

    def test_rx_from_component_in_field(self) -> None:
        slider = Slider(min=0, max=100)
        m = Metric(label="Value", value=slider.rx)
        j = m.to_json()
        assert j["value"] == "{{ slider_1 }}"

    def test_rx_passed_to_select_option(self) -> None:
        """Rx objects should coerce in any Component subclass."""
        opt = SelectOption(label="test", value=Rx("x"))
        j = opt.to_json()
        assert j["value"] == "{{ x }}"

    def test_rx_in_nested_dict(self) -> None:
        """Rx objects inside nested dicts are coerced recursively."""
        from prefab_ui.actions.mcp import CallTool

        slider = Slider(min=0, max=100)
        action = CallTool("fetch", arguments={"value": slider.rx})
        j = action.model_dump(by_alias=True, exclude_none=True)
        assert j["arguments"]["value"] == "{{ slider_1 }}"

    def test_rx_in_action_field(self) -> None:
        """Rx objects are coerced in Action subclasses too."""
        from prefab_ui.actions.ui import ShowToast

        slider = Slider(min=0, max=100)
        action = ShowToast(message=slider.rx)
        j = action.model_dump(by_alias=True, exclude_none=True)
        assert j["message"] == "{{ slider_1 }}"
