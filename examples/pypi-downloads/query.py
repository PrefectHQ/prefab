"""Run queries against the ClickHouse SQL Playground (sql.clickhouse.com)."""

import csv
import io
import os

import requests

CLICKHOUSE_URL = "https://sql-clickhouse.clickhouse.com"
CLICKHOUSE_USER = "demo"
CLICKHOUSE_PASSWORD = ""

_DIR = os.path.dirname(os.path.abspath(__file__))
QUERY_PATH = os.path.join(_DIR, "query.sql")
QUERY_TOTAL_PATH = os.path.join(_DIR, "query_total.sql")


def _run(sql_path: str, package_name: str, min_date: str, max_date: str) -> list[dict]:
    params = {
        "param_package_name": package_name,
        "param_min_date": min_date,
        "param_max_date": max_date,
    }
    with open(sql_path) as f:
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
    return list(reader)


def run_query(package_name: str, min_date: str, max_date: str) -> list[dict]:
    """Query weekly downloads for the top dependents of a package.

    Returns a list of dicts with keys 'week', 'package', and 'downloads'.
    """
    return _run(QUERY_PATH, package_name, min_date, max_date)


def run_total_query(package_name: str, min_date: str, max_date: str) -> list[dict]:
    """Query weekly total downloads for a package itself.

    Returns a list of dicts with keys 'week' and 'downloads'.
    """
    return _run(QUERY_TOTAL_PATH, package_name, min_date, max_date)
