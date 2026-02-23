## Context

The game's update step in `game.ts` currently mixes DOM-independent logic with the mutable goose state object. The pure functions (`calculateMovement`, `updateAnimation`) are tested individually, but their composition into the full update behaviour is not. This change extracts the update logic into a testable pure function and adds behavioural tests.

## Goals / Non-Goals

**Goals:**
- Extract the update logic into a pure function `updateGooseState`
- Add behavioural tests covering: idle, movement, diagonal movement, boundary clamping, animation state, direction facing
- Tests should verify state transitions, not implementation details

**Non-Goals:**
- Changing game behaviour or visual output
- Adding new game features
- Refactoring the render loop or event handlers

## Decisions

**Extract `updateGooseState` function:**
Create a pure function that takes current state + keys and returns new state. This mirrors the pattern already used for `calculateMovement` and `updateAnimation`.
- Alternative: Test the existing functions in combination without extraction - rejected because the bob offset logic is currently inline and untested.

**Test file location:**
New file `src/gameLogic.test.ts` alongside existing tests, or extend the existing test file.
- Decision: Add new behavioural test section to existing `src/gameLogic.test.ts` since it's the same module.

**Test granularity:**
Focus on state transitions observable from outside, not individual variable changes.
- Alternative: Test each sub-function more exhaustively - rejected as redundant with existing tests.

## Risks / Trade-offs

- **Duplicate test coverage**: Some overlap with existing `calculateMovement` and `updateAnimation` tests. Mitigation: behavioural tests focus on integration/composition, not unit-level details.
- **Bob offset testing**: Bob offset is time-dependent. Mitigation: Test that it increments when moving, not exact values.
