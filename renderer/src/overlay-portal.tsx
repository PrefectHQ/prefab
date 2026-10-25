import { useEffect, useState, type ReactNode } from "react";
import { PortalContainerProvider } from "./portal-container";

/** Fixed overlay root so portaled popovers don't inflate iframe scroll height. */
export function McpOverlayPortal({ children }: { children: ReactNode }) {
  const [portal, setPortal] = useState<HTMLElement | undefined>();
  useEffect(() => {
    const host = document.createElement("div");
    host.setAttribute("data-prefab-overlay-portal", "");
    host.className = "pf-overlay-portal";
    document.body.appendChild(host);
    setPortal(host);
    return () => host.remove();
  }, []);
  return (
    <PortalContainerProvider container={portal}>
      {children}
    </PortalContainerProvider>
  );
}
