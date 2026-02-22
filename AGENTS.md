# AGENTS.md - Goose Game Development Guide

## Project Overview

A simple browser-based isometric game where the player controls a goose. Built with plain TypeScript compiled to JavaScript using `tsc`. No package manager or build toolchain - just `tsc`.

## Build Commands

```bash
# Compile TypeScript to JavaScript
make

# Watch mode for development
make dev

# Serve the dist folder locally
make serve
```

## Testing

**No test framework is currently configured.** This is a simple vanilla TypeScript project without any test setup.

## Linting

**No linter is configured.** This project uses TypeScript's built-in type checking only.

## Code Style Guidelines

### TypeScript Configuration

The project uses strict TypeScript settings in `tsconfig.json`:

- `strict: true` - Full strict mode
- `noUncheckedIndexedAccess: true` - Index signatures return `T | undefined`
- `exactOptionalPropertyTypes: true` - Optional properties can't be accessed unless defined
- `noImplicitReturns: true` - All code paths must return a value
- `noImplicitOverride: true` - Must use `override` keyword for overridden methods
- `noUnusedParameters: true` - No unused function parameters
- `noFallthroughCasesInSwitch: true` - All switch cases must break or return
- `noPropertyAccessFromIndexSignature: true` - Must use index signature syntax for dynamic properties

### Formatting

- **Indentation**: 2 spaces
- **No semicolons** at end of statements
- **No trailing commas** in objects/arrays

### Naming Conventions

- **Variables/functions**: camelCase (`goosePos`, `renderGrass`)
- **Types**: PascalCase (`Vector3D`, `Sprite`)
- **Enums**: PascalCase with uppercase values (`Direction.U`, `Direction.D`)
- **Constants**: camelCase or lowercase with hyphens for config objects

### Type Annotations

- Use explicit type annotations for function parameters and return types
- Use type inference for local variables when obvious
- Example:
  ```typescript
  function vec(x: number, y: number, z: number): Vector3D {
    return { x, y, z }
  }
  ```

### Functional Style

This codebase favors a functional style with curried higher-order functions:

```typescript
function map(f: (_: number) => number) {
  return function(v: Vector3D) {
    return { x: f(v.x), y: f(v.y), z: f(v.z) }
  }
}

const neg = map(a => -a)
const floor = map(Math.floor)
```

### Error Handling

- No explicit error handling patterns in current code
- Use TypeScript's strict null checking to avoid runtime errors
- Always cast canvas contexts explicitly: `canvas.getContext("2d") as CanvasRenderingContext2D`

### Imports

- No module imports - this is a single-file project
- All assets loaded directly via `new Image()` and relative paths

### Best Practices

1. Use `const` for all variables unless reassignment is needed
2. Use `function` declarations for top-level functions (not arrow functions at module scope)
3. Avoid `var` - use `let` only when mutation is necessary (see line 100: `var prev`)
4. Use `for...of` over `for...in` when iterating over values
5. Prefer explicit type casts over `any`

## Project Structure

```
goose-game/
├── src/
│   ├── app.ts           # Main game logic
│   └── assets/          # PNG sprites
├── dist/                # Compiled output (served)
│   ├── app.js
│   ├── index.html
│   ├── style.css
│   └── assets/
├── tsconfig.json        # TypeScript configuration
├── Makefile             # Build commands
├── flake.nix            # Nix dev shell
└── .envrc               # direnv configuration
```

## Key Files

- `src/app.ts`: Main game loop, rendering, and input handling
- `tsconfig.json`: Strict TypeScript compiler options
- `Makefile`: Simple build targets

## Game Loop Patterns

The game uses `requestAnimationFrame` for the render loop:

```typescript
var prev: DOMHighResTimeStamp

function init(time: DOMHighResTimeStamp) {
  prev = time
  requestAnimationFrame(draw)
}

function draw(time: DOMHighResTimeStamp) {
  const dt = (time - prev) / 1000
  // ... game logic ...
  prev = time
  requestAnimationFrame(draw)
}

requestAnimationFrame(init)
```

### Canvas Setup

- Use `OffscreenCanvas` for double-buffering if needed
- Always set `imageSmoothingEnabled = false` for pixel-art rendering
- Cast canvas contexts explicitly: `canvas.getContext("2d") as CanvasRenderingContext2D`

### Input Handling

- Use `Set` to track active inputs for smooth multi-key support
- Handle both keyboard and touch events for mobile compatibility

## Editor Setup

For best results with this project:

- Enable "Format on Save" with 2-space indentation
- Enable TypeScript language server
- Use a linter like ESLint with the TypeScript parser if desired
