"""Pages component — multi-page layout driven by state.

Only the active page renders. Navigate by setting state.

**Example:**

```python
from prefab_ui.components import Pages, Page, Text, Button
from prefab_ui.actions import SetState

with Pages(name="page", value="home"):
    with Page("Home"):
        Text("Welcome!")
        Button("Go to Settings", on_click=SetState("page", "settings"))
    with Page("Settings"):
        Text("Settings go here.")
        Button("Back", on_click=SetState("page", "home"))

# Access reactive value
pages = Pages()
Text(f"Current page: {pages.rx}")
```
"""

from __future__ import annotations

from typing import Any, ClassVar, Literal, overload

from pydantic import Field

from prefab_ui.components.base import ContainerComponent, StatefulMixin
from prefab_ui.rx import RxStr


class Page(ContainerComponent):
    """A single page within a Pages container.

    Args:
        title: Page identifier / label.
        value: Unique value for this page (defaults to title).

    **Example:**

    ```python
    with Page("Settings"):
        Text("Settings content.")
    ```
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


class Pages(StatefulMixin, ContainerComponent):
    """Multi-page layout — only the active Page renders.

    Control which page shows via the state key matching `name`.

    Args:
        value: Initially active page value.
        name: State key for reactive binding. Auto-generated if omitted.

    **Example:**

    ```python
    with Pages(name="currentPage", value="home"):
        with Page("Home"):
            Text("Home content")
        with Page("Settings"):
            Text("Settings content")
    ```
    """

    _auto_name: ClassVar[str] = "pages"
    type: Literal["Pages"] = "Pages"
    value: RxStr | None = Field(
        default=None,
        description="Initially active page value",
    )
    name: str | None = Field(
        default=None,
        description="State key for reactive binding. Auto-generated if omitted.",
    )

    @property
    def default_value(self) -> RxStr | None:
        """Alias for `value` — the initially active page."""
        return self.value
