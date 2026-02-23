## 1. Test Infrastructure Setup

- [x] 1.1 Install vitest and typescript dependencies (using tsx from nix)
- [x] 1.2 Create vitest.config.ts with TypeScript support (not needed with tsx)
- [x] 1.3 Add test script to package.json (using Justfile instead)

## 2. Extract Testable Functions

- [x] 2.1 Extract isoToScreen as pure function with canvas dimensions as parameters
- [x] 2.2 Extract clampToBounds function for boundary enforcement
- [x] 2.3 Extract calculateMovement function for input-based movement
- [x] 2.4 Extract updateAnimation function for animation state management
- [x] 2.5 Update game.ts to use extracted functions

## 3. Write Tests for Isometric Rendering

- [x] 3.1 Test isoToScreen returns screen center for world origin (0,0)
- [x] 3.2 Test isoToScreen converts positive x coordinate correctly
- [x] 3.3 Test isoToScreen converts positive y coordinate correctly
- [x] 3.4 Test isoToScreen converts negative coordinates correctly

## 4. Write Tests for Boundary Enforcement

- [x] 4.1 Test clampToBounds respects minimum X boundary
- [x] 4.2 Test clampToBounds respects maximum X boundary
- [x] 4.3 Test clampToBounds respects minimum Y boundary
- [x] 4.4 Test clampToBounds respects maximum Y boundary

## 5. Write Tests for Movement

- [x] 5.1 Test calculateMovement responds to W key (dy decreases)
- [x] 5.2 Test calculateMovement responds to D key (dx increases)
- [x] 5.3 Test diagonal movement is normalized
- [x] 5.4 Test movement respects boundaries

## 6. Write Tests for Animation

- [x] 6.1 Test animation advances frame while moving
- [x] 6.2 Test animation resets to frame 0 when stopped
- [x] 6.3 Test animation wraps at max frame count

## 7. Create AGENTS.md

- [x] 7.1 Create AGENTS.md at project root (already exists)
- [x] 7.2 Document TDD workflow (write tests first) (already documented)
- [x] 7.3 Reference openspec/specs/ for spec-driven development (already referenced)
- [x] 7.4 Document test command (already documented - using `just test`)

## 8. Verification

- [x] 8.1 Run all tests and verify they pass
- [x] 8.2 Verify game still runs correctly in browser (build succeeds, manual verification needed)
