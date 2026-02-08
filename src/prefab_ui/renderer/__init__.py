"""Renderer resource loader for Prefab.

Generates a lightweight HTML stub that loads the pre-built Prefab renderer.
By default the renderer is loaded from a CDN (jsdelivr) using the installed
package version.

Set ``PREFAB_RENDERER_URL`` to load from a different origin — typically a
local static server during development::

    # In the renderer/ directory:
    npm run build              # build the renderer
    npx vite preview           # serve dist/ on localhost:4173

    # Then run your MCP server with:
    PREFAB_RENDERER_URL=http://localhost:4173 uv run python my_server.py

The URL must point at **built assets** (the ``dist/`` output), not a Vite
dev server.  Vite's dev server relies on HTML transforms (React Fast Refresh
preamble injection) that only work when Vite serves the HTML directly — which
isn't the case here, since the HTML is delivered as an MCP resource.
"""

from __future__ import annotations

import os
from importlib.metadata import version as _pkg_version
from urllib.parse import urlparse

_NPM_PACKAGE = "@prefecthq/prefab-ui"
_CDN_TEMPLATE = "https://cdn.jsdelivr.net/npm/{package}@{version}/dist"

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


def _get_origin(url: str) -> str:
    """Extract the origin (scheme + host + port) from a URL."""
    parsed = urlparse(url)
    origin = f"{parsed.scheme}://{parsed.hostname}"
    if parsed.port:
        origin += f":{parsed.port}"
    return origin


def _cdn_base_url() -> str:
    v = _pkg_version("prefab-ui")
    return _CDN_TEMPLATE.format(package=_NPM_PACKAGE, version=v)


def get_renderer_url() -> str:
    """Return the renderer base URL.

    Uses ``PREFAB_RENDERER_URL`` if set (for local development), otherwise
    constructs a CDN URL from the installed ``prefab-ui`` package version.
    """
    override = os.environ.get("PREFAB_RENDERER_URL")
    if override:
        return override.rstrip("/")
    return _cdn_base_url()


def get_renderer_html() -> str:
    """Generate renderer HTML that loads built assets from the renderer URL."""
    base = get_renderer_url()
    return _RENDERER_STUB.format(base_url=base)


def get_renderer_csp() -> dict[str, list[str]]:
    """Return CSP domains needed for the renderer to load.

    Returns a dict with ``resource_domains`` — the origin(s) the host's
    sandbox must allow for loading renderer scripts, styles, and images.

    FastMCP uses this to populate ``_meta.ui.csp`` on the ``ui://`` resource
    so the host's sandbox allows loading renderer assets.
    """
    base = get_renderer_url()
    return {"resource_domains": [_get_origin(base)]}
