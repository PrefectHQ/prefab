"""Prefab CLI using cyclopts."""

from __future__ import annotations

import errno
import functools
import os
import shutil
import socket
import subprocess
import threading
import time
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


def _find_repo_root() -> Path:
    """Locate the repo root relative to this file."""
    return Path(__file__).parent.parent.parent.parent


def _find_dist_dir() -> Path:
    """Locate the renderer dist directory relative to the repo root."""
    return _find_repo_root() / "renderer" / "dist"


def _find_free_port(start: int) -> int:
    """Return the first available port starting from *start*."""
    port = start
    while True:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(("127.0.0.1", port))
                return port
            except OSError as exc:
                if exc.errno in (errno.EADDRINUSE, errno.EACCES):
                    port += 1
                else:
                    raise


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


dev_app = cyclopts.App(
    name="dev",
    help="Internal development tools (not user-facing).",
)
app.command(dev_app)


@dev_app.command(name="build-docs")
def build_docs() -> None:
    """Regenerate all doc assets: previews, CSS, playground, and protocol ref.

    Runs the full build pipeline so Mintlify docs are up to date.

    Example:
        prefab dev build-docs
    """
    repo_root = _find_repo_root()
    build_dir = repo_root / "docs" / "_preview-build"

    if not shutil.which("npx"):
        console.print(
            "[bold red]Error:[/bold red] [cyan]npx[/cyan] not found. "
            "Install Node.js to use this command."
        )
        raise SystemExit(1)

    tailwind_env = {
        **os.environ,
        "NODE_PATH": str(repo_root / "renderer" / "node_modules"),
    }

    steps: list[tuple[str, list[str], dict[str, str] | None]] = [
        (
            "Rendering component previews",
            ["uv", "run", str(build_dir / "render_previews.py")],
            None,
        ),
        (
            "Generating Tailwind content",
            ["uv", "run", str(build_dir / "generate_content.py")],
            None,
        ),
        (
            "Building Tailwind CSS",
            [
                "npx",
                "--yes",
                "@tailwindcss/cli@4",
                "-i",
                str(build_dir / "input.css"),
                "-o",
                "/tmp/prefab-preview-raw.css",
                "--minify",
            ],
            tailwind_env,
        ),
        ("Scoping CSS", ["uv", "run", str(build_dir / "scope_css.py")], None),
        (
            "Bundling playground source",
            ["uv", "run", str(build_dir / "generate_playground_bundle.py")],
            None,
        ),
        (
            "Extracting playground examples",
            ["uv", "run", str(build_dir / "extract_examples.py")],
            None,
        ),
        (
            "Generating protocol reference",
            ["uv", "run", str(build_dir / "generate_protocol_pages.py")],
            None,
        ),
    ]

    for description, cmd, env in steps:
        console.print(f"  [dim]→[/dim] {description}...")
        result = subprocess.run(cmd, cwd=repo_root, env=env)
        if result.returncode != 0:
            console.print(
                f"[bold red]Error:[/bold red] {description} failed (exit {result.returncode})"
            )
            raise SystemExit(result.returncode)

    console.print("[bold green]✓[/bold green] All doc assets rebuilt")


@dev_app.command
def docs(
    *,
    renderer_port: Annotated[
        int,
        cyclopts.Parameter(
            name="--renderer-port",
            help="Port for the renderer dev server",
        ),
    ] = 3333,
    docs_port: Annotated[
        int,
        cyclopts.Parameter(
            name="--docs-port",
            help="Port for the Mintlify docs server",
        ),
    ] = 3000,
) -> None:
    """Serve documentation locally with live component previews.

    Starts the Vite renderer dev server and the Mintlify docs server.
    Automatically finds free ports if the requested ones are in use.

    Example:
        prefab dev docs
        prefab dev docs --renderer-port 4000 --docs-port 3001
    """
    repo_root = _find_repo_root()
    renderer_dir = repo_root / "renderer"
    docs_dir = repo_root / "docs"

    if not (renderer_dir / "package.json").is_file():
        console.print(
            "[bold red]Error:[/bold red] renderer/ directory not found.\n"
            "  Run this command from the repo root."
        )
        raise SystemExit(1)

    for cmd in ("npm", "npx"):
        if not shutil.which(cmd):
            console.print(
                f"[bold red]Error:[/bold red] [cyan]{cmd}[/cyan] not found. "
                "Install Node.js to use this command."
            )
            raise SystemExit(1)

    actual_renderer_port = _find_free_port(renderer_port)
    if actual_renderer_port != renderer_port:
        console.print(
            f"[yellow]Renderer port {renderer_port} in use, "
            f"using {actual_renderer_port}[/yellow]"
        )

    actual_docs_port = _find_free_port(docs_port)
    if actual_docs_port != docs_port:
        console.print(
            f"[yellow]Docs port {docs_port} in use, using {actual_docs_port}[/yellow]"
        )

    config_path = docs_dir / "renderer-config.js"
    procs: list[subprocess.Popen[bytes]] = []

    try:
        config_path.write_text(
            f"window.__PREFAB_RENDERER_PORT__ = {actual_renderer_port};\n"
        )

        console.print(
            f"Starting renderer dev server "
            f"([cyan]localhost:{actual_renderer_port}[/cyan])..."
        )
        renderer_env = {
            **os.environ,
            "RENDERER_PORT": str(actual_renderer_port),
        }
        procs.append(
            subprocess.Popen(
                ["npm", "run", "dev"],
                cwd=renderer_dir,
                env=renderer_env,
            )
        )

        time.sleep(2)

        console.print(
            f"Starting Mintlify docs server "
            f"([cyan]localhost:{actual_docs_port}[/cyan])..."
        )
        docs_env = {**os.environ, "PORT": str(actual_docs_port)}
        procs.append(
            subprocess.Popen(
                ["npx", "--yes", "mint@latest", "dev"],
                cwd=docs_dir,
                env=docs_env,
            )
        )

        while all(p.poll() is None for p in procs):
            time.sleep(0.5)

    except KeyboardInterrupt:
        console.print("\n[yellow]Docs servers stopped[/yellow]")
    finally:
        config_path.unlink(missing_ok=True)
        for proc in procs:
            proc.terminate()
        for proc in procs:
            try:
                proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                proc.kill()


class _SilentHandler(SimpleHTTPRequestHandler):
    """SimpleHTTPRequestHandler that suppresses access logs."""

    def log_message(self, format: str, *args: object) -> None:
        pass
