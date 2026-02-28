"""Conditional rendering components: If, Elif, Else.

These components express conditional logic in the Python DSL as natural
siblings, mirroring Python's own if/elif/else syntax::

    with If("inventory == 0"):
        Alert("Out of stock", variant="destructive")
    with Elif("inventory < 10"):
        Alert("Low stock")
    with Else():
        Badge("In stock")

During serialization, the parent container groups consecutive If/Elif/Else
siblings into a single ``Condition`` node in the wire format. These component
types never appear in the JSON directly.
"""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import ContainerComponent
from prefab_ui.rx import Rx, RxStr


class If(ContainerComponent):
    """Conditional branch — renders children when the condition is truthy.

    Args:
        condition: Expression string evaluated against the current state.

    Example::

        with If("count > 0"):
            Text("{{ count }} items")
    """

    type: Literal["If"] = "If"
    condition: RxStr = Field(description="Expression to evaluate")

    @overload
    def __init__(self, condition: str | Rx, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, condition: str | Rx, **kwargs: Any) -> None: ...

    def __init__(self, condition: str | Rx | None = None, **kwargs: Any) -> None:
        if condition is not None:
            kwargs["condition"] = condition
        super().__init__(**kwargs)


class Elif(ContainerComponent):
    """Alternate conditional branch — must follow an If or another Elif.

    Args:
        condition: Expression string evaluated against the current state.

    Example::

        with Elif("count == 0"):
            Text("No items")
    """

    type: Literal["Elif"] = "Elif"
    condition: RxStr = Field(description="Expression to evaluate")

    @overload
    def __init__(self, condition: str | Rx, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, condition: str | Rx, **kwargs: Any) -> None: ...

    def __init__(self, condition: str | Rx | None = None, **kwargs: Any) -> None:
        if condition is not None:
            kwargs["condition"] = condition
        super().__init__(**kwargs)


class Else(ContainerComponent):
    """Default branch — renders when no preceding If/Elif matched.

    Example::

        with Else():
            Text("Fallback content")
    """

    type: Literal["Else"] = "Else"
