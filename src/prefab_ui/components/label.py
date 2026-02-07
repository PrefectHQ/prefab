"""Label component for form fields.

Labels identify form inputs and provide accessible descriptions.

Example::

    from prefab_ui.components import Label, Input

    with Label("Email address"):
        Input(placeholder="you@example.com")
"""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import ContainerComponent


class Label(ContainerComponent):
    """Label element for form fields.

    Args:
        text: Label text (optional if using children)
        for_id: ID of the associated input element
        css_class: Additional CSS classes

    Example::

        Label("Username")
        Label("Email", for_id="email-input")

        # With children
        with Label():
            Text("Password")
            Input(input_type="password")
    """

    type: Literal["Label"] = "Label"
    text: str | None = Field(
        default=None, description="Label text (supports {{ field }} interpolation)"
    )
    for_id: str | None = Field(
        default=None,
        alias="forId",
        description="ID of the associated form field",
    )

    @overload
    def __init__(self, text: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, text: str, **kwargs: Any) -> None: ...

    def __init__(self, text: str | None = None, **kwargs: Any) -> None:
        """Accept text as positional or keyword argument."""
        if text is not None:
            kwargs["text"] = text
        super().__init__(**kwargs)
