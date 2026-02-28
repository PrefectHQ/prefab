"""ForEach control-flow component for iterating over lists.

Repeats its children once per item in a data list.  Inside the loop,
``$item`` refers to the current element and ``$index`` to its position.
Use the context manager form to get a typed handle::

    from prefab_ui.components.control_flow import ForEach
    from prefab_ui.components import Card, CardTitle, Badge

    with ForEach("users") as user:
        with Card():
            CardTitle(user.name)
            Badge(user.role)

The ``user`` variable is an ``Rx("$item")`` reference — attribute access
chains into dot-path expressions like ``{{ $item.name }}``.
"""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import ContainerComponent
from prefab_ui.rx import ITEM, Rx


class ForEach(ContainerComponent):
    """Repeat children for each item in a data list.

    Args:
        key: The data field containing the list to iterate over.
            Accepts a string key or an ``Rx`` reference.
        css_class: Additional CSS classes for the wrapper element.

    Example::

        with ForEach("users") as user:
            with Card():
                CardTitle(user.name)

        # With data={"users": [{"name": "Alice"}, {"name": "Bob"}]}
        # renders two Cards.
    """

    type: Literal["ForEach"] = "ForEach"
    key: str = Field(description="Data field containing the list to iterate over")

    @overload
    def __init__(self, key: str | Rx, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, key: str | Rx, **kwargs: Any) -> None: ...

    def __init__(self, key: str | Rx | None = None, **kwargs: Any) -> None:
        """Accept key as positional or keyword argument."""
        if key is not None:
            kwargs["key"] = key.key if isinstance(key, Rx) else key
        super().__init__(**kwargs)

    def __enter__(self) -> Rx:  # type: ignore[override]
        """Push onto the component stack and return ``ITEM`` (``Rx("$item")``)."""
        super().__enter__()
        return ITEM
