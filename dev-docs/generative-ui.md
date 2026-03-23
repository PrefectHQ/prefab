# Generative UI

Prefab supports generative UI: an LLM writes Python code that builds a component tree, and the user sees it rendered in real time as the code streams in.

## Tree-building patterns

There are three ways to build a component tree, each suited to different contexts:

### Context managers (idiomatic)

Visual nesting mirrors the component hierarchy. The preferred style for both hand-written and LLM-generated code.

```python
with Column(gap=4) as root:
    Heading("Sales Report")
    with Row():
        Text("Revenue: $1.2M")
        Text("Growth: 15%")
```

Context managers also work for streaming — see "Streaming architecture" below.

### `parent=` (imperative)

Each line is an independent statement that attaches a component to a parent.

```python
root = Column(gap=4)
Heading("Sales Report", parent=root)
row = Row(parent=root)
Text("Revenue: $1.2M", parent=row)
Text("Growth: 15%", parent=row)
```

Useful for sandbox environments that don't support context managers (e.g. Monty). Also works for streaming, since each line is independently evaluable.

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

## Streaming architecture

The streaming model is "try to compile, execute on success":

1. The LLM streams tokens into a code buffer
2. On each new line, attempt `compile(buffer)` — if it succeeds, the code is syntactically valid
3. Execute the buffer in the sandbox, producing a component tree
4. Serialize and send to the renderer via `handleToolResult`
5. React's reconciliation diffs the new tree against the old — existing components stay mounted, new ones appear

Context managers work for streaming because a `with` block with children is valid Python as soon as the block's indentation ends. The full buffer is re-executed each time, producing a fresh tree. This is cheap — component construction is microseconds.

The renderer already supports full tree replacement. Each `handleToolResult` call replaces the view and React diffs it. No renderer changes are needed.

## Sandbox: Pyodide via Deno

LLM-generated code is untrusted and must run in a sandbox. Pyodide via Deno provides the best fit for Prefab's needs:

- **Full CPython** — context managers, `.rx`, classes, Pydantic, real Prefab code
- **Pydantic works** — pydantic-core publishes emscripten/WASM wheels
- **Proven** — the FastMCP playground already runs Prefab in Pyodide
- **WASM security** — V8's WASM sandbox has billions of hours of security scrutiny
- **Persistent process** — pay the ~3s cold start once, keep the Deno subprocess warm

The sandbox provider lives in FastMCP (which owns the `SandboxProvider` protocol), not in Prefab. A `PyodideSandboxProvider` wraps a persistent Deno subprocess with Prefab pre-loaded. Code goes in as JSON over stdin, results come back on stdout.

We hope to support Monty once it has more coverage of the Python features that Prefab uses (classes, context managers). Monty's microsecond startup and snapshotting capabilities would be ideal for this use case.

## Next steps

1. **`PyodideSandboxProvider` in FastMCP** — persistent Deno subprocess, JSON stdin/stdout, Prefab pre-loaded
2. **Streaming integration** — wire the "try to compile" loop to the provider, push intermediate trees via `handleToolResult`
3. **Error boundaries** — when LLM code fails mid-stream, show what was built so far plus an error indicator
