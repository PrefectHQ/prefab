"""Use — reference a defined component template.

A ``Use`` node references a :class:`~prefab_ui.define.Define` template by
name. On the wire it desugars completely: bare ``{"$ref": "name"}`` when
no overrides are given, or a ``State`` wrapper around the ``$ref`` when
kwargs provide scoped values.

Example::

    from prefab_ui import Define, Use
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

    Kwargs that aren't base component fields (``css_class``,
    ``visible_when``) become scoped state overrides, automatically
    wrapping the ``$ref`` in a ``State`` node on the wire.

    Args:
        name: The template name (must match a ``Define`` name).
        **kwargs: Scoped state overrides and/or base component fields.
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
        """Desugar to ``$ref`` + optional ``State`` wrapper."""
        ref: dict[str, Any] = {"$ref": self.name}

        needs_wrapper = self.overrides or self.css_class or self.visible_when
        if not needs_wrapper:
            return ref

        wrapper: dict[str, Any] = {"type": "State", "children": [ref]}
        if self.overrides:
            wrapper["state"] = self.overrides
        if self.css_class:
            wrapper["cssClass"] = self.css_class
        if self.visible_when:
            wrapper["visibleWhen"] = self.visible_when
        return wrapper
