from __future__ import annotations

import asyncio
import io
import json
import subprocess
from unittest.mock import MagicMock

import pytest

from prefab_ui.sandbox._pyodide import PyodideSandbox


@pytest.mark.parametrize("stage", ["launch", "readiness"])
@pytest.mark.parametrize("context_manager", [False, True])
async def test_cancelled_startup_discards_process(
    monkeypatch: pytest.MonkeyPatch,
    stage: str,
    context_manager: bool,
) -> None:
    process = MagicMock(spec=subprocess.Popen)
    process.stdin = MagicMock()
    process.stdout = MagicMock()
    process.stderr = MagicMock()
    process.poll.return_value = None
    process.stderr.readline.return_value = b"pyodide:ready\n"
    sandbox = PyodideSandbox()
    started = asyncio.Event()
    actual_loop = asyncio.get_running_loop()
    loop = MagicMock()
    calls = 0
    delayed = actual_loop.create_future()

    def execute(executor: object, callback: object) -> asyncio.Future:
        nonlocal calls
        calls += 1
        if (stage == "launch" and calls == 1) or calls == 2:
            started.set()
            return delayed
        result = actual_loop.create_future()
        result.set_result(process)
        return result

    loop.run_in_executor.side_effect = execute
    monkeypatch.setattr("prefab_ui.sandbox._pyodide.shutil.which", lambda _: "deno")
    monkeypatch.setattr(
        "prefab_ui.sandbox._pyodide.asyncio.get_event_loop", lambda: loop
    )
    task = asyncio.create_task(
        sandbox.__aenter__() if context_manager else sandbox.run("irrelevant")
    )
    await started.wait()
    task.cancel()

    with pytest.raises(asyncio.CancelledError):
        await task

    if stage == "launch":
        delayed.set_result(process)
        await asyncio.sleep(0)

    process.terminate.assert_called_once_with()
    process.communicate.assert_called_once_with(timeout=5)
    for stream in (process.stdin, process.stdout, process.stderr):
        stream.close.assert_called_once_with()
    assert sandbox._process is None

    replacement = MagicMock(spec=subprocess.Popen)
    replacement.stdin = io.BytesIO()
    replacement.stdout = MagicMock()
    replacement.stderr = MagicMock()
    replacement.stderr.readline.return_value = b"pyodide:ready\n"
    replacement.poll.return_value = None

    def respond() -> bytes:
        request = json.loads(replacement.stdin.getvalue().splitlines()[-1])
        return json.dumps({"id": request["id"], "result": {"view": {}}}).encode()

    replacement.stdout.readline.side_effect = respond
    monkeypatch.setattr(
        "prefab_ui.sandbox._pyodide.asyncio.get_event_loop", lambda: actual_loop
    )
    monkeypatch.setattr(
        "prefab_ui.sandbox._pyodide.subprocess.Popen",
        lambda *args, **kwargs: replacement,
    )
    try:
        assert await sandbox.run("ordinary code") == {"view": {}}
        assert sandbox._process is replacement
    finally:
        sandbox._stop()


async def test_startup_failure_closes_process_streams(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    process = MagicMock(spec=subprocess.Popen)
    process.stdin = MagicMock()
    process.stdout = MagicMock()
    process.stderr = MagicMock()
    process.stderr.readline.side_effect = [b"startup failed\n", b""]
    process.poll.return_value = 1
    monkeypatch.setattr("prefab_ui.sandbox._pyodide.shutil.which", lambda _: "deno")
    monkeypatch.setattr(
        "prefab_ui.sandbox._pyodide.subprocess.Popen", lambda *args, **kwargs: process
    )
    sandbox = PyodideSandbox()

    with pytest.raises(RuntimeError, match="startup failed"):
        await sandbox.run("irrelevant")

    for stream in (process.stdin, process.stdout, process.stderr):
        stream.close.assert_called_once_with()
    assert sandbox._process is None
