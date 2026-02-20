"""Tests for layout components."""

from __future__ import annotations

from prefab_ui.components import Column, Container, Row, Text


def test_row_empty():
    r = Row()
    j = r.to_json()
    assert j["type"] == "Row"
    assert "children" not in j


def test_column_empty():
    c = Column()
    j = c.to_json()
    assert j["type"] == "Column"
    assert "children" not in j


def test_container_empty():
    c = Container()
    j = c.to_json()
    assert j["type"] == "Container"
    assert "children" not in j


def test_container_with_children():
    with Container() as c:
        Text(content="hello")
    j = c.to_json()
    assert j["type"] == "Container"
    assert len(j["children"]) == 1


def test_container_css_class():
    c = Container(css_class="max-w-2xl")
    j = c.to_json()
    assert j["cssClass"] == "max-w-2xl"
