"""MySpace theme — black background, neon glow, Comic Neue, tasteful sparkles.

Inspired by Anders Swanson's (@dataders) MySpace mod of Prefab, built for his
dashboard bake-off: https://github.com/dataders/fusion_issue_analysis
"""

from __future__ import annotations

from typing import Literal

from prefab_ui.themes.base import Theme

# The 2003 profile palette: hot pink, cyan, lime, and a black ground to make
# them glow. Every color is a variable so charts and status states inherit it.
_MYSPACE_VARS = (
    "--radius: 0;"
    " --card-padding-y: 1rem;"
    " --layout-gap: 1rem;"
    " --background: #0a0a0a;"
    " --foreground: #39ff14;"
    " --card: rgba(10, 10, 10, 0.92);"
    " --card-foreground: #39ff14;"
    " --popover: #0a0a0a;"
    " --popover-foreground: #39ff14;"
    " --primary: #ff69b4;"
    " --primary-foreground: #0a0a0a;"
    " --secondary: #1a0a14;"
    " --secondary-foreground: #00ffff;"
    " --muted: #14141e;"
    " --muted-foreground: #00ffff;"
    " --accent: #ff1493;"
    " --accent-foreground: #0a0a0a;"
    " --border: #ff69b4;"
    " --input: #0a0a0a;"
    " --ring: #00ffff;"
    " --destructive: #ff2d55;"
    " --success: #39ff14;"
    " --warning: #ffff00;"
    " --info: #00ffff;"
    " --chart-1: #ff69b4;"
    " --chart-2: #00ffff;"
    " --chart-3: #39ff14;"
    " --chart-4: #ffff00;"
    " --chart-5: #ff1493;"
    # Glow recipes
    " --ms-glow-pink: 0 0 10px #ff69b4, 0 0 20px rgba(255, 20, 147, 0.5);"
    " --ms-glow-cyan: 0 0 10px #00ffff, 0 0 20px rgba(0, 255, 255, 0.4);"
    " --ms-glow-lime: 0 0 10px #39ff14, 0 0 20px rgba(57, 255, 20, 0.4);"
)

# A faint tiled star field. Inlined as a data URI so the theme stays
# self-contained — no network request, works offline and in shadow DOM.
_STAR_TILE = (
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'"
    " width='72' height='72'%3E%3Ctext x='10' y='34' font-size='19'"
    " opacity='0.05'%3E%E2%AD%90%3C/text%3E%3C/svg%3E\")"
)

