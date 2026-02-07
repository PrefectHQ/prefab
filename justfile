# Build the project
build:
    uv sync

# Run tests
test: build
    uv run --frozen pytest -xvs tests

# Run ty type checker
typecheck:
    uv run --frozen ty check

# Run all pre-commit checks
lint:
    uv run --frozen prek run --all-files

# Rebuild component previews, CSS, and playground bundle
generate-preview-css:
    uv run docs/_preview-build/render_previews.py
    uv run docs/_preview-build/generate_content.py
    npx --yes @tailwindcss/cli@4 -i docs/_preview-build/input.css -o /tmp/prefab-preview-raw.css --minify
    uv run docs/_preview-build/scope_css.py
    uv run docs/_preview-build/generate_playground_bundle.py

# Start the renderer dev server
renderer:
    cd renderer && npm run dev

# Serve documentation locally (starts renderer dev server automatically)
docs:
    #!/usr/bin/env bash
    set -e
    cleanup() { kill 0 2>/dev/null; }
    trap cleanup EXIT INT TERM
    echo "Starting renderer dev server (localhost:3333)..."
    (cd renderer && npm run dev) &
    sleep 2
    echo "Starting Mintlify docs server..."
    cd docs && npx --yes mint@latest dev

# Regenerate playground bundle.json and examples.json
playground:
    uv run docs/_preview-build/generate_playground_bundle.py
    uv run docs/_preview-build/extract_examples.py

# Generate per-component protocol reference pages from Pydantic models
generate-protocol-ref:
    uv run docs/_preview-build/generate_protocol_pages.py

# Check for broken links in documentation
docs-broken-links:
    cd docs && npx --yes mint@latest broken-links
