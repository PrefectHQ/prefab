# Component Documentation Build System

This directory contains the build pipeline for Prefab component documentation. The system generates live HTML previews from Python code blocks, builds scoped Tailwind CSS, and bundles everything for the Mintlify docs site.

## Architecture

Components are Python classes in `src/prefab_ui/components/` that render to HTML strings. Documentation lives in `docs/apps/components/*.mdx` with live previews that show the actual rendered output, styled with Tailwind CSS scoped under `.prefab-preview`.

The build pipeline has four stages:

1. **Render previews** — Execute Python code blocks and inject HTML into `<ComponentPreview auto />` tags
2. **Generate content** — Render all component variants to HTML for Tailwind scanning
3. **Build CSS** — Run Tailwind CLI to generate utilities, then scope under `.prefab-preview`
4. **Bundle playground** — Package component source and CSS for the interactive playground

## Adding a New Component

### 1. Create the Component

**Location**: `src/prefab_ui/components/<name>.py`

Follow the established pattern:

```python
"""Component description."""

from __future__ import annotations
from typing import Any, Literal, overload
from pydantic import Field
from prefab-ui.apps.components.base import Component

_BASE_CLASSES = "rounded-lg border p-4"  # Tailwind classes

class MyComponent(Component):
    """Component docstring.

    Args:
        content: Main content (supports {{ field }} interpolation)
        variant: Style variant
        css_class: Additional CSS classes
    """

    content: str = Field(description="Content with {{ field }} interpolation")
    variant: Literal["default", "outline"] = Field(default="default")

    # Positional argument support (required for auto-rendering)
    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        if content is not None:
            kwargs["content"] = content
        super().__init__(**kwargs)

    def to_html(self, data: dict[str, Any] | None = None) -> str:
        text = self._escape(self._interpolate(self.content, data))
        return f'<div{self._class_attr(_BASE_CLASSES)}>{text}</div>'
```

**Key requirements**:

- Inherit from `Component` or `ContainerComponent`
- Define `_BASE_CLASSES` constant with Tailwind utilities
- Use `_class_attr(_BASE_CLASSES)` to merge with user `css_class`
- Support positional arguments via `@overload` + `__init__`
- Interpolate data with `_interpolate()`, escape with `_escape()`

### 2. Export from Package

**File**: `src/prefab_ui/components/__init__.py`

Add import and export:

```python
from prefab-ui.apps.components.my_component import MyComponent

__all__ = [
    # ... existing exports ...
    "MyComponent",
]
```

### 3. Add to Content Generator

**File**: `docs-build/generate_content.py`

Import and render all variants:

```python
from prefab-ui.apps.components import MyComponent

# ... later in the file ...

# MyComponent — every variant
for variant in ("default", "outline"):
    add(MyComponent("Example", variant=variant).to_html())
```

This ensures Tailwind scans all your classes during the CSS build.

### 4. Create Documentation Page

**File**: `docs/apps/components/<name>.mdx`

```mdx
---
title: My Component
description: Brief description of what it does.
icon: cube
---

import { ComponentPreview } from '/snippets/component-preview.mdx'

Intro paragraph explaining the component's purpose.

<ComponentPreview auto />

\`\`\`python Basic Example
from prefab-ui.apps.components import MyComponent

MyComponent("Hello World")
\`\`\`

## Variants

<ComponentPreview auto />

\`\`\`python Variants
from prefab-ui.apps.components import MyComponent, Row

with Row(gap=2):
    MyComponent("Default")
    MyComponent("Outline", variant="outline")
\`\`\`

## API Reference

<Card icon="code" title="MyComponent Parameters">
<ParamField body="content" type="str" required>
  Main content. Supports \`{{ field }}\` interpolation.
</ParamField>

<ParamField body="variant" type="str" default='"default"'>
  Visual style: \`"default"\` or \`"outline"\`.
</ParamField>

<ParamField body="css_class" type="str | None" default="None">
  Additional Tailwind CSS classes.
</ParamField>
</Card>
```

**Critical**:

- Import `ComponentPreview` at the top
- Use `<ComponentPreview auto />` before code blocks to auto-render
- Code blocks MUST include all imports (each block runs in isolation)
- Add descriptive titles to code blocks: `` ```python Basic Example ``

### 5. Add to Navigation

**File**: `docs/docs.json`

Add the page path to the appropriate group:

```json
{
  "group": "Components",
  "pages": [
    "apps/components/button",
    "apps/components/my-component",  // ← Add here
    "apps/components/badge"
  ]
}
```

### 6. Build Everything

Run the full build pipeline:

```bash
just generate-preview-css
```

This runs:

1. `render_previews.py` — Fills in auto preview HTML
2. `generate_content.py` — Renders all variants
3. Tailwind CLI — Generates utilities
4. `scope_css.py` — Wraps CSS under `.prefab-preview`
5. `generate_playground_bundle.py` — Packages source + CSS

### 7. Verify

Start the docs server:

```bash
cd docs && mintlify dev
```

Visit `http://localhost:3001/apps/components/my-component` to see your component.

