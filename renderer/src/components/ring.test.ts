import { Children, type ReactElement, type ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { Ring } from "./ring";

describe("Ring", () => {
  it("centers a label when the value is zero", () => {
    const ring = Ring({ value: 0, label: "0" }) as ReactElement<{
      children: ReactNode;
    }>;
    const label = Children.toArray(ring.props.children)[1] as ReactElement<{
      className: string;
    }>;

    expect(label.props.className).toContain(
      "absolute inset-0 flex items-center justify-center",
    );
  });
});
