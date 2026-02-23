"""Multi-group todo list — fully interactive, zero server calls.

Run with:
    prefab serve examples/todo/app.py
"""

from prefab_ui.actions import AppendState, PopState, SetState
from prefab_ui.app import PrefabApp
from prefab_ui.components import (
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    Checkbox,
    Column,
    Form,
    Grid,
    Input,
    Muted,
    Row,
    Separator,
)
from prefab_ui.components.control_flow import ForEach, If

# -- View --

with Grid(min_column_width="18rem", gap=6, align="start") as view:
    with ForEach(
        "groups",
        let={"gi": "{{ $index }}", "show_done": "{{ $item.show_done }}"},
    ):
        with Card():
            with CardHeader():
                with Row(gap=2, align="center"):
                    Input(
                        name="groups.{{ gi }}.name",
                        css_class=(
                            "border-0 ring-0 shadow-none p-0 h-auto"
                            " font-semibold text-lg"
                            " focus-visible:ring-0 focus-visible:ring-offset-0"
                        ),
                    )
                    Button(
                        "×",
                        variant="ghost",
                        size="sm",
                        css_class="ml-auto",
                        on_click=PopState("groups", "{{ gi }}"),
                    )

            with CardContent():
                with Column(gap=4):
                    with Form(
                        gap=0,
                        on_submit=[
                            AppendState(
                                "groups.{{ gi }}.todos",
                                {"text": "{{ $item.new_todo }}", "done": False},
                            ),
                            SetState("groups.{{ gi }}.new_todo", ""),
                        ],
                    ):
                        with Row(gap=2):
                            Input(
                                name="groups.{{ gi }}.new_todo",
                                placeholder="Add a todo...",
                            )
                            Button("Add", disabled="{{ not $item.new_todo }}")

                    with Column(gap=2):
                        with If("{{ $item.todos | length }}"):
                            Separator(spacing=3)
                        with ForEach("groups.{{ gi }}.todos"):
                            with If("{{ not $item.done or show_done }}"):
                                with Row(gap=2, align="center"):
                                    Checkbox(
                                        name="groups.{{ gi }}.todos.{{ $index }}.done",
                                    )
                                    Input(
                                        name="groups.{{ gi }}.todos.{{ $index }}.text",
                                        css_class=(
                                            "border-0 ring-0 shadow-none p-0 h-auto"
                                            " focus-visible:ring-0"
                                            " focus-visible:ring-offset-0"
                                        ),
                                    )
                                    Button(
                                        "×",
                                        variant="ghost",
                                        size="sm",
                                        css_class="ml-auto",
                                        on_click=PopState(
                                            "groups.{{ gi }}.todos", "{{ $index }}"
                                        ),
                                    )

            with CardFooter():
                with Row(gap=2, align="center", css_class="w-full justify-between"):
                    Muted("{{ $item.todos | length }} items")
                    with Row(gap=1, align="center"):
                        Checkbox(name="groups.{{ gi }}.show_done", css_class="h-3 w-3")
                        Muted("Show done")

    with Card(css_class="border-dashed p-3"):
        Button(
            "+",
            variant="ghost",
            size="lg",
            css_class=(
                "text-4xl text-muted-foreground w-full h-full min-h-48 rounded-md"
            ),
            on_click=AppendState(
                "groups",
                {
                    "name": "New List",
                    "todos": [],
                    "new_todo": "",
                    "show_done": True,
                },
            ),
        )


# -- App --

app = PrefabApp(
    view=view,
    state={
        "groups": [
            {
                "name": "Work",
                "todos": [
                    {"text": "Find Magrathea", "done": False},
                    {"text": "Escape Vogons", "done": False},
                ],
                "new_todo": "",
                "show_done": True,
            },
            {
                "name": "Personal",
                "todos": [
                    {"text": "Have lunch at Milliways", "done": True},
                    {"text": "Buy towel", "done": False},
                ],
                "new_todo": "",
                "show_done": True,
            },
        ],
    },
)
