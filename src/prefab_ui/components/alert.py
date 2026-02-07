"""Alert components following shadcn/ui conventions.

Alerts display important messages to users.

Example::

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
"""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import Component, ContainerComponent

AlertVariant = Literal["default", "destructive", "success", "warning", "info"]


class Alert(ContainerComponent):
    """An alert container for important messages.

    Args:
        variant: Visual style - "default", "destructive"
        css_class: Additional CSS classes to apply

    Example::

        with Alert():
            AlertTitle("Note")
            AlertDescription("This is an informational message.")

        with Alert(variant="destructive"):
            AlertTitle("Error")
            AlertDescription("Something went wrong.")
    """

    type: Literal["Alert"] = "Alert"
    variant: AlertVariant = Field(
        default="default",
        description="Visual variant: default or destructive",
    )


class AlertTitle(Component):
    """Alert title text.

    Example::

        AlertTitle("Important!")
        AlertTitle("{{ alert_type }}")
    """

    type: Literal["AlertTitle"] = "AlertTitle"
    content: str = Field(description="Title text with {{ field }} interpolation")

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

    Example::

        AlertDescription("Your changes have been saved successfully.")
        AlertDescription("{{ message }}")
    """

    type: Literal["AlertDescription"] = "AlertDescription"
    content: str = Field(description="Description text with {{ field }} interpolation")

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        """Accept content as positional or keyword argument."""
        if content is not None:
            kwargs["content"] = content
        super().__init__(**kwargs)
