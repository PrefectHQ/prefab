# Prefab app tools and FastMCP

Prefab owns the interaction definition and browser execution. FastMCP owns
registration lookup and backend routing. The host selects an app's bridge;
no renderer-instance ID is passed in app-tool arguments.

The model-facing operation is discovered dynamically from the running app; it
is not a static tool registered by the MCP server. A callable-backed `AppTool`
uses the existing `toolCall` action to reach a normal FastMCP Python tool:

```text
agent → host → selected app bridge → AppTool actions
                                   → toolCall → host → FastMCP backend
```

The returned `PrefabApp` owns bindings and response behavior because those
refer to one view's state. The backend decorator remains responsible only for
registering the reusable Python function. No Python executes in the renderer.

## Resolver contract

`PrefabApp.to_json(tool_resolver=resolver)` scopes the resolver to that
serialization. The existing `prefab_ui.app.ResolvedTool` now has:

```python
@dataclass(frozen=True)
class ResolvedTool:
    name: str
    unwrap_result: bool = False
    local_name: str | None = None
    description: str | None = None
    input_schema: dict[str, Any] | None = None
```

FastMCP should resolve the callable against its actual registered tool:

- `name`: existing backend address, including namespace/hash routing.
- `local_name`: registered name before addressing, including custom names.
- `description`: registered description.
- `input_schema`: registered JSON Schema, after FastMCP parameter handling.
- `unwrap_result`: existing return-unwrapping behavior.

Name-only resolvers remain valid for ordinary `CallTool`. Callable-backed
`AppTool` requires `local_name` and `input_schema` unless explicitly supplied
with `name=` / `input_schema=`. Description is optional. Prefab never guesses
metadata by inspecting or executing the callable. Resolvers can be invoked more
than once during serialization (for a definition and its local references).

Register backend functions during server configuration, not during PrefabApp
construction. Existing app-only backend visibility and `model=True` semantics
stay unchanged. FastMCP must require a compatible Prefab version before passing
the added dataclass fields. Prefab imports no FastMCP modules.

## Authoring and wire format

```python
interaction = AppTool(
    increment,
    bind={"counter_id": STATE.counter_id},
    on_success=SetState("count", RESULT.count),
    result={"count": STATE.count},
)
app = PrefabApp(
    view=Button("Increment", on_click=interaction.invoke(amount=1)),
    state={"counter_id": "counter-a", "count": 0},
    app_tools=[interaction],
)
```

For a backend with an optional integer `amount=1`, this compiles to:

```json
{
  "name": "increment",
  "description": "Increment this counter",
  "inputSchema": {
    "type": "object",
    "properties": {"amount": {"type": "integer", "default": 1}},
    "required": [],
    "additionalProperties": false
  },
  "bind": {"counter_id": "{{ counter_id }}"},
  "actions": {
    "action": "toolCall",
    "tool": "counters_increment_abc123",
    "arguments": "{{ $event }}",
    "onSuccess": {"action": "setState", "key": "count", "value": "{{ $result.count }}"}
  },
  "result": {"count": "{{ count }}"}
}
```

The button's `onClick` is:

```json
{"action": "invokeAppTool", "tool": "increment", "arguments": {"amount": 1}}
```

The dispatcher validates caller arguments against `inputSchema`, rejects any
bound keys supplied by the caller, evaluates bindings from live state, and
merges them into `EVENT`. The existing `toolCall` action forwards that object.
Passing the whole object preserves omitted optional parameters; Python defaults
remain backend behavior. Bound parameters are removed from `properties` and
`required`, while nested schema references and defaults are preserved. Schemas
accepting additional properties also receive a `not` constraint forbidding bound
keys. Cross-parameter root constraints cannot be automatically projected; Prefab
fails clearly rather than silently weakening them.

Response callbacks execute before the explicit result is evaluated. The result
is returned as `structuredContent` and JSON text. Backend output schemas are not
inherited. Failures return `isError: true`; earlier effects are not rolled back.

## Execution and lifecycle

Both SDK calls and local `invokeAppTool` actions enter the same per-StateStore
queue. Independent apps have independent queues and registries. Nested app-tool
calls execute within their parent's slot and share cancellation; the existing
action depth limit prevents recursion from hanging the queue.

The SDK capability is advertised before connection, and payload delivery can
populate the registry after connection. Replacement or unmount clears the
registry, aborts pending requests, and prevents old callbacks from modifying the
new app. Cancellation does not undo backend operations already performed.

Prefab's standard renderer receives these definitions in the normal
`structuredContent` payload. Both the CDN and bundled renderer need to ship with
the Python change. Use `PREFAB_BUNDLED_RENDERER=1` for local integration testing.

## Integration acceptance

`examples/app_tools_backend.py` builds one counter view from a registered
`increment(counter_id: str, amount: int = 1)` function. Its result is an object
containing `count`. FastMCP should register that function once and return two
views with distinct stored counter IDs.

Prefab tests use an enriched resolver to produce
`renderer/src/testing/backend-counter-app.json`, then load the standard React
App twice with separate App/AppBridge connections. Button and SDK invocations
exercise the same definition. They cover isolated state, backend responses,
errors, repeated payloads, and closing one view while the other remains usable.
The host-side backend handler in these tests is a test implementation, not a
FastMCP server. A separate FastMCP 3.4.7 smoke test verifies that a named
browser-only counter's tool definitions and local calls survive the normal
tool-result path, and its UI resource serves the updated bundled renderer.
Callable metadata inference with FastMCP still requires the companion resolver
changes. Live-model verification requires a supporting host and is separate
from these SDK and serialization tests.
