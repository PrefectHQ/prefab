"""Tests for the Prefab Simulator — headless UI testing without a browser.

Instead of an MCP Client, the Simulator uses a plain async callable (ActionHandler)
that takes (name, arguments) and returns ActionResult. Each test defines its
own handler, making tests self-contained with no transport dependency.
"""

from __future__ import annotations

from typing import Any

import pytest

from prefab_ui.actions import SetState, ShowToast, ToggleState
from prefab_ui.actions.mcp import ToolCall
from prefab_ui.components import Button, Column, Form, Input, Text
from prefab_ui.response import UIResponse
from prefab_ui.testing import ActionResult, ComponentNotFoundError, Simulator

# ---------------------------------------------------------------------------
# Shared test data
# ---------------------------------------------------------------------------

USERS_DB = [
    {"name": "Alice", "role": "admin"},
    {"name": "Bob", "role": "user"},
    {"name": "Charlie", "role": "user"},
]


def _search_users_response(q: str = "") -> dict[str, Any]:
    """Build a UIResponse.to_json() dict for the search_users tool."""
    results = (
        [u for u in USERS_DB if q.lower() in u["name"].lower()] if q else USERS_DB
    )
    with Column() as view:
        Input(name="query", placeholder="Search...")
        Button(
            label="Search",
            on_click=ToolCall(
                "search_users",
                arguments={"q": "{{ query }}"},
                result_key="search_result",
            ),
        )
        Text("{{ results }}")
    return UIResponse(view=view, state={"results": results, "query": q}).to_json()


async def _search_handler(name: str, arguments: dict[str, Any]) -> ActionResult:
    """Handler that simulates a search_users tool."""
    if name == "search_users":
        q = arguments.get("q", "")
        return ActionResult(content=_search_users_response(q))
    return ActionResult(is_error=True, error_text=f"Unknown tool: {name}")


# ---------------------------------------------------------------------------
# Basic tests
# ---------------------------------------------------------------------------


class TestSimulatorBasic:
    async def test_invoke_populates_state(self):
        sim = Simulator(_search_handler)
        await sim.invoke("search_users", {"q": ""})

        assert sim.state["query"] == ""
        assert len(sim.state["results"]) == 3
        assert sim.view is not None
        assert sim.view["type"] == "Column"

    async def test_invoke_with_arguments(self):
        sim = Simulator(_search_handler)
        await sim.invoke("search_users", {"q": "Alice"})

        assert sim.state["query"] == "Alice"
        assert len(sim.state["results"]) == 1
        assert sim.state["results"][0]["name"] == "Alice"

    async def test_state_reset_on_new_invoke(self):
        async def handler(name: str, arguments: dict[str, Any]) -> ActionResult:
            if name == "tool_a":
                return ActionResult(
                    content=UIResponse(
                        state={"from": "a"}, view=Text("A")
                    ).to_json()
                )
            if name == "tool_b":
                return ActionResult(
                    content=UIResponse(
                        state={"from": "b"}, view=Text("B")
                    ).to_json()
                )
            return ActionResult(is_error=True, error_text="unknown")

        sim = Simulator(handler)
        await sim.invoke("tool_a")
        assert sim.state["from"] == "a"

        await sim.invoke("tool_b")
        assert sim.state["from"] == "b"
        assert "a" not in sim.state.values()


# ---------------------------------------------------------------------------
# Component finding
# ---------------------------------------------------------------------------


class TestSimulatorFind:
    async def test_find_by_type(self):
        sim = Simulator(_search_handler)
        await sim.invoke("search_users", {"q": ""})

        button = sim.find("Button")
        assert button["type"] == "Button"
        assert button["label"] == "Search"

    async def test_find_by_type_and_props(self):
        sim = Simulator(_search_handler)
        await sim.invoke("search_users", {"q": ""})

        inp = sim.find("Input", name="query")
        assert inp["name"] == "query"

    async def test_find_raises_on_missing(self):
        sim = Simulator(_search_handler)
        await sim.invoke("search_users", {"q": ""})

        with pytest.raises(ComponentNotFoundError):
            sim.find("NonexistentComponent")

    async def test_find_raises_before_invoke(self):
        sim = Simulator(_search_handler)

        with pytest.raises(ComponentNotFoundError):
            sim.find("Button")

    async def test_find_all(self):
        async def handler(name: str, arguments: dict[str, Any]) -> ActionResult:
            with Column() as view:
                Button(label="A")
                Button(label="B")
                Button(label="C")
            return ActionResult(
                content=UIResponse(view=view).to_json()
            )

        sim = Simulator(handler)
        await sim.invoke("show_buttons")

        buttons = sim.find_all("Button")
        assert len(buttons) == 3
        labels = [b["label"] for b in buttons]
        assert labels == ["A", "B", "C"]


