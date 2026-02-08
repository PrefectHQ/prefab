"""Renderer resource loader for Prefab.

Generates lightweight HTML stubs that load the Prefab renderer.  By default
the renderer is loaded from a CDN (jsdelivr) using the installed package
version.  Set ``PREFAB_RENDERER_URL`` to override — typically to point at
a local Vite dev server during framework development.
"""

from __future__ import annotations

import os
from importlib.metadata import version as _pkg_version

_NPM_PACKAGE = "@prefect/prefab-ui"
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


def _is_dev_url(url: str) -> bool:
    return "localhost" in url or "127.0.0.1" in url


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
    """Generate renderer HTML that loads from the renderer URL."""
    base = get_renderer_url()
    if _is_dev_url(base):
        return _RENDERER_DEV_STUB.format(base_url=base)
    return _RENDERER_STUB.format(base_url=base)


def get_renderer_csp() -> list[str]:
    """Return CSP ``resourceDomains`` needed for the renderer to load.

    FastMCP uses this to set ``_meta.ui.csp.resourceDomains`` on the
    ``ui://`` resource so the host's sandbox allows loading renderer assets.
    """
    base = get_renderer_url()
    if _is_dev_url(base):
        return [base]
    return ["https://cdn.jsdelivr.net"]
