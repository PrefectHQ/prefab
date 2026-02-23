# Form.from_model Reference

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

form = Form.from_model(
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

## Auto-filled Arguments

When `on_submit` is a `CallTool` with no explicit `arguments`, they are
auto-filled under a `data` key:

```python
Form.from_model(Contact, on_submit=CallTool("create_contact"))
# generates: arguments={"data": {"name": "{{ name }}", "email": "{{ email }}", ...}}
```

A default `on_error` toast is added if not already specified.

## Skipped Types

`list`, `dict`, `set`, `tuple`, and nested `BaseModel` fields are
silently skipped — they have no obvious single-input representation.
