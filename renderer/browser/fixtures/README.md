`proof.ttf` is an original minimal test font. Its `i` and `W` glyphs are rectangles,
with 500-unit advances at 1000 units per em. Eight glyphs at 31px therefore measure
124px, independent of installed system fonts. This lets browser tests prove the
preview uses the downloaded font rather than merely registering a loaded face.
