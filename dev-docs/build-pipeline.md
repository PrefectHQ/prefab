# Build Pipeline

Complete reference for what gets built, when, by whom, and how.

## Bundled Renderers

The Python package ships two self-contained HTML files in `src/prefab_ui/renderer/`. Each is a complete single-file renderer with all JS/CSS inlined — no external requests, no CDN, no CSP domains needed.

**`app.html`** is the standard MCP renderer. When a FastMCP tool returns a `PrefabApp`, the MCP host loads this HTML in an iframe. It connects via the MCP Apps bridge (`ext-apps` SDK), receives the view JSON as `structuredContent`, and renders the component tree. This is what most users interact with.

**`generative.html`** is the generative UI renderer. It extends the standard renderer with Pyodide support for executing streaming Python code from `ontoolinputpartial`. Used when an LLM streams UI code that gets progressively rendered as it arrives. Pyodide is loaded from CDN at runtime (not bundled) to keep the HTML size manageable.

Both are built as single files via `vite-plugin-singlefile` and must be rebuilt with `prefab dev build-renderers` after any renderer source changes.

## Build Targets

The renderer has 5 Vite build configurations producing different artifacts:

| Config | Entry point | Output | Purpose |
|--------|------------|--------|---------|
| `vite.config.ts` | `renderer.html` → `main.tsx` | `dist/renderer.html` + assets | Local dev (`npm run dev`), `prefab serve` with `PREFAB_RENDERER_URL` |
| `vite.config.renderer.ts` | `src/embed.tsx` | `dist/renderer.js` + `.mjs` chunks | CDN library (npm), doc preview shadow DOM |
| `vite.config.playground.ts` | `playground.html` | `dist/playground.html` (single file) | Published interactive playground |
| `vite.config.mcp.ts` | `mcp.html` → `generative-main.tsx` | `dist/mcp/mcp.html` (single file) | Bundled `app.html` shipped in Python package |
| `vite.config.generative.ts` | `generative.html` → `generative-main.tsx` | `dist/generative/generative.html` (single file) | Bundled `generative.html` shipped in Python package |

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

This publishes the **CDN renderer** (`renderer.js` + chunks) and **playground** (`playground.html`). It does NOT build the bundled `app.html`/`generative.html` — those must be rebuilt manually before release.

### Manually before release

**Bundled renderers** (`app.html`, `generative.html`) ship inside the Python package. They must be rebuilt and committed before any release that includes renderer changes:

```bash
prefab dev build-renderers
```

This builds `vite.config.mcp.ts` and `vite.config.generative.ts`, then copies the output to `src/prefab_ui/renderer/`.

### During development (`prefab dev build-docs`)

Runs a 10-step pipeline:

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
| `prefab dev build-renderers` | Bundled `app.html` + `generative.html` for the Python package |
| `prefab dev build-playground` | Just the playground (skips previews, CSS, protocol) |
| `prefab dev docs` | Runs `build-docs` then starts Mintlify with file watcher |

## CSS Pipeline

Three separate CSS paths:

### Main renderer (MCP / standalone)
- **Runtime**: `@tailwindcss/browser` generates CSS for any Tailwind class at runtime
- **Build-time**: `@tailwindcss/vite` processes `index.css` for renderer-internal styles
- Users can use any Tailwind class in `css_class` — no safelist needed

### Doc previews (shadow DOM)
- Build-time only: `@tailwindcss/vite` processes `index.css`, inlined into shadow DOM via `embed.tsx`
- `@source "../../tools/preview-classes.html"` pulls in classes extracted from rendered previews
- `@tailwindcss/browser` cannot observe shadow DOM, so build-time CSS is the only option here

### Doc site pages
- Separate Tailwind build via `tools/input.css` → `@tailwindcss/cli`
- Scans `tools/content.html` (generated component variants) and `docs/**/*.mdx`
- Output scoped to `.prefab-preview { ... }` by `tools/scope_css.py`

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
| `src/prefab_ui/renderer/app.html` | `build-renderers` | Yes | Bundled MCP renderer |
| `src/prefab_ui/renderer/generative.html` | `build-renderers` | Yes | Bundled generative renderer |

## Release Checklist

Before cutting a release with renderer changes:

1. `prefab dev build-renderers` — rebuild bundled HTML
2. `prefab dev build-docs` — regenerate all doc assets
3. Commit the rebuilt files
4. `prek` — verify all hooks pass
5. Create GitHub release — triggers npm publish + docs update
