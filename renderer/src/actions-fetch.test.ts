import { describe, it, expect, vi, beforeEach } from "vitest";
import { createStateStore } from "./testing/state-store";
import { executeAction, type ActionSpec } from "./actions";

describe("fetch action", () => {
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    fetchSpy = vi.fn();
    globalThis.fetch = fetchSpy as typeof globalThis.fetch;
  });

  function mockFetchResponse(
    body: unknown,
    opts?: { status?: number; contentType?: string; ok?: boolean },
  ) {
    const status = opts?.status ?? 200;
    const ok = opts?.ok ?? (status >= 200 && status < 300);
    const contentType = opts?.contentType ?? "application/json";
    fetchSpy.mockResolvedValueOnce({
      ok,
      status,
      statusText: ok ? "OK" : "Not Found",
      headers: new Map([["content-type", contentType]]),
      json: () => Promise.resolve(body),
      text: () =>
        Promise.resolve(typeof body === "string" ? body : JSON.stringify(body)),
    });
  }

  it("makes GET request", async () => {
    mockFetchResponse([{ name: "Alice" }]);
    const state = createStateStore();
    const action: ActionSpec = {
      action: "fetch",
      url: "/api/users",
      method: "GET",
    };

    const result = await executeAction(action, null, state);

    expect(result).toBe(true);
    expect(fetchSpy).toHaveBeenCalledWith("/api/users", {
      method: "GET",
      headers: {},
    });
  });

  it("writes result to state via resultKey", async () => {
    mockFetchResponse([{ name: "Alice" }]);
    const state = createStateStore();
    const action: ActionSpec = {
      action: "fetch",
      url: "/api/users",
      resultKey: "users",
    };

    await executeAction(action, null, state);

    expect(state.get("users")).toEqual([{ name: "Alice" }]);
  });

  it("sends JSON body for POST with dict", async () => {
    mockFetchResponse({ id: 1 });
    const state = createStateStore();
    const action: ActionSpec = {
      action: "fetch",
      url: "/api/users",
      method: "POST",
      body: { name: "Alice" },
    };

    await executeAction(action, null, state);

    const [, init] = fetchSpy.mock.calls[0];
    expect(init.method).toBe("POST");
    expect(init.body).toBe('{"name":"Alice"}');
    expect(init.headers["Content-Type"]).toBe("application/json");
  });

  it("sends string body as-is", async () => {
    mockFetchResponse("ok");
    const state = createStateStore();
    const action: ActionSpec = {
      action: "fetch",
      url: "/api/raw",
      method: "POST",
      body: "raw text",
    };

    await executeAction(action, null, state);

    const [, init] = fetchSpy.mock.calls[0];
    expect(init.body).toBe("raw text");
  });

  it("does not send body for GET", async () => {
    mockFetchResponse([]);
    const state = createStateStore();
    const action: ActionSpec = {
      action: "fetch",
      url: "/api/data",
      method: "GET",
      body: { ignored: true },
    };

    await executeAction(action, null, state);

    const [, init] = fetchSpy.mock.calls[0];
    expect(init.body).toBeUndefined();
  });

  it("triggers onError on non-2xx response", async () => {
    mockFetchResponse(null, { status: 404, ok: false });
    const state = createStateStore();
    const action: ActionSpec = {
      action: "fetch",
      url: "/api/missing",
      onError: {
        action: "setState",
        key: "err",
        value: "{{ $error }}",
      },
    };

    const result = await executeAction(action, null, state);

    expect(result).toBe(false);
    expect(state.get("err")).toBe("404 Not Found");
  });

  it("fires onSuccess with response data as $event", async () => {
    mockFetchResponse({ count: 42 });
    const state = createStateStore();
    const action: ActionSpec = {
      action: "fetch",
      url: "/api/count",
      onSuccess: {
        action: "setState",
        key: "result",
        value: "{{ $event }}",
      },
    };

    await executeAction(action, null, state);

    expect(state.get("result")).toEqual({ count: 42 });
  });

  it("falls back to text for non-JSON content type", async () => {
    mockFetchResponse("plain text", { contentType: "text/plain" });
    const state = createStateStore();
    const action: ActionSpec = {
      action: "fetch",
      url: "/api/text",
      resultKey: "data",
    };

    await executeAction(action, null, state);

    expect(state.get("data")).toBe("plain text");
  });

  it("parses JSON-like text when content-type is not application/json", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: "OK",
      headers: new Map([["content-type", "text/plain"]]),
      json: () => Promise.resolve({ x: 1 }),
      text: () => Promise.resolve('{"x":1}'),
    });
    const state = createStateStore();
    const action: ActionSpec = {
      action: "fetch",
      url: "/api/sneaky-json",
      resultKey: "data",
    };

    await executeAction(action, null, state);

    expect(state.get("data")).toEqual({ x: 1 });
  });

  it("preserves custom headers and does not override Content-Type", async () => {
    mockFetchResponse("ok");
    const state = createStateStore();
    const action: ActionSpec = {
      action: "fetch",
      url: "/api/custom",
      method: "POST",
      headers: {
        "Content-Type": "text/xml",
        "X-Custom": "value",
      },
      body: { data: true },
    };

    await executeAction(action, null, state);

    const [, init] = fetchSpy.mock.calls[0];
    expect(init.headers["Content-Type"]).toBe("text/xml");
    expect(init.headers["X-Custom"]).toBe("value");
  });

  it("interpolates state into URL", async () => {
    mockFetchResponse({ name: "Alice" });
    const state = createStateStore({ userId: "42" });
    const action: ActionSpec = {
      action: "fetch",
      url: "/api/users/{{ userId }}",
      resultKey: "user",
    };

    await executeAction(action, null, state);

    expect(fetchSpy).toHaveBeenCalledWith("/api/users/42", expect.anything());
  });
});
