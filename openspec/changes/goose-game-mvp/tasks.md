## 1. Project Setup

- [ ] 1.1 Initialize npm project and install TypeScript
- [ ] 1.2 Create tsconfig.json with browser target
- [ ] 1.3 Create HTML entry point (index.html) with canvas element
- [ ] 1.4 Create main TypeScript file (src/game.ts)
- [ ] 1.5 Set up build pipeline (tsc + live reload)
- [ ] 1.6 Set up canvas context and game loop

## 2. Isometric Rendering System

- [ ] 2.1 Implement isometric tile-to-screen coordinate conversion
- [ ] 2.2 Implement screen-to-isometric coordinate conversion
- [ ] 2.3 Create grass tile renderer
- [ ] 2.4 Implement tile draw ordering (back-to-front)

## 3. Grass Field World

- [ ] 3.1 Define grass tile map/array
- [ ] 3.2 Render grass field filling the screen
- [ ] 3.3 Set world boundaries for collision

## 4. Goose Character

- [ ] 4.1 Create goose sprite loading system
- [ ] 4.2 Define goose state (position, direction, moving)
- [ ] 4.3 Implement sprite rendering with horizontal flip
- [ ] 4.4 Position goose at center of screen on start

## 5. Movement System

- [ ] 5.1 Set up keyboard input handling (WASD + arrows)
- [ ] 5.2 Map WASD to isometric directions
- [ ] 5.3 Map arrow keys to isometric directions
- [ ] 5.4 Implement pixel-based movement
- [ ] 5.5 Implement boundary collision (stop at edges)

## 6. Animation System

- [ ] 6.1 Implement frame-based sprite animation
- [ ] 6.2 Add waddle bob effect (Y oscillation while moving)
- [ ] 6.3 Play animation only when moving
- [ ] 6.4 Stop animation when idle

## 7. Depth Sorting

- [ ] 7.1 Implement depth calculation for goose position
- [ ] 7.2 Render goose at correct depth relative to tiles

## 8. Testing & Polish

- [ ] 8.1 Test all movement directions
- [ ] 8.2 Test boundary collision
- [ ] 8.3 Verify animation plays correctly
- [ ] 8.4 Test sprite flipping for left direction
