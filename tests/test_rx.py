"""Tests for the Rx reactive reference system."""

from __future__ import annotations

from prefab_ui.rx import Rx, _generate_key, reset_counter


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
        r = Rx("x")
        try:
            _ = r.__nonexistent__
            assert False, "Should have raised"
        except AttributeError:
            pass


class TestRxEquality:
    def test_equal_keys(self) -> None:
        assert Rx("a") == Rx("a")

    def test_different_keys(self) -> None:
        assert Rx("a") != Rx("b")

    def test_hash_equal(self) -> None:
        assert hash(Rx("a")) == hash(Rx("a"))

    def test_not_equal_to_string(self) -> None:
        assert Rx("a") != "a"


class TestRxImmutable:
    def test_setattr_raises(self) -> None:
        r = Rx("x")
        try:
            r.foo = "bar"
            assert False, "Should have raised"
        except AttributeError:
            pass


class TestGenerateKey:
    def test_sequential(self) -> None:
        assert _generate_key("slider") == "slider-1"
        assert _generate_key("slider") == "slider-2"
        assert _generate_key("slider") == "slider-3"

    def test_separate_prefixes(self) -> None:
        assert _generate_key("slider") == "slider-1"
        assert _generate_key("input") == "input-1"
        assert _generate_key("slider") == "slider-2"
        assert _generate_key("input") == "input-2"

    def test_reset(self) -> None:
        assert _generate_key("slider") == "slider-1"
        reset_counter()
        assert _generate_key("slider") == "slider-1"
