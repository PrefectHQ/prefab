"""Pages component — multi-page layout driven by state.

Only the active page renders. Navigate by setting state.

Example::

    from prefab_ui.components import Pages, Page, Text, Button
    from prefab_ui.actions import SetState

    with Pages(name="page", default_value="home"):
        with Page("Home"):
            Text("Welcome!")
            Button("Go to Settings", on_click=SetState("page", "settings"))
        with Page("Settings"):
            Text("Settings go here.")
            Button("Back", on_click=SetState("page", "home"))
"""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import ContainerComponent


class Page(ContainerComponent):
    """A single page within a Pages container.

    Example::

        with Page("Settings"):
            Text("Settings content.")
    """

    type: Literal["Page"] = "Page"
    title: str = Field(description="Page identifier / label")
    value: str | None = Field(
        default=None,
        description="Unique value for this page (defaults to title)",
    )

    @overload
    def __init__(self, title: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, title: str, **kwargs: Any) -> None: ...

    def __init__(self, title: str | None = None, **kwargs: Any) -> None:
        if title is not None and "title" not in kwargs:
            kwargs["title"] = title
        super().__init__(**kwargs)


class Pages(ContainerComponent):
    """Multi-page layout — only the active Page renders.

    Control which page shows via the state key matching ``name``.

    Example::

        with Pages(name="currentPage", default_value="home"):
            with Page("Home"):
                Text("Home content")
            with Page("Settings"):
                Text("Settings content")
    """

    type: Literal["Pages"] = "Pages"
    default_value: str | None = Field(
        default=None,
        alias="defaultValue",
        description="Initially active page value",
    )
    name: str | None = Field(
        default=None,
        description="State key for tracking the active page",
    )
