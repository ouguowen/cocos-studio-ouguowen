# Cocos AI Game Studio Commands

Use this file as the command registry for repeatable AI Game Studio execution.

## Command law

- Commands must produce a named artifact.
- Commands must name the current stage and responsible role.
- Commands must state what is in scope and out of scope.
- Commands must end with either a next command or a gate decision.

## Automation provider law

Use these rules only when a task needs local Cocos Creator execution and the user has an available automation tool/MCP provider.

- Commands may use the current Cocos automation provider as an execution channel.
- Commands must stay provider-neutral: describe capabilities, not vendor-specific MCP command names.
- The current commercial provider may be used, and a future Cocos official provider may replace it without changing the command meaning.
- Required proof depends on task risk: scene hierarchy, component bindings, prefab references, Console logs, preview screenshot/result, generated files, or PASS/FAIL notes.
- If a provider fails or lacks a capability, stop with a blocker report or fall back to manual Cocos Creator steps.
- Do not expand scope from one selected game type into every game type during a single command.

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
- automation/manual execution boundary if local Cocos operations are needed

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
- automation provider needs, if any

### `cocos-dev-story`

Use when implementing a dev-ready story.

Output:

- implementation summary
- changed files
- assumptions used
- automation provider used or manual fallback used
- tests or validation performed
- proof returned: hierarchy, bindings, Console, preview, generated files, or screenshots as applicable
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
- automation/local execution evidence fit when applicable
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
- selected game type
- minimum systems
- placeholder asset rules
- success criteria
- kill criteria
- automation/manual proof needed for the prototype

### `cocos-quick-dev`

Use when implementing a small, well-defined feature.

Output:

- target feature
- current owner
- required data
- implementation steps
- acceptance check
- automation provider proof if local Cocos execution is required

### `cocos-document-project`

Use when analyzing an existing Cocos project.
