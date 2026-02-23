---
name: writing-prefab-python
description: >
  Write interactive UIs in Python using the Prefab DSL. Prefab lets you
  build React component trees with Python context managers and return them
  as UIResponse from MCP server tools. Use this skill when writing Python
  code that uses the prefab_ui library, building MCP tools that return
  interactive interfaces, creating forms with Form.from_model, or testing
  Prefab UIs with the Simulator. For producing Prefab protocol JSON
  directly (without Python), use the generative-prefab-ui skill.
---

# Writing Prefab UIs in Python

Prefab provides a Python DSL for building interactive React UIs. You
compose components using context managers, wire up actions as Pydantic
models, and return a `UIResponse` that serializes to the Prefab wire
protocol.

The DSL produces the same JSON as the wire protocol — same components,
same state model, same expressions, same actions. This skill covers the
Python-specific patterns. For expression syntax, pipe filters, and
component props, see the generative-prefab-ui skill's reference files,
or read the source in `src/prefab_ui/components/`.

## Core Pattern

```python
from prefab_ui import UIResponse, Column, Heading, Text
from prefab_ui.components import Button, Input, DataTable, DataTableColumn, If, Muted
from prefab_ui.actions import ShowToast
from prefab_ui.actions.mcp import CallTool

with Column(gap=4) as view:
    Heading("User Search")
    Input(name="query", placeholder="Search...")
    Button(
        "Search",
        on_click=CallTool(
            "search_users",
            arguments={"q": "{{ query }}"},
            result_key="results",
            on_error=ShowToast("{{ $error }}", variant="error"),
        ),
    )
    with If("results.length > 0"):
        DataTable(
            columns=[
                DataTableColumn(key="name", header="Name", sortable=True),
                DataTableColumn(key="email", header="Email"),
            ],
            rows="{{ results }}",
            paginated=True,
        )

return UIResponse(view=view, state={"query": "", "results": []})
```

1. Container components are context managers (`with Column() as view:`)
2. Child components auto-append to the nearest parent context manager
3. `UIResponse` packages the tree + initial state
4. `{{ key }}` templates resolve against client-side state
5. Actions like `CallTool` call server tools; `result_key` writes the response into state

## Imports

```python
# Top-level (most common)
from prefab_ui import UIResponse, Column, Row, Heading, Text, Markdown
from prefab_ui import Code, Image, State, Define, Use

# Components — import what you need
from prefab_ui.components import (
    Grid, Dashboard, DashboardItem, Div, Span,
    H1, H2, H3, H4, P, Lead, Large, Small, Muted,
    BlockQuote, InlineCode, Label,
    Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
    Form, Field, Input, Textarea, Select, SelectOption,
    Checkbox, Switch, Slider, Radio, RadioGroup,
    DatePicker, Calendar, Combobox, ComboboxOption,
    DataTable, DataTableColumn,
    Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
    Badge, Alert, AlertTitle, AlertDescription,
    Progress, Separator, Spinner, Icon,
    Button, ButtonGroup, Tabs, Tab, Accordion, AccordionItem,
    Dialog, Popover, Tooltip, Pages, Page,
    BarChart, LineChart, AreaChart, PieChart, RadarChart, RadialChart, ChartSeries,
    ForEach, If, Elif, Else,
)

# Actions
from prefab_ui.actions import SetState, ToggleState, ShowToast, OpenLink
from prefab_ui.actions.mcp import CallTool, SendMessage, UpdateContext

# Testing
from prefab_ui.testing import Simulator, ActionResult
```

## Context Managers

Container components are `with` blocks. Children auto-append:

```python
with Column(gap=4) as view:
    Heading("Title")
    with Card():
        with CardContent():
            Input(name="email", placeholder="Email")
        with CardFooter():
            Button("Save", on_click=CallTool("save"))
```

Only the root needs `as` (to pass to UIResponse).

## Naming Convention

Python uses `snake_case`; wire protocol uses `camelCase`. The mapping is
automatic: `on_click` → `onClick`, `css_class` → `cssClass`,
`result_key` → `resultKey`, `input_type` → `inputType`,
`page_size` → `pageSize`, etc.

## Positional Arguments

Most components accept their primary field positionally:

```python
Button("Click me")           # label
Text("Hello")                # content
Heading("Title", level=2)    # content
Tab("General")               # title
ForEach("users")             # key
CallTool("search")           # tool
SetState("count", 42)        # key, value
ShowToast("Saved!")          # message
```

## Actions

Actions are Pydantic models. All support `on_success` and `on_error`.

```python
# Client-side (instant)
SetState("count", "{{ count + 1 }}")  # default value is "{{ $event }}"
ToggleState("showAdvanced")
ShowToast("Done!", variant="success")
OpenLink("https://example.com")

# MCP round-trip
CallTool("search", arguments={"q": "{{ query }}"}, result_key="results")
SendMessage("Summarize {{ item }}")
UpdateContext(content="User selected {{ item }}")

# Chaining
Button("Save", on_click=[
    SetState("loading", True),
    CallTool("save", result_key="saved"),
    SetState("loading", False),
])
```

## Layout Shortcuts

Column, Row, Grid accept `gap`, `align`, `justify` kwargs that compile
to Tailwind classes:

```python
Column(gap=4)                        # gap-4
Row(gap=2, justify="between")        # gap-2 justify-between
Grid(columns=3, gap=4)               # grid-cols-3 gap-4
```

Or use `css_class` directly: `Column(css_class="gap-4 max-w-2xl mx-auto")`.

Dashboard places children at explicit grid coordinates (unlike Grid's
auto-flow). Use DashboardItem wrappers with `col`, `row`, `col_span`,
`row_span`:

```python
with Dashboard(columns=12, row_height=100, gap=4):
    with DashboardItem(col=1, row=1, col_span=8, row_span=3):
        LineChart(...)
    with DashboardItem(col=9, row=1, col_span=4):
        Text("$42M")
```

## Form.from_model

Generate forms from Pydantic models. See [references/forms.md](references/forms.md).

```python
class Contact(BaseModel):
    name: str = Field(min_length=1)
    email: str
    role: Literal["admin", "user"] = "user"

Form.from_model(Contact, on_submit=CallTool("create_contact"))
```

## Testing

Headless testing with Simulator. See [references/testing.md](references/testing.md).

```python
sim = Simulator(handler)
await sim.invoke("my_tool", {"page": "users"})
button = sim.find("Button", label="Search")
await sim.click(button)
assert len(sim.state["results"]) > 0
```

## Conditional Rendering

Use `If`, `Elif`, `Else` as context managers. Consecutive siblings form a
chain that compiles to a single `Condition` node on the wire:

```python
with If("status == 'error'"):
    Badge("Error", variant="destructive")
with Elif("status == 'warning'"):
    Badge("Warning", variant="warning")
with Else():
    Badge("OK")
```

The condition argument is a raw expression (no `{{ }}`). A lone `If` works
for simple show/hide. Any non-conditional sibling breaks the chain.

## ForEach Variables

Inside a ForEach, `$index` (zero-based position) and `$item` (the full
item) are available alongside destructured item fields:

```python
with ForEach("users"):
    Text("{{ $index + 1 }}. {{ name }}")
```

## Define / Use

Reusable templates:

```python
with Define("user-card") as defn:
    with Card():
        CardTitle("{{ name }}")
        Badge("{{ role }}")

with Column(gap=4) as view:
    with ForEach("users"):
        Use("user-card")

UIResponse(view=view, defs=[defn], state={"users": [...]})
```
