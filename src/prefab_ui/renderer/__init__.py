"""Renderer resource loader for Prefab.

Generates lightweight HTML stubs that load the Prefab renderer from the
``PREFAB_RENDERER_URL`` environment variable. In development this
points at the Vite dev server; in production at a CDN.
"""

from __future__ import annotations

import os

_RENDERER_STUB = """\
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

_RENDERER_DEV_STUB = """\
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prefab</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="{base_url}/@vite/client"></script>
  <script type="module" src="{base_url}/src/main.tsx"></script>
</body>
</html>
"""


def get_renderer_url() -> str | None:
    """Return the configured renderer URL, or ``None`` if not set."""
    return os.environ.get("PREFAB_RENDERER_URL")


def get_renderer_html() -> str:
    """Generate renderer HTML that loads from the configured URL.

    Raises ``RuntimeError`` if ``PREFAB_RENDERER_URL`` is not set.
    """
    url = get_renderer_url()
    if not url:
        raise RuntimeError(
            "PREFAB_RENDERER_URL is not set. Point it at the renderer "
            "(e.g. http://localhost:3333 for local dev, or a CDN URL for production)."
        )
    base = url.rstrip("/")
    if "localhost" in base or "127.0.0.1" in base:
        return _RENDERER_DEV_STUB.format(base_url=base)
    return _RENDERER_STUB.format(base_url=base)
