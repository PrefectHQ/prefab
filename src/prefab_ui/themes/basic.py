"""Basic single-hue theme."""

from __future__ import annotations

from typing import Any

from prefab_ui.themes.base import Theme

_BASIC_LIGHT_CSS = (
    "--primary: oklch(0.6 0.24 var(--accent-hue));"
    " --primary-foreground: oklch(0.985 0 0);"
    " --ring: oklch(0.6 0.24 var(--accent-hue));"
    " --chart-1: oklch(0.65 0.25 var(--accent-hue));"
    " --chart-2: oklch(0.65 0.25 calc(var(--accent-hue) + 72));"
    " --chart-3: oklch(0.65 0.25 calc(var(--accent-hue) + 144));"
    " --chart-4: oklch(0.65 0.25 calc(var(--accent-hue) + 216));"
    " --chart-5: oklch(0.65 0.25 calc(var(--accent-hue) + 288));"
)

_BASIC_DARK_CSS = (
    "--primary: oklch(0.7 0.18 var(--accent-hue));"
    " --primary-foreground: oklch(0.205 0 0);"
    " --ring: oklch(0.7 0.18 var(--accent-hue));"
    " --chart-1: oklch(0.72 0.22 var(--accent-hue));"
    " --chart-2: oklch(0.72 0.22 calc(var(--accent-hue) + 72));"
    " --chart-3: oklch(0.72 0.22 calc(var(--accent-hue) + 144));"
    " --chart-4: oklch(0.72 0.22 calc(var(--accent-hue) + 216));"
    " --chart-5: oklch(0.72 0.22 calc(var(--accent-hue) + 288));"
)


class Basic(Theme):
    """Color-scheme-aware theme driven by a single accent hue.

    Generates `primary`, `ring`, and five evenly-spaced chart colors
    using `var(--accent-hue)` so changing `accent` is all that is needed.
    Both light and dark modes are styled automatically.

    With `accent=None` (default), no color overrides are emitted and the
    renderer's neutral defaults are used.

    `accent` is an OKLCH hue (0-360), a CSS color string, or a Tailwind
    color name.  Use `Accent` constants for named hues:
    `Basic(accent=Accent.GREEN)`.
    """

    accent: float | str | None = None

    def to_json(self) -> dict[str, Any]:
        """Emit accent-driven CSS only when accent is set."""
        if self.accent is None:
            return Theme(
                mode=self.mode,
                css=self.css,
                font=self.font,
                font_mono=self.font_mono,
                gradient=self.gradient,
            ).to_json()
        return Theme(
            light_css=_BASIC_LIGHT_CSS,
            dark_css=_BASIC_DARK_CSS,
            accent=self.accent,
            mode=self.mode,
            css=self.css,
            font=self.font,
            font_mono=self.font_mono,
            gradient=self.gradient,
        ).to_json()
