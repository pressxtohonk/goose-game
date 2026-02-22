## Why

Create a playable MVP of a browser-based isometric platform game featuring a goose character. Establish the core rendering, movement, and animation systems before adding gameplay complexity.

## What Changes

- New web-based isometric game with Canvas 2D rendering using TypeScript
- Goose character with 4-directional isometric movement (WASD + arrow keys)
- Walk animation with single sprite (mirrored for opposite direction)
- Waddle bob effect while walking for realistic goose feel
- Flat grass tile field as initial world
- Z-index system for future slope tile support (visual only in MVP)
- Boundary collision to keep goose on screen

## Capabilities

### New Capabilities

- `goose-movement`: Goose character controlled by keyboard input, moving along 4 isometric directions
- `isometric-rendering`: 2D Canvas renderer with isometric projection, tile-based world, and sprite-based character
- `goose-animation`: Frame-based sprite animation with walk cycle and waddle bob effect
- `grass-field-world`: Flat tile-based grass world with boundary collision

### Modified Capabilities

(None - this is a new project)

## Impact

- New game codebase (TypeScript + HTML5 Canvas)
- Single HTML entry point with compiled TypeScript
- Hand-drawn sprite assets for goose walk cycle
- Tile sprite assets for grass field
