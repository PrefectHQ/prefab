/**
 * Prop transformation utilities for the renderer.
 *
 * Pure functions that bridge Python's component API to shadcn/React:
 *   - bindActions: replaces action spec objects with event handler functions
 *   - mapProps: renames Python prop names to React/shadcn equivalents
 *   - filterInternalProps: strips internal-only props before DOM render
 */

import type { App } from "@modelcontextprotocol/ext-apps";
import { executeActions, type ActionSpec } from "./actions";
import type { StateStore } from "./state";
import type { OverlayCloseFn } from "./overlay-context";

/** Props that carry action specs (serialized from Python Action types). */
export const ACTION_PROPS = new Set(["onClick", "onChange", "onSubmit"]);

/**
 * Types whose children represent data items rather than nested components.
 * The renderer pre-interpolates these children and passes them as `_items`
 * to the wrapper component, which internally composes shadcn primitives.
 */
export const ITEM_CHILD_TYPES: Record<string, string[]> = {
  Select: ["value", "label", "selected", "disabled"],
  RadioGroup: ["value", "label", "checked", "disabled"],
};

/**
 * Bind action props — replace action spec objects with actual event handlers.
 *
 * The `scope` parameter captures render-time scope (ForEach $index, $item,
 * let bindings) so that action templates can reference those variables
 * alongside $event at execution time.
 */
export function bindActions(
  props: Record<string, unknown>,
  app: App | null,
  state: StateStore,
  scope: Record<string, unknown>,
  overlayClose?: OverlayCloseFn,
): Record<string, unknown> {
  const bound = { ...props };

  for (const propName of ACTION_PROPS) {
    const spec = bound[propName];
    if (!spec) continue;

    // Skip if already a function (e.g., from auto-state)
    if (typeof spec === "function") continue;

    const actionSpec = spec as ActionSpec | ActionSpec[];
    bound[propName] = async (event?: unknown) => {
      // For form submits, collect all named input values into state
      // before dispatching actions. This ensures template interpolation
      // resolves from actual form values even if auto-state hasn't
      // fired (e.g., untouched inputs with defaults).
      if (
        propName === "onSubmit" &&
        event &&
        typeof event === "object" &&
        "target" in event
      ) {
        const form = (event as { target: EventTarget }).target;
        if (form instanceof HTMLFormElement) {
          const formData = new FormData(form);
          for (const [key, value] of formData.entries()) {
            if (typeof value === "string") {
              state.set(key, value);
            }
          }
        }
      }

      // For DOM events, extract the meaningful value
      let eventValue = event;
      if (event && typeof event === "object" && "target" in event) {
        const target = (event as { target: HTMLInputElement }).target;
        if (target.type === "checkbox") {
          eventValue = target.checked;
        } else {
          eventValue = target.value;
        }
      }
      // Slider returns an array — unwrap single-thumb to scalar,
      // keep array for range mode (two thumbs)
      if (Array.isArray(event) && typeof event[0] === "number") {
        eventValue = props.range ? event : event[0];
      }
      await executeActions(
        actionSpec,
        app,
        state,
        eventValue,
        0,
        undefined,
        scope,
        overlayClose,
      );
    };
  }

  return bound;
}

/**
 * Map Python prop names to what shadcn/React components expect.
 *
 * This runs AFTER bindActions, so action props may already be
 * handler functions — we just move them to the right prop name.
 */
