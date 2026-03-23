"""Sandboxed execution of LLM-generated Prefab component code.

Provides a ``SandboxProvider`` protocol and a Monty-backed implementation
for safely executing untrusted Python that builds Prefab component trees.

Usage::

    from prefab_ui.sandbox import execute

    result = await execute('''
        root = Column(gap=4)
        Heading("Sales Report", parent=root)
        Text("Revenue: $1.2M", parent=root)
        return root
    ''')
"""

from __future__ import annotations

import importlib
from collections.abc import Callable
from typing import Any, Protocol

import prefab_ui.components
import prefab_ui.components.charts


class SandboxProvider(Protocol):
    """Interface for executing LLM-generated Python in a sandbox.

    The ``code`` parameter contains untrusted, LLM-generated Python.
    Implementations must execute it in an isolated sandbox — never with
    plain ``exec()``.
    """

    async def run(
        self,
        code: str,
        *,
        inputs: dict[str, Any] | None = None,
        external_functions: dict[str, Callable[..., Any]] | None = None,
    ) -> Any: ...


class MontySandboxProvider:
    """Sandbox backed by `pydantic-monty <https://github.com/pydantic/pydantic-monty>`_.

    Requires ``pydantic-monty>=0.0.8``. Install via::

        pip install prefab-ui[monty]

    Args:
        limits: Resource limits for sandbox execution. Supported keys:
            ``max_duration_secs`` (float), ``max_allocations`` (int),
            ``max_memory`` (int), ``max_recursion_depth`` (int),
            ``gc_interval`` (int). All optional; omit to leave uncapped.
    """

    def __init__(self, *, limits: dict[str, Any] | None = None) -> None:
        self.limits = limits

    async def run(
        self,
        code: str,
        *,
        inputs: dict[str, Any] | None = None,
        external_functions: dict[str, Callable[..., Any]] | None = None,
    ) -> Any:
        try:
            pydantic_monty = importlib.import_module("pydantic_monty")
        except ModuleNotFoundError as exc:
            raise ImportError(
                "MontySandboxProvider requires pydantic-monty. "
                "Install it with: pip install prefab-ui[monty]"
            ) from exc

        inputs = inputs or {}
        monty = pydantic_monty.Monty(
            code,
            inputs=list(inputs.keys()),
        )
        run_kwargs: dict[str, Any] = {}
        if inputs:
            run_kwargs["inputs"] = inputs
        if external_functions:
            run_kwargs["external_functions"] = external_functions
        if self.limits is not None:
            run_kwargs["limits"] = self.limits
        return await pydantic_monty.run_monty_async(monty, **run_kwargs)


def get_component_namespace() -> dict[str, Callable[..., Any]]:
    """Return a dict of all Prefab component classes for sandbox injection.

    Maps component names (e.g. ``"Column"``, ``"Heading"``) to their
    classes. This covers everything exported from ``prefab_ui.components``
    and ``prefab_ui.components.charts``.

    These are meant to be injected into a sandbox as external functions
    so that LLM-generated code can build component trees::

        namespace = get_component_namespace()
        result = await sandbox.run(code, external_functions=namespace)
    """
    from prefab_ui.components.base import Component

    namespace: dict[str, Callable[..., Any]] = {}
    for module in (prefab_ui.components, prefab_ui.components.charts):
        names = getattr(module, "__all__", None) or [
            n for n in dir(module) if not n.startswith("_")
        ]
        for name in names:
            obj = getattr(module, name)
            if isinstance(obj, type) and issubclass(obj, Component):
                namespace[name] = obj
    return namespace


async def execute(
    code: str,
    *,
    data: dict[str, Any] | None = None,
    sandbox: SandboxProvider | None = None,
) -> Any:
    """Execute LLM-generated Python with Prefab components in scope.

    The sandbox namespace includes all Prefab component constructors
    (Column, Row, Text, etc.) as external functions, plus any user-provided
    ``data`` as inputs.

    Args:
        code: Python code to execute. Should build a component tree and
            ``return`` the root component.
        data: Values to inject into the sandbox namespace. Available as
            variables in the generated code.
        sandbox: Sandbox provider to use. Defaults to
            ``MontySandboxProvider()``.

    Returns:
        The value returned by the code (typically a Component).
    """
    if sandbox is None:
        sandbox = MontySandboxProvider()
    return await sandbox.run(
        code,
        inputs=data,
        external_functions=get_component_namespace(),
    )
