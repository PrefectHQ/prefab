/**
 * Compound component wrappers — bridge Python's flat API to shadcn's
 * multi-part compound components (Tabs, Accordion, Pages, etc.).
 *
 * These components receive pre-rendered React children and decompose
 * them into the proper shadcn structure. The renderer handles the
 * special-casing: instead of recursively rendering children normally,
 * it passes the raw ComponentNode children as `_childNodes` so the
 * wrapper can extract metadata (title, value, disabled) and render
 * the compound parts (triggers + content panels).
 */

import React, { type ReactNode, useState, useEffect } from "react";
import {
  Tabs as ShadcnTabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/ui/tabs";
import {
  Accordion as ShadcnAccordion,
  AccordionItem as ShadcnAccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/ui/accordion";
import { SimpleTooltip } from "@/ui/tooltip";
import {
  Popover as ShadcnPopover,
  PopoverTrigger,
  PopoverContent,
} from "@/ui/popover";
import {
  HoverCard as ShadcnHoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/ui/hover-card";
import {
  Dialog as ShadcnDialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/ui/dialog";
import { OverlayProvider } from "../overlay-context";

/** Metadata extracted from Tab/AccordionItem/Page child nodes. */
interface ChildPanel {
  title: string;
  value: string;
  disabled?: boolean;
  content: ReactNode;
}

// ── Tabs ───────────────────────────────────────────────────────────────

interface PrefabTabsProps {
  defaultValue?: string;
  value?: string;
  variant?: "default" | "line";
  orientation?: "horizontal" | "vertical";
  onValueChange?: (value: string) => void;
  className?: string;
  _panels: ChildPanel[];
}

export function PrefabTabs({
  defaultValue,
  value,
  variant,
  orientation = "horizontal",
  onValueChange,
  className,
  _panels,
}: PrefabTabsProps) {
  // Use first tab as default if none specified
  const resolvedDefault = defaultValue ?? _panels[0]?.value;

  return (
    <ShadcnTabs
      defaultValue={!value ? resolvedDefault : undefined}
      value={value}
      orientation={orientation}
      onValueChange={onValueChange}
      className={className}
    >
      <TabsList data-variant={variant}>
        {_panels.map((panel) => (
          <TabsTrigger
            key={panel.value}
            value={panel.value}
            disabled={panel.disabled}
          >
            {panel.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {_panels.map((panel) => (
        <TabsContent key={panel.value} value={panel.value}>
          {panel.content}
        </TabsContent>
      ))}
    </ShadcnTabs>
  );
}

// ── Accordion ──────────────────────────────────────────────────────────

interface PrefabAccordionProps {
  multiple?: boolean;
  collapsible?: boolean;
  defaultValues?: string[];
  className?: string;
  _panels: ChildPanel[];
}

export function PrefabAccordion({
  multiple = false,
  defaultValues,
  className,
  _panels,
}: PrefabAccordionProps) {
  return (
    <ShadcnAccordion
      multiple={multiple}
      defaultValue={defaultValues ?? []}
      className={className}
    >
      {_panels.map((panel) => (
        <ShadcnAccordionItem key={panel.value} value={panel.value}>
          <AccordionTrigger>{panel.title}</AccordionTrigger>
          <AccordionContent>{panel.content}</AccordionContent>
        </ShadcnAccordionItem>
      ))}
    </ShadcnAccordion>
  );
}

// ── Pages ──────────────────────────────────────────────────────────────

interface PrefabPagesProps {
  defaultValue?: string;
  name?: string;
  value?: string;
  className?: string;
  _panels: ChildPanel[];
}

export function PrefabPages({
  defaultValue,
  value,
  className,
  _panels,
}: PrefabPagesProps) {
  // Active page determined by value prop (from auto-state binding) or defaultValue
  const [active, setActive] = useState(
    value ?? defaultValue ?? _panels[0]?.value,
  );

  // Sync with external value changes (from state store)
  useEffect(() => {
    if (value !== undefined) {
      setActive(value);
    }
  }, [value]);

  const activePanel = _panels.find((p) => p.value === active);

  return <div className={className}>{activePanel?.content}</div>;
}

// ── Tooltip ────────────────────────────────────────────────────────────

interface PrefabTooltipProps {
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  delay?: number;
  className?: string;
  children?: ReactNode;
}

export function PrefabTooltip({
  content,
  side = "top",
  delay = 300,
  children,
}: PrefabTooltipProps) {
  return (
    <SimpleTooltip content={content} side={side} delay={delay}>
      {children}
    </SimpleTooltip>
  );
}

// ── HoverCard ─────────────────────────────────────────────────────────

interface PrefabHoverCardProps {
  side?: "top" | "right" | "bottom" | "left";
  openDelay?: number;
  closeDelay?: number;
  className?: string;
  children?: ReactNode;
}

export function PrefabHoverCard({
  side,
  openDelay,
  closeDelay,
  children,
}: PrefabHoverCardProps) {
  const childArray = React.Children.toArray(children);
  const trigger = childArray[0];
  const content = childArray.slice(1);

  return (
    <ShadcnHoverCard>
      <HoverCardTrigger delay={openDelay} closeDelay={closeDelay}>
        {trigger}
      </HoverCardTrigger>
      <HoverCardContent side={side}>{content}</HoverCardContent>
    </ShadcnHoverCard>
  );
}

// ── Popover ────────────────────────────────────────────────────────────

interface PrefabPopoverProps {
  title?: string;
  description?: string;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  children?: ReactNode;
}

export function PrefabPopover({
  title,
  description,
  side,
  children,
}: PrefabPopoverProps) {
  const [open, setOpen] = useState(false);
  const childArray = React.Children.toArray(children);
  const trigger = childArray[0];
  const content = childArray.slice(1);

  return (
    <ShadcnPopover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent side={side} className="w-80">
        <OverlayProvider close={() => setOpen(false)}>
          {title && (
            <div className="mb-4 space-y-1">
              <h4 className="font-medium leading-none">{title}</h4>
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          )}
          {content}
        </OverlayProvider>
      </PopoverContent>
    </ShadcnPopover>
  );
}

// ── Dialog ─────────────────────────────────────────────────────────────

interface PrefabDialogProps {
  title?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

export function PrefabDialog({
  title,
  description,
  children,
}: PrefabDialogProps) {
  const [open, setOpen] = useState(false);
  const childArray = React.Children.toArray(children);
  const trigger = childArray[0];
  const content = childArray.slice(1);

  return (
    <ShadcnDialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <OverlayProvider close={() => setOpen(false)}>
          {(title || description) && (
            <DialogHeader>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          )}
          {content}
        </OverlayProvider>
      </DialogContent>
    </ShadcnDialog>
  );
}
