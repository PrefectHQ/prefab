# Prefab

## Git Hooks

Pre-commit hooks are run via `prek`, not `pre-commit`. Run `prek` before committing.

**loq (line limits):** When a file exceeds its loq limit, **never remove functionality or tests** to fit. Instead, split the file into smaller modules. For example, split test files by component group rather than deleting test cases.

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
