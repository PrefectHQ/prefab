/**
 * Theme picker popover for the playground toolbar.
 *
 * Offers built-in color presets and a textarea for custom CSS.
 *
 * Presets come from themes.json, which `tools/generate_theme_presets.py`
 * compiles from the real `prefab_ui.themes` classes. Do not hand-edit that
 * file or reintroduce TypeScript ports of the Python themes here — the point
 * of generating it is that the picker and `PrefabApp(theme=...)` cannot
 * disagree.
 */

import { useState } from "react";
import { Palette } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import presets from "./themes.json";

interface Preset {
  name: string;
  /** Compiled CSS, already wrapped in :root / .dark selectors. */
  css: string;
  /** Color of the swatch dot, or null for the "Code" entry. */
  swatch: string | null;
  /** Color scheme the theme forces, or null if it follows the toggle. */
  mode: "light" | "dark" | null;
}

// TypeScript widens the JSON's string literals, so `mode` arrives as `string`.
const PRESETS: Preset[] = presets as Preset[];

interface ThemePickerProps {
  value: string;
  /**
   * `mode` is set only for themes that force a color scheme, so selecting one
   * matches how `PrefabApp(theme=...)` renders it in production.
   */
  onChange: (css: string, mode: "light" | "dark" | null) => void;
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
              onClick={() => onChange(preset.css, preset.mode)}
              className={`inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs transition-colors ${
                activePreset?.name === preset.name
                  ? "border-primary bg-primary/10 text-primary"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {preset.swatch !== null && (
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: preset.swatch }}
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
          onChange={(e) => onChange(e.target.value, null)}
          placeholder={`:root {\n  --primary: oklch(0.6 0.24 260);\n}`}
          className="h-[160px] w-full rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
          spellCheck={false}
        />
      </PopoverContent>
    </Popover>
  );
}
