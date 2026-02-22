# Goose Game - Agent Instructions

## Project Overview

A TypeScript browser game featuring an isometric world where a goose walks around on grass tiles. Uses HTML5 Canvas for rendering with keyboard (WASD/arrows) and touch controls.

## Build, Lint, and Test Commands

Always use `just` for common commands. Never run npm, npx, or tsc directly.

```bash
# Build TypeScript
just build

# Watch mode for development
just watch

# Start local dev server (port 8080)
just start

# Build and start together
just dev

# Run all tests
just test

# Run a single test file
just test path/to/test.test.ts
```

## Development Workflow

### Test-Driven Development (TDD)

1. **Before implementing**: Write a failing test first
2. **Implement**: Write minimum code to make test pass
3. **Refactor**: Clean up while keeping tests green
4. **Verify**: Run full test suite before committing

### Spec-Driven Development

Check `openspec/changes/archive/` for existing specifications:
- `goose-movement`: WASD/arrow key movement, world boundaries
- `goose-animation`: Walk animation, sprite flipping, waddle bob
- `grass-field-world`: World grid rendering
- `isometric-rendering`: Coordinate conversion

Before making changes, review relevant specs in `openspec/specs/` or `openspec/changes/`.

## Code Style Guidelines

### TypeScript Configuration

- Target: ES2020
- Module: ES2020 (ESM)
- Strict mode enabled
- No implicit any

### Imports

Use ESM syntax: `import { foo } from './module.js';`

### Formatting

- Indent: 2 spaces
- No semicolons at end of statements
- Max line length: none enforced
- No comments unless absolutely necessary for complex logic

### Naming Conventions

```typescript
// Constants: SCREAMING_SNAKE_CASE
const TILE_WIDTH = 16;
const SPEED = 0.08;

// Variables and functions: camelCase
function isoToScreen(x: number, y: number): { x: number; y: number }

// Interfaces: PascalCase for object shapes representing state
interface GooseState { x: number; y: number; }

// Type aliases: PascalCase for unions/primitives
type Direction = 'left' | 'right';

// Use Record<K, V> for dictionaries/maps
const keyDirections: Record<string, { dx: number; dy: number }> = { ... };
```

### Type Annotations

- Explicit return types on all functions
- Explicit parameter types
- Use `interface` for object shapes representing state
- Use `type` for unions, primitives, or when extending

### DOM and Canvas

- Use non-null assertion (`!`) for known-present DOM elements
- Cast `getElementById` results: `document.getElementById('game') as HTMLCanvasElement`

### Error Handling

- Let runtime errors surface for missing DOM elements (fail fast)
- Use boundary clamping for game state rather than throwing
- No try-catch blocks currently needed

```typescript
// Boundary enforcement via clamping
if (newX < BOUNDS.minX) newX = BOUNDS.minX;
if (newX > BOUNDS.maxX) newX = BOUNDS.maxX;
```

### Functions

- Prefer pure functions that can be tested independently
- Extract logic from DOM-dependent code for testability
- Pass dependencies as parameters rather than using globals

### Event Handlers

- Use arrow functions for callbacks
- Prevent default for game keys to avoid page scrolling

## File Structure

```
.
├── src/game.ts           # Main game code
├── dist/                 # Compiled JS (gitignored)
├── assets/               # PNG sprites and tiles
├── index.html            # Entry point
├── tsconfig.json         # TypeScript config
├── Justfile              # Build commands
├── flake.nix             # Nix dev environment
└── openspec/             # Specifications and change tracking
```

## Environment

This project uses Nix flakes for dependency management. Never use npm, yarn, or other package managers.

Run `nix develop` or use direnv with `.envrc` to enter the development environment.

Available tools: Node.js 22, TypeScript compiler, http-server, just

## Testing Strategy

Per `openspec/changes/improve-testing/design.md`:

1. **Framework**: Vitest (fast, TypeScript-native, Jest-compatible)
2. **Approach**: Extract pure functions from DOM-dependent code
3. **Focus**: Test requirements from specs, not implementation details

Functions to extract for testing:
- `isoToScreen(x, y, canvasWidth, canvasHeight)` - isometric conversion
- `clampToBounds(x, y, bounds)` - boundary enforcement
- `calculateMovement(keys, currentPos, speed, bounds)` - movement logic
- `updateAnimation(state, deltaTime)` - animation frame logic
