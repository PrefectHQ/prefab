"""Tests for the Computed class — read-only derived state values."""

from __future__ import annotations

import pytest

from prefab_ui.app import PrefabApp, clear_initial_state, set_initial_state
from prefab_ui.rx import Computed, Rx, _BoundStateProxy


class TestComputedCreation:
    def test_stores_expression(self) -> None:
        c = Computed("{{ a + b }}")
        assert c.expression == "{{ a + b }}"

    def test_requires_string(self) -> None:
        with pytest.raises(TypeError, match="string expression"):
            Computed(42)

    def test_repr(self) -> None:
        c = Computed("{{ x * 2 }}")
        assert repr(c) == "Computed('{{ x * 2 }}')"

    def test_immutable(self) -> None:
        c = Computed("{{ a }}")
        with pytest.raises(AttributeError, match="immutable"):
            c.expression = "{{ b }}"  # type: ignore[misc]

    def test_equality(self) -> None:
        assert Computed("{{ a }}") == Computed("{{ a }}")
        assert Computed("{{ a }}") != Computed("{{ b }}")

    def test_hash(self) -> None:
        a1 = Computed("{{ a }}")
        a2 = Computed("{{ a }}")
        assert hash(a1) == hash(a2)
        assert {a1, a2} == {a1}


class TestComputedSerialization:
    def test_serializes_as_computed_marker(self) -> None:
        app = PrefabApp(
            state={"a": 1, "b": 2, "total": Computed("{{ a + b }}")},
        )
        result = app.to_json()
        assert result["state"]["a"] == 1
        assert result["state"]["b"] == 2
        assert result["state"]["total"] == {"__computed__": "{{ a + b }}"}

    def test_multiple_computed_keys(self) -> None:
        app = PrefabApp(
            state={
                "x": 10,
                "doubled": Computed("{{ x * 2 }}"),
                "label": Computed("{{ x | number }}"),
            },
        )
        result = app.to_json()
        assert result["state"]["doubled"] == {"__computed__": "{{ x * 2 }}"}
        assert result["state"]["label"] == {"__computed__": "{{ x | number }}"}

    def test_round_trips_through_html(self) -> None:
        import json

        app = PrefabApp(
            state={"a": 1, "sum": Computed("{{ a + 1 }}")},
        )
        html = app.html()
        start = html.index('type="application/json">') + len('type="application/json">')
        end = html.index("</script>", start)
        baked = json.loads(html[start:end])
        assert baked["state"]["sum"] == {"__computed__": "{{ a + 1 }}"}


class TestComputedWithSetInitialState:
    def setup_method(self) -> None:
        clear_initial_state()

    def teardown_method(self) -> None:
        clear_initial_state()

    def test_computed_key_returns_rx(self) -> None:
        state = set_initial_state(a=1, total=Computed("{{ a + 1 }}"))
        rx = state.total
        assert isinstance(rx, Rx)
        assert rx.key == "total"

    def test_computed_is_declared_key(self) -> None:
        state = set_initial_state(a=1, total=Computed("{{ a }}"))
        # Should not raise — total is a declared key
        assert state.total.key == "total"

    def test_undeclared_key_still_raises(self) -> None:
        state = set_initial_state(a=1, total=Computed("{{ a }}"))
        with pytest.raises(AttributeError, match="not a declared state key"):
            state.typo

    def test_consumed_by_prefab_app(self) -> None:
        set_initial_state(a=1, b=2, total=Computed("{{ a + b }}"))
        app = PrefabApp()
        assert app.state is not None
        assert app.state["a"] == 1
        assert isinstance(app.state["total"], Computed)

    def test_bound_proxy_repr_includes_computed(self) -> None:
        state = set_initial_state(a=1, total=Computed("{{ a }}"))
        r = repr(state)
        assert "a" in r
        assert "total" in r

    def test_returns_bound_proxy(self) -> None:
        state = set_initial_state(total=Computed("{{ 1 + 2 }}"))
        assert isinstance(state, _BoundStateProxy)
