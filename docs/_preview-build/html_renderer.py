"""Render component JSON trees to static HTML for doc previews.

Takes the dict output of Component.to_json() and produces HTML with Tailwind
utility classes matching what the real React/shadcn renderer produces. Used by
render_previews.py and generate_content.py.

Class strings are derived from mcp-apps-renderer/src/style-nova.css (the
@apply content of each cn-* class) plus the component TSX files. When shadcn
is upgraded, update the class mappings here to match.
"""

from __future__ import annotations

from html import escape
from typing import Any

# ---------------------------------------------------------------------------
#  Class string constants (from style-nova.css @apply + component cva bases)
# ---------------------------------------------------------------------------

# Button -------------------------------------------------------------------

_BUTTON_BASE = (
    "focus-visible:border-ring focus-visible:ring-ring/50"
    " aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
    " aria-invalid:border-destructive dark:aria-invalid:border-destructive/50"
    " rounded-lg border border-transparent bg-clip-padding text-sm font-medium"
    " focus-visible:ring-[3px] aria-invalid:ring-[3px]"
    " [&_svg:not([class*='size-'])]:size-4"
    # cva base
    " inline-flex items-center justify-center whitespace-nowrap transition-all"
    " disabled:pointer-events-none disabled:opacity-50"
    " [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0"
    " outline-none group/button select-none"
)

_BUTTON_VARIANTS: dict[str, str] = {
    "default": "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
    "outline": (
        "border-border bg-background hover:bg-muted hover:text-foreground"
        " dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
        " aria-expanded:bg-muted aria-expanded:text-foreground"
    ),
    "secondary": (
        "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        " aria-expanded:bg-secondary aria-expanded:text-secondary-foreground"
    ),
    "ghost": (
        "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50"
        " aria-expanded:bg-muted aria-expanded:text-foreground"
    ),
    "destructive": (
        "bg-destructive/10 hover:bg-destructive/20"
        " focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
        " dark:bg-destructive/20 text-destructive"
        " focus-visible:border-destructive/40 dark:hover:bg-destructive/30"
    ),
    "link": "text-primary underline-offset-4 hover:underline",
    "success": (
        "bg-success/10 hover:bg-success/20"
        " focus-visible:ring-success/20 dark:focus-visible:ring-success/40"
        " dark:bg-success/20 text-success"
        " focus-visible:border-success/40 dark:hover:bg-success/30"
    ),
    "warning": (
        "bg-warning/10 hover:bg-warning/20"
        " focus-visible:ring-warning/20 dark:focus-visible:ring-warning/40"
        " dark:bg-warning/20 text-warning"
        " focus-visible:border-warning/40 dark:hover:bg-warning/30"
    ),
    "info": (
        "bg-info/10 hover:bg-info/20"
        " focus-visible:ring-info/20 dark:focus-visible:ring-info/40"
        " dark:bg-info/20 text-info"
        " focus-visible:border-info/40 dark:hover:bg-info/30"
    ),
}

# For success/warning/info, use the focus-visible:ring-ring/50 variant
# (destructive overrides to destructive ring, others keep default ring)
_BUTTON_VARIANT_RING_OVERRIDE = {"destructive", "success", "warning", "info"}

_BUTTON_SIZES: dict[str, str] = {
    "default": (
        "h-8 gap-1.5 px-2.5"
        " has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2"
    ),
    "xs": (
        "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs"
        " in-data-[slot=button-group]:rounded-lg"
        " has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5"
        " [&_svg:not([class*='size-'])]:size-3"
    ),
    "sm": (
        "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem]"
        " in-data-[slot=button-group]:rounded-lg"
        " has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5"
        " [&_svg:not([class*='size-'])]:size-3.5"
    ),
    "lg": (
        "h-9 gap-1.5 px-2.5"
        " has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3"
    ),
    "icon": "size-8",
    "icon-xs": (
        "size-6 rounded-[min(var(--radius-md),10px)]"
        " in-data-[slot=button-group]:rounded-lg"
        " [&_svg:not([class*='size-'])]:size-3"
    ),
    "icon-sm": (
        "size-7 rounded-[min(var(--radius-md),12px)]"
        " in-data-[slot=button-group]:rounded-lg"
    ),
    "icon-lg": "size-9",
}


