"""Card components following shadcn/ui conventions.

Cards provide a contained surface for grouping related content.

Example::

    from prefab_ui.components import (
        Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
    )
    from prefab_ui.components import Button, P

    with Card():
        with CardHeader():
            CardTitle("Create project")
            CardDescription("Deploy your new project in one-click.")
        with CardContent():
            P("Your project will be created with default settings.")
        with CardFooter():
            Button("Cancel", variant="outline")
            Button("Deploy")

    # Simple card
    with Card(css_class="p-6"):
        H3("Quick Stats")
        P("{{ summary }}")
"""

from __future__ import annotations

from typing import Any, overload

from pydantic import Field

from prefab_ui.components.base import ContainerComponent


class Card(ContainerComponent):
    """A card container with border and shadow.

    Cards group related content and actions. Use CardHeader, CardContent,
    and CardFooter for structured layouts.

    Example::

        with Card():
            CardTitle("Title")
            P("Content")
    """


class CardHeader(ContainerComponent):
    """Card header section for title and description.

    Example::

        with CardHeader():
            CardTitle("Account")
            CardDescription("Manage your account settings.")
    """


class CardTitle(ContainerComponent):
    """Card title text.

    Can contain a string or child components.

    Example::

        CardTitle("Settings")
        CardTitle("{{ project_name }}")
    """

    content: str | None = Field(
        default=None,
        description="Title text (alternative to children)",
    )

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str | None = None, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        """Accept content as positional or keyword argument."""
        if content is not None and "content" not in kwargs:
            kwargs["content"] = content
        super().__init__(**kwargs)


class CardDescription(ContainerComponent):
    """Card description text, typically below the title.

    Example::

        CardDescription("Make changes to your account here.")
    """

    content: str | None = Field(
        default=None,
        description="Description text (alternative to children)",
    )

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str | None = None, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        """Accept content as positional or keyword argument."""
        if content is not None and "content" not in kwargs:
            kwargs["content"] = content
        super().__init__(**kwargs)


class CardContent(ContainerComponent):
    """Card content section for the main body.

    Example::

        with CardContent():
            P("Your content here.")
    """


class CardFooter(ContainerComponent):
    """Card footer section, typically for actions.

    Example::

        with CardFooter():
            Button("Cancel", variant="outline")
            Button("Save")
    """
