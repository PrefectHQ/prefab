"""ForEach control-flow component for iterating over lists.

Repeats its children once per item in a data list, passing each item as the
data context for interpolation.

Example::

    from prefab_ui.components.control_flow import ForEach
    from prefab_ui.components import Card, CardTitle, Badge

    with ForEach("users"):
        with Card():
            CardTitle("{{ name }}")
            Badge("{{ role }}")

When rendered with ``data={"users": [{"name": "Alice", ...}, ...]}``, produces
one Card per user.
"""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import ContainerComponent


class ForEach(ContainerComponent):
    """Repeat children for each item in a data list.

    Args:
        key: The data field containing the list to iterate over.
        css_class: Additional CSS classes for the wrapper element.

    Example::

        with ForEach("users"):
            with Card():
                CardTitle("{{ name }}")

        # With data={"users": [{"name": "Alice"}, {"name": "Bob"}]}
        # renders two Cards.
    """

    type: Literal["ForEach"] = "ForEach"
    key: str = Field(description="Data field containing the list to iterate over")

    @overload
    def __init__(self, key: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, key: str, **kwargs: Any) -> None: ...

    def __init__(self, key: str | None = None, **kwargs: Any) -> None:
        """Accept key as positional or keyword argument."""
        if key is not None:
            kwargs["key"] = key
        super().__init__(**kwargs)
