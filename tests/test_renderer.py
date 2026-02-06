"""Tests for the Prefab renderer stub generation."""

from __future__ import annotations

import pytest

from prefab_ui.renderer import get_renderer_html, get_renderer_url


class TestRenderer:
    def test_get_renderer_url_from_env(self):
        url = get_renderer_url()
        assert url is not None
        assert "localhost" in url or "127.0.0.1" in url or "http" in url

    def test_get_renderer_html_dev(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "http://localhost:3333")
        html = get_renderer_html()
        assert "localhost:3333" in html
        assert "@vite/client" in html
        assert "main.tsx" in html

    def test_get_renderer_html_prod(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.setenv("PREFAB_RENDERER_URL", "https://cdn.example.com/prefab")
        html = get_renderer_html()
        assert "cdn.example.com/prefab" in html
        assert "renderer.js" in html
        assert "renderer.css" in html
        assert "@vite/client" not in html

    def test_get_renderer_html_raises_when_unset(self, monkeypatch: pytest.MonkeyPatch):
        monkeypatch.delenv("PREFAB_RENDERER_URL", raising=False)
        with pytest.raises(RuntimeError, match="PREFAB_RENDERER_URL"):
            get_renderer_html()
