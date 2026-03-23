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

Useful for environments that don't support context managers. Also works for streaming, since each line is independently evaluable.

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

## Sandbox: Pyodide via Deno

LLM-generated code is untrusted and must run in a sandbox. `prefab_ui.sandbox.Sandbox` runs code in a Pyodide WASM sandbox via a persistent Deno subprocess:

```python
from prefab_ui.sandbox import Sandbox

async with Sandbox() as sandbox:
    result = await sandbox.run(code, data={"sales": data})
```

Full CPython runs inside Pyodide — context managers, `.rx`, Pydantic validation, everything works identically to native Python. The Deno process stays warm between calls (~1ms per execution after the initial ~2s cold start).

### How it works

1. Deno starts a Pyodide WASM runtime and mounts Prefab source into the virtual filesystem
2. Code arrives as JSON over stdin, executes in a fresh namespace with injected data
3. The harness finds the root PrefabApp or Component and serializes it
4. Wire protocol JSON returns on stdout

### Streaming architecture

The streaming model is "try to compile, execute on success":

1. The LLM streams tokens into a code buffer
2. On each new line, attempt `compile(buffer)` — if it succeeds, the code is syntactically valid
3. Execute the buffer in the sandbox, producing a component tree
4. Serialize and send to the renderer
5. React's reconciliation diffs the new tree against the old — existing components stay mounted, new ones appear

Context managers work for streaming because a `with` block with children is valid Python as soon as the block's indentation ends. The full buffer is re-executed each time, producing a fresh tree.

We hope to support Monty once it has more coverage of the Python features that Prefab uses (classes, context managers). Monty's microsecond startup and snapshotting capabilities would be ideal for this use case.

## Example server

`examples/generative-ui/server.py` demonstrates the pattern with two MCP tools:

- **`execute_ui(code, data)`** — runs Prefab code in the sandbox, returns the rendered UI
- **`components(query)`** — searches the component library with import paths and field signatures
