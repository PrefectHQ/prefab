"""Pyodide sandbox for executing LLM-generated Prefab code.

Manages a persistent Deno subprocess running Pyodide with the full
Prefab library pre-loaded. Code runs inside WASM isolation — context
managers, `.rx`, Pydantic validation all work identically to native
Python.
"""

from __future__ import annotations

import asyncio
import json
import os
import shutil
import subprocess
from pathlib import Path
from typing import Any

RUNNER_JS = Path(__file__).parent / "runner.js"
PREFAB_SRC = Path(__file__).parent.parent  # src/prefab_ui/


class PyodideSandbox:
    """Pyodide sandbox backed by a warm Deno subprocess.

    Use as an async context manager for explicit lifecycle control:

    ```python
    async with PyodideSandbox() as sandbox:
        result = await sandbox.run(code, data={"key": "value"})
    ```

    Or create a long-lived instance that starts lazily on first use:

    ```python
    sandbox = PyodideSandbox()
    result = await sandbox.run(code)  # cold start happens here
    result = await sandbox.run(code)  # warm, ~1ms
    ```

    The Deno process auto-restarts if it crashes between calls.
    """

    def __init__(self) -> None:
        self._process: subprocess.Popen[bytes] | None = None
        self._lock = asyncio.Lock()

    async def __aenter__(self) -> PyodideSandbox:
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
        env = {
            **os.environ,
            "DENO_V8_FLAGS": "--max-old-space-size=4096",
            "DENO_UNSTABLE_DETECT_CJS": "1",
        }
        proc = await loop.run_in_executor(
            None,
            lambda: subprocess.Popen(
                [
                    deno,
                    "run",
                    "--unstable-detect-cjs",
                    "--allow-read",
                    "--allow-write",
                    "--allow-net",
                    str(RUNNER_JS),
                    str(PREFAB_SRC),
                ],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                env=env,
            ),
        )

        # Wait for the runner to signal readiness, collecting stderr
        assert proc.stderr is not None
        proc_stderr = proc.stderr
        stderr_lines: list[str] = []
        while True:
            line = await loop.run_in_executor(None, proc_stderr.readline)
            if not line and proc.poll() is not None:
                err = "\n".join(stderr_lines)
                raise RuntimeError(f"Pyodide sandbox failed to start:\n{err[-1000:]}")
            decoded = line.decode().rstrip()
            stderr_lines.append(decoded)
            if "pyodide:ready" in decoded:
                break

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
                Must assign a `PrefabApp` or `Component` to a variable.
            data: Values injected as variables in the sandbox namespace.

        Returns:
            Prefab wire protocol dict (`$prefab`, `view`, `state`, etc.)

        Raises:
            RuntimeError: If the code fails or the sandbox is unavailable.
        """
        async with self._lock:
            # Lazy start / auto-restart
            if self._process is None or self._process.poll() is not None:
                await self._start()

            proc = self._process
            if proc is None or proc.stdin is None or proc.stdout is None:
                raise RuntimeError("Sandbox failed to start")

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
