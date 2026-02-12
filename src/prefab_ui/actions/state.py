"""Client-side state management actions."""

from __future__ import annotations

import re
from typing import Any, Literal

from pydantic import Field, field_validator

from prefab_ui.actions.base import ActionBase

_KEY_RE = re.compile(r"^[a-zA-Z_][a-zA-Z0-9_]*$")


def _validate_path(path: str) -> str:
    """Validate a state key or dot-path.

    Each segment must be either a valid identifier (``[a-zA-Z_][a-zA-Z0-9_]*``)
    or a pure integer (array index). Periods delimit segments.
    """
    for segment in path.split("."):
        if segment.isdigit():
            continue
        if not _KEY_RE.match(segment):
            raise ValueError(
                f"Invalid path segment: {segment!r}. "
                "Segments must be identifiers ([a-zA-Z_][a-zA-Z0-9_]*) or integers."
            )
    return path


class SetState(ActionBase):
    """Set a client-side state variable. No server round-trip.

    The default ``value`` of ``{{ $event }}`` captures the event value
    (slider position, input text, checkbox state, etc.).

    The ``key`` supports dot-paths for nested updates::

        SetState("todos.0.done", True)   # deep-update into a list
    """

    action: Literal["setState"] = "setState"
    key: str = Field(description="State key or dot-path to set")
    value: Any = Field(
        default="{{ $event }}",
        description="Value to set. Use '{{ $event }}' for the event value.",
    )

    @field_validator("key")
    @classmethod
    def _validate_key(cls, v: str) -> str:
        return _validate_path(v)

    def __init__(self, key: str, value: Any = "{{ $event }}", **kwargs: Any) -> None:
        kwargs["key"] = key
        kwargs["value"] = value
        super().__init__(**kwargs)


class ToggleState(ActionBase):
    """Flip a boolean state variable. No server round-trip."""

    action: Literal["toggleState"] = "toggleState"
    key: str = Field(description="State key or dot-path to toggle")

    @field_validator("key")
    @classmethod
    def _validate_key(cls, v: str) -> str:
        return _validate_path(v)

    def __init__(self, key: str, **kwargs: Any) -> None:
        kwargs["key"] = key
        super().__init__(**kwargs)


class AppendState(ActionBase):
    """Append a value to a state array.

    Appends to the end by default. Pass ``index`` to insert at a specific
    position (supports negative indices, e.g. ``index=0`` to prepend).

    If the key doesn't exist yet, creates a new single-element array.
    """

    action: Literal["appendState"] = "appendState"
    key: str = Field(description="State key or dot-path to the array")
    value: Any = Field(
        default="{{ $event }}",
        description="Value to append.",
    )
    index: int | str | None = Field(
        default=None,
        description="Insert position (int or template string). None to append at end.",
    )

    @field_validator("key")
    @classmethod
    def _validate_key(cls, v: str) -> str:
        return _validate_path(v)

    def __init__(
        self,
        key: str,
        value: Any = "{{ $event }}",
        *,
        index: int | str | None = None,
        **kwargs: Any,
    ) -> None:
        kwargs["key"] = key
        kwargs["value"] = value
        kwargs["index"] = index
        super().__init__(**kwargs)


class PopState(ActionBase):
    """Remove an item by index from a state array.

    Supports negative indices (e.g. ``-1`` for the last element).
    """

    action: Literal["popState"] = "popState"
    key: str = Field(description="State key or dot-path to the array")
    index: int | str = Field(
        description="Index to remove (int or template string like '{{ $index }}')."
    )

    @field_validator("key")
    @classmethod
    def _validate_key(cls, v: str) -> str:
        return _validate_path(v)

    def __init__(self, key: str, index: int | str, **kwargs: Any) -> None:
        kwargs["key"] = key
        kwargs["index"] = index
        super().__init__(**kwargs)
