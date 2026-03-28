/**
 * Generate CSS rules for Tailwind arbitrary value classes.
 *
 * Walks a component tree to collect all cssClass tokens, merges with
 * any extraClasses from the wire format, then emits CSS rules for
 * arbitrary value patterns like h-[500px] or rounded-[12px].
 */

import type { ComponentNode } from "./renderer";

/** Mapping from Tailwind utility prefix to CSS property name(s). */
const PREFIX_MAP: Record<string, string[]> = {
  h: ["height"],
  w: ["width"],
  "min-h": ["min-height"],
  "min-w": ["min-width"],
  "max-h": ["max-height"],
  "max-w": ["max-width"],
  size: ["width", "height"],
  p: ["padding"],
  px: ["padding-left", "padding-right"],
  py: ["padding-top", "padding-bottom"],
  pt: ["padding-top"],
  pr: ["padding-right"],
  pb: ["padding-bottom"],
  pl: ["padding-left"],
  m: ["margin"],
  mx: ["margin-left", "margin-right"],
  my: ["margin-top", "margin-bottom"],
  mt: ["margin-top"],
  mr: ["margin-right"],
  mb: ["margin-bottom"],
  ml: ["margin-left"],
  gap: ["gap"],
  "gap-x": ["column-gap"],
  "gap-y": ["row-gap"],
  top: ["top"],
  right: ["right"],
  bottom: ["bottom"],
  left: ["left"],
  inset: ["inset"],
  rounded: ["border-radius"],
  text: ["font-size"],
  basis: ["flex-basis"],
  z: ["z-index"],
  opacity: ["opacity"],
};

const ARBITRARY_RE = /^(.+?)-\[(.+)]$/;

function escapeSelector(cls: string): string {
  return cls.replace(/([[\]:%/.,#()!])/g, "\\$1");
}

/** Collect all cssClass tokens from a component tree. */
function collectClasses(node: unknown): Set<string> {
  const classes = new Set<string>();
  walk(node, classes);
  return classes;
}

function walk(node: unknown, out: Set<string>): void {
  if (Array.isArray(node)) {
    for (const item of node) walk(item, out);
  } else if (node != null && typeof node === "object") {
    const rec = node as Record<string, unknown>;
    if (typeof rec.cssClass === "string") {
      for (const token of rec.cssClass.split(" ")) {
        if (token) out.add(token);
      }
    }
    for (const value of Object.values(rec)) {
      walk(value, out);
    }
  }
}

/** Generate CSS rules for arbitrary value classes. */
function generateCss(classes: Iterable<string>): string {
  const rules: string[] = [];
  const seen = new Set<string>();

  for (const token of classes) {
    if (seen.has(token)) continue;
    seen.add(token);

    const m = ARBITRARY_RE.exec(token);
    if (!m) continue;

    const [, prefix, value] = m;
    const props = PREFIX_MAP[prefix];
    if (!props) continue;

    const selector = escapeSelector(token);
    const declarations = props.map((p) => `${p}: ${value};`).join(" ");
    rules.push(`.${selector} { ${declarations} }`);
  }

  return rules.join("\n");
}

/**
 * Build CSS for arbitrary Tailwind values found in the tree and
 * extraClasses, then inject/update a <style> tag.
 */
export function injectArbitraryCss(
  tree: ComponentNode | null,
  extraClasses: string[] | undefined,
  target: HTMLElement | ShadowRoot = document.head,
): void {
  const classes = tree ? collectClasses(tree) : new Set<string>();
  if (extraClasses) {
    for (const entry of extraClasses) {
      for (const token of entry.split(" ")) {
        if (token) classes.add(token);
      }
    }
  }

  const css = generateCss(classes);
  const id = "prefab:arbitrary-css";

  const existing = target.querySelector(
    `#${CSS.escape(id)}`,
  ) as HTMLElement | null;
  if (!css) {
    existing?.remove();
    return;
  }
  if (existing) {
    existing.textContent = css;
  } else {
    const style = document.createElement("style");
    style.id = id;
    style.textContent = css;
    target.appendChild(style);
  }
}
