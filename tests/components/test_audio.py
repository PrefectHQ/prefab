"""Tests for Audio component."""

from __future__ import annotations

from prefab_ui.components import Audio


def test_audio_to_json():
    a = Audio(src="https://example.com/track.mp3")
    j = a.to_json()
    assert j["type"] == "Audio"
    assert j["src"] == "https://example.com/track.mp3"
    assert j["controls"] is True


def test_audio_positional():
    a = Audio("https://example.com/track.mp3")
    assert a.to_json()["src"] == "https://example.com/track.mp3"


def test_audio_all_options():
    a = Audio(
        src="https://example.com/track.mp3",
        controls=False,
        autoplay=True,
        loop=True,
        muted=True,
    )
    j = a.to_json()
    assert j["controls"] is False
    assert j["autoplay"] is True
    assert j["loop"] is True
    assert j["muted"] is True
