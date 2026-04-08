"""Actions — chaining multiple actions from user interactions."""

from prefab_ui import PrefabApp
from prefab_ui.actions import SetState, ShowToast, ToggleState
from prefab_ui.components import (
    Badge,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Column,
    Muted,
    Progress,
    Row,
    Text,
)
from prefab_ui.components.control_flow import Else, If
from prefab_ui.rx import Rx

count = Rx("count")
saved = Rx("saved")

with PrefabApp(state={"count": 0, "saved": False}) as app:
    with Card():
        with CardHeader():
            CardTitle("Actions Demo")
            Muted("Chain multiple actions from a single click.")

        with CardContent():
            with Column(gap=4):
                with Row(gap=2, align="center"):
                    Button(
                        "Count + 1",
                        on_click=SetState("count", count + 1),
                    )
                    Button(
                        "Count + 10",
                        variant="secondary",
                        on_click=[
                            SetState("count", count + 10),
                            ShowToast("Jumped ahead by 10!"),
                        ],
                    )
                    Button(
                        "Reset",
                        variant="outline",
                        on_click=[
                            SetState("count", 0),
                            SetState("saved", False),
                        ],
                    )

                Progress(
                    value=count,
                    max=100,
                    variant=(count >= 100).then("success", "default"),
                )

                with Row(
                    gap=2,
                    align="center",
                    css_class="justify-between",
                ):
                    Text(f"Count: {count}")
                    with If(saved):
                        Badge("Saved", variant="success")
                    with Else():
                        Button(
                            "Save",
                            size="sm",
                            on_click=[
                                ToggleState("saved"),
                                ShowToast(f"Saved at {count}!"),
                            ],
                        )
