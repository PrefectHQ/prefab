"""Client-side HTTP fetch action.

Makes HTTP requests directly from the browser using ``fetch()``. Use this
for REST API calls, loading external data, form submissions — anything
that talks HTTP without going through an MCP server.

Example::

    from prefab_ui.components import Button
    from prefab_ui.actions import Fetch, SetState, ShowToast
    from prefab_ui.rx import RESULT

    Button("Load Users", on_click=Fetch.get(
        "/api/users",
        on_success=SetState("users", RESULT),
        on_error=ShowToast("{{ $error }}", variant="error"),
    ))
"""

from __future__ import annotations

from typing import Any, Literal
from urllib.parse import quote

from pydantic import Field

from prefab_ui.actions.base import Action
from prefab_ui.rx import RxStr

Method = Literal["GET", "POST", "PUT", "PATCH", "DELETE"]


class Fetch(Action):
    """Make an HTTP request from the browser.

    The parsed response body is available as ``$result`` in ``on_success``
    callbacks. JSON responses are parsed automatically; other content types
    return the raw text. Non-2xx responses trigger ``on_error`` with the
    status text as ``$error``.
    """

    action: Literal["fetch"] = "fetch"
    url: RxStr = Field(description="URL to fetch. Supports {{ key }} interpolation.")
    method: Method = Field(default="GET", description="HTTP method.")
    headers: dict[str, str] | None = Field(
        default=None,
        description="Request headers.",
    )
    body: dict[str, Any] | str | None = Field(
        default=None,
        description="Request body. Dicts are JSON-serialized automatically.",
    )

    def __init__(self, url: RxStr, **kwargs: Any) -> None:
        kwargs["url"] = url
        super().__init__(**kwargs)

    @classmethod
    def get(
        cls,
        url: str,
        *,
        params: dict[str, str] | None = None,
        **kwargs: Any,
    ) -> Fetch:
        """GET request. ``params`` are appended as a query string.

        Values are kept raw so ``{{ key }}`` interpolation survives to the
        renderer. Only param *names* are percent-encoded.
        """
        if params:
            sep = "&" if "?" in url else "?"
            qs = "&".join(f"{quote(k, safe='')}={v}" for k, v in params.items())
            url = f"{url}{sep}{qs}"
        return cls(url, method="GET", **kwargs)

    @classmethod
    def post(
        cls, url: str, *, body: dict[str, Any] | str | None = None, **kwargs: Any
    ) -> Fetch:
        """POST request with an optional body."""
        return cls(url, method="POST", body=body, **kwargs)

    @classmethod
    def put(
        cls, url: str, *, body: dict[str, Any] | str | None = None, **kwargs: Any
    ) -> Fetch:
        """PUT request with an optional body."""
        return cls(url, method="PUT", body=body, **kwargs)

    @classmethod
    def patch(
        cls, url: str, *, body: dict[str, Any] | str | None = None, **kwargs: Any
    ) -> Fetch:
        """PATCH request with an optional body."""
        return cls(url, method="PATCH", body=body, **kwargs)

    @classmethod
    def delete(cls, url: str, **kwargs: Any) -> Fetch:
        """DELETE request."""
        return cls(url, method="DELETE", **kwargs)
