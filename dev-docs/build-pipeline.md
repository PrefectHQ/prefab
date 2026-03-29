# Build Pipeline

Complete reference for what gets built, when, by whom, and how.

## Renderer Architecture

The renderer is a single React application (`renderer/src/main.tsx`) that handles all rendering contexts: MCP apps, generative UI, and standalone HTML. It includes:

- **Runtime Tailwind** (`@tailwindcss/browser`) — arbitrary classes like `h-[500px]` work without a safelist
- **Unified bridge** — one bridge handles standard `ontoolresult`, generative `ontoolinputpartial`/`ontoolinput`, and baked-in data (for `prefab serve` / standalone HTML)
- **Lazy Pyodide** — loads on first streaming partial, zero cost for non-generative tools
- **Lazy chunks** — recharts, highlight.js, calendar, icons, and other heavy deps are code-split and only download when used

Two builds are produced from this single entry point:

| Build | Config | Output | Purpose |
|-------|--------|--------|---------|
| **CDN** | `vite.config.renderer.ts` | `dist/renderer.js` + `.mjs` lazy chunks | Primary delivery — code-split ESM published to npm/jsDelivr |
| **Bundled** | `vite.config.bundled.ts` | `dist/bundled/app.html` (single file) | Airgapped fallback — all JS/CSS inlined, shipped in Python package |

**CDN is the default.** The Python API `get_renderer_html()` returns a lightweight HTML stub that loads the renderer from jsDelivr, pinned to the installed Python package version.

**The bundled renderer ships in the Python package** as `src/prefab_ui/renderer/app.html`. When `get_renderer_html(mode="bundled")` is called, it reads this file directly. A future enhancement may move the bundled renderer to a separate package to reduce the main package size.

### Separate artifacts

**Embed** (`embed.tsx` via `vite.config.renderer.ts`) — shadow DOM entry point for doc previews. Uses build-time CSS because `@tailwindcss/browser` can't target shadow roots. This is fundamentally different from the main renderer and stays as a separate entry point.

**Playground** (`playground.html` via `vite.config.playground.ts`) — self-contained Pyodide editor. Inlines all JS/CSS and a serialized Python bundle. Stays as-is.

## CDN Delivery

The renderer is published to npm as `@prefecthq/prefab-ui`. The Python package loads it from jsDelivr with the version pinned to match:

```
https://cdn.jsdelivr.net/npm/@prefecthq/prefab-ui@{version}/dist/renderer.js
```

The version comes from `prefab_ui.__version__` at runtime. This ensures the renderer always matches the installed Python library — no version drift between the wire protocol and the renderer.

For dev versions (`0.0.0-dev`), the Python API auto-falls back to the bundled `app.html` since no CDN version exists.

### Python API

```python
get_renderer_html(mode: Literal["cdn", "bundled"] | None = None) -> str
```

Resolution when `mode=None`:
1. `PREFAB_RENDERER_URL` env var → external stub with that URL (dev override)
2. `PREFAB_BUNDLED_RENDERER=1` env var → bundled `app.html`
3. Default → CDN stub pinned to `__version__`

The same `mode` kwarg is on `get_renderer_head()`, `get_renderer_csp()`, `get_generative_renderer_html()`, and `get_generative_renderer_csp()`.

### CDN bundle structure
```
dist/renderer.js              ~1KB   IIFE entry loader
dist/_renderer/embed.mjs         ~1KB  stable re-export shim (unhashed)
dist/_renderer/embed-HASH.mjs   ~500KB core (React, Radix, shadcn, engine)
dist/_renderer/charts-HASH.mjs  ~520KB lazy (recharts, on first chart)
dist/_renderer/content-HASH.mjs ~250KB lazy (highlight.js, react-markdown)
dist/_renderer/compound-calendar-HASH.mjs ~180KB lazy (date-fns)
dist/_renderer/icons-HASH.mjs   ~varies lazy (lucide barrel, on dynamic icon lookup)
```

### CDN routing
The entry loader (`renderer.js`) picks its base URL at runtime:
- `localhost` → `/` (local files from `docs/`)
- Everything else → `https://cdn.jsdelivr.net/npm/@prefecthq/prefab-ui@latest/dist/`

