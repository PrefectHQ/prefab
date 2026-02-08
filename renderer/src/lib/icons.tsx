/**
 * Shared icon resolver — converts kebab-case icon names (e.g., "circle-alert")
 * to lucide-react components at runtime.
 *
 * This powers any component that accepts an `icon` prop as a string name.
 */

import { icons, type LucideIcon } from "lucide-react";

function kebabToPascal(name: string): string {
  return name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

export function resolveIcon(name: string): LucideIcon | undefined {
  return icons[kebabToPascal(name) as keyof typeof icons];
}
