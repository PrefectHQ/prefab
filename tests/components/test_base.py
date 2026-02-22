"""Tests for context manager nesting and detached."""

from __future__ import annotations

from prefab_ui.components import Column, Heading, Row, Text, detached


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


class TestDetached:
    def test_prevents_auto_attach(self):
        with Column() as col:
            Text(content="attached")
            with detached():
                orphan = Text(content="detached")
        assert len(col.children) == 1
        assert col.children[0].content == "attached"  # type: ignore[attr-defined]
        assert orphan.content == "detached"

    def test_allows_explicit_context_managers(self):
        with Column() as outer:
            Text(content="outer-child")
            with detached():
                sidebar = Column()
                with sidebar:
                    Text(content="sidebar-child")
        assert len(outer.children) == 1
        assert len(sidebar.children) == 1
        assert sidebar.children[0].content == "sidebar-child"  # type: ignore[attr-defined]

    def test_restores_stack(self):
        with Column() as col:
            Text(content="before")
            with detached():
                Text(content="ignored")
            Text(content="after")
        assert len(col.children) == 2
        assert col.children[0].content == "before"  # type: ignore[attr-defined]
        assert col.children[1].content == "after"  # type: ignore[attr-defined]

    def test_nested(self):
        with Column() as col:
            with detached():
                with detached():
                    Text(content="double-detached")
                Text(content="single-detached")
            Text(content="attached")
        assert len(col.children) == 1
        assert col.children[0].content == "attached"  # type: ignore[attr-defined]

    def test_at_top_level(self):
        with detached():
            t = Text(content="orphan")
        assert t.content == "orphan"

    def test_restores_on_exception(self):
        with Column() as col:
            try:
                with detached():
                    raise ValueError("boom")
            except ValueError:
                pass
            Text(content="after-error")
        assert len(col.children) == 1
        assert col.children[0].content == "after-error"  # type: ignore[attr-defined]
