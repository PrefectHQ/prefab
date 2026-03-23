"""Manually built form with Label(optional=True).

Shows how to use the optional indicator when building forms by hand
instead of through from_model().

Run with:
    prefab serve examples/forms/manual.py
"""

from prefab_ui.actions.ui import ShowToast
from prefab_ui.app import PrefabApp
from prefab_ui.components import (
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Column,
    Form,
    Input,
    Label,
    Muted,
    Text,
    Textarea,
)

with Column(gap=6, css_class="max-w-xl mx-auto") as view:
    with Column(gap=1):
        Text("Manual Form with Optional Labels", bold=True, css_class="text-lg")
        Muted(
            "Same optional indicator, built by hand."
            " Pass optional=True to any Label to show the hint."
        )
    with Card():
        with CardHeader():
            CardTitle("Contact Us")
        with CardContent():
            with Form(gap=4, on_submit=ShowToast("Thanks, {{ name }}!")):
                with Column(gap=2):
                    Label("Name")
                    Input(name="name", placeholder="Your name", required=True)
                with Column(gap=2):
                    Label("Email")
                    Input(
                        input_type="email",
                        name="email",
                        placeholder="you@example.com",
                        required=True,
                    )
                with Column(gap=2):
                    Label("Phone", optional=True)
                    Input(
                        input_type="tel",
                        name="phone",
                        placeholder="+1 (555) 000-0000",
                    )
                with Column(gap=2):
                    Label("Message", optional=True)
                    Textarea(name="message", placeholder="How can we help?", rows=4)
                Button("Send")

app = PrefabApp(view=view)