export function mapProps(
  type: string,
  props: Record<string, unknown>,
): Record<string, unknown> {
  const mapped = { ...props };

  // Button/Badge: "label" → children text
  if (type === "Button" || type === "Badge") {
    if ("label" in mapped) {
      mapped._textContent = mapped.label;
      delete mapped.label;
    }
  }

  // Text/Heading/typography: "text" or "content" → children
  if (
    type === "Text" ||
    type === "Heading" ||
    type === "P" ||
    type === "Lead" ||
    type === "Large" ||
    type === "Small" ||
    type === "Muted" ||
    type === "InlineCode" ||
    type === "BlockQuote" ||
    type === "H1" ||
    type === "H2" ||
    type === "H3" ||
    type === "H4" ||
    type === "Label"
  ) {
    if ("text" in mapped) {
      mapped._textContent = mapped.text;
      delete mapped.text;
    } else if ("content" in mapped) {
      mapped._textContent = mapped.content;
      delete mapped.content;
    }
  }

  // Card/Alert sub-components: title, description → children
  if (
    type === "CardTitle" ||
    type === "CardDescription" ||
    type === "AlertTitle" ||
    type === "AlertDescription"
  ) {
    for (const key of ["title", "description", "text", "content"]) {
      if (key in mapped) {
        mapped._textContent = mapped[key];
        delete mapped[key];
      }
    }
  }

  // Table sub-components: content → children text
  if (type === "TableHead" || type === "TableCell" || type === "TableCaption") {
    if ("content" in mapped) {
      mapped._textContent = mapped.content;
      delete mapped.content;
    }
  }

  // Input: inputType → type (avoids collision with component discriminator)
  if (type === "Input" && "inputType" in mapped) {
    mapped.type = mapped.inputType;
    delete mapped.inputType;
  }

  // Button: buttonType → type (avoids collision with component discriminator)
  if (type === "Button" && "buttonType" in mapped) {
    if (mapped.buttonType) {
      mapped.type = mapped.buttonType;
    }
    delete mapped.buttonType;
  }

  // Label: forId → htmlFor
  if (type === "Label" && "forId" in mapped) {
    mapped.htmlFor = mapped.forId;
    delete mapped.forId;
  }

  // Slider: shadcn uses onValueChange and value as array
  if (type === "Slider") {
    if ("onChange" in mapped) {
      mapped.onValueChange = mapped.onChange;
      delete mapped.onChange;
    }
    // Normalize value to array for shadcn's array API.
    // Range mode already provides [low, high]; single mode wraps to [value].
    if ("value" in mapped && mapped.value != null) {
      const arrayValue = Array.isArray(mapped.value)
        ? mapped.value
        : [mapped.value];
      if (mapped.onValueChange) {
        mapped.value = arrayValue;
      } else {
        mapped.defaultValue = arrayValue;
        delete mapped.value;
      }
    }
    // Wrap bare-number defaultValue for shadcn's array API
    if ("defaultValue" in mapped && typeof mapped.defaultValue === "number") {
      mapped.defaultValue = [mapped.defaultValue];
    }
    if ("min" in mapped) mapped.min = Number(mapped.min);
    if ("max" in mapped) mapped.max = Number(mapped.max);
    if ("step" in mapped) mapped.step = Number(mapped.step);
    // Remove range prop — only used for event handling, not passed to shadcn
    delete mapped.range;
    // Map indicatorClass → indicatorClassName for the React component
    if ("indicatorClass" in mapped) {
      mapped.indicatorClassName = mapped.indicatorClass;
      delete mapped.indicatorClass;
    }
  }

  // Progress: normalize value to 0-100 percentage from min/max range,
  // and map indicatorClass → indicatorClassName
  if (type === "Progress") {
    const min = (mapped.min as number) ?? 0;
    const max = (mapped.max as number) ?? 100;
    const val = (mapped.value as number) ?? 0;
    const range = max - min;
    if (range > 0) {
      mapped.value = ((val - min) / range) * 100;
    }
    delete mapped.min;
    delete mapped.max;
    if ("indicatorClass" in mapped) {
      mapped.indicatorClassName = mapped.indicatorClass;
      delete mapped.indicatorClass;
    }
  }

  // Ring: normalize value to 0-100 percentage from min/max range
  if (type === "Ring") {
    const min = (mapped.min as number) ?? 0;
    const max = (mapped.max as number) ?? 100;
    const val = (mapped.value as number) ?? 0;
    const range = max - min;
    if (range > 0) {
      mapped.value = ((val - min) / range) * 100;
    }
    delete mapped.min;
    delete mapped.max;
    if ("indicatorClass" in mapped) {
      mapped.indicatorClassName = mapped.indicatorClass;
      delete mapped.indicatorClass;
    }
  }

  // Select/RadioGroup/Combobox: onChange → onValueChange
  if (
    (type === "Select" || type === "RadioGroup" || type === "Combobox") &&
    "onChange" in mapped
  ) {
    mapped.onValueChange = mapped.onChange;
    delete mapped.onChange;
  }

  // Checkbox/Switch: onChange → onCheckedChange
  if ((type === "Checkbox" || type === "Switch") && "onChange" in mapped) {
    mapped.onCheckedChange = mapped.onChange;
    delete mapped.onChange;
  }

  // Calendar/DatePicker: onChange → onSelect
  if ((type === "Calendar" || type === "DatePicker") && "onChange" in mapped) {
    mapped.onSelect = mapped.onChange;
    delete mapped.onChange;
  }

  // cssClass → className (shadcn components use className)
  if ("cssClass" in mapped) {
    mapped.className = mapped.cssClass;
    delete mapped.cssClass;
  }

  return mapped;
}

/** Filter out internal props that shouldn't be passed to DOM/React. */
export function filterInternalProps(
  props: Record<string, unknown>,
): Record<string, unknown> {
  const filtered = { ...props };
  delete filtered._textContent;
  return filtered;
}
