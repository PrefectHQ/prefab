"""Chart components — BarChart, LineChart, AreaChart, PieChart, RadarChart, RadialChart, ScatterChart, WaterfallChart, Sparkline.

Built on Recharts + shadcn ChartContainer in the renderer.

**Example:**

```python
from prefab_ui.components.charts import BarChart, ChartSeries

BarChart(
    data=[
        {"month": "Jan", "desktop": 186, "mobile": 80},
        {"month": "Feb", "desktop": 305, "mobile": 200},
    ],
    series=[
        ChartSeries(data_key="desktop", label="Desktop"),
        ChartSeries(data_key="mobile", label="Mobile"),
    ],
    x_axis="month",
)

from prefab_ui.components.charts import Sparkline

Sparkline(data=[10, 15, 8, 22, 18, 25, 20])
Sparkline(data=[10, 15, 8, 22], variant="success", fill=True)
```
"""

from __future__ import annotations

from prefab_ui.components.charts._shared import ChartSeries, ChartValueFormat
from prefab_ui.components.charts.cartesian import (
    AreaChart,
    BarChart,
    LineChart,
    ScatterChart,
)
from prefab_ui.components.charts.radial import PieChart, RadarChart, RadialChart
from prefab_ui.components.charts.sparkline import Sparkline
from prefab_ui.components.charts.waterfall import WaterfallChart

__all__ = [
    "AreaChart",
    "BarChart",
    "ChartSeries",
    "ChartValueFormat",
    "LineChart",
    "PieChart",
    "RadarChart",
    "RadialChart",
    "ScatterChart",
    "Sparkline",
    "WaterfallChart",
]
