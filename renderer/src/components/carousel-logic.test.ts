import { describe, expect, it } from "vitest";
import {
  getLoopDuplicationRepeats,
  resolveGap,
  resolveVisible,
} from "./carousel-logic";

describe("resolveVisible", () => {
  it("defaults to 1 when omitted in non-continuous mode", () => {
    expect(resolveVisible(undefined, false, "slide")).toBe(1);
  });

  it("defaults to null when omitted in continuous mode", () => {
    expect(resolveVisible(undefined, true, "slide")).toBeNull();
  });

  it("keeps explicit null", () => {
    expect(resolveVisible(null, false, "slide")).toBeNull();
    expect(resolveVisible(null, true, "slide")).toBeNull();
  });

  it("keeps explicit numeric visible", () => {
    expect(resolveVisible(3, false, "slide")).toBe(3);
    expect(resolveVisible(2.4, true, "slide")).toBe(2.4);
  });

  it("forces visible=1 in fade mode", () => {
    expect(resolveVisible(undefined, false, "fade")).toBe(1);
    expect(resolveVisible(null, true, "fade")).toBe(1);
    expect(resolveVisible(4, false, "fade")).toBe(1);
  });
});

describe("resolveGap", () => {
  it("keeps gap for slide effect", () => {
    expect(resolveGap(16, "slide", 1)).toBe(16);
  });

  it("forces gap to 0 for single-visible fade", () => {
    expect(resolveGap(16, "fade", 1)).toBe(0);
    expect(resolveGap(0, "fade", 1)).toBe(0);
  });

  it("keeps user gap for multi-visible fade", () => {
    expect(resolveGap(16, "fade", 4)).toBe(16);
    expect(resolveGap(12, "fade", 1.3)).toBe(12);
  });
});

describe("getLoopDuplicationRepeats", () => {
  it("does not duplicate when loop is disabled", () => {
    expect(
      getLoopDuplicationRepeats({
        loop: false,
        continuous: false,
        visibleCount: 3.6,
        childCount: 4,
      }),
    ).toBe(1);
  });

  it("does not duplicate in continuous mode (handled separately)", () => {
    expect(
      getLoopDuplicationRepeats({
        loop: true,
        continuous: true,
        visibleCount: 3.6,
        childCount: 4,
      }),
    ).toBe(1);
  });

  it("does not duplicate for single-visible carousels", () => {
    expect(
      getLoopDuplicationRepeats({
        loop: true,
        continuous: false,
        visibleCount: 1,
        childCount: 2,
      }),
    ).toBe(1);
  });

  it("duplicates when multi-visible loop has too few slides", () => {
    expect(
      getLoopDuplicationRepeats({
        loop: true,
        continuous: false,
        visibleCount: 3.6,
        childCount: 4,
      }),
    ).toBe(2);
  });

  it("does not duplicate when there are enough slides", () => {
    expect(
      getLoopDuplicationRepeats({
        loop: true,
        continuous: false,
        visibleCount: 3.6,
        childCount: 6,
      }),
    ).toBe(1);
  });
});
