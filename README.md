<div align="center">

# Prefab 🎨

**The agentic frontend framework that even a human can use.**

🚧 *Don't panic. Prefab is under **extremely** active development. You probably shouldn't use it yet.* 🚧

[![PyPI - Version](https://img.shields.io/pypi/v/prefab-ui.svg)](https://pypi.org/project/prefab-ui)
[![Tests](https://github.com/prefecthq/prefab/actions/workflows/run-tests.yml/badge.svg)](https://github.com/prefecthq/prefab/actions/workflows/run-tests.yml)
[![License](https://img.shields.io/github/license/prefecthq/prefab.svg)](https://github.com/prefecthq/prefab/blob/main/LICENSE)

[Docs](https://prefab.prefect.io) · [Playground](https://prefab.prefect.io/playground) · [GitHub](https://github.com/PrefectHQ/prefab)

</div>

<img src="https://raw.githubusercontent.com/PrefectHQ/prefab/main/docs/assets/showcase.png" alt="Prefab" width="1000">

Prefab is a frontend framework with a Python DSL that compiles to JSON. Describe a UI — layouts, forms, charts, data tables, full interactivity — and a bundled React renderer turns that JSON into a self-contained application.

Composing frontends in Python is ~~blasphemous~~ surprisingly natural. And because it's a JSON protocol, any source can produce a Prefab UI. Write one in Python, serve one as an [MCP App](https://modelcontextprotocol.io/docs/extensions/apps), or let an agent generate one dynamically — no templates or predefined views required.

<div align="center">
<img src="https://raw.githubusercontent.com/PrefectHQ/prefab/main/docs/assets/hello-world-card.png" alt="Hello world card" width="400">
</div>
</br>

This card has a live-updating heading, a text input bound to client-side state, and badges — all from a few lines of Python. You can try an interactive version [in the Prefab docs](https://prefab.prefect.io/docs/welcome). In fact, every example in the Prefab docs is rendered with Prefab itself.

```python
from prefab_ui.components import Card, CardContent, CardFooter, Column, H3, Muted, Input, Badge, Row

with Card():
    with CardContent():
        with Column(gap=3):
            H3("Hello, {{ name }}!")
            Muted("Type below and watch this update in real time.")
            Input(name="name", placeholder="Your name...")
    with CardFooter():
        with Row(gap=2):
            Badge("Name: {{ name }}", variant="default")
            Badge("Prefab", variant="success")
```

Since everything compiles to JSON, you can author a UI from a Python script, have an agent generate one on the fly, or serve one from any MCP server or REST API.

*Made with 💙 by [Prefect](https://www.prefect.io/)*

## Installation

```bash
pip install prefab-ui
```

Requires Python 3.10+.

## How It Works

1. Build a component tree in Python (or raw JSON from any source)
2. The tree compiles to Prefab's JSON format
3. A bundled React renderer turns the JSON into a live interface

State flows through `{{ templates }}`. When you write `{{ query }}`, the renderer interpolates the current value from client-side state. Named form controls sync automatically — `Input(name="city")` keeps `{{ city }}` up to date on every keystroke. Actions like `ToolCall` and `SetState` drive interactivity without custom JavaScript.

## Components

35+ components covering layout, typography, forms, data display, and interactive elements. Containers nest with Python context managers:

```python
from prefab_ui.components import Card, CardHeader, CardTitle, CardContent, Column, Text, Badge

with Card():
    with CardHeader():
        CardTitle("User Profile")
    with CardContent():
        with Column():
            Text("{{ user.name }}")
            Badge("{{ user.role }}", variant="secondary")
```

Pydantic models generate forms automatically — constraints like `min_length` and `ge` become client-side validation:

```python
from pydantic import BaseModel, Field
from prefab_ui.components import Form
from prefab_ui.actions import ToolCall

class SignupForm(BaseModel):
    email: str = Field(description="Your email address")
    name: str = Field(min_length=2, max_length=50)
    age: int = Field(ge=18, le=120)

Form.from_model(SignupForm, on_submit=ToolCall("create_user"))
```

## Actions

Actions define what happens on interaction — state updates, server calls, navigation, notifications:

```python
from prefab_ui.components import Button
from prefab_ui.actions import SetState, ToolCall, ShowToast

Button("Save", on_click=[
    SetState("saving", True),
    ToolCall(
        "save_data",
        arguments={"item": "{{ item }}"},
        on_success=ShowToast(title="Saved"),
        on_error=ShowToast(title="Failed", variant="destructive"),
    ),
    SetState("saving", False),
])
```

## Documentation

Full documentation at [prefab.prefect.io](https://prefab.prefect.io), including an interactive [playground](https://prefab.prefect.io/playground) where you can try components live.
