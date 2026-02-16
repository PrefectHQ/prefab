/**
 * Code editor powered by CodeMirror 6.
 *
 * Provides syntax highlighting, indent/dedent (Tab/Shift-Tab),
 * comment toggling (Cmd-/), and undo/redo out of the box.
 *
 * Uses Snazzy color scheme for both dark and light modes.
 */

import { useEffect, useRef } from "react";
import { Compartment, EditorState, Extension } from "@codemirror/state";
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
  HighlightStyle,
  indentOnInput,
  indentUnit,
  syntaxHighlighting,
  bracketMatching,
} from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { python } from "@codemirror/lang-python";
import { json } from "@codemirror/lang-json";

type Language = "python" | "json";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language: Language;
  dark: boolean;
}

// ---------------------------------------------------------------------------
// Snazzy palette
// ---------------------------------------------------------------------------

const snazzy = {
  red: "#ff5c57",
  green: "#5af78e",
  yellow: "#f3f99d",
  blue: "#57c7ff",
  magenta: "#ff6ac1",
  cyan: "#9aedfe",
};

// Dark variant — bright tokens on dark background
const snazzyDarkHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: snazzy.magenta },
  { tag: tags.operator, color: snazzy.magenta },
  { tag: tags.definitionKeyword, color: snazzy.magenta },
  { tag: tags.controlKeyword, color: snazzy.magenta },
  { tag: tags.moduleKeyword, color: snazzy.magenta },
  { tag: tags.function(tags.variableName), color: snazzy.blue },
  {
    tag: tags.function(tags.definition(tags.variableName)),
    color: snazzy.green,
  },
  { tag: tags.definition(tags.variableName), color: snazzy.cyan },
  { tag: tags.variableName, color: "#eff0eb" },
  { tag: tags.propertyName, color: snazzy.cyan },
  { tag: tags.definition(tags.propertyName), color: snazzy.cyan },
  { tag: tags.string, color: snazzy.yellow },
  { tag: tags.number, color: snazzy.yellow },
  { tag: tags.bool, color: snazzy.yellow },
  { tag: tags.null, color: snazzy.yellow },
  { tag: tags.comment, color: "#606580" },
  { tag: tags.className, color: snazzy.green },
  { tag: tags.definition(tags.className), color: snazzy.green },
  { tag: tags.typeName, color: snazzy.cyan },
  { tag: tags.self, color: snazzy.red, fontStyle: "italic" },
  {
    tag: tags.special(tags.variableName),
    color: snazzy.red,
    fontStyle: "italic",
  },
  { tag: tags.atom, color: snazzy.yellow },
  { tag: tags.bracket, color: "#eff0eb" },
  { tag: tags.punctuation, color: "#eff0eb" },
  { tag: tags.separator, color: "#eff0eb" },
  { tag: tags.derefOperator, color: "#eff0eb" },
]);

// Light variant — saturated tokens on light background
const snazzyLightHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: "#d63384" },
  { tag: tags.operator, color: "#d63384" },
  { tag: tags.definitionKeyword, color: "#d63384" },
  { tag: tags.controlKeyword, color: "#d63384" },
  { tag: tags.moduleKeyword, color: "#d63384" },
  { tag: tags.function(tags.variableName), color: "#0969da" },
  { tag: tags.function(tags.definition(tags.variableName)), color: "#116329" },
  { tag: tags.definition(tags.variableName), color: "#0550ae" },
  { tag: tags.variableName, color: "#24292f" },
  { tag: tags.propertyName, color: "#0550ae" },
  { tag: tags.definition(tags.propertyName), color: "#0550ae" },
  { tag: tags.string, color: "#0a3069" },
  { tag: tags.number, color: "#0550ae" },
  { tag: tags.bool, color: "#0550ae" },
  { tag: tags.null, color: "#0550ae" },
  { tag: tags.comment, color: "#6e7781" },
  { tag: tags.className, color: "#116329" },
  { tag: tags.definition(tags.className), color: "#116329" },
  { tag: tags.typeName, color: "#0550ae" },
  { tag: tags.self, color: "#cf222e", fontStyle: "italic" },
  {
    tag: tags.special(tags.variableName),
    color: "#cf222e",
    fontStyle: "italic",
  },
  { tag: tags.atom, color: "#0550ae" },
  { tag: tags.bracket, color: "#24292f" },
  { tag: tags.punctuation, color: "#24292f" },
  { tag: tags.separator, color: "#24292f" },
  { tag: tags.derefOperator, color: "#24292f" },
]);

// ---------------------------------------------------------------------------
// Editor chrome themes (background, cursor, selection, etc.)
// ---------------------------------------------------------------------------

const baseEditorStyles = {
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
  ".cm-scroller": { overflow: "auto" },
};

const darkChrome = EditorView.theme(
  {
    ...baseEditorStyles,
    ".cm-selectionBackground": {
      backgroundColor: "rgba(255, 255, 255, 0.15) !important",
    },
    "&.cm-focused .cm-selectionBackground": {
      backgroundColor: "rgba(255, 255, 255, 0.15) !important",
    },
    ".cm-cursor": { borderLeftColor: "#eff0eb" },
  },
  { dark: true },
);

const lightChrome = EditorView.theme({
  ...baseEditorStyles,
  ".cm-selectionBackground": {
    backgroundColor: "rgba(0, 0, 0, 0.1) !important",
  },
  "&.cm-focused .cm-selectionBackground": {
    backgroundColor: "rgba(0, 0, 0, 0.1) !important",
  },
  ".cm-cursor": { borderLeftColor: "#24292f" },
});

// Combine chrome + syntax highlighting into a single extension per mode
const darkTheme: Extension = [
  darkChrome,
  syntaxHighlighting(snazzyDarkHighlight),
];

const lightTheme: Extension = [
  lightChrome,
  syntaxHighlighting(snazzyLightHighlight),
];

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
        indentUnit.of("    "),
        EditorState.tabSize.of(4),
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
