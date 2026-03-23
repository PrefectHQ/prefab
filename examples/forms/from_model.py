"""Form.from_model() — auto-generate forms from Pydantic models.

Demonstrates how from_model() maps field types, constraints, and
optionality into the right input components. Optional fields get a
subtle "(optional)" indicator next to their labels.

Run with:
    prefab serve examples/forms/from_model.py
"""

from typing import Literal

from pydantic import BaseModel, Field, SecretStr

from prefab_ui.actions.ui import ShowToast
from prefab_ui.app import PrefabApp
from prefab_ui.components import (
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Column,
    Form,
    Muted,
    Text,
)


class SignUp(BaseModel):
    name: str = Field(title="Full Name", min_length=1)
    email: str
    password: SecretStr = Field(min_length=8)
    role: Literal["viewer", "editor", "admin"] = "viewer"
    company: str | None = Field(default=None, title="Company")
    bio: str = Field(
        default="",
        title="Bio",
        json_schema_extra={"ui": {"type": "textarea", "rows": 3}},
    )


with Column(gap=6, css_class="max-w-xl mx-auto") as view:
    with Column(gap=1):
        Text("Form.from_model()", bold=True, css_class="text-lg")
        Muted(
            "Each field is generated from the Pydantic model."
            " Required fields have no indicator; optional fields show"
            ' "(optional)" next to their label.'
        )
    with Card():
        with CardHeader():
            CardTitle("Create Account")
        with CardContent():
            Form.from_model(
                SignUp,
                submit_label="Sign Up",
                on_submit=ShowToast("Welcome, {{ name }}!"),
            )

app = PrefabApp(view=view)
