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

## Skill validation commands

### `cocos-skill-self-test`

Use when testing, debugging, auditing, or close-loop validating this skill itself.

Output:

- selected test cases
- prompt used per test case
- expected decision
- actual decision
- expected allowed command
- actual allowed command
- expected forbidden actions
- actual forbidden actions
- proof returned
- PASS / FAIL / NEEDS_REPAIR result per case
- drift found
- repair required

Rules:

- This command is not game development.
- Do not modify the Cocos project unless the selected test case explicitly requires local runtime proof.
- Do not continue to implementation after a failed test case.
- Do not call the skill validated until all required test cases pass or failed cases have repair issues.

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

### `cocos-one-shot-mvp`

Use when the user wants one continuous response or Codex run to move from a broad game idea into a controlled MVP plan and first dev-ready story.

This command must load [ONE_SHOT_GAME_BUILD.md](ONE_SHOT_GAME_BUILD.md) before execution.

Output:

- current production stage
- responsible role
- selected dominant game type
- MVP scope
- explicit non-goals
- command chain executed
- artifacts produced
- readiness decision
- first dev-ready story if allowed
- proof returned or blocker reason
- allowed next command
- forbidden next actions

Rules:

- One-shot means one controlled chain, not one complete commercial game.
- Do not skip `cocos-classify-game`, MVP scope, architecture, readiness, or proof gates.
- Do not implement multiple game types in one sprint.
- Do not start local Cocos Creator work unless the required execution provider or manual proof path is available.
- If local engine proof is required but unavailable, return `RUNTIME_NOT_READY` or `BLOCKED` instead of claiming completion.
- The command may create only the first dev-ready story after readiness is checked; it does not authorize unlimited implementation.

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

### `cocos-numerical-design`

Use before writing or changing gameplay values such as enemy hp, attack, movement speed, wave timing, spawn count, reward amount, unit cost, upgrade value, cooldown, difficulty, or balance-sensitive config.

Output:

- selected game type
- loop being tested
- target session length
- target player skill
- intended player feeling
- player baseline
- enemy or obstacle families
- difficulty beats
- resource or cost model if needed
- reward purpose
- prototype placeholder values
- legal ranges
- validation rules
- Numerical Design Gate decision

### `cocos-economy-design`

Use before writing or changing currencies, sources, sinks, rewards, upgrade costs, stamina/energy, shops, ads, gacha, inventory value, or monetization-sensitive systems.

Output:

- selected game type
- current stage
- core loop
- return reason
- main reward moment
- main spend moment
- economy scope
- currencies
- sources
- sinks
- reward cadence
- upgrade or cost curve
- monetization scope
- prototype placeholder values
- validation rules
- Economy Design Gate decision

### `cocos-animation-design`

Use before writing or changing actor animation states, UI motion, tweens, combat feedback, hit reactions, death flows, skill VFX, Spine, AnimationClip, particles, or audio-visual timing.

Output:

- selected game type
- current stage
- actor or UI element
- gameplay state represented
- player-facing purpose
- trigger event
- exit condition
- animation, VFX, UI motion, or audio type
- implementation method: AnimationClip, Tween, Spine, Particle, SFX, or placeholder
- gameplay timing dependency
- input lock rule
- fallback behavior
- asset naming
- performance risk
- placeholder status
- validation rules
- Animation Presentation Gate decision

### `cocos-production-readiness`

Use before Codex starts real game implementation, opens a large development sprint, creates many Cocos scripts, builds large scene/prefab structures, or attempts to make a playable game in one pass.

Output:

- readiness decision: READY_FOR_IMPLEMENTATION / DESIGN_NOT_READY / RUNTIME_NOT_READY / SCOPE_TOO_LARGE / BLOCKED
- game identity
- MVP scope
- numerical readiness
- economy readiness
- animation and presentation readiness
- Cocos architecture readiness
- Cocos runtime readiness
- asset readiness
- first implementation story
- required proof
- blockers
- allowed next command
- forbidden next actions

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
- numerical validation rules if values affect balance
- economy validation rules if sources, sinks, currencies, or reward cadence are used
- presentation validation rules if animation, VFX, or UI motion assets are config-driven

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
- production readiness dependency if the sprint starts real game implementation

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
- numerical design dependency, if balance-sensitive values are touched
- economy design dependency, if currencies, rewards, sinks, upgrades, ads, shops, or gacha are touched
- animation presentation dependency, if animation states, UI motion, hit feedback, VFX, Spine, Tween, or AnimationClip are touched
- production readiness status when the story starts real playable development

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
- numerical design fit when values affect balance
- economy design fit when sources, sinks, currencies, rewards, or monetization are involved
- animation presentation fit when motion, feedback, or visual state are involved
- production readiness fit when implementation started from a readiness decision
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
- numeric signals to observe if balance is being tested
- economy signals to observe if reward or progression is being tested
- presentation signals to observe if readability or feedback is being tested

### `cocos-performance-test`

Use when runtime performance risk matters.

Output:

- target platform
- expected FPS
- draw-call risks
- memory risks
- loading risks
- profiling plan
- animation, VFX, and UI motion risks when presentation effects are dense or repeated

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
- numerical placeholder policy if stats, costs, or rewards are used
- economy scope policy if rewards, spending, upgrades, or currencies are used
- animation placeholder policy if feedback, UI motion, or actor states are used
- production readiness shortcut decision if the prototype is allowed to skip full readiness
- automation/manual proof needed for the prototype

### `cocos-quick-dev`

Use when implementing a small, well-defined feature.

Output:

- target feature
- current owner
- required data
- implementation steps
- acceptance check
- numerical design check if values are touched
- economy design check if reward, currency, source, sink, shop, ad, or gacha logic is touched
- animation presentation check if actor state, UI motion, hit feedback, VFX, Tween, Spine, or AnimationClip is touched
- production readiness check if this small feature starts real game implementation
- automation provider proof if local Cocos execution is required

### `cocos-document-project`

Use when analyzing an existing Cocos project.
