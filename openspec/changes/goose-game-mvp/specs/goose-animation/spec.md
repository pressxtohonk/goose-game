## ADDED Requirements

### Requirement: Goose plays walk animation while moving
The goose SHALL display a walking animation frames while moving.

#### Scenario: Walk animation plays during movement
- **WHEN** goose is moving
- **THEN** walk animation frames cycle continuously

### Requirement: Goose sprite mirrors for opposite direction
The game SHALL flip the walk sprite horizontally when the goose moves left.

#### Scenario: Sprite flips for left movement
- **WHEN** goose moves in down-left or up-left direction
- **THEN** sprite is rendered horizontally flipped

#### Scenario: Sprite normal for right movement
- **WHEN** goose moves in down-right or up-right direction
- **THEN** sprite is rendered normally (not flipped)

### Requirement: Goose has waddle bob effect
The goose SHALL bob up and down slightly while walking to simulate waddling.

#### Scenario: Waddle bob while walking
- **WHEN** goose is moving
- **THEN** goose Y position oscillates slightly creating a waddle effect

### Requirement: Goose stands still when not moving
The goose SHALL remain stationary when no input is given.

#### Scenario: Goose idle when no input
- **WHEN** no movement keys are pressed
- **THEN** goose does not move and animation stops
