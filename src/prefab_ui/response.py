"""UIResponse — package a component tree with state for the renderer.

Returns a component view with optional client-side state.
State keys become top-level fields in the response alongside the reserved
``_prefab_view`` key — the model sees initial state as useful domain
context, while all subsequent client-side mutations (SetState, form inputs,
ToolCall result_key) are renderer-private.
"""

from __future__ import annotations

from typing import Any

import pydantic_core
from pydantic import BaseModel, Field, model_validator

PROTOCOL_VERSION = "0.1"


class UIResponse(BaseModel):
    """Return type for server functions that render interactive UIs.

    Packages an optional component view, client-side state, and a text
    fallback. State keys are spread as top-level fields (the model
    sees them). The component tree goes under the reserved ``_prefab_view``
    key. Templates use bare names to reference state: ``{{ users }}``.

    Usage::

        from prefab_ui import UIResponse, Column, Heading

        def show_user(name: str) -> UIResponse:
            return UIResponse(
                state={"name": name},
                view=Column(Heading("{{ name }}")),
            )
    """

    view: Any | None = Field(default=None, description="Component tree to render")
    state: dict[str, Any] | None = Field(
        default=None,
        description="Client-side state — keys become top-level response fields",
    )
    defs: list[Any] | None = Field(
        default=None,
        description="Reusable component definitions (Define instances)",
    )
    text: str | None = Field(default=None, description="Text fallback for non-UI hosts")

    model_config = {"arbitrary_types_allowed": True}

    @model_validator(mode="after")
    def _validate_state_keys(self) -> UIResponse:
        if self.state is not None:
            for key in self.state:
                if key.startswith("_prefab"):
                    raise ValueError(
                        f"State key {key!r} uses reserved prefix '_prefab'"
                    )
                if key.startswith("$"):
                    raise ValueError(f"State key {key!r} uses reserved prefix '$'")
        return self

    def to_json(self) -> dict[str, Any]:
        """Produce the Prefab wire format.

        State keys become top-level dict entries. The component tree is
        nested under ``_prefab_view``.
        """
        result: dict[str, Any] = {}

        if self.state is not None:
            state_json = pydantic_core.to_jsonable_python(self.state)
            if isinstance(state_json, dict):
                result.update(state_json)

        result["_prefab_version"] = PROTOCOL_VERSION

        if self.defs:
            result["_prefab_defs"] = {d.name: d.to_json() for d in self.defs}

        if self.view is not None:
            result["_prefab_view"] = self.view.to_json()

        return result

    def text_fallback(self) -> str:
        """Generate a plain-text fallback for hosts that don't render UIs."""
        if self.text is not None:
            return self.text
        if self.view is not None:
            return "[UI content]"
        if self.state is not None:
            return str(pydantic_core.to_jsonable_python(self.state))
        return "[No content]"
