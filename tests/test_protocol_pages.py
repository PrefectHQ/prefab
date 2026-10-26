"""Protocol discovery must include chart types exposed by the wire contract."""

import json
import runpy
from pathlib import Path

ROOT = Path(__file__).parents[1]


def test_chart_protocol_pages_cover_the_wire_contract():
    generator = runpy.run_path(str(ROOT / "tools/generate_protocol_pages.py"))
    manifest = json.loads(
        (ROOT / "renderer/schemas/manifest.json").read_text(encoding="utf-8")
    )
    chart_types = {
        name
        for name in manifest["components"]
        if name.endswith("Chart") or name == "Sparkline"
    }
    classes = generator["COMPONENT_CLASSES"]
    assert chart_types <= classes.keys()
    for name in chart_types:
        schema = generator["clean_schema"](classes[name])
        assert {"ariaLabel", "ariaLabelledBy"} <= schema["properties"].keys()
        filename = generator["_class_to_filename"](name) + ".mdx"
        assert (ROOT / "docs/protocol" / filename).read_text(
            encoding="utf-8"
        ) == generator["generate_component_page"](name, classes[name])
