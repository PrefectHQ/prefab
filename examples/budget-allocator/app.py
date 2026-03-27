"""Linked sliders that sum to 100% — demonstrates CallHandler.

Run with:
    uv run prefab serve examples/budget-allocator/app.py

Five budget sliders. Moving one proportionally adjusts the others
so the total always equals 100.
"""

from prefab_ui.actions import CallHandler
from prefab_ui.app import PrefabApp
from prefab_ui.components import (
    Card,
    CardContent,
    CardHeader,
    Column,
    Row,
    Slider,
    Text,
)

categories = [
    ("Infrastructure", "infra", 30),
    ("People", "people", 25),
    ("Tools", "tools", 20),
    ("Marketing", "marketing", 15),
    ("Research", "research", 10),
]

with Card() as card:
    with CardHeader():
        Text("Budget Allocator", bold=True)
        Text("Drag any slider — the others shrink proportionally.")

    with CardContent():
        with Column(gap=4):
            for label, key, default in categories:
                with Column(gap=1):
                    with Row(css_class="justify-between"):
                        Text(label)
                        Text(f"{{{{ {key} | round }}}}%", bold=True)
                    Slider(
                        name=key,
                        value=default,
                        max=100,
                        step=0.01,
                        on_change=CallHandler(
                            "constrain",
                            arguments={"key": key},
                        ),
                    )

            with Row(css_class="justify-between pt-4 border-t"):
                Text("Total", bold=True)
                keys_expr = " + ".join(key for _, key, _ in categories)
                Text(f"{{{{ {keys_expr} | round }}}}%", bold=True)

app = PrefabApp(
    state={key: val for _, key, val in categories},
    title="Budget Allocator",
    view=card,
    js_actions={
        "constrain": """(ctx) => {
            const keys = ['infra', 'people', 'tools', 'marketing', 'research'];
            const changed = ctx.arguments.key;
            const newVal = ctx.event;
            const others = keys.filter(k => k !== changed);
            const otherTotal = others.reduce((s, k) => s + ctx.state[k], 0);
            const remaining = 100 - newVal;
            const updates = {};

            for (const k of others) {
                updates[k] = otherTotal > 0
                    ? (ctx.state[k] / otherTotal) * remaining
                    : remaining / others.length;
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
