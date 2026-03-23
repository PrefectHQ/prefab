"""Pyodide sandbox for executing LLM-generated Prefab code.

Manages a persistent Deno subprocess running Pyodide with the full
Prefab library pre-loaded. Code runs inside WASM isolation — context
managers, ``.rx``, Pydantic validation all work identically to native
Python.
"""

from __future__ import annotations

import asyncio
import json
import shutil
import subprocess
from pathlib import Path
from typing import Any

RUNNER_JS = Path(__file__).parent / "runner.js"
PREFAB_SRC = Path(__file__).parent.parent  # src/prefab_ui/


class Sandbox:
    """Pyodide sandbox with a warm Deno subprocess.

    Use as an async context manager::

        async with Sandbox() as sandbox:
            result = await sandbox.run(code, data={"key": "value"})

    The Deno/Pyodide process starts on ``__aenter__`` and is killed on
    ``__aexit__``. Between calls, the process stays warm — only the
    first request pays the Pyodide cold start (~2-3s).
    """

    def __init__(self) -> None:
        self._process: subprocess.Popen[bytes] | None = None
        self._lock = asyncio.Lock()

    async def __aenter__(self) -> Sandbox:
        await self._start()
        return self

    async def __aexit__(self, *args: Any) -> None:
        self._stop()

    async def _start(self) -> None:
        deno = shutil.which("deno")
        if deno is None:
            raise RuntimeError(
                "Deno is required for the Prefab sandbox. "
                "Install it from https://deno.land"
            )

        loop = asyncio.get_event_loop()
        proc = await loop.run_in_executor(
            None,
            lambda: subprocess.Popen(
                [
                    deno,
                    "run",
                    "--allow-read",
                    "--allow-net",
                    str(RUNNER_JS),
                    str(PREFAB_SRC),
                ],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            ),
        )

        # Wait for the runner to signal readiness
        while True:
            line = await loop.run_in_executor(None, proc.stderr.readline)
            if b"pyodide:ready" in line:
                break
            if proc.poll() is not None:
                err = proc.stderr.read().decode()
                raise RuntimeError(f"Pyodide sandbox failed to start: {err[-500:]}")

        self._process = proc

    def _stop(self) -> None:
        if self._process is not None:
            proc = self._process
            self._process = None
            if proc.stdin:
                proc.stdin.close()
            if proc.stdout:
                proc.stdout.close()
            if proc.stderr:
                proc.stderr.close()
            proc.terminate()
            proc.wait()

    async def run(
        self,
        code: str,
        *,
        data: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        """Execute Prefab code and return the wire protocol JSON.

        Args:
            code: Python code that builds a Prefab component tree.
                Must assign a ``PrefabApp`` or ``Component`` to a variable.
            data: Values injected as variables in the sandbox namespace.

        Returns:
            Prefab wire protocol dict (``version``, ``view``, ``state``, etc.)

        Raises:
            RuntimeError: If the sandbox is not started or the code fails.
        """
        async with self._lock:
            proc = self._process
            if proc is None or proc.poll() is not None:
                raise RuntimeError("Sandbox is not running")
            if proc.stdin is None or proc.stdout is None:
                raise RuntimeError("Sandbox pipes not available")

            request = json.dumps({"code": code, "data": data or {}}) + "\n"
            loop = asyncio.get_event_loop()
            proc.stdin.write(request.encode())
            proc.stdin.flush()
            line = await loop.run_in_executor(None, proc.stdout.readline)

            if not line:
                raise RuntimeError("Sandbox process died unexpectedly")

            response = json.loads(line)
            if "error" in response:
                raise RuntimeError(response["error"])
            return response["result"]
