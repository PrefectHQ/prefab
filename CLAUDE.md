# Prefab

## Git Hooks

Pre-commit hooks are run via `prek`, not `pre-commit`. Run `prek` before committing.

## Component Documentation

Doc conventions are encoded as agent skills in `.claude/skills/`:
- `writing-component-docs` — page structure, preview format, API/Protocol reference conventions
- `docs-build-pipeline` — how the build scripts work and when to update them

After any changes, regenerate docs and schemas:
```bash
prefab dev build-docs
```
