# Prefab Vision

## What Prefab Is

Prefab is a transport-agnostic UI library that turns Python into interactive
web interfaces. The core pipeline: **Python DSL → JSON → React renderer**.

The Python side produces a JSON component tree. The renderer compiles it to
React in the browser. Transport adapters handle server communication. The
result is that Python developers can describe rich, interactive UIs without
touching JavaScript, HTML, or a frontend build system.

## Why It Exists

The flagship use case is building **MCP Apps** for FastMCP. The MCP Apps
extension (SEP-1865) lets MCP servers deliver interactive UIs to hosts via
sandboxed iframes. These iframes receive a static HTML bundle, communicate
via postMessage, and access server data through tool calls proxied by the
host. No WebSocket, no persistent Python process — the bundle is
self-contained.

Existing Python UI frameworks assume a live backend the UI can call into —
a running server, a WebSocket, a persistent process. MCP Apps doesn't work
that way. Prefab fills that gap: a Python DSL that compiles to a static
bundle with a client-side renderer that handles data binding, state, and
actions entirely in the browser.

Prefab was extracted from FastMCP so it can serve any backend — not just MCP
servers. The JSON-in, React-out architecture is transport-agnostic by design.

## Transports

Prefab supports three transport stories. MCP is the primary driver and
dominates prioritization, but the architecture supports all three.

### 1. MCP (Primary)

Two developer experiences, both wired up through FastMCP:

**Mini-app (shorthand).** A tool returns a `UIResponse` containing a Prefab
component tree. FastMCP automatically registers a renderer resource, sets
`_meta.ui` on the tool, and packs the view into `structuredContent` under a
`view` key. The renderer reads the view description from the tool
result and renders it dynamically.

```python
@mcp.tool()
async def list_users() -> UIResponse:
    users = await db.get_users()
    with DataTable(data=users, sortable=True) as view:
        pass
    return UIResponse(view=view, state={"users": users})
```

**FastMCP App (class-based).** A dedicated class that implements a FastMCP
provider. Has its own tools, a `layout()` method that defines the static
component tree, and state. The layout is compiled once at server start and
embedded in the renderer. Tools return data that flows into data-bound
components.

```python
class UsersApp(FastMCPApp):
    def layout(self):
        with Pages() as pages:
            with Page(name="list", data=self.list_users):
                DataTable(sortable=True)
            with Page(name="detail", data=self.get_user):
                Heading("{{ name }}")
                Text("{{ email }}")
        return pages

    @tool
    async def list_users(self) -> list[dict]:
        return await db.get_users()
```

**What lives where:**
- **Prefab**: Python DSL, JSON serialization, renderer, MCP transport
  adapter in the renderer (since the renderer must speak MCP protocol)
- **FastMCP**: `ui://` resource registration, extension negotiation,
  `_meta.ui` wiring, `structuredContent` formatting, `FastMCPApp` provider
  class, `convert_result()` (UIResponse → MCP ToolResult)
- **Install**: `pip install fastmcp[apps]` pulls in `prefab-ui`

### 2. REST / FastAPI

A route returns a Prefab component → that becomes the UI. Interactions call
other routes and use their results to update the UI.

```python
@app.get("/users")
async def users_page():
    users = await db.get_users()
    with DataTable(data=users, sortable=True) as view:
        pass
    return UIResponse(view=view, state={"users": users}).to_json()
```

The renderer fetches the JSON and renders it. Server-bound actions use a REST
transport adapter that makes HTTP requests instead of postMessage calls.

**Design considerations:**
- No host intermediary (unlike MCP where the host proxies everything)
- Renderer makes direct HTTP requests → needs base URL, CORS, possibly auth
- Action mapping: MCP has `tools/call` and `ui/message`; REST has endpoints
- May need a convention (e.g., `/prefab.json` manifest) for endpoint discovery
- FastAPI integration is a convenience; arbitrary REST backends also work

### 3. Generative UI

An agent constructs Prefab JSON (either directly or via the Python DSL) and
sends it through an MCP tool. The host renders it as an MCP app. This is
the "tool that accepts arbitrary UI JSON" pattern — the agent decides what
the user sees, not a predefined layout.

This is nearly free once the core pipeline works — the renderer already
handles dynamic mode. The MCP tool that accepts Prefab JSON lives in
FastMCP.

**Relationship to A2UI.** Google's A2UI protocol tackles a similar problem:
agents send structured JSON component descriptions, clients render them
natively. A2UI implements a subset of Prefab's interactivity model (its
standard catalog is ~18 components with basic data binding). We're exploring
interop — Prefab could emit A2UI-compatible JSON as an output format,
making Prefab a Python authoring layer for A2UI renderers — but Prefab's
generative UI story is broader than any single protocol.

## The Renderer

A single React application (TypeScript, Vite, Tailwind, shadcn/Radix) that
interprets Prefab's JSON component format and renders interactive UIs.

