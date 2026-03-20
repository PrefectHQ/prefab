# Theming Architecture

## Overview

Themes are Python objects that generate CSS. The wire format is simple: `{"light": "css declarations", "dark": "css declarations", "css": "freeform css"}`. The renderer wraps `light` in `:root {}` and `dark` in `.dark {}`, then injects `css` as-is.

## Theme class hierarchy

```
Theme (base)
├── Basic (accent-driven colors, no layout opinions)
│   └── Dashboard (Inter font, tabular numerals, thicker progress)
├── Presentation (dark chrome, generous padding, styled badges/tables)
└── Minimal (strips all renderer defaults)
```

All themes accept: `accent`, `font`, `font_mono`, `mode`, `gradient`.

## CSS variable architecture

The renderer uses CSS custom properties with fallback defaults so themes can override them and components can override themes.

### Layout variables

Set in `style.css` with fallback defaults:
```css
.pf-card { padding: var(--card-padding, 1.5rem); }
.flex.flex-col:has(> .pf-card) { gap: var(--layout-gap, 1rem); }
```

Themes override: `Presentation` sets `--card-padding: 3rem; --layout-gap: 1.5rem;`. `Minimal` sets both to `0`.

User `css_class` on components (e.g. `Card(css_class="p-2")`) wins over the variable because Tailwind utilities have higher specificity than `var()` fallbacks.

### Font variable

Set in `index.css`:
```css
body { font-family: var(--font-sans, ui-sans-serif, system-ui, ...); }
```

Themes inject `--font-sans: 'Inter', ui-sans-serif, ...` via `light_css`/`dark_css`. Google Fonts `@import` is auto-generated and hoisted by `buildThemeCss` in `themes.ts`.

### Accent system

Three forms, handled in `Theme.to_json()`:
- **Numeric** (float): injects `--accent-hue: {value}` which OKLCH templates reference via `var(--accent-hue)`
- **String**: appends `--primary: {value}; --ring: {value};` directly, overriding OKLCH templates
- **None**: no injection, OKLCH templates use CSS fallbacks (e.g. `var(--accent-hue, 275)`)

Tailwind color names (`"amber"`, `"blue-600"`) are resolved to hex in `_coerce_accent` validator using `_TAILWIND_COLORS` dict.

## Gradient system

### CSS cascade

Gradient fills use CSS relative color syntax (`oklch(from var(--success) calc(l - 0.12) c h)`) in `gradients.css`. The cascade order:

1. **Base** (`gradients.css`): gradients ON via bare `.pf-progress-variant-*` selectors
2. **Theme** `gradient=False`: emits CSS with same selectors setting `background-image: none` (wins by source order since theme CSS is injected after base)
3. **Component** `gradient=True`: emits `pf-progress-gradient` class (`.pf-progress-gradient .pf-progress-variant-*` wins by higher specificity)
4. **Component** `gradient=False`: emits `pf-progress-flat` class (wins by source order at same specificity as gradient class)

### Why a separate gradients.css?

Tailwind v4's compiler strips `oklch(from ...)` declarations it doesn't understand. Keeping gradients in a separate file that bypasses Tailwind compilation ensures the relative color syntax reaches the browser. The `scope_css.py` build script appends `gradients.css` raw after the Tailwind output.

### Ring gradients

Ring uses SVG `<linearGradient>` `<defs>` in `ring.tsx` with `style={{ stopColor: "oklch(from var(--success) calc(l - 0.12) c h)" }}`. The CSS controls which stroke reference to use (`stroke: url(#ring-gradient-success)` vs `stroke: var(--success)` for flat).

## Playground theme scoping

### The --color-* rebinding problem

Tailwind v4's `@theme inline` declares `--color-background: var(--background)` at `:root`. When themes are scoped to `#pg-preview`, setting `--background: #0f1117` in `#pg-preview` doesn't affect `--color-background` inherited from `:root`. The `COLOR_REBIND` constant in `playground.tsx` redeclares all `--color-*` aliases inside `#pg-preview` so they re-resolve.

### Theme picker interaction

- `#pg-code-theme`: CSS from PrefabApp in code (suppressed when picker is active)
- `#pg-theme`: CSS from toolbar picker (always last in DOM via remove+re-append)
- "Code" in picker = empty picker CSS, code theme active
- Any picker selection = code theme suppressed, picker theme active

### PrefabApp detection

Pydantic v2's Rust validator caches `model_post_init` at class creation, so patching it has no effect. The playground patches `PrefabApp.__init__` instead to track instances. `render_previews.py` uses the same approach for doc previews.

## File map

```
renderer/src/
├── style.css              Component styles (Tailwind @apply)
├── style-indicators.css   Ring/Dot/Sparkline styles
├── gradients.css          Gradient fills (bypasses Tailwind compiler)
├── theme.css              Design tokens (:root and .dark)
├── index.css              Imports, @theme inline, layout defaults
├── themes.ts              buildThemeCss(), resolveTheme()
└── playground/
    ├── playground.tsx      Theme injection, COLOR_REBIND, scopeThemeCss()
    ├── pyodide.ts          Python harness, PrefabApp __init__ patching
    └── theme-picker.tsx    Preset themes, custom CSS textarea

src/prefab_ui/themes/
├── __init__.py             Exports: Basic, Dashboard, Minimal, Presentation, Theme
├── base.py                 Theme base class, _TAILWIND_COLORS, _NO_GRADIENT_CSS
├── basic.py                Accent-only theme
├── dashboard.py            Inter + tabular numerals
├── minimal.py              Strips all defaults
└── presentation.py         Dark chrome, generous padding, styled components

tools/
├── render_previews.py      Executes Python, detects PrefabApp, extracts theme
└── scope_css.py            Scopes Tailwind output + appends gradients.css raw
```
