/**
 * Alert wrapper — adds icon support on top of shadcn's Alert.
 *
 * When an `icon` prop (kebab-case lucide name) is provided, the resolved
 * SVG is rendered as a direct child of the Alert div. The v4 CSS handles
 * the grid layout automatically via `has-[>svg]:grid-cols-[auto_1fr]`.
 */

import type { ReactNode } from "react";
import { Alert, type AlertVariant } from "@/ui/alert";
import { useIcon } from "@/lib/icons";

interface PrefabAlertProps {
  icon?: string;
  variant?: AlertVariant;
  className?: string;
  children?: ReactNode;
}

export function PrefabAlert({
  icon,
  variant,
  className,
  children,
}: PrefabAlertProps) {
  const IconComponent = useIcon(icon);

  return (
    <Alert variant={variant} className={className}>
      {IconComponent && <IconComponent />}
      {children}
    </Alert>
  );
}
