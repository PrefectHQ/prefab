"""Renderer resource loader for Prefab.

CDN-first delivery: by default, returns a lightweight HTML stub that
loads the renderer from jsDelivr, pinned to the installed package
version.  Heavy dependencies (recharts, highlight.js, etc.) are
code-split as lazy chunks and only download when used.

For airgapped environments, pass ``mode="bundled"`` to get the
self-contained single-file HTML with all JS/CSS inlined.

Override the renderer URL entirely for local development::

    PREFAB_RENDERER_URL=http://localhost:4173 uv run python my_server.py
"""

from __future__ import annotations

import os
from pathlib import Path
from typing import Literal
from urllib.parse import urlparse

RendererMode = Literal["cdn", "bundled"]

_BUNDLED_HTML = Path(__file__).parent / "app.html"

PYODIDE_CDN_ORIGIN = "https://cdn.jsdelivr.net"

CDN_BASE = "https://cdn.jsdelivr.net/npm/@prefecthq/prefab-ui@{version}/dist/app"

_CDN_TEMPLATE = """\
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prefab</title>
  <link rel="stylesheet" crossorigin href="{base_url}/renderer.css">
</head>
<body>
  <div id="root"></div>
  <script type="module" crossorigin src="{base_url}/renderer.js"></script>
</body>
</html>
"""

_CDN_HEAD = """\
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" crossorigin href="{base_url}/renderer.css">
  <script type="module" crossorigin src="{base_url}/renderer.js"></script>"""

_EXTERNAL_TEMPLATE = """\
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prefab</title>
  <link rel="stylesheet" crossorigin href="{base_url}/renderer.css">
</head>
<body>
  <div id="root"></div>
  <script type="module" crossorigin src="{base_url}/renderer.js"></script>
</body>
</html>
"""

_EXTERNAL_HEAD = """\
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" crossorigin href="{base_url}/renderer.css">
  <script type="module" crossorigin src="{base_url}/renderer.js"></script>"""


def _get_version() -> str:
    """Return the installed prefab-ui version."""
    from prefab_ui import __version__

    return __version__


def _is_dev_version(version: str) -> bool:
    """Check if this is a local dev version with no CDN counterpart."""
    return "dev" in version or version in ("0.0.0",)


def _cdn_base_url(version: str) -> str:
    """Return the jsDelivr base URL for a specific version."""
    return CDN_BASE.format(version=version)


def _get_origin(url: str) -> str:
    """Extract the origin (scheme + host + port) from a URL."""
    parsed = urlparse(url)
    origin = f"{parsed.scheme}://{parsed.hostname}"
    if parsed.port:
        origin += f":{parsed.port}"
    return origin


def _resolve_mode(mode: RendererMode | None) -> RendererMode | str:
    """Resolve the renderer delivery mode.

    Returns ``"cdn"``, ``"bundled"``, or a URL string for dev overrides.

    Resolution order:
    1. Explicit ``mode`` argument
    2. ``PREFAB_RENDERER_URL`` env var → external URL (dev override)
    3. ``PREFAB_BUNDLED_RENDERER=1`` env var → bundled
    4. Dev version (``0.0.0-dev``) → bundled (no CDN version exists)
    5. Default → CDN
    """
    if mode is not None:
        return mode

    url_override = os.environ.get("PREFAB_RENDERER_URL")
    if url_override:
        return url_override.rstrip("/")

    if os.environ.get("PREFAB_BUNDLED_RENDERER"):
        return "bundled"

    if _is_dev_version(_get_version()):
        return "bundled"

    return "cdn"


def _get_bundled_html() -> str:
    """Return the bundled single-file HTML."""
    return _BUNDLED_HTML.read_text(encoding="utf-8")


