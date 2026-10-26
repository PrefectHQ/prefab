"""Tests for Sparkline."""

import pytest

from prefab_ui.components.charts import Sparkline
from prefab_ui.rx import Rx


@pytest.mark.parametrize(
    "height", [420, "{{ rows.length * 30 }}", Rx("rows").length() * 30]
)
def test_sparkline_serializes_reactive_height(height):
    chart = Sparkline(data=[], height=height)

    assert chart.to_json()["height"] == (
        height if isinstance(height, int) else str(height)
    )
