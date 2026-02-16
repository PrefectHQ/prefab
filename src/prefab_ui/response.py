"""UIResponse — deprecated alias for PrefabApp.

Use ``PrefabApp`` from ``prefab_ui.app`` instead. UIResponse is kept for
backward compatibility — it's a thin subclass with identical behavior.

The ``PROTOCOL_VERSION`` constant is re-exported here for code that imports
it from this module.
"""

from __future__ import annotations

from prefab_ui.app import PROTOCOL_VERSION, PrefabApp

__all__ = ["PROTOCOL_VERSION", "UIResponse"]


class UIResponse(PrefabApp):
    """Deprecated — use ``PrefabApp`` instead.

    Identical to PrefabApp. Exists for backward compatibility with code
    that imports ``UIResponse`` from ``prefab_ui.response``.
    """
