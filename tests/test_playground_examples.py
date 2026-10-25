"""Executable documentation examples consumed by the playground."""

import json
from pathlib import Path


def test_browser_only_app_tool_example_keeps_its_imports() -> None:
    examples = json.loads(
        (
            Path(__file__).parents[1] / "renderer/src/playground/examples.json"
        ).read_text()
    )
    example = next(
        item
        for item in examples
        if item["category"] == "Mcp" and "reset = AppTool(" in item["code"]
    )
    namespace: dict = {}
    exec(example["code"], namespace)
    assert namespace["app"].to_json()["tools"][0]["name"] == "reset"
