"""Renderer resource loader for Prefab.

Ships a pre-built, self-contained HTML file (all JS/CSS inlined) inside the
Python package.  ``get_renderer_html()`` reads and returns it directly — no
external server, CDN, or CSP domains required.

Set ``PREFAB_RENDERER_URL`` to load renderer assets from an external origin
instead — useful for local development with ``npx vite preview`` or a CDN::

    PREFAB_RENDERER_URL=http://localhost:4173 uv run python my_server.py
"""

from __future__ import annotations

import os
from pathlib import Path
from urllib.parse import urlparse

_BUNDLED_HTML = Path(__file__).parent / "app.html"

_EXTERNAL_TEMPLATE = """\
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prefab</title>
  <link rel="stylesheet" crossorigin href="{base_url}/assets/renderer.css">
</head>
<body>
  <div id="root"></div>
  <script type="module" crossorigin src="{base_url}/assets/renderer.js"></script>
</body>
</html>
"""


def _get_origin(url: str) -> str:
    """Extract the origin (scheme + host + port) from a URL."""
    parsed = urlparse(url)
    origin = f"{parsed.scheme}://{parsed.hostname}"
    if parsed.port:
        origin += f":{parsed.port}"
    return origin


def get_renderer_html() -> str:
    """Return the renderer HTML.

    By default, returns the bundled single-file HTML with all JS/CSS
    inlined.  When ``PREFAB_RENDERER_URL`` is set, returns a lightweight
    stub that loads assets from that external origin.
    """
    override = os.environ.get("PREFAB_RENDERER_URL")
    if override:
        return _EXTERNAL_TEMPLATE.format(base_url=override.rstrip("/"))
    return _BUNDLED_HTML.read_text()


def get_renderer_csp() -> dict[str, list[str]]:
    """Return CSP domains needed for the renderer to load.

    The bundled renderer is fully self-contained, so no CSP domains are
    needed.  When ``PREFAB_RENDERER_URL`` is set, returns the external
    origin so the host sandbox allows loading those assets.
    """
    override = os.environ.get("PREFAB_RENDERER_URL")
    if override:
        return {"resource_domains": [_get_origin(override.rstrip("/"))]}
    return {"resource_domains": []}
