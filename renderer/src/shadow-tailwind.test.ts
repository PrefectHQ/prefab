import { describe, expect, it } from "vitest";
import { createShadowTailwindCompiler } from "./shadow-tailwind";

describe("shadow runtime utilities", () => {
  it("builds arbitrary classes and keeps dynamic additions without a safelist", async () => {
    const compiler = await createShadowTailwindCompiler();
    expect(compiler.build(["h-[137px]"])).toContain("height: 137px");
    const changed = compiler.build(["h-[211px]"]);
    expect(changed).toContain("height: 211px");
    expect(changed).toContain("height: 137px");
  });

  it("uses app theme mappings and host dark/data variants without emitting the app theme", async () => {
    const compiler = await createShadowTailwindCompiler();
    const css = compiler.build([
      "bg-primary",
      "dark:bg-secondary",
      "data-open:opacity-50",
    ]);
    expect(css).toContain("background-color: var(--primary)");
    expect(css).toContain(":host([data-prefab-dark])");
    expect(css).toContain("background-color: var(--secondary)");
    expect(css).toContain('[data-open]:not([data-open="false"])');
    expect(css).not.toContain("--primary:");
    expect(css).not.toContain(".pf-button");
  });

  it("emits spacing and shadow property defaults without document @property rules", async () => {
    const compiler = await createShadowTailwindCompiler();
    const css = compiler.build(["translate-x-4", "border-2", "shadow-md"]);
    expect(css).toContain("var(--spacing, 0.25rem)");
    expect(css).toContain("--tw-translate-y:0;");
    expect(css).toContain("--tw-border-style:solid;");
    expect(css).toContain(":host{");
    expect(css).not.toContain("@property");
  });
});
