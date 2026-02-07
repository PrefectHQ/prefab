"""Scope Tailwind v4 output under .prefab-preview using CSS nesting.

Run via: uv run docs/_preview-build/scope_css.py

Reads the raw Tailwind output from /tmp/prefab-preview-raw.css (kept outside
docs/ so Mintlify's dev server never auto-includes it), wraps all rules inside
`.prefab-preview { ... }` so utilities only apply inside preview containers,
then prepends the design tokens and container styling.
"""

from __future__ import annotations

from pathlib import Path

# Read canonical design tokens from theme.css
_theme_css_path = Path(__file__).resolve().parents[2] / "renderer" / "src" / "theme.css"
_THEME_CSS = _theme_css_path.read_text()

# Container styling applied to the .prefab-preview wrapper itself, plus
# resets and Tailwind v4 property initializations that must be explicit
# when nesting utilities inside .prefab-preview { ... }.
_INFRASTRUCTURE_CSS = """\
/* ── Container styling ────────────────────────────────────────── */
.prefab-preview {
  font-family: system-ui, -apple-system, sans-serif;
  color: var(--foreground);
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  background: var(--background);
}

.dark .prefab-preview {
  border-color: oklch(1 0 0 / 10%);
}

/* ── shadcn base: border-color from token ────────────────────── */
.prefab-preview *,
.prefab-preview *::before,
.prefab-preview *::after {
  border-color: var(--border);
}

/* ── Tailwind v4 property initializations ────────────────────── */
/* Tailwind v4 defines these in @layer properties { @supports { * { ... } } }
   which is invalid when nested inside .prefab-preview { ... } via CSS nesting.
   We must initialize them explicitly so shadow/ring composition works. */
.prefab-preview *,
.prefab-preview *::before,
.prefab-preview *::after,
.prefab-preview {
  --tw-border-style: solid;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-color: initial;
  --tw-shadow-alpha: 100%;
  --tw-inset-shadow: 0 0 #0000;
  --tw-inset-shadow-color: initial;
  --tw-inset-shadow-alpha: 100%;
  --tw-ring-color: initial;
  --tw-ring-shadow: 0 0 #0000;
  --tw-inset-ring-color: initial;
  --tw-inset-ring-shadow: 0 0 #0000;
  --tw-ring-inset: initial;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-outline-style: solid;
}
"""

# Read from /tmp — NEVER from inside docs/ where Mintlify would auto-include it
raw_css_path = Path("/tmp/prefab-preview-raw.css")
raw_css = raw_css_path.read_text()

# Wrap the entire Tailwind output in .prefab-preview { ... } using CSS nesting.
# This scopes every utility to only match inside preview containers.
scoped_css = f".prefab-preview {{\n{raw_css}\n}}"

final = f"{_THEME_CSS}\n{_INFRASTRUCTURE_CSS}\n/* ── Scoped Tailwind v4 utilities ─────────────────────────── */\n{scoped_css}\n"

build_dir = Path(__file__).parent
out = build_dir.parent / "css" / "preview.css"
out.write_text(final)
print(f"Wrote {len(final)} bytes to {out}")
