# Cocos AI Game Studio Commands

Use this file as the command registry for repeatable AI Game Studio execution.

## Command law

- Commands must produce a named artifact.
- Commands must name the current stage and responsible role.
- Commands must state what is in scope and out of scope.
- Commands must end with either a next command or a gate decision.
- Commands that write files must apply [AI_COMMAND_PERMISSION_RULES.md](AI_COMMAND_PERMISSION_RULES.md), [COCOS_PATH_SCOPED_RULES.md](COCOS_PATH_SCOPED_RULES.md), and [CODEX_WRITE_APPROVAL_PROTOCOL.md](CODEX_WRITE_APPROVAL_PROTOCOL.md) before execution.
- Commands that claim completion must provide review proof from [GIT_DIFF_REVIEW_PROTOCOL.md](GIT_DIFF_REVIEW_PROTOCOL.md) or [RUNTIME_PROOF_PROTOCOL.md](RUNTIME_PROOF_PROTOCOL.md), depending on task type.

## Automation provider law

Use these rules only when a task needs local Cocos Creator execution and the user has an available automation tool/MCP provider.

- Commands may use the current Cocos automation provider as an execution channel.
- Commands must stay provider-neutral: describe capabilities, not vendor-specific MCP command names.
- The current commercial provider may be used, and a future Cocos official provider may replace it without changing the command meaning.
- Required proof depends on task risk: scene hierarchy, component bindings, prefab references, Console logs, preview screenshot/result, generated files, or PASS/FAIL notes.
- If a provider fails or lacks a capability, stop with a blocker report or fall back to manual Cocos Creator steps.
- Do not expand scope from one selected game type into every game type during a single command.

## Skill validation commands

### `cocos-fast-build`

Use for fast implementation of a small feature, bug fix, simple interaction, approved dev story, or approved scene/script change.

Mode:

- Use Fast Build Mode from [SKILL_OPERATION_MODES.md](SKILL_OPERATION_MODES.md).

Rules:

- Avoid unnecessary interruption.
- Validate internally while work remains inside the approved scope.
- Stop only on stop conditions.
- Report a concise result: done or blocked, changed files, preview result, validation result, commit hash if committed, and next step.
- This command does not authorize new scene, prefab, `.meta`, runtime code, external asset, or settings changes outside an approved scope.

### `cocos-safe-gate`

Use for stage transitions and safety confirmation, including production readiness, pre-write approval, preview visibility gate, QA review, release review, generated meta approval, and first MVP acceptance.

Mode:

- Use Safe Gate Mode from [SKILL_OPERATION_MODES.md](SKILL_OPERATION_MODES.md).

Rules:

- Run the relevant gate checklist.
- Return the gate decision and next command.
- Ask at most one confirmation per stage unless new risk appears.
- This command does not authorize writing scene, prefab, `.meta`, runtime code, or external assets by itself.

### `cocos-audit-mode`

Use for Skill self-test, repo audit, safety check, release governance, validation script review, security review, or command routing audit.

Mode:

- Use Audit Mode from [SKILL_OPERATION_MODES.md](SKILL_OPERATION_MODES.md).

Rules:

- State that the current task is in Audit Mode.
- A detailed checklist and long report are allowed.
- Do not use this as the default for normal game development.
- This command does not authorize writing scene, prefab, `.meta`, runtime code, or external assets by itself.

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
- Use [SKILL_SELF_TEST_MODES.md](SKILL_SELF_TEST_MODES.md), [SKILL_EXTENDED_SAFETY_TEST_CASES.md](SKILL_EXTENDED_SAFETY_TEST_CASES.md), and [COCOS_HOOK_VALIDATION_PLAN.md](COCOS_HOOK_VALIDATION_PLAN.md) when the request targets Skill safety integration.

### `cocos-skill-integration-audit`

Use when auditing whether new Skill rules are wired into the repository and whether scope stayed inside the approved documentation boundary.

Output:

- audit scope
- changed file list
- blocked-path confirmation
- required-doc presence result
- Agent registry count result
- integration findings
- PASS / FAIL / NEEDS_REPAIR

Rules:

