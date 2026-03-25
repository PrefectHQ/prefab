"""Presentation (always-dark data dashboard) theme."""

from __future__ import annotations

from prefab_ui.themes.base import Theme

_PRESENTATION_VARS = (
    # Blue-tinted dark chrome (Tailwind Slate palette)
    "--card-padding-y: 2.5rem; --layout-gap: 1.5rem;"
    " --background: #0f1117;"
    " --foreground: #e2e8f0;"
    " --card: #1a1d2e;"
    " --card-foreground: #f1f5f9;"
    " --popover: #1a1d2e;"
    " --popover-foreground: #f1f5f9;"
    " --secondary: #252840;"
    " --secondary-foreground: #e2e8f0;"
    " --muted: #252840;"
    " --muted-foreground: #94a3b8;"
    " --accent: #2a2d3e;"
    " --accent-foreground: #e2e8f0;"
    " --destructive: #f472b6;"
    " --success: #34d399;"
    " --warning: #f59e0b;"
    " --info: #818cf8;"
    " --border: #1e2235;"
    " --input: #2a2d3e;"
    # Accent-driven primary (buttons, inputs, switches, focus rings)
    " --primary: oklch(0.7 0.18 var(--accent-hue, 275));"
    " --primary-foreground: oklch(0.205 0 0);"
    " --ring: oklch(0.7 0.18 var(--accent-hue, 275));"
    # Chart palette: accent + fixed emerald, amber, pink, sky
    " --chart-1: oklch(0.72 0.22 var(--accent-hue, 275));"
    " --chart-2: #34d399;"
    " --chart-3: #f59e0b;"
    " --chart-4: #f472b6;"
    " --chart-5: #38bdf8;"
)

_PRESENTATION_CSS = """\
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* App root — centered with max-width for slide-like presentation */
.pf-app-root {
  padding: 2rem;
  max-width: 64rem;
  margin: 0 auto;
}

/* Font */
.pf-card, .pf-table {
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
}

/* Card — generous horizontal padding for slide-like presentation */
.pf-card-header,
.pf-card-content {
  padding-left: 2rem;
  padding-right: 2rem;
}

/* Progress/Slider — dark navy tracks */
.pf-progress,
.pf-progress-track {
  background: #252840;
}
.pf-slider-track {
  background: #252840;
}
.pf-progress-target {
  background: #f1f5f9;
  opacity: 0.5;
}

/* Badge — tinted backgrounds, consistent border-radius */
.pf-badge {
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.2em 0.6em;
}
.pf-badge-variant-default {
  color: oklch(0.78 0.15 var(--accent-hue, 275));
  background: oklch(0.72 0.22 var(--accent-hue, 275) / 0.12);
}
.pf-badge-variant-warning {
  color: #fcd34d;
  background: rgba(245, 158, 11, 0.12);
}
.pf-badge-variant-destructive {
  color: #f9a8d4;
  background: rgba(244, 114, 182, 0.12);
}

/* Table cells — taller rows, tabular numerals, dimmer number color */
.pf-table-cell {
  padding: 0.85rem 0.75rem;
  font-size: 0.9rem;
  font-variant-numeric: tabular-nums;
  color: #cbd5e1;
}

/* Table rows — subtle borders, accent hover */
.pf-table-row {
  border-color: #1e2235;
}
.pf-table-row:hover {
  background: oklch(0.72 0.22 var(--accent-hue, 275) / 0.06);
}
"""


class Presentation(Theme):
    """Always-dark data-dense theme with gradient fills and Inter font.

    Uses a blue-tinted slate chrome optimized for data-heavy UIs.
    `accent` controls primary buttons, chart-1, progress/slider default
    fills, badge tints, and row hover.  Charts 2-5 (emerald, amber, pink,
    sky) are fixed for maximum contrast.

    With `accent=None` (default), accent-driven elements fall back to
    indigo (hue 275) via CSS fallbacks.
    """

    accent: float | str | None = None
    light_css: str = _PRESENTATION_VARS
    dark_css: str | None = _PRESENTATION_VARS
    css: str = _PRESENTATION_CSS
