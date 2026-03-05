"""Tests for Video component."""

from __future__ import annotations

from prefab_ui.components import Video


def test_video_to_json():
    v = Video(src="https://example.com/video.mp4")
    j = v.to_json()
    assert j["type"] == "Video"
    assert j["src"] == "https://example.com/video.mp4"
    assert j["controls"] is True


def test_video_positional():
    v = Video("https://example.com/video.mp4")
    assert v.to_json()["src"] == "https://example.com/video.mp4"


def test_video_all_options():
    v = Video(
        src="https://example.com/video.mp4",
        poster="https://example.com/thumb.jpg",
        controls=False,
        autoplay=True,
        loop=True,
        muted=True,
        width="640px",
        height="360px",
    )
    j = v.to_json()
    assert j["poster"] == "https://example.com/thumb.jpg"
    assert j["controls"] is False
    assert j["autoplay"] is True
    assert j["loop"] is True
    assert j["muted"] is True
    assert j["width"] == "640px"
    assert j["height"] == "360px"


def test_video_defaults_excluded():
    v = Video(src="https://example.com/video.mp4")
    j = v.to_json()
    assert "poster" not in j
    assert "width" not in j
    assert "height" not in j
