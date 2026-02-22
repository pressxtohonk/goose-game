## Context

This is a greenfield project for a browser-based isometric pixel art game. The MVP focuses on core rendering and movement systems using TypeScript and HTML5 Canvas.

## Goals / Non-Goals

**Goals:**
- Implement isometric 2D rendering using Canvas 2D
- Create 4-directional isometric movement (WASD + arrows)
- Display goose character with walk animation and waddle bob
- Render flat grass tile field with boundary collision

**Non-Goals:**
- Gameplay mechanics, scoring, or objectives
- Multiple levels or world saving
- Sound or music
- Advanced physics or collision with objects

## Decisions

### Language: TypeScript over JavaScript
**Decision:** Use TypeScript with compile-time type checking

**Rationale:** Strong preference for compile-time safety. TypeScript provides better DX with IntelliSense, refactoring support, and catches type errors before runtime.

### Pure Canvas 2D vs Game Library
**Decision:** Use vanilla HTML5 Canvas 2D API

**Rationale:** The locked camera and simple requirements don't warrant a library. Vanilla Canvas provides full control with minimal overhead.

### Sprite-Based Animation
**Decision:** Use frame-based sprite animation for the goose walk cycle

**Rationale:** Hand-drawn sprites are ready. Single walk sprite will be mirrored horizontally for opposite direction. Animation frames cycle while goose is moving.

### Isometric Grid System
**Decision:** Use tile-based world with pixel coordinates for goose

**Rationale:** Tile-based world enables easy art pipeline (sprites per tile). Goose having pixel coordinates allows smooth movement within tiles.

### Draw Order
**Decision:** Render tiles and character using isometric depth sorting

**Rationale:** Proper draw order is essential for isometric games. Objects closer to the viewer (bottom-right in screen space) must render after objects further away.

## Risks / Trade-offs

- **Single sprite reuse:** Using one walk sprite for all directions may feel limiting, but keeps MVP scope tight
- **No idle animation:** Goose will freeze when not moving - acceptable for MVP
- **Fixed camera:** World fits on screen - no camera scrolling complexity
