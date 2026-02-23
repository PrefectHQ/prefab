"""Base class for all Prefab actions.

Every action type inherits from ``Action``, which provides the
``on_success`` and ``on_error`` lifecycle callbacks. These let you chain
reactions to action outcomes without writing custom logic:

    CallTool("save",
        on_success=ShowToast("Saved!"),
        on_error=ShowToast("Save failed", variant="error"),
    )

Callbacks can themselves have callbacks (recursive), and the renderer
enforces a depth limit to prevent infinite loops. When actions compose
as a list, the first error short-circuits the chain — the failing action's
``on_error`` runs, then execution stops.
"""

from __future__ import annotations

from typing import Any

from pydantic import BaseModel, Field, SerializeAsAny, model_validator

from prefab_ui.rx import _coerce_rx


class Action(BaseModel):
    """Base for all action types — provides lifecycle callbacks.

    Subclasses add an ``action`` literal discriminator and their own fields.
    The renderer serializes ``on_success``/``on_error`` recursively and
    dispatches them after the parent action completes.

    Uses ``SerializeAsAny`` so that Pydantic serializes callback values
    using the concrete runtime type (e.g. ShowToast) rather than the
    declared base type (Action), which would strip subclass fields.
    """

    model_config = {"populate_by_name": True}

    @model_validator(mode="before")
    @classmethod
    def _coerce_rx_values(cls, data: Any) -> Any:
        """Recursively convert any Rx values in the input dict to strings."""
        if isinstance(data, dict):
            return {k: _coerce_rx(v) for k, v in data.items()}
        return data

    on_success: SerializeAsAny[Action] | list[SerializeAsAny[Action]] | None = Field(
        default=None,
        alias="onSuccess",
        description="Action(s) to run when this action succeeds",
    )
    on_error: SerializeAsAny[Action] | list[SerializeAsAny[Action]] | None = Field(
        default=None,
        alias="onError",
        description="Action(s) to run when this action fails",
    )
