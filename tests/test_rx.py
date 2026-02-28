"""Tests for the Rx reactive reference system."""

from __future__ import annotations

import pytest

from prefab_ui.rx import ERROR, EVENT, INDEX, ITEM, Rx, _generate_key, reset_counter

# ── String conversion ────────────────────────────────────────────────


class TestRxStr:
    def test_str_wraps_in_template(self) -> None:
        assert str(Rx("count")) == "{{ count }}"

    def test_format_wraps_in_template(self) -> None:
        assert f"{Rx('count')}" == "{{ count }}"

    def test_repr(self) -> None:
        assert repr(Rx("count")) == "Rx('count')"

    def test_fstring_mixed_with_text(self) -> None:
        r = Rx("name")
        assert f"Hello, {r}!" == "Hello, {{ name }}!"

    def test_fstring_multiple_refs(self) -> None:
        a = Rx("first")
        b = Rx("last")
        assert f"{a} {b}" == "{{ first }} {{ last }}"


# ── Dot-path access ──────────────────────────────────────────────────


class TestRxDotPath:
    def test_single_level(self) -> None:
        user = Rx("user")
        assert str(user.name) == "{{ user.name }}"

    def test_multi_level(self) -> None:
        user = Rx("user")
        assert str(user.address.city) == "{{ user.address.city }}"

    def test_dot_path_in_fstring(self) -> None:
        user = Rx("user")
        assert f"City: {user.address.city}" == "City: {{ user.address.city }}"

    def test_dunder_raises(self) -> None:
        with pytest.raises(AttributeError):
            _ = Rx("x").__nonexistent__


# ── Immutability ─────────────────────────────────────────────────────


class TestRxImmutable:
    def test_setattr_raises(self) -> None:
        with pytest.raises(AttributeError):
            Rx("x").foo = "bar"


# ── Arithmetic ───────────────────────────────────────────────────────


class TestArithmetic:
    def test_add_int(self) -> None:
        assert (Rx("count") + 1).key == "count + 1"

    def test_add_rx(self) -> None:
        assert (Rx("a") + Rx("b")).key == "a + b"

    def test_radd(self) -> None:
        assert (1 + Rx("count")).key == "1 + count"

    def test_sub(self) -> None:
        assert (Rx("total") - 10).key == "total - 10"

    def test_rsub(self) -> None:
        assert (100 - Rx("used")).key == "100 - used"

    def test_mul(self) -> None:
        assert (Rx("price") * Rx("qty")).key == "price * qty"

    def test_rmul(self) -> None:
        assert (2 * Rx("count")).key == "2 * count"

    def test_div(self) -> None:
        assert (Rx("total") / 2).key == "total / 2"

    def test_rtruediv(self) -> None:
        assert (100 / Rx("parts")).key == "100 / parts"

    def test_neg(self) -> None:
        assert (-Rx("score")).key == "-score"

    def test_pos(self) -> None:
        assert (+Rx("value")).key == "+value"

    def test_str_produces_template(self) -> None:
        assert str(Rx("count") + 1) == "{{ count + 1 }}"


# ── Precedence / parenthesization ────────────────────────────────────


class TestPrecedence:
    def test_add_then_mul_wraps(self) -> None:
        result = (Rx("a") + Rx("b")) * Rx("c")
        assert result.key == "(a + b) * c"

    def test_mul_then_add_no_wrap(self) -> None:
        result = Rx("a") * Rx("b") + Rx("c")
        assert result.key == "a * b + c"

    def test_nested_add_sub(self) -> None:
        result = Rx("a") - (Rx("b") + Rx("c"))
        assert result.key == "a - (b + c)"

    def test_chained_sub_groups_correctly(self) -> None:
        result = Rx("a") - (Rx("b") - Rx("c"))
        assert result.key == "a - (b - c)"

    def test_comparison_in_logical_no_extra_wrapping(self) -> None:
        result = (Rx("a") > 0) & (Rx("b") < 10)
        assert result.key == "a > 0 && b < 10"

    def test_add_in_comparison_no_wrap(self) -> None:
        result = Rx("a") + 1 > 5
        assert result.key == "a + 1 > 5"

    def test_neg_compound(self) -> None:
        result = -(Rx("a") + Rx("b"))
        assert result.key == "-(a + b)"

    def test_mul_then_pipe(self) -> None:
        result = (Rx("price") * Rx("qty")).currency()
        assert result.key == "price * qty | currency"

    def test_div_then_pipe(self) -> None:
        result = (Rx("a") / Rx("b")).percent(1)
        assert result.key == "a / b | percent:1"


# ── Comparison ───────────────────────────────────────────────────────


