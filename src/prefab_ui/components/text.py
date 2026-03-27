"""Text display component."""

from __future__ import annotations

import contextlib
from typing import Any, Literal

from pydantic import Field

from prefab_ui.components.base import Component
from prefab_ui.components.typography import _TextComponent
from prefab_ui.rx import Rx


class Text(_TextComponent):
    """Body text component with inline formatting support.

    Accepts a single string for plain text, or mixed positional args
    of strings and inline components (Span, Link) for rich text.

    Args:
        content: Text content (positional or keyword).
        bold: Render text in bold.
        italic: Render text in italic.
        underline: Render text with underline.
        strikethrough: Render text with strikethrough.
        uppercase: Transform text to uppercase.
        lowercase: Transform text to lowercase.
        code: Render text in monospace font.
        align: Horizontal text alignment.

    **Example:**

    ```python
    Text("Hello, {{ name }}!")

    Text("Click ", Span("here", bold=True), " to continue")
    ```
    """

    type: Literal["Text"] = "Text"
    children: list[Any] | None = Field(default=None, exclude=True)

    def __init__(self, *args: str | Component, **kwargs: Any) -> None:
        if (
            len(args) == 1
            and isinstance(args[0], (str, Rx))
            and "children" not in kwargs
        ):
            kwargs["content"] = args[0]
            super().__init__(**kwargs)
        elif args:
            from prefab_ui.components.base import _component_stack
            from prefab_ui.components.div import Span

            # Suppress the component stack while creating wrapper Spans
            # so they don't get captured by an enclosing container.
            saved_stack = _component_stack.get()
            _component_stack.set(None)
            try:
                children = []
                for arg in args:
                    if isinstance(arg, (str, Rx)):
                        children.append(Span(arg))
                    else:
                        # Remove from parent container since Text owns it now
                        if saved_stack:
                            parent = saved_stack[-1]
                            with contextlib.suppress(ValueError):
                                parent.children.remove(arg)
                        children.append(arg)
            finally:
                _component_stack.set(saved_stack)
            kwargs.setdefault("content", "")
            kwargs["children"] = children
            super().__init__(**kwargs)
        else:
            super().__init__(**kwargs)

    def to_json(self) -> dict[str, Any]:
        d = super().to_json()
        if self.children:
            d["children"] = [
                c.to_json() if hasattr(c, "to_json") else c for c in self.children
            ]
            d.pop("content", None)
        return d
