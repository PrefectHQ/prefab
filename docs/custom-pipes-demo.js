// Custom pipe demos for the docs — registered globally so ComponentPreviews
// on the custom-handlers page can use them in live expressions.
window.__prefab_handlers = {
  pipes: {
    stars: (value) => {
      const n = Number(value);
      const full = Math.floor(n);
      const half = n % 1 >= 0.5 ? 1 : 0;
      const empty = 5 - full - half;
      return (
        "\u2605".repeat(full) + (half ? "\u00bd" : "") + "\u2606".repeat(empty)
      );
    },
    tempColor: (value) => {
      const f = Number(value);
      if (f >= 100) return f + "\u00b0F \ud83d\udd25";
      if (f >= 80) return f + "\u00b0F \u2600\ufe0f";
      if (f >= 60) return f + "\u00b0F \ud83c\udf24\ufe0f";
      return f + "\u00b0F \u2744\ufe0f";
    },
    initials: (value) => {
      return String(value)
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase();
    },
  },
};
