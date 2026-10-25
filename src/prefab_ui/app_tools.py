"""Declarative tools provided by a running Prefab browser app."""

from __future__ import annotations

from collections.abc import Callable
from copy import deepcopy
from typing import TYPE_CHECKING, Annotated, Any

from pydantic import (
    BaseModel,
    Field,
    PrivateAttr,
    SerializeAsAny,
    TypeAdapter,
    field_validator,
    model_serializer,
)

from prefab_ui.actions.app_tool import InvokeAppTool
from prefab_ui.actions.base import Action
from prefab_ui.rx import _coerce_rx

if TYPE_CHECKING:
    from prefab_ui.app import ResolvedTool

ToolName = Annotated[
    str, Field(min_length=1, max_length=128, pattern=r"^[a-zA-Z0-9_.-]+$")
]
_name_adapter = TypeAdapter(ToolName)
Actions = (
    dict[str, Any]
    | SerializeAsAny[Action]
    | list[dict[str, Any] | SerializeAsAny[Action]]
)


def _exposed_schema(schema: dict[str, Any], bind: dict[str, Any]) -> dict[str, Any]:
    """Project top-level backend parameters without changing shared schema data."""
    schema = deepcopy(schema)
    if schema.get("type") != "object":
        raise ValueError("App tool input_schema must describe an object")
    if not bind:
        return schema
    # Nested parameter schemas (including $defs/$ref) pass through unchanged.
    # Cross-parameter constraints cannot be projected by deleting properties.
    unsupported = {
        "$ref",
        "allOf",
        "anyOf",
        "oneOf",
        "not",
        "if",
        "then",
        "else",
        "dependentRequired",
        "dependentSchemas",
        "dependencies",
        "minProperties",
        "maxProperties",
        "patternProperties",
        "propertyNames",
    }.intersection(schema)
    if unsupported:
        raise ValueError(
            "Cannot infer bound app tool inputs with top-level constraints "
            f"{sorted(unsupported)}; use a named AppTool with explicit schema/actions"
        )
    properties = schema.get("properties", {})
    unknown = bind.keys() - properties.keys()
    if unknown:
        raise ValueError(f"Unknown bound backend parameters: {sorted(unknown)}")
    schema["properties"] = {k: v for k, v in properties.items() if k not in bind}
    if "required" in schema:
        schema["required"] = [k for k in schema["required"] if k not in bind]
    # Even schemas accepting additional properties cannot accept bound inputs.
    # This also makes that restriction visible to hosts validating tool inputs.
    if schema.get("additionalProperties") is not False:
        schema["not"] = {"anyOf": [{"required": [key]} for key in bind]}
    return schema


