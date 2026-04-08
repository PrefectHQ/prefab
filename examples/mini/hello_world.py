"""Hello World — live-updating greeting with reactive state."""

from prefab_ui import PrefabApp
from prefab_ui.components import (
    H3,
    Badge,
    Card,
    CardContent,
    CardFooter,
    Column,
    Input,
    Muted,
    Row,
)
from prefab_ui.rx import Rx

name = Rx("name").default("world")

with PrefabApp() as app:
    with Card():
        with CardContent():
            with Column(gap=3):
                H3(f"Hello, {name}!")
                Muted("Type below and watch this update in real time.")
                Input(name="name", placeholder="Your name...")

        with CardFooter():
            with Row(gap=2):
                Badge(f"Name: {name}", variant="default")
                Badge("Prefab", variant="success")
