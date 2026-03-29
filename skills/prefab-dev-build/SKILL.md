---
name: prefab-dev-build
description: >
  How to build and preview renderer/playground changes locally. Use this skill
  when modifying the renderer (themes, components, styles), the playground
  (theme picker, examples), or any Python source that needs to appear in the
  playground. Covers the build pipeline, common pitfalls, and how to iterate.
---

# Building and Previewing Renderer/Playground Changes

## The One Command

After changing renderer source, Python source, or playground code:

```bash
uv run prefab dev build-docs
```

This is the **only** command you should use. It orchestrates the full pipeline
with smart caching (only rebuilds what changed). Never run raw npm build
commands (`npm run build:playground`, `npm run build:renderer`) directly —
they skip critical steps.

## What the Pipeline Does

1. **Renderer build** (if TS source changed) — `npm run build:renderer` builds the
   code-split ESM bundle for CDN delivery (the primary renderer artifact)
2. **Python bundle generation** — serializes all `src/prefab_ui/**/*.py` into
   `renderer/src/playground/bundle.json` for Pyodide
3. **Playground build** (if playground source changed) — runs Vite with
   `VITE_LOCAL_PLAYGROUND=1` so the Python bundle is inlined
4. **Copy to docs/** — puts built files where `prefab playground` and
   `mintlify dev` expect them

Note: `build-docs` builds the CDN renderer. The bundled single-file renderer
(airgapped fallback) is built separately via `prefab dev build-renderers`.

## Previewing

```bash
# Start the playground (serves from docs/)
uv run prefab playground

# Or start the full docs site
mintlify dev --dir docs
```

The playground runs on port 5174 by default.

## Common Mistakes

**"attempted to install wheel before downloading it"** — the playground was
built without `VITE_LOCAL_PLAYGROUND=1`. This happens when you run
`npm run build:playground` directly instead of `prefab dev build-docs`.
Fix: run the full pipeline.

**Playground shows stale Python code** — `bundle.json` is stale. The full
pipeline regenerates it; raw npm commands don't.

**Renderer changes not visible in deploy previews** — deploy previews load
chunks from the CDN (`@latest`), not from the branch. Test renderer changes
locally.

## Reference

Full build and release details: `dev-docs/build-pipeline.md`
