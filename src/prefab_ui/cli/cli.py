"""Prefab CLI using cyclopts."""

from __future__ import annotations

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
from prefab_ui.cli.build_helpers import (
    should_install_node_deps,
    should_rebuild_playground,
    should_rebuild_renderer,
    source_content_hash,
    sync_to_mintlify_cache,
)
from prefab_ui.cli.docs_server import register_docs_command

console = Console()

app = cyclopts.App(
    name="prefab",
    help="Prefab — the generative UI framework.",
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
def version(
    *,
    copy: Annotated[
        bool,
        cyclopts.Parameter("--copy", help="Copy version information to clipboard"),
    ] = False,
) -> None:
    """Display version information and platform details."""
    import platform

    info = {
        "Prefab version": prefab_ui.__version__,
        "Python version": platform.python_version(),
        "Platform": platform.platform(),
    }

    plain_text = "\n".join(f"{k}: {v}" for k, v in info.items())
    console.print(plain_text)

    if copy:
        for cmd in (["pbcopy"], ["xclip", "-selection", "clipboard"]):
            try:
                subprocess.run(cmd, input=plain_text.encode(), check=True)
                console.print("[green]Copied to clipboard[/green]")
                return
            except (FileNotFoundError, subprocess.CalledProcessError):
                continue
        console.print("[yellow]Could not copy to clipboard[/yellow]")


def _load_prefab_app(target: str) -> PrefabApp:
    """Load a PrefabApp from a `file.py:attribute` target string.

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

    `html_ref` is a single-element list so the reload watcher can swap
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
def export(
    target: Annotated[
        str,
        cyclopts.Parameter(
            help="Path to a Python file, optionally with :attribute (e.g. app.py:my_app)",
        ),
    ],
    *,
    output: Annotated[
        str | None,
        cyclopts.Parameter(
            name="--output",
            alias="-o",
            help="Output HTML file path (default: <input_stem>.html)",
        ),
    ] = None,
    bundled: Annotated[
        bool,
        cyclopts.Parameter(
            "--bundled",
            help="Inline all JS/CSS for fully self-contained output (no network needed)",
        ),
    ] = False,
    cdn_version: Annotated[
        str | None,
        cyclopts.Parameter(
            "--cdn-version",
            help="Pin CDN renderer to a specific version (default: installed version, or 'latest' for dev builds)",
        ),
    ] = None,
) -> None:
    """Export a PrefabApp as a static HTML file.

    Loads a PrefabApp from a Python file, renders it to HTML, and writes
    the result to disk. The output is a single file you can open directly,
    embed in an iframe, or deploy to any static host.

    By default the renderer loads from CDN (small file, version-pinned).
    Pass --bundled to inline everything for offline use.

    Example:
        prefab export app.py
        prefab export app.py -o dashboard.html
        prefab export app.py --cdn-version 0.14.1
        prefab export app.py:sidebar --bundled
    """
    from prefab_ui.renderer import RendererMode

    if bundled and cdn_version is not None:
        console.print(
            "[bold red]Error:[/bold red] --bundled and --cdn-version cannot be used together"
        )
        raise SystemExit(1)

    prefab_app = _load_prefab_app(target)

    mode: RendererMode = "bundled" if bundled else "cdn"
    html = prefab_app.html(renderer_mode=mode, cdn_version=cdn_version, pretty=True)

    if output is None:
        stem = Path(target.partition(":")[0]).stem
        output = f"{stem}.html"

    out_path = Path(output)
    out_path.write_text(html, encoding="utf-8")

    size_kb = out_path.stat().st_size / 1024
    console.print(
        f"[bold green]✓[/bold green] Exported to [cyan]{out_path}[/cyan]"
        f" ({size_kb:.0f} KB, {'bundled' if bundled else 'CDN'})"
    )


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

    Serves the self-contained playground HTML.  Requires docs to be
    built first (`prefab dev build-docs`).

    Example:
        prefab playground
        prefab playground --port 8080
    """
    # Prefer the single-file build (has bundled Python source inlined)
    # over the multi-file dist build (which tries micropip and currently
    # hits a Pyodide bug).
    repo_root = _find_repo_root()
    single_file = repo_root / "docs" / "playground.html"
    dist_file = _find_dist_dir() / "playground.html"

    if single_file.is_file():
        playground_path = single_file
    elif dist_file.is_file():
        playground_path = dist_file
    else:
        console.print(
            "[bold red]Error:[/bold red] Playground not built.\n"
            "  Run: [cyan]prefab dev build-docs[/cyan]"
        )
        raise SystemExit(1)

    # Serve from the parent directory so relative asset paths resolve.
    handler = functools.partial(
        _SilentHandler,
        directory=str(playground_path.parent),
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

    url = f"http://127.0.0.1:{port}/{playground_path.name}"
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
    """Regenerate all doc assets: previews, CSS, playground, and protocol ref."""
    repo_root = _find_repo_root()
    build_dir = repo_root / "tools"

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

    if should_install_node_deps(renderer_dir):
        steps.append(
            (
                "Installing renderer dependencies",
                ["npm", "install", "--prefix", str(renderer_dir)],
                None,
            )
        )

    if should_rebuild_renderer(repo_root):
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

    rebuild_playground = should_rebuild_playground(repo_root)

    steps += [
        (
            "Rendering component previews",
            ["uv", "run", str(build_dir / "render_previews.py")],
            None,
        ),
        (
            "Extracting preview classes",
            ["uv", "run", str(build_dir / "extract_preview_classes.py")],
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
                {**os.environ, "VITE_LOCAL_PLAYGROUND": "1"},
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

    # Always ensure docs/ has the renderer files, even when the source
    # hasn't changed.  The chunks are gitignored, so a fresh clone or
    # `rm -rf docs/_renderer` would leave docs/renderer.js pointing at
    # files that don't exist.
    dist_entry = renderer_dir / "dist" / "renderer.js"
    dist_renderer_chunks = renderer_dir / "dist" / "_renderer"
    docs_renderer_chunks = repo_root / "docs" / "_renderer"

    if dist_entry.exists() and (copy_renderer or not docs_renderer_chunks.exists()):
        for stale in (repo_root / "docs").glob("renderer*.js"):
            stale.unlink()
        if docs_renderer_chunks.exists():
            shutil.rmtree(docs_renderer_chunks)
        shutil.copy2(dist_entry, repo_root / "docs" / "renderer.js")
        if dist_renderer_chunks.exists():
            shutil.copytree(dist_renderer_chunks, docs_renderer_chunks)
        sync_to_mintlify_cache(repo_root, "renderer.js", "_renderer")

    if copy_renderer:
        renderer_src = repo_root / "renderer" / "src"
        playground_dir = renderer_src / "playground"
        hash_file = repo_root / "renderer" / ".renderer-hash"
        hash_file.write_text(source_content_hash(renderer_src, exclude=playground_dir))

    if rebuild_playground:
        shutil.copy2(
            renderer_dir / "dist" / "playground.html",
            repo_root / "docs" / "playground.html",
        )
        sync_to_mintlify_cache(repo_root, "playground.html")
        hash_file = repo_root / "renderer" / ".playground-hash"
        hash_file.write_text(source_content_hash(renderer_dir / "src"))

    console.print("[bold green]✓[/bold green] All doc assets rebuilt")


@dev_app.command(name="build-renderers")
def build_renderers() -> None:
    """Rebuild the bundled renderer HTML shipped in the Python package.

    Builds the single-file renderer from Vite and copies it into
    src/prefab_ui/renderer/app.html. Uses the same unified entry point
    as the CDN build — the bridge handles MCP, generative, and standalone
    modes. Generative code (Pyodide) is inert unless the host sends
    ontoolinputpartial.

    Run this after any renderer source changes that should be reflected
    in the bundled package.
    """
    repo_root = _find_repo_root()
    renderer_dir = repo_root / "renderer"
    dest = repo_root / "src" / "prefab_ui" / "renderer"

    for cmd in ("npm", "npx"):
        if not shutil.which(cmd):
            console.print(f"[bold red]Error:[/bold red] [cyan]{cmd}[/cyan] not found.")
            raise SystemExit(1)

    if should_install_node_deps(renderer_dir):
        console.print("  [dim]→[/dim] Installing renderer dependencies...")
        r = subprocess.run(
            ["npm", "install", "--prefix", str(renderer_dir)], cwd=repo_root
        )
        if r.returncode != 0:
            raise SystemExit(r.returncode)

    console.print("  [dim]→[/dim] Building bundled renderer...")
    r = subprocess.run(
        ["npx", "vite", "build", "--config", "vite.config.bundled.ts"],
        cwd=renderer_dir,
    )
    if r.returncode != 0:
        console.print("[bold red]Error:[/bold red] Renderer build failed")
        raise SystemExit(r.returncode)

    src_path = renderer_dir / "dist" / "bundled" / "index.html"
    dest_path = dest / "app.html"
    shutil.copy2(src_path, dest_path)
    console.print(f"    → {dest_path.relative_to(repo_root)}")

    console.print("[bold green]✓[/bold green] Bundled renderer rebuilt")


@dev_app.command(name="build-playground")
def build_playground() -> None:
    """Rebuild only the playground HTML (skips previews, Tailwind, protocol)."""
    repo_root = _find_repo_root()
    build_dir = repo_root / "tools"
    renderer_dir = repo_root / "renderer"

    if not shutil.which("npm"):
        console.print("[bold red]Error:[/bold red] npm not found.")
        raise SystemExit(1)

    for desc, cmd, env in [
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
            "Building playground",
            ["npm", "run", "--prefix", str(renderer_dir), "build:playground"],
            {**os.environ, "VITE_LOCAL_PLAYGROUND": "1"},
        ),
    ]:
        console.print(f"  [dim]→[/dim] {desc}...")
        r = subprocess.run(cmd, cwd=repo_root, env=env)
        if r.returncode != 0:
            console.print(f"[bold red]Error:[/bold red] {desc} failed")
            raise SystemExit(r.returncode)

    shutil.copy2(
        renderer_dir / "dist" / "playground.html",
        repo_root / "docs" / "playground.html",
    )
    sync_to_mintlify_cache(repo_root, "playground.html")
    hash_file = repo_root / "renderer" / ".playground-hash"
    hash_file.write_text(source_content_hash(repo_root / "renderer" / "src"))
    console.print("[bold green]✓[/bold green] Playground rebuilt")


register_docs_command(dev_app, _find_repo_root, _find_free_port, build_docs)


class _SilentHandler(SimpleHTTPRequestHandler):
    """SimpleHTTPRequestHandler that suppresses access logs."""

    def log_message(self, format: str, *args: object) -> None:
        pass
