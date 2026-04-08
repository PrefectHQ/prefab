"""Dynamic List — add and remove items with ForEach."""

from prefab_ui import PrefabApp
from prefab_ui.actions import AppendState, PopState, SetState
from prefab_ui.components import (
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    Column,
    Input,
    Muted,
    Row,
    Separator,
    Text,
)
from prefab_ui.components.control_flow import ForEach
from prefab_ui.rx import INDEX, ITEM, Rx

new_task = Rx("new_task")
tasks = Rx("tasks")

with PrefabApp(
    state={
        "tasks": ["Buy towel", "Learn Python", "Don't panic"],
        "new_task": "",
    },
) as app:
    with Card():
        with CardHeader():
            CardTitle("Task List")
            Muted(f"{tasks.length()} items")

        with CardContent():
            with Column(gap=3):
                with Row(gap=2):
                    Input(
                        name="new_task",
                        placeholder="Add a task...",
                    )
                    Button(
                        "Add",
                        on_click=[
                            AppendState("tasks", new_task),
                            SetState("new_task", ""),
                        ],
                    )

                Separator()

                with ForEach(tasks):
                    with Row(
                        gap=2,
                        align="center",
                        css_class="justify-between",
                    ):
                        Text(ITEM)
                        Button(
                            "Remove",
                            variant="outline",
                            size="sm",
                            on_click=PopState("tasks", index=INDEX),
                        )

        with CardFooter():
            Button(
                "Clear All",
                variant="destructive",
                on_click=SetState("tasks", []),
            )
