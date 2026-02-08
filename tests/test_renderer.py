"""Tests for the Prefab renderer stub generation."""

from __future__ import annotations

import pytest

from prefab_ui.renderer import get_renderer_csp, get_renderer_html, get_renderer_url


class TestGetRendererUrl:
    def test_defaults_to_cdn(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.delenv("PREFAB_RENDERER_URL", raising=False)
        url = get_renderer_url()
        assert "cdn.jsdelivr.net" in url
        assert "@prefect/prefab-ui" in url

    def test_env_var_override(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "http://localhost:3333")
        assert get_renderer_url() == "http://localhost:3333"

    def test_strips_trailing_slash(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "http://localhost:3333/")
        assert get_renderer_url() == "http://localhost:3333"

    def test_cdn_url_includes_version(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.delenv("PREFAB_RENDERER_URL", raising=False)
        url = get_renderer_url()
        # Version is dynamic, but should contain a @ after the package name
        assert "@prefect/prefab-ui@" in url


class TestGetRendererHtml:
    def test_dev_stub_for_localhost(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "http://localhost:3333")
        html = get_renderer_html()
        assert "localhost:3333" in html
        assert "@vite/client" in html
        assert "main.tsx" in html

    def test_dev_stub_for_127(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "http://127.0.0.1:3333")
        html = get_renderer_html()
        assert "@vite/client" in html

    def test_prod_stub_for_cdn(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "https://cdn.example.com/prefab")
        html = get_renderer_html()
        assert "cdn.example.com/prefab" in html
        assert "renderer.js" in html
        assert "renderer.css" in html
        assert "@vite/client" not in html

    def test_defaults_to_cdn_stub(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.delenv("PREFAB_RENDERER_URL", raising=False)
        html = get_renderer_html()
        assert "cdn.jsdelivr.net" in html
        assert "renderer.js" in html
        assert "@vite/client" not in html


class TestGetRendererCsp:
    def test_cdn_domains(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.delenv("PREFAB_RENDERER_URL", raising=False)
        assert get_renderer_csp() == ["https://cdn.jsdelivr.net"]

    def test_localhost_domain(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "http://localhost:3333")
        assert get_renderer_csp() == ["http://localhost:3333"]

    def test_custom_prod_domain(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "https://assets.example.com/prefab")
        assert get_renderer_csp() == ["https://cdn.jsdelivr.net"]
