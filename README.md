<div align="center">

# Prefab 🎨

**The generative UI framework that even humans can use.**

🚧 *Don't panic. Prefab is under very active development.* 🚧

[![PyPI - Version](https://img.shields.io/pypi/v/prefab-ui)](https://pypi.org/project/prefab-ui)
[![Tests](https://github.com/PrefectHQ/prefab/actions/workflows/run-tests.yml/badge.svg)](https://github.com/PrefectHQ/prefab/actions/workflows/run-tests.yml)
[![License](https://img.shields.io/github/license/PrefectHQ/prefab)](https://github.com/PrefectHQ/prefab/blob/main/LICENSE)

[Docs](https://prefab.prefect.io) · [Playground](https://prefab.prefect.io/docs/playground) · [GitHub](https://github.com/PrefectHQ/prefab)

<a href="https://prefab.prefect.io">
<img src="https://raw.githubusercontent.com/PrefectHQ/prefab/main/docs/assets/showcase.png" alt="Prefab" width="1000">
</a>

</div>

**Prefab is a UI framework for building rich, interactive interfaces in Python.** Create [MCP Apps](https://modelcontextprotocol.io/docs/extensions/apps), data dashboards, interactive tools, and more with 100+ prebuilt components. A bundled React renderer turns everything into a self-contained application.

Composing frontends in Python is ~~blasphemous~~ surprisingly natural. Prefab's DSL uses context managers for component nesting, making it both extremely token-efficient and streaming-compatible. As a result, you (or your agent) can generate UIs on the fly. A reactive state system lets you express client-side interactivity as Python expressions — arithmetic, comparisons, conditionals, and formatting pipes all compile to live template bindings, with no JavaScript required.

The "hello world" of Prefab is an interactive card. It looks like something you might see in any frontend framework... except, of course, that it's written entirely in Python. Context managers define the component hierarchy, and the reactive `Rx` class binds the form input to client-side state. The heading and badge update in real time as you type. You can try an interactive version [in the Prefab docs](https://prefab.prefect.io/docs/welcome).

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

## Why Prefab

Python developers building tools, APIs, and servers regularly need to ship interactive interfaces alongside their logic: dashboards, data tables, forms, charts. Building these interfaces has traditionally meant working in an entirely different language and ecosystem, or settling for static templates and limited tooling.

Prefab takes a different approach, using a Python DSL to naturally compose a library of production-ready components into interactive applications. The component tree compiles to a JSON protocol and is rendered by a bundled React frontend built on shadcn/ui. The interface definition stays in Python, right next to the data it presents. The output is declarative and serializable rather than executable code, which means UIs are safe for agents to generate, easy to validate, and portable across any transport.

Prefab is designed from the ground up for [MCP Apps](https://modelcontextprotocol.io/docs/extensions/apps), bringing interactive frontend capabilities to the Python MCP ecosystem for the first time. Prefab ships as a native part of [FastMCP](https://github.com/PrefectHQ/fastmcp), supporting everything from hand-authored declarative interfaces to fully agent-generated UIs in a single framework.

Prefab's protocol-first approach was inspired by [FastUI](https://github.com/pydantic/FastUI), which pioneered declarative component protocols rendered by a separate frontend. Prefab brings that idea to the MCP ecosystem, with a renderer that ships as a self-contained static bundle and a DSL designed for both developers and agents.

## Installation

```bash
pip install prefab-ui
```

Requires Python 3.10+.

## Documentation

Full documentation at [prefab.prefect.io](https://prefab.prefect.io), including an interactive [playground](https://prefab.prefect.io/docs/playground) where you can try components live.

*Made with 💙 by [Prefect](https://www.prefect.io/)*
