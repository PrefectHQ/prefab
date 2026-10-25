"""Tests for the internal documentation build commands."""

from pathlib import Path
from subprocess import CompletedProcess
from unittest.mock import Mock

import pytest

from prefab_ui.cli import cli


@pytest.mark.parametrize("install", [True, False])
def test_docs_uses_locked_local_build_tools(tmp_path: Path, monkeypatch, install: bool):
    monkeypatch.setattr(cli, "_find_repo_root", lambda: tmp_path)
    monkeypatch.setattr(cli.shutil, "which", lambda _: "/usr/bin/npm")
    monkeypatch.setattr(cli, "should_install_node_deps", lambda _: install)
    monkeypatch.setattr(cli, "should_rebuild_renderer", lambda _: False)
    monkeypatch.setattr(cli, "should_rebuild_playground", lambda _: False)
    run = Mock(return_value=CompletedProcess([], 0))
    monkeypatch.setattr(cli.subprocess, "run", run)

    cli.build_docs()

    commands = [call.args[0] for call in run.call_args_list]
    installs = [command for command in commands if command[:2] == ["npm", "ci"]]
    assert installs == (
        [
            ["npm", "ci", "--prefix", str(tmp_path / "renderer")],
            ["npm", "ci", "--prefix", str(tmp_path / "tools")],
        ]
        if install
        else []
    )
    tailwind = next(command for command in commands if "tailwindcss" in command)
    assert tailwind == [
        "npm",
        "exec",
        "--prefix",
        str(tmp_path / "tools"),
        "--no",
        "--",
        "tailwindcss",
        "-i",
        str(tmp_path / "tools" / "input.css"),
        "-o",
        "/tmp/prefab-preview-raw.css",
    ]
    assert not any("npx" in command or "install" in command for command in commands)


def test_docs_stops_if_locked_tools_install_fails(tmp_path: Path, monkeypatch):
    monkeypatch.setattr(cli, "_find_repo_root", lambda: tmp_path)
    monkeypatch.setattr(cli.shutil, "which", lambda _: "/usr/bin/npm")
    monkeypatch.setattr(
        cli, "should_install_node_deps", lambda path: path.name == "tools"
    )
    monkeypatch.setattr(cli, "should_rebuild_renderer", lambda _: False)
    monkeypatch.setattr(cli, "should_rebuild_playground", lambda _: False)
    run = Mock(return_value=CompletedProcess([], 1))
    monkeypatch.setattr(cli.subprocess, "run", run)

    with pytest.raises(SystemExit) as exc:
        cli.build_docs()

    assert exc.value.code == 1
    run.assert_called_once_with(
        ["npm", "ci", "--prefix", str(tmp_path / "tools")], cwd=tmp_path, env=None
    )
