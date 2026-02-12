"""Prefab CLI using cyclopts."""

from __future__ import annotations

import errno
import functools
import os
import shutil
import socket
import subprocess
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


def _should_install_node_deps(renderer_dir: Path) -> bool:
    """Check whether ``npm install`` needs to run for the renderer."""
    node_modules = renderer_dir / "node_modules"
    if not node_modules.exists():
        return True
    lock_file = renderer_dir / "package-lock.json"
    if lock_file.exists():
        return lock_file.stat().st_mtime > node_modules.stat().st_mtime
    return False


def _should_rebuild_renderer(repo_root: Path) -> bool:
    """Check whether the renderer bundle needs rebuilding."""
    renderer_js = repo_root / "docs" / "renderer.js"
    if not renderer_js.exists():
        return True
    renderer_mtime = renderer_js.stat().st_mtime
    renderer_src = repo_root / "renderer" / "src"
    playground_dir = renderer_src / "playground"
    return any(
        f.stat().st_mtime > renderer_mtime
        for f in renderer_src.rglob("*")
        if f.is_file() and not f.is_relative_to(playground_dir)
    )


def _should_rebuild_playground(repo_root: Path) -> bool:
    """Check whether the playground HTML needs rebuilding."""
    playground_html = repo_root / "docs" / "playground-app.js"
    if not playground_html.exists():
        return True
    output_mtime = playground_html.stat().st_mtime
    playground_src = repo_root / "renderer" / "src" / "playground"
    return any(
        f.stat().st_mtime > output_mtime
        for f in playground_src.rglob("*")
        if f.is_file()
    )


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

    renderer_dir = repo_root / "renderer"
    if not shutil.which("npm"):
        console.print(
            "[bold red]Error:[/bold red] [cyan]npm[/cyan] not found. "
            "Install Node.js to use this command."
        )
        raise SystemExit(1)

    steps: list[tuple[str, list[str], dict[str, str] | None]] = []

    if _should_install_node_deps(renderer_dir):
        steps.append(
            (
                "Installing renderer dependencies",
                ["npm", "install", "--prefix", str(renderer_dir)],
                None,
            )
        )

    if _should_rebuild_renderer(repo_root):
        steps.append(
            (
                "Building renderer",
                ["npm", "run", "--prefix", str(renderer_dir), "build:renderer"],
                None,
            )
        )
        copy_renderer = True
    else:
        console.print("  [dim]→[/dim] Renderer up to date, skipping")
        copy_renderer = False

    rebuild_playground = _should_rebuild_playground(repo_root)

    steps += [
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
    ]

    if rebuild_playground:
        steps.append(
            (
                "Building playground",
                ["npm", "run", "--prefix", str(renderer_dir), "build:playground"],
                None,
            )
        )
    else:
        console.print("  [dim]→[/dim] Playground up to date, skipping")

    steps.append(
        (
            "Generating protocol reference",
            ["uv", "run", str(build_dir / "generate_protocol_pages.py")],
            None,
        ),
    )

    for description, cmd, env in steps:
        console.print(f"  [dim]→[/dim] {description}...")
        result = subprocess.run(cmd, cwd=repo_root, env=env)
        if result.returncode != 0:
            console.print(
                f"[bold red]Error:[/bold red] {description} failed (exit {result.returncode})"
            )
            raise SystemExit(result.returncode)

    if copy_renderer:
        shutil.copy2(
            renderer_dir / "dist" / "renderer.js",
            repo_root / "docs" / "renderer.js",
        )

    if rebuild_playground:
        import json as _json

        html = (renderer_dir / "dist" / "playground.html").read_text()
        js_content = "window.__PLAYGROUND_HTML=" + _json.dumps(html) + ";\n"
        (repo_root / "docs" / "playground-app.js").write_text(
            js_content, encoding="utf-8"
        )

    console.print("[bold green]✓[/bold green] All doc assets rebuilt")


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
    skip_build: Annotated[
        bool,
        cyclopts.Parameter(
            name="--skip-build",
            help="Skip rebuilding doc assets before serving",
        ),
    ] = False,
) -> None:
    """Serve documentation locally with component previews.

    Rebuilds all doc assets (embed module, previews, CSS, protocol ref)
    then starts the Mintlify dev server.

    Example:
        prefab dev docs
        prefab dev docs --docs-port 3001
        prefab dev docs --skip-build
    """
    repo_root = _find_repo_root()
    docs_dir = repo_root / "docs"

    if not shutil.which("npx"):
        console.print(
            "[bold red]Error:[/bold red] [cyan]npx[/cyan] not found. "
            "Install Node.js to use this command."
        )
        raise SystemExit(1)

    if not skip_build:
        build_docs()

    actual_docs_port = _find_free_port(docs_port)
    if actual_docs_port != docs_port:
        console.print(
            f"[yellow]Docs port {docs_port} in use, using {actual_docs_port}[/yellow]"
        )

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
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()


class _SilentHandler(SimpleHTTPRequestHandler):
    """SimpleHTTPRequestHandler that suppresses access logs."""

    def log_message(self, format: str, *args: object) -> None:
        pass
