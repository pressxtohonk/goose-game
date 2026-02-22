## ADDED Requirements

### Requirement: Game renders in isometric view
The game SHALL render the world using isometric projection where tiles appear as diamonds.

#### Scenario: Isometric tile rendering
- **WHEN** game renders a ground tile
- **THEN** tile is drawn as a diamond shape at 45-degree angle

### Requirement: Tiles render in correct draw order
The game SHALL render tiles back-to-front to ensure proper overlap.

#### Scenario: Draw order from back to front
- **WHEN** multiple tiles are on screen
- **THEN** tiles are drawn from top-left to bottom-right (isometric back to front)

### Requirement: Goose renders at correct depth
The goose SHALL render at a depth based on its position to appear behind or in front of tiles correctly.

#### Scenario: Goose renders behind forward tiles
- **WHEN** goose is positioned behind a tile in the isometric order
- **THEN** goose is drawn before that tile

#### Scenario: Goose renders in front of backward tiles
- **WHEN** goose is positioned in front of a tile in the isometric order
- **THEN** goose is drawn after that tile
