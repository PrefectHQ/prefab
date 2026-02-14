"""Tests for the Prefab renderer resource loader."""

from __future__ import annotations

import pytest

from prefab_ui.renderer import get_renderer_csp, get_renderer_html


class TestGetRendererHtml:
    def test_returns_bundled_html(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.delenv("PREFAB_RENDERER_URL", raising=False)
        html = get_renderer_html()
        assert '<div id="root">' in html
        assert len(html) > 100_000

    def test_no_external_refs(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.delenv("PREFAB_RENDERER_URL", raising=False)
        html = get_renderer_html()
        assert "@vite/client" not in html
        assert "main.tsx" not in html
        assert "cdn.jsdelivr.net" not in html

    def test_external_url_override(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "http://localhost:4173")
        html = get_renderer_html()
        assert "localhost:4173" in html
        assert "renderer.js" in html
        assert "renderer.css" in html

    def test_custom_url(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "https://assets.example.com/prefab")
        html = get_renderer_html()
        assert "assets.example.com/prefab" in html


class TestGetRendererCsp:
    def test_bundled_needs_no_domains(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.delenv("PREFAB_RENDERER_URL", raising=False)
        csp = get_renderer_csp()
        assert csp == {"resource_domains": []}

    def test_external_url_domain(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "http://localhost:4173")
        csp = get_renderer_csp()
        assert csp == {"resource_domains": ["http://localhost:4173"]}

    def test_custom_domain(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "https://assets.example.com/prefab")
        csp = get_renderer_csp()
        assert csp == {"resource_domains": ["https://assets.example.com"]}
