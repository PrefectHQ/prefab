"""Alert components following shadcn/ui conventions.

Alerts display important messages to users.

**Example:**

```python
from prefab_ui.components import Alert, AlertTitle, AlertDescription

# Default alert
with Alert():
    AlertTitle("Heads up!")
    AlertDescription("You can add components to your app using the CLI.")

# Destructive alert for errors
with Alert(variant="destructive"):
    AlertTitle("Error")
    AlertDescription("Your session has expired. Please log in again.")

# Simple alert without title
with Alert():
    AlertDescription("Your changes have been saved.")
```
"""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import Component, ContainerComponent
from prefab_ui.rx import RxStr

AlertVariant = Literal["default", "destructive", "success", "warning", "info"] | RxStr


class Alert(ContainerComponent):
    """An alert container for important messages.

    Args:
        variant: Visual style — "default", "destructive", "success", "warning", or "info".
        icon: Lucide icon name in kebab-case (e.g. "circle-alert").

    **Example:**

    ```python
    with Alert():
        AlertTitle("Note")
        AlertDescription("This is an informational message.")

    with Alert(variant="destructive"):
        AlertTitle("Error")
        AlertDescription("Something went wrong.")
    ```
    """

    type: Literal["Alert"] = "Alert"
    variant: AlertVariant = Field(
        default="default",
        description="Visual variant: default, destructive, success, warning, info",
    )
    icon: str | None = Field(
        default=None,
        description="Lucide icon name (kebab-case, e.g. 'circle-alert')",
    )


class AlertTitle(Component):
    """Alert title text.

    Args:
        content: Title text.

    **Example:**

    ```python
    AlertTitle("Important!")
    AlertTitle("{{ alert_type }}")
    ```
    """

    type: Literal["AlertTitle"] = "AlertTitle"
    content: RxStr = Field(description="Title text")

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        """Accept content as positional or keyword argument."""
        if content is not None:
            kwargs["content"] = content
        super().__init__(**kwargs)


class AlertDescription(Component):
    """Alert description text.

    Args:
        content: Description text.

    **Example:**

    ```python
    AlertDescription("Your changes have been saved successfully.")
    AlertDescription("{{ message }}")
    ```
    """

    type: Literal["AlertDescription"] = "AlertDescription"
    content: RxStr = Field(description="Description text")

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        """Accept content as positional or keyword argument."""
        if content is not None:
            kwargs["content"] = content
        super().__init__(**kwargs)
