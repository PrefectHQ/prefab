import { describe, expect, it } from "vitest";
import { inlineCssEntries } from "./style-assets";

describe("style assets", () => {
  it("keeps inline CSS entries separate", () => {
    const entries = inlineCssEntries([
      ":root { --primary: red; }",
      "@import url('https://example.com/font.css');\nbody { font-family: Inter; }",
      "   ",
    ]);

    expect(entries).toEqual([
      ":root { --primary: red; }",
      "@import url('https://example.com/font.css');\nbody { font-family: Inter; }",
    ]);
  });
});
