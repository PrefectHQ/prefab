"""Tests for state action key resolution: Rx, StatefulMixin, STATE proxy."""

from __future__ import annotations

import pytest

from prefab_ui.actions import AppendState, PopState, SetState, ToggleState
from prefab_ui.components import Button, Checkbox, Slider
from prefab_ui.rx import EVENT, STATE, Rx


class TestRxAsKey:
    """State actions accept Rx objects as keys, extracting the raw key name."""

    # ── SetState ──────────────────────────────────────────────────────

    def test_set_state_rx_key(self):
        rx = Rx("brightness")
        a = SetState(rx, 50)
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["key"] == "brightness"
        assert d["value"] == 50

    def test_set_state_rx_requires_value(self):
        rx = Rx("volume")
        with pytest.raises(TypeError):
            SetState(rx)

    def test_set_state_rx_with_dot_path(self):
        rx = Rx("user")
        a = SetState(rx.name, "Alice")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["key"] == "user.name"

    def test_set_state_rx_from_component(self):
        s = Slider(min=0, max=100, defer=True)
        a = SetState(s.rx, 75)
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["key"] == s.name
        assert d["value"] == 75

    def test_set_state_component_as_key(self):
        """Passing a stateful component directly extracts its state key."""
        s = Slider(min=0, max=100, defer=True)
        a = SetState(s, 75)
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["key"] == s.name
        assert d["value"] == 75

    def test_set_state_string_key_unchanged(self):
        """Plain strings still work as before."""
        a = SetState("count", 1)
        assert a.key == "count"

    def test_set_state_composite_fstring_key(self):
        """f-string with multiple Rx produces a composite template key."""
        outer = Rx("group")
        inner = Rx("tab")
        a = SetState(f"{outer}-{inner}", "active")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["key"] == "{{ group }}-{{ tab }}"

    def test_set_state_fstring_expression_key(self):
        """f-string Rx expressions work as dynamic keys."""
        base = Rx("prefix")
        idx = Rx("index")
        a = SetState(f"{base}_{idx}", True)
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["key"] == "{{ prefix }}_{{ index }}"

    # ── ToggleState ───────────────────────────────────────────────────

    def test_toggle_state_rx_key(self):
        rx = Rx("expanded")
        a = ToggleState(rx)
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["key"] == "expanded"

    def test_toggle_state_rx_dot_path(self):
        rx = Rx("settings")
        a = ToggleState(rx.darkMode)
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["key"] == "settings.darkMode"

    def test_toggle_state_rx_from_component(self):
        cb = Checkbox(defer=True)
        a = ToggleState(cb.rx)
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["key"] == cb.name

    def test_toggle_state_string_key_unchanged(self):
        a = ToggleState("visible")
        assert a.key == "visible"

    # ── AppendState ───────────────────────────────────────────────────

    def test_append_state_rx_key(self):
        rx = Rx("items")
        a = AppendState(rx, "new")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["key"] == "items"
        assert d["value"] == "new"

    def test_append_state_rx_with_index(self):
        rx = Rx("todos")
        a = AppendState(rx, "task", index=0)
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["key"] == "todos"
        assert d["index"] == 0

    def test_append_state_rx_requires_value(self):
        rx = Rx("log")
        with pytest.raises(TypeError):
            AppendState(rx)

    def test_append_state_string_key_unchanged(self):
        a = AppendState("items", "val")
        assert a.key == "items"

    # ── PopState ──────────────────────────────────────────────────────

    def test_pop_state_rx_key(self):
        rx = Rx("items")
        a = PopState(rx, 0)
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["key"] == "items"
        assert d["index"] == 0

    def test_pop_state_rx_with_template_index(self):
        rx = Rx("todos")
        a = PopState(rx, "{{ $index }}")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["key"] == "todos"
        assert d["index"] == "{{ $index }}"

    def test_pop_state_string_key_unchanged(self):
        a = PopState("items", -1)
        assert a.key == "items"

    # ── On components ─────────────────────────────────────────────────

    def test_rx_key_on_button_click(self):
        rx = Rx("active_tab")
        b = Button(label="Go", on_click=SetState(rx, "home"))
        j = b.to_json()
        assert j["onClick"]["key"] == "active_tab"

    def test_rx_key_on_slider_change(self):
        s = Slider(min=0, max=100, on_change=SetState(Rx("volume"), EVENT), defer=True)
        j = s.to_json()
        assert j["onChange"]["key"] == "volume"

    # ── STATE proxy ──────────────────────────────────────────────────

    def test_set_state_state_proxy(self):
        a = SetState(STATE.count, 0)
        assert a.key == "count"

    def test_append_state_state_proxy(self):
        a = AppendState(STATE.items, "new")
        assert a.key == "items"

    def test_pop_state_state_proxy(self):
        a = PopState(STATE.items, 0)
        assert a.key == "items"

    # ── Indexed Rx paths ─────────────────────────────────────────────

    def test_set_state_indexed_rx(self):
        a = SetState(STATE.groups[Rx("gi")].new_todo, "")
        assert a.key == "groups.{{ gi }}.new_todo"

    def test_pop_state_indexed_rx(self):
        a = PopState(STATE.groups[Rx("gi")].todos, Rx("ti"))
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["key"] == "groups.{{ gi }}.todos"
        assert d["index"] == "{{ ti }}"
