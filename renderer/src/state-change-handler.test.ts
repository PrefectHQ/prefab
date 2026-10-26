import { expect, it, vi } from "vitest";
import { withStateUpdate } from "./state-change-handler";

it("syncs first and preserves handler arguments and return value", () => {
  const value = { target: { value: "typed" } };
  const details = { reason: "input" };
  const sync = vi.fn();
  const result = Promise.resolve("done");
  const handler = vi.fn((...args: unknown[]) => {
    expect(sync).toHaveBeenCalledWith(value);
    expect(args).toEqual([value, details]);
    return result;
  });
  expect(withStateUpdate(handler, sync)(value, details)).toBe(result);
  expect(handler).toHaveBeenCalledTimes(1);
});
it("retains automatic state writes when no handler is provided", () => {
  const sync = vi.fn();
  withStateUpdate(undefined, sync)(true);
  expect(sync).toHaveBeenCalledWith(true);
});
