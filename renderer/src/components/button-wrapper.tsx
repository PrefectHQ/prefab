/**
 * Button wrapper — adds icon support.
 *
 * The renderer converts `label` to children text, so this wrapper
 * receives icon as a prop and the label as children. The icon renders
 * before the text, inheriting Button's `[&_svg]` sizing.
 */

import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/ui/button";
import { resolveIcon } from "@/lib/icons";

interface PrefabButtonProps extends ButtonProps {
  icon?: string;
  children?: ReactNode;
}

export function PrefabButton({ icon, children, ...props }: PrefabButtonProps) {
  const IconComponent = icon ? resolveIcon(icon) : undefined;
  const isIconSize =
    typeof props.size === "string" && props.size.startsWith("icon");

  return (
    <Button {...props}>
      {IconComponent && <IconComponent />}
      {isIconSize && children ? (
        <span className="sr-only">{children}</span>
      ) : (
        children
      )}
    </Button>
  );
}
