/**
 * Icon component — renders a lucide icon by kebab-case name.
 *
 * Resolves the name at runtime via the shared icon resolver, then
 * renders the corresponding SVG. Supports size variants.
 */

import { cn } from "@/lib/utils";
import { resolveIcon } from "@/lib/icons";

const SIZE_CLASSES = {
  sm: "size-3.5",
  default: "size-4",
  lg: "size-6",
} as const;

interface PrefabIconProps {
  name: string;
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
}

export function PrefabIcon({
  name,
  size = "default",
  className,
}: PrefabIconProps) {
  const IconComponent = resolveIcon(name);
  if (!IconComponent) return null;

  return <IconComponent className={cn(SIZE_CLASSES[size], className)} />;
}
