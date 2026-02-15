/**
 * Code editor powered by CodeMirror 6.
 *
 * Provides syntax highlighting, indent/dedent (Tab/Shift-Tab),
 * comment toggling (Cmd-/), and undo/redo out of the box.
 */

import { useEffect, useRef } from "react";
import { Compartment, EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  highlightSpecialChars,
  drawSelection,
} from "@codemirror/view";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
  toggleComment,
} from "@codemirror/commands";
import {
  indentOnInput,
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
} from "@codemirror/language";
import { python } from "@codemirror/lang-python";
import { json } from "@codemirror/lang-json";

type Language = "python" | "json";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language: Language;
  dark: boolean;
}

const darkTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: "transparent",
      height: "100%",
    },
    ".cm-content": {
      fontFamily: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      padding: "1rem",
    },
    ".cm-gutters": { display: "none" },
    ".cm-activeLine": { backgroundColor: "transparent" },
    ".cm-selectionBackground": {
      backgroundColor: "rgba(255, 255, 255, 0.15) !important",
    },
    "&.cm-focused .cm-selectionBackground": {
      backgroundColor: "rgba(255, 255, 255, 0.15) !important",
    },
    ".cm-cursor": { borderLeftColor: "var(--foreground)" },
    ".cm-scroller": { overflow: "auto" },
  },
  { dark: true },
);

const lightTheme = EditorView.theme({
  "&": {
    backgroundColor: "transparent",
    height: "100%",
  },
  ".cm-content": {
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    padding: "1rem",
  },
  ".cm-gutters": { display: "none" },
  ".cm-activeLine": { backgroundColor: "transparent" },
  ".cm-selectionBackground": {
    backgroundColor: "rgba(0, 0, 0, 0.1) !important",
  },
  "&.cm-focused .cm-selectionBackground": {
    backgroundColor: "rgba(0, 0, 0, 0.1) !important",
  },
  ".cm-cursor": { borderLeftColor: "var(--foreground)" },
  ".cm-scroller": { overflow: "auto" },
});

function langExtension(language: Language) {
  return language === "python" ? python() : json();
}

export function Editor({ value, onChange, language, dark }: EditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const langCompartment = useRef(new Compartment());
  const themeCompartment = useRef(new Compartment());
  // Track whether we're pushing an external update into CM
  const externalUpdate = useRef(false);
  // Keep onChange stable for the update listener
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Create the editor on mount
  useEffect(() => {
    if (!containerRef.current) return;

    const state = EditorState.create({
      doc: value,
      extensions: [
        highlightSpecialChars(),
        history(),
        drawSelection(),
        indentOnInput(),
        bracketMatching(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        keymap.of([
          ...defaultKeymap,
          ...historyKeymap,
          indentWithTab,
          { key: "Mod-/", run: toggleComment },
        ]),
        langCompartment.current.of(langExtension(language)),
        themeCompartment.current.of(dark ? darkTheme : lightTheme),
        EditorView.updateListener.of((update) => {
          if (update.docChanged && !externalUpdate.current) {
            onChangeRef.current(update.state.doc.toString());
          }
        }),
        EditorView.lineWrapping,
      ],
    });

    const view = new EditorView({ state, parent: containerRef.current });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync external value changes into CM
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const currentDoc = view.state.doc.toString();
    if (currentDoc !== value) {
      externalUpdate.current = true;
      view.dispatch({
        changes: { from: 0, to: currentDoc.length, insert: value },
      });
      externalUpdate.current = false;
    }
  }, [value]);

  // Reconfigure language when it changes
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({
      effects: langCompartment.current.reconfigure(langExtension(language)),
    });
  }, [language]);

  // Reconfigure theme when it changes
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({
      effects: themeCompartment.current.reconfigure(
        dark ? darkTheme : lightTheme,
      ),
    });
  }, [dark]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-hidden font-mono text-sm leading-relaxed [&_.cm-editor]:h-full [&_.cm-editor]:outline-none"
    />
  );
}
