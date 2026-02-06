/**
 * Mock App factory for testing action dispatch.
 *
 * Creates an object with vi.fn() stubs for the 4 methods that
 * actions.ts actually calls on the App interface. Cast as
 * `unknown as App` when passing to executeAction/executeActions.
 */

import { vi } from "vitest";

export interface MockApp {
  callServerTool: ReturnType<typeof vi.fn>;
  sendMessage: ReturnType<typeof vi.fn>;
  updateModelContext: ReturnType<typeof vi.fn>;
  openLink: ReturnType<typeof vi.fn>;
}

/**
 * Create a mock App with default resolved values.
 *
 * Override individual methods as needed:
 *   const app = createMockApp();
 *   app.callServerTool.mockResolvedValueOnce({ isError: true });
 */
export function createMockApp(): MockApp {
  return {
    callServerTool: vi.fn().mockResolvedValue({
      content: [{ type: "text", text: "ok" }],
    }),
    sendMessage: vi.fn().mockResolvedValue({}),
    updateModelContext: vi.fn().mockResolvedValue({}),
    openLink: vi.fn().mockResolvedValue({}),
  };
}
