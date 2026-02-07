/**
 * Code editor with Shiki syntax highlighting.
 *
 * Renders a transparent <textarea> on top of a Shiki-highlighted <div>.
 * The two are scroll-synchronized so highlights track the cursor.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

type Language = "python" | "json";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language: Language;
  dark: boolean;
}

let highlighter: HighlighterCore | null = null;
let highlighterPromise: Promise<HighlighterCore> | null = null;

async function getHighlighter(): Promise<HighlighterCore> {
  if (highlighter) return highlighter;
  if (highlighterPromise) return highlighterPromise;

  highlighterPromise = (async () => {
    // Direct file imports — only python + json + 2 themes get bundled
    const [pythonMod, jsonMod, lightMod, darkMod] = await Promise.all([
      import("shiki/dist/langs/python.mjs"),
      import("shiki/dist/langs/json.mjs"),
      import("shiki/dist/themes/snazzy-light.mjs"),
      import("shiki/dist/themes/dark-plus.mjs"),
    ]);

    const h = await createHighlighterCore({
      themes: [lightMod.default, darkMod.default],
      langs: [pythonMod.default, jsonMod.default],
      engine: createJavaScriptRegexEngine(),
    });
    highlighter = h;
    return h;
  })();

  return highlighterPromise;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function Editor({ value, onChange, language, dark }: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getHighlighter().then(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready || !highlighter) {
      setHtml(`<pre><code>${escapeHtml(value)}\n</code></pre>`);
      return;
    }
    const theme = dark ? "dark-plus" : "snazzy-light";
    setHtml(highlighter.codeToHtml(value, { lang: language, theme }));
  }, [value, language, ready, dark]);

  const syncScroll = useCallback(() => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const ta = e.currentTarget;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const newValue = value.slice(0, start) + "    " + value.slice(end);
        onChange(newValue);
        requestAnimationFrame(() => {
          ta.selectionStart = start + 4;
          ta.selectionEnd = start + 4;
        });
      }
    },
    [value, onChange],
  );

  return (
    <div className="relative h-full w-full overflow-hidden font-mono text-sm leading-relaxed">
      <div
        ref={highlightRef}
        className="pointer-events-none absolute inset-0 overflow-auto whitespace-pre p-4 [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!font-[inherit] [&_code]:!text-[inherit] [&_code]:!leading-[inherit] [&_.line]:!leading-relaxed"
        aria-hidden
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <textarea
        ref={textareaRef}
        className="absolute inset-0 h-full w-full resize-none overflow-auto whitespace-pre bg-transparent p-4 text-transparent caret-foreground outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={syncScroll}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
}
