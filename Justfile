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
