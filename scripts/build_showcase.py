#!/usr/bin/env python3
"""Build standalone showcase HTML files for screenshots/presentations.

Extracts the welcome showcase JSON from docs/welcome.mdx and bakes it into
self-contained copies of the renderer — one light, one dark — both with the
fade-to-white/black mask and #08000E background. Output goes to /tmp/ by default.

Usage:
    uv run scripts/build_showcase.py
    uv run scripts/build_showcase.py --out-dir ~/Desktop
    uv run scripts/build_showcase.py --open
"""

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
WELCOME_MDX = REPO_ROOT / "docs/welcome.mdx"
APP_HTML = REPO_ROOT / "src/prefab_ui/renderer/app.html"
BG = "#08000E"


def extract_showcase_json(mdx: Path) -> str:
    content = mdx.read_text()
    match = re.search(
        r'<ComponentPreview[^>]*id="showcase"[^>]*json=(\{.*?\})\s*>',
        content,
        re.DOTALL,
    )
    if not match:
        raise ValueError("Could not find showcase ComponentPreview in welcome.mdx")
    json_str = match.group(1)[1:-1]  # strip outer JSX braces
    json.loads(json_str)  # validate
    return json_str


def build_html(json_str: str, dark: bool) -> str:
    js_literal = json.dumps(json_str)
    inject = f"""<script>
(function() {{
  var j = {js_literal};
  if (!window.location.hash) {{
    history.replaceState(null, '', '#docpreview:' + encodeURIComponent(j));
  }}
}})();
</script>
<style>
  body {{ background: {BG}; margin: 0; }}
  #root {{
    max-height: 900px;
    overflow: hidden;
    position: relative;
    -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent);
    mask-image: linear-gradient(to bottom, black 70%, transparent);
  }}
</style>
"""
    html = APP_HTML.read_text()
    html = html.replace('<script type="module"', inject + '<script type="module"', 1)
    if dark:
        html = html.replace('<html lang="en">', '<html lang="en" class="dark">', 1)
    return html


def build(out_dir: Path, open_after: bool = False) -> None:
    json_str = extract_showcase_json(WELCOME_MDX)
    out_dir.mkdir(parents=True, exist_ok=True)

    files = [
        (out_dir / "showcase-light.html", False),
        (out_dir / "showcase-dark.html", True),
    ]
    for path, dark in files:
        path.write_text(build_html(json_str, dark=dark))
        print(f"Written to {path}")
        if open_after:
            subprocess.run(["open", str(path)])


def main() -> None:
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("--out-dir", type=Path, default=Path("/tmp"))
    parser.add_argument(
        "--open", action="store_true", help="Open both files in browser after building"
    )
    args = parser.parse_args()

    try:
        build(args.out_dir, open_after=args.open)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
