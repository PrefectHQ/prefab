# Renderer Build & Release Process

## Architecture

The renderer is an ESM bundle with code splitting. Entry point is a tiny IIFE (`renderer.js`) that Mintlify inlines as a `<script>` tag. Heavy features (charts, code highlighting, calendar, icons) are lazy-loaded chunks (`.mjs` files in `_renderer/`).

### Bundle structure
```
dist/renderer.js              ~1KB   IIFE entry loader
dist/_renderer/embed.mjs         ~1KB  stable re-export shim (unhashed)
dist/_renderer/embed-HASH.mjs   ~500KB core (React, Radix, shadcn, engine)
dist/_renderer/charts-HASH.mjs  ~520KB lazy (recharts, on first chart)
dist/_renderer/content-HASH.mjs ~250KB lazy (highlight.js, react-markdown)
dist/_renderer/compound-calendar-HASH.mjs ~180KB lazy (date-fns)
dist/_renderer/icons-HASH.mjs   ~varies lazy (lucide barrel, on dynamic icon lookup)
```

### Two-way CDN routing
The entry loader (`renderer.js`) picks its base URL at runtime:
- `localhost` → `/` (local files from `docs/`)
- Everything else → `https://cdn.jsdelivr.net/npm/@prefecthq/prefab-ui@latest/dist/`

Both paths load `_renderer/embed.mjs` — a stable (unhashed) re-export shim that forwards to the real hashed chunk. This means `renderer.js` never needs updating when the renderer is rebuilt or a new version is published. The shim uses relative imports, so everything resolves correctly in both local and CDN contexts.

### Why `.mjs` for chunks
Mintlify inlines ALL `.js` files from `docs/` as `<script>` tags on every page. Using `.mjs` prevents the 500KB+ chunks from being inlined. On deployed Mintlify, `.mjs` files can't be served as static assets (Next.js returns text/html), so production loads them from the jsdelivr CDN.

## Local Development

```bash
# Build renderer (from repo root)
npm run --prefix renderer build:renderer

# Copy built files to docs/ for local Mintlify dev
prefab dev build-docs

# Or manually:
cp renderer/dist/renderer.js docs/renderer.js
rm -rf docs/_renderer && cp -r renderer/dist/_renderer docs/_renderer

# Run local docs
mintlify dev --dir docs
```

Local dev serves chunks from `docs/_renderer/` directly (the `localhost` path in the entry loader).

## Release Process

Releases happen ONLY via the GitHub release flow. Never publish to npm manually.

### Steps
1. Create a GitHub release with a version tag (e.g., `v0.3.1`)
2. `publish-renderer.yml` workflow runs automatically:
   - Strips PEP 440 suffixes from tag: `v0.3.1a1` → `0.3.1`
   - Sets npm version from the tag
   - Runs `npm run build:publish` (builds renderer + playground)
   - Publishes `@prefecthq/prefab-ui` to npm

3. `update-published-docs.yml` workflow also runs automatically:
   - Force-pushes the `published-docs` branch to the tagged commit
   - Mintlify builds docs from this branch, so published docs only show released components
   - Uses force-push so cherry-picks between releases (e.g. typo fixes) don't block it

Because the entry loader uses `@latest` and the stable `embed.mjs` shim, there's no need to rebuild `docs/renderer.js` after publishing. The CDN resolves `@latest` to the new version, and the stable shim name doesn't change.

### Why `@latest` works
The entry loader uses `@latest` rather than a pinned version. This is safe because the stable `_renderer/embed.mjs` shim re-exports from the hashed chunk via a relative import. Within any single npm version, the shim and its hashed chunk are always consistent. The `@latest` tag just points to whichever version is current.

## Deploy Previews

Deploy previews (Mintlify) load chunks from the CDN (`@latest`). If a branch changes renderer source (producing different chunk hashes), deploy previews won't show those renderer changes — the CDN still serves the last published version's chunks. Test renderer changes locally instead.

## Playground

The playground is a self-contained HTML file (all JS/CSS inlined via `vite-plugin-singlefile`) that runs Python in the browser via Pyodide.

### How it loads Python

There are two paths for loading `prefab_ui` into Pyodide:

