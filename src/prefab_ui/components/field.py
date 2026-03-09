"""Composable form field components.

Field is a wrapper that propagates ``data-invalid`` to all children via CSS
cascade, so labels turn red, controls get error styling, and error messages
appear — without each control needing its own ``invalid`` prop.

The same components compose into both form validation wrappers (vertical) and
choice cards (horizontal):

Form validation::

    with Field(invalid=True):
        Label("Destination")
        Select(placeholder="Choose a planet...")
        FieldError("Please select a destination.")

Choice card::

    with Field(orientation="horizontal"):
        with FieldContent():
            FieldTitle("Share across devices")
            FieldDescription("Focus is shared across devices.")
        Switch()
"""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field as PydanticField

from prefab_ui.components.base import Component, ContainerComponent
from prefab_ui.rx import RxStr


class Field(ContainerComponent):
    """Composable form field wrapper.

    Propagates ``data-invalid`` to all children via CSS cascade. In vertical
    mode (default) renders a plain ``<div>``; in horizontal mode renders a
    bordered choice card wrapped in a ``<label>`` for click-to-toggle.

    Args:
        invalid: Whether the field is in an error state.
        disabled: Whether the field is dimmed and non-interactive.
        orientation: Layout direction — ``"vertical"`` for form fields,
            ``"horizontal"`` for choice cards.

    Example::

        with Field(invalid=True):
            Label("Email")
            Input(name="email")
            FieldError("Email is required.")
    """

    type: Literal["Field"] = "Field"
    invalid: bool = PydanticField(
        default=False, description="Whether the field is in an error state"
    )
    disabled: bool = PydanticField(
        default=False, description="Whether the field is dimmed and non-interactive"
    )
    orientation: Literal["vertical", "horizontal"] = PydanticField(
        default="vertical",
        description="Layout direction: vertical for forms, horizontal for choice cards",
    )


class FieldTitle(Component):
    """Field heading text.

    Example::

        FieldTitle("Share across devices")
    """

    type: Literal["FieldTitle"] = "FieldTitle"
    content: RxStr = PydanticField(description="Title text")

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        if content is not None:
            kwargs["content"] = content
        super().__init__(**kwargs)


class FieldDescription(Component):
    """Field description text.

    Example::

        FieldDescription("Focus is shared across devices.")
    """

    type: Literal["FieldDescription"] = "FieldDescription"
    content: RxStr = PydanticField(description="Description text")

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        if content is not None:
            kwargs["content"] = content
        super().__init__(**kwargs)


class FieldContent(ContainerComponent):
    """Groups title and description in horizontal field layouts.

    Example::

        with FieldContent():
            FieldTitle("Dark mode")
            FieldDescription("Use dark theme throughout the app.")
    """

    type: Literal["FieldContent"] = "FieldContent"


class FieldError(Component):
    """Error message text for invalid fields.

    Example::

        FieldError("Please select a destination.")
    """

    type: Literal["FieldError"] = "FieldError"
    content: RxStr = PydanticField(description="Error message text")

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        if content is not None:
            kwargs["content"] = content
        super().__init__(**kwargs)
