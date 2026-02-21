"""Prefab CLI using cyclopts."""

from __future__ import annotations

import contextlib
import errno
import functools
import importlib.util
import os
import shutil
import socket
import subprocess
import sys
import threading
import webbrowser
from http.server import (
    BaseHTTPRequestHandler,
    SimpleHTTPRequestHandler,
    ThreadingHTTPServer,
)
from pathlib import Path
from typing import Annotated

import cyclopts
from cyclopts import Parameter
from rich.console import Console

import prefab_ui
from prefab_ui.app import PrefabApp

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


def _load_prefab_app(target: str) -> PrefabApp:
    """Load a PrefabApp from a ``file.py:attribute`` target string.

    If no attribute is given, scans the module for the first PrefabApp
    instance.
    """
    path_str, _, attr_name = target.partition(":")
    file_path = Path(path_str).resolve()

    if not file_path.is_file():
        console.print(f"[bold red]Error:[/bold red] File not found: {path_str}")
        raise SystemExit(1)

    # Add file's parent to sys.path so its imports work.
    parent = str(file_path.parent)
    if parent not in sys.path:
        sys.path.insert(0, parent)

    spec = importlib.util.spec_from_file_location(file_path.stem, file_path)
    if spec is None or spec.loader is None:
        console.print(f"[bold red]Error:[/bold red] Cannot load module from {path_str}")
        raise SystemExit(1)

    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)

    if attr_name:
        obj = getattr(module, attr_name, None)
        if obj is None:
            console.print(
                f"[bold red]Error:[/bold red] Attribute [cyan]{attr_name}[/cyan] "
                f"not found in {path_str}"
            )
            raise SystemExit(1)
        if not isinstance(obj, PrefabApp):
            console.print(
                f"[bold red]Error:[/bold red] [cyan]{attr_name}[/cyan] is not a PrefabApp"
            )
            raise SystemExit(1)
        return obj

    # Auto-discover: find the first PrefabApp in the module.
    for name in dir(module):
        obj = getattr(module, name)
        if isinstance(obj, PrefabApp):
            return obj

    console.print(f"[bold red]Error:[/bold red] No PrefabApp found in {path_str}")
    raise SystemExit(1)


def _make_html_handler(html_ref: list[str]) -> type:
    """Create an HTTP request handler that serves HTML from a mutable ref.

    ``html_ref`` is a single-element list so the reload watcher can swap
    the content between requests.
    """

    class Handler(BaseHTTPRequestHandler):
        def do_GET(self) -> None:
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(html_ref[0].encode("utf-8"))

        def log_message(self, format: str, *args: object) -> None:
            pass

    return Handler


def _watch_and_reload(
    target: str,
    html_ref: list[str],
    stop: threading.Event,
) -> None:
    """Poll the target file for changes and regenerate HTML on save."""
    path_str, _, _ = target.partition(":")
    file_path = Path(path_str).resolve()
    watch_dir = file_path.parent
    prev_mtimes: dict[Path, float] = {}

    for f in watch_dir.rglob("*.py"):
        if f.is_file():
            prev_mtimes[f] = f.stat().st_mtime

    while not stop.wait(timeout=1.0):
        curr_mtimes: dict[Path, float] = {}
        for f in watch_dir.rglob("*.py"):
            if f.is_file():
                curr_mtimes[f] = f.stat().st_mtime

        changed = [
            p
            for p in curr_mtimes
            if p not in prev_mtimes or curr_mtimes[p] != prev_mtimes[p]
        ]
        if not changed and not (prev_mtimes.keys() - curr_mtimes.keys()):
            continue

        prev_mtimes = curr_mtimes
        names = [str(p.relative_to(watch_dir)) for p in changed]
        console.print(
            f"[bold cyan]↻[/bold cyan] Change detected: "
            f"[dim]{', '.join(names[:5])}[/dim]"
        )
        try:
            prefab_app = _load_prefab_app(target)
            html_ref[0] = prefab_app.html()
            console.print("[bold green]✓[/bold green] Reloaded — refresh your browser")
        except Exception as exc:
            console.print(f"[bold red]✗[/bold red] Reload failed: {exc}")


