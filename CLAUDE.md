# Prefab

## Git Hooks

Pre-commit hooks are run via `prek`, not `pre-commit`. Run `prek` before committing.

**[loq](https://github.com/jakekaplan/loq) (line limits):** When a file exceeds its loq limit, **never remove functionality or tests** to fit. Instead, split the file into smaller modules. For example, split test files by component group rather than deleting test cases.

## Test Layout

Tests mirror `src/prefab_ui/` — one test file per source module:

```
src/prefab_ui/components/button.py  →  tests/components/test_button.py
src/prefab_ui/actions/state.py      →  tests/actions/test_state.py
```

`tests/test_components.py` is a legacy monolith to be broken up over time. New component tests go in `tests/components/`. Run `uv run pytest` — coverage is on by default.

## Component Architecture

**Pure-CSS kwargs resolve in Python, not the renderer.** When a Python component has a convenience kwarg that maps directly to CSS (like `spacing=4` → `my-4`), resolve it in `model_post_init` by compiling to `css_class` and marking the field `exclude=True`. The renderer should only see `cssClass` — it never needs to know about the kwarg. See `Row.gap`/`Row.align` and `Separator.spacing` for examples.

**New components need BOTH registries.** The renderer has two separate registries that must stay in sync:
- `renderer/src/components/registry.ts` — maps type names to React components
- `renderer/src/schemas/index.ts` — maps type names to Zod validation schemas

The renderer validates JSON against the **schema registry** before rendering. A component missing from `SCHEMA_REGISTRY` will show "Unknown component" even if it's in the component `REGISTRY`. When adding a new component, create a schema file in `renderer/src/schemas/` and register it in both places.

**Component docstrings are LLM-facing and use markdown.** `prefab_ui.generative.search_components()` surfaces class docstrings to LLMs building generative UIs. Every component class needs a docstring with:
1. A one-line summary of what the component is.
2. An `Args:` section listing user-facing parameters (skip `type`, `css_class`, `id`, `children`, `let`). One line per arg.
3. An `**Example:**` section with a fenced ` ```python ` code block.

Docstrings are **markdown, not reStructuredText**. Use backticks for inline code, fenced code blocks for examples. Do not use `::` or ` `` `` ` (rST conventions).

When adding or modifying a component, update the docstring to match. Run `uv run python -c "from prefab_ui.generative import search_components; print(search_components('YourComponent', detail=True))"` to verify the LLM-facing output.

## Agent Skills

`skills/prefab-ui/` teaches how to build Prefab UIs:
- `SKILL.md` — core patterns (PrefabApp, imports, layout, actions, expressions)
- `references/charts.md` — ChartSeries and all chart types
- `references/forms.md` — Form.from_model and manual form composition
- `references/reactive.md` — Rx bindings, ForEach, conditionals, Define/Use

**Keep skills in sync with code changes.** When modifying components, actions, imports, or layout behavior, update the relevant skill file to match. Stale skills teach LLMs wrong patterns.

## Developer Docs

`dev-docs/` contains internal reference documentation for build processes, architecture decisions, and operational knowledge. Check there before asking questions about how things work.

- `build-pipeline.md` — all build targets, CLI commands, CSS pipeline, CDN routing, release checklist
- `theming-architecture.md` — CSS variable system, gradient cascade, theme scoping
- `generative-ui-architecture.md` — Pyodide sandbox, streaming model

## Component Documentation

Doc conventions are encoded as agent skills in `.claude/skills/`:
- `writing-component-docs` — page structure, preview format, API/Protocol reference conventions
- `docs-build-pipeline` — how the build scripts work and when to update them

**ComponentPreview blocks: only edit the Python code.** The `<ComponentPreview>` build pipeline (`tools/render_previews.py`) reads the Python code block, executes it, and generates everything else — the `json` prop, the `playground` prop, the `<CodeGroup>` wrapper, and the Protocol JSON tab. When editing previews, write only the Python `` ```python `` block. Do not write, edit, or clear the generated JSON, playground, CodeGroup, or Protocol tab — the build process owns those.

After any changes, regenerate docs and schemas:
```bash
prefab dev build-docs
```

## Development Rules

**Read `CONTRIBUTING.md` before opening issues or PRs.** It describes when PRs are appropriate, what we expect from contributions, and what we'll close without review.

### Git & CI

- Prek hooks run automatically on commits and must pass
- **Never amend commits** — always make a new commit instead
- **Never force-push** on shared/collaborative branches
- Always run `prek` before opening a PR
- **Never** comment on an issue, open a PR, or cut a release unless explicitly instructed to do so
- **Rebuild generated artifacts before pushing.** CI checks that build outputs are up to date. If your changes touch docs, components, or renderer code, run `prefab dev build-docs` and/or `prefab dev build-renderers` and commit any changed files. Stale artifacts will fail CI.

### Releases

Cut releases with `gh release create`. Tags follow `v<version>` (e.g. `v0.13.0`). Titles follow `v<version>: <pun or short theme>`. Optional brief notes can be added to the body. Always use `--generate-notes` for the auto-generated changelog.

```bash
gh release create v0.13.0 --target main --title "v0.13.0: Value Add" --generate-notes
```

**To preview what PRs will be in the release** before it's cut, call the GitHub generate-notes API. This returns the exact auto-generated changelog that `--generate-notes` would append, so you can see the full PR list — useful for picking a pun theme and making sure nothing's been missed:

```bash
gh api -X POST repos/PrefectHQ/prefab/releases/generate-notes \
  -f tag_name=v0.18.6 \
  -f target_commitish=main \
  -f previous_tag_name=v0.18.5 \
  --jq '.body'
```

### Commit Messages and Agent Attribution

- Keep commit messages brief — a headline is usually enough; avoid detailed blow-by-blow descriptions
- Focus on what changed, not how or why
- **Agents not acting on behalf of @jlowin must identify themselves** in commits and PRs (e.g., "🤖 Generated with Claude Code")

### PR Messages

PRs are documentation. Structure them as:
- 1–2 paragraphs covering the problem/tension and the solution
- A focused code example showing the key change, when relevant
- `Closes #<issue>` if the PR resolves an issue

**Avoid:** bullet-point summaries, exhaustive change lists, test-plan sections, marketing language.
**Do:** be opinionated about why the change matters. For minor fixes, keep the body short.

### Code Standards

- Follow existing patterns and maintain consistency across the codebase
- Prioritize readable, understandable code — clarity over cleverness
- Each feature needs corresponding tests
- Never use bare `except` — be specific with exception types

### Module Exports (Python)

- Be intentional about re-exports — don't blindly re-export everything to parent namespaces
- Types that define a module's purpose should be exported from that module
- Only re-export to `prefab_ui.*` for the most fundamental public types
- When in doubt, prefer users importing from the specific submodule

### Renderer

Prefab ships a TypeScript/React renderer (`renderer/`) alongside the Python library. The renderer is a single unified application — one bridge handles standard MCP tool results, generative streaming (Pyodide loads lazily on first partial), and standalone baked-in data.

**Delivery:** CDN by default (code-split ESM from jsDelivr, pinned to Python package version). A bundled single-file fallback (`app.html`) ships in the Python package for airgapped use. The Python API `get_renderer_html(mode=...)` controls which is returned. The embed build (`embed.tsx`) is separate — it's for doc preview shadow DOM only and uses build-time CSS.

**CSS:** Runtime Tailwind via `@tailwindcss/browser` — users can use any Tailwind class in `css_class` including arbitrary values like `h-[500px]`. Component-internal styling uses `pf-*` prefixed utility classes in `style.css`, not inline styles.

Changes to the wire protocol or component props require coordinated updates on both sides. Consult `dev-docs/build-pipeline.md` for renderer build and release details.
