---
name: prefab-ui
description: >
  Build interactive UIs with the Prefab component library. Covers PrefabApp,
  layout (Grid, Row, Card), actions, expressions, and all component imports.
  Use when building Prefab UI apps, MCP apps with Prefab, FastMCP apps, or generative UIs.
---

# Prefab UI

Prefab is a Python DSL for building interactive React UIs. You compose
components using context managers, wire up actions as Pydantic models, and
wrap everything in a `PrefabApp`.

This skill covers patterns and layout. For component-specific API details
(props, variants, examples), use the component search tool with
`detail=True`.

## Core Pattern

```python
from prefab_ui.app import PrefabApp
from prefab_ui.components import Column, Heading, Input, Button, Badge
from prefab_ui.components.control_flow import If
from prefab_ui.actions import ShowToast
from prefab_ui.actions.mcp import CallTool

with PrefabApp(state={"query": "", "results": []}) as app:
    with Column(gap=4):
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
            Badge("{{ results.length }} found", variant="success")
```

1. `PrefabApp` is the outermost context manager — children auto-append
2. Container components (`Column`, `Card`, etc.) use `with` blocks
3. `state=` takes a plain dict of initial client-side state
4. `{{ key }}` templates resolve against state at render time
5. Actions like `CallTool` call server tools; `result_key` writes results into state

Always pass state as a plain dict: `PrefabApp(state={"count": 0})`.

## Imports

```python
from prefab_ui.app import PrefabApp

# Components — import what you need
from prefab_ui.components import (
    # Layout
    Column, Row, Grid, GridItem, Container,
    Dashboard, DashboardItem, Div, Span,
    # Typography
    Heading, Text, H1, H2, H3, H4, P, Lead, Large, Small, Muted,
    BlockQuote, Label, Link, Markdown, Code,
    # Cards
    Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
    # Data display
    DataTable, DataTableColumn, Metric, Badge, Dot,
    Ring, Progress, Separator, Loader, Icon,
    Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
    # Form controls
    Form, Field, Input, Textarea, Button, ButtonGroup,
    Select, SelectOption, Checkbox, Switch, Slider,
    Radio, RadioGroup, DatePicker, Calendar,
    Combobox, ComboboxOption, ChoiceCard,
    # Interactive
    Tabs, Tab, Accordion, AccordionItem,
    Dialog, Popover, Tooltip, HoverCard, Pages, Page,
    # Media
    Image, Audio, Video, Embed, Svg, DropZone,
)
from prefab_ui.components.charts import (
    BarChart, LineChart, AreaChart, PieChart,
    RadarChart, RadialChart, ScatterChart, Sparkline,
    ChartSeries,
)
from prefab_ui.components.control_flow import ForEach, If, Elif, Else

# Actions
from prefab_ui.actions import SetState, ToggleState, ShowToast, OpenLink
from prefab_ui.actions.mcp import CallTool, SendMessage, UpdateContext
```

**Never import from `prefab_ui` directly** except `PrefabApp` via
`prefab_ui.app`. `Spinner` does not exist — use `Loader`. `ChartSeries`
is in `prefab_ui.components.charts`, not `prefab_ui.components`.

## Layout

### Grid vs Row

Use `Grid` for card layouts and anything that needs equal or proportional
columns. Use `Row` for inline elements (badges, icon + text, buttons):

```python
# Equal-width cards — Grid handles sizing automatically
with Grid(columns=3, gap=4):
    with Card(css_class="p-6"):
        Metric(label="Revenue", value="$1.2M")
    with Card(css_class="p-6"):
        Metric(label="Users", value="4,821")
    with Card(css_class="p-6"):
        Metric(label="Uptime", value="99.9%")

# Proportional widths (2:1 ratio)
with Grid(columns=[2, 1], gap=4):
    with Card():
        with CardContent():
            LineChart(...)
    with Card():
        with CardContent():
            Text("Summary")

# Row for inline elements only
with Row(gap=2, align="center"):
    Icon("circle-check")
    Text("Completed")
    Badge("3 items")
```

### Card Patterns

Two patterns — don't mix them in a single Card:

```python
# Structured: sub-components have built-in padding
with Card():
    with CardHeader():
        CardTitle("Settings")
        CardDescription("Manage your preferences")
    with CardContent():
        Input(name="name")
    with CardFooter():
        Button("Save")

# Simple: direct children, add padding yourself
with Card(css_class="p-6"):
    Metric(label="Total", value="{{ total }}")
```

### Tabs

Content goes *inside* each Tab — Tab is a container, not just a header:

```python
with Tabs(default_value="overview"):
    with Tab("Overview", value="overview"):
        with Card():
            with CardContent():
                Text("overview content")
    with Tab("Settings", value="settings"):
        Text("settings content")
```

### Metric

