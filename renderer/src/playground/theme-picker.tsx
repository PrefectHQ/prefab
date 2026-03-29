/**
 * Theme picker popover for the playground toolbar.
 *
 * Offers built-in color presets and a textarea for custom CSS.
 * Presets mirror Python's `prefab_ui.themes` built-in themes.
 */

import { useState } from "react";
import { Palette } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { buildThemeCss, type ThemeDefinition } from "../themes";

// Port of Python's Basic(accent=hue).to_json()
function basicTheme(hue: number): ThemeDefinition {
  const a = `--accent-hue: ${hue};`;
  return {
    light: `${a} --primary: oklch(0.6 0.24 var(--accent-hue)); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.6 0.24 var(--accent-hue)); --chart-1: oklch(0.65 0.25 var(--accent-hue)); --chart-2: oklch(0.65 0.25 calc(var(--accent-hue) + 72)); --chart-3: oklch(0.65 0.25 calc(var(--accent-hue) + 144)); --chart-4: oklch(0.65 0.25 calc(var(--accent-hue) + 216)); --chart-5: oklch(0.65 0.25 calc(var(--accent-hue) + 288));`,
    dark: `${a} --primary: oklch(0.7 0.18 var(--accent-hue)); --primary-foreground: oklch(0.205 0 0); --ring: oklch(0.7 0.18 var(--accent-hue)); --chart-1: oklch(0.72 0.22 var(--accent-hue)); --chart-2: oklch(0.72 0.22 calc(var(--accent-hue) + 72)); --chart-3: oklch(0.72 0.22 calc(var(--accent-hue) + 144)); --chart-4: oklch(0.72 0.22 calc(var(--accent-hue) + 216)); --chart-5: oklch(0.72 0.22 calc(var(--accent-hue) + 288));`,
    css: "",
  };
}

// Port of Python's Presentation().to_json()
const presentationVars =
  "--card-padding: 3rem; --layout-gap: 1.5rem; --background: #0f1117; --foreground: #e2e8f0; --card: #1a1d2e; --card-foreground: #f1f5f9; --popover: #1a1d2e; --popover-foreground: #f1f5f9; --secondary: #252840; --secondary-foreground: #e2e8f0; --muted: #252840; --muted-foreground: #94a3b8; --accent: #2a2d3e; --accent-foreground: #e2e8f0; --destructive: #f472b6; --success: #34d399; --warning: #f59e0b; --info: #818cf8; --border: #1e2235; --input: #2a2d3e; --primary: oklch(0.7 0.18 var(--accent-hue, 275)); --primary-foreground: oklch(0.205 0 0); --ring: oklch(0.7 0.18 var(--accent-hue, 275)); --chart-1: oklch(0.72 0.22 var(--accent-hue, 275)); --chart-2: #34d399; --chart-3: #f59e0b; --chart-4: #f472b6; --chart-5: #38bdf8;";

const presentationCss = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
.pf-card, .pf-table { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
.pf-card-header, .pf-card-content, .pf-card-footer { padding-left: 0; padding-right: 0; }
.pf-progress, .pf-progress-track { background: #252840; }
.pf-slider-track { background: #252840; }
.pf-progress-target { background: #f1f5f9; opacity: 0.5; }
.pf-badge { border-radius: 6px; font-weight: 600; font-size: 0.9rem; padding: 0.2em 0.6em; }
.pf-badge-variant-default { color: oklch(0.78 0.15 var(--accent-hue, 275)); background: oklch(0.72 0.22 var(--accent-hue, 275) / 0.12); }
.pf-badge-variant-warning { color: #fcd34d; background: rgba(245, 158, 11, 0.12); }
.pf-badge-variant-destructive { color: #f9a8d4; background: rgba(244, 114, 182, 0.12); }
.pf-table-cell { padding: 0.85rem 0.75rem; font-size: 0.9rem; font-variant-numeric: tabular-nums; color: #cbd5e1; }
.pf-table-row { border-color: #1e2235; }
.pf-table-row:hover { background: oklch(0.72 0.22 var(--accent-hue, 275) / 0.06); }
`;

const presentationTheme: ThemeDefinition = {
  light: presentationVars,
  dark: presentationVars,
  css: presentationCss,
};

interface Preset {
  name: string;
  css: string;
  /** OKLCH hue for the swatch dot, or null for default (no dot). */
  hue: number | null;
}

const PRESETS: Preset[] = [
  { name: "Code", css: "", hue: null },
  {
    name: "Presentation",
    css: buildThemeCss(presentationTheme, false),
    hue: 275,
  },
  { name: "Blue", css: buildThemeCss(basicTheme(260), false), hue: 260 },
  { name: "Green", css: buildThemeCss(basicTheme(155), false), hue: 155 },
  { name: "Red", css: buildThemeCss(basicTheme(25), false), hue: 25 },
  { name: "Orange", css: buildThemeCss(basicTheme(55), false), hue: 55 },
  { name: "Violet", css: buildThemeCss(basicTheme(295), false), hue: 295 },
  { name: "Rose", css: buildThemeCss(basicTheme(350), false), hue: 350 },
];

interface ThemePickerProps {
  value: string;
  onChange: (css: string) => void;
}

export function ThemePicker({ value, onChange }: ThemePickerProps) {
  const [open, setOpen] = useState(false);

  const activePreset = PRESETS.find((p) => p.css === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={`inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground ${
          value ? "bg-accent text-accent-foreground" : ""
        }`}
        aria-label="Theme"
        title="Theme"
      >
        <Palette className="h-4 w-4" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[320px] p-3">
        <div className="mb-2 text-xs font-medium text-muted-foreground">
          Presets
        </div>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onChange(preset.css)}
              className={`inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs transition-colors ${
                activePreset?.name === preset.name
                  ? "border-primary bg-primary/10 text-primary"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {preset.hue !== null && (
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{
                    background: `oklch(0.6 0.24 ${preset.hue})`,
                  }}
                />
              )}
              {preset.name}
            </button>
          ))}
        </div>
        <div className="mb-1.5 text-xs font-medium text-muted-foreground">
          Custom CSS
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`:root {\n  --primary: oklch(0.6 0.24 260);\n}`}
          className="h-[160px] w-full rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
          spellCheck={false}
        />
      </PopoverContent>
    </Popover>
  );
}
