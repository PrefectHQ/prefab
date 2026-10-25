/**
 * Field and ChoiceCard wrappers.
 *
 * Field: plain <div> that groups label + control + error, propagates
 * data-invalid via CSS cascade.
 *
 * ChoiceCard: Field subclass wrapped in a <label> for click-anywhere-
 * to-toggle behavior, with a bordered card appearance.
 */

import {
  getAccessibleNameProps,
  type AccessibleNameProps,
} from "../accessibility";
import * as React from "react";
import { cn } from "@/lib/utils";

interface PrefabFieldProps extends AccessibleNameProps {
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
  ...accessibleName
}: PrefabFieldProps) {
  return (
    <div
      {...getAccessibleNameProps(accessibleName)}
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
  ...accessibleName
}: PrefabFieldProps) {
  return (
    <label
      {...getAccessibleNameProps(accessibleName)}
      className="pf-field-label"
    >
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

interface PrefabFieldTextProps extends AccessibleNameProps {
  className?: string;
  children?: React.ReactNode;
}

export function PrefabFieldTitle({
  className,
  children,
  ...accessibleName
}: PrefabFieldTextProps) {
  return (
    <span
      {...getAccessibleNameProps(accessibleName)}
      className={cn("pf-field-title", className)}
    >
      {children}
    </span>
  );
}

export function PrefabFieldDescription({
  className,
  children,
  ...accessibleName
}: PrefabFieldTextProps) {
  return (
    <span
      {...getAccessibleNameProps(accessibleName)}
      className={cn("pf-field-description", className)}
    >
      {children}
    </span>
  );
}

export function PrefabFieldContent({
  className,
  children,
  ...accessibleName
}: PrefabFieldTextProps) {
  return (
    <div
      {...getAccessibleNameProps(accessibleName)}
      className={cn("pf-field-content grid", className)}
    >
      {children}
    </div>
  );
}

export function PrefabFieldError({
  className,
  children,
  ...accessibleName
}: PrefabFieldTextProps) {
  return (
    <p
      {...getAccessibleNameProps(accessibleName)}
      className={cn("pf-field-error", className)}
    >
      {children}
    </p>
  );
}
