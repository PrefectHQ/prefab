/**
 * Form control wrappers that bridge Python's simple component API
 * to shadcn's decomposed component structure.
 *
 * Python models use a flat API — Select has SelectOption children,
 * Checkbox has a label prop. shadcn uses multi-part compound
 * components (Select → Trigger + Content + Item) and no built-in
 * labels. These wrappers handle the translation.
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import {
  RadioGroup as ShadcnRadioGroup,
  RadioGroupItem,
} from "@/ui/radio-group";
import { Checkbox as ShadcnCheckbox } from "@/ui/checkbox";
import { Switch as ShadcnSwitch } from "@/ui/switch";
import { Label } from "@/ui/label";

/* ------------------------------------------------------------------ */
/*  Standalone Radio (outside a RadioGroup)                           */
/* ------------------------------------------------------------------ */

interface PrefabRadioProps {
  value: string;
  label?: string;
  checked?: boolean;
  name?: string;
  disabled?: boolean;
  className?: string;
}

export function PrefabRadio({
  value,
  label,
  checked,
  name,
  disabled,
  className,
}: PrefabRadioProps) {
  const id = `radio-${name ?? "standalone"}-${value}`;
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        defaultChecked={checked}
        disabled={disabled}
        className="h-4 w-4 border-border text-primary accent-primary"
      />
      {label && (
        <Label htmlFor={id} className="cursor-pointer">
          {label}
        </Label>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pre-interpolated child item types (built by renderer.tsx)         */
/* ------------------------------------------------------------------ */

interface SelectItemData {
  value: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
}

interface RadioItemData {
  value: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Select                                                            */
/* ------------------------------------------------------------------ */

interface PrefabSelectProps {
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  _items?: SelectItemData[];
  children?: React.ReactNode;
}

export function PrefabSelect({
  placeholder,
  name,
  disabled,
  className,
  value,
  onValueChange,
  _items = [],
}: PrefabSelectProps) {
  const defaultValue = _items.find((i) => i.selected)?.value;

  // Controlled when value + handler provided, uncontrolled otherwise
  const controlProps =
    value !== undefined
      ? { value, onValueChange }
      : { defaultValue, onValueChange };

  return (
    <ShadcnSelect {...controlProps} disabled={disabled} name={name}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {_items.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            disabled={item.disabled}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </ShadcnSelect>
  );
}

/* ------------------------------------------------------------------ */
/*  RadioGroup                                                        */
/* ------------------------------------------------------------------ */

interface PrefabRadioGroupProps {
  name?: string;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  _items?: RadioItemData[];
  children?: React.ReactNode;
}

export function PrefabRadioGroup({
  name,
  className,
  value,
  onValueChange,
  _items = [],
}: PrefabRadioGroupProps) {
  const defaultValue = _items.find((i) => i.checked)?.value;

  const controlProps =
    value !== undefined
      ? { value, onValueChange }
      : { defaultValue, onValueChange };

  return (
    <ShadcnRadioGroup {...controlProps} className={className} name={name}>
      {_items.map((item) => {
        const id = `radio-${name ?? ""}-${item.value}`;
        return (
          <div key={item.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={item.value}
              disabled={item.disabled}
              id={id}
            />
            {item.label && (
              <Label htmlFor={id} className="cursor-pointer">
                {item.label}
              </Label>
            )}
          </div>
        );
      })}
    </ShadcnRadioGroup>
  );
}

/* ------------------------------------------------------------------ */
/*  Checkbox                                                          */
/* ------------------------------------------------------------------ */

interface PrefabCheckboxProps {
  label?: string;
  checked?: boolean;
  name?: string;
  disabled?: boolean;
  className?: string;
  onCheckedChange?: (checked: boolean) => void;
  children?: React.ReactNode;
}

export function PrefabCheckbox({
  label,
  checked,
  name,
  disabled,
  className,
  onCheckedChange,
}: PrefabCheckboxProps) {
  const id = name ? `checkbox-${name}` : undefined;

  // Internal state so the checkbox always toggles visually, even when
  // onCheckedChange is provided (which would otherwise force controlled
  // mode with a frozen checked prop).
  const [internal, setInternal] = React.useState(checked ?? false);
  React.useEffect(() => {
    if (checked !== undefined) setInternal(checked);
  }, [checked]);

  const handleChange = (val: boolean) => {
    setInternal(val);
    onCheckedChange?.(val);
  };

  const checkbox = (
    <ShadcnCheckbox
      id={id}
      checked={internal}
      onCheckedChange={handleChange}
      disabled={disabled}
      name={name}
      className={className}
    />
  );

  if (label) {
    return (
      <div className="flex items-center space-x-2">
        {checkbox}
        <Label htmlFor={id} className="cursor-pointer">
          {label}
        </Label>
      </div>
    );
  }

  return checkbox;
}

/* ------------------------------------------------------------------ */
/*  Switch                                                            */
/* ------------------------------------------------------------------ */

interface PrefabSwitchProps {
  label?: string;
  checked?: boolean;
  size?: "sm" | "default";
  name?: string;
  disabled?: boolean;
  className?: string;
  onCheckedChange?: (checked: boolean) => void;
  children?: React.ReactNode;
}

export function PrefabSwitch({
  label,
  checked,
  size,
  name,
  disabled,
  className,
  onCheckedChange,
}: PrefabSwitchProps) {
  const id = name ? `switch-${name}` : undefined;

  // Internal state so the switch always toggles visually on click, while
  // still reflecting external state changes (e.g. another action sets the
  // bound state key via `name`).
  const [internal, setInternal] = React.useState(checked ?? false);
  React.useEffect(() => {
    if (checked !== undefined) setInternal(checked);
  }, [checked]);

  const handleChange = (val: boolean) => {
    setInternal(val);
    onCheckedChange?.(val);
  };

  const switchEl = (
    <ShadcnSwitch
      id={id}
      checked={internal}
      onCheckedChange={handleChange}
      disabled={disabled}
      name={name}
      size={size}
    />
  );

  if (label) {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        {switchEl}
        <Label htmlFor={id} className="cursor-pointer">
          {label}
        </Label>
      </div>
    );
  }

  return switchEl;
}

/* ------------------------------------------------------------------ */
/*  ButtonGroup                                                       */
/* ------------------------------------------------------------------ */

interface PrefabButtonGroupProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  children?: React.ReactNode;
}

export function PrefabButtonGroup({
  orientation = "horizontal",
  className,
  children,
}: PrefabButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        "cn-button-group flex w-fit items-stretch",
        orientation === "horizontal"
          ? "cn-button-group-orientation-horizontal"
          : "cn-button-group-orientation-vertical flex-col",
        className,
      )}
    >
      {children}
    </div>
  );
}
