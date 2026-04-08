"""Keyboard shortcuts dialog helper.

Builds a Dialog component displaying registered keyboard shortcuts
with Kbd key indicators. Pure Python composition — no renderer-side
logic needed.

```python
from prefab_ui.shortcuts import KeyboardShortcutsDialog

KeyboardShortcutsDialog({
    "ArrowRight": "Next slide",
    "ArrowLeft": "Previous slide",
    "Shift+?": "Show shortcuts",
})
```
"""

from __future__ import annotations

from prefab_ui.actions import SetState
from prefab_ui.components import (
    Column,
    Dialog,
    Kbd,
    Row,
    Text,
)

# Map DOM key names to display symbols
_KEY_SYMBOLS: dict[str, str] = {
    "ArrowRight": "→",
    "ArrowLeft": "←",
    "ArrowUp": "↑",
    "ArrowDown": "↓",
    "Enter": "↵",
    "Escape": "Esc",
    "Backspace": "⌫",
    "Delete": "Del",
    "Tab": "⇥",
    " ": "Space",
    "Meta": "⌘",
    "Control": "Ctrl",
    "Ctrl": "Ctrl",
    "Shift": "⇧",
    "Alt": "Alt",
}


def _format_key(key: str) -> str:
    """Format a key binding string for display."""
    parts = key.split("+")
    symbols = [_KEY_SYMBOLS.get(p, p) for p in parts]
    return " + ".join(symbols)


def KeyboardShortcutsDialog(
    shortcuts: dict[str, str],
    *,
    name: str = "_show_shortcuts",
    title: str = "Keyboard Shortcuts",
    trigger_label: str = "?",
    trigger_variant: str = "ghost",
    trigger_size: str = "sm",
) -> SetState:
    """Build a Dialog listing keyboard shortcuts with Kbd indicators.

    The dialog is bound to a state variable (default `_show_shortcuts`)
    so it can be opened programmatically. Returns a `SetState` action
    for use in `key_bindings`:

    ```python
    help_action = KeyboardShortcutsDialog({
        "ArrowRight": "Next slide",
        "Shift+?": "Show shortcuts",
    })

    PrefabApp(
        key_bindings={"Shift+?": help_action},
    )
    ```

    No initial state setup needed — the dialog defaults to closed.

    Args:
        shortcuts: Mapping of key binding strings to human-readable
            descriptions. Keys use the same format as `key_bindings`
            on `PrefabApp`.
        name: State key to bind the dialog open state to.
        title: Dialog title.
        trigger_label: Label for the trigger button.
        trigger_variant: Button variant for the trigger.
        trigger_size: Button size for the trigger.

    Returns:
        A `SetState` action that opens the dialog, for use in
        `key_bindings`.
    """
    from prefab_ui.components import Button

    with Dialog(title=title, name=name):
        Button(
            trigger_label,
            variant=trigger_variant,
            size=trigger_size,
        )
        with Column(gap=3):
            for key, description in shortcuts.items():
                with Row(
                    css_class="justify-between items-center",
                    gap=4,
                ):
                    Text(description)
                    Kbd(_format_key(key))

    return SetState(name, True)
