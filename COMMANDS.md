# Cocos AI Game Studio Commands

Use this file as the command registry for repeatable AI Game Studio execution.

## Command law

- Commands must produce a named artifact.
- Commands must name the current stage and responsible role.
- Commands must state what is in scope and out of scope.
- Commands must end with either a next command or a gate decision.

## Pre-production commands

### `cocos-brainstorm-game`

Use when exploring a new game idea.

Output:

- candidate fantasy
- dominant player action
- possible game types
- MVP risk
- next recommended command

### `cocos-game-brief`

Use when the idea is ready to become a controlled brief.

Output:

- game name
- target player
- core fantasy
- dominant loop
- first-version promise
- explicit non-goals
- current assumptions
- next proof obligation

### `cocos-classify-game`

Use before selecting architecture or level data models.

Output:

- dominant player action
- main content unit
- progression shape
- selected game type template
- hybrid risks
- data model recommendation

## Design commands

### `cocos-gdd`

Use when producing a Game Design Document.

Output:

- core loop
- player goal
- fail state
- reward loop
- progression
- level/content structure
- UI needs
- config tables needed
- MVP proof
- non-goals

### `cocos-level-design`

Use when designing level-heavy or content-heavy games.

Output:

- level type
- objective model
- wave/spawn model
- map-point needs
- reward model
- validation rules

## Technical commands

### `cocos-project-context`

Use when creating or refreshing project memory.

Output:

- confirmed facts
- locked decisions
- active assumptions
- open questions
- accepted risks
- current milestone truth

### `cocos-game-architecture`

Use before implementation.

Output:

- scene structure
- scripts structure
- data/config boundary
- runtime systems
- resource loading plan
- performance risks
- forbidden shortcuts

### `cocos-config-schema`

Use when creating or changing level/config data.

Output:

- table ownership
- required fields
- reference rules
- validation rules
- runtime export format

## Production commands

### `cocos-sprint-planning`

Use when breaking work into a milestone or sprint.

Output:

- sprint goal
- story list
- owner per story
- dependencies
- acceptance per story
- risk list

### `cocos-create-story`

Use when making one dev-ready implementation story.

Output:

- story name
- player-facing purpose
- files touched
- systems touched
- required data
- implementation steps
- acceptance criteria
- QA notes

### `cocos-dev-story`

Use when implementing a dev-ready story.

Output:

- implementation summary
- changed files
- assumptions used
- tests or validation performed
- unresolved blockers
- handoff message to QA

### `cocos-code-review`

Use when reviewing implemented work.

Output:

- blocker issues
- major issues
- minor issues
- architecture fit
- Cocos fit
- config fit
- acceptance decision

## Testing commands

### `cocos-playtest-plan`

Use when a playable loop exists.

Output:

- target player behavior
- test build scope
- test scenarios
- observation checklist
- failure signals
- decision criteria

### `cocos-performance-test`

Use when runtime performance risk matters.

Output:

- target platform
- expected FPS
- draw-call risks
- memory risks
- loading risks
- profiling plan

## Quick commands

### `cocos-quick-prototype`

Use when validating one mechanic quickly.

Output:

- prototype goal
- minimum systems
- placeholder asset rules
- success criteria
- kill criteria

### `cocos-quick-dev`

Use when implementing a small, well-defined feature.

Output:

- target feature
- current owner
- required data
- implementation steps
- acceptance check

### `cocos-document-project`

Use when analyzing an existing Cocos project.

Output:

- current structure
- architecture risks
- ownership gaps
- missing validation
- repair plan