# Badge --------------------------------------------------------------------

_BADGE_BASE = (
    "inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0"
    " [&>svg]:pointer-events-none focus-visible:border-ring"
    " focus-visible:ring-ring/50 focus-visible:ring-[3px]"
    " aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
    " aria-invalid:border-destructive overflow-hidden group/badge"
    # cn-badge
    " h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5"
    " text-xs font-medium transition-all"
    " has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5"
    " [&>svg]:size-3!"
)

_BADGE_VARIANTS: dict[str, str] = {
    "default": "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
    "secondary": "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
    "outline": "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
    "destructive": (
        "bg-destructive/10 [a]:hover:bg-destructive/20"
        " focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
        " text-destructive dark:bg-destructive/20"
    ),
    "ghost": "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
    "link": "text-primary underline-offset-4 hover:underline",
    "success": "bg-[var(--success)]/10 text-[var(--success)] dark:bg-[var(--success)]/20",
    "warning": "bg-[var(--warning)]/10 text-[var(--warning)] dark:bg-[var(--warning)]/20",
    "info": "bg-[var(--info)]/10 text-[var(--info)] dark:bg-[var(--info)]/20",
}


# Card ---------------------------------------------------------------------

_CARD_CLS = (
    "ring-foreground/10 bg-card text-card-foreground gap-4 overflow-hidden"
    " rounded-xl py-4 text-sm ring-1 has-data-[slot=card-footer]:pb-0"
    " has-[>img:first-child]:pt-0"
    " group/card flex flex-col"
)
_CARD_HEADER_CLS = (
    "grid auto-rows-min items-start"
    " has-data-[slot=card-action]:grid-cols-[1fr_auto]"
    " has-data-[slot=card-description]:grid-rows-[auto_auto]"
    " @container/card-header"
    # cn-card-header
    " gap-1 rounded-t-xl px-4"
)
_CARD_TITLE_CLS = "text-base leading-snug font-medium"
_CARD_DESCRIPTION_CLS = "text-muted-foreground text-sm"
_CARD_CONTENT_CLS = "px-4"
_CARD_FOOTER_CLS = "bg-muted/50 rounded-b-xl border-t p-4 flex items-center"


# Alert --------------------------------------------------------------------

_ALERT_BASE = (
    "w-full relative group/alert"
    " grid gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm"
    " has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18"
    " has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2"
    " *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current"
    " *:[svg:not([class*='size-'])]:size-4"
)

_ALERT_VARIANTS: dict[str, str] = {
    "default": "bg-card text-card-foreground",
    "destructive": "text-destructive bg-card *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
    "success": "text-[var(--success)] bg-card",
    "warning": "text-[var(--warning)] bg-card",
    "info": "text-[var(--info)] bg-card",
}

_ALERT_TITLE_CLS = "font-medium group-has-[>svg]/alert:col-start-2"
_ALERT_DESCRIPTION_CLS = "text-muted-foreground text-sm text-balance md:text-pretty [&_p:not(:last-child)]:mb-4"


# Form components ----------------------------------------------------------

_INPUT_CLS = (
    "dark:bg-input/30 border-input focus-visible:border-ring"
    " focus-visible:ring-ring/50 aria-invalid:ring-destructive/20"
    " dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
    " dark:aria-invalid:border-destructive/50"
    " disabled:bg-input/50 dark:disabled:bg-input/80"
    " h-8 rounded-lg border bg-transparent px-2.5 py-1 text-base"
    " transition-colors file:h-6 file:text-sm file:font-medium"
    " focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm"
)

_TEXTAREA_CLS = (
    "border-input dark:bg-input/30 focus-visible:border-ring"
    " focus-visible:ring-ring/50 aria-invalid:ring-destructive/20"
    " dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
    " dark:aria-invalid:border-destructive/50"
    " disabled:bg-input/50 dark:disabled:bg-input/80"
    " rounded-lg border bg-transparent px-2.5 py-2 text-base"
    " transition-colors focus-visible:ring-[3px] aria-invalid:ring-[3px]"
    " md:text-sm"
)

_LABEL_CLS = "gap-2 text-sm leading-none font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50"

