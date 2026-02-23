# /// script
# requires-python = ">=3.10"
# dependencies = ["requests"]
# ///
"""Run a query against the ClickHouse SQL Playground (sql.clickhouse.com)."""

import csv
import datetime
import io
import json
import os
import sys

import requests

CLICKHOUSE_URL = "https://sql-clickhouse.clickhouse.com"
CLICKHOUSE_USER = "demo"
CLICKHOUSE_PASSWORD = ""

QUERY_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "query.sql")


def run_query(package_name="fastmcp", min_date="2026-01-01", max_date="2026-02-21"):
    """Run a parameterized query against the ClickHouse SQL Playground.

    Reads the SQL from query.sql and executes it with the given parameters,
    returning the results as a list of dictionaries.

    Args:
        package_name: PyPI package name to find dependents for.
        min_date: Start date for the query range (inclusive), ISO format.
        max_date: End date for the query range (exclusive), ISO format.

    Returns:
        A list of dicts with keys 'week', 'package', and 'downloads'.

    Raises:
        requests.HTTPError: If the ClickHouse API returns an error response.
    """
    params = {
        "param_package_name": package_name,
        "param_min_date": min_date,
        "param_max_date": max_date,
    }
    with open(QUERY_PATH) as f:
        query = f.read()

    response = requests.post(
        CLICKHOUSE_URL,
        params={**params, "default_format": "CSVWithNames"},
        data=query,
        auth=(CLICKHOUSE_USER, CLICKHOUSE_PASSWORD),
        headers={"Content-Type": "text/plain"},
    )
    response.raise_for_status()

    reader = csv.DictReader(io.StringIO(response.text))
    rows = list(reader)
    return rows


_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(_DIR, "downloads", "downloads.csv")
META_PATH = os.path.join(_DIR, "downloads", "downloads.meta.json")


def main():
    """Run the query and write results to downloads.csv.

    Args can be passed via the command line:
        argv[1]: Package name (default: 'fastmcp').
        argv[2]: Min date, ISO format (default: 8 weeks ago).
        argv[3]: Max date, ISO format (default: yesterday).
    """
    package_name = sys.argv[1] if len(sys.argv) > 1 else "fastmcp"
    yesterday = datetime.date.today() - datetime.timedelta(days=1)
    eight_weeks_ago = yesterday - datetime.timedelta(weeks=8)
    min_date = sys.argv[2] if len(sys.argv) > 2 else eight_weeks_ago.isoformat()
    max_date = sys.argv[3] if len(sys.argv) > 3 else yesterday.isoformat()

    rows = run_query(package_name, min_date, max_date)

    if not rows:
        print("No results.")
        return

    with open(CSV_PATH, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)

    with open(META_PATH, "w") as f:
        json.dump({"package_name": package_name}, f)

    print(f"{len(rows)} rows written to {CSV_PATH}")


if __name__ == "__main__":
    main()
