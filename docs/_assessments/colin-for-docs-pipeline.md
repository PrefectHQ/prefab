# Assessment: Colin as Docs Pipeline Compiler — Proving Ground Plan

## Summary

Use the Prefab docs build pipeline to prove out Colin as a general-purpose document compilation tool. The pipeline is an 8-stage build with zero caching, no dependency graph, and full rebuilds every run — a strong test case for Colin's manifest-based incremental compilation. This plan is phased so each stage delivers value to Prefab while exercising a distinct Colin capability.

**Confirmed Colin capabilities:** custom providers, any-artifact output, manifest-based staleness detection.
**Colin feature to build:** external script hooks (needed for Phase 3+).

## Current Pipeline: Dependency Graph

Today the pipeline runs as a flat sequential list. The actual dependency structure is:

```
src/prefab_ui/components/*.py ──┬──→ [1] npm build:embed ──→ docs/embed.js
                                │
docs/**/*.mdx ──────────────────┼──→ [2] render_previews.py ──→ modified .mdx (in-place)
                                │         │
                                │         ├──→ [3] generate_content.py ──→ content.html
                                │         │         │
                                │         │         └──→ [4] tailwindcss CLI ──→ /tmp/raw.css
                                │         │                   │
                                │         │                   └──→ [5] scope_css.py ──→ docs/css/preview.css
                                │         │
                                │         └──→ [7] extract_examples.py ──→ renderer/src/playground/examples.json
                                │
src/prefab_ui/**/*.py ──────────┼──→ [6] generate_playground_bundle.py ──→ renderer/src/playground/bundle.json
                                │
                                └──→ [8] generate_protocol_pages.py ──→ docs/protocol/*.mdx
```

Key observations:
- **Steps 1, 6, 8** have no dependencies on other stages — can run in parallel
- **Steps 3→4→5** are a strict chain (content HTML → Tailwind CSS → scoped CSS)
- **Step 7** depends only on step 2's output
- **Step 2** depends on step 1 (embed module) and source component code
- None of these dependencies are explicit today; they're implicit via file paths

## Phased Plan

### Phase 1: Protocol Page Generation (exercises custom providers + any-artifact output)

**What:** Replace `generate_protocol_pages.py` with a Colin document that uses a custom Pydantic provider.

**Why this is the best starting point:**
- Purely generative (no in-place file modification)
- Clean input→output contract: Pydantic models → MDX files
- Outputs ~40-60 `.mdx` files — exercises Colin's multi-file artifact emission
- Currently rebuilds all pages every run even when no models changed
- Schema-cleaning logic (remove `onSuccess`/`onError`, simplify nullable, normalize `$ref`) is a natural Jinja2 filter chain

**Colin architecture:**
- **Custom provider:** `PydanticSchemaProvider` — introspects `Component` and `Action` subclasses, calls `model_json_schema()`, returns cleaned schemas with version hashes
- **Document template:** Jinja2 template producing MDX with YAML frontmatter + description + JSON schema code block
- **Manifest tracking:** Hash of each class's `model_json_schema()` output — rebuilds page only when schema changes
- **Output:** `docs/protocol/{kebab-name}.mdx` per component/action

**What this proves for Colin:**
- Custom provider pattern works for local Python introspection (not just remote APIs)
- Manifest correctly detects changes in Python class schemas
- Multi-file output from a single document definition
- Non-trivial Jinja2 filters (schema cleaning, kebab-case naming)

**Also migrate:** `generate_protocol_ref.py` (injects Protocol Reference sections into existing MDX). Similar pattern — Pydantic provider, Jinja2 template for `<ParamField>` blocks — but modifies files in-place, which tests a different output mode.

### Phase 2: Playground Artifacts (exercises file-tracking manifests)

**What:** Replace `generate_playground_bundle.py` and `extract_examples.py` with Colin documents.

**Why second:**
- Simpler than Phase 1 technically (no schema introspection, just file reading)
- But exercises a different Colin muscle: tracking many source files for staleness
- Outputs `.json` artifacts, not markdown

**Colin architecture:**

