"""State component for scoped interpolation context.

Provides local ``{{ }}`` values to children without polluting global state.
Children resolve template expressions against the State's values first,
falling through to parent scopes and then global state.

Example::

    from prefab_ui.components import State, Card, Heading, Badge

    with State(name="Alice", role="Engineer"):
        with Card():
            Heading("{{ name }}")
            Badge("{{ role }}")
"""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import ContainerComponent

# Fields that belong to the Component/ContainerComponent base, not the state dict.
_PASSTHROUGH_FIELDS = frozenset(ContainerComponent.model_fields)


class State(ContainerComponent):
    """Provide scoped interpolation values to children.

    Kwargs that aren't base component fields are collected into the
    ``state`` dict automatically::

        State(name="Alice", role="Engineer")
        # equivalent to:
        State(state={"name": "Alice", "role": "Engineer"})

    A positional dict is also accepted::

        State({"name": "Alice", "role": "Engineer"})

    Args:
        _state: Optional dict of state values (positional).
        **kwargs: State entries (or base component fields like ``css_class``).
    """

    type: Literal["State"] = "State"
    state: dict[str, Any] = Field(
        default_factory=dict,
        description="Local state values scoped to children",
    )

    def __init__(self, _state: dict[str, Any] | None = None, /, **kwargs: Any) -> None:
        init_kwargs: dict[str, Any] = {}
        state_entries: dict[str, Any] = {}
        for k, v in kwargs.items():
            if k in _PASSTHROUGH_FIELDS:
                init_kwargs[k] = v
            else:
                state_entries[k] = v

        # Merge: positional dict first, then kwargs override
        merged = dict(_state or {})
        merged.update(state_entries)

        init_kwargs["state"] = merged
        super().__init__(**init_kwargs)
