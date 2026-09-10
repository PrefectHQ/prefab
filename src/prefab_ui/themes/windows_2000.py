"""Windows 2000 theme — beveled gray chrome, VGA palette, square corners.

Inspired by Anders Swanson's (@dataders) Windows 2000 mod of Prefab, built
for his dashboard bake-off: https://github.com/dataders/fusion_issue_analysis
"""

from __future__ import annotations

from typing import Literal

from prefab_ui.themes.base import Theme

# Classic Win2K system colors. The bevel idiom is a two-step border: an outer
# highlight/shadow pair and an inner one, which is what gives controls their
# chiseled look. Expressed as inset box-shadows so they never affect layout.
_WIN2K_VARS = (
    "--radius: 0;"
    " --card-padding-y: 0.75rem;"
    " --layout-gap: 0.5rem;"
    # Desktop teal-blue, gray control face, black text
    " --background: #3a6ea5;"
    " --foreground: #000000;"
    " --card: #d4d0c8;"
    " --card-foreground: #000000;"
    " --popover: #d4d0c8;"
    " --popover-foreground: #000000;"
    # Selection navy — title bars, highlighted rows, focus
    " --primary: #0a246a;"
    " --primary-foreground: #ffffff;"
    " --secondary: #d4d0c8;"
    " --secondary-foreground: #000000;"
    " --muted: #d4d0c8;"
    " --muted-foreground: #404040;"
    " --accent: #0a246a;"
    " --accent-foreground: #ffffff;"
    " --border: #808080;"
    " --input: #ffffff;"
    " --ring: #0a246a;"
    # Status colors from the VGA 16
    " --destructive: #800000;"
    " --success: #008000;"
    " --warning: #808000;"
    " --info: #000080;"
    # Charts: navy, teal, maroon, olive, purple
    " --chart-1: #000080;"
    " --chart-2: #008080;"
    " --chart-3: #800000;"
    " --chart-4: #808000;"
    " --chart-5: #800080;"
    " --font-sans: Tahoma, 'MS Sans Serif', Verdana, Geneva, sans-serif;"
    # Bevel recipes, referenced throughout the CSS below
    " --w2k-raised: inset -1px -1px 0 0 #0a0a0a, inset 1px 1px 0 0 #ffffff,"
    " inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dfdfdf;"
    " --w2k-sunken: inset 1px 1px 0 0 #808080, inset -1px -1px 0 0 #ffffff,"
    " inset 2px 2px 0 0 #0a0a0a, inset -2px -2px 0 0 #dfdfdf;"
    " --w2k-pressed: inset 1px 1px 0 0 #0a0a0a, inset -1px -1px 0 0 #ffffff,"
    " inset 2px 2px 0 0 #808080, inset -2px -2px 0 0 #dfdfdf;"
)

