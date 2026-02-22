## ADDED Requirements

### Requirement: Game displays a grass tile field
The game SHALL render a flat field of grass tiles.

#### Scenario: Grass tiles fill the screen
- **WHEN** game starts
- **THEN** the visible area is filled with grass tiles

### Requirement: Grass tiles use isometric projection
Grass tiles SHALL be rendered using isometric diamond shapes.

#### Scenario: Isometric grass tiles
- **WHEN** grass tiles are drawn
- **THEN** each tile appears as a diamond (isometric view)

### Requirement: Goose starts at center of field
The goose SHALL spawn at the center of the grass field on game start.

#### Scenario: Goose spawns at center
- **WHEN** game starts
- **THEN** goose appears at the center of the visible tile field
