# Prefab Reactive Patterns

## Rx — Typed Reactive References

`Rx` wraps `{{ }}` expressions with Python operator support. Stateful
components (Input, Slider, etc.) expose `.rx` which returns an Rx:

```python
from prefab_ui.components import Slider, Metric, Text

slider = Slider(min=0, max=100, name="brightness")

Metric(value=slider.rx)              # {{ brightness }}
Text(f"Value: {slider.rx}")          # "Value: {{ brightness }}"
```

Build expressions with Python operators:

```python
from prefab_ui.rx import Rx

price = Rx("price")
quantity = Rx("quantity")

price * quantity                      # {{ price * quantity }}
(price * quantity).currency()         # {{ price * quantity | currency }}
quantity > 0                          # {{ quantity > 0 }}
(quantity > 0).then("In stock", "")   # {{ quantity > 0 ? 'In stock' : '' }}
```

Pipe methods: `.currency()`, `.percent()`, `.compact()`, `.date()`,
`.upper()`, `.lower()`, `.truncate(N)`, `.length()`, `.join(sep)`.

### F-strings with Rx

Python f-strings work naturally with Rx. When Python evaluates
`f"{STATE.cpu}%"`, it calls `str()` on the Rx which produces
`"{{ cpu }}%"`. Prefab detects these embedded template markers and
expands them into proper expressions automatically:

```python
# All equivalent — use whichever reads best:
Metric(value=STATE.cpu + "%")                     # {{ cpu + '%' }}
Metric(value=f"{STATE.cpu}%")                     # also {{ cpu + '%' }}

# Works inside .then() too:
STATE.cpu.then(f"{STATE.cpu}%", "...")             # {{ cpu ? cpu + '%' : '...' }}

# Multiple interpolations:
Text(f"Hello {STATE.name}, {STATE.count} items")  # {{ 'Hello ' + name + ', ' + count + ' items' }}
```

## STATE

For keys defined elsewhere (e.g. by `result_key` on `CallTool`):

```python
from prefab_ui.components import STATE

Text(f"Total: {STATE.items.length()}")   # {{ items | length }}
```

## ForEach

`ForEach` yields a `LoopItem` (an Rx subclass). Destructure as
`(index, item)`:

```python
from prefab_ui.components import Column, Text, Badge, Row
from prefab_ui.components.control_flow import ForEach

with Column(gap=2):
    with ForEach("users") as user:
        Text(f"{user.name} — {user.email}")

    # With index
    with ForEach("users") as (i, user):
        Text(f"{i + 1}. {user.name}")
```

Raw `$index` and `$item` are also available in template strings.

## Conditional Rendering

`If`, `Elif`, `Else` as context managers. Consecutive siblings form a chain:

```python
from prefab_ui.components import Badge
from prefab_ui.components.control_flow import If, Elif, Else

with If("status == 'error'"):
    Badge("Error", variant="destructive")
with Elif("status == 'warning'"):
    Badge("Warning", variant="warning")
with Else():
    Badge("OK")
```

Condition arguments are raw expressions (no `{{ }}`). A lone `If` works
for simple show/hide.

## Define / Use

Reusable templates — define once, use in ForEach or anywhere:

```python
from prefab_ui.app import PrefabApp
from prefab_ui.components import Card, CardTitle, Badge, Column
from prefab_ui.components.control_flow import ForEach
from prefab_ui.define import Define
from prefab_ui.use import Use

with Define("user-card") as defn:
    with Card():
        CardTitle("{{ name }}")
        Badge("{{ role }}")

with PrefabApp(state={"users": [...]}, defs=[defn]) as app:
    with Column(gap=4):
        with ForEach("users"):
            Use("user-card")
```
