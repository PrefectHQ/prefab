/**
 * Field wrapper — renders a choice card layout using cn-field-* CSS.
 *
 * Wraps any form control (Switch, Checkbox, etc.) in a bordered card
 * with title and description. The outer <label> makes the entire card
 * clickable, activating the wrapped control.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

interface PrefabFieldProps {
  title: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function PrefabField({
  title,
  description,
  disabled,
  className,
  children,
}: PrefabFieldProps) {
  return (
    <label className={cn("cn-field-label", className)}>
      <div
        data-slot="field"
        data-disabled={disabled || undefined}
        className="cn-field group/field flex items-center justify-between"
      >
        <div className="cn-field-content grid">
          <span className="cn-field-title">{title}</span>
          {description && (
            <span className="cn-field-description">{description}</span>
          )}
        </div>
        {children}
      </div>
    </label>
  );
}