class TestComparison:
    def test_eq_string(self) -> None:
        assert (Rx("status") == "active").key == "status == 'active'"

    def test_eq_rx(self) -> None:
        assert (Rx("a") == Rx("b")).key == "a == b"

    def test_eq_int(self) -> None:
        assert (Rx("count") == 0).key == "count == 0"

    def test_ne(self) -> None:
        assert (Rx("count") != 1).key == "count != 1"

    def test_gt(self) -> None:
        assert (Rx("score") > 90).key == "score > 90"

    def test_ge(self) -> None:
        assert (Rx("score") >= 90).key == "score >= 90"

    def test_lt(self) -> None:
        assert (Rx("temp") < 0).key == "temp < 0"

    def test_le(self) -> None:
        assert (Rx("temp") <= 32).key == "temp <= 32"

    def test_eq_returns_rx(self) -> None:
        result = Rx("x") == 5
        assert isinstance(result, Rx)

    def test_ne_returns_rx(self) -> None:
        result = Rx("x") != 5
        assert isinstance(result, Rx)

    def test_not_hashable(self) -> None:
        with pytest.raises(TypeError):
            hash(Rx("x"))


# ── Logical ──────────────────────────────────────────────────────────


class TestLogical:
    def test_and(self) -> None:
        result = (Rx("a") > 0) & (Rx("a") < 10)
        assert result.key == "a > 0 && a < 10"

    def test_or(self) -> None:
        result = (Rx("x") == 1) | (Rx("x") == 2)
        assert result.key == "x == 1 || x == 2"

    def test_invert(self) -> None:
        assert (~Rx("active")).key == "!active"

    def test_invert_compound(self) -> None:
        assert (~(Rx("a") > 0)).key == "!(a > 0)"

    def test_and_chain(self) -> None:
        result = (Rx("a") > 0) & (Rx("b") > 0) & (Rx("c") > 0)
        assert result.key == "a > 0 && b > 0 && c > 0"

    def test_or_chain(self) -> None:
        result = (Rx("a") == 1) | (Rx("a") == 2) | (Rx("a") == 3)
        assert result.key == "a == 1 || a == 2 || a == 3"

    def test_rand(self) -> None:
        result = True & Rx("active")
        assert isinstance(result, Rx)

    def test_ror(self) -> None:
        result = False | Rx("fallback")
        assert isinstance(result, Rx)


# ── Ternary ──────────────────────────────────────────────────────────


class TestTernary:
    def test_basic(self) -> None:
        result = Rx("active").then("On", "Off")
        assert result.key == "active ? 'On' : 'Off'"

    def test_with_numbers(self) -> None:
        result = Rx("ok").then(1, 0)
        assert result.key == "ok ? 1 : 0"

    def test_with_bool(self) -> None:
        result = Rx("ok").then(True, False)
        assert result.key == "ok ? true : false"

    def test_from_comparison(self) -> None:
        result = (Rx("score") > 90).then("Pass", "Fail")
        assert result.key == "score > 90 ? 'Pass' : 'Fail'"

    def test_nested(self) -> None:
        score = Rx("score")
        result = (score > 90).then(
            "A",
            (score > 80).then("B", (score > 70).then("C", "F")),
        )
        assert result.key == (
            "score > 90 ? 'A' : (score > 80 ? 'B' : (score > 70 ? 'C' : 'F'))"
        )

    def test_str(self) -> None:
        assert str(Rx("x").then("yes", "no")) == "{{ x ? 'yes' : 'no' }}"

    def test_rx_branches(self) -> None:
        result = Rx("cond").then(Rx("a"), Rx("b"))
        assert result.key == "cond ? a : b"


# ── Pipes ────────────────────────────────────────────────────────────


class TestPipes:
    def test_currency(self) -> None:
        assert Rx("revenue").currency().key == "revenue | currency"

    def test_currency_code(self) -> None:
        assert Rx("price").currency("EUR").key == "price | currency:EUR"

    def test_percent(self) -> None:
        assert Rx("ratio").percent().key == "ratio | percent"

    def test_percent_decimals(self) -> None:
        assert Rx("ratio").percent(1).key == "ratio | percent:1"

    def test_number(self) -> None:
        assert Rx("val").number().key == "val | number"

    def test_number_decimals(self) -> None:
        assert Rx("val").number(2).key == "val | number:2"

    def test_round(self) -> None:
        assert Rx("pi").round(2).key == "pi | round:2"

    def test_abs(self) -> None:
        assert Rx("diff").abs().key == "diff | abs"

    def test_date(self) -> None:
        assert Rx("d").date().key == "d | date"

    def test_date_format(self) -> None:
        assert Rx("d").date("long").key == "d | date:long"

    def test_time(self) -> None:
        assert Rx("t").time().key == "t | time"

    def test_datetime(self) -> None:
        assert Rx("dt").datetime().key == "dt | datetime"

    def test_upper(self) -> None:
        assert Rx("name").upper().key == "name | upper"

    def test_lower(self) -> None:
        assert Rx("name").lower().key == "name | lower"

    def test_truncate(self) -> None:
        assert Rx("bio").truncate(80).key == "bio | truncate:80"

    def test_pluralize(self) -> None:
        assert Rx("n").pluralize().key == "n | pluralize"

    def test_pluralize_word(self) -> None:
        assert Rx("n").pluralize("item").key == "n | pluralize:item"

    def test_length(self) -> None:
        assert Rx("items").length().key == "items | length"

    def test_join(self) -> None:
        assert Rx("tags").join().key == "tags | join"

    def test_join_separator(self) -> None:
        assert Rx("tags").join(" - ").key == "tags | join:' - '"

    def test_first(self) -> None:
        assert Rx("items").first().key == "items | first"

    def test_last(self) -> None:
        assert Rx("items").last().key == "items | last"

    def test_selectattr(self) -> None:
        assert Rx("todos").selectattr("done").key == "todos | selectattr:done"

    def test_rejectattr(self) -> None:
        assert Rx("todos").rejectattr("done").key == "todos | rejectattr:done"

    def test_default(self) -> None:
        assert Rx("name").default("Anonymous").key == "name | default:Anonymous"


