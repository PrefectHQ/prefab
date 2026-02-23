# PyPI Dependent Downloads Dashboard

Track weekly PyPI downloads for the top 20 packages that directly depend on a given package (e.g. [FastMCP](https://github.com/prefecthq/fastmcp)).

Data is sourced from the [ClickHouse SQL Playground](https://sql.clickhouse.com) which mirrors PyPI download stats.

## Usage

```bash
# Launch the dashboard
uv run uvicorn api_server:app --reload
```

The dashboard lets you change the package name and date range directly from the UI — click **Fetch** and the chart, table, and gainers/losers cards update in-place without a page reload.

## Files

- `api_server.py` — FastAPI server: serves the dashboard UI and exposes `/api/data` and `/api/fetch` endpoints
- `dashboard.py` — Reusable Prefab UI components (chart, table, gainers/losers cards)
- `data.py` — Data loading and reshaping logic
- `query.sql` — ClickHouse query (filters out optional/extra dependencies)
- `query.py` — Runs the query against ClickHouse, writes `downloads.csv`
