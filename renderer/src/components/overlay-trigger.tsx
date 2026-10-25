import React, { type ReactElement, type ReactNode } from "react";

interface ButtonNodeProps {
  node?: { type: string };
  renderElement?: (element: ReactElement) => ReactNode;
}

/** Compose only an explicit Prefab Button; other content keeps its wrapper. */
export function renderButtonTrigger(
  child: ReactNode,
  renderElement: (button: ReactElement) => ReactNode,
  fallback: ReactNode,
): ReactNode {
  if (
    React.isValidElement<ButtonNodeProps>(child) &&
    child.props.node?.type === "Button"
  ) {
    return React.cloneElement(child, { renderElement });
  }
  return fallback;
}
