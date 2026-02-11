# Expression Reference

Any string prop supports `{{ expression }}` templates that resolve against
client-side state.

## Syntax

```json
{"type": "Text", "content": "Hello, {{ user.name }}!"}
{"type": "Badge", "label": "{{ items.length }} items"}
{"type": "Button", "label": "{{ loading ? 'Loading...' : 'Submit' }}"}
```

## Operators (lowest → highest precedence)

| Category | Operators | Example |
|----------|-----------|---------|
| Pipe | `\|` | `{{ price \| currency }}` |
| Ternary | `? :` | `{{ active ? 'On' : 'Off' }}` |
| Logical OR | `\|\|` | `{{ a \|\| b }}` |
| Logical AND | `&&` | `{{ inStock && !discontinued }}` |
| Logical NOT | `!` | `{{ !loading }}` |
| Comparison | `==` `!=` `>` `<` `>=` `<=` | `{{ score >= 90 }}` |
| Addition | `+` `-` | `{{ price + tax }}` |
| Multiplication | `*` `/` | `{{ qty * price }}` |

String concat: `{{ firstName + ' ' + lastName }}`

Dot paths: `{{ user.address.city }}`, `{{ items.length }}`

## Pipes

| Pipe | Input | Example |
|------|-------|---------|
| `number:N` | number | `{{ 3.14 \| number:2 }}` → `"3.14"` |
| `currency:CODE` | number | `{{ 42.5 \| currency:USD }}` → `"$42.50"` |
| `percent:N` | number | `{{ 0.85 \| percent:1 }}` → `"85.0%"` |
| `abs` | number | `{{ -5 \| abs }}` → `5` |
| `upper` | string | `{{ name \| upper }}` |
| `lower` | string | `{{ name \| lower }}` |
| `truncate:N` | string | `{{ bio \| truncate:50 }}` |
| `date:FMT` | date | `{{ created \| date }}` |
| `time` | date | `{{ created \| time }}` |
| `datetime` | date | `{{ created \| datetime }}` |
| `length` | array | `{{ items \| length }}` |
| `join:SEP` | array | `{{ tags \| join:', ' }}` |
| `first` | array | `{{ items \| first }}` |
| `last` | array | `{{ items \| last }}` |
| `default:VAL` | any | `{{ name \| default:'Anon' }}` |

## Special Variables

| Variable | Context | Description |
|----------|---------|-------------|
| `$event` | `onChange`, `onClick` | Value from triggering interaction |
| `$error` | `onError` callbacks | Error message string |
| `$index` | ForEach children | Zero-based iteration index |
| `$item` | ForEach children | Full current item object |

## Type Preservation

When `{{ }}` is the entire string, the resolved type is preserved:
`"{{ count }}"` → number if count is a number. Mixed strings like
`"Total: {{ count }}"` always produce strings.
