---
name: writing-component-docs
description: >
  Conventions for authoring and maintaining Prefab component and action
  documentation pages (docs/components/*.mdx, docs/actions/*.mdx). Use when
  creating new component docs, updating existing docs after API changes,
  adding examples, or editing Protocol/API Reference sections.
---

## Page Structure

Every component doc follows this section order (h2 headers for TOC):

1. **Frontmatter** — `title`, `description`, `icon`
2. **Intro paragraph** — one sentence explaining what the component does
3. **## Basic Usage** — simplest working example, no extra options
4. **## [Feature sections]** — one h2 per notable feature/variant
5. **## API Reference** — Python parameters (Card/ParamField format)
6. **## Protocol Reference** — protocol link + inline JSON schema

The page title doesn't appear in the TOC, so "Basic Usage" is the user's
entry point. Never drop straight into a preview without a heading.

## Component Previews

Only edit the Python code block inside `<ComponentPreview auto>`. The JSON
prop, CodeGroup wrapper, and Protocol tab are all generated — never write
them by hand.

After editing previews, run `prefab dev build-docs` to regenerate.

**Code block titles:** Always give the Python block a title (e.g.,
`` ```python Python ``). A block without a title produces a zero-width tab in
the CodeGroup that users can't click. The title goes before other directives:
`` ```python Python {5} ``.

**Python code style inside previews:**
- Target ~80 character line width
- Use implicit string concatenation for long text
- Wrap function arguments when they don't fit on one line
- Include all necessary imports

**Action line-break convention:** When an action value is a simple one-liner
(no inner arguments that need their own lines), keep it inline:

```python
Button("Reset", on_click=SetState("count", 0))
Button("Warn me", variant="outline",
       on_click=ShowToast("Danger!", variant="warning"))
```

When the action itself takes multi-line arguments, break after `on_click=`
so the action constructor starts on a new indented line:

```python
Button(
    "Get Weather",
    on_click=CallTool(
        "get_weather",
        arguments={"location": "{{ city }}"},
    ),
)
```

Never cram a multi-line action onto the same line as `on_click=`. The action
name must be visually distinct from the component that triggers it.

## API Reference

Use Card + ParamField. Lead with the most important parameters:

```mdx
<Card icon="code" title="ComponentName Parameters">
<ParamField body="param_name" type="str" default="value">
  Description of the parameter.
</ParamField>
</Card>
```

## Protocol Reference

This section is **auto-generated** by `generate_protocol_ref.py` (run via
`prefab dev build-docs`). Do not edit it by hand — it will be overwritten.

The generator reads `<Card icon="code" title="X Parameters">` cards from
the API Reference section, introspects the corresponding Pydantic model,
and produces compact pseudocode JSON blocks with links to the full protocol
pages. Components whose Card titles don't end in "Parameters" (like
If/Elif/Else) are skipped, allowing hand-written Protocol Reference
sections for special cases.

Inline JSON schema conventions (for reference / hand-written exceptions):
- Append `?` to optional property names
- Show default values inline for bools and enums
- Use `(required)` after the type for required props
- Use `[Component]` for children arrays
- Protocol slug is kebab-case of wire type (e.g., `AreaChart` → `area-chart`)

## Writing Style

Code blocks — including component previews — are **illustrations**, not
documentation. They show *how* to do something. They do not teach concepts
or introduce features. Prose does that.

**Every feature section must have helpful prose**, preferably *before* the
code example. Explain what the feature does, why you'd use it, or what
behavior to expect. The one exception: discrete visual variants (e.g.
showing all button sizes, disabled states) where the preview speaks for
itself — there it's fine to lead with the visual example.

Use the `explain` skill liberally when writing docs to ensure quality and
conceptual clarity. That said, this is documentation, not a blog post.
Be concise and direct. We do want the wry, almost self-aware "this is...
Python... for front ends" tone that runs through the project.

## Content Rules

- Use Hitchhiker's Guide to the Galaxy references for placeholder content.
  Never use "Lorem ipsum" or marketing copy about the component itself.
- Do NOT add per-field "Supports interpolation" callouts. Interpolation is
  universal and documented centrally at `/patterns/interpolation`.

## Files to Keep Aligned

When the Python API or wire protocol changes, update all of these:

- `src/prefab_ui/components/<name>.py` — Python model (source of truth)
- `renderer/src/schemas/<name>.ts` — Zod schema
- `renderer/src/components/` — renderer
- `docs/components/<name>.mdx` — documentation
- `schemas/fixtures/components/<Name>.json` — test fixtures
- `skills/generative-prefab-ui/` — distributable skill for wire protocol generation
- `skills/writing-prefab-python/` — distributable skill for Python DSL usage

After any change: `prefab dev build-docs` then `uv run pytest tests/ -x`.