def get_renderer_head(
    mode: RendererMode | None = None,
    *,
    cdn_version: str | None = None,
) -> str:
    """Return the renderer ``<head>`` content (JS, CSS, meta tags).

    For CDN mode, returns ``<link>``/``<script>`` tags pointing at
    jsDelivr.  For bundled mode, extracts everything between ``<head>``
    and ``</head>`` from the self-contained HTML.  For external URL
    overrides, returns tags pointing at that URL.

    `cdn_version` overrides the version used in CDN URLs. When `None`,
    defaults to the installed version (or `"latest"` for dev builds).
    """
    resolved = _resolve_mode(mode)

    if resolved == "cdn":
        version = cdn_version or _get_version()
        if cdn_version is None and _is_dev_version(version):
            version = "latest"
        base_url = _cdn_base_url(version)
        return _CDN_HEAD.format(base_url=base_url)

    if resolved == "bundled":
        html = _get_bundled_html()
        head_start = html.index("<head>") + len("<head>")
        # The bundled JS contains HTML string literals (e.g. "<head></head><body>"),
        # so we must search for </head> *after* the first real </script> tag.
        # Vite escapes </script> inside inline scripts as <\/script>, so the first
        # literal </script> in the file is always the actual closing tag.
        script_end = html.index("</script>")
        head_end = html.index("</head>", script_end)
        return html[head_start:head_end].rstrip()

    # External URL override
    return _EXTERNAL_HEAD.format(base_url=resolved)


def get_renderer_html(mode: RendererMode | None = None) -> str:
    """Return the renderer HTML.

    By default, returns a lightweight stub that loads the renderer from
    jsDelivr CDN, pinned to the installed package version.  Pass
    ``mode="bundled"`` for a self-contained single-file HTML.

    Set ``PREFAB_RENDERER_URL`` to load from a custom URL (e.g. local
    dev server).  Set ``PREFAB_BUNDLED_RENDERER=1`` to force bundled
    mode via environment.
    """
    resolved = _resolve_mode(mode)

    if resolved == "cdn":
        base_url = _cdn_base_url(_get_version())
        return _CDN_TEMPLATE.format(base_url=base_url)

    if resolved == "bundled":
        return _get_bundled_html()

    # External URL override
    return _EXTERNAL_TEMPLATE.format(base_url=resolved)


def get_renderer_csp(mode: RendererMode | None = None) -> dict[str, list[str]]:
    """Return CSP domains needed for the renderer to load.

    CDN mode requires the jsDelivr origin.  Bundled mode is fully
    self-contained (no external domains needed).  External URL mode
    returns that origin.
    """
    resolved = _resolve_mode(mode)

    if resolved == "cdn":
        return {"resource_domains": [PYODIDE_CDN_ORIGIN]}

    if resolved == "bundled":
        return {"resource_domains": []}

    # External URL override
    return {"resource_domains": [_get_origin(resolved)]}


def get_generative_renderer_html(mode: RendererMode | None = None) -> str:
    """Return the generative renderer HTML.

    Returns the same renderer as ``get_renderer_html()``.  The renderer
    is generative-capable — it includes the Pyodide streaming bridge,
    but the generative code is inert unless the host sends
    ``ontoolinputpartial``.  The CSP requirements differ — use
    ``get_generative_renderer_csp()`` for hosts that use generative
    features.
    """
    return get_renderer_html(mode)


def get_generative_renderer_csp(
    mode: RendererMode | None = None,
) -> dict[str, list[str]]:
    """Return CSP domains needed for the generative renderer.

    Includes the Pyodide CDN origin (jsdelivr) for both resource loading
    (script tags) and connect (fetch for WASM binary and packages), in
    addition to whatever the base renderer needs.
    """
    result = get_renderer_csp(mode)

    # Ensure Pyodide CDN is in resource_domains
    resource_domains = result.get("resource_domains", [])
    if PYODIDE_CDN_ORIGIN not in resource_domains:
        resource_domains = [*resource_domains, PYODIDE_CDN_ORIGIN]
    result["resource_domains"] = resource_domains

    result["connect_domains"] = [
        PYODIDE_CDN_ORIGIN,
        "https://pypi.org",
        "https://files.pythonhosted.org",
    ]

    return result