# ---------------------------------------------------------------------------
# Action simulation
# ---------------------------------------------------------------------------


class TestSimulatorActions:
    async def test_click_calls_tool(self):
        sim = Simulator(_search_handler)
        await sim.invoke("search_users", {"q": ""})
        assert len(sim.state["results"]) == 3

        sim.state["query"] = "Bob"

        button = sim.find("Button", label="Search")
        await sim.click(button)

        search_result = sim.state["search_result"]
        assert isinstance(search_result, dict)
        assert search_result["query"] == "Bob"
        assert len(search_result["results"]) == 1
        assert search_result["results"][0]["name"] == "Bob"

    async def test_set_value_auto_state(self):
        sim = Simulator(_search_handler)
        await sim.invoke("search_users", {"q": ""})

        inp = sim.find("Input", name="query")
        await sim.set_value(inp, "Charlie")

        assert sim.state["query"] == "Charlie"

    async def test_set_state_action(self):
        async def handler(name: str, arguments: dict[str, Any]) -> ActionResult:
            with Column() as view:
                Button(label="Show", on_click=SetState("visible", True))
            return ActionResult(
                content=UIResponse(
                    view=view, state={"visible": False}
                ).to_json()
            )

        sim = Simulator(handler)
        await sim.invoke("toggle_view")
        assert sim.state["visible"] is False

        button = sim.find("Button", label="Show")
        await sim.click(button)
        assert sim.state["visible"] is True

    async def test_toggle_state_action(self):
        async def handler(name: str, arguments: dict[str, Any]) -> ActionResult:
            with Column() as view:
                Button(label="Toggle", on_click=ToggleState("show"))
            return ActionResult(
                content=UIResponse(
                    view=view, state={"show": False}
                ).to_json()
            )

        sim = Simulator(handler)
        await sim.invoke("toggle_view")

        button = sim.find("Button", label="Toggle")
        await sim.click(button)
        assert sim.state["show"] is True

        await sim.click(button)
        assert sim.state["show"] is False

    async def test_show_toast_recorded(self):
        async def handler(name: str, arguments: dict[str, Any]) -> ActionResult:
            return ActionResult(
                content=UIResponse(
                    view=Button(
                        label="Hi",
                        on_click=ShowToast("Hello!", variant="success"),
                    ),
                ).to_json()
            )

        sim = Simulator(handler)
        await sim.invoke("greet")

        button = sim.find("Button", label="Hi")
        await sim.click(button)

        assert len(sim.toasts) == 1
        assert sim.toasts[0]["message"] == "Hello!"
        assert sim.toasts[0]["variant"] == "success"

    async def test_action_chain_short_circuits(self):
        async def handler(name: str, arguments: dict[str, Any]) -> ActionResult:
            if name == "failing_workflow":
                return ActionResult(
                    content=UIResponse(
                        view=Button(
                            label="Run",
                            on_click=[
                                SetState("step1", True),
                                ToolCall("nonexistent_tool"),
                                SetState("step3", True),
                            ],
                        ),
                        state={"step1": False, "step3": False},
                    ).to_json()
                )
            return ActionResult(is_error=True, error_text=f"Unknown tool: {name}")

        sim = Simulator(handler)
        await sim.invoke("failing_workflow")

        button = sim.find("Button", label="Run")
        await sim.click(button)

        assert sim.state["step1"] is True
        assert sim.state.get("step3") is False

    async def test_on_success_callback(self):
        async def handler(name: str, arguments: dict[str, Any]) -> ActionResult:
            if name == "save_item":
                return ActionResult(
                    content=UIResponse(
                        state={"saved": True}, view=Text("ok")
                    ).to_json()
                )
            if name == "show_save":
                return ActionResult(
                    content=UIResponse(
                        view=Button(
                            label="Save",
                            on_click=ToolCall(
                                "save_item",
                                on_success=ShowToast("Saved!", variant="success"),
                                on_error=ShowToast("Failed", variant="error"),
                            ),
                        ),
                    ).to_json()
                )
            return ActionResult(is_error=True, error_text="unknown")

        sim = Simulator(handler)
        await sim.invoke("show_save")

        button = sim.find("Button", label="Save")
        await sim.click(button)

        assert len(sim.toasts) == 1
        assert sim.toasts[0]["message"] == "Saved!"
        assert sim.toasts[0]["variant"] == "success"

    async def test_form_submit(self):
        async def handler(name: str, arguments: dict[str, Any]) -> ActionResult:
            with Form(on_submit=ShowToast("Submitted!")) as form:
                Input(name="name", placeholder="Name")
                Button("Submit")
            return ActionResult(
                content=UIResponse(view=form).to_json()
            )

        sim = Simulator(handler)
        await sim.invoke("contact_form")

        inp = sim.find("Input", name="name")
        await sim.set_value(inp, "Alice")
        assert sim.state["name"] == "Alice"

        form = sim.find("Form")
        await sim.submit(form)

        assert len(sim.toasts) == 1
        assert sim.toasts[0]["message"] == "Submitted!"


