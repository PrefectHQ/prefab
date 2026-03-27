"""Tests for the Pyodide executor harness logic.

The browser executor (executor.ts) wraps user code in a Python harness
that heals partial code, patches PrefabApp.__init__ to track instances,
and extracts the component tree. These tests validate the harness logic
using native Python — no Pyodide or Deno needed.

The harness is reconstructed here to match executor.ts exactly. If the
TS harness changes, these tests must be updated to match.
"""

from __future__ import annotations

import json

import pytest

from prefab_ui.app import PrefabApp
from prefab_ui.components.base import Component, ContainerComponent, _component_stack


def run_harness(code: str) -> dict:
    """Execute code through the same harness logic as executor.ts.

    Returns the parsed JSON result dict, or raises on error.
    """
    _component_stack.set(None)

    app_instances: list[PrefabApp] = []
    real_init = PrefabApp.__init__

    def tracking_init(self: PrefabApp, /, **data: object) -> None:
        real_init(self, **data)
        app_instances.append(self)

    PrefabApp.__init__ = tracking_init  # type: ignore[assignment]  # ty: ignore[invalid-assignment]

    # Track all Component instances created during execution
    all_instances: list[Component] = []
    real_comp_init = Component.__init__

    def tracking_comp_init(self: Component, /, **kwargs: object) -> None:
        real_comp_init(self, **kwargs)  # type: ignore[misc]
        all_instances.append(self)

    Component.__init__ = tracking_comp_init  # type: ignore[assignment]  # ty: ignore[invalid-assignment]

    try:
        # Heal partial code: strip trailing lines until it compiles.
        lines = code.split("\n")
        healed = None
        for n in range(len(lines), 0, -1):
            attempt = "\n".join(lines[:n])
            try:
                compile(attempt, "<string>", "exec")
                healed = attempt
                break
            except SyntaxError:
                continue

        if healed is None:
            raise SyntaxError("Could not heal partial code")

        ns: dict = {}
        exec(healed, ns)  # noqa: S102

        apps = app_instances or [
            v
            for k, v in ns.items()
            if not k.startswith("_") and isinstance(v, PrefabApp)
        ]
        comps = all_instances

        all_children: set[int] = set()
        for c in comps:
            if isinstance(c, ContainerComponent):
                for ch in c.children:
                    all_children.add(id(ch))
        roots = [c for c in comps if id(c) not in all_children]

        target = apps[-1] if apps else (roots[-1] if roots else None)

        if target is None:
            raise ValueError("No components created")

        if not isinstance(target, PrefabApp):
            target = PrefabApp(view=target)

        wire = target.to_json()
        result: dict = {"tree": wire.get("view")}
        if wire.get("state"):
            result["state"] = wire["state"]
        if wire.get("theme"):
            result["theme"] = wire["theme"]

        json_str = json.dumps(result)
    finally:
        PrefabApp.__init__ = real_init  # type: ignore[assignment]  # ty: ignore[invalid-assignment]
        Component.__init__ = real_comp_init  # type: ignore[assignment]  # ty: ignore[invalid-assignment]

    return json.loads(json_str)


def inner_view(result: dict) -> dict:
    """Unwrap the pf-app-root Div to get the user's view."""
    assert result["tree"]["type"] == "Div"
    assert "pf-app-root" in result["tree"]["cssClass"]
    return result["tree"]["children"][0]


class TestInitRestoration:
    """PrefabApp.__init__ must be restored after every execution."""

    def test_restored_after_success(self):
        original = PrefabApp.__init__
        run_harness("""
from prefab_ui.components import Text
view = Text("hello")
""")
        assert PrefabApp.__init__ is original

    def test_restored_after_syntax_error(self):
        original = PrefabApp.__init__
        with pytest.raises(SyntaxError):
            run_harness("def f(")
        assert PrefabApp.__init__ is original

    def test_restored_after_runtime_error(self):
        original = PrefabApp.__init__
        with pytest.raises(NameError):
            run_harness("undefined_variable")
        assert PrefabApp.__init__ is original

    def test_restored_after_unicode_error(self):
        original = PrefabApp.__init__
        with pytest.raises((UnicodeEncodeError, SyntaxError, ValueError)):
            run_harness("x = '\ud83c'")
        assert PrefabApp.__init__ is original

    def test_no_recursion_after_error(self):
        """The recursion bug: if __init__ isn't restored, the next
        execution captures the patched version and recurses."""
        original = PrefabApp.__init__
        with pytest.raises(ValueError):
            run_harness("x = 1")  # No components → ValueError

        # Second execution must NOT recurse
        result = run_harness("""
from prefab_ui.components import Text
view = Text("after error")
""")
        assert inner_view(result)["content"] == "after error"
        assert PrefabApp.__init__ is original

    def test_no_recursion_after_multiple_errors(self):
        """Multiple consecutive errors must not corrupt __init__."""
        original = PrefabApp.__init__
        for _ in range(5):
            with pytest.raises(ValueError):
                run_harness("x = 1")

        result = run_harness("""
from prefab_ui.components import Text
view = Text("still works")
""")
        assert inner_view(result)["content"] == "still works"
        assert PrefabApp.__init__ is original


