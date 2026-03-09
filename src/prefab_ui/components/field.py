"""Composable form field components.

Field groups a label, control, and error message into a single unit. Its
main job is validation styling — when ``invalid`` is set, all text inside
turns red automatically via CSS cascade.

ChoiceCard is a Field subclass that renders as a bordered, clickable card.
Clicking anywhere on the card toggles the wrapped control (Switch, Checkbox,
etc.).

Form validation::

    with Field(invalid=Rx("!destination")):
        Label("Destination")
        Select(name="destination", placeholder="Choose a planet...")
        FieldError("Please select a destination.")

Choice card::

    with ChoiceCard():
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

    Groups a label, control, and error message. Propagates ``data-invalid``
    to all children via CSS cascade so labels turn red, controls get error
    styling, and error messages appear — without wiring each individually.

    Args:
        invalid: Whether the field is in an error state. Accepts reactive
            expressions like ``Rx("!email")``.
        disabled: Whether the field is dimmed and non-interactive.

    Example::

        with Field(invalid=True):
            Label("Email")
            Input(name="email")
            FieldError("Email is required.")
    """

    type: Literal["Field"] = "Field"
    invalid: bool | RxStr = PydanticField(
        default=False, description="Whether the field is in an error state"
    )
    disabled: bool | RxStr = PydanticField(
        default=False, description="Whether the field is dimmed and non-interactive"
    )


class ChoiceCard(Field):
    """Bordered, clickable card for toggle controls.

    A Field subclass that renders as a bordered card with click-anywhere-
    to-toggle behavior. Use FieldContent to group the title and description,
    and place the toggle control (Switch, Checkbox) alongside it.

    When the control is toggled on, the card highlights with a subtle
    border and background tint.

    Example::

        with ChoiceCard():
            with FieldContent():
                FieldTitle("Dark mode")
                FieldDescription("Use dark theme throughout the app.")
            Switch()
    """

    type: Literal["ChoiceCard"] = "ChoiceCard"


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
    """Groups title and description in choice card layouts.

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
