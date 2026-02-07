<div align="center">

<img src="docs/assets/banner.png" alt="Prefab" width="700">

**Build UIs in Python. Compile them to React.**

*Made with 💙 by [Prefect](https://www.prefect.io/)*

[![PyPI - Version](https://img.shields.io/pypi/v/prefab-ui.svg)](https://pypi.org/project/prefab-ui)
[![Tests](https://github.com/prefecthq/prefab/actions/workflows/run-tests.yml/badge.svg)](https://github.com/prefecthq/prefab/actions/workflows/run-tests.yml)
[![License](https://img.shields.io/github/license/prefecthq/prefab.svg)](https://github.com/prefecthq/prefab/blob/main/LICENSE)

</div>

---

Prefab is a Python DSL for building interactive UIs that compile to React. You describe your interface as a tree of Python components, and Prefab turns it into JSON that a React renderer compiles into a live, interactive application.

```python
from prefab_ui import UIResponse, Column, Heading, Text
from prefab_ui.components import Card, CardContent, Input, Button, Row
from prefab_ui.actions import ToolCall

def search_dashboard(query: str = "") -> UIResponse:

    with Column() as view:
        Heading("Search")
        
        with Row():
            Input(name="query", placeholder="Search...")
            Button(
                "Go",
                on_click=ToolCall(
                    name="search",
                    arguments={"q": "{{ query }}"},
                    result_key="results",
                ),
            )
        
        with Card():
            with CardContent():
                Text("{{ results.length }} results found")

    return UIResponse(
        state={"query": query, "results": []},
        view=view,
    )
```

This returns a `UIResponse` — a bundle of a component tree and client-side state. State is template-interpolated into the view (`{{ query }}`), and actions like `ToolCall` wire up interactivity: clicking "Go" calls a server function, and the result lands back in state under `results`.

The Python side produces JSON. The React side renders it. The transport between them is your choice.

## Why Prefab

MCP server authors shouldn't have to leave Python to give users a real interface. But rich UIs typically mean a separate frontend stack — a bundler, a component framework, a whole ecosystem of dependencies that has nothing to do with the server logic you're actually writing. Prefab eliminates that gap. You describe your UI in Python, and it compiles to React. No context switching, no second toolchain.

Prefab originated as [FastMCP](https://github.com/jlowin/fastmcp)'s Apps system and has been extracted as a standalone library so it can serve any backend. It ships as two packages: `prefab-ui` (Python, on PyPI) for building component trees, and `@prefect/prefab-ui` (TypeScript, on npm) for rendering them. The Python side has no transport dependencies — it works with MCP servers via FastMCP, with REST APIs via FastAPI, or with anything else that can return JSON.

## Installation

```bash
pip install prefab-ui
```

Requires Python 3.10+. The only runtime dependency is Pydantic.

## Components

Prefab includes 35+ components that map to familiar UI primitives: layout (`Column`, `Row`, `Grid`), typography (`Heading`, `Text`, `Markdown`), forms (`Input`, `Select`, `Checkbox`, `Form`), data display (`Table`, `DataTable`, `Card`, `Badge`), and interactive elements (`Button`, `Dialog`, `Tabs`, `Accordion`).

Components nest using Python's context manager protocol:

```python
from prefab_ui.components import Card, CardHeader, CardTitle, CardContent, Column, Text, Badge

with Card() as card:
    with CardHeader():
        CardTitle("User Profile")
    with CardContent():
        with Column():
            Text("{{ user.name }}")
            Badge("{{ user.role }}", variant="secondary")
```

Pydantic models generate forms automatically:

```python
from pydantic import BaseModel, Field
from prefab_ui.components import Form
from prefab_ui.actions import ToolCall

class SignupForm(BaseModel):
    email: str = Field(description="Your email address")
    name: str = Field(min_length=2, max_length=50)
    age: int = Field(ge=18, le=120)

form = Form.from_model(SignupForm, on_submit=ToolCall(name="create_user"))
```

Constraints from the Pydantic model (`min_length`, `ge`, etc.) are automatically translated into client-side validation rules.

## Actions

Actions define what happens when users interact with components. They're declarative — you describe the intent, and the renderer executes it.

**Generic actions** work with any transport:

- `SetState` / `ToggleState` — update client-side state
- `ShowToast` — display a notification
- `OpenLink` — navigate to a URL

**MCP actions** communicate with an MCP server:

- `ToolCall` — invoke a server tool and store the result
- `SendMessage` — send a message to the model
- `UpdateContext` — refresh the current view

Actions support lifecycle callbacks and chaining:

```python
Button(
    "Delete",
    on_click=ToolCall(
        name="delete_item",
        arguments={"id": "{{ item.id }}"},
        on_success=ShowToast(title="Deleted", variant="success"),
        on_error=ShowToast(title="Failed", variant="destructive"),
    ),
)
```

## State and Templates

State is declared in `UIResponse` and referenced in components via `{{ template }}` syntax. The renderer interpolates state values at render time, so the UI stays reactive as state changes through actions.

```python
UIResponse(
    state={"count": 0},
    view=Column(
        Text("Count: {{ count }}"),
        Button("+1", on_click=SetState(key="count", value="{{ count + 1 }}")),
    ),
)
```

## Testing

Prefab includes a `Simulator` for testing interactive UIs without a browser. It executes actions, tracks state, and lets you query the rendered component tree:

```python
from prefab_ui.testing import ActionResult, Simulator

async def my_handler(name: str, arguments: dict) -> ActionResult:
    if name == "search":
        return ActionResult(content={"results": [{"name": "Alice"}]})
    return ActionResult(is_error=True, error_text=f"Unknown: {name}")

sim = Simulator(my_handler)
await sim.invoke("render_search", {"query": "test"})

search_input = sim.find("Input", name="query")
await sim.set_value(search_input, "Alice")
await sim.click(sim.find("Button"))

assert sim.state["results"][0]["name"] == "Alice"
```

## Development

```bash
git clone https://github.com/prefecthq/prefab
cd prefab
uv sync                          # Install Python dependencies
uv run pytest tests              # Run Python tests
cd renderer && npm install       # Install renderer dependencies
npm test                         # Run renderer tests
npm run dev                      # Start renderer dev server
```

The justfile has shortcuts for common tasks:

```bash
just test                        # Run Python tests
just lint                        # Run all pre-commit checks
just typecheck                   # Run ty type checker
just docs                        # Start docs server with live renderer
```

## License

Prefab is licensed under the Apache 2.0 license. See the [`LICENSE`](LICENSE) file for details.
