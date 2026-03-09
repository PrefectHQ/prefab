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
import { useRef } from "react";
import { REGISTRY } from "./components/registry";
import { interpolateProps, interpolateString } from "./interpolation";
import type { StateStore } from "./state";
import { useOverlayClose } from "./overlay-context";
import { evaluateCondition } from "./conditions";
import { validateNode } from "./validation";
import { ValidationError } from "./components/validation-error";
import {
  collectComponentState,
  autoAssignName,
  resetAutoNameCounter,
} from "./auto-name";
import {
  ACTION_PROPS,
  ITEM_CHILD_TYPES,
  SELECT_GROUP_FIELDS,
  bindActions,
  mapProps,
  filterInternalProps,
} from "./prop-transforms";

/** Shape of a node in the JSON component tree. */
export interface ComponentNode {
  type: string;
  children?: ComponentNode[];
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

/**
 * Render a single node from the JSON component tree.
 */
export function RenderNode({ node, scope, state, app }: RenderNodeProps) {
  const overlayClose = useOverlayClose();

  // $ref resolution: inline a defined template before any other processing
  if ("$ref" in node && typeof node["$ref"] === "string") {
    const defs = (scope.$defs as Record<string, ComponentNode>) || {};
    const refName = node["$ref"] as string;
    const defNode = defs[refName];
    if (!defNode) {
      console.warn(`[Prefab] Unknown $ref: "${refName}"`);
      return null;
    }
    // Circular ref guard
    const resolving = (scope.$resolving as Set<string>) || new Set<string>();
    if (resolving.has(refName)) {
      console.warn(`[Prefab] Circular $ref: "${refName}"`);
      return null;
    }
    let newScope: Record<string, unknown> = {
      ...scope,
      $resolving: new Set([...resolving, refName]),
    };
    // Evaluate let bindings on the $ref node
    const letBindings = node["let"] as Record<string, unknown> | undefined;
    if (letBindings) {
      const ctx = { ...state.getAll(), ...newScope };
      const evaluated = interpolateProps(letBindings, ctx) as Record<
        string,
        unknown
      >;
      newScope = { ...newScope, ...evaluated };
    }
    const refCssClass = node["cssClass"] as string | undefined;
    const resolved = (
      <RenderNode node={defNode} scope={newScope} state={state} app={app} />
    );
    if (refCssClass) {
      return <div className={refCssClass}>{resolved}</div>;
    }
    return resolved;
  }

  const { type, children, ...rawProps } = node;

  // Validate node against its Zod schema before any processing
  const validationError = validateNode(node);
  if (validationError) {
    return <ValidationError error={validationError} node={node} />;
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

  // Separate action specs from regular props. Action specs must NOT be
  // interpolated at render time — they contain $event/$error references
  // that only exist at action execution time. Interpolating here would
  // prematurely resolve expressions like `{{ $event ? x : y }}` with
  // $event=undefined.
  const propsToInterpolate: Record<string, unknown> = {};
  const rawActionSpecs: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(rawProps)) {
    if (ACTION_PROPS.has(key) && value != null && typeof value === "object") {
      rawActionSpecs[key] = value;
    } else {
      propsToInterpolate[key] = value;
    }
  }

  // Interpolate {{ ... }} templates in non-action props only
  const interpolated = interpolateProps(propsToInterpolate, ctx);

  // Re-attach raw action specs, then bind them to event handlers.
  // bindActions captures the current scope so action execution can
  // resolve both scope vars ($index, $item) and event vars ($event).
  const withActions = { ...interpolated, ...rawActionSpecs };
  const bound = bindActions(withActions, app, state, scope, overlayClose);

  // Map Python prop names to React/shadcn prop names
  const mapped = mapProps(type, bound);

  // Extract text content (set by mapProps for Button, Text, etc.)
  // Expressions can resolve to numbers/booleans via type preservation.
  const textContent = mapped._textContent as string | number | undefined;

  // Filter internal props before passing to component
  const finalProps = filterInternalProps(mapped);

  // Auto-assign name to stateful components when missing.
  // This mirrors Python's eager name generation so protocol/JSON authors
  // don't need to supply names manually.
  autoAssignName(type, finalProps);

  // --- Custom child handling: Combobox with groups/separators ---
  // Combobox children may include ComboboxGroup, ComboboxLabel,
  // ComboboxSeparator alongside flat ComboboxOption children.
  if (type === "Combobox" && children) {
    const hasGroups = children.some((c) => c.type === "ComboboxGroup");

    if (hasGroups) {
      // Build structured groups data
      const groups: { label?: string; items: Record<string, unknown>[] }[] = [];
      for (const child of children) {
        if (child.type === "ComboboxGroup" && child.children) {
          const group: { label?: string; items: Record<string, unknown>[] } = {
            items: [],
          };
          for (const gc of child.children) {
            if (gc.type === "ComboboxLabel" && "label" in gc) {
              const val = gc.label;
              group.label = (
                typeof val === "string" ? interpolateString(val, ctx) : val
              ) as string;
            } else if (gc.type === "ComboboxOption") {
              const item: Record<string, unknown> = {};
              for (const field of ["value", "label", "disabled"]) {
                if (field in gc) {
                  const val = gc[field];
                  item[field] =
                    typeof val === "string" ? interpolateString(val, ctx) : val;
                }
              }
              group.items.push(item);
            }
          }
          groups.push(group);
        }
      }
      finalProps._groups = groups;
    } else {
      // Flat items with optional separators
      const items: Record<string, unknown>[] = [];
      const separatorIndices: number[] = [];
      for (const child of children) {
        if (child.type === "ComboboxSeparator") {
          separatorIndices.push(items.length);
        } else if (child.type === "ComboboxOption") {
          const item: Record<string, unknown> = {};
          for (const field of ["value", "label", "disabled"]) {
            if (field in child) {
              const val = child[field];
              item[field] =
                typeof val === "string" ? interpolateString(val, ctx) : val;
            }
          }
          items.push(item);
        }
      }
      finalProps._items = items;
      if (separatorIndices.length > 0) {
        finalProps._separatorIndices = separatorIndices;
      }
    }

    // Auto-state for Combobox with name prop
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

  // --- Custom child handling: composite components ---
  // Select and RadioGroup consume their children as data items
  // rather than rendering them as nested React components.
  if (type in ITEM_CHILD_TYPES && children) {
    // Select with structured children (groups, separators, standalone labels):
    // extract into _selectChildren data format
    const hasStructured =
      type === "Select" &&
      children.some(
        (c) =>
          c.type === "SelectGroup" ||
          c.type === "SelectSeparator" ||
          c.type === "SelectLabel",
      );

    if (hasStructured) {
      const extractItem = (child: ComponentNode) => {
        const item: Record<string, unknown> = {};
        for (const field of SELECT_GROUP_FIELDS) {
          if (field in child) {
            const val = child[field];
            item[field] =
              typeof val === "string" ? interpolateString(val, ctx) : val;
          }
        }
        return item;
      };

      // Build structured children: groups, separators, labels, and top-level options
      const selectChildren: Record<string, unknown>[] = [];
      for (const child of children) {
        if (child.type === "SelectGroup") {
          const groupItems: Record<string, unknown>[] = [];
          let groupLabel: string | undefined;
          for (const gc of child.children ?? []) {
            if (gc.type === "SelectLabel") {
              const rawLabel = gc.label;
              groupLabel =
                typeof rawLabel === "string"
                  ? (interpolateString(rawLabel, ctx) as string)
                  : undefined;
            } else if (gc.type === "SelectOption") {
              groupItems.push(extractItem(gc));
            }
          }
          selectChildren.push({
            _type: "group",
            label: groupLabel,
            items: groupItems,
          });
        } else if (child.type === "SelectSeparator") {
          selectChildren.push({ _type: "separator" });
        } else if (child.type === "SelectLabel") {
          const rawLabel = child.label;
          const label =
            typeof rawLabel === "string"
              ? (interpolateString(rawLabel, ctx) as string)
              : undefined;
          selectChildren.push({ _type: "label", label });
        } else if (child.type === "SelectOption") {
          selectChildren.push({ _type: "item", ...extractItem(child) });
        }
      }
      finalProps._selectChildren = selectChildren;
    } else {
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
    }

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
      const isRange = Boolean(finalProps.range);
      if (stateValue !== undefined) {
        finalProps.value = isRange
          ? (stateValue as number[])
          : [Number(stateValue)];
      }
      // Always sync slider's own state so the controlled value updates.
      // If the user also provided onValueChange (via on_change), wrap it.
      const userHandler = finalProps.onValueChange as
        | ((val: number | readonly number[]) => void)
        | undefined;
      finalProps.onValueChange = (val: number | readonly number[]) => {
        if (isRange) {
          state.set(name, Array.isArray(val) ? val : [val]);
        } else {
          state.set(name, Array.isArray(val) ? val[0] : val);
        }
        userHandler?.(val);
      };
    } else if (type === "Calendar" || type === "DatePicker") {
      if (stateValue !== undefined) {
        finalProps.value = String(stateValue);
      }
      if (!finalProps.onSelect) {
        finalProps.onSelect = (val: unknown) => {
          state.set(name, val);
        };
      }
    } else if (type === "DropZone") {
      if (!finalProps.onChange) {
        finalProps.onChange = (val: unknown) => {
          if (!Array.isArray(val) || val.length === 0) return;
          if (finalProps.multiple) {
            // Multiple mode: accumulate files into existing array
            const prev = state.get(name);
            state.set(name, [...(Array.isArray(prev) ? prev : []), ...val]);
          } else {
            // Single mode: overwrite with new file(s)
            state.set(name, val);
          }
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

  // Handle ForEach specially — iterate over data array.
  // Uses display:contents by default so children participate in the
  // parent's layout (e.g., Row gap applies between iterated items).
  if (type === "ForEach" && children) {
    let key = (rawProps.key ?? rawProps.itemKey) as string | undefined;
    if (key) key = interpolateString(key, ctx) as string;
    const items = key ? (resolve(key, ctx) as unknown[]) : [];
    if (!Array.isArray(items)) return null;

    const cssClass = rawProps.cssClass as string | undefined;
    const wrapperClass = cssClass ? `w-full ${cssClass}` : "contents";
    return (
      <div className={wrapperClass}>
        {items.map((item, idx) => {
          let itemScope = { ...scope, $index: idx, $item: item };
          // Evaluate let bindings per iteration (can reference $index/$item)
          const forEachLet = rawProps.let as
            | Record<string, unknown>
            | undefined;
          if (forEachLet) {
            const letCtx = { ...state.getAll(), ...itemScope };
            const evaluated = interpolateProps(forEachLet, letCtx) as Record<
              string,
              unknown
            >;
            itemScope = { ...itemScope, ...evaluated };
          }
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
      </div>
    );
  }

  // Handle Condition — evaluate cases in order, render the first match.
  // Falls back to else branch if no case matches.
  if (type === "Condition") {
    const cases = rawProps.cases as
      | { when: string; children?: ComponentNode[] }[]
      | undefined;
    const elseChildren = rawProps.else as ComponentNode[] | undefined;
    const ctx2 = { ...state.getAll(), ...scope };
    if (cases) {
      for (const c of cases) {
        if (evaluateCondition(c.when, ctx2)) {
          return (
            <>
              {c.children?.map((child, i) => (
                <RenderNode
                  key={i}
                  node={child}
                  scope={scope}
                  state={state}
                  app={app}
                />
              ))}
            </>
          );
        }
      }
    }
    // No case matched — render else branch if present
    if (elseChildren) {
      return (
        <>
          {elseChildren.map((child, i) => (
            <RenderNode
              key={i}
              node={child}
              scope={scope}
              state={state}
              app={app}
            />
          ))}
        </>
      );
    }
    return null;
  }

  // Handle Slot — render a component tree from state, or children as fallback.
  if (type === "Slot") {
    const slotName = interpolated.name as string;
    const slotContent = slotName ? state.get(slotName) : undefined;
    if (
      slotContent != null &&
      typeof slotContent === "object" &&
      "type" in slotContent
    ) {
      return (
        <RenderNode
          node={slotContent as ComponentNode}
          scope={scope}
          state={state}
          app={app}
        />
      );
    }
    // Render children as fallback when slot is empty
    if (children && children.length > 0) {
      return (
        <>
          {children.map((child, i) => (
            <RenderNode
              key={i}
              node={child}
              scope={scope}
              state={state}
              app={app}
            />
          ))}
        </>
      );
    }
    return null;
  }

  // Evaluate let bindings — scoped variables available to children
  let childScope = scope;
  const letBindings = rawProps.let as Record<string, unknown> | undefined;
  if (letBindings) {
    const evaluated = interpolateProps(letBindings, ctx) as Record<
      string,
      unknown
    >;
    childScope = { ...scope, ...evaluated };
  }

  // Render children recursively
  const renderedChildren = children?.map((child, i) => (
    <RenderNode
      key={i}
      node={child}
      scope={childScope}
      state={state}
      app={app}
    />
  ));

  // Leaf components with no text content or children must render
  // without a children slot — void HTML elements (input, img, etc.)
  // throw if given any children at all.
  const hasContent =
    textContent != null || (renderedChildren && renderedChildren.length > 0);
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
  defs,
  state,
  app,
}: {
  tree: ComponentNode;
  defs?: Record<string, ComponentNode>;
  state: StateStore;
  app: App | null;
}) {
  // Reset auto-name counter so names are deterministic per render pass.
  resetAutoNameCounter();

  // Seed state from component initial values on first render so
  // expressions like {{ slider-1 }} resolve before the user interacts.
  const seeded = useRef(false);
  if (!seeded.current) {
    seeded.current = true;
    const componentState = collectComponentState(tree, state.getAll());
    if (Object.keys(componentState).length > 0) {
      state.merge(componentState);
    }
  }

  const scope: Record<string, unknown> = defs ? { $defs: defs } : {};
  return <RenderNode node={tree} scope={scope} state={state} app={app} />;
}
