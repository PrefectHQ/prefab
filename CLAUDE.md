# Prefab

## Git Hooks

Pre-commit hooks are run via `prek`, not `pre-commit`. Run `prek` before committing.

**loq (line limits):** When a file exceeds its loq limit, **never remove functionality or tests** to fit. Instead, split the file into smaller modules. For example, split test files by component group rather than deleting test cases.

## Component Architecture

**Pure-CSS kwargs resolve in Python, not the renderer.** When a Python component has a convenience kwarg that maps directly to CSS (like `spacing=4` → `my-4`), resolve it in `model_post_init` by compiling to `css_class` and marking the field `exclude=True`. The renderer should only see `cssClass` — it never needs to know about the kwarg. See `Row.gap`/`Row.align` and `Separator.spacing` for examples.

## Component Documentation

Doc conventions are encoded as agent skills in `.claude/skills/`:
- `writing-component-docs` — page structure, preview format, API/Protocol reference conventions
- `docs-build-pipeline` — how the build scripts work and when to update them

After any changes, regenerate docs and schemas:
```bash
prefab dev build-docs
```