- Use [COCOS_AUTOMATED_CHECKS.md](COCOS_AUTOMATED_CHECKS.md), [GIT_DIFF_REVIEW_PROTOCOL.md](GIT_DIFF_REVIEW_PROTOCOL.md), and [SKILL_CHANGE_REVIEW_PROTOCOL.md](SKILL_CHANGE_REVIEW_PROTOCOL.md).
- Block the audit if any changed file leaves the approved path scope.
- Do not claim runtime proof for documentation-only work; use [RUNTIME_PROOF_PROTOCOL.md](RUNTIME_PROOF_PROTOCOL.md).

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

### `cocos-character-system-design`

Use when defining character identity, behavior, action state, animation state, skeleton boundary, or asset binding boundary.

Output:

- character identity
- character behavior
- character action state
- animation state
- skeleton boundary
- asset binding boundary
- controller/domain source of truth
- forbidden ownership check
- UI-Character Linkage Gate decision

Rules:

- This is a design / policy command.
- It does not authorize writing scene, prefab, meta, runtime code, or Cocos game project files.
- It must follow [CHARACTER_SYSTEM.md](CHARACTER_SYSTEM.md), [CHARACTER_ANIMATION_MODEL.md](CHARACTER_ANIMATION_MODEL.md), [ASSET_SEMANTIC_MODEL.md](ASSET_SEMANTIC_MODEL.md), and [UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md](UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md) when UI or feedback is involved.
- Implementation still requires production readiness and pre-write approval.
- Do not add full Spine tooling, full skeleton binding, combat, economy, inventory, shop, gacha, save/load, or multi-character action systems unless the selected game type and production readiness approve the scope.

### `cocos-ui-character-linkage`

Use when mapping UI input to behavior request, behavior to action state, action to animation state, and animation to UI feedback.

Output:

- UI input
- behavior request
- character intent
- action state
- animation state
- visual output
- UI feedback
- controller/domain source of truth
- forbidden ownership check
- UI-Character Linkage Gate decision

Rules:

- This is a design / policy command.
- It does not authorize writing scene, prefab, meta, runtime code, or Cocos game project files.
- It must apply [UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md](UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md), [UI_SYSTEM_MODEL.md](UI_SYSTEM_MODEL.md), [CHARACTER_SYSTEM.md](CHARACTER_SYSTEM.md), [CHARACTER_ANIMATION_MODEL.md](CHARACTER_ANIMATION_MODEL.md), and [ASSET_SEMANTIC_MODEL.md](ASSET_SEMANTIC_MODEL.md).
- UI input is request-only; controller/domain logic owns final state.
- Animation and skeleton presentation must not own gameplay result.
- Asset imports must not create gameplay systems.
- Implementation still requires production readiness and pre-write approval.

### `cocos-asset-policy`

Use before implementation to decide whether final art, imported assets, audio, fonts, Spine, VFX, external assets, or placeholder-only visuals are allowed.

Output:

- selected game type
- current stage
- source presentation decision
- asset scope decision
- placeholder visual decision
- UI asset decision
- text asset decision
- audio asset decision
- font decision
- external asset decision
- naming rules
- allowed first-version assets
- forbidden first-version assets
- Cocos asset path risk rules
- validation requirements
- Asset Policy Gate decision

Rules:

- This command is documentation-only unless the user explicitly authorizes asset import.
- No external assets, final art, audio, fonts, Spine, particles, VFX, prefabs, scene files, or `.meta` files are modified during this command.
- Route path risks through [COCOS_PATH_SCOPED_RULES.md](COCOS_PATH_SCOPED_RULES.md).

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

### `cocos-first-implementation-story`

Use when the project needs exactly one dev-ready first implementation story after design, numerical, economy, presentation, asset, and architecture documents exist.

Output:

- story date
- source architecture
- working title
- implementation story name
- story goal
- user-facing result
- allowed file changes for implementation
- forbidden file changes for implementation
- required implementation files
- optional implementation files
- scene requirements
- UI requirements
- story logic requirements
- data requirements
- asset requirements
- runtime proof requirements
- acceptance criteria
- out-of-scope list
- implementation risks
- required pre-write approval checklist
- next required command
- final implementation story decision

Rules:

- This command writes story documentation only.
- It does not create scenes, scripts, prefabs, meta files, assets, or runtime code.
- It must keep the first story small enough for one implementation and one browser preview proof pass.

### `cocos-dev-story-prewrite`

Use immediately before `cocos-dev-story` when the implementation story is ready but files have not been written yet.

Mode:

- Use Safe Gate Mode.

Output:

- exact files to create or modify
- why each file is needed
- files that must not be touched
- runtime validation plan
- rollback plan
- expected git diff scope
- Cocos Creator / MCP usage plan
- browser preview proof plan
- final pre-write decision: `PRE_WRITE_APPROVAL_REQUIRED` / `PRE_WRITE_BLOCKED`

Rules:

- Load [COCOS_DEV_STORY_PREWRITE_PROTOCOL.md](COCOS_DEV_STORY_PREWRITE_PROTOCOL.md).
- Stop at `PRE_WRITE_APPROVAL_REQUIRED` until the user explicitly approves.
- Do not create files, modify scenes, modify scripts, modify `.meta`, commit, or push before approval.
- Name Cocos-generated companion meta that may appear.
- If generated meta later appears outside the approved scope, stop and apply [COCOS_GENERATED_META_POLICY.md](COCOS_GENERATED_META_POLICY.md).

### `cocos-dev-story`

Use when implementing a dev-ready story.

Mode:

- After `cocos-dev-story-prewrite` approval, use Fast Build Mode for implementation inside the approved scope.
- Pre-write Approval approves the scope; do not repeatedly ask the user inside that same scope.
- Stop only when an unapproved file, scope expansion, preview blocker, dangerous command, unexpected generated `.meta`, or other stop condition appears.

Output:

- implementation summary
- changed files
- assumptions used
- automation provider used or manual fallback used
- tests or validation performed
- proof returned: hierarchy, bindings, Console, preview, generated files, or screenshots as applicable
- unresolved blockers
- handoff message to QA

Rules:

- Requires `READY_FOR_IMPLEMENTATION`.
- Requires a user-approved Pre-write Approval Checklist from `cocos-dev-story-prewrite`.
- Implements only the approved story and approved file list.
- Limits changed files to the approved implementation files and approved Cocos-generated companion meta.
- Must execute browser preview proof when the story is playable or UI-visible.
- Must stop if unapproved files appear in `git status`, `git diff --name-only`, or `git diff --stat`.
- Must stop and request user confirmation if Cocos generates a directly related `.meta` file that was not in the approved diff scope.
- Must not expand into combat, economy, inventory, shop, gacha, save/load, extra chapters, external assets, or unrelated systems.

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

### `cocos-qa-review`

Use after an implementation story has browser preview proof and before release review.

Output:

- QA date
- checked commit
- tested scene
- tested script
- browser preview result
- Preview Visibility Gate result
- acceptance criteria checklist
- forbidden scope check
- git status check
- QA blockers
- QA decision: `QA_PASS` / `QA_FAIL` / `QA_BLOCKED`
- next required command

Rules:

- QA may read scene, script, and docs, and may run browser preview validation when required.
- QA must not expand functionality.
- QA must not modify scene, prefab, meta, runtime code, gameplay systems, or external assets.
- `QA_PASS` requires browser-visible proof for playable MVPs.

### `cocos-release-review`

Use after `QA_PASS` to decide whether the current MVP is accepted.

Output:

- acceptance date
- reviewed implementation commit
- reviewed QA report
- MVP name
- implemented scope
- browser preview proof summary
- acceptance criteria result
- forbidden scope result
- runtime readiness result
- release decision: `FIRST_MVP_ACCEPTED` / `FIRST_MVP_NOT_ACCEPTED` / `RELEASE_BLOCKED`
- known limitations
- what this release does not mean
- recommended next step

Rules:

- Load [MVP_ACCEPTANCE_REPORT_TEMPLATE.md](MVP_ACCEPTANCE_REPORT_TEMPLATE.md).
- Release review may write acceptance documentation only.
- Release review must not change gameplay, scene, prefab, meta, runtime code, or assets.
- `FIRST_MVP_ACCEPTED` accepts the current MVP only and never authorizes scope expansion.

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
