# Simulator Reference

Headless testing without a browser or MCP client.

```python
from prefab_ui.testing import Simulator, ActionResult
```

## Setup

Define a tool handler and create a Simulator:

```python
async def handler(name: str, arguments: dict) -> ActionResult:
    if name == "search_users":
        query = arguments.get("q", "")
        users = [u for u in ALL_USERS if query.lower() in u["name"].lower()]
        return ActionResult(content={"results": users})
    return ActionResult(is_error=True, error_text=f"Unknown tool: {name}")

sim = Simulator(handler)
```

## Loading a UI

```python
await sim.invoke("my_ui_tool", {"page": "users"})
```

This calls the tool, loads the returned UIResponse, and populates
`sim.state` with initial state.

## Finding Components

```python
button = sim.find("Button", label="Search")       # first match
input_field = sim.find("Input", name="query")
all_cards = sim.find_all("Card")                   # all matches
form = sim.find("Form")
```

Match by `type` (first arg) and any props as kwargs.

## Simulating Interactions

```python
await sim.set_value(input_field, "alice")    # set value + trigger onChange
await sim.click(button)                       # trigger onClick
await sim.submit(form)                        # trigger onSubmit
```

## Verifying State

```python
assert sim.state["query"] == "alice"
assert len(sim.state["results"]) > 0
assert sim.state["results"][0]["name"] == "Alice"
```

## Checking Toasts

```python
assert len(sim.toasts) == 1
assert sim.toasts[0]["message"] == "Saved!"
assert sim.toasts[0]["variant"] == "success"
```

## ActionResult

```python
# Success — content is a dict (typically matching UIResponse.to_json() or state)
ActionResult(content={"users": [...]})
ActionResult(content={"state": {"result": "value"}, "view": {...}})

# Error
ActionResult(is_error=True, error_text="Not found")
```

## Methods Summary

| Method | Description |
|--------|-------------|
| `invoke(tool, args)` | Call tool, load returned UI |
| `find(type, **props)` | First matching component |
| `find_all(type, **props)` | All matching components |
| `click(component)` | Trigger onClick |
| `set_value(component, value)` | Set value + trigger onChange |
| `submit(form)` | Trigger onSubmit |
| `state` | Current state dict |
| `toasts` | List of toasts shown |
