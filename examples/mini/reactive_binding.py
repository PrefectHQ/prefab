"""Reactive Binding — a slider drives a ring, progress bars, and text."""

from prefab_ui import PrefabApp
from prefab_ui.components import (
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Column,
    Grid,
    Muted,
    Progress,
    Ring,
    Row,
    Slider,
    Text,
)
from prefab_ui.rx import Rx

level = Rx("level")
variant = (level > 75).then("destructive", (level > 40).then("warning", "success"))

with PrefabApp(state={"level": 50}) as app:
    with Card():
        with CardHeader():
            CardTitle("Power Level")

        with CardContent():
            with Column(gap=6):
                Slider(name="level", min=0, max=100, value=50)

                with Row(gap=6, align="center"):
                    Ring(
                        value=level,
                        label=f"{level}%",
                        variant=variant,
                        size="lg",
                        thickness=10,
                    )

                    with Grid(columns=2, gap=4, css_class="flex-1"):
                        with Column(gap=1):
                            Muted("Primary")
                            Progress(value=level, max=100, variant=variant)
                        with Column(gap=1):
                            Muted("Inverse")
                            Progress(
                                value=100 - level,
                                max=100,
                                variant="info",
                            )
                        with Column(gap=1):
                            Muted("Doubled")
                            Progress(
                                value=level * 2,
                                max=100,
                                variant="default",
                            )
                        with Column(gap=1):
                            Muted("Halved")
                            Progress(
                                value=level / 2,
                                max=100,
                                variant="success",
                            )

                Text(
                    f"Level is {level}% — "
                    f"{(level > 75).then('critical!', (level > 40).then('nominal', 'low'))}",
                    css_class="text-sm text-muted-foreground text-center",
                )
