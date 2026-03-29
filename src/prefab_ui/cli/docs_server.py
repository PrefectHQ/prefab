"""Docs server and file watcher for `prefab dev docs`."""

from __future__ import annotations

import contextlib
import os
import shutil
import subprocess
import threading
from collections.abc import Callable
from pathlib import Path
from typing import Annotated

import cyclopts
from rich.console import Console

console = Console()


def collect_source_mtimes(repo_root: Path) -> dict[Path, float]:
    """Snapshot mtimes of files that should trigger a doc rebuild."""
    mtimes: dict[Path, float] = {}

    watch_patterns: list[tuple[Path, str]] = [
        (repo_root / "docs", "**/*.mdx"),
        (repo_root / "src" / "prefab_ui", "**/*.py"),
        (repo_root / "renderer" / "src", "**/*.ts"),
        (repo_root / "renderer" / "src", "**/*.tsx"),
        (repo_root / "tools", "*.py"),
        (repo_root / "tools", "*.css"),
    ]

    exclude = {
        repo_root / "docs" / "renderer.js",
        repo_root / "docs" / "playground.html",
        repo_root / "docs" / "preview-styles.css",
    }

    for base, pattern in watch_patterns:
        if not base.exists():
            continue
        for f in base.rglob(pattern):
            if f.is_file() and f not in exclude:
                with contextlib.suppress(OSError):
                    mtimes[f] = f.stat().st_mtime
    return mtimes


def watch_and_rebuild(
    repo_root: Path,
    stop: threading.Event,
    build_fn: Callable[[], None],
) -> None:
    """Poll for source changes and re-run build when detected."""
    settle_seconds = 2.0
    prev = collect_source_mtimes(repo_root)

    while not stop.wait(timeout=1.5):
        curr = collect_source_mtimes(repo_root)
        changed = [p for p in curr if p not in prev or curr[p] != prev[p]]
        if not changed:
            deleted = prev.keys() - curr.keys()
            if not deleted:
                continue

        while not stop.wait(timeout=settle_seconds):
            settled = collect_source_mtimes(repo_root)
            if settled == curr:
                break
            curr = settled

        names = [
            str(p.relative_to(repo_root))
            for p in (changed or list(prev.keys() - curr.keys()))
        ]
        console.print(
            f"\n[bold cyan]↻[/bold cyan] Change detected in {len(names)} file(s): "
            f"[dim]{', '.join(names[:5])}{'…' if len(names) > 5 else ''}[/dim]"
        )
        try:
            build_fn()
        except SystemExit:
            console.print("[yellow]Rebuild failed, waiting for next change…[/yellow]")
        prev = collect_source_mtimes(repo_root)


def register_docs_command(
    dev_app: cyclopts.App,
    find_repo_root: Callable[[], Path],
    find_free_port: Callable[[int], int],
    build_docs_fn: Callable[[], None],
) -> None:
    """Register the `prefab dev docs` command on the dev sub-app."""

    @dev_app.command
    def docs(
        *,
        docs_port: Annotated[
            int,
            cyclopts.Parameter(
                name="--docs-port",
                help="Port for the Mintlify docs server",
            ),
        ] = 3000,
        rebuild: Annotated[
            bool,
            cyclopts.Parameter(
                negative="--no-rebuild",
                help="Build doc assets on startup and watch for changes (default: on)",
            ),
        ] = True,
    ) -> None:
        """Serve documentation locally with component previews."""
        repo_root = find_repo_root()
        docs_dir = repo_root / "docs"

        if not shutil.which("npx"):
            console.print(
                "[bold red]Error:[/bold red] [cyan]npx[/cyan] not found. "
                "Install Node.js to use this command."
            )
            raise SystemExit(1)

        if rebuild:
            build_docs_fn()

        actual_docs_port = find_free_port(docs_port)
        if actual_docs_port != docs_port:
            console.print(
                f"[yellow]Docs port {docs_port} in use, using {actual_docs_port}[/yellow]"
            )

        stop_event = threading.Event()
        if rebuild:
            watcher = threading.Thread(
                target=watch_and_rebuild,
                args=(repo_root, stop_event, build_docs_fn),
                daemon=True,
            )
            watcher.start()
            console.print("[dim]Watching for source changes (Ctrl+C to stop)…[/dim]")

        console.print(
            f"Starting Mintlify docs server ([cyan]localhost:{actual_docs_port}[/cyan])..."
        )
        docs_env = {**os.environ, "PORT": str(actual_docs_port)}
        proc = subprocess.Popen(
            ["npx", "--yes", "mint@latest", "dev"],
            cwd=docs_dir,
            env=docs_env,
        )

        try:
            proc.wait()
        except KeyboardInterrupt:
            console.print("\n[yellow]Docs server stopped[/yellow]")
            stop_event.set()
            proc.terminate()
            try:
                proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                proc.kill()
