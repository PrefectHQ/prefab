"""A counter shared by the human and the model via MCP Apps app-provided tools.

Return `app` from a FastMCP tool to use its standard Prefab renderer.
For local development, set PREFAB_BUNDLED_RENDERER=1 after running
`prefab dev build-renderers` so the host uses the updated renderer.
"""

from pydantic import BaseModel, ConfigDict

from prefab_ui.actions import SetState
from prefab_ui.app import AppTool, PrefabApp
from prefab_ui.components import Button, Text
from prefab_ui.rx import EVENT, STATE


class IncrementArgs(BaseModel):
    model_config = ConfigDict(extra="forbid")
    amount: int


increment = AppTool(
    "increment",
    input_schema=IncrementArgs,
    actions=SetState("count", STATE.count + EVENT.amount),
    result={"count": STATE.count},
)

with PrefabApp(
    state={"count": 0},
    app_tools=[
        AppTool("get_count", result={"count": STATE.count}),
        increment,
    ],
) as app:
    Text(STATE.count)
    Button("Increment", on_click=increment.invoke(amount=1))
