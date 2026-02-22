## Why

The last change (goose-game-mvp) introduced 4 specs with requirements but no tests exist to verify them. Without tests, future changes risk breaking existing behavior and there's no guidance for agents to follow TDD practices.

## What Changes

- Add unit tests covering all requirements from the MVP specs (goose-movement, goose-animation, grass-field-world, isometric-rendering)
- Create AGENTS.md to guide future AI agents to follow TDD workflow
- Refactor game code to be testable (extract pure functions from DOM-dependent code)

## Capabilities

### New Capabilities

- `test-coverage`: Unit tests verifying all spec requirements from goose-game-mvp
- `tdd-guidance`: AGENTS.md documenting TDD workflow for future agents

### Modified Capabilities

(none - existing spec requirements unchanged, only adding test verification)

## Impact

- `src/game.ts` - extract testable pure functions (isoToScreen, boundary checking, movement logic)
- New test files in `src/` or `tests/` directory
- New `AGENTS.md` at project root
- Build configuration may need test framework setup (vitest or similar)