**Key architectural properties:**
- Self-contained: builds to a single HTML file via vite-plugin-singlefile
- Transport-agnostic action dispatch: actions go through a transport interface
- Client-side state management with `{{ field }}` template interpolation
- Dark/light theme support via CSS variables (shadcn pattern)
- Component registry maps JSON type names to React components

**Transport interface:** The renderer's action system dispatches through a
pluggable transport. A `CallTool("list_users", {id: "123"})` doesn't know
whether it resolves via postMessage (MCP) or fetch (REST). The transport
adapter is selected at renderer initialization based on the embedding context.

**Two rendering modes:**
- **Layout-embedded**: Static JSON layout baked into the bundle at compile
  time (for class-based apps)
- **Dynamic**: View description arrives with each tool result in
  `structuredContent.view` (for mini-apps)

## Transport Abstraction

The load-bearing design decision. The renderer needs a transport interface:

```typescript
interface Transport {
  callTool(name: string, args: Record<string, unknown>): Promise<ToolResult>;
  sendMessage?(text: string): Promise<void>;
  updateContext?(context: Record<string, unknown>): Promise<void>;
}
```

**MCP transport**: Sends JSON-RPC over postMessage to the host, which proxies
to the MCP server. Handles the full MCP Apps protocol (init handshake, tool
notifications, host context, teardown).

**REST transport**: Makes HTTP requests to API endpoints. Needs base URL
configuration. Action names map to endpoint paths.

**Preview transport**: For CLI dev mode. Runs a local server that the
renderer talks to directly.

Whether we can truly unify MCP and REST under one interface is an open
question. MCP has capabilities REST doesn't (resources, prompts,
`ui/message`, `ui/update-model-context`). REST has capabilities MCP doesn't
(direct HTTP, streaming responses, file uploads). The transport interface
may need to be the intersection plus optional extensions.

## CLI

The Prefab CLI supports development workflows:

- **`prefab preview <file.py>`**: Render a Python UI file in the browser.
  Spins up a local server for the renderer to talk to. No MCP server or
  backend required — just write a UI and see it.
- **`prefab compile <file.py>`**: Compile Python DSL to JSON. Useful for
  debugging, testing, and piping into other tools.
- **`prefab dev`**: Development server with hot reload. Used by the docs
  build pipeline.
- **`prefab build`**: Build the renderer bundle (development-time only).

## Testing Strategy

Two layers of testing, plus integration:

**Python → JSON**: Test that the Python DSL produces correct JSON. Component
serialization, action models, UIResponse building, context manager nesting.
These are fast, pure Python tests.

**JSON → rendered UI**: Test that the renderer correctly interprets JSON and
produces the right DOM. Component rendering, state management, action
dispatch, template interpolation. These are JavaScript tests (vitest).

**Integration (Simulator)**: The `Simulator` class drives a full round-trip.
It accepts a callable handler, renders UI, simulates user interactions
(click, set_value, submit), and verifies outcomes. Transport-agnostic — the
handler is a protocol, not an MCP client. FastMCP provides an MCP-specific
adapter.

**Visual testing**: The docs serve as visual regression tests. Each component
page has live previews rendered by the actual renderer.

## State and Reactivity

Current: explicit state management with `SetState`/`ToggleState` actions and
`{{ field }}` interpolation from state. Components read state, actions
update it.

Future exploration: direct reactive data binding where components
automatically refetch when dependencies change, without explicit action
wiring. This would reduce boilerplate for common patterns but adds
complexity. Not blocking for v1.

## Key Renames from FastMCP

| FastMCP | Prefab |
|---------|--------|
| `AppResult` | `UIResponse` |
| `CallTool` | `CallTool` |
| `_fastmcp_view` | `view` |
| `_fastmcp` reserved prefix | (none — clean keys) |
| `FASTMCP_RENDERER_URL` | `PREFAB_RENDERER_URL` |

## What's Built

- Python DSL: all ~35 components, all actions, UIResponse, context manager syntax
- Renderer: full React/TypeScript app with shadcn components, state management,
  action dispatch, template interpolation, dark mode
- Testing: Simulator with transport-agnostic handler protocol
- Docs: Mintlify site with live component previews
- Build infrastructure: Vite, vitest, pytest, ruff, ty, justfile

## What's Next (Priority Order)

1. **Testing the core pipeline** — Python→JSON and JSON→UI test coverage
2. **MCP transport in renderer** — Wire up the MCP Apps protocol (init
   handshake, postMessage, tool notifications). Currently the renderer has
   `app.tsx` with MCP adapter code carried over from FastMCP.
3. **FastMCP integration** — Make `fastmcp[apps]` work: UIResponse →
   ToolResult conversion, `ui://` resource registration, extension
   negotiation, FastMCPApp provider class
4. **CLI preview mode** — `prefab preview` for standalone development
5. **REST transport** — Design the convention, build the adapter
6. **Generative UI** — MCP tool that accepts Prefab JSON (mostly a FastMCP
   feature). Explore A2UI interop as an output format.
