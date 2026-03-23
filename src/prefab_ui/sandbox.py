"""Sandboxed execution of LLM-generated Prefab component code.

Monty (pydantic-monty) can't pass Pydantic model instances across the
sandbox boundary.  This module provides dict-handle shims: each
constructor builds the real Prefab object outside the sandbox and
returns a dict that Monty can pass around.  Stateful components
include ``rx`` and ``name`` keys for reactive references.

Usage::

    from prefab_ui.sandbox import execute

    app = await execute('''
        root = Column(gap=4)
        slider = Slider(value=50, parent=root)
        Text(content="Value: " + slider["rx"], parent=root)
        return PrefabApp(view=root, state={"count": 0})
    ''')
"""

from __future__ import annotations

from collections.abc import Callable
from typing import Any

import prefab_ui.components
import prefab_ui.components.charts
from prefab_ui.app import PrefabApp
from prefab_ui.components.base import Component, ContainerComponent, StatefulMixin


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
    """Maps integer handles to real objects built outside the sandbox.

    Monty can only pass primitives (int, str, float, bool, list, dict)
    across the sandbox boundary.  Shim functions build real Prefab
    objects outside the sandbox, store them here, and return a dict
    handle that Monty code can pass around::

        {"_handle": 0}                              # plain component
        {"_handle": 1, "name": "slider_1",           # stateful component
         "rx": "{{ slider_1 }}"}
    """

    def __init__(self) -> None:
        self._objects: dict[int, Any] = {}
        self._next_id: int = 0

    def store(self, obj: Any) -> int:
        handle = self._next_id
        self._next_id += 1
        self._objects[handle] = obj
        return handle

    def get(self, handle: int) -> Any:
        return self._objects[handle]

    def resolve_handle(self, info: dict[str, Any] | int) -> Any:
        """Resolve a handle dict or bare int to the stored object."""
        if isinstance(info, dict):
            return self._objects[info["_handle"]]
        return self._objects[info]


def _make_handle_dict(handle: int, component: Component) -> dict[str, Any]:
    """Build the dict handle returned to sandbox code.

    Stateful components (Slider, Input, etc.) get ``name`` and ``rx``
    fields so the LLM can reference reactive state via ``slider['rx']``.
    """
    info: dict[str, Any] = {"_handle": handle}
    if isinstance(component, StatefulMixin) and component.name is not None:
        info["name"] = component.name
        info["rx"] = str(component.rx)
    return info


def build_namespace(
    registry: ComponentRegistry | None = None,
    extra: dict[str, Callable[..., Any]] | None = None,
) -> tuple[ComponentRegistry, dict[str, Callable[..., Any]]]:
    """Build the sandbox namespace: shim functions for all Prefab components.

    Each shim wraps a real Component constructor. It intercepts
    ``parent=<handle>`` to resolve the real parent, builds the component
    outside the sandbox, and returns a dict handle.  Stateful components
    include ``name`` and ``rx`` keys so the LLM can write::

        slider = Slider(value=50, parent=root)
        Text(content='Value: ' + slider['rx'], parent=root)

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

    def _make_shim(cls: type[Component]) -> Callable[..., dict[str, Any]]:
        def shim(*args: Any, **kwargs: Any) -> dict[str, Any]:
            parent_info = kwargs.pop("parent", None)
            if parent_info is not None:
                parent = reg.resolve_handle(parent_info)
                if not isinstance(parent, ContainerComponent):
                    raise TypeError(
                        f"parent must be a container component, "
                        f"got {type(parent).__name__}"
                    )
                kwargs["parent"] = parent
            comp = cls(*args, **kwargs)
            handle = reg.store(comp)
            return _make_handle_dict(handle, comp)

        return shim

    def _prefab_app_shim(**kwargs: Any) -> dict[str, Any]:
        view_info = kwargs.pop("view", None)
        if view_info is not None:
            kwargs["view"] = reg.resolve_handle(view_info)
        app = PrefabApp(**kwargs)
        handle = reg.store(app)
        return {"_handle": handle}

    namespace: dict[str, Callable[..., Any]] = {
        name: _make_shim(cls) for name, cls in _get_component_classes().items()
    }
    namespace["PrefabApp"] = _prefab_app_shim
    if extra:
        namespace.update(extra)
    return reg, namespace


async def execute(
    code: str,
    *,
    data: dict[str, Any] | None = None,
    extra_functions: dict[str, Callable[..., Any]] | None = None,
) -> Component | PrefabApp:
    """Execute LLM-generated Python and return the result.

    Runs ``code`` in a Monty sandbox with all Prefab component
    constructors and ``PrefabApp`` available. The code should build
    a component tree and ``return`` either a root component handle
    or a ``PrefabApp`` handle.

    Args:
        code: Python code that builds a Prefab UI.
        data: Values injected as variables in the sandbox.
        extra_functions: Additional callables available in the sandbox
            (e.g. ``call_tool``).

    Returns:
        The Component or PrefabApp built by the code.

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
    result = await pydantic_monty.run_monty_async(monty, **run_kwargs)
    return registry.resolve_handle(result)