@app.command
def serve(
    target: Annotated[
        str,
        cyclopts.Parameter(
            help="Path to a Python file, optionally with :attribute (e.g. app.py:my_app)",
        ),
    ],
    *,
    port: Annotated[
        int,
        cyclopts.Parameter(name="--port", alias="-p", help="Port for the server"),
    ] = 5175,
    reload: Annotated[
        bool,
        cyclopts.Parameter(
            "--reload",
            negative="--no-reload",
            help="Watch for file changes and regenerate on save",
        ),
    ] = False,
) -> None:
    """Preview a PrefabApp in your browser.

    Loads a PrefabApp from a Python file, renders it to a self-contained
    HTML page, and serves it locally. If no attribute name is given, the
    first PrefabApp found in the module is used.

    Example:
        prefab serve app.py
        prefab serve app.py:dashboard --reload
        prefab serve app.py --port 8000
    """
    prefab_app = _load_prefab_app(target)
    html_ref = [prefab_app.html()]

    actual_port = _find_free_port(port)
    if actual_port != port:
        console.print(f"[yellow]Port {port} in use, using {actual_port}[/yellow]")

    handler = _make_html_handler(html_ref)

    try:
        server = ThreadingHTTPServer(("127.0.0.1", actual_port), handler)
    except OSError as exc:
        if exc.errno == errno.EADDRINUSE:
            console.print(
                f"[bold red]Error:[/bold red] Port {actual_port} is already in use."
            )
            raise SystemExit(1) from None
        raise

    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()

    stop_event = threading.Event()
    if reload:
        watcher = threading.Thread(
            target=_watch_and_reload,
            args=(target, html_ref, stop_event),
            daemon=True,
        )
        watcher.start()

    url = f"http://127.0.0.1:{actual_port}"
    console.print(
        f"[bold green]✓[/bold green] Serving at [cyan]{url}[/cyan]"
        + (" [dim](reload enabled)[/dim]" if reload else "")
    )
    console.print("  Press [bold]Ctrl+C[/bold] to stop\n")

    webbrowser.open(url)

    try:
        threading.Event().wait()
    except KeyboardInterrupt:
        console.print("\n[yellow]Server stopped[/yellow]")
        stop_event.set()
        server.shutdown()


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
    playground_html = repo_root / "docs" / "playground.js"
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
        (repo_root / "docs" / "playground.js").write_text(js_content, encoding="utf-8")

    console.print("[bold green]✓[/bold green] All doc assets rebuilt")


def _collect_source_mtimes(repo_root: Path) -> dict[Path, float]:
    """Snapshot mtimes of files that should trigger a doc rebuild."""
    mtimes: dict[Path, float] = {}

    watch_patterns: list[tuple[Path, str]] = [
        (repo_root / "docs", "**/*.mdx"),
        (repo_root / "src" / "prefab_ui", "**/*.py"),
        (repo_root / "renderer" / "src", "**/*.ts"),
        (repo_root / "renderer" / "src", "**/*.tsx"),
        (repo_root / "docs" / "_preview-build", "*.py"),
        (repo_root / "docs" / "_preview-build", "*.css"),
    ]

    # Exclude generated outputs so they don't re-trigger builds.
    exclude = {
        repo_root / "docs" / "renderer.js",
        repo_root / "docs" / "playground.js",
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


def _watch_and_rebuild(repo_root: Path, stop: threading.Event) -> None:
    """Poll for source changes and re-run build_docs when detected.

    After detecting a change, waits a short settle period so bursts of
    rapid saves (e.g. from automated tools) collapse into a single rebuild.
    """
    settle_seconds = 2.0
    prev = _collect_source_mtimes(repo_root)

    while not stop.wait(timeout=1.5):
        curr = _collect_source_mtimes(repo_root)
        changed = [p for p in curr if p not in prev or curr[p] != prev[p]]
        if not changed:
            deleted = prev.keys() - curr.keys()
            if not deleted:
                continue

        # Settle: keep polling until files stop changing.
        while not stop.wait(timeout=settle_seconds):
            settled = _collect_source_mtimes(repo_root)
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
            build_docs()
        except SystemExit:
            console.print("[yellow]Rebuild failed, waiting for next change…[/yellow]")
        prev = _collect_source_mtimes(repo_root)


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
    """Serve documentation locally with component previews.

    Rebuilds all doc assets, starts the Mintlify dev server, and watches
    for source changes to automatically rebuild. Use ``--no-rebuild`` to
    skip both the initial build and the file watcher.

    Example:
        prefab dev docs
        prefab dev docs --docs-port 3001
        prefab dev docs --no-rebuild
    """
    repo_root = _find_repo_root()
    docs_dir = repo_root / "docs"

    if not shutil.which("npx"):
        console.print(
            "[bold red]Error:[/bold red] [cyan]npx[/cyan] not found. "
            "Install Node.js to use this command."
        )
        raise SystemExit(1)

    if rebuild:
        build_docs()

    actual_docs_port = _find_free_port(docs_port)
    if actual_docs_port != docs_port:
        console.print(
            f"[yellow]Docs port {docs_port} in use, using {actual_docs_port}[/yellow]"
        )

    stop_event = threading.Event()
    if rebuild:
        watcher = threading.Thread(
            target=_watch_and_rebuild,
            args=(repo_root, stop_event),
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


class _SilentHandler(SimpleHTTPRequestHandler):
    """SimpleHTTPRequestHandler that suppresses access logs."""

    def log_message(self, format: str, *args: object) -> None:
        pass
