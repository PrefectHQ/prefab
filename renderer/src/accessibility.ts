import type { AriaAttributes } from "react";

/** Common naming attributes, forwarded to a component's semantic control. */
export type AccessibleNameProps = Pick<
  AriaAttributes,
  "aria-label" | "aria-labelledby"
>;

/** Pick only supported naming attributes; preserve defaults when none are set. */
export function getAccessibleNameProps(
  props: AccessibleNameProps,
): AccessibleNameProps {
  const result: AccessibleNameProps = {};
  if (props["aria-label"] !== undefined)
    result["aria-label"] = props["aria-label"];
  // Explicit ID references take precedence; an explicit label clears only
  // automatic references supplied by composite primitives.
  if (
    props["aria-label"] !== undefined ||
    props["aria-labelledby"] !== undefined
  ) {
    result["aria-labelledby"] = props["aria-labelledby"];
  }
  return result;
}
