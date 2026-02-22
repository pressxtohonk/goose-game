## ADDED Requirements

### Requirement: Goose moves with WASD keys
The game SHALL allow the player to move the goose using W, A, S, D keys.

#### Scenario: Press W to move up-left
- **WHEN** player presses W key
- **THEN** goose moves in the up-left isometric direction

#### Scenario: Press A to move down-left
- **WHEN** player presses A key
- **THEN** goose moves in the down-left isometric direction

#### Scenario: Press S to move down-right
- **WHEN** player presses S key
- **THEN** goose moves in the down-right isometric direction

#### Scenario: Press D to move up-right
- **WHEN** player presses D key
- **THEN** goose moves in the up-right isometric direction

### Requirement: Goose moves with arrow keys
The game SHALL allow the player to move the goose using arrow keys.

#### Scenario: Press Up to move up-left
- **WHEN** player presses Up arrow key
- **THEN** goose moves in the up-left isometric direction

#### Scenario: Press Left to move down-left
- **WHEN** player presses Left arrow key
- **THEN** goose moves in the down-left isometric direction

#### Scenario: Press Down to move down-right
- **WHEN** player presses Down arrow key
- **THEN** goose moves in the down-right isometric direction

#### Scenario: Press Right to move up-right
- **WHEN** player presses Right arrow key
- **THEN** goose moves in the up-right isometric direction

### Requirement: Goose respects world boundaries
The goose SHALL NOT move outside the visible game area.

#### Scenario: Goose stops at left boundary
- **WHEN** goose reaches the left edge of the world while moving
- **THEN** goose stops and cannot move further in that direction

#### Scenario: Goose stops at right boundary
- **WHEN** goose reaches the right edge of the world while moving
- **THEN** goose stops and cannot move further in that direction

#### Scenario: Goose stops at top boundary
- **WHEN** goose reaches the top edge of the world while moving
- **THEN** goose stops and cannot move further in that direction

#### Scenario: Goose stops at bottom boundary
- **WHEN** goose reaches the bottom edge of the world while moving
- **THEN** goose stops and cannot move further in that direction
