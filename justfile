# Build the project
build:
    uv sync

# Run tests
test: build
    uv run --frozen pytest -xvs tests

# Run ty type checker
typecheck:
    uv run --frozen ty check

# Start the renderer dev server
renderer:
    cd renderer && npm run dev

# Serve documentation locally (starts renderer dev server automatically)
docs:
    (cd renderer && npm run dev) & trap "kill $! 2>/dev/null" EXIT; cd docs && npx --yes mint@latest dev