Both paths load `_renderer/embed.mjs` — a stable (unhashed) re-export shim that forwards to the real hashed chunk. The `@latest` tag is safe because the shim and its hashed chunk are always consistent within a single npm version.

### Why `.mjs` for chunks
Mintlify inlines ALL `.js` files from `docs/` as `<script>` tags. Using `.mjs` prevents the 500KB+ chunks from being inlined. On deployed Mintlify, `.mjs` files can't be served as static assets, so production loads them from the jsdelivr CDN.

## Build Targets

| Config | Entry point | Output | Purpose |
|--------|------------|--------|---------|
| `vite.config.ts` | `renderer.html` → `main.tsx` | `dist/renderer.html` + assets | Local dev (`npm run dev`), `prefab serve` with `PREFAB_RENDERER_URL` |
| `vite.config.renderer.ts` | `src/embed.tsx` | `dist/renderer.js` + `.mjs` chunks | CDN library (npm), doc preview shadow DOM |
| `vite.config.bundled.ts` | `bundled.html` → `main.tsx` | `dist/bundled/app.html` (single file) | Airgapped fallback shipped in Python package |
| `vite.config.playground.ts` | `playground.html` | `dist/playground.html` (single file) | Published interactive playground |

Note: `vite.config.renderer.ts` currently builds the embed entry point. Once the CDN renderer build is added (from unified `main.tsx`), this config will produce both the embed and the primary CDN renderer, or a new config will handle the CDN build separately.

## When Things Get Built

### On every commit (CI)

**`regenerate-docs.yml`** runs `prefab dev build-docs` and checks for stale generated files:
- `docs/**` (preview JSON, protocol pages, CSS)
- `renderer/src/playground/bundle.json` and `examples.json`
- `tools/preview-classes.html`

If any are stale, CI fails with instructions to rebuild.

**Tests workflow** runs pytest across Python 3.10/3.13, ubuntu/windows, plus lowest-deps.

**Static analysis** runs ruff, ty, tsc.

### On GitHub release (`publish-renderer.yml`)

1. `npm ci` — installs renderer dependencies
2. `npm version` — sets version from git tag (strips PEP 440 suffixes)
3. `npm run build:publish` — builds renderer library + playground
4. `npm publish` — publishes `@prefecthq/prefab-ui` to npm
5. Purges jsDelivr CDN cache for `@latest`

This publishes the **CDN renderer** and **playground**. The bundled `app.html` must be rebuilt manually before release.

### Manually before release

**Bundled renderer** (`app.html`) ships inside the Python package. It must be rebuilt before any release that includes renderer changes:

```bash
prefab dev build-renderers
```

### During development (`prefab dev build-docs`)

Runs a multi-step pipeline:

1. Install renderer node deps (if needed)
2. Build renderer library — `npm run build:renderer` (if source changed)
3. Render component previews — `tools/render_previews.py`
4. Extract preview classes — `tools/extract_preview_classes.py`
5. Generate Tailwind content — `tools/generate_content.py`
6. Build Tailwind CSS — `@tailwindcss/cli`
7. Scope CSS — `tools/scope_css.py`
8. Bundle playground source — `tools/generate_playground_bundle.py`
9. Extract playground examples — `tools/extract_examples.py`
10. Build playground (if source changed)
11. Generate protocol reference pages

Caching: renderer and playground builds are skipped if source hashes haven't changed (`.renderer-hash`, `.playground-hash`).

## CLI Commands

| Command | What it builds |
|---------|---------------|
| `prefab dev build-docs` | Everything for docs: renderer library, previews, CSS, playground, protocol ref |
| `prefab dev build-renderers` | Bundled `app.html` for the Python package |
| `prefab dev build-playground` | Just the playground (skips previews, CSS, protocol) |
| `prefab dev docs` | Runs `build-docs` then starts Mintlify with file watcher |

## CSS Pipeline

Three separate CSS paths:

### Main renderer (CDN + bundled)
- **Runtime**: `@tailwindcss/browser` generates CSS for any Tailwind class at runtime
- **Build-time**: `@tailwindcss/vite` processes `index.css` for renderer-internal styles
- Users can use any Tailwind class in `css_class` — no safelist needed

### Doc previews (embed, shadow DOM)
- Build-time only: `@tailwindcss/vite` processes `index.css`, inlined into shadow DOM via `embed.tsx`
- `@source "../../tools/preview-classes.html"` pulls in classes extracted from rendered previews
- `@tailwindcss/browser` cannot observe shadow DOM, so build-time CSS is the only option here

### Doc site pages
- Separate Tailwind build via `tools/input.css` → `@tailwindcss/cli`
- Scans `tools/content.html` (generated component variants) and `docs/**/*.mdx`
- Output scoped to `.prefab-preview { ... }` by `tools/scope_css.py`

## Playground

The playground is a self-contained HTML file (all JS/CSS inlined) that runs Python in the browser via Pyodide.

### How it loads Python
**Bundled mode (`__LOCAL_BUNDLE__ = true`):** All prefab_ui Python source files are serialized into `renderer/src/playground/bundle.json` and inlined into the playground HTML at build time. At runtime, the files are written to Pyodide's virtual filesystem. No network requests needed.

**Micropip mode (`__LOCAL_BUNDLE__ = false`):** Falls back to `micropip.install("prefab-ui")` from PyPI. This path is broken because pydantic-core has no WASM wheel. Exists only as a dev fallback.

`VITE_LOCAL_PLAYGROUND=1` controls which path Vite compiles in. Both `build-docs` and `build:publish` set this flag.

## Generated Artifacts

| File | Generated by | Committed | Notes |
|------|-------------|-----------|-------|
| `tools/preview-classes.html` | `extract_preview_classes.py` | Yes | Tailwind source for doc preview CSS |
| `tools/content.html` | `generate_content.py` | No (gitignored) | All component variants for Tailwind scanning |
| `docs/css/preview.css` | `scope_css.py` | No (gitignored) | Scoped Tailwind CSS for doc pages |
| `docs/renderer.js` | `build:renderer` | Yes | CDN entry loader |
| `docs/_renderer/*.mjs` | `build:renderer` | No (gitignored) | Lazy-loaded chunks for local dev |
| `docs/playground.html` | `build:playground` | No (gitignored) | Built playground for local dev |
| `renderer/src/playground/bundle.json` | `generate_playground_bundle.py` | Yes | Serialized Python source for Pyodide |
| `renderer/src/playground/examples.json` | `extract_examples.py` | Yes | Playground example catalog |
| `src/prefab_ui/renderer/app.html` | `build-renderers` | Yes | Bundled renderer (airgapped fallback) |

## Local Development

```bash
# First time / after a fresh clone
npm ci --prefix renderer

# Build renderer + docs assets
prefab dev build-docs

# Serve docs locally with hot rebuild
prefab dev docs

# Rebuild bundled renderer for Python package
prefab dev build-renderers
```

Local docs serve chunks from `docs/_renderer/` directly (the `localhost` path in the CDN entry loader). After a fresh clone, run `prefab dev build-docs` to copy chunks from `renderer/dist/`.

## Release Checklist

Before cutting a release with renderer changes:

1. `prefab dev build-renderers` — rebuild bundled HTML (airgapped fallback)
2. `prefab dev build-docs` — regenerate all doc assets
3. Commit the rebuilt files
4. `prek` — verify all hooks pass
5. Create GitHub release — triggers npm publish + docs update

## Common Pitfalls

- **`sh: vite: command not found`** — run `npm ci --prefix renderer` first
- **`package.json` version is always `0.0.0`** — real version comes from git tag at publish time
- **`docs/_renderer/` is gitignored** — run `prefab dev build-docs` after a fresh clone
- **Mintlify caches renderer** at `~/.mintlify/mint/apps/client/public/renderer.js` — restart `mintlify dev` after rebuilding
- **Production docs URL** is `prefab.prefect.io/docs/` (not root)
- **Deploy previews use CDN** — renderer source changes won't show until published
