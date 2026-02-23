# Build
build:
    tsc

# Watch mode
watch:
    tsc --watch

# Start dev server
start:
    http-server -p 8080 -c-1

# Build and start
dev: build start

# Run all tests
test:
    find src -name '*.test.ts' -exec tsx {} \;

# Run a single test file
test-file file:
    tsx {{file}}
