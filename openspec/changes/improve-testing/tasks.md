## 1. Test Infrastructure Setup

- [ ] 1.1 Install vitest and typescript dependencies
- [ ] 1.2 Create vitest.config.ts with TypeScript support
- [ ] 1.3 Add test script to package.json

## 2. Extract Testable Functions

- [ ] 2.1 Extract isoToScreen as pure function with canvas dimensions as parameters
- [ ] 2.2 Extract clampToBounds function for boundary enforcement
- [ ] 2.3 Extract calculateMovement function for input-based movement
- [ ] 2.4 Extract updateAnimation function for animation state management
- [ ] 2.5 Update game.ts to use extracted functions

## 3. Write Tests for Isometric Rendering

- [ ] 3.1 Test isoToScreen returns screen center for world origin (0,0)
- [ ] 3.2 Test isoToScreen converts positive x coordinate correctly
- [ ] 3.3 Test isoToScreen converts positive y coordinate correctly
- [ ] 3.4 Test isoToScreen converts negative coordinates correctly

## 4. Write Tests for Boundary Enforcement

- [ ] 4.1 Test clampToBounds respects minimum X boundary
- [ ] 4.2 Test clampToBounds respects maximum X boundary
- [ ] 4.3 Test clampToBounds respects minimum Y boundary
- [ ] 4.4 Test clampToBounds respects maximum Y boundary

## 5. Write Tests for Movement

- [ ] 5.1 Test calculateMovement responds to W key (dy decreases)
- [ ] 5.2 Test calculateMovement responds to D key (dx increases)
- [ ] 5.3 Test diagonal movement is normalized
- [ ] 5.4 Test movement respects boundaries

## 6. Write Tests for Animation

- [ ] 6.1 Test animation advances frame while moving
- [ ] 6.2 Test animation resets to frame 0 when stopped
- [ ] 6.3 Test animation wraps at max frame count

## 7. Create AGENTS.md

- [ ] 7.1 Create AGENTS.md at project root
- [ ] 7.2 Document TDD workflow (write tests first)
- [ ] 7.3 Reference openspec/specs/ for spec-driven development
- [ ] 7.4 Document test command (npm test)

## 8. Verification

- [ ] 8.1 Run all tests and verify they pass
- [ ] 8.2 Verify game still runs correctly in browser
