`proof.ttf` is an original minimal test font. Its `i` and `W` glyphs are rectangles,
with 500-unit advances at 1000 units per em. Eight glyphs at 31px therefore measure
124px before platform-specific pixel rounding. Browser tests compare against a
control in a separate document, proving the preview uses the downloaded font
rather than merely registering a loaded face.
