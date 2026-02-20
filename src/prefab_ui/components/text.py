"""Text display component."""

from __future__ import annotations

from typing import Any, Literal, overload

from prefab_ui.components.typography import _text_init, _TextComponent


class Text(_TextComponent):
    """Body text component.

    Example::

        Text("Hello, {{ name }}!")
    """

    type: Literal["Text"] = "Text"

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        _text_init(self, content, **kwargs)