# ── Pipe chaining ────────────────────────────────────────────────────


class TestPipeChaining:
    def test_two_pipes(self) -> None:
        assert Rx("name").lower().truncate(20).key == "name | lower | truncate:20"

    def test_three_pipes(self) -> None:
        result = Rx("todos").rejectattr("done").length()
        assert result.key == "todos | rejectattr:done | length"

    def test_operator_then_pipe(self) -> None:
        result = (Rx("price") * Rx("qty")).currency()
        assert result.key == "price * qty | currency"

    def test_division_then_pipe(self) -> None:
        result = (Rx("done") / Rx("total")).percent(1)
        assert result.key == "done / total | percent:1"


# ── Compound expressions ─────────────────────────────────────────────


class TestCompound:
    def test_arithmetic_in_fstring(self) -> None:
        price = Rx("price")
        qty = Rx("qty")
        assert (
            f"Total: {(price * qty).currency()}"
            == "Total: {{ price * qty | currency }}"
        )

    def test_comparison_in_fstring(self) -> None:
        count = Rx("count")
        assert f"{count} item{(count != 1).then('s', '')}" == (
            "{{ count }} item{{ count != 1 ? 's' : '' }}"
        )

    def test_complex_expression(self) -> None:
        revenue = Rx("revenue")
        target = Rx("target")
        result = revenue / target * 100
        assert result.key == "revenue / target * 100"

    def test_revenue_dashboard(self) -> None:
        revenue = Rx("revenue")
        target = Rx("target")
        growth = Rx("growth")

        assert revenue.currency().key == "revenue | currency"
        assert (revenue / target).percent(1).key == "revenue / target | percent:1"
        assert growth.percent(1).key == "growth | percent:1"


# ── Value formatting ─────────────────────────────────────────────────


class TestValueFormatting:
    def test_string_values_quoted(self) -> None:
        assert (Rx("status") == "active").key == "status == 'active'"

    def test_int_values_bare(self) -> None:
        assert (Rx("count") > 0).key == "count > 0"

    def test_float_values_bare(self) -> None:
        assert (Rx("price") * 1.5).key == "price * 1.5"

    def test_bool_true(self) -> None:
        assert (Rx("done") == True).key == "done == true"  # noqa: E712

    def test_bool_false(self) -> None:
        assert (Rx("done") == False).key == "done == false"  # noqa: E712

    def test_none(self) -> None:
        assert (Rx("value") == None).key == "value == null"  # noqa: E711


# ── Auto-name counter ────────────────────────────────────────────────


class TestGenerateKey:
    def test_sequential(self) -> None:
        assert _generate_key("slider") == "slider_1"
        assert _generate_key("slider") == "slider_2"
        assert _generate_key("slider") == "slider_3"

    def test_separate_prefixes(self) -> None:
        assert _generate_key("slider") == "slider_1"
        assert _generate_key("input") == "input_1"
        assert _generate_key("slider") == "slider_2"
        assert _generate_key("input") == "input_2"

    def test_reset(self) -> None:
        assert _generate_key("slider") == "slider_1"
        reset_counter()
        assert _generate_key("slider") == "slider_1"


# ── Built-in rx sentinel ────────────────────────────────────────────


class TestBuiltinReactiveVars:
    def test_event_str(self) -> None:
        assert str(EVENT) == "{{ $event }}"

    def test_error_str(self) -> None:
        assert str(ERROR) == "{{ $error }}"

    def test_item_str(self) -> None:
        assert str(ITEM) == "{{ $item }}"

    def test_index_str(self) -> None:
        assert str(INDEX) == "{{ $index }}"

    def test_item_dot_path(self) -> None:
        assert str(ITEM.title) == "{{ $item.title }}"

    def test_item_deep_path(self) -> None:
        assert str(ITEM.address.city) == "{{ $item.address.city }}"

    def test_item_is_rx(self) -> None:
        assert isinstance(ITEM, Rx)

    def test_item_key(self) -> None:
        assert ITEM.key == "$item"

    def test_item_field_key(self) -> None:
        assert ITEM.title.key == "$item.title"

    def test_operators_on_item_field(self) -> None:
        assert (ITEM.count > 0).key == "$item.count > 0"

    def test_pipe_on_item_field(self) -> None:
        assert ITEM.price.currency().key == "$item.price | currency"

    def test_negation(self) -> None:
        assert (~ITEM.done).key == "!$item.done"

    def test_index_arithmetic(self) -> None:
        assert (INDEX + 1).key == "$index + 1"
