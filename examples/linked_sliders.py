"""Linked sliders that sum to 100% — demonstrates CallHandler.

Run with:
    uv run python examples/linked_sliders.py

Opens a browser with three budget sliders. Moving one automatically
redistributes the others so the total always equals 100.
"""

from prefab_ui.actions import CallHandler
from prefab_ui.app import PrefabApp, set_initial_state
from prefab_ui.components import (
    Card,
    CardContent,
    CardHeader,
    Column,
    Row,
    Slider,
    Text,
)

set_initial_state(infra=40, people=35, tools=25)

with Card():
    with CardHeader():
        Text("Budget Allocator", bold=True)
        Text("Move any slider — the others adjust to keep the total at 100%.")

    with CardContent():
        with Column(gap=4):
            for label, key in [
                ("Infrastructure", "infra"),
                ("People", "people"),
                ("Tools", "tools"),
            ]:
                with Column(gap=1):
                    with Row(css_class="justify-between"):
                        Text(label)
                        Text(f"{{{{ {key} | round }}}}%", bold=True)
                    Slider(
                        name=key,
                        max=100,
                        step=1,
                        on_change=CallHandler(
                            "constrain",
                            arguments={"key": key},
                        ),
                    )

            with Row(css_class="justify-between pt-4 border-t"):
                Text("Total", bold=True)
                Text("{{ infra + people + tools | round }}%", bold=True)

app = PrefabApp(
    title="Budget Allocator",
    js_actions={
        "constrain": """(ctx) => {
            const keys = ['infra', 'people', 'tools'];
            const changed = ctx.arguments.key;
            const newVal = ctx.event;
            const others = keys.filter(k => k !== changed);
            const remaining = 100 - newVal;
            const otherTotal = others.reduce((s, k) => s + ctx.state[k], 0);
            const updates = {};
            for (const k of others) {
                updates[k] = otherTotal > 0
                    ? Math.round((ctx.state[k] / otherTotal) * remaining)
                    : Math.round(remaining / others.length);
            }
            return updates;
        }""",
    },
)

if __name__ == "__main__":
    import pathlib
    import tempfile
    import webbrowser

    html = app.html()
    path = pathlib.Path(tempfile.mktemp(suffix=".html"))
    path.write_text(html)
    webbrowser.open(f"file://{path}")
    print(f"Opened {path}")
