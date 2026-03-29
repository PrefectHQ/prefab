# Build Pipeline

Complete reference for what gets built, when, by whom, and how.

## Renderer Architecture

The renderer is a single React application (`renderer/src/main.tsx`) that handles all rendering contexts: MCP apps, generative UI, and standalone HTML. It includes:

- **Runtime Tailwind** (`@tailwindcss/browser`) — arbitrary classes like `h-[500px]` work without a safelist
- **Unified bridge** — one bridge handles standard `ontoolresult`, generative `ontoolinputpartial`/`ontoolinput`, and baked-in data (for `prefab serve` / standalone HTML)
- **Lazy Pyodide** — loads on first streaming partial, zero cost for non-generative tools
- **Lazy chunks** — recharts, highlight.js, calendar, icons, and other heavy deps are code-split and only download when used

## npm Packages

Three npm packages are published from the same git tag, all at the same version:

| Package | Contents | Size | Purpose |
|---------|----------|------|---------|
| `@prefecthq/prefab-ui` | `dist/app/` — CDN renderer (code-split) | ~1MB compressed | Primary renderer loaded by MCP hosts via `get_renderer_html()` |
| `@prefecthq/prefab-ui-docs` | `dist/_renderer/` + `dist/renderer.js` — embed chunks + entry loader | ~1MB compressed | Shadow DOM preview renderer for Mintlify docs |
| `@prefecthq/prefab-ui-playground` | `playground.html` — self-contained Pyodide editor | ~1MB compressed | Interactive playground for docs and `prefab playground` CLI |

The main renderer package (`@prefecthq/prefab-ui`) contains ONLY the CDN renderer. Doc assets and the playground are in separate packages to keep the main package small — MCP hosts only download what they need.

### Why three packages?

The CDN renderer, doc embed, and playground are three different builds from the same source. They share no runtime code at the npm level — each is self-contained. Bundling them together would force every MCP host to download ~3.5MB of doc preview and playground code it never uses.

## Delivery Modes

### CDN (default)

`get_renderer_html()` returns a tiny HTML stub that loads from jsDelivr, pinned to the installed Python package version:

```
https://cdn.jsdelivr.net/npm/@prefecthq/prefab-ui@{version}/dist/app/renderer.js
```

The version comes from `prefab_ui.__version__` at runtime. No version drift between the wire protocol and the renderer.

### Bundled (airgapped fallback)

The bundled `app.html` ships in the Python package. Pass `mode="bundled"` or set `PREFAB_BUNDLED_RENDERER=1` to use it. Dev versions (containing "dev" in the version string) auto-fall back to bundled since no CDN version exists.

### External URL (dev override)

Set `PREFAB_RENDERER_URL` to load from a custom URL (e.g. local `vite preview` server).

### Python API

```python
get_renderer_html(mode: Literal["cdn", "bundled"] | None = None) -> str
```

Resolution when `mode=None`:
1. `PREFAB_RENDERER_URL` env var → external stub with that URL (dev override)
2. `PREFAB_BUNDLED_RENDERER=1` env var → bundled `app.html`
3. Dev version → bundled (auto-fallback)
4. Default → CDN stub pinned to `__version__`

The same `mode` kwarg is on `get_renderer_head()`, `get_renderer_csp()`, `get_generative_renderer_html()`, and `get_generative_renderer_csp()`.

## Build Targets

| Config | Entry | Output | Purpose |
|--------|-------|--------|---------|
| `vite.config.ts` | `index.html` → `main.tsx` | `dist/` + assets | Local dev (`npm run dev`) |
| `vite.config.cdn.ts` | `index.html` → `main.tsx` | `dist/app/` (code-split) | CDN renderer → `@prefecthq/prefab-ui` |
| `vite.config.bundled.ts` | `index.html` → `main.tsx` | `dist/bundled/` (single file) | Bundled `app.html` for Python package |
| `vite.config.renderer.ts` | `src/embed.tsx` | `dist/_renderer/` + `dist/renderer.js` | Doc embed → `@prefecthq/prefab-ui-docs` |
| `vite.config.playground.ts` | `playground.html` | `dist/playground.html` (single file) | Playground → `@prefecthq/prefab-ui-playground` |

All configs share `index.html` as the HTML entry point except the embed (library mode, no HTML) and playground (its own HTML).

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
2. `npm version` — sets version from git tag on all three packages
3. `npm run build:publish` — builds embed + CDN renderer + playground
4. Copies build outputs into satellite package directories
5. Publishes all three packages to npm
6. Purges jsDelivr CDN cache for the docs embed (`@latest`)

The CDN renderer uses version-pinned URLs (no `@latest`), so no purge is needed.

### Manually before release

**Bundled renderer** (`app.html`) ships inside the Python package. Rebuild before any release that includes renderer changes:

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
| `docs/renderer.js` | `build:renderer` | Yes | Entry loader for doc previews (points at `@prefecthq/prefab-ui-docs`) |
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
5. Create GitHub release — triggers npm publish (all three packages) + docs update

## Common Pitfalls

- **`sh: vite: command not found`** — run `npm ci --prefix renderer` first
- **`package.json` version is always `0.0.0`** — real version comes from git tag at publish time
- **`docs/_renderer/` is gitignored** — run `prefab dev build-docs` after a fresh clone
- **Mintlify caches renderer** at `~/.mintlify/mint/apps/client/public/renderer.js` — restart `mintlify dev` after rebuilding
- **Production docs URL** is `prefab.prefect.io/docs/` (not root)
- **Deploy previews use CDN** — renderer source changes won't show until published
