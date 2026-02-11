/**
 * Main playground component — split-pane editor (left) + live preview (right).
 *
 * Uses shadcn/ui primitives for the chrome so the playground looks
 * consistent with the prefab design system.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Toaster } from "sonner";
import { Moon, Sun, Search, Braces } from "lucide-react";
import { RenderTree, type ComponentNode } from "../renderer";
import { useStateStore } from "../state";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Alert, AlertDescription } from "@/ui/alert";
import { Separator } from "@/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Editor } from "./editor";
import { executePython, loadPyodideRuntime } from "./pyodide";
import { EXAMPLES, type Example } from "./examples";

type EditorMode = "python" | "json";
type PyodideStatus = "idle" | "loading" | "ready" | "error";

const DEFAULT_PYTHON = `from prefab_ui.components import (
    Card, CardHeader, CardTitle, CardDescription, CardContent,
    Button, Input, Column, Row, Badge, Text,
)

with Card():
    with CardHeader():
        CardTitle("Welcome to Prefab")
        CardDescription("The agentic frontend framework that even humans can use.")
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

function ExamplePicker({ onSelect }: { onSelect: (ex: Example) => void }) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!filter) return EXAMPLES;
    const q = filter.toLowerCase();
    return EXAMPLES.filter(
      (ex) =>
        ex.title.toLowerCase().includes(q) ||
        ex.category.toLowerCase().includes(q),
    );
  }, [filter]);

  const grouped = useMemo(() => {
    const groups = new Map<string, Example[]>();
    for (const ex of filtered) {
      const list = groups.get(ex.category) ?? [];
      list.push(ex);
      groups.set(ex.category, list);
    }
    return groups;
  }, [filtered]);

  useEffect(() => {
    if (open) {
      setFilter("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="inline-flex h-10 items-center gap-2 rounded-md border bg-background px-3 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
          <Search className="h-4 w-4" />
          Examples...
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[320px] p-0">
        <div className="border-b px-3 py-2">
          <input
            ref={inputRef}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter examples..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto py-1">
          {filtered.length === 0 && (
            <div className="px-3 py-4 text-center text-sm text-muted-foreground">
              No matching examples.
            </div>
          )}
          {[...grouped.entries()].map(([category, items]) => (
            <div key={category}>
              <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
                {category}
              </div>
              {items.map((ex) => (
                <button
                  key={ex.title}
                  className="flex w-full items-center px-3 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                  onClick={() => {
                    onSelect(ex);
                    setOpen(false);
                  }}
                >
                  {ex.title}
                </button>
              ))}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function Playground() {
  const [code, setCode] = useState(DEFAULT_PYTHON);
  const [tree, setTree] = useState<ComponentNode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pyStatus, setPyStatus] = useState<PyodideStatus>("idle");
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<EditorMode>("python");
  const [jsonCode, setJsonCode] = useState("");
  const [jsonDirty, setJsonDirty] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dark, setDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const state = useStateStore({});
  const stateRef = useRef(state);
  stateRef.current = state;
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const codeRef = useRef(code);
  codeRef.current = code;
  const pyStatusRef = useRef(pyStatus);
  pyStatusRef.current = pyStatus;

  // Sync dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    loadPyodideRuntime(setPyStatus);
  }, []);

  // Load code from URL hash: playground.html#code=<base64>
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const params = new URLSearchParams(hash);
    const encoded = params.get("code");
    if (!encoded) return;
    try {
      setCode(atob(encoded));
    } catch {
      // ignore malformed hash
    }
  }, []);

  // Sync code to URL hash for shareability (only in Python mode)
  useEffect(() => {
    if (mode === "python") {
      const encoded = btoa(code);
      window.history.replaceState(null, "", `#code=${encoded}`);
    }
  }, [code, mode]);

  // --- Python execution ---

  const executeCode = useCallback(async (source: string) => {
    if (pyStatusRef.current !== "ready") return;
    setRunning(true);
    const result = await executePython(source);
    setRunning(false);

    if (codeRef.current !== source) return;

    if (result.error) {
      setError(result.error);
    } else if (result.tree) {
      setTree(result.tree);
      if (result.state) stateRef.current.reset(result.state);
      setError(null);
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
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* Toolbar */}
      <div className="flex items-center gap-3 border-b px-4 py-2">
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
            onClick={handleModeToggle}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground ${
              mode === "json" ? "bg-accent text-accent-foreground" : ""
            }`}
            aria-label={mode === "python" ? "Edit JSON" : "Back to Python"}
            title={mode === "python" ? "Edit JSON" : "Back to Python"}
          >
            <Braces className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDark((d) => !d)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Split panes */}
      <div className="flex min-h-0 flex-1">
        <div className="flex w-1/2 flex-col border-r">
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
          {error && (
            <Alert variant="destructive" className="m-2">
              <AlertDescription className="font-mono text-xs">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="w-1/2 overflow-auto bg-background p-6">
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
