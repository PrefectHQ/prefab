from __future__ import annotations

import asyncio
import io
import json
import shutil
import subprocess
from unittest.mock import MagicMock

import pytest

from prefab_ui.sandbox._pyodide import PyodideSandbox


def test_stop_terminates_and_communicates_with_process() -> None:
    process = MagicMock(spec=subprocess.Popen)
    process.stdin = MagicMock()
    process.stdout = MagicMock()
    process.stderr = MagicMock()
    process.poll.return_value = None
    sandbox = PyodideSandbox()
    sandbox._process = process

    sandbox._stop()

    assert sandbox._process is None
    process.terminate.assert_called_once_with()
    process.communicate.assert_called_once_with(timeout=5)
    process.stdin.close.assert_called_once_with()
    process.stdout.close.assert_called_once_with()
    process.stderr.close.assert_called_once_with()


def test_stop_kills_process_when_graceful_shutdown_times_out() -> None:
    process = MagicMock(spec=subprocess.Popen)
    process.stdin = MagicMock()
    process.stdout = MagicMock()
    process.stderr = MagicMock()
    process.poll.return_value = None
    process.communicate.side_effect = [subprocess.TimeoutExpired("deno", 5), (b"", b"")]
    sandbox = PyodideSandbox()
    sandbox._process = process

    sandbox._stop()

    process.kill.assert_called_once_with()
    assert process.communicate.call_count == 2
    process.stdin.close.assert_called_once_with()
    process.stdout.close.assert_called_once_with()
    process.stderr.close.assert_called_once_with()


@pytest.mark.timeout(120)
@pytest.mark.skipif(shutil.which("deno") is None, reason="Deno not installed")
@pytest.mark.parametrize(
    "output",
    [
        'print("debug")',
        "print({'result': {'view': {'content': 'printed'}}})",
        'print("x" * 100_000)',
        'import sys; print("x" * 100_000, file=sys.stderr)',
    ],
)
async def test_print_does_not_desynchronize_results(output: str) -> None:
    async with PyodideSandbox() as sandbox:
        for name in ("A", "B", "C"):
            code = (
                "from prefab_ui.components import Text\n"
                + (f"{output}\n" if name == "A" else "")
                + f"view = Text({name!r})"
            )
            result = await sandbox.run(code)
            assert result["view"]["content"] == name


@pytest.mark.parametrize("response", [b"debug\n", b"[]\n", b"{}\n", b'{"result": 1}\n'])
async def test_malformed_response_discards_process(response: bytes) -> None:
    process = MagicMock(spec=subprocess.Popen)
    process.stdin = MagicMock()
    process.stdout = MagicMock()
    process.stderr = MagicMock()
    process.stdout.readline.return_value = response
    process.poll.return_value = None
    sandbox = PyodideSandbox()
    sandbox._process = process

    with pytest.raises(RuntimeError, match="Invalid sandbox response"):
        await sandbox.run("irrelevant")

    assert sandbox._process is None
    process.terminate.assert_called_once_with()


@pytest.mark.parametrize("error", [BrokenPipeError(), asyncio.CancelledError()])
async def test_interrupted_response_discards_process(error: BaseException) -> None:
    process = MagicMock(spec=subprocess.Popen)
    process.stdin = MagicMock()
    process.stdout = MagicMock()
    process.stderr = MagicMock()
    process.stdout.readline.side_effect = error
    process.poll.return_value = None
    sandbox = PyodideSandbox()
    sandbox._process = process

    with pytest.raises(type(error)):
        await sandbox.run("irrelevant")

    assert sandbox._process is None
    process.terminate.assert_called_once_with()


async def test_closed_response_channel_discards_process() -> None:
    process = MagicMock(spec=subprocess.Popen)
    process.stdin = MagicMock()
    process.stdout = MagicMock()
    process.stderr = MagicMock()
    process.stdout.readline.return_value = b""
    process.poll.return_value = None
    sandbox = PyodideSandbox()
    sandbox._process = process

    with pytest.raises(RuntimeError, match="Sandbox process died unexpectedly"):
        await sandbox.run("irrelevant")

    assert sandbox._process is None


@pytest.mark.parametrize("response_id", [None, "unrelated-request"])
async def test_uncorrelated_response_discards_process(response_id: str | None) -> None:
    process = MagicMock(spec=subprocess.Popen)
    process.stdin = io.BytesIO()
    process.stdout = MagicMock()
    process.stderr = MagicMock()
    process.poll.return_value = None
    response: dict[str, object] = {"result": {"view": {"content": "old"}}}
    if response_id is not None:
        response["id"] = response_id
    process.stdout.readline.return_value = json.dumps(response).encode() + b"\n"
    sandbox = PyodideSandbox()
    sandbox._process = process

    with pytest.raises(RuntimeError, match="Invalid sandbox response"):
        await sandbox.run("irrelevant")

    assert sandbox._process is None
    process.terminate.assert_called_once_with()


async def test_stale_response_discards_process() -> None:
    process = MagicMock(spec=subprocess.Popen)
    process.stdin = io.BytesIO()
    process.stdout = MagicMock()
    process.stderr = MagicMock()
    process.poll.return_value = None
    first_id = None

    def respond() -> bytes:
        nonlocal first_id
        request = json.loads(process.stdin.getvalue().splitlines()[-1])
        if first_id is None:
            first_id = request.get("id")
        return json.dumps({"id": first_id, "result": {"view": {}}}).encode() + b"\n"

    process.stdout.readline.side_effect = respond
    sandbox = PyodideSandbox()
    sandbox._process = process
    await sandbox.run("first")

    with pytest.raises(RuntimeError, match="Invalid sandbox response"):
        await sandbox.run("second")

    assert sandbox._process is None


async def test_correlated_error_keeps_process_available() -> None:
    process = MagicMock(spec=subprocess.Popen)
    process.stdin = io.BytesIO()
    process.stdout = MagicMock()
    process.stderr = MagicMock()
    process.poll.return_value = None

    def respond() -> bytes:
        request = json.loads(process.stdin.getvalue().splitlines()[-1])
        return (
            json.dumps({"id": request.get("id"), "error": "bad code"}).encode() + b"\n"
        )

    process.stdout.readline.side_effect = respond
    sandbox = PyodideSandbox()
    sandbox._process = process

    with pytest.raises(RuntimeError, match="bad code"):
        await sandbox.run("first")

    assert sandbox._process is process