**Playground bundle:**
- **Source tracking:** All `.py` files in `src/prefab_ui/`, `src/prefab_ui/components/`, `src/prefab_ui/actions/`, `src/prefab_ui/renderer/`
- **Template:** Jinja2 iterates files, produces JSON object mapping module paths to source
- **Manifest:** Per-file content hashes; rebuild only when any `.py` file changes
- **Output:** `renderer/src/playground/bundle.json`

**Examples extraction:**
- **Source tracking:** All `docs/**/*.mdx` files
- **Template/filter:** Custom filter extracts fenced Python code blocks, derives categories from paths, deduplicates
- **Manifest:** Per-MDX-file content hashes; rebuild when any doc changes
- **Output:** `renderer/src/playground/examples.json`

**What this proves for Colin:**
- Glob-based source tracking with per-file staleness
- JSON artifact output
- Content extraction as a Jinja2 filter pattern
- Manifest efficiently handles 50+ tracked source files

### Phase 3: Preview Rendering (exercises external script hooks — new Colin feature)

**What:** Use Colin to orchestrate `render_previews.py`, running it only for changed MDX files.

**Why this needs the script hook feature:**
- `render_previews.py` uses `exec()` to run arbitrary Python and captures component trees via `model_post_init` hooks
- This can't be expressed as a Jinja2 template — it's imperative Python execution
- But Colin's manifest can determine *which files* need re-rendering
- The new external script hook would invoke `render_previews.py` with a file list

**Colin architecture:**
- **Source tracking:** Each `docs/**/*.mdx` file containing `<ComponentPreview auto>` as a tracked source
- **Also tracks:** `src/prefab_ui/components/*.py` (component class changes affect all previews that use them)
- **Script hook:** `uv run render_previews.py --files {changed_files}` (requires adding `--files` support to render_previews.py)
- **Manifest:** Per-MDX-file content hash + component source hashes
- **Output:** Modified MDX files (in-place)

**Incrementalization caveat:** `render_previews.py` maintains a shared namespace across code blocks within a single file (imports in block 1 available in block 2). This means the unit of re-rendering is a full file, not individual `<ComponentPreview>` tags. That's fine — per-file granularity is the big win.

**What this proves for Colin:**
- External script hook feature works end-to-end
- Colin can drive incremental builds of non-template stages
- Manifest-based file-level change detection at scale (458 preview tags across many files)
- The "compilation orchestrator" pattern: Colin doesn't do the work, it decides what work needs doing

### Phase 4: Full Pipeline Orchestration (exercises DAG + cascading rebuilds)

**What:** Express the entire 8-stage pipeline as a Colin dependency graph. `colin run` replaces `prefab dev build-docs`.

**Colin architecture:**
```
Documents (Colin DAG):
  embed-bundle:
    sources: renderer/src/**/*.{ts,tsx}
    hook: npm run --prefix renderer build:embed
    output: docs/embed.js

  protocol-pages:           # Phase 1
    sources: src/prefab_ui/{components,actions}/*.py
    provider: PydanticSchemaProvider
    output: docs/protocol/*.mdx

  playground-bundle:        # Phase 2
    sources: src/prefab_ui/**/*.py
    output: renderer/src/playground/bundle.json

  previews:                 # Phase 3
    sources: docs/**/*.mdx, src/prefab_ui/components/*.py
    depends: embed-bundle
    hook: uv run render_previews.py --files {changed}
    output: docs/**/*.mdx (in-place)

  tailwind-content:
    sources: src/prefab_ui/components/*.py
    depends: previews
    hook: uv run generate_content.py
    output: docs/_preview-build/content.html

  preview-css:
    sources: docs/_preview-build/input.css, renderer/src/theme.css
    depends: tailwind-content
    hook: npx @tailwindcss/cli@4 ... && uv run scope_css.py
    output: docs/css/preview.css

  examples:                 # Phase 2
    sources: docs/**/*.mdx
    depends: previews
    output: renderer/src/playground/examples.json
```

**What this proves for Colin:**
- Full DAG resolution with mixed document types (template-based + script-hook-based)
- Cascading rebuilds: changing a component class triggers previews → tailwind-content → preview-css
- Parallel execution of independent branches (embed-bundle ∥ protocol-pages ∥ playground-bundle)
- Colin can replace a bespoke build orchestrator (`cli.py:168-223`)

