## Context

The goose-game project has a single TypeScript file (`src/game.ts`) with all game logic tightly coupled to the DOM (canvas, event listeners, images). This makes testing difficult. The last change introduced 4 specs (goose-movement, goose-animation, grass-field-world, isometric-rendering) with no tests.

## Goals / Non-Goals

**Goals:**
- Extract pure functions from `game.ts` to enable unit testing
- Add unit tests covering all requirements from the 4 MVP specs
- Create AGENTS.md to enforce TDD workflow for future development

**Non-Goals:**
- E2E/browser testing (unit tests only)
- Changing existing game behavior
- 100% code coverage (focus on spec requirements)

## Decisions

### Test Framework: Vitest
- **Rationale**: Fast, TypeScript-native, works with Vite (likely bundler for canvas game), drop-in Jest compatibility
- **Alternatives**: Jest (slower, more config), Mocha (more setup)

### Code Structure: Extract pure functions
- **Approach**: Move logic into separate exportable functions that take all dependencies as parameters
- **Rationale**: Current code has implicit dependencies on canvas, images, global state. Pure functions are testable without mocking.
- **Functions to extract**:
  - `isoToScreen(x, y, canvasWidth, canvasHeight)` - isometric coordinate conversion
  - `clampToBounds(x, y, bounds)` - boundary enforcement
  - `calculateMovement(keys, currentPos, speed, bounds)` - movement logic
  - `updateAnimation(state, deltaTime)` - animation frame logic

### AGENTS.md Location: Project root
- **Rationale**: Standard location for AI agent instructions, discovered automatically

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Refactoring breaks existing behavior | Tests will catch regressions; keep changes minimal |
| DOM-dependent code remains untested | Focus on logic extraction; accept some integration risk |
| AGENTS.md ignored by agents | Make instructions explicit and checkable (run tests before commit) |
