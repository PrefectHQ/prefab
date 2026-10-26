# Theming Architecture

## Overview

Themes are Python objects that generate CSS. `Theme.to_css()` compiles declarations to standard CSS with `:root` and `.dark` selectors. `PrefabApp.to_json()` sends compiled inline CSS in the top-level `css` list, external stylesheet URLs in `stylesheets`, and forced color mode in `mode`.

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

## Preview theme isolation

Documentation embeds and the playground share a shadow surface. Preview content
and body-level overlay portals each have their own shadow root. Both roots receive
base component CSS, the active theme CSS entries, stylesheet links, and the same
light/dark host marker. Ordinary component selectors stay unchanged inside those
roots, so preview themes cannot style the editor or toolbar popovers.

The playground renders its existing `RenderTree` through a React portal into a
stable shadow mount. Theme, stylesheet, and mode changes update owned assets in
place; they do not recreate state, rerun mount actions, or replace app tools.
Documentation retains the public `mountPreview` / `setDark` / `unmount` API and its
centered layout. The playground retains its full-width, padded, scrolling pane.

The picker CSS takes precedence over code CSS: choosing Code clears picker CSS
and restores the code's CSS entries. Stylesheet links remain app assets. Each
inline CSS entry has a separate style element, preserving leading `@import`
rules. Assets are removed from both roots when replaced or unmounted; no preview
asset is injected into the document head.

The body portal host stays fixed, transparent, and outside preview scrolling
ancestors. Portal descendants receive pointer events, while the host itself does
not intercept page clicks. Sonner markup and CSS live inside the same isolation
boundary; the existing shared toast store behavior is unchanged.

### Font resources

The current bridge has an unresolved integrated-browser rendering failure and
must remain unmerged. Both preview and portal text still measure as fallback
fonts (149.3125px) even when the registered face reports `loaded`; the matching
loaded-font control measures 144.58594px. Isolated resource-transfer probes pass,
but `FontFace.status` alone is insufficient evidence that a shadow preview uses
the font. This is the remaining compatibility gate for issue #307.

Browser font registration inside shadow styles is inconsistent. `shadow-fonts.ts`
lets the browser parse inline CSS and external stylesheets in a blank, same-origin
helper iframe with scripts disabled. It retains the native `FontFace` resources,
removes the helper's style/link owners, then registers those disconnected faces
with the parent document. Theme selectors remain inside the helper and preview
roots; they never enter the parent document's stylesheet collection.

The now-empty helper iframe stays alive for the native font URL loader, so unused
weights and Unicode ranges load only when used. Identical assets share a
reference-counted lease. The final release removes owned faces and the helper;
pending stylesheet loads are cancelled on disposal. Existing native font/CSP
policies apply, with no extra allowlist. Font resources live in the document's
`FontFaceSet`, while the rules choosing fonts remain inside each preview.

### Runtime utilities

The document Tailwind browser scanner still styles the toolbar/editor. It cannot
observe shadow roots, so the playground separately collects class candidates
from its two owned roots and uses Tailwind's public `compile` / `build` API.
Scoped mutation observers batch class/subtree changes. Generated utilities are
injected into both roots, and observers/styles are disposed with that surface.
The compiler is imported lazily when a playground surface requests runtime utilities;
documentation embeds use build-time CSS. This preserves arbitrary classes and dynamically added portal classes without
moving theme selectors into document scope. Shadow property initialization
matches the build-time handling of Tailwind's internal `@property` defaults.

### PrefabApp detection

Pydantic v2's Rust validator caches `model_post_init` at class creation, so patching it has no effect. The playground patches `PrefabApp.__init__` instead to track instances. `render_previews.py` uses the same approach for doc previews.

## File map

```
renderer/src/
├── shadow-surface.ts       Stable preview/portal roots and owned style assets
├── shadow-preview.tsx      React portal adapter preserving live app state
├── shadow-fonts.ts         Native font-resource leases without global theme CSS
├── shadow-tailwind.ts      Public Tailwind compiler for shadow candidates
├── shadow-utilities.ts     Scoped candidate observers and utility injection
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
