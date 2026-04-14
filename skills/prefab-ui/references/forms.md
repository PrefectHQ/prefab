# Prefab Forms

## Form.from_model

Generate a complete form from a Pydantic model:

```python
from typing import Literal
from pydantic import BaseModel, Field, SecretStr
from prefab_ui.components import Form
from prefab_ui.actions.mcp import CallTool

class UserProfile(BaseModel):
    name: str = Field(min_length=1, title="Full Name")
    email: str = Field(description="Your email address")
    age: int = Field(ge=18, le=120)
    role: Literal["admin", "user", "viewer"] = "user"
    bio: str = Field(json_schema_extra={"ui": {"type": "textarea", "rows": 4}})
    password: SecretStr = Field(min_length=8)
    active: bool = True

Form.from_model(
    UserProfile,
    submit_label="Save Profile",
    on_submit=CallTool("save_profile"),
    css_class="max-w-md",
)
```

## Type Mapping

| Python type | Generated input |
|-------------|----------------|
| `str` | Text input (auto-detects email/password/tel/url by field name) |
| `int`, `float` | Number input with min/max from constraints |
| `bool` | Checkbox |
| `Literal["a", "b"]` | Select dropdown |
| `datetime.date` | Date input |
| `datetime.time` | Time input |
| `datetime.datetime` | Datetime-local input |
| `SecretStr` | Password input |

## Field Metadata

| `Field()` param | Effect |
|-----------------|--------|
| `title` | Label text (defaults to humanized field name) |
| `description` | Placeholder text |
| `min_length` / `max_length` | Input constraints |
| `ge` / `le` / `gt` / `lt` | Number min/max |
| `pattern` | Regex validation |
| `json_schema_extra={"ui": {"type": "textarea"}}` | Force textarea |
| `json_schema_extra={"ui": {"rows": N}}` | Textarea rows |
| `exclude=True` | Skip field entirely |

## Runtime Defaults (Prefill)

Use `defaults=` to pre-populate fields at render time. This is distinct
from `Field(default=...)` — model defaults are baked into the class,
while `defaults=` overrides them for a single render. Useful when an
agent already knows some values and wants the user to edit a filled-in
form rather than a blank one.

```python
Form.from_model(
    BugReport,
    defaults={"title": "Login broken on Safari", "severity": "high"},
    on_submit=CallTool("file_bug"),
)
```

Partial dicts are fine — missing keys fall back to the model's field
defaults. Unknown keys raise `ValueError` to catch typos. Date/time
values accept either Python `date`/`datetime`/`time` objects or ISO
strings.

## Auto-filled Arguments

When `on_submit` is a `CallTool` with no explicit `arguments`, they are
auto-filled under a `data` key:

```python
Form.from_model(Contact, on_submit=CallTool("create_contact"))
# generates: arguments={"data": {"name": "{{ name }}", "email": "{{ email }}", ...}}
```

## Manual Forms

For full control, compose Field, Input, Select, etc. directly:

```python
from prefab_ui.components import (
    Form, Field, Input, Select, SelectOption, Textarea, Button,
)
from prefab_ui.actions.mcp import CallTool

with Form(on_submit=CallTool("submit", arguments={"name": "{{ name }}"})):
    with Field(label="Name"):
        Input(name="name", placeholder="Your name", required=True)
    with Field(label="Category"):
        with Select(name="category"):
            SelectOption(value="bug", label="Bug Report")
            SelectOption(value="feature", label="Feature Request")
    with Field(label="Description"):
        Textarea(name="desc", rows=4)
    Button("Submit", variant="default")
```

Components with `name=` auto-sync their value to client state at that key.

## Skipped Types

`list`, `dict`, `set`, `tuple`, and nested `BaseModel` fields are
silently skipped — they have no obvious single-input representation.
