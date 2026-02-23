"""Generate an HTML file containing all component classes for Tailwind to scan.

Run via: uv run docs-build/generate_content.py

This renders every component variant to HTML and writes the output to
docs-build/content.html. The Tailwind CLI then scans this file (along
with the MDX docs) to know which utility classes to include in preview.css.
"""

from __future__ import annotations

import sys
from pathlib import Path

# Ensure the source tree and local modules are importable
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from html_renderer import render_json

from prefab_ui.components import (
    H1,
    H2,
    H3,
    H4,
    Alert,
    AlertDescription,
    AlertTitle,
    Badge,
    BlockQuote,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Checkbox,
    Column,
    Div,
    Grid,
    InlineCode,
    Input,
    Label,
    Large,
    Lead,
    Muted,
    P,
    Radio,
    RadioGroup,
    Row,
    Select,
    SelectOption,
    Separator,
    Slider,
    Small,
    Span,
    Switch,
    Textarea,
)

fragments: list[str] = []


def add(component: object) -> None:
    fragments.append(render_json(component.to_json()))  # type: ignore[union-attr]


# Typography — every variant
for Cls in (H1, H2, H3, H4, P, Lead, Large, Small, Muted, BlockQuote, InlineCode):
    add(Cls("text"))

# Button — every variant × every size
for variant in (
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
    "success",
    "warning",
    "info",
):
    for size in ("default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"):
        add(Button(label="x", variant=variant, size=size))

# Button disabled
add(Button(label="x", disabled=True))

# Badge — every variant
for variant in (
    "default",
    "secondary",
    "destructive",
    "outline",
    "ghost",
    "success",
    "warning",
    "info",
):
    add(Badge(label="x", variant=variant))

# Card — full structure
with Card() as card:
    with CardHeader():
        CardTitle(content="x")
        CardDescription(content="x")
    with CardContent():
        P("x")
    with CardFooter():
        Button(label="x")
add(card)

# Alert — every variant
for variant in ("default", "destructive", "success", "warning", "info"):
    with Alert(variant=variant) as alert:
        AlertTitle(content="x")
        AlertDescription(content="x")
    add(alert)

# Layout containers
add(Row())
add(Column())
add(Grid(columns=3))
add(Div())
add(Span("x"))

# Form components
add(Label("Label"))
add(Input(placeholder="Input"))
add(Input(input_type="email"))
add(Input(disabled=True))
add(Textarea(placeholder="Textarea"))
add(Checkbox(label="Checkbox"))
add(Checkbox(label="Checked", checked=True))
add(Radio(value="a", label="Radio"))
add(Radio(value="b", label="Checked", checked=True))
with RadioGroup(name="test") as rg:
    Radio(value="1", label="One")
    Radio(value="2", label="Two")
add(rg)
add(Switch(label="Switch"))
add(Switch(label="Checked", checked=True))
add(Switch(label="Small", size="sm"))
for sel_size in ("default", "sm"):
    with Select(placeholder="Select", size=sel_size) as sel:
        SelectOption(value="a", label="Option A")
        SelectOption(value="b", label="Option B")
    add(sel)
add(Separator())
add(Separator(orientation="vertical"))
add(Slider(min=0, max=100, value=50))

# ButtonGroup — both orientations
with ButtonGroup() as bg_h:
    Button(label="Left")
    Button(label="Right")
add(bg_h)
with ButtonGroup(orientation="vertical") as bg_v:
    Button(label="Top")
    Button(label="Bottom")
add(bg_v)

# Write the combined HTML
out = Path(__file__).with_name("content.html")
out.write_text("\n".join(fragments))
print(f"Wrote {len(fragments)} fragments to {out}")
