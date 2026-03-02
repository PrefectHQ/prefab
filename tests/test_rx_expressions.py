"""Compound Rx expression tests.

These tests exercise multi-node expression trees — combinations of arithmetic,
comparison, logical, ternary, dot-path, and pipe nodes. Each test touches 3+
node types in a single tree. The ``rx_factory`` fixture parameterizes every test
to run with both direct and deferred (forward-ref) roots, so grammar coverage
automatically extends to callable Rx without duplicating tests.

For individual operator behavior, see test_rx.py. For the callable/deferred
resolution mechanism itself, see TestCallableKey in this file.
"""

from __future__ import annotations

from collections.abc import Callable

import pytest

from prefab_ui.rx import Rx

# ── Fixtures ────────────────────────────────────────────────────────


@pytest.fixture(params=["direct", "deferred"], ids=["direct", "deferred"])
def rx_factory(request: pytest.FixtureRequest) -> Callable[[str], Rx]:
    """Return an Rx factory that produces either direct or deferred roots."""
    if request.param == "direct":
        return Rx
    else:

        def _deferred(key: str) -> Rx:
            target = Rx(key)
            return Rx(lambda: target)

        return _deferred


# ── Callable (deferred) resolution mechanism ────────────────────────


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

    def test_forward_ref_resolves_after_creation(self) -> None:
        """Forward-reference a component that doesn't exist yet."""
        from prefab_ui.components import Slider

        val = Rx(lambda: s)
        expr = (val / 100).percent()
        s = Slider(value=42, name="brightness")
        assert str(expr) == "{{ brightness / 100 | percent }}"

    def test_deferred_through_multiple_node_types(self) -> None:
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


# ── Compound expressions (parameterized: direct + deferred) ────────


class TestArithmeticPipe:
    """Arithmetic chains feeding into formatting pipes."""

    def test_division_then_percent(self, rx_factory: Callable[[str], Rx]) -> None:
        done = rx_factory("done")
        total = rx_factory("total")
        assert (done / total).percent(1).key == "done / total | percent:1"

    def test_multiply_then_currency(self, rx_factory: Callable[[str], Rx]) -> None:
        price = rx_factory("price")
        qty = rx_factory("qty")
        assert (price * qty).currency("EUR").key == "price * qty | currency:EUR"

    def test_add_sub_then_round(self, rx_factory: Callable[[str], Rx]) -> None:
        a = rx_factory("a")
        b = rx_factory("b")
        assert ((a + b) * 2 - 3).round(1).key == "(a + b) * 2 - 3 | round:1"

    def test_negation_then_abs(self, rx_factory: Callable[[str], Rx]) -> None:
        val = rx_factory("val")
        assert (-val).abs().key == "-val | abs"


class TestComparisonTernary:
    """Comparisons feeding into ternary branches."""

    def test_gt_ternary_strings(self, rx_factory: Callable[[str], Rx]) -> None:
        score = rx_factory("score")
        assert (score > 90).then("pass", "fail").key == "score > 90 ? 'pass' : 'fail'"

    def test_nested_ternary_grade(self, rx_factory: Callable[[str], Rx]) -> None:
        s = rx_factory("score")
        expr = (s > 90).then("A", (s > 80).then("B", (s > 70).then("C", "F")))
        assert (
            expr.key
            == "score > 90 ? 'A' : (score > 80 ? 'B' : (score > 70 ? 'C' : 'F'))"
        )

    def test_eq_ternary_with_rx_branches(self, rx_factory: Callable[[str], Rx]) -> None:
        mode = rx_factory("mode")
        light = rx_factory("light_val")
        dark = rx_factory("dark_val")
        assert (mode == "dark").then(dark, light).key == (
            "mode == 'dark' ? dark_val : light_val"
        )

    def test_arithmetic_comparison_ternary(
        self, rx_factory: Callable[[str], Rx]
    ) -> None:
        used = rx_factory("used")
        total = rx_factory("total")
        expr = (used / total > 0.9).then("critical", "ok")
        assert expr.key == "used / total > 0.9 ? 'critical' : 'ok'"


class TestLogicalCompound:
    """Logical operators combined with comparisons and ternary."""

    def test_and_range_check(self, rx_factory: Callable[[str], Rx]) -> None:
        val = rx_factory("temp")
        expr = ((val > 0) & (val < 100)).then("normal", "extreme")
        assert expr.key == "temp > 0 && temp < 100 ? 'normal' : 'extreme'"

    def test_or_fallback(self, rx_factory: Callable[[str], Rx]) -> None:
        a = rx_factory("primary")
        b = rx_factory("fallback")
        assert ((a == "") | (a == None)).then(b, a).key == (  # noqa: E711
            "primary == '' || primary == null ? fallback : primary"
        )

    def test_negated_condition_ternary(self, rx_factory: Callable[[str], Rx]) -> None:
        active = rx_factory("active")
        assert (~active).then("Enable", "Disable").key == (
            "!active ? 'Enable' : 'Disable'"
        )

    def test_compound_negation(self, rx_factory: Callable[[str], Rx]) -> None:
        a = rx_factory("a")
        b = rx_factory("b")
        assert (~(a > 0) & (b < 10)).key == "!(a > 0) && b < 10"


