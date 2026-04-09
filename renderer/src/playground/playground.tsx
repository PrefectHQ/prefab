/**
 * Main playground component — split-pane editor (left) + live preview (right).
 *
 * Uses shadcn/ui primitives for the chrome so the playground looks
 * consistent with the prefab design system.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Toaster } from "sonner";
import {
  Moon,
  Sun,
  Braces,
  Link,
  Check,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { RenderTree, type ComponentNode } from "../renderer";
import { useStateStore } from "../state";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Alert, AlertDescription } from "@/ui/alert";
import { Separator } from "@/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Editor } from "./editor";
import { ExamplePicker } from "./example-picker";
import { executePython, loadPyodideRuntime } from "./pyodide";
import { type Example } from "./examples";
import { ThemePicker } from "./theme-picker";
import { buildThemeCss } from "../themes";
import pako from "pako";

/**
 * Tailwind v4's `@theme inline` declares `--color-*: var(--*)` aliases at
 * `:root`.  When we scope a theme to `#pg-preview` by setting e.g.
 * `--background: #0f1117`, Tailwind utilities like `bg-background` still
 * read `--color-background` which was inherited from `:root` with the
 * *original* value.  Redeclaring the aliases inside `#pg-preview` forces
 * them to re-resolve against the overridden `--*` values in this scope.
 */
const COLOR_REBIND = `
#pg-preview, #pg-preview.dark {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-info: var(--info);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
}`;

/** Rewrite theme CSS selectors to scope to #pg-preview, and rebind
 *  Tailwind's --color-* aliases so they resolve in that scope. */
