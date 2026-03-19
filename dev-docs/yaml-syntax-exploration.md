# YAML Syntax Exploration

Comparing four representations of Prefab component trees to evaluate
whether a YAML syntax could serve as a middle ground between
context-manager Python (clear but unsupported in Monty) and
explicit-children Python (Monty-safe but verbose).

Token counts are approximate (cl100k_base / GPT-4 tokenizer, which
tracks closely to Claude's tokenizer for code).

---

## Example 1 — Simple card with a form

### Context managers (Python)

```python
with Card() as view:
    with CardHeader():
        Heading("Sign Up")
    with CardContent():
        Input(name="email", placeholder="Email")
        Input(name="password", placeholder="Password", type="password")
    with CardFooter():
        Button("Submit", on_click=CallTool("register"))
```

~45 tokens

### Explicit children (Python, Monty-safe)

```python
view = Card(
    children=[
        CardHeader(
            children=[
                Heading("Sign Up"),
            ],
        ),
        CardContent(
            children=[
                Input(name="email", placeholder="Email"),
                Input(name="password", placeholder="Password", type="password"),
            ],
        ),
        CardFooter(
            children=[
                Button("Submit", on_click=CallTool("register")),
            ],
        ),
    ],
)
```

~65 tokens

### JSON (wire format)

```json
{
  "type": "Card",
  "children": [
    {
      "type": "CardHeader",
      "children": [
        { "type": "Heading", "content": "Sign Up" }
      ]
    },
    {
      "type": "CardContent",
      "children": [
        { "type": "Input", "name": "email", "placeholder": "Email" },
        { "type": "Input", "name": "password", "placeholder": "Password", "inputType": "password" }
      ]
    },
    {
      "type": "CardFooter",
      "children": [
        { "type": "Button", "label": "Submit", "onClick": { "type": "CallTool", "tool": "register" } }
      ]
    }
  ]
}
```

~95 tokens

### YAML (proposed)

```yaml
Card:
  - CardHeader:
      - Heading: Sign Up
  - CardContent:
      - Input:
          name: email
          placeholder: Email
      - Input:
          name: password
          placeholder: Password
          type: password
  - CardFooter:
      - Button:
          label: Submit
          on_click:
            CallTool: register
```

~50 tokens

### Verdict — Example 1

| Format | ~Tokens | vs Context Mgr |
|---|---|---|
| Context managers | 45 | baseline |
| YAML | 50 | +11% |
| Explicit children | 65 | +44% |
| JSON | 95 | +111% |

YAML is nearly as compact as context managers and much shorter than
explicit children. The indentation conveys structure the same way
`with` blocks do.

---

## Example 2 — Todo list (complex nesting, control flow, actions)

### Context managers (Python)

```python
with Grid(min_column_width="18rem", gap=6, align="start") as view:
    with ForEach("groups", let={"gi": "{{ $index }}"}):
        with Card():
            with CardHeader():
                with Row(gap=2, align="center"):
                    Input(name="groups.{{ gi }}.name")
                    Button("×", variant="ghost", size="sm",
                           on_click=PopState("groups", "{{ gi }}"))
            with CardContent():
                with Column(gap=4):
                    with Form(on_submit=[
                        AppendState("groups.{{ gi }}.todos",
                                    {"text": "{{ $item.new_todo }}", "done": False}),
                        SetState("groups.{{ gi }}.new_todo", ""),
                    ]):
                        with Row(gap=2):
                            Input(name="groups.{{ gi }}.new_todo",
                                  placeholder="Add a todo...")
                            Button("Add", disabled="{{ not $item.new_todo }}")
                    with Column(gap=2):
                        with ForEach("groups.{{ gi }}.todos"):
                            with Row(gap=2, align="center"):
                                Checkbox(name="groups.{{ gi }}.todos.{{ $index }}.done")
                                Input(name="groups.{{ gi }}.todos.{{ $index }}.text")
                                Button("×", variant="ghost", size="sm",
                                       on_click=PopState("groups.{{ gi }}.todos",
                                                         "{{ $index }}"))
            with CardFooter():
                Muted("{{ $item.todos | length }} items")
```

~175 tokens

### Explicit children (Python, Monty-safe)

```python
view = Grid(
    min_column_width="18rem", gap=6, align="start",
    children=[
        ForEach(
            "groups",
            let={"gi": "{{ $index }}"},
            children=[
                Card(
                    children=[
                        CardHeader(
                            children=[
                                Row(
                                    gap=2, align="center",
                                    children=[
                                        Input(name="groups.{{ gi }}.name"),
                                        Button("×", variant="ghost", size="sm",
                                               on_click=PopState("groups", "{{ gi }}")),
                                    ],
                                ),
                            ],
                        ),
                        CardContent(
                            children=[
                                Column(
                                    gap=4,
                                    children=[
                                        Form(
                                            on_submit=[
                                                AppendState(
                                                    "groups.{{ gi }}.todos",
                                                    {"text": "{{ $item.new_todo }}", "done": False},
                                                ),
                                                SetState("groups.{{ gi }}.new_todo", ""),
                                            ],
                                            children=[
                                                Row(
                                                    gap=2,
                                                    children=[
                                                        Input(
                                                            name="groups.{{ gi }}.new_todo",
                                                            placeholder="Add a todo...",
                                                        ),
                                                        Button("Add", disabled="{{ not $item.new_todo }}"),
                                                    ],
                                                ),
                                            ],
                                        ),
                                        Column(
                                            gap=2,
                                            children=[
                                                ForEach(
                                                    "groups.{{ gi }}.todos",
                                                    children=[
                                                        Row(
                                                            gap=2, align="center",
                                                            children=[
                                                                Checkbox(name="groups.{{ gi }}.todos.{{ $index }}.done"),
                                                                Input(name="groups.{{ gi }}.todos.{{ $index }}.text"),
                                                                Button(
                                                                    "×", variant="ghost", size="sm",
                                                                    on_click=PopState(
                                                                        "groups.{{ gi }}.todos", "{{ $index }}"
                                                                    ),
                                                                ),
                                                            ],
                                                        ),
                                                    ],
                                                ),
                                            ],
                                        ),
                                    ],
                                ),
                            ],
                        ),
                        CardFooter(
                            children=[
                                Muted("{{ $item.todos | length }} items"),
                            ],
                        ),
                    ],
                ),
            ],
        ),
    ],
)
```

~290 tokens

### YAML (proposed)

```yaml
Grid:
  min_column_width: 18rem
  gap: 6
  align: start
  children:
    - ForEach:
        each: groups
        let: { gi: "{{ $index }}" }
        children:
          - Card:
              - CardHeader:
                  - Row:
                      gap: 2
                      align: center
                      children:
                        - Input: { name: "groups.{{ gi }}.name" }
                        - Button:
                            label: "×"
                            variant: ghost
                            size: sm
                            on_click:
                              PopState: [groups, "{{ gi }}"]
              - CardContent:
                  - Column:
                      gap: 4
                      children:
                        - Form:
                            on_submit:
                              - AppendState:
                                  path: "groups.{{ gi }}.todos"
                                  value: { text: "{{ $item.new_todo }}", done: false }
                              - SetState: ["groups.{{ gi }}.new_todo", ""]
                            children:
                              - Row:
                                  gap: 2
                                  children:
                                    - Input:
                                        name: "groups.{{ gi }}.new_todo"
                                        placeholder: Add a todo...
                                    - Button:
                                        label: Add
                                        disabled: "{{ not $item.new_todo }}"
                        - Column:
                            gap: 2
                            children:
                              - ForEach:
                                  each: "groups.{{ gi }}.todos"
                                  children:
                                    - Row:
                                        gap: 2
                                        align: center
                                        children:
                                          - Checkbox: { name: "groups.{{ gi }}.todos.{{ $index }}.done" }
                                          - Input: { name: "groups.{{ gi }}.todos.{{ $index }}.text" }
                                          - Button:
                                              label: "×"
                                              variant: ghost
                                              size: sm
                                              on_click:
                                                PopState: ["groups.{{ gi }}.todos", "{{ $index }}"]
              - CardFooter:
                  - Muted: "{{ $item.todos | length }} items"
```

~210 tokens

### Verdict — Example 2

| Format | ~Tokens | vs Context Mgr |
|---|---|---|
| Context managers | 175 | baseline |
| YAML | 210 | +20% |
| Explicit children | 290 | +66% |
| JSON | ~400 | +129% |

At higher complexity the gap between YAML and context managers widens
a bit because YAML still needs explicit `children:` keys, but it
remains significantly more compact than explicit-children Python. The
biggest win is eliminating all the bracket/paren noise.

---

## Example 3 — Dashboard table (data-driven, component cells)

### Context managers (Python)

```python
with Card(css_class="px-10 py-8") as view:
    with CardHeader():
        Text("Q3 → Q4", css_class="text-sm text-muted-foreground")
        CardTitle("Platform Growth")
    with CardContent():
        DataTable(
            columns=[
                DataTableColumn(key="metric", header="Metric"),
                DataTableColumn(key="q3", header="Q3", align="right"),
                DataTableColumn(key="q4", header="Q4", align="right"),
                DataTableColumn(key="growth", header="Growth", align="right"),
            ],
            rows=[
                {"metric": "API Calls", "q3": "4.2M", "q4": "4.8M",
                 "growth": Badge("+14%", variant="default")},
                {"metric": "Jobs", "q3": "850K", "q4": "1.3M",
                 "growth": Badge("+53%", variant="success")},
            ],
        )
```

~105 tokens

### YAML (proposed)

```yaml
Card:
  css_class: px-10 py-8
  children:
    - CardHeader:
        - Text: { content: "Q3 → Q4", css_class: "text-sm text-muted-foreground" }
        - CardTitle: Platform Growth
    - CardContent:
        - DataTable:
            columns:
              - { key: metric, header: Metric }
              - { key: q3, header: Q3, align: right }
              - { key: q4, header: Q4, align: right }
              - { key: growth, header: Growth, align: right }
            rows:
              - metric: API Calls
                q3: 4.2M
                q4: 4.8M
                growth:
                  Badge: { label: "+14%", variant: default }
              - metric: Jobs
                q3: 850K
                q4: 1.3M
                growth:
                  Badge: { label: "+53%", variant: success }
```

~110 tokens

### Verdict — Example 3

| Format | ~Tokens | vs Context Mgr |
|---|---|---|
| Context managers | 105 | baseline |
| YAML | 110 | +5% |
| Explicit children | ~155 | +48% |
| JSON | ~200 | +90% |

For data-heavy layouts YAML is almost identical to context managers in
token cost. Tabular data in YAML (flow mappings on one line) is very
natural.

---

## Summary

| | Context Mgr | YAML | Explicit Children | JSON |
|---|---|---|---|---|
| **Token efficiency** | Best | Near-best (+5–20%) | Moderate (+44–66%) | Worst (+90–130%) |
| **Structural clarity** | Excellent (indentation = nesting) | Excellent (same) | Poor (buried in brackets) | Poor (buried in braces) |
| **Monty compatible** | No | N/A (text, not executed) | Yes | Yes |
| **LLM generation** | Needs `with`/`as` syntax | Very natural for LLMs | Error-prone (bracket matching) | Error-prone (brace matching) |
| **Parsing effort** | N/A (already Python) | Moderate (need a loader) | N/A (already Python) | Trivial (already the wire format) |
| **Programmatic logic** | Full Python | None (static tree only) | Full Python | None |

### Key observations

1. **YAML is 40–60% shorter than explicit children** — the main
   Monty-compatible format today. Most savings come from eliminating
   `children=[`, `],`, `)`, and repeated `children=` keywords.

2. **YAML is only 5–20% longer than context managers** — and the gap
   is mostly the explicit `children:` key. A convention like "list
   values under a component *are* children" could close it further.

3. **LLMs are excellent at generating YAML.** It's one of the most
   common formats in training data (Kubernetes, GitHub Actions, Ansible,
   etc.) and doesn't require balanced delimiter tracking.

4. **The limitation is dynamism.** YAML can represent static component
   trees and template expressions (`{{ }}`), but can't do loops over
   Python data to build rows (Example 3 hardcodes them). For that
   use case the LLM would still need to provide data separately.

5. **Parsing is straightforward.** `yaml.safe_load` → recursive walk
   that maps component names to their Python classes. Actions like
   `CallTool`, `SetState` etc. can use the same pattern. No custom
   grammar needed.

### Possible YAML conventions

- **Component as key, props as value:** `Button: { label: Save, variant: primary }`
- **Shorthand for text-primary components:** `Heading: Sign Up` (string value = primary positional arg)
- **List under a component = children:** no explicit `children:` key needed for containers
- **Actions as tagged values:** `on_click: !CallTool register` (YAML tags, though these add complexity)
