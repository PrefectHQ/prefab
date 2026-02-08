"""Tests for the Prefab renderer stub generation."""

from __future__ import annotations

import pytest

from prefab_ui.renderer import get_renderer_csp, get_renderer_html, get_renderer_url


class TestGetRendererUrl:
    def test_defaults_to_cdn(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.delenv("PREFAB_RENDERER_URL", raising=False)
        url = get_renderer_url()
        assert "cdn.jsdelivr.net" in url
        assert "@prefecthq/prefab-ui" in url

    def test_env_var_override(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "http://localhost:4173")
        assert get_renderer_url() == "http://localhost:4173"

    def test_strips_trailing_slash(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "http://localhost:4173/")
        assert get_renderer_url() == "http://localhost:4173"

    def test_cdn_url_includes_version(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.delenv("PREFAB_RENDERER_URL", raising=False)
        url = get_renderer_url()
        # Version is dynamic, but should contain a @ after the package name
        assert "@prefecthq/prefab-ui@" in url


class TestGetRendererHtml:
    def test_always_uses_built_assets(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "http://localhost:4173")
        html = get_renderer_html()
        assert "localhost:4173" in html
        assert "renderer.js" in html
        assert "renderer.css" in html
        assert "@vite/client" not in html
        assert "main.tsx" not in html

    def test_custom_url(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "https://assets.example.com/prefab")
        html = get_renderer_html()
        assert "assets.example.com/prefab" in html
        assert "renderer.js" in html
        assert "renderer.css" in html

    def test_defaults_to_cdn_stub(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.delenv("PREFAB_RENDERER_URL", raising=False)
        html = get_renderer_html()
        assert "cdn.jsdelivr.net" in html
        assert "renderer.js" in html


class TestGetRendererCsp:
    def test_cdn_domains(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.delenv("PREFAB_RENDERER_URL", raising=False)
        csp = get_renderer_csp()
        assert csp == {"resource_domains": ["https://cdn.jsdelivr.net"]}

    def test_localhost_domain(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "http://localhost:4173")
        csp = get_renderer_csp()
        assert csp == {"resource_domains": ["http://localhost:4173"]}

    def test_custom_domain(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "https://assets.example.com/prefab")
        csp = get_renderer_csp()
        assert csp == {"resource_domains": ["https://assets.example.com"]}

    def test_no_connect_domains(self, monkeypatch: pytest.MonkeyPatch):
        """connect_domains is never needed — no HMR over the MCP host path."""
        monkeypatch.setenv("PREFAB_RENDERER_URL", "http://localhost:4173")
        csp = get_renderer_csp()
        assert "connect_domains" not in csp
