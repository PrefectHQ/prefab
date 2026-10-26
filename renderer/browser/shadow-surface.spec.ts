import { expect, test } from "@playwright/test";

test("toggles compiled component dark rules in preview and overlay roots", async ({
  page,
}) => {
  await page.goto("/browser/shadow-surface.html");
  const boxes = page.locator(".pf-checkbox");
  await expect(boxes).toHaveCount(2);
  const colors = () =>
    boxes.evaluateAll((nodes) =>
      nodes.map((node) => getComputedStyle(node).backgroundColor),
    );
  await expect.poll(colors).toEqual(["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"]);
  await page.evaluate(() =>
    (window as unknown as { setDark(dark: boolean): void }).setDark(true),
  );
  await expect
    .poll(async () =>
      (await colors()).map((color) => color !== "rgba(0, 0, 0, 0)"),
    )
    .toEqual([true, true]);
  await page.evaluate(() =>
    (window as unknown as { setDark(dark: boolean): void }).setDark(false),
  );
  await expect.poll(colors).toEqual(["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"]);
});
