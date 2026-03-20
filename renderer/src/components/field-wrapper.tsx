/**
 * Field and ChoiceCard wrappers.
 *
 * Field: plain <div> that groups label + control + error, propagates
 * data-invalid via CSS cascade.
 *
 * ChoiceCard: Field subclass wrapped in a <label> for click-anywhere-
 * to-toggle behavior, with a bordered card appearance.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

interface PrefabFieldProps {
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function PrefabField({
  invalid,
  disabled,
  className,
  children,
}: PrefabFieldProps) {
  return (
    <div
      data-slot="field"
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      className={cn("pf-field group/field flex flex-col gap-1.5", className)}
    >
      {children}
    </div>
  );
}

export function PrefabChoiceCard({
  invalid,
  disabled,
  className,
  children,
}: PrefabFieldProps) {
  return (
    <label className="pf-field-label">
      <div
        data-slot="field"
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        className={cn(
          "pf-field group/field flex items-center justify-between gap-2",
          className,
        )}
      >
        {children}
      </div>
    </label>
  );
}

interface PrefabFieldTextProps {
  className?: string;
  children?: React.ReactNode;
}

export function PrefabFieldTitle({
  className,
  children,
}: PrefabFieldTextProps) {
  return <span className={cn("pf-field-title", className)}>{children}</span>;
}

export function PrefabFieldDescription({
  className,
  children,
}: PrefabFieldTextProps) {
  return (
    <span className={cn("pf-field-description", className)}>{children}</span>
  );
}

export function PrefabFieldContent({
  className,
  children,
}: PrefabFieldTextProps) {
  return (
    <div className={cn("pf-field-content grid", className)}>{children}</div>
  );
}

export function PrefabFieldError({
  className,
  children,
}: PrefabFieldTextProps) {
  return <p className={cn("pf-field-error", className)}>{children}</p>;
}
