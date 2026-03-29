# Generative UI Architecture

## Overview

Generative UI means an LLM writes Prefab Python code that gets executed and rendered as a live UI. Prefab exposes two primitives to make this possible. Transport layers (FastMCP, FastAPI, etc.) wire them together according to their own streaming models.

## Prefab's Two Primitives

### 1. Server-side: `prefab_ui.sandbox.Sandbox`

Executes untrusted Prefab Python code in a Pyodide WASM sandbox. Code goes in, wire protocol JSON comes out. The sandbox is a persistent Deno subprocess — ~2s cold start, ~1ms warm execution, auto-restarts on crash.

```python
from prefab_ui.sandbox import Sandbox

sandbox = Sandbox()  # starts lazily on first .run()

wire = await sandbox.run('''
    from prefab_ui.components import Column, Heading, Slider, Text
    from prefab_ui.app import PrefabApp

    with Column(gap=4) as view:
        Heading("Dashboard")
        slider = Slider(value=75, name="conf")
        Text(f"Confidence: {slider.rx}%")

    app = PrefabApp(view=view, state={"conf": 75})
''', data={"revenue": 1_200_000})

# wire is a dict: {"$prefab": {"version": "0.2"}, "view": {...}, "state": {...}}
```

The sandbox handles:
- Full CPython execution (context managers, `.rx`, Rx pipes, computation)
- Data injection (values passed as `data=` become global variables)
- Namespace isolation between runs
- Error propagation (raises `RuntimeError` with the Python traceback)
- Result extraction (finds the root PrefabApp or Component automatically)

The sandbox does NOT handle:
- Streaming / progressive execution — it runs complete code and returns the full result
- Transport — it doesn't know how code arrives or where JSON goes

