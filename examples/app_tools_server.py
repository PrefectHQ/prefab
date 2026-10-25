"""Serve the app-tools counter with FastMCP's standard Prefab renderer.

Run from the repository root:
    PREFAB_BUNDLED_RENDERER=1 uv run --with 'fastmcp[apps]' --with-editable . examples/app_tools_server.py
"""

from app_tools import app
from fastmcp import FastMCP

from prefab_ui.app import PrefabApp

mcp = FastMCP("App tools counter")


@mcp.tool(app=True)
def counter() -> PrefabApp:
    """Open a counter shared by the human and the model."""
    return app


if __name__ == "__main__":
    mcp.run()
