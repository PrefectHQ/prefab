"""Build helpers for `prefab dev build-*` commands.

Pure-functions extracted from cli.py — hash checks, dependency probes,
and the Mintlify dev-server cache sync.  Kept in a separate module so
cli.py stays under its size limit.
"""

from __future__ import annotations

import hashlib
import json
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

    No-op in three cases:
      * Mintlify has never been run locally (cache directory missing).
      * The cache currently belongs to a different docs project — we
        compare the `name` field of the cache's docs.json against ours
        so we never pollute another project's cache.
      * No matching source file exists for any of the requested paths.
    """
    mintlify_client = Path.home() / ".mintlify/mint/apps/client"
    mintlify_public = mintlify_client / "public"
    if not mintlify_public.exists():
        return
    if not _cache_belongs_to_us(repo_root, mintlify_client):
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


def _cache_belongs_to_us(repo_root: Path, mintlify_client: Path) -> bool:
    """Return True if the Mintlify cache is currently serving this project.

    Compares the `name` field of `docs/docs.json` against the same field
    in the cached copy at `src/_props/docs.json` (which Mintlify writes
    when it loads a project). A mismatch — or any failure to read either
    file — means another project last ran `mint dev`, so leave its cache
    alone.
    """
    our_docs_json = repo_root / "docs" / "docs.json"
    cache_docs_json = mintlify_client / "src" / "_props" / "docs.json"
    try:
        our_name = json.loads(our_docs_json.read_text()).get("name")
        cache_name = json.loads(cache_docs_json.read_text()).get("name")
    except (OSError, ValueError):
        return False
    return bool(our_name) and our_name == cache_name


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
