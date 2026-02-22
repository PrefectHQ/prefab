/**
 * Full lucide-react icon set — lazy-loaded on demand.
 *
 * This module re-exports the entire `icons` map from lucide-react. It's
 * only imported dynamically (via `import()`) when a component requests
 * an icon that isn't in the static map in icons.tsx. Keeping it separate
 * ensures the ~500-800KB icon barrel stays out of the core bundle.
 */

export { icons } from "lucide-react";