`PrefabApp.from_json(wire)` wraps the sandbox output for consumers that need a PrefabApp instance (e.g., FastMCP's `app=True` pipeline). Supports overrides: `PrefabApp.from_json(wire, state={"extra": "value"})`.

### 2. Client-side: Renderer Python execution hook

The Prefab renderer gains the ability to receive Python code, execute it in browser-side Pyodide, and render the resulting component tree. This is a renderer capability — it does not know about MCP, WebSockets, or any transport.

The hook's contract:
- **Input:** A string of Prefab Python code (possibly incomplete/partial)
- **Behavior:** Execute the code in browser Pyodide, extract the component tree, render it
- **Error handling:** Partial/incomplete code will frequently fail. The hook silently catches errors and keeps the last successful render. Each invocation is a best-effort attempt with a fresh namespace.
- **Lifecycle:** Pyodide loads lazily on first invocation. The renderer works without it — if Pyodide never loads (or hasn't loaded yet), the renderer still handles normal JSON via `ontoolresult`.

Implementation notes:
- The playground (`renderer/src/playground/pyodide.ts`) already solves loading Prefab into browser Pyodide: load pydantic from Pyodide's built-in packages, mount Prefab source files to the virtual filesystem
- The harness logic (find root component, extract JSON, reset component stack) mirrors what the server-side `runner.js` does
- The React rendering code is shared — both paths produce a component tree JSON that the existing `RenderNode` component handles

The renderer's unified bridge registers `ontoolinputpartial` and `ontoolinput` handlers automatically. Pyodide loads lazily on the first streaming partial — non-generative tools never trigger it, so there's zero overhead unless the host actually sends code partials.

## How Transports Wire These Together

### FastMCP (MCP transport)

FastMCP uses MCP Apps (SEP-1865). The host creates the View iframe and calls the tool **in parallel** — the app is running and receiving streaming partial arguments before the server is even contacted.

**One tool is sufficient:**

```python
@mcp.tool(app=AppConfig(resource_uri="ui://prefab/generative.html"))
async def generate_ui(code: str) -> PrefabApp:
    """Generate a custom UI from Prefab Python code."""
    wire = await sandbox.run(code)
    return PrefabApp.from_json(wire)
```

The sequence:

1. LLM starts generating `generate_ui(code="...")`
2. Host sees `_meta.ui.resourceUri` → creates the View iframe immediately
3. View initializes, starts loading Pyodide in the background
4. Host calls `tools/call` on the MCP server (in parallel with 2–6, per spec)
5. `tool-input-partial` fires repeatedly as the LLM streams the `code` argument
6. The generative renderer extracts the partial `code` string and feeds it to its Pyodide execution hook — the user watches the UI build up
7. `tool-input` fires with complete arguments
8. Server finishes running code through `Sandbox` for validation
9. `tool-result` fires — renderer replaces the streaming preview with the server-validated render

The host's parallel loading means Pyodide has the entire duration of the LLM's code generation to cold-start (~3s). By the time the first meaningful partial arrives, Pyodide should be ready.

**The `ontoolinputpartial` → Pyodide hook wiring is entirely inside the generative renderer's JavaScript.** The renderer handles `ontoolinputpartial` from the MCP App SDK, extracts `params.arguments.code`, and feeds it to the Pyodide execution hook. FastMCP doesn't need to wire anything.

**FastMCP's responsibilities:**
- Register the generative renderer as a `ui://` resource
- Handle CSP for Pyodide CDN (`wasm-unsafe-eval`, jsdelivr domain)
- Provide a convenience shorthand (e.g., `app="generative"`) alongside `app=True`

**FastMCP does NOT need to:**
- Know how Pyodide works internally
- Wire `ontoolinputpartial` to anything — the renderer handles this itself
- Parse or compile Python
- Manage the sandbox — that's Prefab's `Sandbox` class if the server chooses to validate

### FastAPI (HTTP/WebSocket transport)

A FastAPI server has direct control over the connection. It can stream progressive results to the client without the two-tool indirection.

**The pattern:**
1. Client connects via WebSocket
2. Server receives code chunks as the LLM streams them
3. After each compilable statement, server runs the accumulated code through `Sandbox`
4. Server pushes the resulting wire JSON to the client
5. Client renderer receives JSON and renders (standard `RenderNode`, no browser Pyodide needed)

In this model, the server does the execution and the client is a pure JSON renderer. No browser Pyodide required because the server handles the "try to compile, execute on success" loop.

Alternatively, a FastAPI server could serve the Pyodide-capable renderer and let the browser handle execution — same as the MCP model but over a different transport for the code delivery.

### Other transports

Any system that can deliver code to one of the two primitives works:
- **CLI:** Run code through `Sandbox`, open the result in a browser via `PrefabApp.html()`
- **Batch:** Run code through `Sandbox`, store wire JSON for later rendering
- **Notebook:** Run code through `Sandbox`, render inline via the renderer's `mountPreview`

## What Prefab Needs to Build

### Already done
- [x] `prefab_ui.sandbox.Sandbox` — server-side Pyodide execution via Deno
- [x] `PrefabApp.from_json(wire)` — wraps sandbox output for transport consumption
- [x] `$prefab` self-identifying envelope
- [x] `parent=` kwarg for imperative tree-building
- [x] Playground Pyodide integration (proof that Prefab runs in browser Pyodide)
- [x] **Renderer Python execution hook** — the client-side primitive. Takes Python code, executes it in browser Pyodide, renders the result. Error-tolerant, lazy Pyodide loading, fresh namespace per invocation.
- [x] **Generative capability in the unified renderer** — the single renderer handles `ontoolinputpartial` directly from the MCP App SDK (extracts `params.arguments.code`, feeds to Pyodide hook). Pyodide loads lazily on first streaming partial — zero cost for non-generative tools. There is no separate "generative renderer bundle"; generative is a capability of the unified renderer, delivered via CDN or bundled like everything else.

### Needed
- [ ] **User-facing documentation** — conceptual doc explaining generative UI, the sandbox, and how to build a generative UI server

## What FastMCP Needs to Build

- [ ] **Renderer resource** — register the renderer as a `ui://` resource. The same renderer handles both standard and generative tools.
- [ ] **CSP configuration** — for generative tools, allow `wasm-unsafe-eval` and Pyodide CDN domains. For CDN-delivered renderers, allow the jsDelivr origin. `get_renderer_csp()` / `get_generative_renderer_csp()` return the right domains.
- [ ] **Convenience shorthand** — `app="generative"` alongside `app=True` to signal that the tool uses streaming code execution (affects CSP, not renderer selection)
- [ ] **Documentation + example** — `generate_ui(code: str)` tool pattern
