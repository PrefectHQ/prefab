"""Build a counter bound to an already-registered Python MCP tool.

Call `counter_app(increment, counter_id, initial_count)` from a FastMCP tool.
The registered `increment(counter_id: str, amount: int = 1)` returns
`{"count": new_count}`. FastMCP must supply the enriched ResolvedTool metadata
when serializing the returned PrefabApp. The backend owns counter storage.
"""

from collections.abc import Callable
from typing import Any

from prefab_ui.actions import SetState
from prefab_ui.app import AppTool, PrefabApp
from prefab_ui.components import Button, Text
from prefab_ui.rx import ERROR, RESULT, STATE


def counter_app(
    increment: Callable[..., Any], counter_id: str, initial_count: int = 0
) -> PrefabApp:
    increment_tool = AppTool(
        increment,
        bind={"counter_id": STATE.counter_id},
        on_success=[SetState("count", RESULT.count), SetState("error", "")],
        on_error=SetState("error", ERROR),
        result={"count": STATE.count},
    )
    with PrefabApp(
        state={"counter_id": counter_id, "count": initial_count, "error": ""},
        app_tools=[
            AppTool("get_count", result={"count": STATE.count}),
            increment_tool,
        ],
    ) as app:
        Text(STATE.count)
        Button("Increment", on_click=increment_tool.invoke(amount=1))
        Text(STATE.error)
    return app
