# Assessment: Using Colin for the Prefab Docs Build Pipeline

## Summary

Colin (PrefectHQ/colin) has **genuine potential as a compilation orchestrator** for the Prefab docs pipeline. The pipeline's biggest problems — zero caching, no dependency graph, full rebuilds on every run, implicit stage coupling — are compilation problems that Colin's manifest-based incremental build model directly addresses. Colin isn't a replacement for the pipeline's rendering stages, but it could add the incremental build semantics they currently lack.

## Current Pipeline Pain Points

The 8-stage pipeline (`cli.py:168-223`) has significant compilation-domain problems:

| Problem | Severity | Detail |
|---|---|---|
| **Zero caching** | High | Full rebuild of all 8 stages every run. No tracking of what changed. |
| **No dependency graph** | High | Stage coupling is implicit via filesystem paths (`/tmp/prefab-preview-raw.css`). No DAG, no skip logic. |
| **No incremental builds** | High | All 458 `<ComponentPreview>` tags re-rendered every time, even if one MDX file changed. |
| **All-or-nothing failure** | Medium | One stage fails → restart entire pipeline. |
| **Manual sync burden** | High | `html_renderer.py` (753 lines) duplicates React's CVA class strings. Adding a component touches 7+ files across 3 directories. |
| **Brittle regex parsing** | Medium | MDX rewriting via raw regex in `render_previews.py`. |

## What Colin Offers as a Compilation Engine

Colin's core is a **manifest-based incremental compiler**:

- **Dependency tracking** — records source versions (commit SHAs, timestamps); only recompiles when inputs change
- **DAG-aware compilation** — `ref()` system creates explicit dependency edges; topological sort determines build order
- **Dual-level caching** — document-level (skip unchanged docs) + LLM-level (skip unchanged AI calls)
- **Cascading recompilation** — change a source → only dependent documents rebuild
- **Jinja2 templating** — templates with custom filters, providers, and LLM blocks

## Stage-by-Stage Fit

### Stages where Colin could add real value

| Stage | Current Approach | Colin Opportunity |
|---|---|---|
| **generate_protocol_pages.py** | Pydantic `model_json_schema()` → string-formatted MDX | **Strong fit.** Templated document generation from structured data. Colin could track component model files as sources, use Jinja2 for MDX output, rebuild only when models change. Schema-cleaning logic would live in a custom provider or filter. |
| **render_previews.py** (orchestration) | Re-executes all 458 preview blocks every run | **Moderate fit.** Colin's manifest could track which MDX files changed and only re-render those — the single biggest build-time win. The `exec()` logic stays custom, but Colin decides *when* it runs. |
| **extract_examples.py** | Scans all MDX → `examples.json` | **Moderate fit.** Colin could track which MDX files contribute examples and skip rebundling when none changed. |
| **generate_playground_bundle.py** | Serializes all Python source → `bundle.json` | **Moderate fit.** Colin's manifest could detect source file changes and skip serialization. |

### Stages where Colin doesn't help

| Stage | Why |
|---|---|
| **embed.js build** (npm/Vite) | JavaScript bundling — wrong domain. |
| **Tailwind CSS build** (npx CLI) | Node.js CSS toolchain — Colin can't replace this. |
| **scope_css.py** | CSS string manipulation — bespoke transform, not templated. |
| **generate_content.py** | Variant enumeration tightly coupled to component class internals. |
| **html_renderer.py** | 40+ component-specific renderers with CVA class duplication. This is rendering logic. |

Note: Colin could still *orchestrate* these stages (detect when inputs change, skip when unnecessary) even if it can't replace their logic.

## Architecture Sketch

Colin as compilation orchestrator wrapping existing stages:

```
colin project/
├── documents/
│   ├── protocol-pages/        # Jinja2 templates → protocol/*.mdx
│   ├── playground-bundle/     # Tracks Python source → bundle.json
│   └── examples/              # Tracks MDX → examples.json
│
├── sources tracked via manifest:
│   ├── src/prefab_ui/components/*.py   (protocol pages, content gen, previews)
│   ├── docs/**/*.mdx                   (previews, examples)
│   └── renderer/src/ui/*.tsx           (could flag html_renderer drift)
│
└── stages still external (invoked by Colin when sources change):
    ├── render_previews.py     (only for changed MDX files)
    ├── generate_content.py    (only when component variants change)
    ├── Tailwind CLI            (only when content.html changes)
    ├── scope_css.py           (only when raw CSS changes)
    └── npm build:embed        (only when renderer source changes)
```

The key shift: today the pipeline is a flat sequential list with no awareness of what changed. Colin would make it a dependency-aware compilation graph where unchanged stages are skipped.

## Open Questions

These need answers before committing to integration:

1. **Can Colin invoke external scripts as compilation steps?** Its model is Jinja2 templates → markdown. Wrapping `render_previews.py` or `npx tailwindcss` as Colin steps may require custom providers or post-compile hooks. If Colin can only output markdown, it can't manage the CSS/JS/JSON artifact stages.

2. **Does Colin support non-markdown output?** The pipeline produces `.css`, `.js`, `.json`, and `.html` — not just `.md`. If Colin is opinionated about markdown-only output, half the stages can't be managed by it.

3. **Manifest granularity** — Colin tracks per-document freshness. The pipeline needs per-file granularity (which of 458 MDX files changed?). Can Colin's manifest handle file-level tracking within a document's source set?

4. **Custom provider feasibility** — Protocol page generation needs Pydantic's `model_json_schema()`. Can this be cleanly wrapped as a Colin provider, or does it become awkward indirection over code that already works?

5. **Orchestration of non-Colin steps** — Can Colin conditionally trigger external commands (Tailwind CLI, npm build) based on manifest staleness, or is it limited to its own template compilation?

## Recommendation

**Investigate further — Colin has genuine potential here, but the fit depends on its extensibility.**

### Immediate next steps

1. **Prototype protocol page generation in Colin** — This is the strongest fit. Take `generate_protocol_pages.py` and express it as a Colin project with Jinja2 templates + Pydantic introspection as a custom source. Evaluate whether the result is simpler than the current script and whether incremental builds work as expected.

2. **Assess Colin's extensibility model** — Determine whether Colin supports custom providers (for Pydantic introspection), non-markdown output (for JSON/CSS artifacts), and external command invocation (for Tailwind CLI, npm builds). This determines whether Colin can be a full pipeline orchestrator or only covers the document-generation stages.

3. **Measure current build time** — Benchmark `prefab dev build-docs` end-to-end and per-stage. This establishes the baseline for evaluating incremental build improvements.

### What Colin won't fix

The `html_renderer.py` maintenance burden (753 lines duplicating React's CVA classes) is the pipeline's worst pain point, but it's a code-generation problem, not a compilation-orchestration problem. The fix there is generating Python class strings from React's CVA definitions or establishing a shared styling DSL — independent of whether Colin orchestrates the pipeline.
