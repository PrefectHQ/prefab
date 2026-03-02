"""Tests for Rx forward references (callable/lambda keys) and deferred resolution."""

from __future__ import annotations

import pytest

from prefab_ui.rx import Rx

# ── Callable (deferred) keys ────────────────────────────────────────


class TestCallableKey:
    def test_basic_callable_key(self) -> None:
        rx = Rx(lambda: Rx("resolved"))
        assert rx.key == "resolved"
        assert str(rx) == "{{ resolved }}"

    def test_callable_resolves_at_key_access(self) -> None:
        container: list[Rx] = []
        rx = Rx(lambda: container[0])
        container.append(Rx("late_value"))
        assert rx.key == "late_value"

    def test_callable_dot_path(self) -> None:
        rx = Rx(lambda: Rx("base"))
        assert rx.title.key == "base.title"

    def test_callable_returns_string(self) -> None:
        rx = Rx(lambda: "raw_key")
        assert rx.key == "raw_key"

    def test_callable_with_stateful_component(self) -> None:
        """Rx(lambda: component) extracts .rx automatically."""
        from prefab_ui.components import Slider

        slider = Slider(value=50, name="vol")
        rx = Rx(lambda: slider)
        assert rx.key == "vol"
        assert str(rx) == "{{ vol }}"

    def test_callable_forward_ref_to_component(self) -> None:
        """Forward-reference a component that doesn't exist yet."""
        from prefab_ui.components import Slider

        val = Rx(lambda: s)
        expr = (val / 100).percent()
        s = Slider(value=42, name="brightness")
        assert str(expr) == "{{ brightness / 100 | percent }}"

    def test_callable_forward_reference_with_operators(self) -> None:
        """Operators on a callable Rx defer resolution until .key is accessed."""
        container: list[Rx] = []
        val = Rx(lambda: container[0])
        expr = (val / 100).percent()
        cond = (val < 20).then("low", "ok")
        neg = -val
        container.append(Rx("slider_1"))
        assert str(expr) == "{{ slider_1 / 100 | percent }}"
        assert str(cond) == "{{ slider_1 < 20 ? 'low' : 'ok' }}"
        assert str(neg) == "{{ -slider_1 }}"

    def test_callable_chained_operators(self) -> None:
        """Multiple operators compose through the expression tree."""
        container: list[Rx] = []
        val = Rx(lambda: container[0])
        chained = ((val + 1) * 2 - 3).round()
        container.append(Rx("x"))
        assert str(chained) == "{{ (x + 1) * 2 - 3 | round:0 }}"


# ── Forward references through every operator ────────────────────────


