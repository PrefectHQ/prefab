import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { usePortalContainer } from "../portal-container"

/**
 * Context to pass a close callback from Select root to SelectContent.
 * Needed because Base UI's outside-click detection doesn't work inside
 * shadow DOM (event retargeting), so we add our own backdrop.
 */
const SelectCloseContext = React.createContext<{
  close: () => void
  open: boolean
} | null>(null)

function Select({
  onValueChange,
  onOpenChange,
  open: openProp,
  ...props
}: Omit<SelectPrimitive.Root.Props<string>, "onValueChange"> & {
  onValueChange?: (value: string) => void
}) {
  const [openInternal, setOpenInternal] = React.useState(false)
  const open = openProp ?? openInternal

  const handleOpenChange: NonNullable<
    SelectPrimitive.Root.Props<string>["onOpenChange"]
  > = (nextOpen, eventDetails) => {
    setOpenInternal(nextOpen)
    onOpenChange?.(nextOpen, eventDetails)
  }

  return (
    <SelectCloseContext.Provider
      value={React.useMemo(
        () => ({
          close: () => setOpenInternal(false),
          open,
        }),
        [open],
      )}
    >
      <SelectPrimitive.Root
        data-slot="select"
        open={open}
        onOpenChange={handleOpenChange}
        onValueChange={
          onValueChange
            ? (value: string | null) => {
                if (value !== null) onValueChange(value)
              }
            : undefined
        }
        {...props}
      />
    </SelectCloseContext.Provider>
  )
}

function SelectValue({
  ...props
}: SelectPrimitive.Value.Props) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "pf-select-trigger flex w-full cursor-pointer items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDown className="pf-select-trigger-icon pointer-events-none" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  const container = usePortalContainer();
  const ctx = React.useContext(SelectCloseContext);
  return (
    <SelectPrimitive.Portal container={container}>
      {/* Manual backdrop for shadow DOM — Base UI's outside-click
          detection doesn't work when the portal is inside a shadow root
          because of event retargeting. */}
      {ctx?.open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => ctx.close()}
        />
      )}
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            "pf-select-content relative isolate z-50 max-h-(--available-height) origin-(--transform-origin) overflow-x-hidden overflow-y-auto",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectGroup({
  className,
  children,
  ...props
}: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("pf-select-group scroll-my-1 p-1", className)}
      {...props}
    >
      {children}
    </SelectPrimitive.Group>
  )
}

function SelectGroupLabel({
  className,
  children,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-group-label"
      className={cn(
        "pf-select-group-label px-1.5 py-1.5 text-xs text-muted-foreground/70 pointer-events-none select-none",
        className
      )}
      {...props}
    >
      {children}
    </SelectPrimitive.GroupLabel>
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "pf-select-item relative flex w-full cursor-pointer items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={<span className="pf-select-item-indicator" />}
      >
        <Check className="pf-select-item-indicator-icon pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="select-separator"
      className={cn("pf-select-separator -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn("pf-select-scroll-up-button", className)}
      {...props}
    >
      <ChevronUp />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn("pf-select-scroll-down-button", className)}
      {...props}
    >
      <ChevronDown />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