```python
Metric(label="Revenue", value="$1.2M", delta="+12%", trend="up",
       trend_sentiment="positive", description="vs last month")
```

`delta=` is the change text. `trend=` is "up"/"down"/"neutral" (sets the
arrow icon). `trend_sentiment=` is "positive"/"negative"/"neutral" (sets
the color).

### DataTable

`rows=` (not `data=`), columns use `key=` and `header=` (not `label=`):

```python
DataTable(
    columns=[
        DataTableColumn(key="name", header="Name", sortable=True),
        DataTableColumn(key="email", header="Email"),
    ],
    rows=users,  # list of dicts, or "{{ state_key }}"
    search=True,
    paginated=True,
)
```

### Layout Props

`Column`, `Row`, `Grid` accept `gap`, `align`, `justify` as native props:

```python
Column(gap=4)                        # gap-4
Row(gap=2, justify="between")        # gap-2 justify-between
Grid(columns=3, gap=4)               # grid-cols-3 gap-4
```

Use `css_class` for anything beyond these: `Column(css_class="max-w-2xl mx-auto")`.

### Carousel

Carousel cycles through children. Each direct child becomes one slide.
Three modes through configuration:

```python
# Interactive carousel — arrows, dots, swipe
with Carousel(show_dots=True):
    Card(...)
    Card(...)

# Peek — show partial adjacent slides (1.3 = 1 full + 30% of next)
with Carousel(visible=1.3, align="center", dim_inactive=True):
    Card(...)

# Multiple visible slides
with Carousel(visible=3, gap=16):
    Card(...)

# Auto-advancing reel
with Carousel(auto_advance=3000, show_controls=False):
    Card(...)

# Vertical reel
with Carousel(direction="down", visible=3, gap=16, auto_advance=2000, show_controls=False):
    Div(style={"height": "160px"})

# Marquee — continuous smooth scroll
with Carousel(continuous=True, speed=3, show_controls=False):
    Badge("A")
    Badge("B")

# Fade transition
with Carousel(effect="fade", auto_advance=2000, show_controls=False):
    Card(...)
```

Key props: `visible` (int/float/None), `gap`, `direction` (left/right/up/down),
`auto_advance` (ms), `continuous`, `speed` (1-10), `effect` (slide/fade),
`dim_inactive`, `show_controls`, `controls_position` (overlay/outside/gutter),
`show_dots`, `align` (start/center/end), `loop`.

## Actions

Actions are Pydantic models. All support `on_success` and `on_error`:

```python
# Client-side (instant)
SetState("count", "{{ count + 1 }}")
ToggleState("showAdvanced")
ShowToast("Done!", variant="success")
OpenLink("https://example.com")

# MCP round-trip
CallTool("search", arguments={"q": "{{ query }}"}, result_key="results")
SendMessage("Summarize {{ item }}")
UpdateContext(content="User selected {{ item }}")

# Chaining — list runs sequentially
Button("Save", on_click=[
    SetState("loading", True),
    CallTool("save", result_key="saved"),
    SetState("loading", False),
])
```

### on_mount

Every component (and PrefabApp) supports `on_mount` — actions that fire
when the component mounts. Useful for initializing data, starting polling,
or running setup logic:

```python
# Poll a server tool every 3 seconds when the app loads
PrefabApp(
    view=dashboard_view,
    on_mount=SetInterval(
        duration=3000,
        on_tick=CallTool("refresh", on_success=SetState("stats", RESULT)),
    ),
)

# Load data when a conditional section becomes visible
with Condition("{{ showDetails }}"):
    Column(
        on_mount=CallTool("load_details", on_success=SetState("details", RESULT)),
        children=[Text("{{ details }}")],
    )
```

## Expressions

String props support `{{ expression }}` templates:

```python
Text("Hello, {{ user.name }}!")
Text("{{ items.length }} items ({{ total | currency }})")
Button("{{ loading ? 'Loading...' : 'Submit' }}")
```

Supports dot paths, arithmetic (`+` `-` `*` `/`), comparisons (`==` `!=`
`>` `<`), logical (`&&` `||` `!`), ternary (`? :`), and pipes
(`| upper`, `| currency`, `| length`, `| truncate:50`, etc.).

Special variables: `$event` (triggering value in onChange/onClick),
`$error` (error message in onError), `$index` and `$item` (in ForEach).

## Naming Convention

Python uses `snake_case`; wire protocol uses `camelCase`. Mapping is
automatic: `on_click` → `onClick`, `css_class` → `cssClass`, etc.

## Positional Arguments

Most components accept their primary field positionally:

```python
Button("Click me")           # label
Text("Hello")                # content
Heading("Title", level=2)    # content, level
Tab("General")               # title
ForEach("users")             # key
CallTool("search")           # tool
SetState("count", 42)        # key, value
ShowToast("Saved!")          # message
```