_CHECKBOX_CLS = (
    "border-input dark:bg-input/30"
    " data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
    " dark:data-[state=checked]:bg-primary"
    " data-[state=checked]:border-primary"
    " focus-visible:border-ring focus-visible:ring-ring/50"
    " aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
    " flex size-4 items-center justify-center rounded-[4px] border"
    " transition-colors focus-visible:ring-[3px] aria-invalid:ring-[3px]"
)

_SWITCH_CLS = (
    "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
    " focus-visible:border-ring focus-visible:ring-ring/50"
    " aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
    " dark:data-[state=unchecked]:bg-input/80"
    " shrink-0 rounded-full border border-transparent"
    " focus-visible:ring-[3px] aria-invalid:ring-[3px]"
    " h-[18.4px] w-[32px]"
)

_SELECT_TRIGGER_CLS = (
    "border-input data-[placeholder]:text-muted-foreground"
    " dark:bg-input/30 dark:hover:bg-input/50"
    " focus-visible:border-ring focus-visible:ring-ring/50"
    " aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
    " gap-1.5 rounded-lg border bg-transparent py-2 pr-2 pl-2.5 text-sm"
    " transition-colors select-none focus-visible:ring-[3px]"
    " aria-invalid:ring-[3px] h-8"
    " inline-flex items-center justify-between w-full"
)

_SEPARATOR_CLS = "bg-border shrink-0"

_SLIDER_CLS = "relative flex w-full touch-none select-none items-center"


# ButtonGroup --------------------------------------------------------------

_BUTTON_GROUP_H = (
    "flex w-fit items-stretch"
    " [&>*:not(:first-child)]:rounded-l-none"
    " [&>*:not(:last-child)]:rounded-r-none"
    " [&>*+*]:border-l-0"
)
_BUTTON_GROUP_V = (
    "flex flex-col w-fit items-stretch"
    " [&>*:not(:first-child)]:rounded-t-none"
    " [&>*:not(:last-child)]:rounded-b-none"
    " [&>*+*]:border-t-0"
)


# ---------------------------------------------------------------------------
#  Helpers
# ---------------------------------------------------------------------------


def _cls(*parts: str | None) -> str:
    """Merge non-empty class string fragments.

    Implements minimal tailwind-merge logic: when a later fragment overrides a
    border-color (e.g. ``border-border`` vs ``border-transparent``), the earlier
    one is stripped so the override wins regardless of CSS source order.
    """
    merged = " ".join(p for p in parts if p)
    # If a real border color class appears, remove the transparent override
    if "border-border" in merged or "border-input" in merged:
        merged = merged.replace("border-transparent", "").strip()
        # collapse any double spaces
        while "  " in merged:
            merged = merged.replace("  ", " ")
    return merged


def _gap_style(gap: int | list[int | None] | None) -> str:
    """Convert gap to inline CSS style string (matching React layout.tsx)."""
    if gap is None:
        return ""
    if isinstance(gap, (int, float)):
        return f"gap: {gap * 0.25}rem"
    # [x, y] tuple
    parts: list[str] = []
    if gap[0] is not None:
        parts.append(f"column-gap: {gap[0] * 0.25}rem")
    if gap[1] is not None:
        parts.append(f"row-gap: {gap[1] * 0.25}rem")
    return "; ".join(parts)


def _style_attr(style: str) -> str:
    """Build a style='...' attribute string, or empty string."""
    return f' style="{escape(style)}"' if style else ""


def _text(node: dict[str, Any]) -> str:
    """Extract text content from a node, HTML-escaped."""
    return escape(
        str(node.get("text") or node.get("content") or node.get("label") or "")
    )


def _children_html(node: dict[str, Any]) -> str:
    """Render all children of a node."""
    children = node.get("children")
    if not children:
        return ""
    return "".join(render_json(c) for c in children)


# ---------------------------------------------------------------------------
#  Component renderers
# ---------------------------------------------------------------------------


def _render_row(n: dict[str, Any]) -> str:
    gap = _gap_style(n.get("gap"))
    cls = _cls("flex flex-row", n.get("cssClass"))
    return f'<div class="{cls}"{_style_attr(gap)}>{_children_html(n)}</div>'


