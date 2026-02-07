/**
 * Recursive JSON → React tree renderer.
 *
 * Takes a component tree (from Python's to_dict()) and renders it
 * using real shadcn/ui components looked up from the registry.
 *
 * Interpolation context is built from state + scope:
 *   - state.getAll() provides all client-side state (bare name access)
 *   - scope provides local overrides (ForEach item properties)
 *   - $event is injected by action handlers only (see actions.ts)
 */

import type { App } from "@modelcontextprotocol/ext-apps";
import { REGISTRY } from "./components/registry";
import { interpolateProps, interpolateString } from "./interpolation";
import { executeActions, type ActionSpec } from "./actions";
import type { StateStore } from "./state";
import { evaluateCondition } from "./conditions";
import { validateNode } from "./validation";
import { ValidationError } from "./components/validation-error";

/** Shape of a node in the JSON component tree. */
export interface ComponentNode {
  type: string;
  children?: ComponentNode[];
  visibleWhen?: string;
  // All other props are component-specific
  [key: string]: unknown;
}

interface RenderNodeProps {
  node: ComponentNode;
  /** Local interpolation scope (ForEach item properties). Empty for most nodes. */
  scope: Record<string, unknown>;
  state: StateStore;
  app: App | null;
}

/** Props that carry action specs (serialized from Python Action types). */
const ACTION_PROPS = new Set(["onClick", "onChange", "onSubmit"]);

/**
 * Types whose children represent data items rather than nested components.
 * The renderer pre-interpolates these children and passes them as `_items`
 * to the wrapper component, which internally composes shadcn primitives.
 */
const ITEM_CHILD_TYPES: Record<string, string[]> = {
  Select: ["value", "label", "selected", "disabled"],
  RadioGroup: ["value", "label", "checked", "disabled"],
};

/**
 * Bind action props — replace action spec objects with actual event handlers.
 */