class TestForwardRefOperators:
    """Ensure forward-referenced Rx works through every operator type."""

    @pytest.fixture()
    def deferred(self) -> tuple[Rx, list[Rx]]:
        container: list[Rx] = []
        return Rx(lambda: container[0]), container

    def _resolve(self, container: list[Rx]) -> None:
        container.append(Rx("x"))

    # Arithmetic
    def test_add(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = val + 1
        self._resolve(c)
        assert str(expr) == "{{ x + 1 }}"

    def test_radd(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = 10 + val
        self._resolve(c)
        assert str(expr) == "{{ 10 + x }}"

    def test_sub(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = val - 5
        self._resolve(c)
        assert str(expr) == "{{ x - 5 }}"

    def test_rsub(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = 100 - val
        self._resolve(c)
        assert str(expr) == "{{ 100 - x }}"

    def test_mul(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = val * 2
        self._resolve(c)
        assert str(expr) == "{{ x * 2 }}"

    def test_rmul(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = 3 * val
        self._resolve(c)
        assert str(expr) == "{{ 3 * x }}"

    def test_truediv(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = val / 100
        self._resolve(c)
        assert str(expr) == "{{ x / 100 }}"

    def test_rtruediv(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = 1 / val
        self._resolve(c)
        assert str(expr) == "{{ 1 / x }}"

    def test_neg(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = -val
        self._resolve(c)
        assert str(expr) == "{{ -x }}"

    def test_pos(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = +val
        self._resolve(c)
        assert str(expr) == "{{ +x }}"

    # Comparison
    def test_eq(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = val == "done"
        self._resolve(c)
        assert str(expr) == "{{ x == 'done' }}"

    def test_ne(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = val != 0
        self._resolve(c)
        assert str(expr) == "{{ x != 0 }}"

    def test_gt(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = val > 50
        self._resolve(c)
        assert str(expr) == "{{ x > 50 }}"

    def test_ge(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = val >= 0
        self._resolve(c)
        assert str(expr) == "{{ x >= 0 }}"

    def test_lt(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = val < 10
        self._resolve(c)
        assert str(expr) == "{{ x < 10 }}"

    def test_le(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = val <= 100
        self._resolve(c)
        assert str(expr) == "{{ x <= 100 }}"

    # Logical
    def test_and(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = (val > 0) & (val < 100)
        self._resolve(c)
        assert str(expr) == "{{ x > 0 && x < 100 }}"

    def test_or(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = (val == 0) | (val == 1)
        self._resolve(c)
        assert str(expr) == "{{ x == 0 || x == 1 }}"

    def test_invert(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = ~val
        self._resolve(c)
        assert str(expr) == "{{ !x }}"

    # Ternary
    def test_then(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = (val > 0).then("positive", "non-positive")
        self._resolve(c)
        assert str(expr) == "{{ x > 0 ? 'positive' : 'non-positive' }}"

    def test_nested_ternary(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = (val > 90).then("A", (val > 80).then("B", "C"))
        self._resolve(c)
        assert str(expr) == "{{ x > 90 ? 'A' : (x > 80 ? 'B' : 'C') }}"

    # Dot paths
    def test_dot_path(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = val.name
        self._resolve(c)
        assert str(expr) == "{{ x.name }}"

    def test_deep_dot_path(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = val.address.city
        self._resolve(c)
        assert str(expr) == "{{ x.address.city }}"

    # Pipes
    def test_pipe_no_arg(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = val.upper()
        self._resolve(c)
        assert str(expr) == "{{ x | upper }}"

    def test_pipe_with_arg(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = val.currency("EUR")
        self._resolve(c)
        assert str(expr) == "{{ x | currency:EUR }}"

    def test_pipe_chain(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = val.lower().truncate(20)
        self._resolve(c)
        assert str(expr) == "{{ x | lower | truncate:20 }}"

    # Precedence through forward refs
    def test_precedence_parens(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = (val + 1) * 2
        self._resolve(c)
        assert str(expr) == "{{ (x + 1) * 2 }}"

    def test_non_commutative_rhs_parens(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        a = Rx("a")
        expr = a - (val + 1)
        self._resolve(c)
        assert str(expr) == "{{ a - (x + 1) }}"

    # Compound expressions
    def test_compound_arithmetic_and_pipe(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = (val / 100).percent()
        self._resolve(c)
        assert str(expr) == "{{ x / 100 | percent }}"

    def test_compound_comparison_and_ternary(
        self, deferred: tuple[Rx, list[Rx]]
    ) -> None:
        val, c = deferred
        expr = (val >= 50).then("pass", "fail")
        self._resolve(c)
        assert str(expr) == "{{ x >= 50 ? 'pass' : 'fail' }}"

    def test_compound_dot_path_and_pipe(self, deferred: tuple[Rx, list[Rx]]) -> None:
        val, c = deferred
        expr = val.price.currency()
        self._resolve(c)
        assert str(expr) == "{{ x.price | currency }}"

    # Component forward ref through operators
    def test_component_forward_ref_full_chain(self) -> None:
        from prefab_ui.components import Slider

        vol = Rx(lambda: slider)
        label = (vol / 100).percent()
        cond = (vol > 75).then("high", "normal")
        slider = Slider(value=50, name="volume")
        assert str(label) == "{{ volume / 100 | percent }}"
        assert str(cond) == "{{ volume > 75 ? 'high' : 'normal' }}"
