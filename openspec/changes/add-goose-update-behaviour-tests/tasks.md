## 1. Extract Pure Function

- [ ] 1.1 Define `GooseState` interface in gameLogic.ts with x, y, direction, moving, frame, animTimer, bobOffset
- [ ] 1.2 Implement `updateGooseState(state, keys, bounds)` function that combines movement, animation, and bob logic
- [ ] 1.3 Export new function and interface from gameLogic.ts

## 2. Add Behavioural Tests

- [ ] 2.1 Add test section "Goose State Update Behaviour Tests" to gameLogic.test.ts
- [ ] 2.2 Test idle state: no keys pressed returns unchanged position, frame 0, moving false
- [ ] 2.3 Test single key movement: position updates, direction changes, moving is true
- [ ] 2.4 Test diagonal movement: speed is normalized
- [ ] 2.5 Test boundary clamping: position is clamped at world edges
- [ ] 2.6 Test animation state: frame advances after ANIM_SPEED updates
- [ ] 2.7 Test bob offset: increments by BOB_SPEED when moving

## 3. Refactor game.ts

- [ ] 3.1 Import updateGooseState from gameLogic.js
- [ ] 3.2 Replace inline update logic in update() with call to updateGooseState
- [ ] 3.3 Run tests to verify no regression
