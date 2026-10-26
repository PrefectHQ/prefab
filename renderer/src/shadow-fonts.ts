/** Native font resources, kept separate from preview selector isolation. */
import { inlineCssEntries, stylesheetUrls } from "./style-assets";

interface FontLease {
  ready: Promise<void>;
  release(): void;
}
interface FontEntry {
  references: number;
  ready: Promise<void>;
  cancel: AbortController;
  faces: FontFace[];
  listeners: Set<(error: unknown) => void>;
}
const entries = new WeakMap<Document, Map<string, FontEntry>>();

function loaded(element: HTMLElement, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      element.removeEventListener("load", success);
      element.removeEventListener("error", failure);
      signal.removeEventListener("abort", cancelled);
    };
    const success = () => {
      cleanup();
      resolve();
    };
    const failure = () => {
      cleanup();
      reject(new Error("Unable to load preview font stylesheet"));
    };
    const cancelled = () => {
      cleanup();
      reject(signal.reason);
    };
    element.addEventListener("load", success, { once: true });
    element.addEventListener("error", failure, { once: true });
    signal.addEventListener("abort", cancelled, { once: true });
    if (signal.aborted) cancelled();
  });
}

/**
 * Let the browser parse font resources, including opaque stylesheets and relative
 * URLs, in a script-free document. Only disconnected FontFace objects cross
 * back to the parent; theme selectors never enter its stylesheet collection.
 */
export function acquireShadowFonts(
  css: unknown,
  stylesheets: unknown,
  onError: (error: unknown) => void,
): FontLease {
  const strings = inlineCssEntries(css);
  const urls = [...new Set(stylesheetUrls(stylesheets))];
  if (!document.fonts || (!strings.length && !urls.length))
    return { ready: Promise.resolve(), release() {} };
  let registry = entries.get(document);
  if (!registry) {
    registry = new Map();
    entries.set(document, registry);
  }
  const key = JSON.stringify([document.baseURI, strings, urls]);
  let entry = registry.get(key);
  if (!entry) {
    const cancel = new AbortController();
    entry = {
      references: 0,
      ready: Promise.resolve(),
      cancel,
      faces: [],
      listeners: new Set(),
    };
    registry.set(key, entry);
    const current = entry;
    const frame = document.createElement("iframe");
    frame.setAttribute("data-prefab-font-loader", "");
    frame.setAttribute("sandbox", "allow-same-origin");
    frame.setAttribute("aria-hidden", "true");
    frame.hidden = true;
    frame.title = "Preview font resources";
    frame.src = "about:blank";
    const removeFrame = () => frame.remove();
    cancel.signal.addEventListener("abort", removeFrame, { once: true });
    const initialLoad = loaded(frame, cancel.signal);
    document.body.append(frame);
    current.ready = (async () => {
      let transferred = false;
      try {
        await initialLoad;
        cancel.signal.throwIfAborted();
        const child = frame.contentDocument;
        if (!child) throw new Error("Preview font document is unavailable");
        const base = child.createElement("base");
        base.href = document.baseURI;
        child.head.append(base);
        const pending: Promise<void>[] = [];
        for (const text of strings) {
          const style = child.createElement("style");
          style.textContent = text;
          child.head.append(style);
          // Read only this inline sheet's own rules. Its imported stylesheet
          // may be opaque; the browser still loads/registers its font faces.
          if (
            Array.from(style.sheet?.cssRules ?? []).some(
              (rule) => rule.type === CSSRule.IMPORT_RULE,
            )
          )
            pending.push(loaded(style, cancel.signal));
        }
        for (const url of urls) {
          const link = child.createElement("link");
          link.rel = "stylesheet";
          link.href = url;
          pending.push(loaded(link, cancel.signal));
          child.head.append(link);
        }
        await Promise.all(pending);
        void child.body.offsetWidth;
        cancel.signal.throwIfAborted();
        const faces = Array.from(child.fonts);
        // CSS-connected faces cannot portably be added to another FontFaceSet.
        // Disconnect their rules first, retaining the native URL/source data.
        for (const owner of child.head.querySelectorAll("style,link"))
          owner.remove();
        for (const face of faces) {
          if (!document.fonts.has(face)) {
            document.fonts.add(face);
            current.faces.push(face);
            // Chromium starts loading transferred faces lazily but does not
            // refresh font matching when they finish in the source document.
            // Re-register the loaded face so shadow text uses it. Observing
            // `loaded` does not request unused weights or Unicode ranges.
            void face.loaded.then(
              () => {
                if (cancel.signal.aborted || !document.fonts.has(face)) return;
                document.fonts.delete(face);
                document.fonts.add(face);
              },
              (error) => {
                if (!cancel.signal.aborted)
                  for (const notify of current.listeners) notify(error);
              },
            );
          }
        }
        // Unloaded faces retain their source document's loader context. Keep
        // this empty, sandboxed frame until the last consumer releases it.
        transferred = true;
      } catch (error) {
        if (!cancel.signal.aborted)
          for (const notify of current.listeners) notify(error);
      } finally {
        if (!transferred) {
          cancel.signal.removeEventListener("abort", removeFrame);
          removeFrame();
        }
      }
    })();
  }
  const current = entry;
  current.references++;
  current.listeners.add(onError);
  let released = false;
  return {
    ready: current.ready,
    release() {
      if (released) return;
      released = true;
      current.listeners.delete(onError);
      if (--current.references) return;
      registry.delete(key);
      current.cancel.abort();
      for (const face of current.faces) document.fonts.delete(face);
      current.faces.length = 0;
    },
  };
}