def _render_column(n: dict[str, Any]) -> str:
    gap = _gap_style(n.get("gap"))
    cls = _cls("flex flex-col", n.get("cssClass"))
    return f'<div class="{cls}"{_style_attr(gap)}>{_children_html(n)}</div>'


def _render_grid(n: dict[str, Any]) -> str:
    parts: list[str] = []
    cols = n.get("columns")
    if cols:
        parts.append(f"grid-template-columns: repeat({cols}, minmax(0, 1fr))")
    gap = _gap_style(n.get("gap"))
    if gap:
        parts.append(gap)
    cls = _cls("grid", n.get("cssClass"))
    return (
        f'<div class="{cls}"{_style_attr("; ".join(parts))}>{_children_html(n)}</div>'
    )


def _render_div(n: dict[str, Any]) -> str:
    cls = n.get("cssClass") or ""
    inner = _children_html(n) or _text(n)
    return f'<div class="{cls}">{inner}</div>' if cls else f"<div>{inner}</div>"


def _render_span(n: dict[str, Any]) -> str:
    cls = n.get("cssClass") or ""
    inner = _children_html(n) or _text(n)
    return f'<span class="{cls}">{inner}</span>' if cls else f"<span>{inner}</span>"


def _render_text(n: dict[str, Any]) -> str:
    cls = n.get("cssClass") or ""
    txt = _text(n)
    return f'<span class="{cls}">{txt}</span>' if cls else f"<span>{txt}</span>"


def _render_heading(n: dict[str, Any]) -> str:
    level = n.get("level", 1)
    styles = {
        1: "text-3xl font-semibold tracking-tight",
        2: "text-2xl font-semibold tracking-tight",
        3: "text-xl font-semibold tracking-tight",
        4: "text-lg font-semibold tracking-tight",
    }
    cls = _cls(styles.get(level, styles[1]), n.get("cssClass"))
    tag = f"h{level}"
    txt = _text(n) or _children_html(n)
    return f'<{tag} class="{cls}">{txt}</{tag}>'


def _render_typography(tag: str, base_cls: str, n: dict[str, Any]) -> str:
    cls = _cls(base_cls, n.get("cssClass"))
    txt = _text(n) or _children_html(n)
    return f'<{tag} class="{cls}">{txt}</{tag}>'


def _render_button(n: dict[str, Any]) -> str:
    variant = n.get("variant", "default")
    size = n.get("size", "default")
    disabled = n.get("disabled", False)

    variant_cls = _BUTTON_VARIANTS.get(variant, _BUTTON_VARIANTS["default"])
    size_cls = _BUTTON_SIZES.get(size, _BUTTON_SIZES["default"])

    # For non-destructive colored variants, keep the default ring behavior
    base = _BUTTON_BASE
    if variant in _BUTTON_VARIANT_RING_OVERRIDE:
        base = base.replace("focus-visible:ring-ring/50 ", "")

    cls = _cls(base, variant_cls, size_cls, n.get("cssClass"))
    disabled_attr = " disabled" if disabled else ""
    label = escape(n.get("label", ""))
    return f'<button data-slot="button" class="{cls}"{disabled_attr}>{label}</button>'


def _render_badge(n: dict[str, Any]) -> str:
    variant = n.get("variant", "default")
    variant_cls = _BADGE_VARIANTS.get(variant, _BADGE_VARIANTS["default"])
    cls = _cls(_BADGE_BASE, variant_cls, n.get("cssClass"))
    label = escape(n.get("label", ""))
    return (
        f'<span data-slot="badge" data-variant="{variant}" class="{cls}">{label}</span>'
    )


def _render_card(n: dict[str, Any]) -> str:
    cls = _cls(_CARD_CLS, n.get("cssClass"))
    return f'<div data-slot="card" class="{cls}">{_children_html(n)}</div>'


def _render_card_header(n: dict[str, Any]) -> str:
    cls = _cls(_CARD_HEADER_CLS, n.get("cssClass"))
    return f'<div data-slot="card-header" class="{cls}">{_children_html(n)}</div>'


