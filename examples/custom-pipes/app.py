"""Custom pipes — register JavaScript formatting functions for use in expressions.

Run with:
    uv run prefab serve examples/custom-pipes/app.py
"""

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

with Card() as card:
    with CardHeader():
        Text("Custom Pipes", bold=True)
        Text("JavaScript formatting functions, used in {{ }} expressions.")

    with CardContent():
        with Column(gap=6):
            with Column(gap=2):
                Text("Temperature")
                with Row(css_class="items-center gap-4"):
                    Slider(name="temp", value=72, min=32, max=120, step=1)
                    Text("{{ temp | tempColor }}", bold=True)

            with Column(gap=2):
                Text("Rating")
                with Row(css_class="items-center gap-4"):
                    Slider(name="score", value=3, min=0, max=5, step=0.5)
                    Text("{{ score | stars }}")

            with Column(gap=2):
                Text("Name: {{ name }}")
                Text("Initials: {{ name | initials }}", bold=True)

app = PrefabApp(
    state={"temp": 72, "score": 3, "name": "Arthur Dent"},
    title="Custom Pipes",
    view=card,
    js_pipes={
        "tempColor": """(value) => {
            const f = Number(value);
            if (f >= 100) return f + '°F 🔥';
            if (f >= 80) return f + '°F ☀️';
            if (f >= 60) return f + '°F 🌤️';
            return f + '°F ❄️';
        }""",
        "stars": """(value) => {
            const n = Number(value);
            const full = Math.floor(n);
            const half = n % 1 >= 0.5 ? 1 : 0;
            const empty = 5 - full - half;
            return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
        }""",
        "initials": """(value) => {
            return String(value).split(' ').map(w => w[0]).join('');
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
