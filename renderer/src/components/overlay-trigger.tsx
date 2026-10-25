import React, { type ReactElement, type ReactNode } from "react";
import { PrefabButton } from "./button-wrapper";

interface ButtonNodeProps {
  node?: { type?: string; $ref?: unknown };
  renderElement?: (element: ReactElement) => ReactNode;
}

/** Compose resolved Prefab Buttons; other trigger content keeps its wrapper. */
export function renderButtonTrigger(
  child: ReactNode,
  renderElement: (button: ReactElement) => ReactNode,
  fallback: ReactElement,
): ReactNode {
  if (
    React.isValidElement<ButtonNodeProps>(child) &&
    (child.props.node?.type === "Button" ||
      typeof child.props.node?.$ref === "string")
  ) {
    return React.cloneElement(child, {
      renderElement: (element) =>
        element.type === PrefabButton
          ? renderElement(element)
          : React.cloneElement(fallback, undefined, element),
    });
  }
  return fallback;
}
