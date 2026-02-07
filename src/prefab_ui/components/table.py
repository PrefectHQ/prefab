"""Table components following shadcn/ui conventions.

Tables display structured data in rows and columns.

Example::

    from prefab_ui.components import (
        Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption
    )

    with Table():
        TableCaption("Recent orders")
        with TableHeader():
            with TableRow():
                TableHead("Order")
                TableHead("Status")
                TableHead("Amount")
        with TableBody():
            with TableRow():
                TableCell("ORD-001")
                TableCell("Shipped")
                TableCell("$250.00")
"""

from __future__ import annotations

from typing import Any, Literal, overload

from pydantic import Field

from prefab_ui.components.base import Component, ContainerComponent


class Table(ContainerComponent):
    """Table container.

    Use TableHeader, TableBody, TableRow, TableHead, and TableCell to build
    structured table layouts.
    """

    type: Literal["Table"] = "Table"


class TableHeader(ContainerComponent):
    """Table header section containing header rows."""

    type: Literal["TableHeader"] = "TableHeader"


class TableBody(ContainerComponent):
    """Table body section containing data rows."""

    type: Literal["TableBody"] = "TableBody"


class TableFooter(ContainerComponent):
    """Table footer section."""

    type: Literal["TableFooter"] = "TableFooter"


class TableRow(ContainerComponent):
    """A single table row containing cells."""

    type: Literal["TableRow"] = "TableRow"


class TableHead(ContainerComponent):
    """A header cell within a TableRow.

    Example::

        TableHead("Name")
    """

    type: Literal["TableHead"] = "TableHead"
    content: str | None = Field(
        default=None,
        description="Header text (alternative to children)",
    )

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str | None = None, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        if content is not None and "content" not in kwargs:
            kwargs["content"] = content
        super().__init__(**kwargs)


class TableCell(ContainerComponent):
    """A data cell within a TableRow.

    Can contain text or arbitrary child components.

    Example::

        TableCell("$250.00")
        # or with children:
        with TableCell():
            Badge("Active", variant="success")
    """

    type: Literal["TableCell"] = "TableCell"
    content: str | None = Field(
        default=None,
        description="Cell text (alternative to children)",
    )

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str | None = None, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        if content is not None and "content" not in kwargs:
            kwargs["content"] = content
        super().__init__(**kwargs)


class TableCaption(Component):
    """Table caption text.

    Example::

        TableCaption("A list of recent invoices")
    """

    type: Literal["TableCaption"] = "TableCaption"
    content: str = Field(description="Caption text")

    @overload
    def __init__(self, content: str, /, **kwargs: Any) -> None: ...

    @overload
    def __init__(self, *, content: str, **kwargs: Any) -> None: ...

    def __init__(self, content: str | None = None, **kwargs: Any) -> None:
        if content is not None and "content" not in kwargs:
            kwargs["content"] = content
        super().__init__(**kwargs)
