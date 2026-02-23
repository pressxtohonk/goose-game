## ADDED Requirements

### Requirement: Goose state transitions correctly given input keys

The system SHALL update the goose state based on current state and key inputs in a deterministic, testable manner.

#### Scenario: Idle state with no keys pressed
- **WHEN** goose is at position (0, 0) with direction "right" and no keys are pressed
- **THEN** goose position remains unchanged, direction remains "right", moving flag is false, and animation frame is 0

#### Scenario: Single key movement updates position
- **WHEN** goose is at position (0, 0) and "d" key is pressed
- **THEN** goose x position increases by SPEED, y remains 0, direction is "right", and moving flag is true

#### Scenario: Diagonal movement is normalized
- **WHEN** goose is at position (0, 0) and both "w" and "d" keys are pressed
- **THEN** goose moves at SPEED in the normalized diagonal direction

#### Scenario: Movement respects world boundaries
- **WHEN** goose is at position (-10, 0) at minimum X boundary and "a" key is pressed
- **THEN** goose position remains clamped at (-10, 0)

#### Scenario: Animation state advances while moving
- **WHEN** goose is moving with frame 0 and animation timer 0
- **THEN** after ANIM_SPEED updates, frame advances to 1

#### Scenario: Direction updates based on movement keys
- **WHEN** goose is facing "right" and "a" key (left) is pressed
- **THEN** goose direction changes to "left"

#### Scenario: Bob offset increments while moving
- **WHEN** goose is moving
- **THEN** bobOffset increases by BOB_SPEED each update
