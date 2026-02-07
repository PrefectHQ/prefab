"""Headless Prefab simulator for integration testing.

Simulates the renderer's client-side behavior (state management, action
dispatch, template interpolation) without a browser. Lets you invoke server
functions, inspect state, find components in the view tree, and trigger
actions.

Usage::

    from prefab_ui.testing import ActionResult, Simulator

    async def handler(name: str, arguments: dict) -> ActionResult:
        if name == "search_users":
            return ActionResult(content={"users": [{"name": "Alice"}]})
        return ActionResult(content={})

    sim = Simulator(handler)

    await sim.invoke("search_users", {"q": "Alice"})
    assert sim.state["users"][0]["name"] == "Alice"

    button = sim.find("Button", label="Search")
    await sim.click(button)
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any, Protocol, runtime_checkable

TEMPLATE_RE = re.compile(r"\{\{\s*([\w.$]+)\s*\}\}")
RESERVED_PREFIX = "_prefab_"
MAX_ACTION_DEPTH = 10


@dataclass
class ActionResult:
    """Result of a server-side action invocation."""

    content: dict[str, Any] = field(default_factory=dict)
    is_error: bool = False
    error_text: str | None = None


@runtime_checkable
class ActionHandler(Protocol):
    """Protocol for handling server-bound actions."""

    async def __call__(self, name: str, arguments: dict[str, Any]) -> ActionResult: ...


class ComponentNotFoundError(LookupError):
    """Raised when a component cannot be found in the view tree."""


class Simulator:
    """Headless Prefab renderer for testing.

    Maintains client-side state and a view tree, simulates user
    interactions by executing action chains through a handler.
    """

    def __init__(self, handler: ActionHandler) -> None:
        self.handler = handler
        self.state: dict[str, Any] = {}
        self.view: dict[str, Any] | None = None
        self.toasts: list[dict[str, Any]] = []

    # ── Server invocations ────────────────────────────────────────

    async def invoke(self, name: str, arguments: dict[str, Any] | None = None) -> None:
        """Invoke a named server function and update state + view from the result."""
        result = await self.handler(name, arguments or {})
        if result.is_error:
            return
        if result.content:
            self._handle_structured_content(result.content)

    # ── Component finding ────────────────────────────────────────

    def find(self, type: str, **props: Any) -> dict[str, Any]:
        """Find the first component matching type and optional props.

        Raises ComponentNotFoundError if no match is found.
        """
        if self.view is None:
            raise ComponentNotFoundError("No view tree — invoke a function first")
        result = self._find_recursive(self.view, type, props)
        if result is None:
            prop_desc = f" with {props}" if props else ""
            raise ComponentNotFoundError(f"{type}{prop_desc} not found in view tree")
        return result

    def find_all(self, type: str, **props: Any) -> list[dict[str, Any]]:
        """Find all components matching type and optional props."""
        if self.view is None:
            return []
        results: list[dict[str, Any]] = []
        self._find_all_recursive(self.view, type, props, results)
        return results

    # ── Interaction simulation ───────────────────────────────────

    async def click(self, component: dict[str, Any]) -> None:
        """Simulate clicking a component (executes its onClick action)."""
        action = component.get("onClick")
        if action is None:
            raise ValueError(
                f"Component {component.get('type', '?')} has no onClick handler"
            )
        await self._execute_actions(action)

    async def set_value(self, component: dict[str, Any], value: Any) -> None:
        """Simulate changing a form input's value.

        Sets auto-state for named components, then executes onChange.
        """
        name = component.get("name")
        if name:
            self.state[name] = value

        action = component.get("onChange")
        if action:
            await self._execute_actions(action, event=value)

    async def submit(self, component: dict[str, Any]) -> None:
        """Simulate submitting a form (executes its onSubmit action)."""
        action = component.get("onSubmit")
        if action is None:
            raise ValueError(
                f"Component {component.get('type', '?')} has no onSubmit handler"
            )
        await self._execute_actions(action)

    # ── Action execution ─────────────────────────────────────────

    async def _execute_actions(
        self,
        actions: dict[str, Any] | list[dict[str, Any]],
        event: Any = None,
        depth: int = 0,
        error: str | None = None,
    ) -> None:
        """Execute one or more actions sequentially with short-circuit."""
        action_list = actions if isinstance(actions, list) else [actions]
        for action in action_list:
            success = await self._execute_action(action, event, depth, error)
            if not success:
                break

    async def _execute_action(
        self,
        action: dict[str, Any],
        event: Any = None,
        depth: int = 0,
        error: str | None = None,
    ) -> bool:
        """Execute a single action. Returns True on success."""
        if depth > MAX_ACTION_DEPTH:
            return False

        resolved = self._interpolate_dict(action, event, error)
        success = True
        error_message: str | None = None

        action_type = resolved.get("action")

        if action_type == "toolCall":
            tool_name = resolved["tool"]
            arguments = resolved.get("arguments", {})
            result = await self.handler(tool_name, arguments)

            if result.is_error:
                success = False
                error_message = result.error_text or "Unknown error"
            else:
                result_key = resolved.get("resultKey")
                if result_key and result.content:
                    data = self._extract_result_data(result.content)
                    self.state[result_key] = data

                if result.content:
                    view = result.content.get("_prefab_view")
                    if view:
                        self.view = view

        elif action_type == "setState":
            self.state[resolved["key"]] = resolved.get("value")

        elif action_type == "toggleState":
            key = resolved["key"]
            self.state[key] = not self.state.get(key, False)

        elif action_type == "showToast":
            self.toasts.append(
                {
                    "message": resolved.get("message"),
                    "variant": resolved.get("variant"),
                    "description": resolved.get("description"),
                }
            )

        elif action_type in ("sendMessage", "updateContext", "openLink"):
            pass  # Cannot simulate host interaction

        # Dispatch lifecycle callbacks
        if success:
            callbacks = resolved.get("onSuccess")
            if callbacks:
                await self._execute_actions(callbacks, depth=depth + 1)
        else:
            callbacks = resolved.get("onError")
            if callbacks:
                await self._execute_actions(
                    callbacks, depth=depth + 1, error=error_message
                )

        return success

    # ── Interpolation ────────────────────────────────────────────

    def _interpolate_dict(
        self,
        obj: dict[str, Any],
        event: Any = None,
        error: str | None = None,
    ) -> dict[str, Any]:
        """Interpolate {{ key }} templates in a dict's values."""
        ctx = {**self.state}
        if event is not None:
            ctx["$event"] = event
        if error is not None:
            ctx["$error"] = error
        return self._interpolate_value(obj, ctx)

    def _interpolate_value(self, value: Any, ctx: dict[str, Any]) -> Any:
        if isinstance(value, str):
            return self._interpolate_string(value, ctx)
        if isinstance(value, dict):
            return {k: self._interpolate_value(v, ctx) for k, v in value.items()}
        if isinstance(value, list):
            return [self._interpolate_value(item, ctx) for item in value]
        return value

    def _interpolate_string(self, template: str, ctx: dict[str, Any]) -> Any:
        """Resolve {{ key }} templates. Preserves type for sole templates."""
        single = re.fullmatch(r"\{\{\s*([\w.$]+)\s*\}\}", template)
        if single:
            resolved = self._resolve_path(single.group(1), ctx)
            return resolved if resolved is not None else template

        def replace(m: re.Match[str]) -> str:
            resolved = self._resolve_path(m.group(1), ctx)
            return str(resolved) if resolved is not None else ""

        return TEMPLATE_RE.sub(replace, template)

    @staticmethod
    def _resolve_path(path: str, ctx: dict[str, Any]) -> Any:
        """Resolve a dot-path like 'user.name' from a context dict."""
        parts = path.split(".")
        current: Any = ctx
        for part in parts:
            if current is None or not isinstance(current, dict):
                return None
            current = current.get(part)
        return current

    # ── Helpers ──────────────────────────────────────────────────

    def _handle_structured_content(self, structured: dict[str, Any]) -> None:
        """Extract state and view from structured content."""
        view = structured.get("_prefab_view")
        state = {
            k: v for k, v in structured.items() if not k.startswith(RESERVED_PREFIX)
        }
        self.state = state
        if view:
            self.view = view

    @staticmethod
    def _extract_result_data(structured: dict[str, Any]) -> Any:
        """Strip reserved keys and unwrap single-value results."""
        entries = {
            k: v for k, v in structured.items() if not k.startswith(RESERVED_PREFIX)
        }
        if not entries:
            return structured
        if len(entries) == 1:
            return next(iter(entries.values()))
        return entries

    def _find_recursive(
        self,
        node: dict[str, Any],
        type: str,
        props: dict[str, Any],
    ) -> dict[str, Any] | None:
        if node.get("type") == type and all(node.get(k) == v for k, v in props.items()):
            return node
        for child in node.get("children", []):
            result = self._find_recursive(child, type, props)
            if result is not None:
                return result
        return None

    def _find_all_recursive(
        self,
        node: dict[str, Any],
        type: str,
        props: dict[str, Any],
        results: list[dict[str, Any]],
    ) -> None:
        if node.get("type") == type and all(node.get(k) == v for k, v in props.items()):
            results.append(node)
        for child in node.get("children", []):
            self._find_all_recursive(child, type, props, results)
