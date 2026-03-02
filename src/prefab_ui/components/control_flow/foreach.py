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
from prefab_ui.rx import INDEX, ITEM, LoopItem, Rx, _generate_key


class ForEach(ContainerComponent):
    """Repeat children for each item in a data list.

    The context manager form auto-captures ``$item`` and ``$index`` into
    scoped ``let`` bindings, so each loop level keeps its own references
    even when nested::

        with ForEach("groups") as (gi, group):
            with ForEach(f"groups.{gi}.todos") as (_, todo):
                Text(f"{todo.name} in {group.name}")

    The returned object supports both simple and destructured usage:

    - ``as item`` — acts as an Rx for the current item
    - ``as (idx, item)`` — tuple unpacking (index first, matching enumerate)
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

    def __enter__(self) -> LoopItem:  # type: ignore[override]
        """Push onto the component stack and return a scoped loop binding.

        Auto-generates ``let`` bindings that capture ``$item`` and ``$index``
        under unique names, so nested loops don't shadow each other.
        """
        super().__enter__()
        item_name = _generate_key("_loop")
        index_name = f"{item_name}_idx"
        auto_let: dict[str, Any] = {item_name: ITEM, index_name: INDEX}
        if self.let is not None:
            auto_let.update(self.let)
        object.__setattr__(self, "let", auto_let)
        return LoopItem(item_name, index_name)
