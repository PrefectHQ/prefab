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

## Developer Docs

`dev-docs/` contains internal reference documentation for build processes, architecture decisions, and operational knowledge. Check there before asking questions about how things work.

## Component Documentation

Doc conventions are encoded as agent skills in `.claude/skills/`:
- `writing-component-docs` — page structure, preview format, API/Protocol reference conventions
- `docs-build-pipeline` — how the build scripts work and when to update them

After any changes, regenerate docs and schemas:
```bash
prefab dev build-docs
```

## Development Rules

### Git & CI

- Prek hooks run automatically on commits and must pass
- **Never amend commits** — always make a new commit instead
- **Never force-push** on shared/collaborative branches
- Always run `prek` before opening a PR
- **Never** comment on an issue, open a PR, or cut a release unless explicitly instructed to do so

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

Prefab ships a TypeScript/React renderer (`renderer/`) alongside the Python library. Changes to the wire protocol or component props require coordinated updates on both sides. CSS styling is done via Tailwind utility classes in `style-nova.css` using the `cn-*` class naming convention, not inline styles or component-level Tailwind classes. Consult `dev-docs/` for renderer build and release details.
