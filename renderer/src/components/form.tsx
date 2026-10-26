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
  getAccessibleNameProps,
  type AccessibleNameProps,
} from "../accessibility";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectSeparator,
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
/*  Label                                                             */
/* ------------------------------------------------------------------ */

interface PrefabLabelProps extends React.ComponentProps<typeof Label> {
  optional?: boolean;
}

export function PrefabLabel({
  optional,
  children,
  ...props
}: PrefabLabelProps) {
  return (
    <Label {...props}>
      {children}
      {optional && <span className="pf-label-optional">optional</span>}
    </Label>
  );
}

/* ------------------------------------------------------------------ */
/*  Standalone Radio (outside a RadioGroup)                           */
/* ------------------------------------------------------------------ */

interface PrefabRadioProps extends AccessibleNameProps {
  id?: string;
  option: string;
  label?: string;
  value?: boolean;
  name?: string;
  disabled?: boolean;
  className?: string;
}

export function PrefabRadio({
  id: explicitId,
  option,
  label,
  value,
  name,
  disabled,
  className,
  ...accessibleName
}: PrefabRadioProps) {
  const generatedId = React.useId();
  const id = explicitId ?? generatedId;
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <input
        {...getAccessibleNameProps(accessibleName)}
        type="radio"
        id={id}
        name={name}
        value={option}
        defaultChecked={value}
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

interface SelectItemData extends AccessibleNameProps {
  value: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
}

interface RadioItemData extends AccessibleNameProps {
  id?: string;
  option: string;
  label?: string;
  value?: boolean;
  disabled?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Select                                                            */
/* ------------------------------------------------------------------ */

interface SelectGroupData extends AccessibleNameProps {
  labelNames?: AccessibleNameProps;
  _type: "group";
  label?: string;
  items: SelectItemData[];
}

interface SelectItemEntry {
  _type: "item";
  value: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
}

interface SelectSeparatorEntry extends AccessibleNameProps {
  _type: "separator";
}

interface SelectLabelEntry extends AccessibleNameProps {
  _type: "label";
  label?: string;
}

type SelectChildEntry =
  SelectGroupData | SelectItemEntry | SelectSeparatorEntry | SelectLabelEntry;

interface PrefabSelectProps extends AccessibleNameProps {
  placeholder?: string;
  name?: string;
  size?: "sm" | "default";
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  _items?: SelectItemData[];
  _selectChildren?: SelectChildEntry[];
  children?: React.ReactNode;
}

export function PrefabSelect({
  placeholder,
  name,
  size,
  side,
  align,
  disabled,
  invalid,
  className,
  value,
  onValueChange,
  _items = [],
  _selectChildren,
  ...accessibleName
}: PrefabSelectProps) {
  // Build a flat list of all items for label lookup
  const allItems = React.useMemo(() => {
    if (_selectChildren) {
      const items: SelectItemData[] = [];
      for (const entry of _selectChildren) {
        if (entry._type === "item") items.push(entry);
        if (entry._type === "group") items.push(...entry.items);
      }
      return items;
    }
    return _items;
  }, [_selectChildren, _items]);

  // Find default from items
  const defaultValue = allItems.find((i) => i.selected)?.value;

  // Track the current value so we can look up its label
  const [internalValue, setInternalValue] = React.useState(
    value ?? defaultValue ?? "",
  );
  React.useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  const handleChange = (val: string) => {
    setInternalValue(val);
    onValueChange?.(val);
  };

  const selectedValue = value ?? internalValue;
  const selectedLabel = allItems.find((i) => i.value === selectedValue)?.label;

  const controlProps =
    value !== undefined
      ? { value, onValueChange: handleChange }
      : { defaultValue, onValueChange: handleChange };

  const renderItem = (item: SelectItemData) => (
    <SelectItem
      {...getAccessibleNameProps(item)}
      key={item.value}
      value={item.value}
      disabled={item.disabled}
    >
      {item.label}
    </SelectItem>
  );

  return (
    <ShadcnSelect {...controlProps} disabled={disabled} name={name}>
      <SelectTrigger
        {...getAccessibleNameProps(accessibleName)}
        className={className}
        size={size}
        aria-invalid={invalid || undefined}
      >
        <SelectValue placeholder={placeholder}>
          {selectedLabel || null}
        </SelectValue>
      </SelectTrigger>
      <SelectContent side={side} align={align}>
        {_selectChildren
          ? _selectChildren.map((entry, i) => {
              if (entry._type === "group") {
                return (
                  <SelectGroup {...getAccessibleNameProps(entry)} key={i}>
                    {entry.label && (
                      <SelectGroupLabel
                        {...getAccessibleNameProps(entry.labelNames ?? {})}
                      >
                        {entry.label}
                      </SelectGroupLabel>
                    )}
                    {entry.items.map(renderItem)}
                  </SelectGroup>
                );
              }
              if (entry._type === "separator") {
                return (
                  <SelectSeparator {...getAccessibleNameProps(entry)} key={i} />
                );
              }
              if (entry._type === "label") {
                return (
                  <SelectGroupLabel {...getAccessibleNameProps(entry)} key={i}>
                    {entry.label}
                  </SelectGroupLabel>
                );
              }
              return renderItem(entry as SelectItemData);
            })
          : _items.map(renderItem)}
      </SelectContent>
    </ShadcnSelect>
  );
}

/* ------------------------------------------------------------------ */
/*  RadioGroup                                                        */
/* ------------------------------------------------------------------ */

interface PrefabRadioGroupProps extends AccessibleNameProps {
  id?: string;
  name?: string;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  _items?: RadioItemData[];
  children?: React.ReactNode;
}

export function PrefabRadioGroup({
  id,
  name,
  className,
  value,
  onValueChange,
  _items = [],
  ...accessibleName
}: PrefabRadioGroupProps) {
  const defaultValue = _items.find((i) => i.value)?.option;

  const controlProps =
    value !== undefined
      ? { value, onValueChange }
      : { defaultValue, onValueChange };

  return (
    <ShadcnRadioGroup
      id={id}
      {...getAccessibleNameProps(accessibleName)}
      {...controlProps}
      className={className}
      name={name}
    >
      {_items.map((item) => (
        <RadioOption key={item.option} item={item} />
      ))}
    </ShadcnRadioGroup>
  );
}

/** Keep DOM identity independent of state names and option values. */
function RadioOption({ item }: { item: RadioItemData }) {
  const generatedId = React.useId();
  const id = item.id ?? generatedId;
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem
        {...getAccessibleNameProps(item)}
        value={item.option}
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
}

/* ------------------------------------------------------------------ */
/*  Checkbox                                                          */
/* ------------------------------------------------------------------ */

interface PrefabCheckboxProps extends AccessibleNameProps {
  label?: string;
  value?: boolean;
  name?: string;
  disabled?: boolean;
  className?: string;
  onCheckedChange?: (checked: boolean) => void;
  children?: React.ReactNode;
}

export function PrefabCheckbox({
  label,
  value,
  name,
  disabled,
  className,
  onCheckedChange,
  ...accessibleName
}: PrefabCheckboxProps) {
  const id = name ? `checkbox-${name}` : undefined;

  // Keep local state for standalone uncontrolled usage. When value is
  // supplied, it remains authoritative even if a handler restores it.
  const [internal, setInternal] = React.useState(value ?? false);
  React.useEffect(() => {
    if (value !== undefined) setInternal(value);
  }, [value]);

  const handleChange = (val: boolean) => {
    setInternal(val);
    onCheckedChange?.(val);
  };

  const checkbox = (
    <ShadcnCheckbox
      {...getAccessibleNameProps(accessibleName)}
      id={id}
      checked={value ?? internal}
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

interface PrefabSwitchProps extends AccessibleNameProps {
  label?: string;
  value?: boolean;
  size?: "sm" | "default";
  name?: string;
  disabled?: boolean;
  className?: string;
  onCheckedChange?: (checked: boolean) => void;
  children?: React.ReactNode;
}

export function PrefabSwitch({
  label,
  value,
  size,
  name,
  disabled,
  className,
  onCheckedChange,
  ...accessibleName
}: PrefabSwitchProps) {
  const id = name ? `switch-${name}` : undefined;

  // Keep local state for standalone uncontrolled usage. A supplied value
  // remains authoritative when a change handler overrides the interaction.
  const [internal, setInternal] = React.useState(value ?? false);
  React.useEffect(() => {
    if (value !== undefined) setInternal(value);
  }, [value]);

  const handleChange = (val: boolean) => {
    setInternal(val);
    onCheckedChange?.(val);
  };

  const switchEl = (
    <ShadcnSwitch
      {...getAccessibleNameProps(accessibleName)}
      id={id}
      checked={value ?? internal}
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

interface PrefabButtonGroupProps extends AccessibleNameProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  children?: React.ReactNode;
}

export function PrefabButtonGroup({
  orientation = "horizontal",
  className,
  children,
  ...accessibleName
}: PrefabButtonGroupProps) {
  return (
    <div
      {...getAccessibleNameProps(accessibleName)}
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        "pf-button-group flex w-fit items-stretch",
        orientation === "horizontal"
          ? "pf-button-group-orientation-horizontal"
          : "pf-button-group-orientation-vertical flex-col",
        className,
      )}
    >
      {children}
    </div>
  );
}