_WIN2K_CSS = """\
/* Nothing in Windows 2000 has a rounded corner. `--radius: 0` handles most of
   it; this catches the utilities that hardcode a pill radius. Portal content
   (dialogs, tooltips, popovers) renders outside .pf-app-root, so match on the
   class prefix rather than descendants of the root. */
[class^="pf-"],
[class*=" pf-"] {
  border-radius: 0;
}

.pf-app-root {
  font-family: var(--font-sans);
  font-size: 12px;
  color: #000;
  padding: 0.75rem;
}

/* Cards read as raised panels. The ring utility would draw a rounded halo
   over the bevel, so drop it. */
.pf-card {
  background: #d4d0c8;
  box-shadow: var(--w2k-raised);
  --tw-ring-shadow: 0 0 #0000;
  padding: 3px;
}
.pf-card-header,
.pf-card-content,
.pf-card-footer {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.pf-card-title {
  font-size: 12px;
  font-weight: 700;
}
.pf-card-description {
  font-size: 11px;
  color: #404040;
}

/* Buttons: raised until pressed, then the bevel inverts and the label
   nudges down and right — the detail that sells it. */
.pf-button {
  background: #d4d0c8;
  color: #000;
  border: none;
  box-shadow: var(--w2k-raised);
  font-size: 12px;
  font-weight: 400;
  min-height: 23px;
  padding: 0 12px;
  transition: none;
}
.pf-button:hover {
  background: #d4d0c8;
}
.pf-button:active:not(:disabled) {
  box-shadow: var(--w2k-pressed);
  padding-top: 2px;
  padding-left: 13px;
  padding-right: 11px;
}
.pf-button:focus-visible {
  outline: 1px dotted #000;
  outline-offset: -4px;
  --tw-ring-shadow: 0 0 #0000;
}
.pf-button-variant-default {
  background: #d4d0c8;
  color: #000;
  font-weight: 700;
}
.pf-button-variant-default:hover {
  background: #d4d0c8;
  color: #000;
}
.pf-button-variant-ghost:not(:hover),
.pf-button-variant-link {
  box-shadow: none;
  background: transparent;
}
.pf-button-variant-link {
  color: #0000ee;
  text-decoration: underline;
}

/* Text entry is sunken and white — the universal "you can type here" cue. */
.pf-input,
.pf-textarea,
.pf-select-trigger,
.pf-combobox-trigger,
.pf-native-select {
  background: #ffffff;
  color: #000;
  border: none;
  box-shadow: var(--w2k-sunken);
  font-size: 12px;
  padding-left: 4px;
  transition: none;
}
.pf-input:focus-visible,
.pf-textarea:focus-visible,
.pf-select-trigger:focus-visible,
.pf-combobox-trigger:focus-visible {
  box-shadow: var(--w2k-sunken);
  --tw-ring-shadow: 0 0 #0000;
}
.pf-checkbox,
.pf-radio-group-item {
  background: #ffffff;
  border: none;
  box-shadow: var(--w2k-sunken);
}
.pf-checkbox[data-checked],
.pf-checkbox[data-state="checked"] {
  background: #ffffff;
  color: #000;
}
.pf-switch {
  background: #ffffff;
  box-shadow: var(--w2k-sunken);
  border: none;
}
.pf-switch-thumb {
  background: #d4d0c8;
  box-shadow: var(--w2k-raised);
}

/* Tables are list views: a sunken white well with raised column headers that
   look like the clickable sort buttons they are. */
.pf-table-container {
  background: #ffffff;
  box-shadow: var(--w2k-sunken);
  padding: 2px;
}
.pf-table {
  font-size: 12px;
}
.pf-table-head {
  background: #d4d0c8;
  box-shadow: var(--w2k-raised);
  color: #000;
  font-size: 11px;
  font-weight: 400;
  text-transform: none;
  letter-spacing: normal;
  height: 22px;
}
.pf-table-cell {
  padding: 3px 6px;
  color: #000;
}
.pf-table-row {
  border-color: #d4d0c8;
}
.pf-table-row:hover {
  background: #0a246a;
  color: #ffffff;
}
.pf-table-row:hover .pf-table-cell {
  color: #ffffff;
}

/* Segmented progress — the chunky blue blocks marching across a sunken well.
   Progress nests .pf-progress inside .pf-progress, so the well is drawn on the
   outer element and the inner one is flattened out of the way. The variant
   class sits on the indicator itself, so the fill rules double up the class to
   outrank the flat-fill CSS that `gradient=False` emits. */
.pf-progress,
.pf-progress-track {
  background: #ffffff;
  box-shadow: var(--w2k-sunken);
  height: 20px;
  padding: 3px;
}
.pf-progress .pf-progress,
.pf-progress .pf-progress-track {
  background: transparent;
  box-shadow: none;
  height: 100%;
  padding: 0;
}
.pf-progress-indicator.pf-progress-variant-default,
.pf-progress-indicator.pf-progress-variant-success,
.pf-progress-indicator.pf-progress-variant-warning,
.pf-progress-indicator.pf-progress-variant-destructive,
.pf-progress-indicator.pf-progress-variant-info,
.pf-progress-indicator.pf-progress-variant-muted {
  background-color: transparent;
  background-image: repeating-linear-gradient(
    to right,
    currentColor 0 10px,
    transparent 10px 12px
  );
}
.pf-progress-indicator.pf-progress-variant-default { color: #0a246a; }
.pf-progress-indicator.pf-progress-variant-success { color: #008000; }
.pf-progress-indicator.pf-progress-variant-warning { color: #808000; }
.pf-progress-indicator.pf-progress-variant-destructive { color: #800000; }
.pf-progress-indicator.pf-progress-variant-info { color: #000080; }
.pf-progress-indicator.pf-progress-variant-muted { color: #808080; }
.pf-progress-label,
.pf-progress-value {
  font-size: 11px;
  color: #000;
}

.pf-slider-track {
  background: #ffffff;
  box-shadow: var(--w2k-sunken);
  height: 4px;
}
.pf-slider-range {
  background: #0a246a;
}
.pf-slider-thumb {
  background: #d4d0c8;
  box-shadow: var(--w2k-raised);
  border: none;
  width: 11px;
  height: 21px;
}

/* Badges are tiny raised chips rather than pills. */
.pf-badge {
  background: #d4d0c8;
  color: #000;
  border: none;
  box-shadow: var(--w2k-raised);
  font-size: 11px;
  font-weight: 400;
  padding: 1px 7px;
}
.pf-badge-variant-default { color: #0a246a; font-weight: 700; }
.pf-badge-variant-success { color: #008000; }
.pf-badge-variant-warning { color: #808000; }
.pf-badge-variant-destructive { color: #800000; }
.pf-badge-variant-info { color: #000080; }

/* Notebook tabs — the active one sits proud of the strip. */
.pf-tabs-list {
  background: transparent;
  gap: 2px;
  padding: 0;
}
.pf-tabs-trigger {
  background: #d4d0c8;
  color: #000;
  box-shadow: var(--w2k-raised);
  font-size: 12px;
  padding: 3px 12px;
}
.pf-tabs-trigger[data-active] {
  background: #d4d0c8;
  font-weight: 700;
  padding-bottom: 5px;
}
.pf-tabs-content {
  background: #d4d0c8;
  box-shadow: var(--w2k-raised);
  padding: 0.75rem;
}

/* Dialogs are windows: gray face, navy title bar via .pf-dialog-header. */
.pf-dialog-content,
.pf-alert-dialog-content,
.pf-popover-content,
.pf-hover-card-content,
.pf-dropdown-menu-content,
.pf-select-content,
.pf-combobox-content,
.pf-command-dialog {
  background: #d4d0c8;
  color: #000;
  border: none;
  box-shadow: var(--w2k-raised);
  padding: 3px;
  font-size: 12px;
}
.pf-dialog-header,
.pf-alert-dialog-header {
  background: linear-gradient(90deg, #0a246a 0%, #a6caf0 100%);
  color: #ffffff;
  padding: 3px 4px;
  margin: 0 0 6px;
}
.pf-dialog-title,
.pf-alert-dialog-title {
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
}
.pf-dropdown-menu-item:hover,
.pf-select-item[data-highlighted],
.pf-combobox-item[data-highlighted] {
  background: #0a246a;
  color: #ffffff;
}

/* The famous pale-yellow tooltip. */
.pf-tooltip-content {
  background: #ffffe1;
  color: #000;
  border: 1px solid #000;
  box-shadow: none;
  font-size: 11px;
  padding: 2px 4px;
}

/* Etched groove: a shadow line above a highlight line. */
.pf-separator {
  background: transparent;
  border-top: 1px solid #808080;
  border-bottom: 1px solid #ffffff;
  height: 2px;
}

.pf-alert {
  background: #d4d0c8;
  box-shadow: var(--w2k-raised);
  border: none;
  padding: 0.75rem;
}

.pf-code,
.pf-kbd {
  font-family: 'Courier New', monospace;
  background: #ffffff;
  box-shadow: var(--w2k-sunken);
  border: none;
  color: #000;
}

/* ── Window chrome ────────────────────────────────────────────────────────
   Utility classes the theme brings with it. They only exist while this theme
   is applied, and compose onto ordinary components: a Row for the title bar,
   Spans for the buttons, a Div for the inset well. */

.pf-window {
  background: #d4d0c8;
  box-shadow: var(--w2k-raised);
  padding: 3px;
}
.pf-title-bar {
  align-items: center;
  background: linear-gradient(90deg, #0a246a 0%, #a6caf0 100%);
  color: #ffffff;
  display: flex;
  font-weight: 700;
  justify-content: space-between;
  min-height: 22px;
  padding: 3px 3px 3px 6px;
}
.pf-title-bar > * {
  color: #ffffff;
}
.pf-title-bar-button {
  background: #d4d0c8;
  box-shadow: var(--w2k-raised);
  color: #000;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  height: 16px;
  min-width: 18px;
  margin-left: 2px;
}
.pf-menu-bar {
  background: #d4d0c8;
  display: flex;
  gap: 2px;
  padding: 2px 4px;
}
.pf-menu-bar > * {
  color: #000;
  font-size: 12px;
  padding: 2px 8px;
}
.pf-menu-bar > *:hover {
  background: #0a246a;
  color: #ffffff;
}
.pf-status-bar {
  background: #d4d0c8;
  display: flex;
  gap: 3px;
  padding: 2px;
}
.pf-status-segment {
  box-shadow: inset 1px 1px 0 0 #808080, inset -1px -1px 0 0 #ffffff;
  color: #000;
  flex: 1;
  font-size: 11px;
  padding: 2px 6px;
}
/* Sunken white well — wrap charts and lists in it the way Explorer does. */
.pf-inset {
  background: #ffffff;
  box-shadow: var(--w2k-sunken);
  padding: 6px;
}
"""


