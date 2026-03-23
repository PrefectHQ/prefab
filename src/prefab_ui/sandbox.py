"""Sandboxed execution of LLM-generated Prefab component code.

Monty (pydantic-monty) can't pass Pydantic model instances across the
sandbox boundary.  This module provides handle-based shims: each
component constructor returns an integer handle to the caller inside
the sandbox, while the real Prefab object is built and stored outside.

Usage::

    from prefab_ui.sandbox import execute

    root = await execute('''
        root = Column(gap=4)
        Heading("Sales Report", parent=root)
        Text("Revenue: $1.2M", parent=root)
        return root
    ''')
    # root is a real prefab_ui Column with children
"""

from __future__ import annotations

from collections.abc import Callable
from typing import Any

import prefab_ui.components
import prefab_ui.components.charts
from prefab_ui.components.base import Component, ContainerComponent


def _get_component_classes() -> dict[str, type[Component]]:
    """Collect all Component subclasses from the public API."""
    classes: dict[str, type[Component]] = {}
    for module in (prefab_ui.components, prefab_ui.components.charts):
        names = getattr(module, "__all__", None) or [
            n for n in dir(module) if not n.startswith("_")
        ]
        for name in names:
            obj = getattr(module, name)
            if isinstance(obj, type) and issubclass(obj, Component):
                classes[name] = obj
    return classes


class ComponentRegistry:
    """Maps integer handles to real Component instances.

    Monty can only pass primitives (int, str, float, bool, list, dict)
    across the sandbox boundary.  The registry lets shim functions return
    an int handle that Monty code can pass around (e.g. as ``parent=``),
    while the real Pydantic model lives outside the sandbox.
    """

    def __init__(self) -> None:
        self._components: dict[int, Component] = {}
        self._next_id: int = 0

    def store(self, component: Component) -> int:
        handle = self._next_id
        self._next_id += 1
        self._components[handle] = component
        return handle

    def get(self, handle: int) -> Component:
        return self._components[handle]


def build_namespace(
    registry: ComponentRegistry | None = None,
    extra: dict[str, Callable[..., Any]] | None = None,
) -> tuple[ComponentRegistry, dict[str, Callable[..., Any]]]:
    """Build the sandbox namespace: shim functions for all Prefab components.

    Each shim wraps a real Component constructor. It intercepts
    ``parent=<handle>`` to resolve the real parent, builds the component
    outside the sandbox, stores it in the registry, and returns a handle.

    Args:
        registry: Existing registry to use. Created if not provided.
        extra: Additional callables to include in the namespace.

    Returns:
        A (registry, namespace) tuple. The namespace is a dict of
        callable shims suitable for Monty's ``external_functions``.
    """
    if registry is None:
        registry = ComponentRegistry()
    reg = registry

    def _make_shim(cls: type[Component]) -> Callable[..., int]:
        def shim(*args: Any, **kwargs: Any) -> int:
            parent_handle = kwargs.pop("parent", None)
            if parent_handle is not None:
                parent = reg.get(parent_handle)
                if not isinstance(parent, ContainerComponent):
                    raise TypeError(
                        f"parent must be a container component, "
                        f"got {type(parent).__name__}"
                    )
                kwargs["parent"] = parent
            return reg.store(cls(*args, **kwargs))

        return shim

    namespace: dict[str, Callable[..., Any]] = {
        name: _make_shim(cls) for name, cls in _get_component_classes().items()
    }
    if extra:
        namespace.update(extra)
    return reg, namespace


async def execute(
    code: str,
    *,
    data: dict[str, Any] | None = None,
    extra_functions: dict[str, Callable[..., Any]] | None = None,
) -> Component:
    """Execute LLM-generated Python and return the resulting component tree.

    Runs ``code`` in a Monty sandbox with all Prefab component
    constructors available. The code should ``return`` the root
    component handle; this function resolves it to the real Component.

    Args:
        code: Python code that builds a component tree using Prefab
            constructors and ``return``\\s the root.
        data: Values injected as variables in the sandbox.
        extra_functions: Additional callables available in the sandbox
            (e.g. ``call_tool``).

    Returns:
        The root Component built by the code.

    Raises:
        ImportError: If pydantic-monty is not installed.
    """
    import importlib

    try:
        pydantic_monty = importlib.import_module("pydantic_monty")
    except ModuleNotFoundError as exc:
        raise ImportError(
            "execute() requires pydantic-monty. "
            "Install it with: pip install prefab-ui[monty]"
        ) from exc

    registry, namespace = build_namespace(extra=extra_functions)

    data = data or {}
    monty = pydantic_monty.Monty(code, inputs=list(data.keys()))
    run_kwargs: dict[str, Any] = {"external_functions": namespace}
    if data:
        run_kwargs["inputs"] = data
    root_handle = await pydantic_monty.run_monty_async(monty, **run_kwargs)
    return registry.get(root_handle)
