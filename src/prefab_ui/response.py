"""UIResponse — package a component tree with state for the renderer.

Returns a component view with optional client-side state.  The envelope
uses clean top-level keys (``version``, ``view``, ``defs``, ``state``).
The model sees initial state as useful domain context, while all subsequent
client-side mutations (SetState, form inputs, ToolCall result_key) are
renderer-private.
"""

from __future__ import annotations

from typing import Any

import pydantic_core
from pydantic import BaseModel, Field, model_validator

PROTOCOL_VERSION = "0.2"


class UIResponse(BaseModel):
    """Return type for server functions that render interactive UIs.

    Packages an optional component view, client-side state, and a text
    fallback.  The envelope uses ``version``, ``view``, ``defs``, and
    ``state`` as top-level keys.  Templates use bare names to reference
    state: ``{{ users }}``.

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
        description="Client-side state — nested under the 'state' envelope key",
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
                if key.startswith("$"):
                    raise ValueError(f"State key {key!r} uses reserved prefix '$'")
        return self

    def to_json(self) -> dict[str, Any]:
        """Produce the Prefab wire format.

        Returns a dict with ``version``, ``view``, ``defs``, and ``state``
        as top-level keys.
        """
        result: dict[str, Any] = {"version": PROTOCOL_VERSION}

        if self.view is not None:
            result["view"] = self.view.to_json()

        if self.defs:
            result["defs"] = {d.name: d.to_json() for d in self.defs}

        if self.state is not None:
            result["state"] = pydantic_core.to_jsonable_python(self.state)

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
