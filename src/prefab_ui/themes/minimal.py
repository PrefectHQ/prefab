"""Minimal theme — strips all renderer defaults for full manual control."""

from __future__ import annotations

from prefab_ui.themes.base import Theme


class Minimal(Theme):
    """Strips the renderer's default padding, gaps, and gradients.

    Use this when you want a blank canvas and full control over every
    spacing and styling decision. All layout must be specified explicitly
    via component kwargs (`gap`, `css_class`, etc.).
    """

    light_css: str = "--card-padding-y: 0; --layout-gap: 0;"
    css: str = ".pf-app-root { padding: 0; }"
    gradient: bool = False
