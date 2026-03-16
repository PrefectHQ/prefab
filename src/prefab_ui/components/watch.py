"""Watch component — trigger actions when state keys change.

Watchers centralize reactivity: instead of wiring ``on_change`` on every
component that touches a key, declare a watcher that fires whenever the
key's value changes::

    Watch("slider_a", on_change=SetState("normalized_a", "{{ slider_a / total * 100 }}"))

The watcher is a non-visual component. Place it anywhere in the tree
(typically at the top level) and it monitors the specified state key,
dispatching its actions whenever the value differs from the previous
render cycle.
"""

from __future__ import annotations

from typing import Any, Literal

from pydantic import Field, SerializeAsAny

from prefab_ui.actions.base import Action
from prefab_ui.components.base import Component
from prefab_ui.rx import Rx, RxStr


class Watch(Component):
    """Trigger actions when a state key changes.

    ``Watch`` inverts the typical reactivity model: instead of attaching
    ``on_change`` to every component that writes a key, you declare one
    watcher per key and let it react to changes from any source.

    Accepts a single key or a template expression. When the watched value
    changes between renders, ``on_change`` fires with the new value as
    ``$event``::

        Watch("theme", on_change=SetState("chart_colors", "{{ theme_palette }}"))
        Watch("items", on_change=ShowToast("Items updated"))

    Multiple watchers can observe different keys. Cascading is supported
    (Watcher A updates key X, triggering Watcher B) up to the renderer's
    depth limit.
    """

    type: Literal["Watch"] = "Watch"

    key: RxStr = Field(
        description="State key or template expression to watch for changes.",
    )

    on_change: SerializeAsAny[Action] | list[SerializeAsAny[Action]] | None = Field(
        default=None,
        alias="onChange",
        description="Action(s) to run when the watched value changes.",
    )

    def __init__(
        self,
        key: str | Rx | None = None,
        *,
        on_change: Action | list[Action] | None = None,
        **kwargs: Any,
    ) -> None:
        if key is not None:
            kwargs["key"] = str(key) if isinstance(key, Rx) else key
        if on_change is not None:
            kwargs["on_change"] = on_change
        super().__init__(**kwargs)
