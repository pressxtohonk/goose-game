## 1. Project Setup

- [x] 1.1 Initialize npm project and install TypeScript
- [x] 1.2 Create tsconfig.json with browser target
- [x] 1.3 Create HTML entry point (index.html) with canvas element
- [x] 1.4 Create main TypeScript file (src/game.ts)
- [x] 1.5 Set up build pipeline (tsc + live reload)
- [x] 1.6 Set up canvas context and game loop

## 2. Isometric Rendering System

- [x] 2.1 Implement isometric tile-to-screen coordinate conversion
- [x] 2.2 Implement screen-to-isometric coordinate conversion
- [x] 2.3 Create grass tile renderer
- [x] 2.4 Implement tile draw ordering (back-to-front)

## 3. Grass Field World

- [x] 3.1 Define grass tile map/array
- [x] 3.2 Render grass field filling the screen
- [x] 3.3 Set world boundaries for collision

## 4. Goose Character

- [x] 4.1 Create goose sprite loading system
- [x] 4.2 Define goose state (position, direction, moving)
- [x] 4.3 Implement sprite rendering with horizontal flip
- [x] 4.4 Position goose at center of screen on start

## 5. Movement System

- [x] 5.1 Set up keyboard input handling (WASD + arrows)
- [x] 5.2 Map WASD to isometric directions
- [x] 5.3 Map arrow keys to isometric directions
- [x] 5.4 Implement pixel-based movement
- [x] 5.5 Implement boundary collision (stop at edges)

## 6. Animation System

- [x] 6.1 Implement frame-based sprite animation
- [x] 6.2 Add waddle bob effect (Y oscillation while moving)
- [x] 6.3 Play animation only when moving
- [x] 6.4 Stop animation when idle

## 7. Depth Sorting

- [x] 7.1 Implement depth calculation for goose position
- [x] 7.2 Render goose at correct depth relative to tiles

## 8. Testing & Polish

- [x] 8.1 Test all movement directions
- [x] 8.2 Test boundary collision
- [x] 8.3 Verify animation plays correctly
- [x] 8.4 Test sprite flipping for left direction
