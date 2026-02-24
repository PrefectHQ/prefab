"""Tests for Slider component."""

from __future__ import annotations

from prefab_ui.components import Slider


def test_slider_serializes():
    j = Slider(min=0, max=100, value=50, step=5).to_json()
    assert j["type"] == "Slider"
    assert j["min"] == 0
    assert j["max"] == 100
    assert j["value"] == 50
    assert j["step"] == 5


def test_slider_range_serializes():
    j = Slider(min=0, max=100, value=[20, 80], range=True).to_json()
    assert j["type"] == "Slider"
    assert j["value"] == [20, 80]
    assert j["range"] is True


def test_slider_range_omitted_when_false():
    j = Slider(min=0, max=100, value=50).to_json()
    assert "range" not in j


def test_slider_range_with_step():
    j = Slider(min=0, max=100, value=[10, 90], step=10, range=True).to_json()
    assert j["value"] == [10, 90]
    assert j["step"] == 10
    assert j["range"] is True


def test_slider_single_value_backward_compatible():
    s = Slider(min=0, max=100, value=50)
    assert s.value == 50
    assert s.range is False


def test_slider_variant_default_omitted():
    j = Slider(min=0, max=100, value=50).to_json()
    assert "variant" not in j


def test_slider_variant_success():
    j = Slider(min=0, max=100, value=50, variant="success").to_json()
    assert j["variant"] == "success"


def test_slider_variant_all():
    for variant in ("default", "success", "warning", "destructive", "info", "muted"):
        s = Slider(min=0, max=100, value=50, variant=variant)
        assert s.variant == variant


def test_slider_indicator_class():
    j = Slider(min=0, max=100, value=50, indicator_class="bg-green-500").to_json()
    assert j["indicatorClass"] == "bg-green-500"


def test_slider_orientation_default_omitted():
    j = Slider(min=0, max=100, value=50).to_json()
    assert "orientation" not in j


def test_slider_orientation_vertical():
    j = Slider(min=0, max=100, value=50, orientation="vertical").to_json()
    assert j["orientation"] == "vertical"


def test_slider_handle_style_default_omitted():
    j = Slider(min=0, max=100, value=50).to_json()
    assert "handleStyle" not in j


def test_slider_handle_style_bar():
    j = Slider(min=0, max=100, value=50, handle_style="bar").to_json()
    assert j["handleStyle"] == "bar"


def test_slider_all_new_props():
    j = Slider(
        min=0,
        max=100,
        value=75,
        variant="warning",
        indicator_class="rounded",
        orientation="vertical",
        handle_style="bar",
    ).to_json()
    assert j["variant"] == "warning"
    assert j["indicatorClass"] == "rounded"
    assert j["orientation"] == "vertical"
    assert j["handleStyle"] == "bar"


def test_slider_snaps_off_step_initial_value():
    s = Slider(min=0, max=10, step=1, value=1.2)
    assert s.value == 1


def test_slider_snaps_off_step_range_values():
    s = Slider(min=0, max=100, step=10, value=[12, 87], range=True)
    assert s.value == [10, 90]


def test_slider_on_step_value_unchanged():
    s = Slider(min=0, max=10, step=2, value=4)
    assert s.value == 4


def test_slider_snap_clamps_to_max():
    s = Slider(min=0, max=10, step=3, value=10.5)
    assert s.value == 10  # round(10.5/3)*3 = round(3.5)*3 = 4*3 = 12, clamped to max=10
