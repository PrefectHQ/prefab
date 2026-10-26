// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import { acquireShadowFonts } from "./shadow-fonts";
const original = Object.getOwnPropertyDescriptor(document, "fonts");
afterEach(() => {
  if (original) Object.defineProperty(document, "fonts", original);
  else Reflect.deleteProperty(document, "fonts");
  document
    .querySelectorAll("[data-prefab-font-loader]")
    .forEach((frame) => frame.remove());
});

it("shares owned faces, disconnects their source before transfer, and never loads unused variants", async () => {
  const face = {
    family: "Proof",
    load: vi.fn(),
    loaded: new Promise(() => {}),
  } as unknown as FontFace;
  const unrelated = { family: "External" } as FontFace;
  const fonts = new Set<FontFace>([unrelated]);
  const add = vi.spyOn(fonts, "add").mockImplementation((font) => {
    expect(
      document
        .querySelector<HTMLIFrameElement>("[data-prefab-font-loader]")!
        .contentDocument!.querySelector("style,link"),
    ).toBeNull();
    return Set.prototype.add.call(fonts, font);
  });
  Object.defineProperty(document, "fonts", {
    configurable: true,
    value: fonts,
  });
  const css = ["@font-face { font-family: Proof; src: url(font.woff2); }"];
  const a = acquireShadowFonts(css, [], vi.fn());
  const b = acquireShadowFonts(css, [], vi.fn());
  expect(document.querySelectorAll("[data-prefab-font-loader]")).toHaveLength(
    1,
  );
  const frame = document.querySelector<HTMLIFrameElement>(
    "[data-prefab-font-loader]",
  )!;
  expect(frame.getAttribute("sandbox")).toBe("allow-same-origin");
  Object.defineProperty(frame.contentDocument!, "fonts", {
    configurable: true,
    value: new Set([face]),
  });
  frame.dispatchEvent(new Event("load"));
  await a.ready;
  expect(add).toHaveBeenCalledTimes(1);
  expect(face.load).not.toHaveBeenCalled();
  a.release();
  expect(fonts.has(face)).toBe(true);
  b.release();
  expect(fonts.has(face)).toBe(false);
  expect(fonts.has(unrelated)).toBe(true);
});

it("injects CSS as text and waits for stylesheet loads, cancelling pending ownership safely", async () => {
  Object.defineProperty(document, "fonts", {
    configurable: true,
    value: new Set(),
  });
  const failure = vi.fn();
  const lease = acquireShadowFonts(
    ["/* </style><script>window.bad = true</script> */"],
    ["https://example.com/font.css"],
    failure,
  );
  const frame = document.querySelector<HTMLIFrameElement>(
    "[data-prefab-font-loader]",
  )!;
  frame.dispatchEvent(new Event("load"));
  await Promise.resolve();
  expect(frame.contentDocument!.querySelector("script")).toBeNull();
  expect(frame.contentDocument!.querySelector("style")?.textContent).toContain(
    "</style><script>",
  );
  let settled = false;
  void lease.ready.then(() => {
    settled = true;
  });
  await Promise.resolve();
  expect(settled).toBe(false);
  lease.release();
  await lease.ready;
  expect(failure).not.toHaveBeenCalled();
  expect(document.querySelector("[data-prefab-font-loader]")).toBeNull();
});

it("registers lazy faces without waiting for font downloads and removes its source context on final release", async () => {
  Object.defineProperty(document, "fonts", {
    configurable: true,
    value: new Set(),
  });
  const lease = acquireShadowFonts(
    ["@font-face {font-family: Slow;src:url(slow.woff2)}"],
    [],
    vi.fn(),
  );
  const frame = document.querySelector<HTMLIFrameElement>(
    "[data-prefab-font-loader]",
  )!;
  const childFonts = new Set<FontFace>();
  Object.assign(childFonts, { ready: new Promise(() => {}) });
  Object.defineProperty(frame.contentDocument!, "fonts", {
    configurable: true,
    value: childFonts,
  });
  frame.dispatchEvent(new Event("load"));
  let ready = false;
  void lease.ready.then(() => {
    ready = true;
  });
  for (let i = 0; i < 10; i++) await Promise.resolve();
  expect(ready).toBe(true);
  expect(frame.isConnected).toBe(true);
  expect(frame.contentDocument!.querySelector("style,link")).toBeNull();
  lease.release();
  expect(frame.isConnected).toBe(false);
});

it("waits for inline font imports without reading imported stylesheet rules", async () => {
  const face = {
    family: "Imported",
    loaded: new Promise(() => {}),
  } as FontFace;
  const fonts = new Set<FontFace>();
  Object.defineProperty(document, "fonts", {
    configurable: true,
    value: fonts,
  });
  const lease = acquireShadowFonts(
    ['@import url("https://example.com/fonts.css");'],
    [],
    vi.fn(),
  );
  const frame = document.querySelector<HTMLIFrameElement>(
    "[data-prefab-font-loader]",
  )!;
  Object.defineProperty(frame.contentDocument!, "fonts", {
    configurable: true,
    value: new Set([face]),
  });
  frame.dispatchEvent(new Event("load"));
  await Promise.resolve();
  const style = frame.contentDocument!.querySelector("style")!;
  expect(fonts.size).toBe(0);
  style.dispatchEvent(new Event("load"));
  await lease.ready;
  expect(fonts.has(face)).toBe(true);
  lease.release();
  expect(fonts.size).toBe(0);
});

it("reports stylesheet loading failures and releases its helper document", async () => {
  Object.defineProperty(document, "fonts", {
    configurable: true,
    value: new Set(),
  });
  const failure = vi.fn();
  const lease = acquireShadowFonts(
    [],
    ["https://example.com/failed.css"],
    failure,
  );
  const frame = document.querySelector<HTMLIFrameElement>(
    "[data-prefab-font-loader]",
  )!;
  frame.dispatchEvent(new Event("load"));
  await Promise.resolve();
  frame
    .contentDocument!.querySelector("link")!
    .dispatchEvent(new Event("error"));
  await lease.ready;
  expect(failure).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "Unable to load preview font stylesheet",
    }),
  );
  expect(frame.isConnected).toBe(false);
  lease.release();
});

it("refreshes matching after a transferred face loads, but never restores a released face", async () => {
  const fonts = new Set<FontFace>();
  const add = vi.spyOn(fonts, "add");
  Object.defineProperty(document, "fonts", {
    configurable: true,
    value: fonts,
  });
  for (const releaseBeforeLoad of [false, true]) {
    let finish!: (face: FontFace) => void;
    const face = {
      family: "Deferred",
      loaded: new Promise<FontFace>((resolve) => {
        finish = resolve;
      }),
    } as FontFace;
    const lease = acquireShadowFonts(
      ["@font-face {font-family: Deferred;src:url(font.ttf)}"],
      [],
      vi.fn(),
    );
    const frame = document.querySelector<HTMLIFrameElement>(
      "[data-prefab-font-loader]",
    )!;
    Object.defineProperty(frame.contentDocument!, "fonts", {
      configurable: true,
      value: new Set([face]),
    });
    frame.dispatchEvent(new Event("load"));
    await lease.ready;
    const registrations = add.mock.calls.length;
    if (releaseBeforeLoad) lease.release();
    finish(face);
    await Promise.resolve();
    expect(add.mock.calls.length).toBe(
      registrations + (releaseBeforeLoad ? 0 : 1),
    );
    expect(fonts.has(face)).toBe(!releaseBeforeLoad);
    lease.release();
  }
});
