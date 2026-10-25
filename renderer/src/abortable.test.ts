import { expect, it, vi } from "vitest";
import { abortable } from "./abortable";

it.each(["success", "failure", "cancel"])(
  "detaches its abort listener on %s",
  async (outcome) => {
    const controller = new AbortController();
    const remove = vi.spyOn(controller.signal, "removeEventListener");
    let resolve!: (value: number) => void;
    let reject!: (error: Error) => void;
    const pending = abortable(
      new Promise<number>((ok, fail) => {
        resolve = ok;
        reject = fail;
      }),
      controller.signal,
    );
    if (outcome === "success") {
      resolve(1);
      await expect(pending).resolves.toBe(1);
    } else if (outcome === "failure") {
      reject(new Error("failure"));
      await expect(pending).rejects.toThrow("failure");
    } else {
      controller.abort();
      await expect(pending).rejects.toBe(controller.signal.reason);
    }
    expect(remove).toHaveBeenCalledWith("abort", expect.any(Function));
  },
);

it("observes an unexpected late rejection after cancellation", async () => {
  const controller = new AbortController();
  const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
  let fail!: (error: Error) => void;
  const pending = abortable(
    new Promise((_ok, reject) => {
      fail = reject;
    }),
    controller.signal,
  );
  controller.abort();
  await expect(pending).rejects.toBe(controller.signal.reason);
  const error = new Error("background failure");
  fail(error);
  await Promise.resolve();
  expect(warning).toHaveBeenCalledWith(
    "[Prefab] Action failed after cancellation",
    error,
  );
  warning.mockRestore();
});