class Windows2000(Theme):
    """Total-conversion theme that renders any app as a Windows 2000 program.

    Beveled gray controls, square corners, Tahoma, sunken white text fields,
    list-view tables with raised column headers, segmented progress bars, and
    the pale-yellow tooltip.  Charts use the VGA palette (navy, teal, maroon,
    olive, purple).

    Every standard component is restyled, so an existing app converts by
    changing one line.  The theme also ships window-chrome utility classes
    that only exist while it is applied: `pf-window`, `pf-title-bar`,
    `pf-title-bar-button`, `pf-menu-bar`, `pf-status-bar`, `pf-status-segment`,
    and `pf-inset`.

    Inspired by Anders Swanson's (@dataders) Windows 2000 mod of Prefab, built
    for his dashboard bake-off:
    https://github.com/dataders/fusion_issue_analysis

    **Example:**

    ```python
    from prefab_ui.app import PrefabApp
    from prefab_ui.components import Card, CardContent, Div, Metric, Row, Span
    from prefab_ui.themes import Windows2000

    with Div(css_class="pf-window") as view:
        with Row(css_class="pf-title-bar"):
            Span("Issue Explorer")
            Span("X", css_class="pf-title-bar-button")
        with Card():
            with CardContent():
                Metric(label="Open Issues", value="1,284")

    PrefabApp(view=view, theme=Windows2000())
    ```
    """

    mode: Literal["light", "dark"] | None = "light"
    light_css: str = _WIN2K_VARS
    dark_css: str | None = _WIN2K_VARS
    css: str = _WIN2K_CSS
    gradient: bool = False
