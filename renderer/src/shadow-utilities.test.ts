// @vitest-environment jsdom
import { expect, it, vi } from "vitest";
import { startShadowUtilities } from "./shadow-utilities";
const mock = vi.hoisted(() => ({
  build: vi.fn(
    (classes: Iterable<string>) => `/* ${Array.from(classes).join(" ")} */`,
  ),
  create: vi.fn(),
}));
vi.mock("./shadow-tailwind", () => ({
  createShadowTailwindCompiler: mock.create,
}));

it("observes only owned roots, builds dynamic classes in both roots, and disconnects", async () => {
  mock.build.mockClear();
  mock.create.mockResolvedValue({ build: mock.build });
  const hosts = [document.createElement("div"), document.createElement("div")];
  document.body.append(...hosts);
  const roots = hosts.map((host) => host.attachShadow({ mode: "open" }));
  const first = document.createElement("div");
  first.className = "h-[137px]";
  roots[0].append(first);
  const external = document.createElement("div");
  external.className = "external-only";
  document.body.append(external);
  const fail = vi.fn();
  const watch = startShadowUtilities(roots, fail);
  await watch.ready;
  expect(Array.from(mock.build.mock.calls[0][0])).toEqual(["h-[137px]"]);
  const overlay = document.createElement("div");
  overlay.className = "dark:bg-primary data-[state=open]:p-4";
  roots[1].append(overlay);
  first.className = "h-[211px]";
  await new Promise((resolve) => setTimeout(resolve, 0));
  expect(
    Array.from(mock.build.mock.calls[mock.build.mock.calls.length - 1][0]),
  ).toEqual(["h-[211px]", "dark:bg-primary", "data-[state=open]:p-4"]);
  for (const root of roots)
    expect(
      root.querySelector("[data-prefab-shadow-utilities]")?.textContent,
    ).toContain("h-[211px]");
  expect(fail).not.toHaveBeenCalled();
  watch.dispose();
  const builds = mock.build.mock.calls.length;
  first.className = "h-[300px]";
  await new Promise((resolve) => setTimeout(resolve, 0));
  expect(mock.build).toHaveBeenCalledTimes(builds);
  for (const root of roots)
    expect(root.querySelector("[data-prefab-shadow-utilities]")).toBeNull();
  hosts.forEach((host) => host.remove());
  external.remove();
});

it("does not install styles after disposal during asynchronous compiler startup", async () => {
  let finish!: (compiler: { build: typeof mock.build }) => void;
  mock.create.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        finish = resolve;
      }),
  );
  const root = document.createElement("div").attachShadow({ mode: "open" });
  const watch = startShadowUtilities([root], vi.fn());
  await vi.dynamicImportSettled();
  watch.dispose();
  finish({ build: mock.build });
  await watch.ready;
  expect(root.querySelector("style")).toBeNull();
});
