# Renderer Build & Release Process

## Architecture

The renderer is an ESM bundle with code splitting. Entry point is a tiny IIFE (`renderer.js`) that Mintlify inlines as a `<script>` tag. Heavy features (charts, code highlighting, calendar, icons) are lazy-loaded chunks (`.mjs` files in `_chunks/`).

### Bundle structure
```
dist/renderer.js              ~1KB   IIFE entry loader
dist/_chunks/embed-HASH.mjs   ~500KB core (React, Radix, shadcn, engine)
dist/_chunks/charts-HASH.mjs  ~520KB lazy (recharts, on first chart)
dist/_chunks/content-HASH.mjs ~250KB lazy (highlight.js, react-markdown)
dist/_chunks/compound-calendar-HASH.mjs ~180KB lazy (date-fns)
dist/_chunks/icons-HASH.mjs   ~varies lazy (lucide barrel, on dynamic icon lookup)
```

### Two-way CDN routing
The entry loader (`renderer.js`) picks its base URL at runtime:
- `localhost` → `/` (local files from `docs/`)
- Everything else → `https://cdn.jsdelivr.net/npm/@prefecthq/prefab-ui@VERSION/dist/`

The CDN version is baked in at build time from `git describe --tags`. `package.json` says `0.0.0` — the real version always comes from git tags.

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
rm -rf docs/_chunks && cp -r renderer/dist/_chunks docs/_chunks

# Run local docs
mintlify dev --dir docs
```

Local dev serves chunks from `docs/_chunks/` directly (the `localhost` path in the entry loader).

## Release Process

Releases happen ONLY via the GitHub release flow. Never publish to npm manually.

### Steps
1. Create a GitHub release with a version tag (e.g., `v0.3.1`)
2. `publish-renderer.yml` workflow runs automatically:
   - Strips PEP 440 suffixes from tag: `v0.3.1a1` → `0.3.1`
   - Sets npm version from the tag
   - Runs `npm run build:publish` (builds renderer + playground)
   - Publishes `@prefecthq/prefab-ui` to npm
3. After publishing, rebuild `docs/renderer.js` locally to pick up the new CDN version:
   ```bash
   npm run --prefix renderer build:renderer
   # This bakes the new version into the entry loader's CDN URL
   ```
4. Copy to docs and commit:
   ```bash
   prefab dev build-docs
   git add docs/renderer.js docs/_chunks/
   git commit -m "Rebuild docs/renderer.js with vX.Y.Z CDN URL"
   ```

### Version pinning
The entry loader pins an exact CDN version (e.g., `@0.3.0`), never `@latest`. This is critical because chunk filenames contain content hashes — a stale entry pointing to `@latest` would reference chunk hashes that don't exist in the new version.

## Deploy Previews

Deploy previews (Mintlify) use the CDN with the version baked into `docs/renderer.js`. If a branch changes renderer source (producing different chunk hashes), deploy previews won't show those renderer changes — the CDN still serves the last published hashes. Test renderer changes locally instead.

The `build-renderer.yml` CI workflow was deleted because it auto-rebuilt `renderer.js` in CI's shallow clone (no git tags), causing CDN URLs to resolve to `@0.0.0` (nonexistent on npm), breaking deploy previews.

## Playground

- `docs/playground.mdx` uses `mode: wide` (NOT `mode: frame` — frame breaks nested iframes)
- Playground HTML is fetched from CDN and loaded via blob URL
- `npm run --prefix renderer build:playground` builds `dist/playground.html`
- Same CDN version pinning applies — update the version in `playground.mdx` after releases

## Key Files

| File | Purpose |
|---|---|
| `renderer/vite.config.renderer.ts` | ESM build config with code splitting |
| `renderer/vite-plugins.ts` | Entry loader rewrite + Tailwind shadow DOM fix |
| `renderer/package.json` | npm package config (`version: 0.0.0`, real version from git) |
| `docs/renderer.js` | Committed entry loader (tiny IIFE) |
| `docs/_chunks/*.mjs` | Committed chunks for local dev |
| `docs/snippets/component-preview.mdx` | Mounts previews, loads renderer |
| `docs/playground.mdx` | Playground page with fetch+blob iframe |
| `.github/workflows/publish-renderer.yml` | npm publish on GitHub release |
| `src/prefab_ui/cli/cli.py` | `prefab dev build-docs` — copies dist to docs/ |

## Common Pitfalls

- **`package.json` version is always `0.0.0`** — don't try to read version from there. Use `git describe --tags`.
- **Never use `@latest` in CDN URLs** — hashed chunks + `@latest` = version skew = missing chunks.
- **Mintlify caches renderer** at `~/.mintlify/mint/apps/client/public/renderer.js`. After rebuilding, you may need to restart `mintlify dev` or clear this cache.
- **Production docs URL** is `prefab.prefect.io/docs/` (not `prefab.prefect.io/` directly).
