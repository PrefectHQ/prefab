"""Tests for docs ComponentPreview generation."""

from __future__ import annotations

from tools.render_previews import _execute_and_serialize


def test_preview_envelope_preserves_prefab_app_style_fields() -> None:
    envelope = _execute_and_serialize(
        """
from prefab_ui.app import PrefabApp
from prefab_ui.components import Text
from prefab_ui.themes import Theme

PrefabApp(
    view=Text("hi"),
    theme=Theme(light_css="--primary: red;", mode="dark"),
    css=[".custom { color: red; }"],
    stylesheets=["https://example.com/app.css"],
)
"""
    )

    assert "view" in envelope
    assert "--primary: red;" in "\n".join(envelope["css"])
    assert ".custom { color: red; }" in envelope["css"]
    assert envelope["stylesheets"] == ["https://example.com/app.css"]
    assert envelope["mode"] == "dark"
