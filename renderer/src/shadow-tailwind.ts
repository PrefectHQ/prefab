/** Public Tailwind compiler for class candidates found inside preview shadows. */
import { compile } from "tailwindcss";
import tailwindIndex from "tailwindcss/index.css?raw";
import tailwindTheme from "tailwindcss/theme.css?raw";
import tailwindPreflight from "tailwindcss/preflight.css?raw";
import tailwindUtilities from "tailwindcss/utilities.css?raw";
// This package exposes a CSS-only `style` condition, not a JS/raw export.
import animations from "../node_modules/tw-animate-css/dist/tw-animate.css?raw";

const projectCss = import.meta.glob<string>("./*.css", {
  query: "?raw",
  import: "default",
  eager: true,
});
const stylesheets: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries(projectCss).map(([path, css]) => [
      `/prefab/${path.slice(2)}`,
      css,
    ]),
  ),
  "/tailwind/index.css": tailwindIndex,
  "/tailwind/theme.css": tailwindTheme,
  "/tailwind/preflight.css": tailwindPreflight,
  "/tailwind/utilities.css": tailwindUtilities,
  "/animations.css": animations,
};

/** Match the existing build's shadow @property initialization strategy. */
function initializeShadowProperties(css: string): string {
  const defaults: string[] = [];
  const rules = css.replace(
    /@property\s+(--[\w-]+)\s*\{([^}]*)\}/g,
    (_rule, name: string, body: string) => {
      const value = /initial-value:\s*([^;]+);/.exec(body)?.[1].trim();
      if (value) defaults.push(`${name}:${value};`);
      return "";
    },
  );
  return `:host{${defaults.join("")}}\n${rules}`;
}

export async function createShadowTailwindCompiler() {
  // Import the normal Tailwind theme FIRST. If a reference import sees it first,
  // import deduplication makes variables such as --spacing reference-only.
  // Reference the app index for inline theme mappings, variants and utilities,
  // without emitting its default app theme or component CSS over the chosen theme.
  const compiler = await compile(
    '@import "tailwindcss/theme.css"; @reference "./index.css"; @tailwind utilities; @custom-variant dark (:host([data-prefab-dark]) &);',
    {
      base: "/prefab",
      async loadStylesheet(id, base) {
        const path =
          id === "tailwindcss"
            ? "/tailwind/index.css"
            : id === "tailwindcss/theme.css"
              ? "/tailwind/theme.css"
              : id === "tw-animate-css"
                ? "/animations.css"
                : new URL(id, `https://prefab.invalid${base}/`).pathname;
        const content = stylesheets[path];
        if (content === undefined)
          throw new Error(`Unsupported bundled stylesheet: ${id}`);
        return { path, base: path.slice(0, path.lastIndexOf("/")), content };
      },
      async loadModule() {
        throw new Error(
          "Preview utilities do not load runtime plugins or config modules",
        );
      },
    },
  );
  return {
    build(candidates: Iterable<string>): string {
      // The compiler retains candidates incrementally for this preview instance.
      // The surface separately owns base CSS and selected theme CSS in both roots.
      return initializeShadowProperties(compiler.build(Array.from(candidates)));
    },
  };
}
