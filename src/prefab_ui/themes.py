"""Theme configuration for Prefab applications.

Themes customize the visual appearance by overriding shadcn CSS color
variables.  Use a built-in theme or create a custom :class:`Theme`::

    from prefab_ui import PrefabApp, Theme
    from prefab_ui.themes import blue

    # Built-in theme
    app = PrefabApp(view=my_view, theme=blue)

    # Custom theme with separate light/dark palettes
    app = PrefabApp(
        view=my_view,
        theme=Theme(
            light=dict(primary="oklch(0.72 0.19 149)", background="oklch(0.97 0.01 244)"),
            dark=dict(primary="oklch(0.77 0.15 163)", background="oklch(0.21 0.04 265)"),
        ),
    )

If ``dark`` is omitted, the ``light`` values are used for both modes.
"""

from __future__ import annotations

from pydantic import BaseModel, Field


class Theme(BaseModel):
    """CSS variable overrides for light and dark modes.

    Keys are shadcn CSS variable names without the ``--`` prefix
    (``primary``, ``primary-foreground``, ``chart-1``, etc.) and values
    are any valid CSS color string.

    If only ``light`` is provided, those values apply to both modes.
    """

    light: dict[str, str] = Field(default_factory=dict)
    dark: dict[str, str] | None = None

    def to_json(self) -> dict[str, dict[str, str]]:
        """Serialize to the protocol wire format.

        Returns ``{"light": {...}, "dark": {...}}`` with dark falling
        back to light when not explicitly set.
        """
        return {
            "light": self.light,
            "dark": self.dark if self.dark is not None else self.light,
        }


# ── Chart color helper ───────────────────────────────────────────────


def _chart_colors(
    base_hue: float,
    lightness: float,
    chroma: float,
) -> dict[str, str]:
    offsets = [0, 72, 144, 216, 288]
    return {
        f"chart-{i + 1}": f"oklch({lightness} {chroma} {(base_hue + off) % 360})"
        for i, off in enumerate(offsets)
    }


# ── Built-in basic themes ───────────────────────────────────────────


def _basic_theme(hue: float) -> Theme:
    return Theme(
        light={
            "primary": f"oklch(0.6 0.24 {hue})",
            "primary-foreground": "oklch(0.985 0 0)",
            "ring": f"oklch(0.6 0.24 {hue})",
            **_chart_colors(hue, 0.6, 0.2),
        },
        dark={
            "primary": f"oklch(0.7 0.18 {hue})",
            "primary-foreground": "oklch(0.205 0 0)",
            "ring": f"oklch(0.7 0.18 {hue})",
            **_chart_colors(hue, 0.7, 0.15),
        },
    )


blue = _basic_theme(260)
green = _basic_theme(155)
red = _basic_theme(25)
orange = _basic_theme(55)
violet = _basic_theme(295)
rose = _basic_theme(350)
