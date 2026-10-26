import { expect, it, vi } from "vitest";
import { bindNamedValueChange, withStateUpdate } from "./state-change-handler";

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

it("keeps named value callback arguments and its result while synchronizing first", () => {
  const state = { set: vi.fn() } as unknown as import("./state").StateStore;
  const details = { reason: "interaction" };
  const result = Promise.resolve();
  const handler = vi.fn((value: string, metadata: unknown) => {
    expect(state.set).toHaveBeenCalledWith("active", value);
    expect(metadata).toBe(details);
    return result;
  });
  const props: Record<string, unknown> = { onValueChange: handler };
  bindNamedValueChange(props, state, "active");
  expect(
    (props.onValueChange as (value: string, metadata: unknown) => unknown)(
      "b",
      details,
    ),
  ).toBe(result);
  expect(handler).toHaveBeenCalledTimes(1);
});