_MYSPACE_CSS = f"""\
.pf-app-root {{
  background-color: #0a0a0a;
  background-image: {_STAR_TILE};
  color: #39ff14;
  padding: 1.5rem;
}}

h1, h2, h3, h4,
.pf-card-title {{
  color: #ff69b4;
  text-shadow: var(--ms-glow-pink);
  font-weight: 700;
}}

/* Cards glow cyan by default. The .pf-neon-* utilities below recolor
   individual cards the way a 2003 profile alternated section colors. */
.pf-card {{
  background: rgba(10, 10, 10, 0.92);
  border: 2px solid #00ffff;
  box-shadow: var(--ms-glow-cyan);
  --tw-ring-shadow: 0 0 #0000;
}}
.pf-card-description {{
  color: #00ffff;
}}

.pf-button {{
  color: #0a0a0a;
  border: 2px solid #00ffff;
  font-weight: 700;
}}
.pf-button-variant-default {{
  background: linear-gradient(180deg, #ff69b4 0%, #ff1493 100%);
  box-shadow: var(--ms-glow-pink);
}}
.pf-button-variant-default:hover {{
  background: linear-gradient(180deg, #00ffff 0%, #00b8b8 100%);
  box-shadow: var(--ms-glow-cyan);
}}
.pf-button-variant-destructive {{
  background: linear-gradient(180deg, #ff2d55 0%, #b3122f 100%);
  border-color: #ff2d55;
  box-shadow: 0 0 10px #ff2d55;
}}
.pf-button-variant-secondary {{
  background: linear-gradient(180deg, #39ff14 0%, #1faa06 100%);
  border-color: #39ff14;
  box-shadow: var(--ms-glow-lime);
}}
.pf-button-variant-outline {{
  background: transparent;
  color: #00ffff;
  border-color: #00ffff;
  box-shadow: var(--ms-glow-cyan);
}}
.pf-button-variant-ghost,
.pf-button-variant-link {{
  background: none;
  border-color: transparent;
  box-shadow: none;
  color: #00ffff;
}}
.pf-button-variant-ghost:hover {{
  background: rgba(0, 255, 255, 0.12);
  border-color: #00ffff;
  box-shadow: var(--ms-glow-cyan);
}}
.pf-button-variant-link {{
  text-decoration: underline;
}}

.pf-input,
.pf-textarea,
.pf-select-trigger,
.pf-combobox-trigger,
.pf-native-select {{
  background: #0a0a0a;
  color: #39ff14;
  border: 2px solid #ff69b4;
  box-shadow: inset 0 0 8px rgba(255, 105, 180, 0.4);
}}
.pf-input:focus-visible,
.pf-textarea:focus-visible,
.pf-select-trigger:focus-visible {{
  border-color: #00ffff;
  box-shadow: var(--ms-glow-cyan);
  --tw-ring-shadow: 0 0 #0000;
}}

.pf-table-head {{
  color: #ff69b4;
  text-shadow: 0 0 6px #ff69b4;
  font-weight: 700;
  letter-spacing: 0.05em;
}}
.pf-table-cell {{
  color: #39ff14;
}}
.pf-table-row {{
  border-color: rgba(255, 105, 180, 0.35);
}}
.pf-table-row:hover {{
  background: rgba(255, 20, 147, 0.15);
}}

.pf-progress,
.pf-progress-track {{
  background: #0a0a0a;
  border: 1px solid #ff69b4;
  height: 14px;
}}
/* Progress nests .pf-progress inside .pf-progress — flatten the inner one so
   the neon border is drawn once. */
.pf-progress .pf-progress,
.pf-progress .pf-progress-track {{
  border: none;
  height: 100%;
}}
.pf-progress-indicator {{
  box-shadow: 0 0 12px currentColor;
}}
.pf-progress-label,
.pf-progress-value {{
  color: #00ffff;
}}

.pf-slider-track {{
  background: #0a0a0a;
  border: 1px solid #ff69b4;
}}
.pf-slider-thumb {{
  background: #ff69b4;
  border: 2px solid #00ffff;
  box-shadow: var(--ms-glow-pink);
}}

.pf-badge {{
  background: rgba(255, 20, 147, 0.15);
  border: 1px solid #ff69b4;
  color: #ff69b4;
  box-shadow: 0 0 6px rgba(255, 105, 180, 0.6);
  font-weight: 700;
}}
.pf-badge-variant-success {{ color: #39ff14; border-color: #39ff14; background: rgba(57, 255, 20, 0.12); }}
.pf-badge-variant-warning {{ color: #ffff00; border-color: #ffff00; background: rgba(255, 255, 0, 0.12); }}
.pf-badge-variant-info {{ color: #00ffff; border-color: #00ffff; background: rgba(0, 255, 255, 0.12); }}

.pf-tabs-trigger {{
  color: #00ffff;
  border: 1px solid transparent;
}}
.pf-tabs-trigger[data-active] {{
  color: #ff69b4;
  border-color: #ff69b4;
  box-shadow: var(--ms-glow-pink);
}}

.pf-dialog-content,
.pf-alert-dialog-content,
.pf-popover-content,
.pf-dropdown-menu-content,
.pf-select-content,
.pf-combobox-content {{
  background: #0a0a0a;
  color: #39ff14;
  border: 2px solid #ff69b4;
  box-shadow: var(--ms-glow-pink);
}}
.pf-tooltip-content {{
  background: #0a0a0a;
  color: #00ffff;
  border: 1px solid #00ffff;
  box-shadow: var(--ms-glow-cyan);
}}

.pf-separator {{
  background: linear-gradient(90deg, transparent, #ff69b4, #00ffff, transparent);
  height: 2px;
}}

.pf-alert {{
  background: rgba(10, 10, 10, 0.92);
  border: 2px dashed #ffff00;
  color: #39ff14;
}}

.pf-code,
.pf-kbd {{
  background: #000;
  color: #39ff14;
  border: 1px solid #39ff14;
  font-family: 'Courier New', monospace;
}}

/* Carousel(continuous=True) is the scrolling marquee — give it the
   cyan rails a 2003 profile banner had. */
.pf-carousel {{
  border-top: 2px solid #00ffff;
  border-bottom: 2px solid #00ffff;
  padding: 6px 0;
}}

/* ── Profile decor ────────────────────────────────────────────────────────
   Utility classes the theme brings with it, for the parts of a MySpace page
   that are content rather than styling. They compose onto ordinary Spans
   and Divs and only exist while this theme is applied. */

.pf-neon-pink {{ border-color: #ff69b4; box-shadow: var(--ms-glow-pink); }}
.pf-neon-cyan {{ border-color: #00ffff; box-shadow: var(--ms-glow-cyan); }}
.pf-neon-lime {{ border-color: #39ff14; box-shadow: var(--ms-glow-lime); }}
.pf-neon-yellow {{ border-color: #ffff00; box-shadow: 0 0 10px #ffff00; }}

/* The hit counter: sunken black LED digits. */
.pf-visitor-counter {{
  background: #000;
  border: 2px inset #808080;
  color: #39ff14;
  display: inline-block;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.15em;
  padding: 4px 12px;
}}

.pf-construction {{
  border: 3px dashed #ffff00;
  background: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 0, 0.06) 0 10px,
    rgba(0, 0, 0, 0.1) 10px 20px
  );
  padding: 0.75rem;
  text-align: center;
}}

/* Animations stay behind a reduced-motion guard. Blinking text at 1Hz is a
   genuine vestibular and photosensitivity risk, so viewers who have asked
   their OS for less motion get the styling without the movement. */
@media (prefers-reduced-motion: no-preference) {{
  @keyframes pf-blink {{ 0%, 49% {{ opacity: 1; }} 50%, 100% {{ opacity: 0; }} }}
  @keyframes pf-rainbow {{
    0% {{ color: #ff0000; }} 16% {{ color: #ff8800; }} 33% {{ color: #ffff00; }}
    50% {{ color: #39ff14; }} 66% {{ color: #00ffff; }} 83% {{ color: #ff69b4; }}
    100% {{ color: #ff0000; }}
  }}
  @keyframes pf-sparkle {{
    0%, 100% {{ opacity: 1; transform: scale(1); }}
    50% {{ opacity: 0.5; transform: scale(1.3); }}
  }}
  .pf-blink {{ animation: pf-blink 1s step-end infinite; }}
  .pf-rainbow {{ animation: pf-rainbow 3s linear infinite; }}
  .pf-sparkle {{ animation: pf-sparkle 2s ease-in-out infinite; display: inline-block; }}
}}
.pf-rainbow {{ font-weight: 700; }}
"""


