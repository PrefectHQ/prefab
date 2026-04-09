"""Conditional Rendering — toggle between UI states."""

from prefab_ui import PrefabApp
from prefab_ui.components import (
    Alert,
    AlertDescription,
    AlertTitle,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Column,
    Switch,
    Text,
)
from prefab_ui.components.control_flow import Else, If
from prefab_ui.rx import Rx

dark_mode = Rx("dark_mode")
notifications = Rx("notifications")

with PrefabApp(
    state={"dark_mode": False, "notifications": True},
) as app:
    with Card():
        with CardHeader():
            CardTitle("Preferences")

        with CardContent():
            with Column(gap=4):
                Switch(
                    label="Dark Mode",
                    name="dark_mode",
                    value=False,
                )
                Switch(
                    label="Notifications",
                    name="notifications",
                    value=True,
                )

                with If(dark_mode):
                    with Alert(variant="info"):
                        AlertTitle("Dark Mode")
                        AlertDescription("Your eyes will thank you.")
                with Else():
                    with Alert(variant="warning"):
                        AlertTitle("Light Mode")
                        AlertDescription("Living dangerously, I see.")

                with If(notifications):
                    Text(
                        "You'll receive alerts for all events.",
                        css_class="text-sm text-muted-foreground",
                    )
                with Else():
                    Text(
                        "Notifications are off. You're on your own.",
                        css_class="text-sm text-muted-foreground",
                    )
