"""Prefab CLI using cyclopts."""

from __future__ import annotations

import functools
import threading
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Annotated

import cyclopts
from cyclopts import Parameter
from rich.console import Console

import prefab_ui

console = Console()

app = cyclopts.App(
    name="prefab",
    help="Prefab — the agentic frontend framework.",
    version=prefab_ui.__version__,
    default_parameter=Parameter(negative=()),
)


def _find_dist_dir() -> Path:
    """Locate the renderer dist directory relative to the repo root."""
    repo_root = Path(__file__).parent.parent.parent.parent
    return repo_root / "renderer" / "dist"


@app.command
def version() -> None:
    """Display the current Prefab version."""
    console.print(f"prefab-ui [cyan]{prefab_ui.__version__}[/cyan]")


@app.command
def playground(
    *,
    port: Annotated[
        int,
        cyclopts.Parameter(
            name="--port", alias="-p", help="Port for the playground server"
        ),
    ] = 5174,
) -> None:
    """Launch the interactive playground in your browser.

    Serves the built playground assets and opens a split-pane editor
    with live preview. Requires the renderer to be built first:

        cd renderer && npm run build

    Example:
        prefab playground
        prefab playground --port 8080
    """
    dist_dir = _find_dist_dir()
    playground_path = dist_dir / "playground.html"

    if not playground_path.is_file():
        console.print(
            "[bold red]Error:[/bold red] Playground not built.\n"
            "  Run: [cyan]cd renderer && npm run build[/cyan]"
        )
        raise SystemExit(1)

    handler = functools.partial(
        _SilentHandler,
        directory=str(dist_dir),
    )

    try:
        server = ThreadingHTTPServer(("127.0.0.1", port), handler)
    except OSError as exc:
        if exc.errno == 48:
            console.print(
                f"[bold red]Error:[/bold red] Port {port} is already in use. "
                f"Try [cyan]prefab playground --port {port + 1}[/cyan]"
            )
            raise SystemExit(1) from None
        raise

    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()

    url = f"http://127.0.0.1:{port}/playground.html"
    console.print(
        f"[bold green]✓[/bold green] Playground running at [cyan]{url}[/cyan]"
    )
    console.print("  Press [bold]Ctrl+C[/bold] to stop\n")

    webbrowser.open(url)

    try:
        threading.Event().wait()
    except KeyboardInterrupt:
        console.print("\n[yellow]Playground stopped[/yellow]")
        server.shutdown()


class _SilentHandler(SimpleHTTPRequestHandler):
    """SimpleHTTPRequestHandler that suppresses access logs."""

    def log_message(self, format: str, *args: object) -> None:
        pass
