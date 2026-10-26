import { expect, test } from "@playwright/test";
import { fileURLToPath } from "node:url";

const font = fileURLToPath(new URL("./fixtures/proof.ttf", import.meta.url));
for (const source of ["inline", "stylesheet", "import"]) {
  test(`renders ${source} fonts in preview and overlay without leaking selectors`, async ({
    page,
  }) => {
    // A separate document gives us platform-native glyph rounding without
    // registering a control face in the document being tested.
    const control = await page.context().newPage();
    await control.goto("/browser/shadow-fonts.html?source=control");
    await control.locator(".proof").waitFor();
    const expected = await control.evaluate(async () => {
      await document.fonts.load("31px Proof");
      return document.querySelector(".proof")!.getBoundingClientRect().width;
    });
    await control.close();
    const unused: string[] = [];
    await page.route("**/unused.ttf", (route) => {
      unused.push(route.request().url());
      return route.abort();
    });
    await page.route("https://fonts.prefab.test/nested/font.css", (route) =>
      route.fulfill({
        contentType: "text/css",
        // No stylesheet CORS header: font loading must work with opaque CSS.
        body: '@font-face {font-family: Proof;src:url("./proof.ttf")} @font-face {font-family:Proof;src:url("./unused.ttf");font-weight:900} .proof {font-family: Proof,monospace;font-size:31px} .chrome-probe {color:rgb(255,0,0)}',
      }),
    );
    await page.route("https://fonts.prefab.test/nested/proof.ttf", (route) =>
      route.fulfill({
        path: font,
        contentType: "font/ttf",
        headers: { "Access-Control-Allow-Origin": "*" },
      }),
    );
    await page.goto(`/browser/shadow-fonts.html?source=${source}`);
    // A loaded FontFace alone does not prove that shadow text uses the font.
    const text = page.locator(".proof");
    await expect(text).toHaveCount(2);
    await expect
      .poll(() =>
        text.evaluateAll((nodes) =>
          nodes.map((node) => node.getBoundingClientRect().width),
        ),
      )
      .toEqual([expected, expected]);
    await expect(page.locator(".chrome-probe")).not.toHaveCSS(
      "color",
      "rgb(255, 0, 0)",
    );
    expect(unused).toEqual([]);
    await page.evaluate(() =>
      (window as unknown as { disposeSurface(): void }).disposeSurface(),
    );
    await expect(page.locator("[data-prefab-font-loader]")).toHaveCount(0);
    expect(await page.evaluate(() => document.fonts.size)).toBe(0);
  });
}
