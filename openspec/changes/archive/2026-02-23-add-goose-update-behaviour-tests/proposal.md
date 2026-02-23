## Why

The current tests verify individual pure functions in isolation, but the update step in `game.ts` combines multiple functions together. We lack behavioural tests that describe the complete state transition: given a goose state and key inputs, what should the new goose state be? This gap makes it harder to reason about the game's behaviour and catch integration issues.

## What Changes

- Add behavioural tests for the complete goose state update step
- Test scenarios: idle state, single-key movement, multi-key movement, boundary interactions, animation state transitions
- Extract update logic into a testable pure function if needed

## Capabilities

### New Capabilities

- `goose-update-behaviour`: Specifies expected behaviour of the goose state update given current state and input keys

### Modified Capabilities

(None - this adds test coverage, not spec-level behaviour changes)

## Impact

- New test file: `src/gooseUpdateBehaviour.test.ts`
- Possible new helper function in `src/gameLogic.ts` to make update logic testable
- No changes to game behaviour or visual output
