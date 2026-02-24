"""Tests for context manager nesting, defer, and insert."""

from __future__ import annotations

import pytest

from prefab_ui.components import Column, Heading, Row, Slider, Text, defer, insert
from prefab_ui.components.base import ContainerComponent


class TestContextManagerNesting:
    def test_single_level(self):
        with Column() as col:
            Text(content="a")
            Text(content="b")
        assert len(col.children) == 2
        assert col.children[0].content == "a"  # type: ignore[attr-defined]
        assert col.children[1].content == "b"  # type: ignore[attr-defined]

    def test_nested(self):
        with Column() as root:
            Heading(content="Top")
            with Row() as row:
                Text(content="left")
                Text(content="right")
        assert len(root.children) == 2
        assert isinstance(root.children[0], Heading)
        assert isinstance(root.children[1], Row)
        assert len(row.children) == 2

    def test_deeply_nested(self):
        with Column() as root:
            with Row():
                with Column() as inner:
                    Text(content="deep")
        assert len(root.children) == 1
        row_child = root.children[0]
        assert isinstance(row_child, Row)
        assert len(row_child.children) == 1
        assert isinstance(row_child.children[0], Column)
        assert len(inner.children) == 1

    def test_serialization_with_children(self):
        with Column(css_class="p-4") as col:
            Heading(content="Hello")
            Text(content="World")
        j = col.to_json()
        assert j["type"] == "Column"
        assert j["cssClass"] == "p-4"
        assert len(j["children"]) == 2
        assert j["children"][0]["type"] == "Heading"
        assert j["children"][1]["type"] == "Text"

    def test_no_auto_append_outside_context(self):
        col = Column()
        Text(content="orphan")
        assert len(col.children) == 0


class TestExplicitChildren:
    def test_no_double_append(self):
        """children= kwarg should not also auto-attach to the outer parent."""
        with Column() as outer:
            Row(children=[Text(content="inner")])
        assert len(outer.children) == 1
        assert isinstance(outer.children[0], Row)
        assert len(outer.children[0].children) == 1

    def test_mixed_explicit_and_auto(self):
        with Column() as outer:
            Text(content="auto")
            Row(children=[Text(content="explicit")])
            Text(content="also-auto")
        assert len(outer.children) == 3
        assert outer.children[0].content == "auto"  # type: ignore[attr-defined]
        assert isinstance(outer.children[1], Row)
        assert outer.children[2].content == "also-auto"  # type: ignore[attr-defined]

    def test_multiple_explicit_children(self):
        with Column() as outer:
            Row(children=[Text(content="a"), Text(content="b"), Text(content="c")])
        assert len(outer.children) == 1
        inner_row = outer.children[0]
        assert isinstance(inner_row, ContainerComponent)
        assert len(inner_row.children) == 3

    def test_nested_explicit_children(self):
        with Column() as outer:
            Row(children=[Column(children=[Text(content="deep")])])
        assert len(outer.children) == 1
        inner_row = outer.children[0]
        assert isinstance(inner_row, ContainerComponent)
        assert len(inner_row.children) == 1
        inner_col = inner_row.children[0]
        assert isinstance(inner_col, ContainerComponent)
        assert len(inner_col.children) == 1

    def test_explicit_children_outside_context(self):
        """No stack parent — explicit children should just work."""
        row = Row(children=[Text(content="a"), Text(content="b")])
        assert len(row.children) == 2


class TestDefer:
    def test_context_prevents_auto_attach(self):
        with Column() as col:
            Text(content="attached")
            with defer():
                orphan = Text(content="deferred")
        assert len(col.children) == 1
        assert col.children[0].content == "attached"  # type: ignore[attr-defined]
        assert orphan.content == "deferred"

    def test_context_allows_explicit_context_managers(self):
        with Column() as outer:
            Text(content="outer-child")
            with defer():
                sidebar = Column()
                with sidebar:
                    Text(content="sidebar-child")
        assert len(outer.children) == 1
        assert len(sidebar.children) == 1
        assert sidebar.children[0].content == "sidebar-child"  # type: ignore[attr-defined]

    def test_context_restores_stack(self):
        with Column() as col:
            Text(content="before")
            with defer():
                Text(content="ignored")
            Text(content="after")
        assert len(col.children) == 2
        assert col.children[0].content == "before"  # type: ignore[attr-defined]
        assert col.children[1].content == "after"  # type: ignore[attr-defined]

    def test_context_nested(self):
        with Column() as col:
            with defer():
                with defer():
                    Text(content="double-deferred")
                Text(content="single-deferred")
            Text(content="attached")
        assert len(col.children) == 1
        assert col.children[0].content == "attached"  # type: ignore[attr-defined]

    def test_context_at_top_level(self):
        with defer():
            t = Text(content="orphan")
        assert t.content == "orphan"

    def test_context_restores_on_exception(self):
        with Column() as col:
            try:
                with defer():
                    raise ValueError("boom")
            except ValueError:
                pass
            Text(content="after-error")
        assert len(col.children) == 1
        assert col.children[0].content == "after-error"  # type: ignore[attr-defined]

    def test_kwarg_prevents_auto_attach(self):
        with Column() as col:
            Text(content="attached")
            deferred = Text(content="deferred", defer=True)
        assert len(col.children) == 1
        assert col.children[0].content == "attached"  # type: ignore[attr-defined]
        assert deferred.content == "deferred"

    def test_kwarg_still_generates_name(self):
        slider = Slider(value=50, defer=True)
        assert slider.name is not None
        assert slider.rx is not None

    def test_kwarg_does_not_serialize(self):
        """defer should not appear in the JSON output."""
        t = Text(content="hello", defer=True)
        j = t.to_json()
        assert "defer" not in j


class TestInsert:
    def test_basic(self):
        volume = Slider(value=75)
        with Column() as col:
            Text(content="label")
            insert(volume)
        assert len(col.children) == 2
        assert col.children[1] is volume

    def test_with_defer_kwarg(self):
        with Column() as outer:
            slider = Slider(value=50, defer=True)
            Text(content="label")
            insert(slider)
        assert len(outer.children) == 2
        assert outer.children[0].content == "label"  # type: ignore[attr-defined]
        assert outer.children[1] is slider

    def test_with_defer_context(self):
        with Column() as col:
            with defer():
                sidebar = Column()
                with sidebar:
                    Text(content="sidebar")
            Text(content="main")
            insert(sidebar)
        assert len(col.children) == 2
        assert col.children[0].content == "main"  # type: ignore[attr-defined]
        assert col.children[1] is sidebar

    def test_returns_component(self):
        t = Text(content="hello")
        with Column():
            result = insert(t)
        assert result is t

    def test_raises_outside_context(self):
        t = Text(content="orphan")
        with pytest.raises(RuntimeError, match="inside a container"):
            insert(t)

    def test_raises_on_double_insert(self):
        t = Text(content="hello")
        with Column():
            insert(t)
            with pytest.raises(RuntimeError, match="already a child"):
                insert(t)

    def test_rx_before_insert(self):
        """The motivating use case: reference .rx before placing the component."""
        volume = Slider(value=75)
        with Column() as col:
            Text(content=f"{volume.rx.number()}%")
            insert(volume)
        assert len(col.children) == 2
        text = col.children[0]
        assert "{{ " in text.content  # type: ignore[attr-defined]
        assert col.children[1] is volume
