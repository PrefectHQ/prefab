"""Slideshow — two presentation slides with keyboard navigation.

Arrow keys navigate between slides. Shift+? opens the shortcuts dialog.

Run with:
    prefab serve examples/presentation/slideshow.py
    prefab export examples/presentation/slideshow.py
"""

from cost_overview import slide as cost_slide
from fleet_performance import slide as fleet_slide

from prefab_ui import PrefabApp
from prefab_ui.actions import SetState
from prefab_ui.components import Button, Column, Muted, Page, Pages, Row
from prefab_ui.rx import Rx
from prefab_ui.shortcuts import KeyboardShortcutsDialog
from prefab_ui.themes import Presentation

slide = Rx("slide")

shortcuts = {
    "ArrowRight": "Next slide",
    "ArrowLeft": "Previous slide",
    "Shift+?": "Show shortcuts",
}

with PrefabApp(
    theme=Presentation(),
    state={"slide": "fleet"},
    key_bindings={
        "ArrowRight": SetState("slide", (slide == "fleet").then("cost", "fleet")),
        "ArrowLeft": SetState("slide", (slide == "cost").then("fleet", "cost")),
        "Shift+?": SetState("_show_shortcuts", True),
    },
) as app:
    with Column(gap=4):
        slide_class = "min-h-[520px]"
        with Pages(name="slide", value="fleet"):
            with Page("fleet"):
                fleet_slide(css_class=slide_class)
            with Page("cost"):
                cost_slide(css_class=slide_class)

        with Row(css_class="justify-end items-center", gap=3):
            Muted((slide == "fleet").then("1 / 2", "2 / 2"))
            Button(
                "←",
                variant="outline",
                size="sm",
                on_click=SetState("slide", (slide == "cost").then("fleet", "cost")),
            )
            Button(
                "→",
                variant="outline",
                size="sm",
                on_click=SetState("slide", (slide == "fleet").then("cost", "fleet")),
            )
            KeyboardShortcutsDialog(shortcuts)
