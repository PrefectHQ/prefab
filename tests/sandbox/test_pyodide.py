from __future__ import annotations

import subprocess
from unittest.mock import MagicMock

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