function bindActions(
  props: Record<string, unknown>,
  app: App | null,
  state: StateStore,
): Record<string, unknown> {
  const bound = { ...props };

  for (const propName of ACTION_PROPS) {
    const spec = bound[propName];
    if (!spec) continue;

    // Skip if already a function (e.g., from auto-state)
    if (typeof spec === "function") continue;

    const actionSpec = spec as ActionSpec | ActionSpec[];
    bound[propName] = async (event?: unknown) => {
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
      // Slider returns an array
      if (Array.isArray(event) && typeof event[0] === "number") {
        eventValue = event[0];
      }
      await executeActions(actionSpec, app, state, eventValue);
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
function mapProps(
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
    if ("value" in mapped && typeof mapped.value === "number") {
      if (mapped.onValueChange) {
        mapped.value = [mapped.value];
      } else {
        mapped.defaultValue = [mapped.value];
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
  }

  // Progress: normalize value to 0-100 percentage if max differs,
  // and map indicatorClass → indicatorClassName
  if (type === "Progress") {
    const max = (mapped.max as number) ?? 100;
    const val = (mapped.value as number) ?? 0;
    if (max !== 100 && max > 0) {
      mapped.value = (val / max) * 100;
    }
    delete mapped.max;
    if ("indicatorClass" in mapped) {
      mapped.indicatorClassName = mapped.indicatorClass;
      delete mapped.indicatorClass;
    }
  }

  // Select/RadioGroup: onChange → onValueChange
  if ((type === "Select" || type === "RadioGroup") && "onChange" in mapped) {
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
function filterInternalProps(
  props: Record<string, unknown>,
): Record<string, unknown> {
  const filtered = { ...props };
  delete filtered._textContent;
  delete filtered.visibleWhen;
  return filtered;
}

/**
 * Render a single node from the JSON component tree.
 */
export function RenderNode({ node, scope, state, app }: RenderNodeProps) {
  const { type, children, visibleWhen, ...rawProps } = node;

  // Validate node against its Zod schema before any processing
  const validationError = validateNode(node);
  if (validationError) {
    return <ValidationError error={validationError} node={node} />;
  }

  // Conditional rendering via expression evaluator
  if (visibleWhen) {
    const ctx = { ...state.getAll(), ...scope };
    if (!evaluateCondition(visibleWhen, ctx)) return null;
  }

  const Component = REGISTRY[type];
  if (!Component) {
    console.warn(`[Prefab] Unknown component type: ${type}`);
    return null;
  }

  // Build interpolation context: state + local scope (ForEach overrides)
  const ctx: Record<string, unknown> = {
    ...state.getAll(),
    ...scope,
  };

  // Interpolate {{ ... }} templates in string props
  const interpolated = interpolateProps(rawProps, ctx);

  // Bind action specs to event handlers BEFORE mapProps renames them.
  // This ensures bindActions sees "onChange" (which is in ACTION_PROPS)
  // before mapProps renames it to "onValueChange"/"onCheckedChange".
  const bound = bindActions(interpolated, app, state);

  // Map Python prop names to React/shadcn prop names
  const mapped = mapProps(type, bound);

  // Extract text content (set by mapProps for Button, Text, etc.)
  const textContent = mapped._textContent as string | undefined;

  // Filter internal props before passing to component
  const finalProps = filterInternalProps(mapped);

  // --- Custom child handling: composite components ---
  // Select and RadioGroup consume their children as data items
  // rather than rendering them as nested React components.
  if (type in ITEM_CHILD_TYPES && children) {
    const fields = ITEM_CHILD_TYPES[type];
    const items = children.map((child) => {
      const item: Record<string, unknown> = {};
      for (const field of fields) {
        if (field in child) {
          const val = child[field];
          item[field] =
            typeof val === "string" ? interpolateString(val, ctx) : val;
        }
      }
      return item;
    });
    finalProps._items = items;

    // Auto-state for Select/RadioGroup with name prop
    if ("name" in finalProps && typeof finalProps.name === "string") {
      const name = finalProps.name;
      const stateValue = state.get(name);
      if (stateValue !== undefined) {
        finalProps.value = String(stateValue);
      }
      if (!finalProps.onValueChange) {
        finalProps.onValueChange = (val: string) => state.set(name, val);
      }
    }

    return <Component {...finalProps}>{textContent}</Component>;
  }

  // --- Auto-state for named form inputs ---
  if ("name" in finalProps && typeof finalProps.name === "string") {
    const name = finalProps.name;
    const stateValue = state.get(name);

    if (type === "Input" || type === "Textarea") {
      if (stateValue !== undefined) {
        finalProps.value = String(stateValue);
      }
      if (!finalProps.onChange) {
        finalProps.onChange = (e: { target: { value: string } }) => {
          state.set(name, e.target.value);
        };
      }
    } else if (type === "Checkbox" || type === "Switch") {
      if (stateValue !== undefined) {
        finalProps.checked = Boolean(stateValue);
      }
      if (!finalProps.onCheckedChange) {
        finalProps.onCheckedChange = (checked: boolean) => {
          state.set(name, checked);
        };
      }
    } else if (type === "Slider") {
      if (stateValue !== undefined) {
        finalProps.value = [Number(stateValue)];
      }
      if (!finalProps.onValueChange) {
        finalProps.onValueChange = (values: number[]) => {
          state.set(name, values[0]);
        };
      }
    } else if (type === "Calendar" || type === "DatePicker") {
      if (stateValue !== undefined) {
        finalProps.value = String(stateValue);
      }
      if (!finalProps.onSelect) {
        finalProps.onSelect = (val: unknown) => {
          state.set(name, val);
        };
      }
    }
  }

  // Handle compound containers (Tabs, Accordion, Pages) — decompose
  // children into panels with metadata + rendered content
  const COMPOUND_TYPES = new Set(["Tabs", "Accordion", "Pages"]);
  if (COMPOUND_TYPES.has(type) && children) {
    const panels = children.map((child, i) => ({
      title: (child.title as string) ?? `Item ${i + 1}`,
      value: (child.value as string) ?? (child.title as string) ?? `item-${i}`,
      disabled: (child.disabled as boolean) ?? false,
      content: (
        <>
          {child.children?.map((grandchild, j) => (
            <RenderNode
              key={`${i}-${j}`}
              node={grandchild}
              scope={scope}
              state={state}
              app={app}
            />
          ))}
        </>
      ),
    }));

    // Auto-state for Tabs/Pages with name prop
    if ("name" in finalProps && typeof finalProps.name === "string") {
      const name = finalProps.name;
      const stateValue = state.get(name);
      if (stateValue !== undefined) {
        finalProps.value = String(stateValue);
      }
      if (!finalProps.onValueChange) {
        finalProps.onValueChange = (val: string) => state.set(name, val);
      }
    }

    finalProps._panels = panels;
    return <Component {...finalProps} />;
  }

  // Handle ForEach specially — iterate over data array
  if (type === "ForEach" && children) {
    const key = (rawProps.key ?? rawProps.itemKey) as string | undefined;
    const items = key ? (resolve(key, ctx) as unknown[]) : [];
    if (!Array.isArray(items)) return null;

    return (
      <>
        {items.map((item, idx) => {
          const itemScope =
            typeof item === "object" && item !== null
              ? { ...scope, ...(item as Record<string, unknown>) }
              : { ...scope, _item: item };
          return children.map((child, childIdx) => (
            <RenderNode
              key={`${idx}-${childIdx}`}
              node={child}
              scope={itemScope}
              state={state}
              app={app}
            />
          ));
        })}
      </>
    );
  }

  // Render children recursively
  const renderedChildren = children?.map((child, i) => (
    <RenderNode key={i} node={child} scope={scope} state={state} app={app} />
  ));

  // Leaf components with no text content or children must render
  // without a children slot — void HTML elements (input, img, etc.)
  // throw if given any children at all.
  const hasContent =
    textContent || (renderedChildren && renderedChildren.length > 0);
  if (!hasContent) {
    return <Component {...finalProps} />;
  }

  return (
    <Component {...finalProps}>
      {textContent}
      {renderedChildren}
    </Component>
  );
}

/** Resolve a dot-path (duplicated from interpolation for ForEach). */
function resolve(path: string, data: Record<string, unknown>): unknown {
  const parts = path.split(".");
  let current: unknown = data;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

/**
 * Top-level tree renderer.
 */
export function RenderTree({
  tree,
  state,
  app,
}: {
  tree: ComponentNode;
  state: StateStore;
  app: App | null;
}) {
  return <RenderNode node={tree} scope={{}} state={state} app={app} />;
}
