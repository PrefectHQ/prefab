/**
 * Field wrapper — composable form field with data-invalid propagation.
 *
 * Vertical (default): renders a plain <div> for form validation layouts.
 * Horizontal: renders a bordered choice card wrapped in a <label> for
 * click-to-toggle behavior.
 *
 * Sub-components (FieldTitle, FieldDescription, FieldContent, FieldError)
 * render as simple styled elements — all error styling is handled by CSS
 * cascade from data-invalid on the parent .cn-field div.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

interface PrefabFieldProps {
  invalid?: boolean;
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
  className?: string;
  children?: React.ReactNode;
}

const ORIENTATION_CLASSES = {
  vertical: "flex flex-col gap-1.5",
  horizontal: "flex items-center justify-between gap-2",
};

export function PrefabField({
  invalid,
  disabled,
  orientation = "vertical",
  className,
  children,
}: PrefabFieldProps) {
  const inner = (
    <div
      data-slot="field"
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        "cn-field group/field",
        ORIENTATION_CLASSES[orientation],
        className,
      )}
    >
      {children}
    </div>
  );

  if (orientation === "horizontal") {
    return <label className="cn-field-label">{inner}</label>;
  }

  return inner;
}

interface PrefabFieldTextProps {
  className?: string;
  children?: React.ReactNode;
}

export function PrefabFieldTitle({
  className,
  children,
}: PrefabFieldTextProps) {
  return <span className={cn("cn-field-title", className)}>{children}</span>;
}

export function PrefabFieldDescription({
  className,
  children,
}: PrefabFieldTextProps) {
  return (
    <span className={cn("cn-field-description", className)}>{children}</span>
  );
}

export function PrefabFieldContent({
  className,
  children,
}: PrefabFieldTextProps) {
  return (
    <div className={cn("cn-field-content grid", className)}>{children}</div>
  );
}

export function PrefabFieldError({
  className,
  children,
}: PrefabFieldTextProps) {
  return <p className={cn("cn-field-error", className)}>{children}</p>;
}