class TestReturnValue:
    """The harness must return valid JSON with a tree."""

    def test_returns_valid_json(self):
        result = run_harness("""
from prefab_ui.components import Text
view = Text("hello")
""")
        assert "tree" in result
        assert inner_view(result)["type"] == "Text"

    def test_prefab_app_extracts_view(self):
        result = run_harness("""
from prefab_ui.components import Column, Text
from prefab_ui.app import PrefabApp
with PrefabApp() as app:
    Text("inside app")
""")
        # Context manager: Div with pf-app-root contains children directly
        assert result["tree"]["type"] == "Div"
        assert result["tree"]["children"][0]["content"] == "inside app"

    def test_prefab_app_extracts_state(self):
        result = run_harness("""
from prefab_ui.components import Text
from prefab_ui.app import PrefabApp
app = PrefabApp(view=Text("hi"), state={"count": 0})
""")
        assert result["state"] == {"count": 0}

    def test_raw_component_wrapped_in_prefab_app(self):
        result = run_harness("""
from prefab_ui.components import Text
view = Text("raw")
""")
        # Should still produce a tree (wrapped in PrefabApp internally)
        assert result["tree"] is not None


class TestCodeHealing:
    """Partial code with dangling lines should be healed."""

    def test_heals_incomplete_trailing_line(self):
        result = run_harness("""
from prefab_ui.components import Text
view = Text("complete")
Text("incomp""")
        assert inner_view(result)["content"] == "complete"

    def test_heals_incomplete_with_block(self):
        # Trailing `with X():` with no body is a SyntaxError
        result = run_harness("""
from prefab_ui.components import Column, Text
with Column() as view:
    Text("inside")
    with Column():""")
        assert inner_view(result)["type"] == "Column"

    def test_cannot_heal_fully_broken(self):
        with pytest.raises(SyntaxError, match="Could not heal"):
            run_harness("""def f(
    x,
    y,
    z,
    w,
    v,""")

    def test_no_components_is_value_error(self):
        with pytest.raises(ValueError, match="No components created"):
            run_harness("""
x = 1
y = 2
""")


class TestPrefabAppTracking:
    """PrefabApp instances are tracked even without variable assignment."""

    def test_context_manager_tracked(self):
        result = run_harness("""
from prefab_ui.components import Text
from prefab_ui.app import PrefabApp
with PrefabApp():
    Text("tracked")
""")
        assert result["tree"]["type"] == "Div"
        assert result["tree"]["children"][0]["content"] == "tracked"

    def test_prefers_prefab_app_over_raw_components(self):
        result = run_harness("""
from prefab_ui.components import Column, Text
from prefab_ui.app import PrefabApp
stray = Text("stray")
with PrefabApp(state={"x": 1}):
    Text("in app")
""")
        assert result.get("state") == {"x": 1}

    def test_multiple_apps_uses_last(self):
        result = run_harness("""
from prefab_ui.components import Text
from prefab_ui.app import PrefabApp
with PrefabApp(state={"v": 1}):
    Text("first")
with PrefabApp(state={"v": 2}):
    Text("second")
""")
        assert result["state"] == {"v": 2}


class TestRootDetection:
    """Without PrefabApp, the harness finds root components."""

    def test_single_component(self):
        result = run_harness("""
from prefab_ui.components import Text
view = Text("solo")
""")
        assert inner_view(result)["content"] == "solo"

    def test_nested_children_not_roots(self):
        result = run_harness("""
from prefab_ui.components import Column, Text
col = Column(children=[Text("child")])
""")
        # Column is the root, not Text
        assert inner_view(result)["type"] == "Column"

    def test_context_manager_root(self):
        result = run_harness("""
from prefab_ui.components import Column, Heading, Text
with Column() as view:
    Heading("title")
    Text("body")
""")
        assert inner_view(result)["type"] == "Column"
        assert len(inner_view(result)["children"]) == 2

    def test_context_manager_without_variable(self):
        """Context manager roots not assigned to a variable must still be found."""
        result = run_harness("""
from prefab_ui.components import Button, Column, Input
with Column():
    Input(name="city", placeholder="Enter a city...")
    Button("Get Weather")
""")
        assert inner_view(result)["type"] == "Column"
        assert len(inner_view(result)["children"]) == 2
