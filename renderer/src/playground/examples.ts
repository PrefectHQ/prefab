export interface Example {
  title: string;
  category: string;
  code: string;
}

export const EXAMPLES: Example[] = [
  {
    title: "Hello World",
    category: "Getting Started",
    code: `from prefab_ui.components import Card, CardHeader, CardTitle, CardDescription, CardContent, Button

with Card():
    with CardHeader():
        CardTitle("Hello World")
        CardDescription("Your first prefab component.")
    with CardContent():
        Button("Click me!")`,
  },
  {
    title: "Form with Input",
    category: "Getting Started",
    code: `from prefab_ui.components import Column, Input, Button, Label
from prefab_ui import ToolCall

with Column(gap=3):
    Label("Name")
    Input(name="name", placeholder="Your name...")
    Label("Email")
    Input(name="email", input_type="email", placeholder="you@example.com")
    Button("Submit", on_click=ToolCall(
        "create_user",
        arguments={"name": "{{ name }}", "email": "{{ email }}"},
    ))`,
  },
  {
    title: "Button Variants",
    category: "Components",
    code: `from prefab_ui.components import Button, Grid

with Grid(columns=3, gap=8):
    Button("Default", variant="default")
    Button("Destructive", variant="destructive")
    Button("Outline", variant="outline")
    Button("Secondary", variant="secondary")
    Button("Ghost", variant="ghost")
    Button("Link", variant="link")
    Button("Success", variant="success")
    Button("Warning", variant="warning")
    Button("Info", variant="info")`,
  },
  {
    title: "Alert Variants",
    category: "Components",
    code: `from prefab_ui.components import Alert, AlertTitle, AlertDescription, Column

with Column(gap=3):
    with Alert(variant="default"):
        AlertTitle("Heads up!")
        AlertDescription("This is a default alert.")
    with Alert(variant="success"):
        AlertTitle("Success")
        AlertDescription("Your changes have been saved.")
    with Alert(variant="destructive"):
        AlertTitle("Error")
        AlertDescription("Something went wrong.")`,
  },
  {
    title: "Badges",
    category: "Components",
    code: `from prefab_ui.components import Badge, Row

with Row(gap=2):
    Badge("Default")
    Badge("Secondary", variant="secondary")
    Badge("Destructive", variant="destructive")
    Badge("Success", variant="success")
    Badge("Warning", variant="warning")
    Badge("Info", variant="info")
    Badge("Outline", variant="outline")`,
  },
  {
    title: "Tabs",
    category: "Components",
    code: `from prefab_ui.components import Tabs, Tab, Text, Column, Input, Label

with Tabs():
    with Tab(title="Account"):
        with Column(gap=3):
            Label("Username")
            Input(name="username", placeholder="@username")
    with Tab(title="Settings"):
        with Column(gap=3):
            Label("Display Name")
            Input(name="display_name", placeholder="Your display name")`,
  },
  {
    title: "Data Table",
    category: "Components",
    code: `from prefab_ui.components import DataTable, DataTableColumn

set_data(users=[
    {"name": "Alice", "email": "alice@example.com", "role": "Admin"},
    {"name": "Bob", "email": "bob@example.com", "role": "Editor"},
    {"name": "Carol", "email": "carol@example.com", "role": "Viewer"},
    {"name": "Dave", "email": "dave@example.com", "role": "Editor"},
])

DataTable(
    rows="{{ users }}",
    searchable=True,
    columns=[
        DataTableColumn(key="name", header="Name"),
        DataTableColumn(key="email", header="Email"),
        DataTableColumn(key="role", header="Role"),
    ],
)`,
  },
  {
    title: "Grid Layout",
    category: "Layout",
    code: `from prefab_ui.components import Grid, Card, CardHeader, CardTitle, CardContent, Text

with Grid(columns=3, gap=4):
    for i in range(6):
        with Card():
            with CardHeader():
                CardTitle(f"Card {i + 1}")
            with CardContent():
                Text(f"Content for card {i + 1}.")`,
  },
  {
    title: "Accordion",
    category: "Components",
    code: `from prefab_ui.components import Accordion, AccordionItem, Text

with Accordion():
    with AccordionItem(title="What is Prefab?"):
        Text("A JSON component format that renders to real interactive frontends.")
    with AccordionItem(title="How does it work?"):
        Text("Write Python, serialize to JSON, render with React.")
    with AccordionItem(title="Is it open source?"):
        Text("Yes! Check out the GitHub repo.")`,
  },
  {
    title: "Interactive State",
    category: "Patterns",
    code: `from prefab_ui.components import Column, Row, Button, Text, Badge
from prefab_ui import SetState

set_initial_state(count=0)

with Column(gap=4):
    with Row(gap=2, css_class="items-center"):
        Text("Count:")
        Badge("{{ count }}", variant="info")
    with Row(gap=2):
        Button("+1", on_click=SetState("count", "{{ count + 1 }}"))
        Button("-1", variant="outline", on_click=SetState("count", "{{ count - 1 }}"))
        Button("Reset", variant="ghost", on_click=SetState("count", 0))`,
  },
  {
    title: "Toggle Visibility",
    category: "Patterns",
    code: `from prefab_ui.components import Column, Button, Alert, AlertTitle, AlertDescription, If
from prefab_ui import ToggleState

set_initial_state(show_alert=False)

with Column(gap=3):
    Button("Toggle Alert", on_click=ToggleState("show_alert"))
    with If("show_alert"):
        with Alert(variant="info"):
            AlertTitle("Surprise!")
            AlertDescription("You toggled me into existence.")`,
  },
  {
    title: "Dialog",
    category: "Components",
    code: `from prefab_ui.components import Dialog, Button, Column, Input, Label
from prefab_ui import ToolCall

Dialog(
    trigger=Button("Open Dialog"),
    title="Edit Profile",
    description="Make changes to your profile.",
    children=[
        Column(
            Label("Name"),
            Input(name="name", placeholder="Enter your name"),
            gap=3,
        ),
    ],
)`,
  },
  {
    title: "Progress Bar",
    category: "Components",
    code: `from prefab_ui.components import Column, Progress, Text, Button, Row
from prefab_ui import SetState

set_initial_state(progress=33)

with Column(gap=4):
    Progress(value="{{ progress }}")
    Text("Progress: {{ progress }}%")
    with Row(gap=2):
        Button("25%", variant="outline", on_click=SetState("progress", 25))
        Button("50%", variant="outline", on_click=SetState("progress", 50))
        Button("75%", variant="outline", on_click=SetState("progress", 75))
        Button("100%", variant="default", on_click=SetState("progress", 100))`,
  },
  {
    title: "Custom Styling",
    category: "Patterns",
    code: `from prefab_ui.components import Column, Row, Button, Div, Text
from prefab_ui import SetState

set_initial_state(color="bg-blue-500")

with Column(gap=3):
    with Row(gap=2):
        Button("Blue", css_class="bg-blue-500 text-white",
               on_click=SetState("color", "bg-blue-500"))
        Button("Emerald", css_class="bg-emerald-500 text-white",
               on_click=SetState("color", "bg-emerald-500"))
        Button("Rose", css_class="bg-rose-500 text-white",
               on_click=SetState("color", "bg-rose-500"))
    Div(css_class="{{ color }} h-10 rounded-md")`,
  },
  {
    title: "The Button",
    category: "Patterns",
    code: `from prefab_ui.components import *
from prefab_ui.actions import *

set_initial_state(presses=0)

with Card():
    with CardHeader():
        with Row(align="center", css_class="justify-between"):
            CardTitle("The Button")
            with If("presses > 0"):
                Badge("{{ presses }}", variant="secondary")
    with CardContent():
        with Column(gap=4):
            with If("presses == 0"):
                Button(
                    "This is probably the best button to press",
                    on_click=SetState("presses", "{{ presses + 1 }}"),
                )
            with Elif("presses == 1"):
                with Alert(variant="info", icon="info"):
                    AlertTitle("Thank you!")
                    AlertDescription(
                        "Your cooperation has been noted and will be reported."
                    )
                Button(
                    "Please do not press this button again",
                    variant="outline",
                    on_click=SetState("presses", "{{ presses + 1 }}"),
                )
            with Elif("presses == 2"):
                with Alert(variant="warning", icon="alert-triangle"):
                    AlertTitle("We did ask nicely")
                    AlertDescription("Management has been informed.")
                Progress(value=66, max=100, indicator_class="bg-yellow-500")
                Muted("Patience remaining: 34%")
                Button(
                    "Please do not press this button again",
                    variant="destructive",
                    on_click=SetState("presses", "{{ presses + 1 }}"),
                )
            with Elif("presses == 3"):
                with Alert(variant="destructive", icon="alert-triangle"):
                    AlertTitle("Now look what you've done")
                    AlertDescription(
                        "The improbability drive has been activated."
                    )
                Progress(value=100, max=100, indicator_class="bg-red-500")
                with Row(gap=2, align="center"):
                    Loader(variant="spin", size="sm")
                    Muted("Recalculating the probability of your existence...")
                Button(
                    "OK maybe press it one more time",
                    variant="ghost",
                    on_click=SetState("presses", 0),
                )
            with Else():
                Text("This should not happen.")
    with CardFooter():
        with If("presses > 0"):
            Muted("Share and Enjoy!")`,
  },
];