## What Colin Features Each Phase Exercises

| Colin Feature | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|---|---|---|---|---|
| Custom providers | Pydantic introspection | — | — | — |
| Any-artifact output | `.mdx` files | `.json` files | `.mdx` in-place | `.js`, `.css`, `.html` |
| Manifest staleness | Schema hashes | File content hashes | File + dependency hashes | Full DAG staleness |
| Jinja2 templates | MDX generation | JSON generation | — | — |
| External script hooks | — | — | render_previews.py | Tailwind, npm, scope_css |
| DAG / `ref()` | — | — | — | Full dependency graph |
| Cascading rebuilds | — | — | — | Component change → preview → CSS |
| Parallel execution | — | — | — | Independent branches |

## What This Proves for Colin Generally

If this works, Prefab demonstrates that Colin is a viable **build pipeline compiler**, not just a skill-refresh tool:

1. **Custom providers** make Colin useful for any structured data source, not just GitHub/Linear/Notion
2. **Any-artifact output** means Colin isn't limited to markdown skills
3. **External script hooks** let Colin orchestrate stages it can't template, making it a general build orchestrator
4. **DAG + manifest** provide incremental build semantics competitive with tools like Bazel or Nx, but with a simpler mental model
5. **Jinja2 + LLM blocks** uniquely combine template-based generation with AI-assisted content — something no other build tool offers

The Prefab pipeline is a good proving ground because it has genuine complexity (8 stages, mixed languages, implicit dependencies, non-trivial rendering) but is small enough to migrate incrementally.

## Risks

| Risk | Mitigation |
|---|---|
| Colin's manifest granularity may not support per-file tracking for 458 MDX files | Phase 2 tests this at smaller scale before Phase 3 commits |
| External script hooks may be hard to design generically | Prefab's needs are concrete — design the feature for this use case, generalize later |
| Shared namespace in render_previews.py makes per-block incrementalization impossible | Per-file granularity is sufficient; document this as a known limitation |
| Component class changes invalidate all previews that import that component | Conservative: treat any component change as "rebuild all previews." Optimize later with import analysis. |
| Migration disrupts active docs development | Each phase is independently deployable; old pipeline stays as fallback until phase is proven |

## Required Changes to Colin (PrefectHQ/colin)

### Phase 1 Requirements (custom providers + multi-file output)

**1. Custom provider for local Python introspection**
Colin needs a provider pattern that can run arbitrary Python to produce source data. For Prefab, this means a `PydanticSchemaProvider` that:
- Imports Python modules from a local project (`src/prefab_ui/components`, `src/prefab_ui/actions`)
- Discovers all subclasses of a base class (e.g., all `Component` subclasses)
- Calls methods on them (`model_json_schema()`) and returns structured data
- Returns a version hash per schema (so the manifest can detect changes per-class, not just "did anything change")

If Colin's custom provider interface already supports returning structured data + version info, this may just be writing a provider — no Colin core changes needed. If the provider interface assumes remote HTTP sources, it may need generalization to support local Python callables.

**2. Multi-file artifact output from a single document**
`generate_protocol_pages.py` produces ~40-60 `.mdx` files. Colin needs to support a single document definition that emits multiple output files. Options:
- **Looping output:** Document template iterates over provider data and writes one file per item (e.g., one `.mdx` per Pydantic model). The document's Jinja2 template would need a `{% for model in models %}...{% output "docs/protocol/{model.kebab_name}.mdx" %}...{% endfor %}` construct.
- **Directory output:** Document specifies an output directory instead of a single file, and the template populates it.

If Colin currently assumes 1 document → 1 output file, this is a core change.

**3. Jinja2 custom filter registration**
The schema-cleaning logic needs custom Jinja2 filters:
- `| clean_schema` — removes `onSuccess`/`onError` fields, simplifies nullable `anyOf` patterns, normalizes `$ref` paths, strips `title` fields
- `| kebab_case` — converts class names to kebab-case filenames
- `| pretty_json` — formats JSON with indentation for code blocks

If Colin already supports registering custom Jinja2 filters via project config or a Python file, this is just configuration. If not, Colin needs a way to register project-specific filters (e.g., a `filters.py` file in the Colin project that gets auto-imported).

