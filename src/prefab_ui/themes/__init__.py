"""Theme configuration for Prefab applications.

Themes customize the visual appearance of Prefab UIs.  Each theme has
three CSS layers:

- `light_css` -- CSS declarations scoped to light mode (injected inside `:root {}`)
- `dark_css` -- CSS declarations scoped to dark mode (injected inside `.dark {}`)
- `css` -- arbitrary CSS injected as-is (for component class overrides, gradients, etc.)

The `accent` field accepts an OKLCH hue (0-360) and injects `--accent-hue`
into both light and dark, making it available as `var(--accent-hue)` throughout
the theme CSS.  Use `Accent` constants for named hues.

Usage::

    from prefab_ui import PrefabApp
    from prefab_ui.themes import Accent, Basic, Presentation, Theme

    # Single-hue theme
    app = PrefabApp(view=my_view, theme=Basic(accent=Accent.GREEN))

    # Always-dark data dashboard theme
    app = PrefabApp(view=my_view, theme=Presentation())

    # Custom declarations
    app = PrefabApp(
        view=my_view,
        theme=Theme(
            light_css="--primary: oklch(0.6 0.24 260);",
            dark_css="--primary: oklch(0.7 0.18 260);",
        ),
    )

If `dark_css` is omitted, the `light_css` values are used for both modes.

For backwards compatibility, `light_css` and `dark_css` also accept dicts
of CSS variable overrides (`{"primary": "oklch(...)"}``), which are
automatically converted to declaration strings.
"""

from prefab_ui.themes.base import Accent, Theme
from prefab_ui.themes.basic import Basic
from prefab_ui.themes.presentation import Presentation

__all__ = ["Accent", "Basic", "Presentation", "Theme"]
