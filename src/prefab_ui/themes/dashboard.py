"""Dashboard theme — Inter font, tabular numerals, thicker progress bars."""

from __future__ import annotations

from typing import Any

from prefab_ui.themes.basic import _BASIC_DARK_CSS, _BASIC_LIGHT_CSS, Basic, Theme

_DASHBOARD_CSS = """\
/* Table — tabular numerals, slightly taller rows */
.cn-table-cell {
  font-variant-numeric: tabular-nums;
  padding: 0.65rem 0.5rem;
}

/* Progress / Slider — slightly thicker default track */
.cn-progress,
.cn-progress-track {
  height: 0.5rem;
}
.cn-progress-vertical {
  width: 0.5rem;
}
"""


class Dashboard(Basic):
    """Inter font, tabular numerals, and thicker progress bars.

    Adds data-oriented polish on top of Basic. Layout (gaps, card padding)
    is handled by the base renderer.
    """

    font: str | None = "Inter"
    css: str = _DASHBOARD_CSS

    def to_json(self) -> dict[str, Any]:
        """Emit Dashboard CSS plus Basic accent handling."""
        if self.accent is None:
            return Theme(
                css=self.css,
                mode=self.mode,
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
