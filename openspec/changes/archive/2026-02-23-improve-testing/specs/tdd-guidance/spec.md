## ADDED Requirements

### Requirement: AGENTS.md exists at project root
The project SHALL have an AGENTS.md file at the root directory.

#### Scenario: AGENTS.md file present
- **WHEN** an agent explores the project
- **THEN** AGENTS.md is found at the project root

### Requirement: AGENTS.md specifies TDD workflow
The AGENTS.md SHALL instruct agents to follow test-driven development.

#### Scenario: Write tests before implementation
- **WHEN** an agent implements a new feature
- **THEN** the agent writes failing tests first, then implements to make them pass

#### Scenario: Run tests after changes
- **WHEN** an agent completes a task
- **THEN** the agent runs the test suite to verify no regressions

### Requirement: AGENTS.md references existing specs
The AGENTS.md SHALL guide agents to read and respect existing specifications.

#### Scenario: Check existing specs before changes
- **WHEN** an agent starts a new task
- **THEN** the agent checks openspec/specs/ for relevant requirements

#### Scenario: Maintain spec coverage
- **WHEN** an agent implements a spec requirement
- **THEN** the agent ensures a test exists for that requirement

### Requirement: AGENTS.md specifies test commands
The AGENTS.md SHALL document how to run tests.

#### Scenario: Test command documented
- **WHEN** an agent needs to run tests
- **THEN** AGENTS.md specifies the exact command (e.g., `npm test` or `npx vitest`)
