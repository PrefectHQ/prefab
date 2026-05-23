import { describe, expect, it } from "vitest";
import { inlineCssEntries, stylesheetUrls, wireMode } from "./style-assets";

describe("style assets", () => {
  it("keeps inline CSS entries separate", () => {
    const entries = inlineCssEntries([
      ":root { --primary: red; }",
      "@import url('https://example.com/font.css');\nbody { font-family: Inter; }",
      "   ",
      42,
    ]);

    expect(entries).toEqual([
      ":root { --primary: red; }",
      "@import url('https://example.com/font.css');\nbody { font-family: Inter; }",
    ]);
  });

  it("ignores malformed stylesheet entries", () => {
    expect(
      stylesheetUrls([
        "https://example.com/theme.css",
        42,
        { href: "https://example.com/object.css" },
        "   ",
      ]),
    ).toEqual(["https://example.com/theme.css"]);
  });

  it("accepts only explicit wire modes", () => {
    expect(wireMode("dark")).toBe("dark");
    expect(wireMode("light")).toBe("light");
    expect(wireMode("system")).toBeUndefined();
  });
});
