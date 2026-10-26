import { expect, test } from "@playwright/test";

for (const [theme, background] of [
  ["MySpace", "rgb(10, 10, 10)"],
  ["Windows 2000", "rgb(212, 208, 200)"],
]) {
  test(`${theme} styles preview overlays without restyling toolbar popovers`, async ({
    page,
  }) => {
    await page.goto(
      `/browser/retro-themes.html?theme=${encodeURIComponent(theme)}`,
    );
    const preview = page
      .locator(".pf-popover-content")
      .filter({ hasText: "Preview popover" });
    await expect(preview).toHaveCount(2);
    for (const element of await preview.all())
      await expect(element).toHaveCSS("background-color", background);
    await expect(page.locator("#toolbar")).toHaveCSS(
      "background-color",
      "rgb(1, 2, 3)",
    );
    await expect(page.locator("#toolbar")).toHaveCSS("color", "rgb(4, 5, 6)");
    expect(
      await page.locator("#preview").getAttribute("data-prefab-dark"),
    ).toBe(theme === "MySpace" ? "" : null);
  });
}
