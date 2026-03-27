"""MCP-specific reactive references.

These references resolve to values injected by the MCP Apps host. They're
only meaningful when the renderer is connected to an MCP host — in
standalone mode they'll be undefined.
"""

from prefab_ui.rx import Rx

#: The MCP host context. Provides reactive access to host environment
#: state like display mode and theme:
#:
#: ```python
#: HOST.displayMode        # `{{ $host.displayMode }}`
#: HOST.theme              # `{{ $host.theme }}`
#: HOST.availableDisplayModes  # `{{ $host.availableDisplayModes }}`
#: ```
HOST: Rx = Rx("$host")
