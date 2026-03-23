# Generative UI

Prefab supports generative UI: an LLM writes Python code that builds a component tree, and the user sees it rendered in real time as the code streams in.

## Tree-building patterns

There are three ways to build a component tree, each suited to different contexts:

### Context managers (idiomatic)

Visual nesting mirrors the component hierarchy. The preferred style for hand-written code.

```python
with Column(gap=4) as root:
    Heading("Sales Report")
    with Row():
        Text("Revenue: $1.2M")
        Text("Growth: 15%")
```

Requires Python's `with` statement and relies on ContextVars internally.

### `parent=` (imperative)

Each line is an independent statement that attaches a component to a parent.

```python
root = Column(gap=4)
Heading("Sales Report", parent=root)
row = Row(parent=root)
Text("Revenue: $1.2M", parent=row)
Text("Growth: 15%", parent=row)
```

This exists for two reasons:

1. **Sandbox compatibility.** Monty (pydantic-monty) sandboxes Python execution but supports neither context managers nor ContextVars. The `parent=` pattern works purely through function calls and attribute mutation.

2. **Streaming evaluation.** When an LLM generates code token by token, each `Component(..., parent=root)` line can be evaluated as soon as it's complete — the UI builds up incrementally. With `children=[...]` you must wait for the closing bracket. With `with Column():` you need the entire block.

### `children=` (batch)

Pass children as a list at construction time.

```python
Column(gap=4, children=[
    Heading("Sales Report"),
    Row(children=[
        Text("Revenue: $1.2M"),
        Text("Growth: 15%"),
    ]),
])
```

Works in any environment but the entire tree must be complete before evaluation. Not suitable for streaming.

## Implementation: `parent=`

The `parent=` kwarg is handled in `Component.__init__` (`components/base.py`). It is not a Pydantic field — it's popped from kwargs before Pydantic ever sees it, so it never serializes.

The implementation uses "undo" rather than "prevent": `super().__init__()` runs normally (which may auto-attach the component to the context manager stack via `model_post_init`), then `__init__` removes the component from the stack parent and appends it to the explicit parent instead. This avoids introducing new ContextVars — the only ContextVar touched is the existing `_component_stack`, and only for cleanup.

When there's no active context manager (the common case for sandbox/streaming), there's no stack to undo — the component just appends to the explicit parent directly.

## Streaming architecture

The renderer already supports full tree replacement. Each time a tool result arrives via `handleToolResult` in `app.tsx`, the renderer replaces the view and React's reconciliation diffs it — existing components stay mounted, new ones appear. No renderer changes are needed for streaming.

The work for streaming is on the Python/FastMCP side: a streaming tool that yields progressively larger `PrefabApp` objects as the LLM generates more code. Each yield sends an updated tree to the renderer.

## Monty shims

Monty doesn't support classes, so Prefab components are exposed as plain functions that call real constructors outside the sandbox:

```python
def make_shim(cls):
    def shim(**kwargs):
        return cls(**kwargs)
    return shim
```

Since `parent=` is handled natively by `Component.__init__`, the shims need no special logic — they just pass through kwargs.

## PR chain

This capability is being built across a series of PRs:

1. **`parent=` kwarg on Component** — the foundation
2. **Monty shims** — function wrappers exposing components to the sandbox
3. **Streaming tool execution** — FastMCP sends progressive tree updates during tool execution
4. **Error boundaries** — graceful handling of bad LLM-generated code mid-stream
