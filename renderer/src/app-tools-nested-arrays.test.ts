import { expect, it } from "vitest";
import { AppTools } from "./app-tools";
import { createStateStore } from "./testing/state-store";

it("preserves nested arrays in explicit app-tool results", async () => {
  const tools = new AppTools(null);
  tools.replace(
    [
      {
        name: "matrix",
        inputSchema: { type: "object" },
        result: {
          matrix: [
            [1, "{{ count }}"],
            [null, { values: [[true]] }],
          ],
        },
      },
    ],
    createStateStore({ count: 2 }),
  );
  try {
    expect((await tools.call("matrix")).structuredContent).toEqual({
      matrix: [
        [1, 2],
        [null, { values: [[true]] }],
      ],
    });
  } finally {
    tools.clear();
  }
});

it("preserves nested bound arrays through actions and their results", async () => {
  const tools = new AppTools(null);
  const state = createStateStore({ count: 2 });
  tools.replace(
    [
      {
        name: "matrix",
        inputSchema: { type: "object" },
        bind: {
          matrix: [
            [1, "{{ count }}"],
            [3, 4],
          ],
        },
        actions: {
          action: "setState",
          key: "matrix",
          value: "{{ $event.matrix }}",
        },
        result: { matrix: "{{ matrix }}" },
      },
    ],
    state,
  );
  try {
    expect((await tools.call("matrix")).structuredContent).toEqual({
      matrix: [
        [1, 2],
        [3, 4],
      ],
    });
    expect(state.get("matrix")).toEqual([
      [1, 2],
      [3, 4],
    ]);
  } finally {
    tools.clear();
  }
});

it("does not interpolate templates inside arrays resolved from state again", async () => {
  const tools = new AppTools(null);
  const matrix = [["{{ secret }}"]];
  tools.replace(
    [
      {
        name: "matrix",
        inputSchema: { type: "object" },
        bind: { matrix: "{{ matrix }}" },
        result: { matrix: "{{ $event.matrix }}" },
      },
    ],
    createStateStore({ matrix, secret: "private" }),
  );
  try {
    expect((await tools.call("matrix")).structuredContent).toEqual({ matrix });
  } finally {
    tools.clear();
  }
});