class TestDotPathCompound:
    """Dot-path access combined with operators and pipes."""

    def test_dot_path_comparison_ternary(self, rx_factory: Callable[[str], Rx]) -> None:
        item = rx_factory("item")
        expr = (item.status == "active").then("green", "gray")
        assert expr.key == "item.status == 'active' ? 'green' : 'gray'"

    def test_dot_path_arithmetic_pipe(self, rx_factory: Callable[[str], Rx]) -> None:
        order = rx_factory("order")
        assert (order.price * order.qty).currency().key == (
            "order.price * order.qty | currency"
        )

    def test_deep_path_then_pipe(self, rx_factory: Callable[[str], Rx]) -> None:
        user = rx_factory("user")
        assert user.address.city.upper().key == "user.address.city | upper"

    def test_dot_path_negation(self, rx_factory: Callable[[str], Rx]) -> None:
        item = rx_factory("item")
        assert (~item.done).key == "!item.done"


class TestPipeChainCompound:
    """Pipe chains combined with other node types."""

    def test_filter_then_count(self, rx_factory: Callable[[str], Rx]) -> None:
        todos = rx_factory("todos")
        assert todos.rejectattr("done").length().key == (
            "todos | rejectattr:done | length"
        )

    def test_arithmetic_pipe_chain(self, rx_factory: Callable[[str], Rx]) -> None:
        val = rx_factory("val")
        assert (val / 100).percent(1).key == "val / 100 | percent:1"

    def test_dot_path_pipe_chain(self, rx_factory: Callable[[str], Rx]) -> None:
        item = rx_factory("item")
        assert item.name.lower().truncate(20).key == "item.name | lower | truncate:20"


class TestPrecedenceCompound:
    """Expressions that exercise precedence wrapping across node types."""

    def test_add_in_mul_wraps(self, rx_factory: Callable[[str], Rx]) -> None:
        a = rx_factory("a")
        b = rx_factory("b")
        c = rx_factory("c")
        assert ((a + b) * c).key == "(a + b) * c"

    def test_non_commutative_rhs_wraps(self, rx_factory: Callable[[str], Rx]) -> None:
        a = rx_factory("a")
        b = rx_factory("b")
        c = rx_factory("c")
        assert (a - (b + c)).key == "a - (b + c)"

    def test_nested_non_commutative(self, rx_factory: Callable[[str], Rx]) -> None:
        a = rx_factory("a")
        b = rx_factory("b")
        c = rx_factory("c")
        assert (a / (b / c)).key == "a / (b / c)"

    def test_comparison_with_arithmetic(self, rx_factory: Callable[[str], Rx]) -> None:
        x = rx_factory("x")
        assert (x * 2 + 1 > 10).key == "x * 2 + 1 > 10"

    def test_logical_with_comparison_no_extra_parens(
        self, rx_factory: Callable[[str], Rx]
    ) -> None:
        a = rx_factory("a")
        b = rx_factory("b")
        assert ((a > 0) & (b > 0)).key == "a > 0 && b > 0"


class TestRealisticExpressions:
    """End-to-end expressions modeled after real UI patterns."""

    def test_slider_label(self, rx_factory: Callable[[str], Rx]) -> None:
        vol = rx_factory("volume")
        assert f"Volume: {vol}%" == "Volume: {{ volume }}%"

    def test_progress_with_threshold(self, rx_factory: Callable[[str], Rx]) -> None:
        used = rx_factory("used")
        total = rx_factory("total")
        pct = used / total
        label = pct.percent(1)
        color = (pct > 0.9).then("red", (pct > 0.7).then("yellow", "green"))
        assert label.key == "used / total | percent:1"
        assert color.key == (
            "used / total > 0.9 ? 'red' : (used / total > 0.7 ? 'yellow' : 'green')"
        )

    def test_dashboard_revenue(self, rx_factory: Callable[[str], Rx]) -> None:
        revenue = rx_factory("revenue")
        target = rx_factory("target")
        pct = revenue / target
        assert f"Revenue: {revenue.currency()}" == ("Revenue: {{ revenue | currency }}")
        assert pct.percent(1).key == "revenue / target | percent:1"
        assert (pct > 1).then("above", "below").key == (
            "revenue / target > 1 ? 'above' : 'below'"
        )

    def test_component_forward_ref_full_chain(self) -> None:
        """A realistic forward-reference pattern: labels defined before slider."""
        from prefab_ui.components import Slider

        vol = Rx(lambda: slider)
        label = (vol / 100).percent()
        color = (vol > 75).then("high", "normal")
        slider = Slider(value=50, name="volume")
        assert str(label) == "{{ volume / 100 | percent }}"
        assert str(color) == "{{ volume > 75 ? 'high' : 'normal' }}"