### Phase 2 Requirements (file-glob source tracking)

**4. Glob-based source tracking with per-file content hashes**
Colin needs to track a glob pattern (e.g., `src/prefab_ui/**/*.py`) as a source, where:
- Each file matching the glob gets its own content hash in the manifest
- If any file changes, the document is marked stale
- New/deleted files matching the glob also trigger staleness
- The template receives the file list and contents as data

If Colin currently tracks individual named files but not glob patterns, this needs adding. The manifest entry would look like:
```yaml
sources:
  - type: glob
    pattern: "src/prefab_ui/**/*.py"
    files:
      "src/prefab_ui/components/button.py": "sha256:abc..."
      "src/prefab_ui/components/card.py": "sha256:def..."
    version: "composite-hash-of-all-files"
```

### Phase 3 Requirements (external script hooks)

**5. External script hooks triggered by staleness**
This is the big new feature. Colin needs a way to say: "when these sources are stale, instead of rendering a Jinja2 template, run this shell command." Design considerations:

```yaml
# Proposed document config
id: previews
sources:
  - glob: "docs/**/*.mdx"
  - glob: "src/prefab_ui/components/*.py"
depends:
  - embed-bundle
hook:
  command: "uv run docs/_preview-build/render_previews.py"
  args: "--files {changed_files}"  # Colin passes list of changed source files
  cwd: "{project_root}"
output:
  type: in-place  # Modified files are the same as source files
```

Key design decisions:
- **Changed file list:** Does Colin pass only changed files to the hook, or all files? For Prefab, changed-only is critical (per-file incremental rendering). The hook should receive `{changed_files}` as a space-separated or newline-separated list.
- **In-place output:** Some hooks modify their source files (render_previews.py rewrites MDX). Colin needs to handle this without marking the file as "changed again" on the next run. Options: track pre-hook hash vs. post-hook hash, or use a separate "last-rendered" manifest.
- **Exit code handling:** Hook returns non-zero → document stays stale (no manifest update). Same as a failed template render.
- **Stdout/stderr:** Capture and display, or stream through?

**6. Depends/triggers between documents**
For the DAG in Phase 4, Colin needs `depends:` to mean:
- "Don't compile me until my dependency has compiled"
- "If my dependency recompiled (its output changed), I am also stale"

If Colin's `ref()` system already handles this, `depends:` may just be sugar for referencing another document. But hook-based documents don't use `ref()` in templates, so there needs to be an explicit dependency declaration.

### Phase 4 Requirements (full DAG orchestration)

**7. Parallel execution of independent branches**
Once the DAG is explicit, Colin should be able to execute independent branches in parallel:
- `embed-bundle`, `protocol-pages`, and `playground-bundle` have no shared dependencies → run concurrently
- `previews` waits for `embed-bundle` → then `tailwind-content` → then `preview-css` (sequential chain)

This may already fall out of topological sort + a thread pool, but it needs to be intentional.

**8. Mixed document types in one project**
A single Colin project needs to contain:
- Template-based documents (protocol pages, playground bundle, examples)
- Hook-based documents (previews, tailwind, CSS scoping, embed build)

These need to coexist in the same DAG, with the same manifest system tracking both.

### Summary of Colin Changes by Priority

| Change | Phase | Effort | Notes |
|---|---|---|---|
| Custom provider for local Python introspection | 1 | Low-Medium | May already work if provider interface is generic enough |
| Multi-file output from single document | 1 | Medium | Core change if currently 1:1 |
| Custom Jinja2 filter registration | 1 | Low | Project-level `filters.py` or config |
| Glob-based source tracking | 2 | Medium | Per-file hashes in manifest |
| External script hooks | 3 | Medium-High | New feature; design carefully for reuse |
| Changed-file list passing to hooks | 3 | Medium | Part of script hook design |
| In-place output handling | 3 | Low-Medium | Manifest needs pre/post-hook hash tracking |
| Explicit `depends:` declarations | 4 | Low | May already exist via `ref()` |
| Parallel execution | 4 | Medium | Topological sort + thread pool |
| Mixed template + hook documents | 4 | Low | Should work if both types share manifest format |
