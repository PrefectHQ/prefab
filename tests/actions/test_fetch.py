"""Tests for the Fetch action — client-side HTTP requests."""

from __future__ import annotations

import pytest

from prefab_ui.actions import Fetch, SetState, ShowToast
from prefab_ui.components import Button


class TestFetchSerialization:
    def test_minimal_get(self):
        a = Fetch("/api/users")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["action"] == "fetch"
        assert d["url"] == "/api/users"
        assert d["method"] == "GET"
        assert "headers" not in d
        assert "body" not in d

    def test_post_with_body(self):
        a = Fetch("/api/users", method="POST", body={"name": "Alice"})
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["method"] == "POST"
        assert d["body"] == {"name": "Alice"}

    def test_with_headers(self):
        a = Fetch("/api/data", headers={"Authorization": "Bearer {{ token }}"})
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["headers"]["Authorization"] == "Bearer {{ token }}"

    def test_result_key_serializes(self):
        a = Fetch("/api/users", result_key="users")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["resultKey"] == "users"

    def test_result_key_excluded_when_none(self):
        a = Fetch("/api/users")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert "resultKey" not in d

    def test_string_body(self):
        a = Fetch("/api/raw", method="POST", body="raw text content")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["body"] == "raw text content"

    def test_all_methods(self):
        for method in ("GET", "POST", "PUT", "PATCH", "DELETE"):
            a = Fetch("/api", method=method)
            d = a.model_dump(by_alias=True, exclude_none=True)
            assert d["method"] == method

    def test_on_button(self):
        btn = Button("Load", on_click=Fetch("/api/data", result_key="data"))
        j = btn.to_json()
        assert j["onClick"]["action"] == "fetch"
        assert j["onClick"]["url"] == "/api/data"
        assert j["onClick"]["resultKey"] == "data"

    def test_interpolation_in_url(self):
        a = Fetch("/api/users/{{ user_id }}")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["url"] == "/api/users/{{ user_id }}"

    def test_interpolation_in_body(self):
        a = Fetch("/api", method="POST", body={"q": "{{ query }}"})
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["body"]["q"] == "{{ query }}"


class TestFetchClassmethods:
    def test_get(self):
        a = Fetch.get("/api/users")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["method"] == "GET"
        assert d["url"] == "/api/users"

    def test_get_with_params(self):
        a = Fetch.get("/api/search", params={"q": "hello", "page": "1"})
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert "q=hello" in d["url"]
        assert "page=1" in d["url"]
        assert d["url"].startswith("/api/search?")

    def test_get_with_params_appends_to_existing_query(self):
        a = Fetch.get("/api/search?sort=name", params={"q": "hello"})
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["url"] == "/api/search?sort=name&q=hello"

    def test_post(self):
        a = Fetch.post("/api/users", body={"name": "Alice"})
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["method"] == "POST"
        assert d["body"] == {"name": "Alice"}

    def test_post_without_body(self):
        a = Fetch.post("/api/trigger")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["method"] == "POST"
        assert "body" not in d

    def test_put(self):
        a = Fetch.put("/api/users/1", body={"name": "Bob"})
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["method"] == "PUT"
        assert d["body"] == {"name": "Bob"}

    def test_patch(self):
        a = Fetch.patch("/api/users/1", body={"active": True})
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["method"] == "PATCH"

    def test_delete(self):
        a = Fetch.delete("/api/users/1")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["method"] == "DELETE"

    def test_classmethod_with_result_key(self):
        a = Fetch.get("/api/users", result_key="users")
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["resultKey"] == "users"

    def test_classmethod_with_callbacks(self):
        a = Fetch.post(
            "/api/save",
            body={"data": "{{ form }}"},
            on_success=ShowToast("Saved!"),
            on_error=ShowToast("{{ $error }}", variant="error"),
        )
        d = a.model_dump(by_alias=True, exclude_none=True)
        assert d["onSuccess"]["action"] == "showToast"
        assert d["onError"]["variant"] == "error"


class TestFetchResultKeyValidation:
    def test_valid_key(self):
        a = Fetch("/api", result_key="users")
        assert a.result_key == "users"

    def test_dot_path_key(self):
        a = Fetch("/api", result_key="data.users")
        assert a.result_key == "data.users"

    def test_invalid_key_rejected(self):
        with pytest.raises(ValueError, match="Invalid path segment"):
            Fetch("/api", result_key="bad-key")


class TestFetchActionChain:
    def test_in_action_list(self):
        btn = Button(
            "Submit",
            on_click=[
                SetState("loading", True),
                Fetch.post("/api/submit", body={"q": "{{ query }}"}),
                SetState("loading", False),
            ],
        )
        j = btn.to_json()
        assert isinstance(j["onClick"], list)
        assert j["onClick"][0]["action"] == "setState"
        assert j["onClick"][1]["action"] == "fetch"
        assert j["onClick"][2]["action"] == "setState"