class AppTool(BaseModel):
    """Define an app interaction callable by both the model and UI actions.

    Args:
        tool: Registered backend function, or a name for browser-only actions.
        name: Override the registered tool's local name.
        description: Override the description provided by the tool resolver.
        input_schema: Pydantic model or JSON Schema; inferred for backend tools.
        bind: Backend parameters supplied from live app state, hidden from callers.
        actions: Browser-only action or action list, with arguments in `EVENT`.
        on_success: Actions applying the backend response, available in `RESULT`.
        on_error: Actions handling a backend failure, available in `ERROR`.
        result: Explicit result object, evaluated after response actions finish.

    **Example:**

    ```python
    increment = AppTool("increment",
        actions=SetState("count", STATE.count + 1),
        result={"count": STATE.count})
    button = Button("Increment", on_click=increment.invoke())
    app = PrefabApp(view=button, state={"count": 0}, app_tools=[increment])
    ```

    Callable references resolve during `PrefabApp.to_json(tool_resolver=...)`.
    Construction never registers or executes a Python function. Only JSON
    Schema constraints run in the browser, not Python validators. Actions are
    sequential but not transactional: failures do not roll back earlier writes.
    """

    model_config = {"populate_by_name": True, "extra": "forbid"}

    name: ToolName | None = None
    description: str | None = None
    input_schema: dict[str, Any] = Field(
        default_factory=lambda: {
            "type": "object",
            "properties": {},
            "additionalProperties": False,
        },
        alias="inputSchema",
    )
    bind: dict[str, Any] = Field(default_factory=dict)
    actions: Actions = Field(default_factory=list)
    on_success: Actions | None = Field(default=None, alias="onSuccess")
    on_error: Actions | None = Field(default=None, alias="onError")
    result: dict[str, Any]
    _tool_ref: Callable[..., Any] | None = PrivateAttr(default=None)

    def __init__(self, tool: str | Callable[..., Any] | None = None, **kwargs: Any):
        if isinstance(tool, str):
            if "name" in kwargs:
                raise ValueError("Supply a browser tool name only once")
            kwargs["name"] = tool
        elif tool is not None and not callable(tool):
            raise TypeError("AppTool expects a registered callable or tool name")
        super().__init__(**kwargs)
        if callable(tool):
            if "actions" in self.model_fields_set:
                raise ValueError("Callable AppTool generates its own actions")
            self._tool_ref = tool
        else:
            if self.name is None:
                raise ValueError("Browser AppTool requires a name")
            if self.on_success is not None or self.on_error is not None:
                raise ValueError("Put browser-only callbacks on the individual actions")

    def invoke(self, **arguments: Any) -> InvokeAppTool:
        """Build a local action invoking this definition with the given arguments.

        Include the definition in `PrefabApp.app_tools`. Arguments may use
        reactive expressions; they are evaluated when the UI interaction occurs.
        """
        return InvokeAppTool(self, arguments=arguments)

    def _resolve(self) -> ResolvedTool:
        from prefab_ui.app import get_tool_resolver

        resolver = get_tool_resolver()
        if resolver is None:
            raise ValueError(
                "Callable AppTool requires a tool_resolver during serialization"
            )
        return resolver(self._tool_ref)

    def _resolve_name(self) -> str:
        name = self.name
        if name is None and self._tool_ref is not None:
            name = self._resolve().local_name
        if name is None:
            raise ValueError(
                "AppTool resolver must supply local_name, or specify name="
            )
        return _name_adapter.validate_python(name)

    @field_validator("input_schema", mode="before")
    @classmethod
    def _input_schema(cls, value: Any) -> dict[str, Any]:
        if isinstance(value, type) and issubclass(value, BaseModel):
            value = value.model_json_schema()
        if not isinstance(value, dict) or value.get("type") != "object":
            raise ValueError("input_schema must describe an object")
        return value

    @model_serializer(mode="wrap")
    def _serialize(self, handler: Any) -> dict[str, Any]:
        data = handler(self)
        on_success = data.pop("onSuccess", data.pop("on_success", None))
        on_error = data.pop("onError", data.pop("on_error", None))
        if self._tool_ref is not None:
            resolved = self._resolve()
            name = self.name if self.name is not None else resolved.local_name
            if name is None:
                raise ValueError(
                    "AppTool resolver must supply local_name, or specify name="
                )
            data["name"] = _name_adapter.validate_python(name)
            if (
                "description" not in self.model_fields_set
                and resolved.description is not None
            ):
                data["description"] = resolved.description
            schema = (
                self.input_schema
                if "input_schema" in self.model_fields_set
                else resolved.input_schema
            )
            if schema is None:
                raise ValueError(
                    "AppTool resolver must supply input_schema, or specify input_schema="
                )
            key = "inputSchema" if "inputSchema" in data else "input_schema"
            data[key] = _exposed_schema(schema, self.bind)
            # Forward the argument object itself: omitted optional parameters
            # stay absent, allowing the backend's defaults to take effect.
            action: dict[str, Any] = {
                "action": "toolCall",
                "tool": resolved.name,
                "arguments": "{{ $event }}",
            }
            if resolved.unwrap_result:
                action["unwrapResult"] = True
            if on_success is not None:
                action["onSuccess"] = on_success
            if on_error is not None:
                action["onError"] = on_error
            data["actions"] = action
        if not self.bind:
            data.pop("bind", None)
        return _coerce_rx(data)  # type: ignore[return-value]  # ty:ignore[invalid-return-type]
