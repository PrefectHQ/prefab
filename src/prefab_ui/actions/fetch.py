"""Client-side HTTP fetch action.

Makes HTTP requests directly from the browser using ``fetch()``. Use this
for REST API calls, loading external data, form submissions — anything
that talks HTTP without going through an MCP server.

Example::

    from prefab_ui.components import Button
    from prefab_ui.actions import Fetch, ShowToast

    Button("Load Users", on_click=Fetch.get(
        "/api/users",
        result_key="users",
        on_error=ShowToast("{{ $error }}", variant="error"),
    ))
"""

from __future__ import annotations

from typing import Any, Literal
from urllib.parse import urlencode

from pydantic import Field, field_validator

from prefab_ui.actions.base import ActionBase
from prefab_ui.actions.state import _validate_path

Method = Literal["GET", "POST", "PUT", "PATCH", "DELETE"]


class Fetch(ActionBase):
    """Make an HTTP request from the browser.

    Fires ``onSuccess`` with the parsed response body as ``$event``.
    JSON responses are parsed automatically; other content types return
    the raw text. Non-2xx responses trigger ``onError`` with the status
    text as ``$error``.

    If ``result_key`` is set, the response body is written into
    client-side state at that key.
    """

    action: Literal["fetch"] = "fetch"
    url: str = Field(description="URL to fetch. Supports {{ key }} interpolation.")
    method: Method = Field(default="GET", description="HTTP method.")
    headers: dict[str, str] | None = Field(
        default=None,
        description="Request headers.",
    )
    body: dict[str, Any] | str | None = Field(
        default=None,
        description="Request body. Dicts are JSON-serialized automatically.",
    )
    result_key: str | None = Field(
        default=None,
        alias="resultKey",
        description="State key to store the response under.",
    )

    @field_validator("result_key")
    @classmethod
    def _validate_result_key(cls, v: str | None) -> str | None:
        if v is not None:
            _validate_path(v)
        return v

    def __init__(self, url: str, **kwargs: Any) -> None:
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
        """GET request. ``params`` are appended as a query string."""
        if params:
            sep = "&" if "?" in url else "?"
            url = f"{url}{sep}{urlencode(params)}"
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
