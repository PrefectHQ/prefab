"""Custom JavaScript handler action."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.actions.base import Action


class CallHandler(Action):
    """Invoke a developer-registered JavaScript handler by name.

    The handler receives the current state snapshot plus the triggering
    event value, and returns state updates to merge.

    **Example:**

    ```python
    Slider(on_change=CallHandler("constrainBudget"))
    Button(on_click=CallHandler("refresh", arguments={"force": True}))
    ```
    """

    action: Literal["callHandler"] = "callHandler"
    handler: str = Field(description="Name of the registered handler function")
    arguments: dict[str, Any] | None = Field(
        default=None,
        description="Extra arguments passed to the handler",
    )

    def __init__(self, handler: str | None = None, **kwargs: Any) -> None:
        if handler is not None and "handler" not in kwargs:
            kwargs["handler"] = handler
        super().__init__(**kwargs)