def _render_card_title(n: dict[str, Any]) -> str:
    cls = _cls(_CARD_TITLE_CLS, n.get("cssClass"))
    return f'<div data-slot="card-title" class="{cls}">{_text(n)}</div>'


def _render_card_description(n: dict[str, Any]) -> str:
    cls = _cls(_CARD_DESCRIPTION_CLS, n.get("cssClass"))
    return f'<div data-slot="card-description" class="{cls}">{_text(n)}</div>'


def _render_card_content(n: dict[str, Any]) -> str:
    cls = _cls(_CARD_CONTENT_CLS, n.get("cssClass"))
    return f'<div data-slot="card-content" class="{cls}">{_children_html(n)}</div>'


def _render_card_footer(n: dict[str, Any]) -> str:
    cls = _cls(_CARD_FOOTER_CLS, n.get("cssClass"))
    return f'<div data-slot="card-footer" class="{cls}">{_children_html(n)}</div>'


def _render_alert(n: dict[str, Any]) -> str:
    variant = n.get("variant", "default")
    variant_cls = _ALERT_VARIANTS.get(variant, _ALERT_VARIANTS["default"])
    cls = _cls(_ALERT_BASE, variant_cls, n.get("cssClass"))
    return (
        f'<div data-slot="alert" role="alert" class="{cls}">{_children_html(n)}</div>'
    )


def _render_alert_title(n: dict[str, Any]) -> str:
    cls = _cls(_ALERT_TITLE_CLS, n.get("cssClass"))
    return f'<div data-slot="alert-title" class="{cls}">{_text(n)}</div>'


def _render_alert_description(n: dict[str, Any]) -> str:
    cls = _cls(_ALERT_DESCRIPTION_CLS, n.get("cssClass"))
    return f'<div data-slot="alert-description" class="{cls}">{_text(n)}</div>'


def _render_input(n: dict[str, Any]) -> str:
    cls = _cls(_INPUT_CLS, n.get("cssClass"))
    input_type = n.get("inputType") or n.get("type", "text")
    if input_type == "Input":
        input_type = "text"
    placeholder = n.get("placeholder", "")
    disabled = " disabled" if n.get("disabled") else ""
    name = f' name="{escape(n["name"])}"' if n.get("name") else ""
    return (
        f'<input data-slot="input" type="{escape(input_type)}"'
        f' class="{cls}" placeholder="{escape(placeholder)}"{name}{disabled} />'
    )


def _render_textarea(n: dict[str, Any]) -> str:
    cls = _cls(_TEXTAREA_CLS, n.get("cssClass"))
    placeholder = n.get("placeholder", "")
    disabled = " disabled" if n.get("disabled") else ""
    name = f' name="{escape(n["name"])}"' if n.get("name") else ""
    return (
        f'<textarea data-slot="textarea" class="{cls}"'
        f' placeholder="{escape(placeholder)}"{name}{disabled}></textarea>'
    )


def _render_label(n: dict[str, Any]) -> str:
    cls = _cls(_LABEL_CLS, n.get("cssClass"))
    txt = escape(n.get("text") or n.get("content") or "")
    return f'<label data-slot="label" class="{cls}">{txt}</label>'


def _render_checkbox(n: dict[str, Any]) -> str:
    label = n.get("label")
    checked = n.get("checked", False)
    name = n.get("name")
    disabled = n.get("disabled", False)

    state = "checked" if checked else "unchecked"
    disabled_attr = " disabled" if disabled else ""
    name_attr = f' name="{escape(name)}"' if name else ""
    id_attr = f' id="checkbox-{escape(name)}"' if name else ""
    # Checked indicator: SVG checkmark matching shadcn's CheckIcon
    check_svg = (
        (
            '<svg class="size-3.5 text-current" xmlns="http://www.w3.org/2000/svg"'
            ' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"'
            ' stroke-linecap="round" stroke-linejoin="round">'
            '<path d="M20 6 9 17l-5-5"/></svg>'
        )
        if checked
        else ""
    )
    cb = (
        f'<button role="checkbox" data-state="{state}"'
        f' class="{_CHECKBOX_CLS}"{id_attr}{name_attr}{disabled_attr}>'
        f"{check_svg}</button>"
    )
    if label:
        label_for = f' for="checkbox-{escape(name)}"' if name else ""
        return (
            f'<div class="flex items-center space-x-2">{cb}'
            f'<label class="{_LABEL_CLS} cursor-pointer"{label_for}>{escape(label)}</label>'
            f"</div>"
        )
    return cb


