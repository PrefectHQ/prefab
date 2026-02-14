"""Use — reference a defined component template.

A ``Use`` node references a :class:`~prefab_ui.define.Define` template by
name. On the wire it desugars to ``{"$ref": "name"}``, with optional ``let``
bindings for scoped overrides and ``cssClass`` for styling.

Example::

    from prefab_ui.define import Define
    from prefab_ui.use import Use
    from prefab_ui.components import Card, Column, Heading, Badge

    with Define("user-card") as user_card:
        with Card():
            Heading("{{ name }}")
            Badge("{{ role }}")

    with Column() as layout:
        Use("user-card", name="Alice", role="Engineer")
        Use("user-card", name="Bob", role="Designer")
"""

from __future__ import annotations

from typing import Any

from pydantic import Field

from prefab_ui.components.base import Component

# Component base fields that should NOT be treated as state overrides.
_BASE_FIELDS = frozenset(Component.model_fields)


class Use(Component):
    """Reference a defined component template by name.

    Kwargs that aren't base component fields (``css_class``)
    become scoped ``let`` bindings on the ``$ref`` node.

    Args:
        name: The template name (must match a ``Define`` name).
        **kwargs: Scoped bindings and/or base component fields.
    """

    # Use has a type field for Pydantic, but to_json() never emits it.
    type: str = "Use"
    name: str = Field(description="Template name to reference")
    overrides: dict[str, Any] = Field(default_factory=dict)

    def __init__(self, name: str, /, **kwargs: Any) -> None:
        init_kwargs: dict[str, Any] = {}
        override_kwargs: dict[str, Any] = {}
        for k, v in kwargs.items():
            if k in _BASE_FIELDS:
                init_kwargs[k] = v
            else:
                override_kwargs[k] = v
        init_kwargs["name"] = name
        init_kwargs["overrides"] = override_kwargs
        super().__init__(**init_kwargs)

    def to_json(self) -> dict[str, Any]:
        """Desugar to ``$ref`` with optional ``let`` and ``cssClass``."""
        ref: dict[str, Any] = {"$ref": self.name}

        if self.overrides:
            ref["let"] = self.overrides
        if self.css_class:
            ref["cssClass"] = self.css_class

        return ref
