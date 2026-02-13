"""Tests for the Responsive class and responsive layout compilation."""

import pytest

from prefab_ui.components import Column, Grid, Responsive, Row, Text
from prefab_ui.components.base import _compile_layout_classes


class TestResponsive:
    def test_single_breakpoint(self) -> None:
        r = Responsive(default=1)
        assert r.values == {"default": 1}

    def test_multiple_breakpoints(self) -> None:
        r = Responsive(default=1, md=2, lg=3)
        assert r.values == {"default": 1, "md": 2, "lg": 3}

    def test_invalid_breakpoint_raises(self) -> None:
        with pytest.raises(ValueError, match="Invalid breakpoint"):
            Responsive(default=1, xxl=5)

    def test_empty_raises(self) -> None:
        with pytest.raises(ValueError, match="requires at least one"):
            Responsive()

    def test_repr(self) -> None:
        r = Responsive(default=1, md=2)
        assert repr(r) == "Responsive(default=1, md=2)"

    def test_equality(self) -> None:
        assert Responsive(default=1, md=2) == Responsive(default=1, md=2)
        assert Responsive(default=1) != Responsive(default=2)

    def test_compile_css_default_only(self) -> None:
        r = Responsive(default="w-full")
        assert r.compile_css(str) == "w-full"

    def test_compile_css_with_breakpoints(self) -> None:
        r = Responsive(default="w-full", md="w-auto")
        assert r.compile_css(str) == "w-full md:w-auto"

    def test_compile_css_no_default(self) -> None:
        r = Responsive(md="w-auto", lg="w-1/2")
        assert r.compile_css(str) == "md:w-auto lg:w-1/2"

    def test_compile_css_breakpoint_order(self) -> None:
        # Breakpoints should always compile in sm → md → lg → xl → 2xl order
        r = Responsive(lg=3, sm=1, default=0)
        result = r.compile_css(lambda n: f"cols-{n}")
        assert result == "cols-0 sm:cols-1 lg:cols-3"

    def test_compile_css_multi_class_value(self) -> None:
        r = Responsive(default="hidden flex-col", md="block flex-row")
        result = r.compile_css(str)
        assert result == "hidden flex-col md:block md:flex-row"


class TestResponsiveColumns:
    def test_grid_fixed_columns(self) -> None:
        g = Grid(columns=3)
        assert "grid-cols-3" in (g.css_class or "")

    def test_grid_default_columns(self) -> None:
        g = Grid()
        assert "grid-cols-3" in (g.css_class or "")

    def test_grid_responsive_columns_dict(self) -> None:
        g = Grid(columns={"default": 1, "md": 2, "lg": 3})
        css = g.css_class or ""
        assert "grid-cols-1" in css
        assert "md:grid-cols-2" in css
        assert "lg:grid-cols-3" in css

    def test_grid_responsive_columns_object(self) -> None:
        g = Grid(columns=Responsive(default=1, md=2, lg=3))
        css = g.css_class or ""
        assert "grid-cols-1" in css
        assert "md:grid-cols-2" in css
        assert "lg:grid-cols-3" in css

    def test_grid_min_column_width(self) -> None:
        g = Grid(min_column_width="16rem")
        data = g.to_json()
        assert data["minColumnWidth"] == "16rem"
        # Should not have any grid-cols class — renderer applies inline style
        assert "grid-cols" not in (g.css_class or "")

    def test_grid_min_column_width_no_default_columns(self) -> None:
        g = Grid(min_column_width="20rem")
        # Should not have the default grid-cols-3
        assert "grid-cols-3" not in (g.css_class or "")


class TestResponsiveGap:
    def test_fixed_gap_unchanged(self) -> None:
        css = _compile_layout_classes(gap=4)
        assert css == "gap-4"

    def test_tuple_gap_unchanged(self) -> None:
        css = _compile_layout_classes(gap=(2, 4))
        assert css == "gap-x-2 gap-y-4"

    def test_responsive_gap(self) -> None:
        css = _compile_layout_classes(gap=Responsive(default=2, md=4))
        assert css is not None
        assert "gap-2" in css
        assert "md:gap-4" in css

    def test_responsive_gap_on_row(self) -> None:
        r = Row(gap=Responsive(default=2, md=4))
        css = r.css_class or ""
        assert "gap-2" in css
        assert "md:gap-4" in css

    def test_responsive_gap_on_column(self) -> None:
        c = Column(gap=Responsive(default=2, lg=6))
        css = c.css_class or ""
        assert "gap-2" in css
        assert "lg:gap-6" in css

    def test_responsive_gap_on_grid(self) -> None:
        g = Grid(columns=2, gap=Responsive(default=2, md=4))
        css = g.css_class or ""
        assert "gap-2" in css
        assert "md:gap-4" in css
        assert "grid-cols-2" in css


class TestResponsiveCssClass:
    def test_string_css_class_unchanged(self) -> None:
        t = Text(content="hi", css_class="text-red-500")
        assert t.css_class == "text-red-500"

    def test_responsive_css_class(self) -> None:
        # Responsive is accepted at runtime via BeforeValidator; use
        # model_validate so the type checker doesn't complain about the
        # input type (it coerces to str before storage).
        t = Text.model_validate(
            {"content": "hi", "css_class": Responsive(default="hidden", md="block")}
        )
        assert t.css_class == "hidden md:block"

    def test_responsive_css_class_with_layout(self) -> None:
        r = Row.model_validate(
            {"gap": 2, "css_class": Responsive(default="p-2", md="p-4")}
        )
        css = r.css_class or ""
        assert "gap-2" in css
        assert "p-2" in css
        assert "md:p-4" in css