def _render_switch(n: dict[str, Any]) -> str:
    label = n.get("label")
    checked = n.get("checked", False)
    name = n.get("name")

    state = "checked" if checked else "unchecked"
    name_attr = f' name="{escape(name)}"' if name else ""
    id_attr = f' id="switch-{escape(name)}"' if name else ""
    sw = (
        f'<button role="switch" data-state="{state}"'
        f' class="{_SWITCH_CLS}"{id_attr}{name_attr}>'
        f"</button>"
    )
    if label:
        label_for = f' for="switch-{escape(name)}"' if name else ""
        return (
            f'<div class="flex items-center space-x-2">{sw}'
            f'<label class="{_LABEL_CLS} cursor-pointer"{label_for}>{escape(label)}</label>'
            f"</div>"
        )
    return sw


def _render_radio_group(n: dict[str, Any]) -> str:
    name = n.get("name")
    items = n.get("children", [])
    inner_parts: list[str] = []
    for item in items:
        if item.get("type") != "Radio":
            continue
        value = item.get("value", "")
        label = item.get("label", "")
        checked = item.get("checked", False)
        radio_id = f"radio-{name or ''}-{value}"
        state = "checked" if checked else "unchecked"
        radio_cls = (
            "border-input text-primary dark:bg-input/30"
            " focus-visible:border-ring focus-visible:ring-ring/50"
            " flex size-4 rounded-full focus-visible:ring-[3px]"
        )
        radio_el = f'<button role="radio" data-state="{state}" class="{radio_cls}" id="{escape(radio_id)}"></button>'
        if label:
            label_el = f'<label class="{_LABEL_CLS} cursor-pointer" for="{escape(radio_id)}">{escape(label)}</label>'
            inner_parts.append(
                f'<div class="flex items-center space-x-2">{radio_el}{label_el}</div>'
            )
        else:
            inner_parts.append(radio_el)

    cls = _cls("grid gap-2", n.get("cssClass"))
    return f'<div role="radiogroup" class="{cls}">{"".join(inner_parts)}</div>'


def _render_select(n: dict[str, Any]) -> str:
    placeholder = n.get("placeholder", "")
    cls = _cls(_SELECT_TRIGGER_CLS, n.get("cssClass"))
    return (
        f'<button data-slot="select-trigger" class="{cls}">'
        f'<span data-slot="select-value" data-placeholder class="flex flex-1 text-left">'
        f"{escape(placeholder)}</span>"
        f'<svg class="text-muted-foreground size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>'
        f"</button>"
    )


def _render_slider(n: dict[str, Any]) -> str:
    cls = _cls(_SLIDER_CLS, n.get("cssClass"))
    return (
        f'<div class="{cls}" data-orientation="horizontal">'
        f'<span class="bg-muted relative rounded-full data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full" data-orientation="horizontal">'
        f'<span class="bg-primary absolute rounded-full data-[orientation=horizontal]:h-full" style="left: 0%; right: 50%;" data-orientation="horizontal"></span>'
        f"</span>"
        f'<span class="border-ring ring-ring/50 relative size-3 rounded-full border bg-white"></span>'
        f"</div>"
    )


def _render_separator(n: dict[str, Any]) -> str:
    orientation = n.get("orientation", "horizontal")
    orient_cls = "h-px w-full" if orientation == "horizontal" else "h-full w-px"
    cls = _cls(_SEPARATOR_CLS, orient_cls, n.get("cssClass"))
    return (
        f'<div role="separator" data-orientation="{orientation}" class="{cls}"></div>'
    )


def _render_button_group(n: dict[str, Any]) -> str:
    orientation = n.get("orientation", "horizontal")
    base = _BUTTON_GROUP_H if orientation == "horizontal" else _BUTTON_GROUP_V
    cls = _cls(base, n.get("cssClass"))
    return (
        f'<div role="group" data-slot="button-group" data-orientation="{orientation}" class="{cls}">'
        f"{_children_html(n)}</div>"
    )