class MySpace(Theme):
    """Total-conversion theme that renders any app as a 2003 profile page.

    Black ground with a tiled star field, neon pink and cyan glow on every
    border, Comic Neue, and a lime-green body text that has no business being
    as readable as it is.  Charts run hot pink, cyan, lime, yellow, magenta.

    Every standard component is restyled, so an existing app converts by
    changing one line.  The theme also ships profile-decor utility classes
    that only exist while it is applied: `pf-neon-pink`, `pf-neon-cyan`,
    `pf-neon-lime`, `pf-neon-yellow`, `pf-visitor-counter`, `pf-construction`,
    `pf-blink`, `pf-rainbow`, and `pf-sparkle`.

    The three animated classes are wrapped in a `prefers-reduced-motion`
    guard, so they hold still for viewers who have asked their OS for less
    motion.  For a scrolling banner use `Carousel(continuous=True)`, which the
    theme styles with cyan rails.

    Inspired by Anders Swanson's (@dataders) MySpace mod of Prefab, built for
    his dashboard bake-off:
    https://github.com/dataders/fusion_issue_analysis

    **Example:**

    ```python
    from prefab_ui.app import PrefabApp
    from prefab_ui.components import Card, CardContent, Div, Metric, Span
    from prefab_ui.themes import MySpace

    with Div() as view:
        Span("You are visitor #13,337", css_class="pf-visitor-counter")
        with Card(css_class="pf-neon-pink"):
            with CardContent():
                Metric(label="Open Issues", value="1,284")

    PrefabApp(view=view, theme=MySpace())
    ```
    """

    mode: Literal["light", "dark"] | None = "dark"
    light_css: str = _MYSPACE_VARS
    dark_css: str | None = _MYSPACE_VARS
    css: str = _MYSPACE_CSS
    font: str | None = "Comic Neue"