# ---------------------------------------------------------------------------
# Result key
# ---------------------------------------------------------------------------


class TestSimulatorResultKey:
    async def test_result_key_writes_to_state(self):
        async def handler(name: str, arguments: dict[str, Any]) -> ActionResult:
            if name == "get_data":
                return ActionResult(
                    content=UIResponse(
                        state={"items": ["a", "b", "c"]},
                        view=Text("data"),
                    ).to_json()
                )
            if name == "show_refresh":
                return ActionResult(
                    content=UIResponse(
                        view=Button(
                            label="Refresh",
                            on_click=ToolCall("get_data", result_key="data"),
                        ),
                        state={"data": None},
                    ).to_json()
                )
            return ActionResult(is_error=True, error_text="unknown")

        sim = Simulator(handler)
        await sim.invoke("show_refresh")
        assert sim.state["data"] is None

        button = sim.find("Button", label="Refresh")
        await sim.click(button)

        assert sim.state["data"] == ["a", "b", "c"]


# ---------------------------------------------------------------------------
# $error variable
# ---------------------------------------------------------------------------


class TestSimulatorError:
    async def test_error_in_on_error_callback(self):
        async def handler(name: str, arguments: dict[str, Any]) -> ActionResult:
            if name == "failing_tool":
                return ActionResult(
                    is_error=True, error_text="Something went wrong"
                )
            if name == "show_button":
                return ActionResult(
                    content=UIResponse(
                        view=Button(
                            label="Fail",
                            on_click=ToolCall(
                                "failing_tool",
                                on_error=SetState("error_msg", "{{ $error }}"),
                            ),
                        ),
                        state={"error_msg": None},
                    ).to_json()
                )
            return ActionResult(is_error=True, error_text="unknown")

        sim = Simulator(handler)
        await sim.invoke("show_button")
        button = sim.find("Button", label="Fail")
        await sim.click(button)

        assert sim.state["error_msg"] is not None
        assert "Something went wrong" in sim.state["error_msg"]

    async def test_error_toast_in_on_error(self):
        async def handler(name: str, arguments: dict[str, Any]) -> ActionResult:
            if name == "fail":
                return ActionResult(is_error=True, error_text="Bad input")
            if name == "show_ui":
                return ActionResult(
                    content=UIResponse(
                        view=Button(
                            label="Go",
                            on_click=ToolCall(
                                "fail",
                                on_error=ShowToast("{{ $error }}", variant="error"),
                            ),
                        ),
                    ).to_json()
                )
            return ActionResult(is_error=True, error_text="unknown")

        sim = Simulator(handler)
        await sim.invoke("show_ui")
        await sim.click(sim.find("Button", label="Go"))

        assert len(sim.toasts) == 1
        assert "Bad input" in sim.toasts[0]["message"]
        assert sim.toasts[0]["variant"] == "error"

    async def test_error_not_set_on_success(self):
        async def handler(name: str, arguments: dict[str, Any]) -> ActionResult:
            if name == "ok_tool":
                return ActionResult(
                    content=UIResponse(state={"ok": True}).to_json()
                )
            if name == "show_ui":
                return ActionResult(
                    content=UIResponse(
                        view=Button(
                            label="Go",
                            on_click=ToolCall(
                                "ok_tool",
                                on_success=SetState("msg", "{{ $error }}"),
                            ),
                        ),
                    ).to_json()
                )
            return ActionResult(is_error=True, error_text="unknown")

        sim = Simulator(handler)
        await sim.invoke("show_ui")
        await sim.click(sim.find("Button", label="Go"))

        assert sim.state.get("msg") == "{{ $error }}"
