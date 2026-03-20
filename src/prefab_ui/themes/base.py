"""Base theme class and Tailwind color palette."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, field_validator

# fmt: off
_TAILWIND_COLORS: dict[str, str] = {
    "red-50": "#fef2f2", "red-100": "#fee2e2", "red-200": "#fecaca",
    "red-300": "#fca5a5", "red-400": "#f87171", "red-500": "#ef4444",
    "red-600": "#dc2626", "red-700": "#b91c1c", "red-800": "#991b1b",
    "red-900": "#7f1d1d", "red-950": "#450a0a",
    "orange-50": "#fff7ed", "orange-100": "#ffedd5", "orange-200": "#fed7aa",
    "orange-300": "#fdba74", "orange-400": "#fb923c", "orange-500": "#f97316",
    "orange-600": "#ea580c", "orange-700": "#c2410c", "orange-800": "#9a3412",
    "orange-900": "#7c2d12", "orange-950": "#431407",
    "amber-50": "#fffbeb", "amber-100": "#fef3c7", "amber-200": "#fde68a",
    "amber-300": "#fcd34d", "amber-400": "#fbbf24", "amber-500": "#f59e0b",
    "amber-600": "#d97706", "amber-700": "#b45309", "amber-800": "#92400e",
    "amber-900": "#78350f", "amber-950": "#451a03",
    "yellow-50": "#fefce8", "yellow-100": "#fef9c3", "yellow-200": "#fef08a",
    "yellow-300": "#fde047", "yellow-400": "#facc15", "yellow-500": "#eab308",
    "yellow-600": "#ca8a04", "yellow-700": "#a16207", "yellow-800": "#854d0e",
    "yellow-900": "#713f12", "yellow-950": "#422006",
    "lime-50": "#f7fee7", "lime-100": "#ecfccb", "lime-200": "#d9f99d",
    "lime-300": "#bef264", "lime-400": "#a3e635", "lime-500": "#84cc16",
    "lime-600": "#65a30d", "lime-700": "#4d7c0f", "lime-800": "#3f6212",
    "lime-900": "#365314", "lime-950": "#1a2e05",
    "green-50": "#f0fdf4", "green-100": "#dcfce7", "green-200": "#bbf7d0",
    "green-300": "#86efac", "green-400": "#4ade80", "green-500": "#22c55e",
    "green-600": "#16a34a", "green-700": "#15803d", "green-800": "#166534",
    "green-900": "#14532d", "green-950": "#052e16",
    "emerald-50": "#ecfdf5", "emerald-100": "#d1fae5", "emerald-200": "#a7f3d0",
    "emerald-300": "#6ee7b7", "emerald-400": "#34d399", "emerald-500": "#10b981",
    "emerald-600": "#059669", "emerald-700": "#047857", "emerald-800": "#065f46",
    "emerald-900": "#064e3b", "emerald-950": "#022c22",
    "teal-50": "#f0fdfa", "teal-100": "#ccfbf1", "teal-200": "#99f6e4",
    "teal-300": "#5eead4", "teal-400": "#2dd4bf", "teal-500": "#14b8a6",
    "teal-600": "#0d9488", "teal-700": "#0f766e", "teal-800": "#115e59",
    "teal-900": "#134e4a", "teal-950": "#042f2e",
    "cyan-50": "#ecfeff", "cyan-100": "#cffafe", "cyan-200": "#a5f3fc",
    "cyan-300": "#67e8f9", "cyan-400": "#22d3ee", "cyan-500": "#06b6d4",
    "cyan-600": "#0891b2", "cyan-700": "#0e7490", "cyan-800": "#155e75",
    "cyan-900": "#164e63", "cyan-950": "#083344",
    "sky-50": "#f0f9ff", "sky-100": "#e0f2fe", "sky-200": "#bae6fd",
    "sky-300": "#7dd3fc", "sky-400": "#38bdf8", "sky-500": "#0ea5e9",
    "sky-600": "#0284c7", "sky-700": "#0369a1", "sky-800": "#075985",
    "sky-900": "#0c4a6e", "sky-950": "#082f49",
    "blue-50": "#eff6ff", "blue-100": "#dbeafe", "blue-200": "#bfdbfe",
    "blue-300": "#93c5fd", "blue-400": "#60a5fa", "blue-500": "#3b82f6",
    "blue-600": "#2563eb", "blue-700": "#1d4ed8", "blue-800": "#1e40af",
    "blue-900": "#1e3a8a", "blue-950": "#172554",
    "indigo-50": "#eef2ff", "indigo-100": "#e0e7ff", "indigo-200": "#c7d2fe",
    "indigo-300": "#a5b4fc", "indigo-400": "#818cf8", "indigo-500": "#6366f1",
    "indigo-600": "#4f46e5", "indigo-700": "#4338ca", "indigo-800": "#3730a3",
    "indigo-900": "#312e81", "indigo-950": "#1e1b4b",
    "violet-50": "#f5f3ff", "violet-100": "#ede9fe", "violet-200": "#ddd6fe",
    "violet-300": "#c4b5fd", "violet-400": "#a78bfa", "violet-500": "#8b5cf6",
    "violet-600": "#7c3aed", "violet-700": "#6d28d9", "violet-800": "#5b21b6",
    "violet-900": "#4c1d95", "violet-950": "#2e1065",
    "purple-50": "#faf5ff", "purple-100": "#f3e8ff", "purple-200": "#e9d5ff",
    "purple-300": "#d8b4fe", "purple-400": "#c084fc", "purple-500": "#a855f7",
    "purple-600": "#9333ea", "purple-700": "#7e22ce", "purple-800": "#6b21a8",
    "purple-900": "#581c87", "purple-950": "#3b0764",
    "fuchsia-50": "#fdf4ff", "fuchsia-100": "#fae8ff", "fuchsia-200": "#f5d0fe",
    "fuchsia-300": "#f0abfc", "fuchsia-400": "#e879f9", "fuchsia-500": "#d946ef",
    "fuchsia-600": "#c026d3", "fuchsia-700": "#a21caf", "fuchsia-800": "#86198f",
    "fuchsia-900": "#701a75", "fuchsia-950": "#4a044e",
    "pink-50": "#fdf2f8", "pink-100": "#fce7f3", "pink-200": "#fbcfe8",
    "pink-300": "#f9a8d4", "pink-400": "#f472b6", "pink-500": "#ec4899",
    "pink-600": "#db2777", "pink-700": "#be185d", "pink-800": "#9d174d",
    "pink-900": "#831843", "pink-950": "#500724",
    "rose-50": "#fff1f2", "rose-100": "#ffe4e6", "rose-200": "#fecdd3",
    "rose-300": "#fda4af", "rose-400": "#fb7185", "rose-500": "#f43f5e",
    "rose-600": "#e11d48", "rose-700": "#be123c", "rose-800": "#9f1239",
    "rose-900": "#881337", "rose-950": "#4c0519",
}
# fmt: on


def _vars_to_css(d: dict[str, str]) -> str:
    """Convert `{"primary": "oklch(...)"}` to `--primary: oklch(...);`."""
    return " ".join(f"--{k}: {v};" for k, v in d.items())


_NO_GRADIENT_CSS = """
.pf-progress-variant-default,
.pf-progress-variant-success,
.pf-progress-variant-warning,
.pf-progress-variant-destructive,
.pf-progress-variant-info,
.pf-slider-variant-default,
.pf-slider-variant-success,
.pf-slider-variant-warning,
.pf-slider-variant-destructive,
.pf-slider-variant-info { background-image: none; }
.pf-ring-variant-default { stroke: var(--primary); }
.pf-ring-variant-success { stroke: var(--success); }
.pf-ring-variant-warning { stroke: var(--warning); }
.pf-ring-variant-destructive { stroke: var(--destructive); }
.pf-ring-variant-info { stroke: var(--info); }
"""


def _google_font_import(family: str) -> str:
    """Generate a Google Fonts `@import` for the given family name."""
    encoded = family.replace(" ", "+")
    return f"@import url('https://fonts.googleapis.com/css2?family={encoded}:wght@400;500;600;700&display=swap');\n"


class Theme(BaseModel):
    """CSS theme with light/dark variable declarations and freeform CSS.

    `light_css` and `dark_css` contain CSS declarations (no selectors) that
    the renderer wraps in `:root {}` and `.dark {}` respectively.
    `css` is injected as-is for mode-agnostic rules like component class overrides.

    `accent` controls the theme's primary color.  It accepts three forms:

    - **numeric** (`float` or `Accent` enum): an OKLCH hue 0-360,
      injected as `--accent-hue` so CSS templates can reference it with
      `var(--accent-hue)`.
    - **string**: a literal CSS color (hex, oklch, etc.) or Tailwind color
      name (e.g. `"amber-500"`) applied directly to `--primary` and `--ring`.
    - **None**: no accent injection; templates using `var(--accent-hue)`
      fall back to the renderer's base theme colors.

    `mode` forces a specific color scheme regardless of OS preference.

    `light_css` and `dark_css` also accept dicts for backwards compatibility.
    """

    light_css: str = ""
    dark_css: str | None = None
    css: str = ""
    mode: Literal["light", "dark"] | None = None
    accent: float | str | None = None
    font: str | None = None
    font_mono: str | None = None
    gradient: bool = True

    @field_validator("accent", mode="before")
    @classmethod
    def _coerce_accent(cls, v: Any) -> float | str | None:
        """Resolve Tailwind color names like `'amber-500'` or `'amber'`."""
        if isinstance(v, str):
            key = v if "-" in v else f"{v}-500"
            if key in _TAILWIND_COLORS:
                return _TAILWIND_COLORS[key]
        return v

    @field_validator("light_css", "dark_css", mode="before")
    @classmethod
    def _coerce_dict(cls, v: dict[str, str] | str | None) -> str | None:
        if isinstance(v, dict):
            return _vars_to_css(v)
        return v

    def to_json(self) -> dict[str, str]:
        """Serialize to the protocol wire format.

        Returns `{"light": "...", "dark": "...", "css": "..."}` with
        dark falling back to light when not explicitly set.
        """
        light = self.light_css
        dark = self.dark_css if self.dark_css is not None else self.light_css

        if isinstance(self.accent, str):
            # String accent: override primary and ring directly.
            # Appended so they win over any OKLCH template declarations.
            color_vars = f" --primary: {self.accent}; --ring: {self.accent};"
            light = (light + color_vars).strip()
            dark = (dark + color_vars).strip()
        elif self.accent is not None:
            # Numeric accent: inject --accent-hue for OKLCH templates.
            hue_var = f"--accent-hue: {self.accent};"
            light = f"{hue_var} {light}".strip() if light else hue_var
            dark = f"{hue_var} {dark}".strip() if dark else hue_var

        css = self.css
        font_vars = ""
        if self.font is not None:
            font_vars += (
                f" --font-sans: '{self.font}', ui-sans-serif, system-ui, sans-serif;"
            )
            css = _google_font_import(self.font) + css
        if self.font_mono is not None:
            font_vars += f" --font-mono: '{self.font_mono}', ui-monospace, monospace;"
            css = _google_font_import(self.font_mono) + css
        if font_vars:
            light = (light + font_vars).strip()
            dark = (dark + font_vars).strip()

        if not self.gradient:
            css += _NO_GRADIENT_CSS

        result: dict[str, str] = {"light": light, "dark": dark, "css": css}
        if self.mode is not None:
            result["mode"] = self.mode
        return result
