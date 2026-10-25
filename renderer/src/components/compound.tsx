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

import React, { type ReactNode, useState, useEffect, useCallback } from "react";
import { useStateContext } from "../state-context";
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
import {
  getAccessibleNameProps,
  type AccessibleNameProps,
} from "../accessibility";

/** Metadata extracted from Tab/AccordionItem/Page child nodes. */
interface ChildPanel extends AccessibleNameProps {
  title: string;
  value: string;
  disabled?: boolean;
  content: ReactNode;
}

// ── Tabs ───────────────────────────────────────────────────────────────

interface PrefabTabsProps extends AccessibleNameProps {
  value?: string;
  variant?: "default" | "line";
  orientation?: "horizontal" | "vertical";
  onValueChange?: (value: string) => void;
  className?: string;
  _panels: ChildPanel[];
}

export function PrefabTabs({
  value,
  variant,
  orientation = "horizontal",
  onValueChange,
  className,
  _panels,
  ...accessibleName
}: PrefabTabsProps) {
  // Use first tab as default if none specified
  const resolvedDefault = value ?? _panels[0]?.value;

  return (
    <ShadcnTabs
      defaultValue={!onValueChange ? resolvedDefault : undefined}
      value={onValueChange ? value : undefined}
      orientation={orientation}
      onValueChange={onValueChange}
      className={className}
    >
      <TabsList
        {...getAccessibleNameProps(accessibleName)}
        data-variant={variant}
      >
        {_panels.map((panel) => (
          <TabsTrigger
            {...getAccessibleNameProps(panel)}
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

interface PrefabAccordionProps extends AccessibleNameProps {
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
  ...accessibleName
}: PrefabAccordionProps) {
  return (
    <ShadcnAccordion
      {...getAccessibleNameProps(accessibleName)}
      multiple={multiple}
      defaultValue={defaultValues ?? []}
      className={className}
    >
      {_panels.map((panel) => (
        <ShadcnAccordionItem key={panel.value} value={panel.value}>
          <AccordionTrigger {...getAccessibleNameProps(panel)}>
            {panel.title}
          </AccordionTrigger>
          <AccordionContent>{panel.content}</AccordionContent>
        </ShadcnAccordionItem>
      ))}
    </ShadcnAccordion>
  );
}

// ── Pages ──────────────────────────────────────────────────────────────

interface PrefabPagesProps extends AccessibleNameProps {
  name?: string;
  value?: string;
  className?: string;
  _panels: ChildPanel[];
}

export function PrefabPages({
  value,
  className,
  _panels,
  ...accessibleName
}: PrefabPagesProps) {
  const [active, setActive] = useState(value ?? _panels[0]?.value);

  // Sync with external value changes (from state store)
  useEffect(() => {
    if (value !== undefined) {
      setActive(value);
    }
  }, [value]);

  return (
    <div {...getAccessibleNameProps(accessibleName)} className={className}>
      {_panels.map((panel) => (
        <div
          key={panel.value}
          {...getAccessibleNameProps(panel)}
          style={panel.value !== active ? { display: "none" } : undefined}
        >
          {panel.content}
        </div>
      ))}
    </div>
  );
}

// ── Tooltip ────────────────────────────────────────────────────────────

interface PrefabTooltipProps extends AccessibleNameProps {
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
  ...accessibleName
}: PrefabTooltipProps) {
  return (
    <SimpleTooltip
      {...getAccessibleNameProps(accessibleName)}
      content={content}
      side={side}
      delay={delay}
    >
      {children}
    </SimpleTooltip>
  );
}

// ── HoverCard ─────────────────────────────────────────────────────────

interface PrefabHoverCardProps extends AccessibleNameProps {
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
  ...accessibleName
}: PrefabHoverCardProps) {
  const childArray = React.Children.toArray(children);
  const trigger = childArray[0];
  const content = childArray.slice(1);

  return (
    <ShadcnHoverCard>
      <HoverCardTrigger delay={openDelay} closeDelay={closeDelay}>
        {trigger}
      </HoverCardTrigger>
      <HoverCardContent {...getAccessibleNameProps(accessibleName)} side={side}>
        {content}
      </HoverCardContent>
    </ShadcnHoverCard>
  );
}

// ── Popover ────────────────────────────────────────────────────────────

interface PrefabPopoverProps extends AccessibleNameProps {
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
  ...accessibleName
}: PrefabPopoverProps) {
  const [open, setOpen] = useState(false);
  const childArray = React.Children.toArray(children);
  const trigger = childArray[0];
  const content = childArray.slice(1);

  return (
    <ShadcnPopover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent
        {...getAccessibleNameProps(accessibleName)}
        side={side}
        className="w-80"
      >
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

interface PrefabDialogProps extends AccessibleNameProps {
  title?: string;
  description?: string;
  name?: string;
  dismissible?: boolean;
  className?: string;
  children?: ReactNode;
}

export function PrefabDialog({
  title,
  description,
  name,
  dismissible = true,
  children,
  ...accessibleName
}: PrefabDialogProps) {
  const [localOpen, setLocalOpen] = useState(false);
  const state = useStateContext();

  // When name is set, sync with state store
  const stateOpen = name && state ? !!state.get(name) : undefined;
  const open = stateOpen ?? localOpen;
  const setOpen = useCallback(
    (v: boolean) => {
      if (name && state) {
        state.set(name, v);
      } else {
        setLocalOpen(v);
      }
    },
    [name, state],
  );

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      // When not dismissible, only allow opening — closing must go
      // through CloseOverlay which calls setOpen(false) directly.
      if (!dismissible && !nextOpen) {
        return;
      }
      setOpen(nextOpen);
    },
    [dismissible, setOpen],
  );

  // React to external state changes
  useEffect(() => {
    if (stateOpen !== undefined) {
      setLocalOpen(stateOpen);
    }
  }, [stateOpen]);

  const childArray = React.Children.toArray(children);
  const trigger = childArray[0];
  const content = childArray.slice(1);

  return (
    <ShadcnDialog
      open={open}
      onOpenChange={handleOpenChange}
      disablePointerDismissal={!dismissible}
    >
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent
        {...getAccessibleNameProps(accessibleName)}
        hideClose={!dismissible}
      >
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
