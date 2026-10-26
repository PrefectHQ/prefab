/** Stable React portal boundary: CSS changes never replace live app state. */
import {
  Suspense,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Toaster } from "sonner";
import { PortalContainerProvider } from "./portal-container";
import { createShadowSurface, type ShadowSurface } from "./shadow-surface";
import { startShadowUtilities } from "./shadow-utilities";

export function ShadowPreviewContents({
  surface,
  dark,
  children,
}: {
  surface: ShadowSurface;
  dark: boolean;
  children?: ReactNode;
}) {
  return (
    <PortalContainerProvider container={surface.portal}>
      <Suspense fallback={null}>{children}</Suspense>
      {createPortal(
        <Toaster theme={dark ? "dark" : "light"} />,
        surface.portal,
      )}
    </PortalContainerProvider>
  );
}

export function ShadowPreview({
  css,
  stylesheets,
  dark,
  children,
}: {
  css?: unknown;
  stylesheets?: unknown;
  dark: boolean;
  children?: ReactNode;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [surface, setSurface] = useState<ShadowSurface | null>(null);
  const [styleError, setStyleError] = useState<string | null>(null);
  useLayoutEffect(() => {
    const next = createShadowSurface(host.current!, "playground");
    setSurface(next);
    return () => next.dispose();
  }, []);
  useLayoutEffect(() => {
    surface?.setAssets(css, stylesheets);
  }, [surface, css, stylesheets]);
  useLayoutEffect(() => {
    surface?.setDark(dark);
  }, [surface, dark]);
  useLayoutEffect(() => {
    if (!surface) return;
    const utilities = startShadowUtilities(surface.roots, (error) => {
      console.error("[Prefab] Unable to compile preview styles", error);
      setStyleError(error instanceof Error ? error.message : String(error));
    });
    return () => utilities.dispose();
  }, [surface]);
  return (
    <div id="pg-preview" ref={host} className="min-w-0 flex-1 overflow-auto">
      {surface &&
        createPortal(
          <ShadowPreviewContents surface={surface} dark={dark}>
            {styleError && (
              <div role="alert">
                Unable to compile preview styles: {styleError}
              </div>
            )}
            {children}
          </ShadowPreviewContents>,
          surface.mount,
        )}
    </div>
  );
}
