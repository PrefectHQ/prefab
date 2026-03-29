"""Mermaid diagram component."""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import Component
from prefab_ui.rx import RxStr


class Mermaid(Component):
    """Render a Mermaid diagram from a text definition.

    Supports flowcharts, sequence diagrams, state machines, ER diagrams,
    and all other Mermaid diagram types.

    Args:
        chart: Mermaid diagram definition string.

    **Example:**

    ```python
    Mermaid('''
        graph LR
            A[Start] --> B{Decision}
            B -->|Yes| C[OK]
            B -->|No| D[Cancel]
    ''')
    ```
    """

    type: Literal["Mermaid"] = "Mermaid"
    chart: RxStr = Field(description="Mermaid diagram definition")

    @overload
    def __init__(self, chart: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, chart: str, **kwargs: Any) -> None: ...

    def __init__(self, chart: str | None = None, **kwargs: Any) -> None:
        """Accept chart as positional or keyword argument."""
        if chart is not None:
            kwargs["chart"] = chart
        super().__init__(**kwargs)
