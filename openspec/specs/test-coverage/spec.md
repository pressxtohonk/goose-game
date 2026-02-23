## ADDED Requirements

### Requirement: Tests verify isometric rendering
The test suite SHALL verify that isometric coordinate conversion works correctly.

#### Scenario: Convert world origin to screen center
- **WHEN** isoToScreen is called with (0, 0) and canvas dimensions (800, 600)
- **THEN** result is (400, 300) - the screen center

#### Scenario: Convert positive coordinates correctly
- **WHEN** isoToScreen is called with (1, 0) and canvas dimensions (800, 600)
- **THEN** result x is greater than center (moves right-up on screen)

#### Scenario: Convert negative coordinates correctly
- **WHEN** isoToScreen is called with (0, 1) and canvas dimensions (800, 600)
- **THEN** result x is less than center (moves left-up on screen)

### Requirement: Tests verify boundary enforcement
The test suite SHALL verify that the goose cannot move outside world bounds.

#### Scenario: Clamp to minimum X boundary
- **WHEN** clampToBounds is called with x = -15 and bounds minX = -10
- **THEN** result x is -10

#### Scenario: Clamp to maximum X boundary
- **WHEN** clampToBounds is called with x = 15 and bounds maxX = 10
- **THEN** result x is 10

#### Scenario: Clamp to minimum Y boundary
- **WHEN** clampToBounds is called with y = -15 and bounds minY = -10
- **THEN** result y is -10

#### Scenario: Clamp to maximum Y boundary
- **WHEN** clampToBounds is called with y = 15 and bounds maxY = 10
- **THEN** result y is 10

### Requirement: Tests verify movement calculation
The test suite SHALL verify that movement responds correctly to input keys.

#### Scenario: Move in W direction
- **WHEN** calculateMovement is called with key 'w' pressed
- **THEN** result dy decreases (moves toward minY)

#### Scenario: Move in D direction
- **WHEN** calculateMovement is called with key 'd' pressed
- **THEN** result dx increases (moves toward maxX)

#### Scenario: Diagonal movement normalized
- **WHEN** calculateMovement is called with both 'w' and 'd' pressed
- **THEN** movement vector is normalized (diagonal speed equals cardinal speed)

### Requirement: Tests verify animation state
The test suite SHALL verify that animation frames update correctly.

#### Scenario: Animation advances while moving
- **WHEN** updateAnimation is called with moving = true and sufficient delta time
- **THEN** frame number increments

#### Scenario: Animation resets when stopped
- **WHEN** updateAnimation is called with moving = false
- **THEN** frame number is 0

#### Scenario: Animation wraps at frame count
- **WHEN** updateAnimation advances past the last frame
- **THEN** frame number wraps to 0
