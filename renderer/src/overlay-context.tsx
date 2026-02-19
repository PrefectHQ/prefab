/**
 * Context for overlay close actions.
 *
 * Dialog and Popover provide a close callback via this context.
 * The action executor reads it to handle `closeOverlay` actions,
 * closing whichever overlay the triggering button lives inside.
 */

import { createContext, useContext } from "react";

/** Callback to close the nearest ancestor overlay (Dialog or Popover). */
export type OverlayCloseFn = () => void;

const OverlayContext = createContext<OverlayCloseFn | undefined>(undefined);

export function OverlayProvider({
  close,
  children,
}: {
  close: OverlayCloseFn;
  children: React.ReactNode;
}) {
  return (
    <OverlayContext.Provider value={close}>{children}</OverlayContext.Provider>
  );
}

export function useOverlayClose(): OverlayCloseFn | undefined {
  return useContext(OverlayContext);
}
