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

// Port of Python's _basic_theme(hue) + _chart_colors()
function basicTheme(hue: number): ThemeDefinition {
  const offsets = [0, 72, 144, 216, 288];
  const charts = (l: number, c: number) =>
    Object.fromEntries(
      offsets.map((off, i) => [
        `chart-${i + 1}`,
        `oklch(${l} ${c} ${(hue + off) % 360})`,
      ]),
    );
  return {
    light: {
      primary: `oklch(0.6 0.24 ${hue})`,
      "primary-foreground": "oklch(0.985 0 0)",
      ring: `oklch(0.6 0.24 ${hue})`,
      ...charts(0.6, 0.2),
    },
    dark: {
      primary: `oklch(0.7 0.18 ${hue})`,
      "primary-foreground": "oklch(0.205 0 0)",
      ring: `oklch(0.7 0.18 ${hue})`,
      ...charts(0.7, 0.15),
    },
  };
}

interface Preset {
  name: string;
  css: string;
  /** OKLCH hue for the swatch dot, or null for default (no dot). */
  hue: number | null;
}

const PRESETS: Preset[] = [
  { name: "Default", css: "", hue: null },
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
      <PopoverTrigger asChild>
        <button
          className={`inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground ${
            value ? "bg-accent text-accent-foreground" : ""
          }`}
          aria-label="Theme"
          title="Theme"
        >
          <Palette className="h-4 w-4" />
        </button>
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
              className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs transition-colors ${
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
          className="h-[160px] w-full rounded-md border bg-muted/30 px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
          spellCheck={false}
        />
      </PopoverContent>
    </Popover>
  );
}