function scopeThemeCss(css: string): string {
  if (!css) return "";
  const scoped = css
    .replace(/:root/g, "#pg-preview")
    .replace(/\.dark\s*\{/g, "#pg-preview.dark {")
    .replace(/\.dark\s+\./g, "#pg-preview.dark .")
    .replace(/\.dark\s+:/g, "#pg-preview.dark :");
  return scoped + "\n" + COLOR_REBIND;
}

function gzipEncode(str: string): string {
  const compressed = pako.gzip(new TextEncoder().encode(str));
  let binary = "";
  for (const byte of compressed) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function gzipDecode(encoded: string): string | null {
  try {
    const padded = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(pako.ungzip(bytes));
  } catch {
    return null;
  }
}

function base64Decode(encoded: string): string | null {
  try {
    const padded = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

function decodePgParam(encoded: string): string | null {
  return gzipDecode(encoded) ?? base64Decode(encoded);
}

type EditorMode = "python" | "json";
type PyodideStatus = "idle" | "loading" | "ready" | "error";

const DEFAULT_PYTHON = `from prefab_ui.components import *

with Card():
    with CardHeader():
        CardTitle("Welcome to Prefab")
        CardDescription("The generative UI framework that even humans can use.")
    with CardContent():
        with Column(gap=3):
            Input(name="name", placeholder="Your name...")
            with Row(gap=2):
                Button("Say Hello", variant="default")
                Button("Reset", variant="outline")
            with Row(gap=2):
                Badge("Python", variant="secondary")
                Badge("React", variant="secondary")
                Badge("Live", variant="success")
`;

const DEBOUNCE_MS = 200;

/** Wrap localStorage reads — sandboxed iframes or strict privacy
 *  modes can throw SecurityError on access. */
function safeStorageGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore — persistence is best-effort.
  }
}

export function Playground() {
  const [code, setCode] = useState(DEFAULT_PYTHON);
  const [tree, setTree] = useState<ComponentNode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [pyStatus, setPyStatus] = useState<PyodideStatus>("idle");
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<EditorMode>("python");
  const [jsonCode, setJsonCode] = useState("");
  const [jsonDirty, setJsonDirty] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [themeCss, setThemeCss] = useState("");
  const [codeThemeCss, setCodeThemeCss] = useState("");
  const [dark, setDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const [editorCollapsed, setEditorCollapsed] = useState(
    () => safeStorageGet("pg-editor-collapsed") === "true",
  );
  const [editorWidth, setEditorWidth] = useState(() => {
    const stored = parseFloat(safeStorageGet("pg-editor-width") ?? "");
    return Number.isFinite(stored)
      ? Math.max(0.15, Math.min(0.85, stored))
      : 0.5;
  });
  const splitRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const state = useStateStore({});
  const stateRef = useRef(state);
  stateRef.current = state;
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const codeRef = useRef(code);
  codeRef.current = code;
  const pyStatusRef = useRef(pyStatus);
  pyStatusRef.current = pyStatus;
  // Skip the initial postMessages so they don't clobber the URL hash
  // before the parent has a chance to send pg-init-code.
  const skipFirstCodeMsg = useRef(true);
  const skipFirstThemeMsg = useRef(true);

  // Sync dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Persist split layout preferences
  useEffect(() => {
    safeStorageSet("pg-editor-collapsed", String(editorCollapsed));
  }, [editorCollapsed]);
  useEffect(() => {
    safeStorageSet("pg-editor-width", editorWidth.toFixed(3));
  }, [editorWidth]);

  // Draggable split divider — uses pointer capture so move/up events
  // still reach us if the pointer exits the iframe the playground is
  // embedded in (window-level mouseup would be swallowed there).
  const startDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  const onDragMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || !splitRef.current) return;
    const rect = splitRef.current.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    setEditorWidth(Math.max(0.15, Math.min(0.85, pct)));
  }, []);

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  // Inject theme CSS scoped to the preview pane.
  // Rewrite `:root` → `#pg-preview` and `.dark` → `#pg-preview.dark`
  // so theme variables don't bleed into the editor.
  // Always remove + re-append so #pg-theme stays last in <head> and
  // the picker overrides any code-defined theme (same specificity, later wins).
  useEffect(() => {
    const existing = document.getElementById("pg-theme");
    if (existing) existing.remove();
    const el = document.createElement("style");
    el.id = "pg-theme";
    document.head.appendChild(el);
    el.textContent = scopeThemeCss(themeCss);
  }, [themeCss]);

  // Inject theme from PrefabApp in code, scoped to the preview pane.
  // When the picker has a selection, suppress the code theme entirely
  // so its variables don't bleed through (e.g. Presentation's dark
  // background showing under a Basic accent picker selection).
  // When the picker is empty ("Default"), the code theme is active.
  useEffect(() => {
    let el = document.getElementById(
      "pg-code-theme",
    ) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement("style");
      el.id = "pg-code-theme";
      document.head.appendChild(el);
    }
    el.textContent = themeCss ? "" : scopeThemeCss(codeThemeCss);
  }, [codeThemeCss, themeCss]);

  useEffect(() => {
    loadPyodideRuntime(setPyStatus);
  }, []);

  // Listen for init from parent, and signal readiness on mount.
  // When running standalone (not in an iframe), read the hash directly.
  useEffect(() => {
    const isStandalone = window.parent === window;
    if (isStandalone) {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const params = new URLSearchParams(hash);
        const encodedCode = params.get("code");
        if (encodedCode) {
          const decoded = decodePgParam(encodedCode);
          if (decoded) setCode(decoded);
        }
        const encodedTheme = params.get("theme");
        if (encodedTheme) {
          const decoded = decodePgParam(encodedTheme);
          if (decoded) setThemeCss(decoded);
        }
      }
      return;
    }
    function onMessage(e: MessageEvent) {
      if (e.data?.type === "pg-init-code") {
        if (typeof e.data.encoded === "string") {
          const decoded = decodePgParam(e.data.encoded);
          if (decoded) setCode(decoded);
        }
        if (typeof e.data.theme === "string" && e.data.theme) {
          const decoded = decodePgParam(e.data.theme);
          if (decoded) setThemeCss(decoded);
        }
      }
    }
    window.addEventListener("message", onMessage);
    window.parent.postMessage({ type: "pg-ready" }, "*");
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Build the full hash string from code + theme.
  const buildHash = useCallback((codeStr: string, themeStr: string) => {
    const parts: string[] = [];
    parts.push(`code=${gzipEncode(codeStr)}`);
    if (themeStr) {
      parts.push(`theme=${gzipEncode(themeStr)}`);
    }
    return parts.join("&");
  }, []);

  // Post code changes to parent so it can update the page URL hash.
  // When standalone, update the hash directly.
  useEffect(() => {
    if (skipFirstCodeMsg.current) {
      skipFirstCodeMsg.current = false;
      return;
    }
    if (mode === "python") {
      const hash = buildHash(code, themeCss);
      if (hash) {
        if (window.parent === window) {
          window.history.replaceState(null, "", `#${hash}`);
        } else {
          window.parent.postMessage({ type: "pg-code-changed", hash }, "*");
        }
      }
    }
  }, [code, mode, themeCss, buildHash]);

  // Post theme changes to parent.
  useEffect(() => {
    if (skipFirstThemeMsg.current) {
      skipFirstThemeMsg.current = false;
      return;
    }
    const hash = buildHash(codeRef.current, themeCss);
    if (hash) {
      if (window.parent === window) {
        window.history.replaceState(null, "", `#${hash}`);
      } else {
        window.parent.postMessage({ type: "pg-theme-changed", hash }, "*");
      }
    }
  }, [themeCss, buildHash]);

  // --- Python execution ---

  const executeCode = useCallback(async (source: string) => {
    if (pyStatusRef.current !== "ready") return;
    setRunning(true);
    const result = await executePython(source);
    setRunning(false);

    if (codeRef.current !== source) return;

    if (result.error) {
      setError(result.error);
      setErrorDetail(result.errorDetail ?? null);
    } else if (result.tree) {
      setTree(result.tree);
      stateRef.current.reset({ ...result.state, ...stateRef.current.getAll() });
      setCodeThemeCss(result.theme ? buildThemeCss(result.theme, false) : "");
      if (result.theme?.mode) {
        setDark(result.theme.mode === "dark");
      }
      setError(null);
      setErrorDetail(null);
    }
  }, []);

  useEffect(() => {
    if (pyStatus === "ready") {
      executeCode(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pyStatus]);

  // Debounced Python execution (only in Python mode)
  useEffect(() => {
    if (mode !== "python") return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      executeCode(code);
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [code, mode, executeCode]);

  // --- JSON editing ---

  const handleJsonChange = useCallback((value: string) => {
    setJsonCode(value);
    setJsonDirty(true);
  }, []);

  // Debounced JSON parsing (only in JSON mode)
  useEffect(() => {
    if (mode !== "json") return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      try {
        const parsed = JSON.parse(jsonCode);
        if (parsed.view) {
          const reserved = new Set(["view", "state"]);
          const data: Record<string, unknown> = {};
          for (const [k, v] of Object.entries(parsed)) {
            if (!reserved.has(k)) data[k] = v;
          }
          setTree(parsed.view as ComponentNode);
          stateRef.current.reset({ ...data, ...(parsed.state ?? {}) });
        } else {
          setTree(parsed as ComponentNode);
        }
        setError(null);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : String(e));
      }
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [jsonCode, mode]);

  // --- Mode switching ---

  const enterJsonMode = useCallback(() => {
    const json = tree ? JSON.stringify(tree, null, 2) : "{}";
    setJsonCode(json);
    setJsonDirty(false);
    setMode("json");
  }, [tree]);

  const exitJsonMode = useCallback(() => {
    setMode("python");
    setJsonDirty(false);
    setConfirmOpen(false);
    // Re-execute Python to restore the preview
    executeCode(codeRef.current);
  }, [executeCode]);

  const handleModeToggle = useCallback(() => {
    if (mode === "python") {
      enterJsonMode();
    } else if (jsonDirty) {
      setConfirmOpen(true);
    } else {
      exitJsonMode();
    }
  }, [mode, jsonDirty, enterJsonMode, exitJsonMode]);

  const handleExampleSelect = useCallback(
    (ex: Example) => {
      if (mode === "json") {
        setMode("python");
        setJsonDirty(false);
      }
      setCode(ex.code);
      setError(null);
    },
    [mode],
  );

  const statusBadge = useMemo(() => {
    if (running) return { variant: "warning" as const, label: "Running..." };
    switch (pyStatus) {
      case "idle":
        return { variant: "secondary" as const, label: "Python: Idle" };
      case "loading":
        return { variant: "info" as const, label: "Loading Python..." };
      case "ready":
        return { variant: "success" as const, label: "Python: Ready" };
      case "error":
        return { variant: "destructive" as const, label: "Python: Error" };
    }
  }, [pyStatus, running]);

  return (
    <div className="flex h-[800px] flex-col bg-background text-foreground">
      {/* Toolbar */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <button
          onClick={() => setEditorCollapsed((v) => !v)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
          aria-label={editorCollapsed ? "Show code panel" : "Hide code panel"}
          title={editorCollapsed ? "Show code panel" : "Hide code panel"}
        >
          {editorCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
        <ExamplePicker onSelect={handleExampleSelect} />

        {mode === "json" && (
          <Badge variant="outline" className="text-xs">
            Editing JSON
          </Badge>
        )}

        <div className="ml-auto flex items-center gap-2">
          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
          <Separator orientation="vertical" className="h-6" />
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                window.parent === window
                  ? window.location.href
                  : window.parent.location.href,
              );
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
            aria-label="Copy link"
            title="Copy link"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Link className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={handleModeToggle}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground ${
              mode === "json" ? "bg-accent text-accent-foreground" : ""
            }`}
            aria-label={mode === "python" ? "Edit JSON" : "Back to Python"}
            title={mode === "python" ? "Edit JSON" : "Back to Python"}
          >
            <Braces className="h-4 w-4" />
          </button>
          <ThemePicker value={themeCss} onChange={setThemeCss} />
          <button
            onClick={() => setDark((d) => !d)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Split panes */}
      <div ref={splitRef} className="flex min-h-0 flex-1">
        {!editorCollapsed && (
          <>
            <div
              className="flex min-w-0 flex-col"
              style={{ width: `${editorWidth * 100}%` }}
            >
              <div className="min-h-0 flex-1 overflow-hidden bg-muted/30">
                {mode === "python" ? (
                  <Editor
                    value={code}
                    onChange={setCode}
                    language="python"
                    dark={dark}
                  />
                ) : (
                  <Editor
                    value={jsonCode}
                    onChange={handleJsonChange}
                    language="json"
                    dark={dark}
                  />
                )}
              </div>
            </div>
            <div
              onPointerDown={startDrag}
              onPointerMove={onDragMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onDoubleClick={() => setEditorWidth(0.5)}
              className="w-1 shrink-0 cursor-col-resize bg-border transition-colors hover:bg-primary/50"
              role="separator"
              aria-label="Resize code panel"
              title="Drag to resize, double-click to reset"
            />
          </>
        )}

        <div
          id="pg-preview"
          className={`min-w-0 flex-1 overflow-auto bg-background text-foreground p-6${
            dark ? " dark" : ""
          }`}
        >
          {tree ? (
            <RenderTree tree={tree} state={state} app={null} />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              {pyStatus === "loading"
                ? "Loading Python runtime..."
                : "Preview will appear here"}
            </div>
          )}
        </div>
      </div>

      {/* Error banner — rendered outside the split so it remains
          visible even when the code panel is collapsed. */}
      {error && (
        <Alert variant="destructive" className="m-2 shrink-0">
          <AlertDescription className="font-mono text-xs">
            {error}
            {errorDetail && (
              <details className="mt-1">
                <summary className="cursor-pointer text-[0.65rem] opacity-70 hover:opacity-100">
                  Traceback
                </summary>
                <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap break-words text-[0.65rem] opacity-80">
                  {errorDetail}
                </pre>
              </details>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Confirm discard dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Discard JSON edits?</DialogTitle>
            <DialogDescription>
              Switching back to Python will discard your JSON changes and
              re-render from the Python source.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={exitJsonMode}>
              Discard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
}
