"""Define — named reusable component templates.

A ``Define`` captures a component subtree as a named template that can be
referenced with :class:`~prefab_ui.use.Use`. Definitions live outside the
component tree and are passed to :class:`~prefab_ui.app.PrefabApp`
via the ``defs`` parameter.

Example::

    from prefab_ui.define import Define
    from prefab_ui.use import Use
    from prefab_ui.app import PrefabApp
    from prefab_ui.components import Card, Column, Heading, Badge

    with Define("user-card") as user_card:
        with Card():
            Heading("{{ name }}")
            Badge("{{ role }}")

    with Column() as layout:
        Use("user-card", name="Alice", role="Engineer")
        Use("user-card", name="Bob", role="Designer")

    PrefabApp(view=layout, defs=[user_card])
"""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import ContainerComponent


class Define(ContainerComponent):
    """Create a named, reusable component template.

    Define captures children via the context manager but does **not**
    attach itself to any parent container. Pass Define instances to
    ``PrefabApp(defs=[...])`` to include them in the wire format.

    Args:
        name: Template name, referenced by :class:`~prefab_ui.use.Use`.
    """

    type: Literal["Define"] = "Define"
    name: str = Field(description="Template name for $ref lookup")

    def model_post_init(self, __context: Any) -> None:
        # Skip auto-append — Define lives outside the component tree.
        pass

    def __init__(self, name: str, /, **kwargs: Any) -> None:
        kwargs["name"] = name
        super().__init__(**kwargs)

    def to_json(self) -> dict[str, Any]:
        """Return the template body, not a Define wrapper.

        Single child returns that child's JSON directly. Multiple
        children are wrapped in an implicit Column.
        """
        if len(self.children) == 1:
            return self.children[0].to_json()
        return {
            "type": "Column",
            "children": [c.to_json() for c in self.children],
        }
