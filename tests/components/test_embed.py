"""Tests for Embed component."""

from __future__ import annotations

import pytest

from prefab_ui.components import Embed


class TestEmbedSerialization:
    def test_url_mode(self):
        e = Embed(url="https://www.youtube.com/embed/dQw4w9WgXcQ")
        j = e.to_json()
        assert j["type"] == "Embed"
        assert j["url"] == "https://www.youtube.com/embed/dQw4w9WgXcQ"
        assert "html" not in j

    def test_url_positional(self):
        e = Embed("https://www.youtube.com/embed/dQw4w9WgXcQ")
        j = e.to_json()
        assert j["url"] == "https://www.youtube.com/embed/dQw4w9WgXcQ"

    def test_html_mode(self):
        e = Embed(html="<h1>Hello</h1>")
        j = e.to_json()
        assert j["type"] == "Embed"
        assert j["html"] == "<h1>Hello</h1>"
        assert "url" not in j

    def test_dimensions(self):
        e = Embed(url="https://example.com", width="100%", height="400px")
        j = e.to_json()
        assert j["width"] == "100%"
        assert j["height"] == "400px"

    def test_sandbox_and_allow(self):
        e = Embed(
            url="https://example.com",
            sandbox="allow-scripts allow-same-origin",
            allow="fullscreen; autoplay",
        )
        j = e.to_json()
        assert j["sandbox"] == "allow-scripts allow-same-origin"
        assert j["allow"] == "fullscreen; autoplay"

    def test_none_fields_excluded(self):
        e = Embed(url="https://example.com")
        j = e.to_json()
        assert "html" not in j
        assert "width" not in j
        assert "sandbox" not in j
        assert "allow" not in j


class TestEmbedFromIframe:
    def test_basic(self):
        e = Embed.from_iframe(
            '<iframe src="https://example.com" width="600" height="400"></iframe>'
        )
        assert e.url == "https://example.com"
        assert e.width == "600px"
        assert e.height == "400px"

    def test_percentage_width(self):
        e = Embed.from_iframe(
            '<iframe src="https://example.com" width="100%"></iframe>'
        )
        assert e.width == "100%"

    def test_allow_and_sandbox(self):
        e = Embed.from_iframe(
            '<iframe src="https://example.com"'
            ' allow="fullscreen; autoplay"'
            ' sandbox="allow-scripts"></iframe>'
        )
        assert e.allow == "fullscreen; autoplay"
        assert e.sandbox == "allow-scripts"

    def test_kwargs_override(self):
        e = Embed.from_iframe(
            '<iframe src="https://example.com" height="400"></iframe>',
            height="600px",
        )
        assert e.height == "600px"

    def test_spotify_embed(self):
        e = Embed.from_iframe(
            '<iframe style="border-radius:12px"'
            ' src="https://open.spotify.com/embed/track/2CgBqLufSdwMt0FMIu1CVn"'
            ' width="100%" height="352" frameBorder="0" allowfullscreen=""'
            ' allow="autoplay; clipboard-write; encrypted-media;'
            ' fullscreen; picture-in-picture" loading="lazy"></iframe>'
        )
        assert e.url == "https://open.spotify.com/embed/track/2CgBqLufSdwMt0FMIu1CVn"
        assert e.width == "100%"
        assert e.height == "352px"
        assert e.allow is not None
        assert "autoplay" in e.allow

    def test_no_iframe_raises(self):
        with pytest.raises(ValueError, match="No <iframe>"):
            Embed.from_iframe("<div>not an iframe</div>")


class TestEmbedValidation:
    def test_both_url_and_html_rejected(self):
        with pytest.raises(ValueError, match="not both"):
            Embed(url="https://example.com", html="<h1>Hi</h1>")

    def test_neither_url_nor_html_rejected(self):
        with pytest.raises(ValueError, match="either"):
            Embed()