## File Descriptions

| File | Purpose |
|------|---------|
| `render_previews.py` | Executes Python code blocks, captures rendered HTML, writes back to MDX `<ComponentPreview auto html={...} />` tags |
| `generate_content.py` | Renders every component variant to `content.html` so Tailwind knows which classes exist |
| `input.css` | Tailwind entry point — imports theme, defines inline theme values (radius, colors) |
| `scope_css.py` | Wraps Tailwind output in `.prefab-preview { ... }` using CSS nesting, prepends theme CSS and infrastructure |
| `generate_playground_bundle.py` | Serializes component source to JSON, inlines preview.css, writes to `playground.js` |
| `tailwind.config.js` | Tailwind v4 config — content paths, theme extensions |

## Key Files Outside This Directory

| File | Purpose |
|------|---------|
| `src/prefab-ui/apps/theme.css` | Canonical design tokens (OKLCH colors, dark mode, radius) used everywhere |
| `docs/css/preview.css` | Generated scoped CSS (committed) — loaded by Mintlify, inlined by playground |
| `docs/playground.js` | Generated bundle (committed) — component source + CSS for interactive playground |
| `docs/snippets/component-preview.mdx` | React component that renders preview HTML in a scoped div |
| `docs/component-bundle.js` | Links `ComponentPreview` snippet into Mintlify global context |

## CSS Scoping Strategy

Tailwind v4 utilities are scoped under `.prefab-preview` so they don't conflict with Mintlify's own styles. The scoping uses CSS nesting:

```css
/* Canonical tokens from src/prefab-ui/apps/theme.css */
:root { --foreground: oklch(...); }
.dark { --foreground: oklch(...); }

/* Container styling */
.prefab-preview {
  border: 1px solid var(--border);
  padding: 1.5rem;
}

/* Scoped utilities */
.prefab-preview {
  .bg-primary { background: var(--primary); }
  .rounded-lg { border-radius: var(--radius-lg); }
  /* ... thousands of utilities ... */
}
```

Every preview is wrapped in `<div class="prefab-preview">`, so utilities only match inside previews.

## Playground Architecture

The interactive playground (`/servers/apps/playground`) runs Python code in the browser via Pyodide. The architecture:

1. **Component bundle** — `window.__PLAYGROUND_BUNDLE` contains all component source as JSON
2. **Scoped CSS** — `window.__PLAYGROUND_CSS` contains the full `preview.css` content
3. **Main page** → **Blob iframe** → **Preview iframe** data flow via `postMessage`

When you change component source:

```bash
just generate-preview-css  # Regenerates both playground.js and preview.css
```

## Common Issues

### Preview not rendering

- **Missing import**: Code blocks run in isolation — add `from prefab-ui.apps.components import ...` to every block
- **No positional arg**: Component must support `Component("content")` syntax via `__init__` overloads
- **Render script error**: Check `uv run docs-build/render_previews.py` output for exceptions

### CSS classes not working

- **Not in content.html**: Add variant to `generate_content.py`
- **Arbitrary value with nested parens**: Tailwind v4 scanner can't parse `rounded-[min(var(--x),10px)]` — use named theme values instead
- **Conflicting classes**: Use `merge_tw_classes()` or rely on `_class_attr()` to resolve conflicts

### Playground not updating

- **Stale bundle**: Run `just generate-preview-css` to regenerate `playground.js`
- **Browser cache**: Hard refresh (Cmd+Shift+R) to reload the bundle

## Testing Components

Component tests live in `tests/apps/components/`. See `tests/apps/components/test_button.py` for the pattern:

```python
from prefab-ui.apps.components import Button

def test_button_default():
    btn = Button("Click")
    html = btn.to_html()
    assert "Click" in html
    assert "bg-primary" in html
```

Run tests:

```bash
uv run pytest tests/apps/ -x
```

## Workflow Summary

1. Create component in `src/prefab_ui/components/<name>.py`
2. Export from `__init__.py`
3. Add to `generate_content.py`
4. Create `docs/apps/components/<name>.mdx`
5. Add to `docs/docs.json` navigation
6. Run `just generate-preview-css`
7. Start docs: `cd docs && mintlify dev`
8. Verify at `http://localhost:3001/apps/components/<name>`
9. Commit everything (including generated files)
