# Action Reference

Actions go on event props (`onClick`, `onChange`, `onSubmit`). Every action
supports `onSuccess` and `onError` callbacks (action or array of actions).

Pass an array for sequential chaining — first error short-circuits:

```json
"onClick": [
  {"action": "setState", "key": "loading", "value": true},
  {"action": "toolCall", "tool": "save", "resultKey": "saved"},
  {"action": "setState", "key": "loading", "value": false}
]
```

---

## setState (client-side)

Set a state value.

| Prop | Required | Default | Description |
|------|----------|---------|-------------|
| `key` | yes | | State key |
| `value` | no | `"{{ $event }}"` | Value to set |

```json
{"action": "setState", "key": "count", "value": "{{ count + 1 }}"}
{"action": "setState", "key": "selected", "value": "{{ $item }}"}
{"action": "setState", "key": "query"}
```

## toggleState (client-side)

Flip a boolean.

| Prop | Required |
|------|----------|
| `key` | yes |

```json
{"action": "toggleState", "key": "showAdvanced"}
```

## showToast (client-side)

Display a toast notification.

| Prop | Required | Description |
|------|----------|-------------|
| `message` | yes | Toast text |
| `description` | no | Secondary text |
| `variant` | no | `"default"` `"success"` `"error"` `"warning"` `"info"` |
| `duration` | no | Auto-dismiss in ms |

```json
{"action": "showToast", "message": "Saved!", "variant": "success"}
{"action": "showToast", "message": "{{ $error }}", "variant": "error"}
```

## openLink (client-side)

Navigate to a URL.

| Prop | Required |
|------|----------|
| `url` | yes |

```json
{"action": "openLink", "url": "https://example.com/{{ itemId }}"}
```

## toolCall (MCP round-trip)

Call a server tool. This is the primary way UIs fetch data and trigger
server logic.

| Prop | Required | Description |
|------|----------|-------------|
| `tool` | yes | Server tool name |
| `arguments` | no | Object; values support `{{ }}` interpolation |
| `resultKey` | no | State key to store the tool's return value |

`resultKey` is critical: it writes server data into client state, triggering
reactive re-renders in any component referencing that key.

```json
{
  "action": "toolCall",
  "tool": "search_users",
  "arguments": {"q": "{{ query }}", "limit": 20},
  "resultKey": "results",
  "onSuccess": {"action": "showToast", "message": "Found {{ results.length }} users"},
  "onError": {"action": "showToast", "message": "{{ $error }}", "variant": "error"}
}
```

## sendMessage (MCP round-trip)

Send a message to the chat.

| Prop | Required |
|------|----------|
| `content` | yes |

```json
{"action": "sendMessage", "content": "Analyze {{ selectedItem }}"}
```

## updateContext (MCP round-trip)

Silently update model context without triggering a chat response.

| Prop | Required | Description |
|------|----------|-------------|
| `content` | no | Text content |
| `structuredContent` | no | Object content |

```json
{"action": "updateContext", "content": "User selected {{ item }}"}
```

## Lifecycle Callbacks

Any action can chain `onSuccess` and `onError`:

```json
{
  "action": "toolCall", "tool": "delete",
  "arguments": {"id": "{{ selectedId }}"},
  "onSuccess": [
    {"action": "showToast", "message": "Deleted", "variant": "success"},
    {"action": "toolCall", "tool": "refresh", "resultKey": "items"}
  ],
  "onError": {"action": "showToast", "message": "{{ $error }}", "variant": "error"}
}
```

Callbacks can have their own callbacks (recursive, depth-limited to 10).
