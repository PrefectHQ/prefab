<div align="center">

# Prefab 🎨

**The generative UI framework that even humans can use.**

🚧 *Don't panic. Prefab is under very active development.* 🚧

[![PyPI - Version](https://img.shields.io/pypi/v/prefab-ui)](https://pypi.org/project/prefab-ui)
[![Tests](https://github.com/PrefectHQ/prefab/actions/workflows/run-tests.yml/badge.svg)](https://github.com/PrefectHQ/prefab/actions/workflows/run-tests.yml)
[![License](https://img.shields.io/github/license/PrefectHQ/prefab)](https://github.com/PrefectHQ/prefab/blob/main/LICENSE)

[Docs](https://prefab.prefect.io) · [Playground](https://prefab.prefect.io/docs/playground) · [GitHub](https://github.com/PrefectHQ/prefab)

</div>

<a href="https://prefab.prefect.io">
<img src="https://raw.githubusercontent.com/PrefectHQ/prefab/main/docs/assets/showcase.png" alt="Prefab" width="1000">
</a>

**Prefab is a UI framework for building rich, interactive interfaces in Python.** Create [MCP Apps](https://modelcontextprotocol.io/docs/extensions/apps), data dashboards, interactive tools, and more with 100+ prebuilt components. A bundled React renderer turns everything into a self-contained application that runs standalone or against any backend.

Composing frontends in Python is ~~blasphemous~~ surprisingly natural. Prefab's DSL uses context managers for component nesting, making it both extremely token-efficient and streaming-compatible. As a result, you (or your agent) can generate UIs on the fly. A reactive state system lets you express client-side interactivity as Python expressions — arithmetic, comparisons, conditionals, and formatting pipes all compile to live template bindings, with no JavaScript required.

<div align="center">
<img src="https://raw.githubusercontent.com/PrefectHQ/prefab/main/docs/assets/hello-world-card.png" alt="Hello world card" width="400">
</div>
</br>

```python
from prefab_ui.components import *
from prefab_ui.rx import Rx

name = Rx("name").default("world")

with Card():
    with CardContent():
        with Column(gap=3):
            H3(f"Hello, {name}!")
            Muted("Type below and watch this update in real time.")
            Input(name="name", placeholder="Your name...")
    with CardFooter():
        with Row(gap=2):
            Badge(f"Name: {name}", variant="default")
            Badge("Prefab", variant="success")
```

This card has a live-updating heading and a text input bound to client-side state. You can try an interactive version [in the Prefab docs](https://prefab.prefect.io/docs/welcome). Every example in the docs is rendered with Prefab itself.

## Why Prefab

Python developers building tools, APIs, and servers regularly need to ship interactive interfaces alongside their logic: dashboards, data tables, forms, charts. Building these interfaces has traditionally meant working in an entirely different language and ecosystem, or settling for static templates and limited tooling.

Prefab takes a different approach, using a Python DSL to naturally compose a library of production-ready components into interactive applications. The component tree compiles to a JSON protocol and is rendered by a bundled React frontend built on shadcn/ui. The interface definition stays in Python, right next to the data it presents. The output is declarative and serializable rather than executable code, which means UIs are safe for agents to generate, easy to validate, and portable across any transport.

Prefab is designed from the ground up for [MCP Apps](https://modelcontextprotocol.io/docs/extensions/apps), bringing interactive frontend capabilities to the Python MCP ecosystem for the first time. Prefab ships as a native part of [FastMCP](https://github.com/PrefectHQ/fastmcp), supporting everything from hand-authored declarative interfaces to fully agent-generated UIs in a single framework.

## Installation

```bash
pip install prefab-ui
```

Requires Python 3.10+.

## Components

100+ components covering layout, typography, forms, data display, charts, and interactive elements. Containers nest with Python context managers. State flows through reactive expressions — named form controls sync automatically, and actions like `CallTool` and `SetState` drive interactivity without custom JavaScript.

```python
from prefab_ui.components import Card, CardHeader, CardTitle, CardContent, Column, Text, Badge
from prefab_ui.rx import Rx

user = Rx("user")

with Card():
    with CardHeader():
        CardTitle("User Profile")
    with CardContent():
        with Column():
            Text(f"{user.name}")
            Badge(f"{user.role}", variant="secondary")
```

Pydantic models generate forms automatically — constraints like `min_length` and `ge` become client-side validation:

```python
from pydantic import BaseModel, Field
from prefab_ui.components import Form
from prefab_ui.actions.mcp import CallTool

class SignupForm(BaseModel):
    email: str = Field(description="Your email address")
    name: str = Field(min_length=2, max_length=50)
    age: int = Field(ge=18, le=120)

Form.from_model(SignupForm, on_submit=CallTool("create_user"))
```

## Actions

Actions define what happens on interaction — state updates, server calls, navigation, notifications:

```python
from prefab_ui.components import Button
from prefab_ui.actions import SetState, ShowToast
from prefab_ui.actions.mcp import CallTool
from prefab_ui.rx import Rx

item = Rx("item")

Button("Save", on_click=[
    SetState("saving", True),
    CallTool(
        "save_data",
        arguments={"item": item},
        on_success=ShowToast(title="Saved"),
        on_error=ShowToast(title="Failed", variant="destructive"),
    ),
    SetState("saving", False),
])
```

## Documentation

Full documentation at [prefab.prefect.io](https://prefab.prefect.io), including an interactive [playground](https://prefab.prefect.io/docs/playground) where you can try components live.

*Made with 💙 by [Prefect](https://www.prefect.io/)*
