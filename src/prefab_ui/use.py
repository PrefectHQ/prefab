"""Use — reference a defined component template.

A `Use` node references a `Define` template by
name. On the wire it desugars to `{"$ref": "name"}`, with optional `let`
bindings for scoped overrides, `cssClass` for styling, and accessible names.

**Example:**

```python
from prefab_ui.define import Define
from prefab_ui.use import Use
from prefab_ui.components import Card, Column, Heading, Badge

with Define("user-card") as user_card:
    with Card():
        Heading("{{ name }}")
        Badge("{{ role }}")

with Column() as layout:
    Use("user-card", name="Alice", role="Engineer")
    Use("user-card", name="Bob", role="Designer")
```
"""

from __future__ import annotations

from typing import Any

from pydantic import Field

from prefab_ui.components.base import Component

# Component base fields that should NOT be treated as state overrides.
_BASE_FIELDS = frozenset(Component.model_fields) | {"ariaLabel", "ariaLabelledBy"}


class Use(Component):
    """Reference a defined component template by name.

    Kwargs that aren't base component fields (`css_class`, `aria_label`,
    `aria_labelledby`)
    become scoped `let` bindings on the `$ref` node.

    Args:
        name: The template name (must match a `Define` name).
        aria_label: Accessible name for this template instance's root; accepts Rx strings.
        aria_labelledby: DOM label IDs for this instance's root; accepts Rx strings.
        **kwargs: Scoped bindings and/or base component fields.

    **Example:**

    ```python
    Use("record-button", record_id=1042, aria_label="Open record 1042")
    ```
    """

    # Use has a type field for Pydantic, but to_json() never emits it.
    type: str = "Use"
    name: str = Field(description="Template name to reference")
    overrides: dict[str, Any] = Field(default_factory=dict)

    def __init__(self, name: str, /, **kwargs: Any) -> None:
        init_kwargs: dict[str, Any] = {}
        override_kwargs: dict[str, Any] = {}
        for k, v in kwargs.items():
            if k in _BASE_FIELDS:
                init_kwargs[k] = v
            else:
                override_kwargs[k] = v
        init_kwargs["name"] = name
        init_kwargs["overrides"] = override_kwargs
        super().__init__(**init_kwargs)

    def to_json(self) -> dict[str, Any]:
        """Desugar to `$ref` with scoped bindings, styling, and accessible names."""
        ref: dict[str, Any] = {"$ref": self.name}

        base = super().to_json()
        for key in ("ariaLabel", "ariaLabelledBy"):
            if key in base:
                ref[key] = base[key]

        if self.overrides:
            ref["let"] = self.overrides
        if self.css_class:
            ref["cssClass"] = self.css_class

        return ref
