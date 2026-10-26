import { expect, test } from "@playwright/test";

test("the built docs entry exposes mountPreview and renders a component", async ({
  page,
}) => {
  await page.route("**/docs-embed-test", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<div id="preview"></div>',
    }),
  );
  await page.goto("/docs-embed-test");
  const exports = await page.evaluate(async () => {
    // Exercise the shipped entry and its real chunk graph, not src/embed.tsx.
    const url = "/dist/_renderer/embed.mjs";
    const module = await import(/* @vite-ignore */ url);
    const host = document.querySelector<HTMLElement>("#preview")!;
    module.mountPreview(
      host,
      JSON.stringify({ type: "Text", content: "Built docs preview" }),
    );
    return Object.keys(module);
  });
  expect(exports).toContain("mountPreview");
  await expect(page.locator("#preview")).toContainText("Built docs preview");
});
