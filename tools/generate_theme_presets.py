"""Compile the built-in themes to CSS for the playground theme picker.

Run via: uv run tools/generate_theme_presets.py

The picker used to carry a hand-written TypeScript port of each Python theme,
which drifted every time the Python side changed. Compiling the real
`prefab_ui.themes` classes here means the picker and `PrefabApp(theme=...)`
cannot disagree.

Outputs renderer/src/playground/themes.json.
"""

from __future__ import annotations

import json
from pathlib import Path

from prefab_ui.themes import Basic, MySpace, Presentation, Windows2000
from prefab_ui.themes.base import Theme

root = Path(__file__).resolve().parents[1]
output = root / "renderer" / "src" / "playground" / "themes.json"

# `swatch` is the dot shown on the picker button. Accent-driven themes derive
# it from their hue; the total-conversion themes name a literal color, since
# an OKLCH hue at fixed chroma cannot represent Win2K's near-black navy.
PRESETS: list[tuple[str, Theme | None, str | None]] = [
    ("Code", None, None),
    ("Presentation", Presentation(), "oklch(0.6 0.24 275)"),
    ("Windows 2000", Windows2000(), "#0a246a"),
    ("MySpace", MySpace(), "#ff69b4"),
    ("Blue", Basic(accent=260), "oklch(0.6 0.24 260)"),
    ("Green", Basic(accent=155), "oklch(0.6 0.24 155)"),
    ("Red", Basic(accent=25), "oklch(0.6 0.24 25)"),
    ("Orange", Basic(accent=55), "oklch(0.6 0.24 55)"),
    ("Violet", Basic(accent=295), "oklch(0.6 0.24 295)"),
    ("Rose", Basic(accent=350), "oklch(0.6 0.24 350)"),
]


def main() -> None:
    presets = [
        {
            "name": name,
            "css": theme.to_css() if theme is not None else "",
            "swatch": swatch,
            # Windows2000 and MySpace force a color scheme. Executed code
            # already applies it via the app's wire format; picking the preset
            # bypasses execution, so the picker needs it here too.
            "mode": theme.to_json().get("mode") if theme is not None else None,
        }
        for name, theme, swatch in PRESETS
    ]
    output.write_text(json.dumps(presets, indent=2) + "\n")
    print(f"Wrote {len(presets)} theme presets to {output.relative_to(root)}")


if __name__ == "__main__":
    main()