**Bundled mode (`__LOCAL_BUNDLE__ = true`):** All 76+ prefab_ui Python source files are serialized into `renderer/src/playground/bundle.json` and inlined into the playground HTML at build time. At runtime, the files are written directly to Pyodide's virtual filesystem (`/lib/python3.12/site-packages/prefab_ui/...`). No network requests needed.

**Micropip mode (`__LOCAL_BUNDLE__ = false`):** Falls back to `micropip.install("prefab-ui", deps=False)` from PyPI. **This path is broken** because pydantic-core is a Rust extension with no WASM wheel on PyPI. It exists only as a dev fallback and should never be used in production.

The `VITE_LOCAL_PLAYGROUND=1` environment variable controls which path Vite compiles in. When set, `__LOCAL_BUNDLE__` is `true` and the micropip code is tree-shaken out entirely.

### Pydantic handling

Pydantic is always loaded from Pyodide's built-in WASM packages (`py.loadPackage(["pydantic"])`), never from PyPI. This happens before either the bundle or micropip path runs.

### Build variants

| Context | Command | `__LOCAL_BUNDLE__` | Source |
|---|---|---|---|
| Local docs (`prefab dev build-docs`) | `VITE_LOCAL_PLAYGROUND=1 npm run build:playground` | `true` | Bundle inlined |
| npm publish (`build:publish`) | `VITE_LOCAL_PLAYGROUND=1 npm run build:playground` | `true` | Bundle inlined |
| Dev (direct) | `npm run build:playground` | `false` | micropip (broken) |

### How published docs serve it

`docs/playground.mdx` loads the playground HTML via fetch + blob URL:
- **localhost:** fetches `/playground.html` (local docs build)
- **production:** fetches `https://cdn.jsdelivr.net/npm/@prefecthq/prefab-ui@latest/dist/playground.html` (npm-published version)

The npm-published version must be built with `VITE_LOCAL_PLAYGROUND=1` (handled by `build:publish` in `package.json`). If it isn't, the published playground will fail with a micropip error.

### Bundle generation

`docs-build/generate_playground_bundle.py` reads all `.py` files from `src/prefab_ui/` and serializes them as JSON into `renderer/src/playground/bundle.json`. This runs as part of `prefab dev build-docs`.

When adding new Python subpackages to prefab_ui, make sure they're included in the bundle generator's source paths.

### Common issues

- **"attempted to install wheel before downloading it"** — means the published playground was built without `VITE_LOCAL_PLAYGROUND=1`. Fix: rebuild and republish the renderer npm package.
- **New module not found in playground** — the bundle generator didn't pick it up. Check `generate_playground_bundle.py` for the source paths.
- **`docs/playground.mdx` uses `mode: wide`** (NOT `mode: frame` — frame breaks nested iframes).

## Key Files

| File | Purpose |
|---|---|
| `renderer/vite.config.renderer.ts` | ESM build config with code splitting |
| `renderer/vite-plugins.ts` | Entry loader rewrite + Tailwind shadow DOM fix |
| `renderer/package.json` | npm package config (`version: 0.0.0`, real version from git) |
| `docs/renderer.js` | Committed entry loader (tiny IIFE) |
| `docs/_renderer/*.mjs` | Gitignored chunks for local dev (copied by `build-docs`) |
| `docs/snippets/component-preview.mdx` | Mounts previews, loads renderer |
| `docs/playground.mdx` | Playground page with fetch+blob iframe |
| `.github/workflows/publish-renderer.yml` | npm publish on GitHub release |
| `.github/workflows/update-published-docs.yml` | Fast-forward `published-docs` branch on release |
| `src/prefab_ui/cli/cli.py` | `prefab dev build-docs` — copies dist to docs/ |

## Common Pitfalls

- **`package.json` version is always `0.0.0`** — don't try to read version from there. Use `git describe --tags`.
- **`docs/_renderer/` is gitignored** — after a fresh clone, run `prefab dev build-docs` to copy chunks from `renderer/dist/`. The CLI detects missing chunks and copies them even if the renderer source hasn't changed.
- **Mintlify caches renderer** at `~/.mintlify/mint/apps/client/public/renderer.js`. After rebuilding, you may need to restart `mintlify dev` or clear this cache.
- **Production docs URL** is `prefab.prefect.io/docs/` (not `prefab.prefect.io/` directly).