def _render_code(n: dict[str, Any]) -> str:
    cls = _cls("rounded-md bg-muted p-4 text-sm overflow-x-auto", n.get("cssClass"))
    code = escape(n.get("code") or n.get("content") or "")
    return f'<pre class="{cls}"><code>{code}</code></pre>'


def _render_image(n: dict[str, Any]) -> str:
    src = escape(n.get("src", ""))
    alt = escape(n.get("alt", ""))
    cls = n.get("cssClass") or ""
    style_parts: list[str] = []
    if n.get("width"):
        style_parts.append(f"width: {n['width']}")
    if n.get("height"):
        style_parts.append(f"height: {n['height']}")
    cls_attr = f' class="{cls}"' if cls else ""
    style = _style_attr("; ".join(style_parts))
    return f'<img src="{src}" alt="{alt}"{cls_attr}{style} />'


def _render_markdown(n: dict[str, Any]) -> str:
    cls = _cls("prose dark:prose-invert max-w-none", n.get("cssClass"))
    txt = escape(n.get("content") or n.get("text") or "")
    return f'<div class="{cls}">{txt}</div>'


def _render_foreach(n: dict[str, Any]) -> str:
    # ForEach renders its template children once (no data expansion in static preview)
    return _children_html(n)


# ---------------------------------------------------------------------------
#  Dispatcher
# ---------------------------------------------------------------------------

_RENDERERS: dict[str, Any] = {
    # Layout
    "Row": _render_row,
    "Column": _render_column,
    "Grid": _render_grid,
    "Div": _render_div,
    "Span": _render_span,
    # Typography
    "Text": _render_text,
    "Heading": _render_heading,
    "H1": lambda n: _render_typography(
        "h1", "text-3xl font-semibold tracking-tight", n
    ),
    "H2": lambda n: _render_typography(
        "h2", "text-2xl font-semibold tracking-tight", n
    ),
    "H3": lambda n: _render_typography("h3", "text-xl font-semibold tracking-tight", n),
    "H4": lambda n: _render_typography("h4", "text-lg font-semibold tracking-tight", n),
    "P": lambda n: _render_typography("p", "leading-7", n),
    "Lead": lambda n: _render_typography("p", "text-xl text-muted-foreground", n),
    "Large": lambda n: _render_typography("div", "text-lg font-semibold", n),
    "Small": lambda n: _render_typography(
        "small", "text-sm font-medium leading-none", n
    ),
    "Muted": lambda n: _render_typography("p", "text-sm text-muted-foreground", n),
    "InlineCode": lambda n: _render_typography(
        "code",
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        n,
    ),
    "BlockQuote": lambda n: _render_typography(
        "blockquote", "mt-6 border-l-2 pl-6 italic", n
    ),
    # Interactive
    "Button": _render_button,
    "Badge": _render_badge,
    "ButtonGroup": _render_button_group,
    # Card
    "Card": _render_card,
    "CardHeader": _render_card_header,
    "CardTitle": _render_card_title,
    "CardDescription": _render_card_description,
    "CardContent": _render_card_content,
    "CardFooter": _render_card_footer,
    # Alert
    "Alert": _render_alert,
    "AlertTitle": _render_alert_title,
    "AlertDescription": _render_alert_description,
    # Form
    "Input": _render_input,
    "Textarea": _render_textarea,
    "Label": _render_label,
    "Checkbox": _render_checkbox,
    "Switch": _render_switch,
    "RadioGroup": _render_radio_group,
    "Radio": lambda n: "",  # consumed by RadioGroup
    "Select": _render_select,
    "SelectOption": lambda n: "",  # consumed by Select
    "Slider": _render_slider,
    # Display
    "Separator": _render_separator,
    "Code": _render_code,
    "Image": _render_image,
    "Markdown": _render_markdown,
    # Control flow
    "ForEach": _render_foreach,
}


def render_json(node: dict[str, Any]) -> str:
    """Render a component JSON tree to an HTML string."""
    comp_type = node.get("type", "")
    renderer = _RENDERERS.get(comp_type)
    if renderer is None:
        # Unknown type — render children if any, otherwise return empty
        return _children_html(node)
    return renderer(node)
