/**
 * Icon component — renders a lucide icon by kebab-case name.
 *
 * Resolves the name at runtime via the shared icon resolver, then
 * renders the corresponding SVG. Supports size variants.
 */

import {
  getAccessibleNameProps,
  type AccessibleNameProps,
} from "../accessibility";
import { cn } from "@/lib/utils";
import { useIcon } from "@/lib/icons";

const SIZE_CLASSES = {
  sm: "size-3.5",
  default: "size-4",
  lg: "size-6",
} as const;

interface PrefabIconProps extends AccessibleNameProps {
  name: string;
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
}

export function PrefabIcon({
  name,
  size = "default",
  className,
  ...accessibleName
}: PrefabIconProps) {
  const IconComponent = useIcon(name);
  if (!IconComponent) return null;

  return (
    <IconComponent
      {...getAccessibleNameProps(accessibleName)}
      className={cn(SIZE_CLASSES[size], className)}
    />
  );
}
