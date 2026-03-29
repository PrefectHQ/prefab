"""Tests for the Prefab renderer resource loader."""

from __future__ import annotations

import pytest

from prefab_ui.renderer import (
    get_generative_renderer_csp,
    get_renderer_csp,
    get_renderer_html,
)


def _clear_env(monkeypatch: pytest.MonkeyPatch) -> None:
    """Remove all renderer env overrides."""
    monkeypatch.delenv("PREFAB_RENDERER_URL", raising=False)
    monkeypatch.delenv("PREFAB_BUNDLED_RENDERER", raising=False)


class TestCdnDefault:
    """CDN is the default mode for released versions."""

    def test_cdn_default_returns_small_stub(self, monkeypatch: pytest.MonkeyPatch):
        _clear_env(monkeypatch)
        monkeypatch.setattr("prefab_ui.renderer._get_version", lambda: "0.15.0")
        html = get_renderer_html()
        assert '<div id="root">' in html
        assert "cdn.jsdelivr.net" in html
        assert len(html) < 1_000

    def test_cdn_stub_pinned_to_version(self, monkeypatch: pytest.MonkeyPatch):
        _clear_env(monkeypatch)
        monkeypatch.setattr("prefab_ui.renderer._get_version", lambda: "0.15.0")
        html = get_renderer_html()
        assert "@prefecthq/prefab-ui@0.15.0" in html

    def test_cdn_stub_contains_renderer_js(self, monkeypatch: pytest.MonkeyPatch):
        _clear_env(monkeypatch)
        monkeypatch.setattr("prefab_ui.renderer._get_version", lambda: "0.15.0")
        html = get_renderer_html()
        assert "renderer.js" in html
        assert "renderer.css" in html

    def test_cdn_csp_includes_jsdelivr(self, monkeypatch: pytest.MonkeyPatch):
        _clear_env(monkeypatch)
        monkeypatch.setattr("prefab_ui.renderer._get_version", lambda: "0.15.0")
        csp = get_renderer_csp()
        assert "https://cdn.jsdelivr.net" in csp["resource_domains"]


class TestExplicitMode:
    """Explicit mode= kwarg overrides everything."""

    def test_mode_cdn(self, monkeypatch: pytest.MonkeyPatch):
        _clear_env(monkeypatch)
        monkeypatch.setattr("prefab_ui.renderer._get_version", lambda: "0.15.0")
        html = get_renderer_html(mode="cdn")
        assert "cdn.jsdelivr.net" in html
        assert len(html) < 1_000

    def test_mode_bundled(self, monkeypatch: pytest.MonkeyPatch):
        _clear_env(monkeypatch)
        html = get_renderer_html(mode="bundled")
        assert '<div id="root">' in html
        # Bundled HTML is the full inlined renderer
        assert len(html) > 100_000

    def test_mode_bundled_csp_empty(self, monkeypatch: pytest.MonkeyPatch):
        _clear_env(monkeypatch)
        csp = get_renderer_csp(mode="bundled")
        assert csp == {"resource_domains": []}


class TestDevVersionFallback:
    """Dev versions (0.0.0-dev) auto-fall back to bundled."""

    def test_dev_version_uses_bundled(self, monkeypatch: pytest.MonkeyPatch):
        _clear_env(monkeypatch)
        monkeypatch.setattr("prefab_ui.renderer._get_version", lambda: "0.0.0-dev")
        html = get_renderer_html()
        # Bundled HTML is the full inlined renderer, not the tiny CDN stub
        assert len(html) > 100_000
        assert "@prefecthq/prefab-ui@0.0.0-dev" not in html

    def test_zero_version_uses_bundled(self, monkeypatch: pytest.MonkeyPatch):
        _clear_env(monkeypatch)
        monkeypatch.setattr("prefab_ui.renderer._get_version", lambda: "0.0.0")
        html = get_renderer_html()
        assert len(html) > 100_000
        assert "@prefecthq/prefab-ui@0.0.0" not in html


class TestEnvOverrides:
    """Environment variables override defaults."""

    def test_renderer_url_override(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "http://localhost:4173")
        monkeypatch.delenv("PREFAB_BUNDLED_RENDERER", raising=False)
        html = get_renderer_html()
        assert "localhost:4173" in html
        assert "renderer.js" in html
        assert "renderer.css" in html

    def test_renderer_url_csp(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "http://localhost:4173")
        monkeypatch.delenv("PREFAB_BUNDLED_RENDERER", raising=False)
        csp = get_renderer_csp()
        assert csp == {"resource_domains": ["http://localhost:4173"]}

    def test_custom_url(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "https://assets.example.com/prefab")
        monkeypatch.delenv("PREFAB_BUNDLED_RENDERER", raising=False)
        html = get_renderer_html()
        assert "assets.example.com/prefab" in html

    def test_custom_url_csp_extracts_origin(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "https://assets.example.com/prefab")
        monkeypatch.delenv("PREFAB_BUNDLED_RENDERER", raising=False)
        csp = get_renderer_csp()
        assert csp == {"resource_domains": ["https://assets.example.com"]}

    def test_bundled_env_var(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.delenv("PREFAB_RENDERER_URL", raising=False)
        monkeypatch.setenv("PREFAB_BUNDLED_RENDERER", "1")
        html = get_renderer_html()
        # Bundled HTML is the full inlined renderer
        assert len(html) > 100_000

    def test_renderer_url_takes_precedence_over_bundled_env(
        self, monkeypatch: pytest.MonkeyPatch
    ):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "http://localhost:4173")
        monkeypatch.setenv("PREFAB_BUNDLED_RENDERER", "1")
        html = get_renderer_html()
        assert "localhost:4173" in html


class TestGenerativeCsp:
    """Generative CSP adds Pyodide domains on top of base CSP."""

    def test_generative_cdn_includes_pyodide_and_jsdelivr(
        self, monkeypatch: pytest.MonkeyPatch
    ):
        _clear_env(monkeypatch)
        monkeypatch.setattr("prefab_ui.renderer._get_version", lambda: "0.15.0")
        csp = get_generative_renderer_csp()
        assert "https://cdn.jsdelivr.net" in csp["resource_domains"]
        assert "https://pypi.org" in csp["connect_domains"]

    def test_generative_bundled_adds_pyodide_origin(
        self, monkeypatch: pytest.MonkeyPatch
    ):
        _clear_env(monkeypatch)
        csp = get_generative_renderer_csp(mode="bundled")
        assert "https://cdn.jsdelivr.net" in csp["resource_domains"]
        assert "https://pypi.org" in csp["connect_domains"]
