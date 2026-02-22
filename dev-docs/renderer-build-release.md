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

Because the entry loader uses `@latest` and the stable `embed.mjs` shim, there's no need to rebuild `docs/renderer.js` after publishing. The CDN resolves `@latest` to the new version, and the stable shim name doesn't change.

### Why `@latest` works
The entry loader uses `@latest` rather than a pinned version. This is safe because the stable `_renderer/embed.mjs` shim re-exports from the hashed chunk via a relative import. Within any single npm version, the shim and its hashed chunk are always consistent. The `@latest` tag just points to whichever version is current.

## Deploy Previews

Deploy previews (Mintlify) load chunks from the CDN (`@latest`). If a branch changes renderer source (producing different chunk hashes), deploy previews won't show those renderer changes — the CDN still serves the last published version's chunks. Test renderer changes locally instead.

## Playground

- `docs/playground.mdx` uses `mode: wide` (NOT `mode: frame` — frame breaks nested iframes)
- Playground HTML is fetched from CDN and loaded via blob URL
- `npm run --prefix renderer build:playground` builds `dist/playground.html`
- Playground also uses `@latest` CDN URL

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
| `src/prefab_ui/cli/cli.py` | `prefab dev build-docs` — copies dist to docs/ |

## Common Pitfalls

- **`package.json` version is always `0.0.0`** — don't try to read version from there. Use `git describe --tags`.
- **`docs/_renderer/` is gitignored** — after a fresh clone, run `prefab dev build-docs` to copy chunks from `renderer/dist/`. The CLI detects missing chunks and copies them even if the renderer source hasn't changed.
- **Mintlify caches renderer** at `~/.mintlify/mint/apps/client/public/renderer.js`. After rebuilding, you may need to restart `mintlify dev` or clear this cache.
- **Production docs URL** is `prefab.prefect.io/docs/` (not `prefab.prefect.io/` directly).
