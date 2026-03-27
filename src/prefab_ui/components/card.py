"""Card components following shadcn/ui conventions.

Cards provide a contained surface for grouping related content.

**Example:**

```python
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
```
"""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import ContainerComponent
from prefab_ui.rx import RxStr


class Card(ContainerComponent):
    """A card container with border and shadow.

    Two usage patterns:

    **Structured card** — use CardHeader, CardContent, CardFooter for
    cards with a title, body, and actions. Each sub-component has
    built-in padding; don't add extra padding to them:

    ```python
    with Card():
        with CardHeader():
            CardTitle("Create project")
            CardDescription("Deploy in one click.")
        with CardContent():
            Input(name="project_name", placeholder="Project name")
        with CardFooter():
            Button("Cancel", variant="outline")
            Button("Deploy")
    ```

    **Simple card** — for compact content (a single Metric, a short
    stat, etc.), skip the sub-components and add padding directly:

    ```python
    with Card(css_class="p-6"):
        Metric(label="Revenue", value="$1.2M", delta="+12%")
    ```

    Don't mix the patterns — a Card should use either sub-components
    or direct children with `css_class="p-6"`, not both.

    For equal-width cards, wrap them in a `Grid`:

    ```python
    with Grid(columns=3, gap=4):
        with Card(css_class="p-6"):
            Metric(...)
    ```
    """

    type: Literal["Card"] = "Card"


class CardHeader(ContainerComponent):
    """Card header section for title and description.

    **Example:**

    ```python
    with CardHeader():
        CardTitle("Account")
        CardDescription("Manage your account settings.")
    ```
    """

    type: Literal["CardHeader"] = "CardHeader"


class CardTitle(ContainerComponent):
    """Card title text.

    Can contain a string or child components.

    Args:
        content: Title text (alternative to children).

    **Example:**

    ```python
    CardTitle("Settings")
    CardTitle("{{ project_name }}")
    ```
    """

    type: Literal["CardTitle"] = "CardTitle"
    content: RxStr | None = Field(
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

    Args:
        content: Description text (alternative to children).

    **Example:**

    ```python
    CardDescription("Make changes to your account here.")
    ```
    """

    type: Literal["CardDescription"] = "CardDescription"
    content: RxStr | None = Field(
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

    **Example:**

    ```python
    with CardContent():
        P("Your content here.")
    ```
    """

    type: Literal["CardContent"] = "CardContent"


class CardFooter(ContainerComponent):
    """Card footer section, typically for actions.

    **Example:**

    ```python
    with CardFooter():
        Button("Cancel", variant="outline")
        Button("Save")
    ```
    """

    type: Literal["CardFooter"] = "CardFooter"
