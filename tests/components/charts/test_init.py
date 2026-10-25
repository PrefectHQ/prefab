"""Compatibility of public chart imports after splitting chart modules."""

from typing import get_args

from prefab_ui.components.charts import SparklineCurve, SparklineMode, SparklineVariant
from prefab_ui.rx import RxStr


def test_sparkline_option_types_remain_importable():
    assert set(get_args(SparklineCurve)) == {"linear", "smooth", "step"}
    assert set(get_args(SparklineMode)) == {"line", "bar"}
    assert set(get_args(RxStr)) <= set(get_args(SparklineVariant))
