"""Build helpers for `prefab dev build-*` commands.

Pure-functions extracted from cli.py — hash checks, dependency probes,
and the Mintlify dev-server cache sync.  Kept in a separate module so
cli.py stays under its size limit.
"""

from __future__ import annotations

import hashlib
import shutil
from pathlib import Path


def should_install_node_deps(renderer_dir: Path) -> bool:
    """Check whether `npm install` needs to run for the renderer."""
    node_modules = renderer_dir / "node_modules"
    if not node_modules.exists():
        return True
    lock_file = renderer_dir / "package-lock.json"
    if lock_file.exists():
        return lock_file.stat().st_mtime > node_modules.stat().st_mtime
    return False


def source_content_hash(src_dir: Path, exclude: Path | None = None) -> str:
    """SHA-256 over sorted file paths + contents under *src_dir*."""
    h = hashlib.sha256()
    for f in sorted(src_dir.rglob("*")):
        if not f.is_file():
            continue
        if exclude and f.is_relative_to(exclude):
            continue
        h.update(str(f.relative_to(src_dir)).encode())
        h.update(f.read_bytes())
    return h.hexdigest()


def sync_to_mintlify_cache(repo_root: Path, *paths: str) -> None:
    """Mirror static assets into the Mintlify dev server's public/ cache.

    Mintlify copies docs/ into ~/.mintlify/mint/apps/client/public/ at
    server startup and serves from the cache.  Subsequent edits to docs/
    static assets (like the renderer chunks or playground.html) are NOT
    picked up until the dev server restarts — Mintlify's file watcher
    only handles MDX, not arbitrary public/ files.

    Mirroring our generated assets directly into the cache makes
    rebuilds take effect on the next page reload, no restart required.
    The cache is a no-op when Mintlify has never been run locally.
    """
    mintlify_public = Path.home() / ".mintlify/mint/apps/client/public"
    if not mintlify_public.exists():
        return
    docs_dir = repo_root / "docs"
    for rel in paths:
        src = docs_dir / rel
        if not src.exists():
            continue
        dst = mintlify_public / rel
        if src.is_dir():
            if dst.exists():
                shutil.rmtree(dst)
            shutil.copytree(src, dst)
        else:
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dst)


def should_rebuild_renderer(repo_root: Path) -> bool:
    """Check whether the renderer bundle needs rebuilding."""
    renderer_js = repo_root / "docs" / "renderer.js"
    if not renderer_js.exists():
        return True
    hash_file = repo_root / "renderer" / ".renderer-hash"
    renderer_src = repo_root / "renderer" / "src"
    playground_dir = renderer_src / "playground"
    current_hash = source_content_hash(renderer_src, exclude=playground_dir)
    return not (hash_file.exists() and hash_file.read_text().strip() == current_hash)


def should_rebuild_playground(repo_root: Path) -> bool:
    """Check whether the playground HTML needs rebuilding."""
    if not (repo_root / "docs" / "playground.html").exists():
        return True
    hf = repo_root / "renderer" / ".playground-hash"
    # Hash ALL renderer source, not just playground/ — CSS, components, and
    # themes all affect the compiled playground.html.
    return not (
        hf.exists()
        and hf.read_text().strip()
        == source_content_hash(repo_root / "renderer" / "src")
    )
