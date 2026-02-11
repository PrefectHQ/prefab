---
name: generative-prefab-ui
description: >
  Build generative UIs with the Prefab wire protocol. Prefab describes
  interactive React component trees as JSON — use this skill when you need
  to produce a Prefab protocol response, build a generative UI for an MCP
  tool, supply a component tree to a Prefab renderer, or construct
  interactive interfaces as structured JSON. If you are writing Python code
  that uses the prefab_ui library, use the writing-prefab-python skill.
---

# Building Generative UIs with Prefab

Prefab is a JSON wire protocol that describes a React component tree. You
produce JSON; a renderer turns it into a live React application with
shadcn/ui components, Tailwind CSS, client-side state, and interactive
actions. Think of it as writing a React app, but as nested JSON objects
instead of JSX.

## Protocol Envelope

```json
{
  "version": "0.2",
  "view": { "type": "Column", "children": [...] },
  "state": { "query": "", "results": [] },
  "defs": { "my-template": { "type": "Card", "children": [...] } }
}
```

- `version` — always `"0.2"`
- `view` — root component tree (required)
- `state` — initial client-side state (optional)
- `defs` — named reusable templates (optional)

## Components

Every component is `{"type": "ComponentName", ...props}`. Container
components (Column, Row, Card, Form, etc.) have a `children` array.

All components support `cssClass` (Tailwind classes). For conditional
rendering, use `Condition` (see Control Flow below).

```json
{
  "type": "Column", "cssClass": "gap-4 max-w-2xl",
  "children": [
    {"type": "Heading", "content": "Dashboard", "level": 1},
    {"type": "Text", "content": "Hello, {{ user.name }}!"},
    {"type": "Condition", "cases": [{"when": "loading", "children": [{"type": "Spinner"}]}]}
  ]
}
```

For the full component catalog, see [references/components.md](references/components.md).

## State

State is a client-side key-value store. Three ways it gets populated:

1. **Initial state** — the envelope's `state` field
2. **Form auto-sync** — components with `name` auto-write to state (e.g. `Input[name="email"]` keeps `state.email` current)
3. **resultKey** — `toolCall` actions write server responses into state

## Expressions

String props support `{{ expression }}` templates that resolve against state:

```json
{"type": "Text", "content": "{{ user.name }}"}
{"type": "Text", "content": "{{ items.length }} items ({{ total | currency }})"}
{"type": "Button", "label": "{{ loading ? 'Loading...' : 'Submit' }}"}
```

Supports dot paths, arithmetic (`+` `-` `*` `/`), comparisons (`==` `!=`
`>` `<` `>=` `<=`), logical (`&&` `||` `!`), ternary (`? :`), string
concat (`+`), and pipes (`| upper`, `| currency`, `| length`, etc.).

For the full expression reference, see [references/expressions.md](references/expressions.md).

## Actions

Actions go on event props (`onClick`, `onChange`, `onSubmit`). All actions
support `onSuccess` and `onError` callbacks. Chain as arrays for sequential
execution.

The most important actions:

**toolCall** — call a server tool, store result in state:
```json
{
  "action": "toolCall", "tool": "search_users",
  "arguments": {"q": "{{ query }}"},
  "resultKey": "results",
  "onError": {"action": "showToast", "message": "{{ $error }}", "variant": "error"}
}
```

**setState** — set a state value (client-side, instant):
```json
{"action": "setState", "key": "loading", "value": true}
```
Value defaults to `"{{ $event }}"` (the triggering interaction's value).

**showToast** — notification:
```json
{"action": "showToast", "message": "Saved!", "variant": "success"}
```

For all actions and chaining patterns, see [references/actions.md](references/actions.md).

## Control Flow

**Condition** — conditional rendering. Each `case` has a `when` expression
and `children` that render when truthy. An optional `else` array renders
when no case matches:

```json
{
  "type": "Condition",
  "cases": [
    {"when": "status == 'error'", "children": [{"type": "Badge", "label": "Error", "variant": "destructive"}]},
    {"when": "status == 'warning'", "children": [{"type": "Badge", "label": "Warning", "variant": "warning"}]}
  ],
  "else": [{"type": "Badge", "label": "OK"}]
}
```

A single-case Condition is fine for simple show/hide:
```json
{"type": "Condition", "cases": [{"when": "loading", "children": [{"type": "Spinner"}]}]}
```

**ForEach** repeats children per item in a state list. Templates inside
resolve against each item. `$index` and `$item` are available:

```json
{
  "type": "ForEach", "key": "users",
  "children": [{"type": "Text", "content": "{{ $index + 1 }}. {{ name }} — {{ email }}"}]
}
```

**Define/Use** creates reusable subtrees. Define in the envelope's `defs`,
reference with `{"$ref": "name"}`:

```json
{
  "defs": {
    "user-card": {"type": "Card", "children": [
      {"type": "CardTitle", "content": "{{ name }}"}
    ]}
  },
  "view": {"type": "ForEach", "key": "users", "children": [{"$ref": "user-card"}]}
}
```

## Complete Example

```json
{
  "version": "0.2",
  "state": {"query": "", "results": []},
  "view": {
    "type": "Column", "cssClass": "gap-6",
    "children": [
      {"type": "Heading", "content": "User Search", "level": 1},
      {"type": "Row", "cssClass": "gap-2", "children": [
        {"type": "Input", "name": "query", "placeholder": "Search..."},
        {"type": "Button", "label": "Search", "onClick": {
          "action": "toolCall", "tool": "search_users",
          "arguments": {"q": "{{ query }}"}, "resultKey": "results",
          "onError": {"action": "showToast", "message": "{{ $error }}", "variant": "error"}
        }}
      ]},
      {"type": "Condition", "cases": [{"when": "results.length > 0", "children": [
        {"type": "DataTable",
          "columns": [
            {"key": "name", "header": "Name", "sortable": true},
            {"key": "email", "header": "Email"},
            {"key": "role", "header": "Role", "sortable": true}
          ],
          "rows": "{{ results }}",
          "searchable": true, "paginated": true, "pageSize": 20
        }
      ]}, {"when": "query && results.length == 0", "children": [
        {"type": "Muted", "content": "No results."}
      ]}]}
    ]
  }
}
```
