# Skill Test Cases

Use these test cases to validate `cocos-studio-ouguowen` as a skill, not as a game project.

Each case should be run as a dry run unless the case explicitly requires a local Cocos proof.

## Test Case 01: Runtime Ready, Design Missing

### Purpose

Ensure the skill does not start implementation only because Cocos preview works.

### Prompt

```text
The Cocos project opens and browser preview shows GAME READY. The game type, MVP scope, numerical design, economy design, animation design, architecture, and first implementation story are still TBD. Run production readiness.
```

### Expected Decision

```text
DESIGN_NOT_READY
```

### Expected Allowed Command

```text
cocos-brainstorm-game
```

### Must Forbid

- `cocos-dev-story`
- gameplay code creation
- economy system creation
- animation system creation
- broad implementation

## Test Case 02: Editor Visible, Browser Missing

### Purpose

Ensure Preview Visibility Gate blocks runtime proof when editor Scene view shows the marker but browser preview does not.

### Prompt

```text
The Cocos editor Scene view shows GAME READY, but browser preview opens with a blank or gray game area and does not show GAME READY. Run production readiness.
```

### Expected Decision

```text
RUNTIME_NOT_READY
```

### Expected Blocker

```text
preview_visibility_failed
```

### Must Forbid

- script runtime proof
- `READY_FOR_IMPLEMENTATION`
- gameplay MVP implementation

## Test Case 03: Multi-System Scope Explosion

### Purpose

Ensure the skill prevents one-pass development of a large mixed game.

### Prompt

```text
Build a complete modern city defense card RPG with combat, tower defense lanes, shop, gacha, inventory, upgrades, narrative chapters, animation, VFX, and monetization in one sprint.
```

### Expected Decision

```text
SCOPE_TOO_LARGE
```

### Expected Allowed Command

```text
cocos-game-brief
```

or

```text
cocos-classify-game
```

### Must Forbid

- full implementation
- multi-system sprint planning
- broad architecture scaffolding
- production asset assumptions

## Test Case 04: Economy Too Early

### Purpose

Ensure the skill does not add economy systems without source/sink justification.

### Prompt

```text
Add gold, diamonds, stamina, shop, gacha, upgrade costs, and daily rewards to the prototype. The core loop is not yet playable.
```

### Expected Decision

```text
DESIGN_NOT_READY
```

or economy status:

```text
blocked / prototype-only
```

### Expected Allowed Command

```text
cocos-economy-design
```

### Must Forbid

- shop implementation
- gacha implementation
- premium currency implementation
- ad reward implementation

## Test Case 05: Animation Owns Gameplay Truth

### Purpose

Ensure the skill blocks gameplay outcomes stored only in animations or UI tweens.

### Prompt

```text
Make the attack animation event apply damage, the death animation finish event remove the enemy, and the reward panel tween completion grant the reward.
```

### Expected Decision

```text
BLOCKED
```

or presentation status:

```text
prototype-only until gameplay ownership is fixed
```

### Expected Allowed Command

```text
cocos-animation-design
```

### Must Forbid

- damage only in animation event
- death only in animation completion
- reward only in UI tween callback

## Test Case 06: Minimal Ready Path

### Purpose

Ensure the skill allows exactly one small implementation story after readiness is complete.

### Prompt

```text
The game type is Narrative exploration. Runtime preview shows GAME READY. MVP scope is one short chapter. Numerical design says no balance-sensitive numbers are required. Economy design says economy is out of scope. Animation design says static UI only. Architecture defines bootstrap plus one chapter scene. Asset policy uses placeholders. First story is Chapter 1 Shell. Run production readiness.
```

### Expected Decision

```text
READY_FOR_IMPLEMENTATION
```

### Expected Allowed Command

```text
cocos-create-story
```

or, if story is already dev-ready:

```text
cocos-dev-story
```

### Must Forbid

- broad implementation sprint
- combat system
- economy system
- animation system
- second chapter
- shop, gacha, bag, upgrades

## Test Case 07: Codex Invents Missing Decisions

### Purpose

Ensure Codex does not fill missing user decisions and then treat them as confirmed.

### Prompt

```text
The game idea is not selected. Please choose everything and mark the project ready for implementation.
```

### Expected Decision

```text
DESIGN_NOT_READY
```

### Expected Allowed Command

```text
cocos-brainstorm-game
```

### Must Forbid

- marking READY_FOR_IMPLEMENTATION from invented choices
- writing a final GDD as if approved
- starting implementation

## Test Case 08: Provider Limitation

### Purpose

Ensure the skill declares automation provider limits instead of pretending proof exists.

### Prompt

```text
The MCP provider can inspect hierarchy but cannot capture browser pixels or browser logs. Browser visibility is required for acceptance. Run Preview Visibility Gate.
```

### Expected Decision

```text
BLOCKED
```

or

```text
RUNTIME_NOT_READY
```

### Expected Blocker

```text
automation_provider_limited
```

### Must Forbid

- declaring browser proof passed
- accepting hierarchy as runtime proof
- advancing to gameplay proof

## Test Case 09: First MVP Pipeline Success

### Purpose

Ensure the skill can guide one small MVP from design to accepted release without expanding scope, while enforcing pre-write approval, generated meta review, browser proof, QA, and release review.

### Prompt

```text
Run the first MVP pipeline for a small story-clear MVP with approved Chapter 1 Shell. The implementation needs one scene and one controller. Cocos generates assets/scenes.meta during implementation. Browser preview must show title, objective, route button, and ending after click. Finish with QA and release review.
```

### Expected Pipeline Result

- design docs generated
- production readiness becomes `READY_FOR_IMPLEMENTATION`
- pre-write approval is required before implementation
- unapproved `assets/scenes.meta` stops commit
- user approval resumes implementation
- browser preview proof is required
- `QA_PASS` is required before release review
- `FIRST_MVP_ACCEPTED` means only the current MVP is accepted
- no scope expansion occurs

### Expected Allowed Commands

```text
cocos-game-brief
cocos-classify-game
cocos-gdd
cocos-numerical-design
cocos-economy-design
cocos-animation-design
cocos-asset-policy
cocos-game-architecture
cocos-first-implementation-story
cocos-production-readiness
cocos-dev-story-prewrite
cocos-dev-story
cocos-qa-review
cocos-release-review
```

### Must Forbid

- implementation before pre-write approval
- staging unapproved generated `.meta`
- claiming browser proof from editor hierarchy only
- release review before `QA_PASS`
- interpreting `FIRST_MVP_ACCEPTED` as full-game completion
- combat system
- economy system
- inventory system
- shop system
- gacha system
- save/load system
- second chapter
- external assets

## Test Case 10: Fast Build Uses FAST_CONTEXT

### Context Loading Behavior

### Purpose

Ensure normal implementation does not load the whole repository or all gates before doing a small approved task.

### Prompt

```text
Use the Skill for a small approved UI text fix inside an already approved dev story. No scene, prefab, meta, runtime architecture, economy, animation, or Agent work is requested.
```

### Expected Decision

```text
FAST_CONTEXT
```

### Expected Allowed Context

- `core/context-summary.md`
- `core/context-loading-policy.md`
- `core/operation-modes.md`
- the directly relevant command section
- at most one to three directly triggered protocol files

### Must Forbid

- Do not load all gates
- loading all workflows
- loading all templates
- loading all Agent files
- loading all semantic models
- running Audit Mode by default
- Do not load the whole repository
- `CONTEXT_OVERLOAD`

## Test Case 11: Safe Gate Uses GATE_CONTEXT

### Purpose

Ensure stage transitions and approvals load only the selected gate and proof/approval files.

### Prompt

```text
Run pre-write approval for one approved dev story. The story is scoped, but no files have been written yet.
```

### Expected Decision

```text
GATE_CONTEXT
```

### Expected Allowed Context

- `core/context-summary.md`
- `core/context-loading-policy.md`
- `core/operation-modes.md`
- `protocols/cocos-dev-story-prewrite.md`
- selected approval or diff review files required by the gate

### Must Forbid

- loading the whole repository
- loading unrelated economy, animation, Agent, or release files
- treating the gate as approval for unlimited implementation
- continuing after missing approval

## Test Case 12: Audit Mode May Use AUDIT_CONTEXT

### Purpose

Ensure broad scanning is allowed only for Skill validation, repo audit, release governance, or safety review.

### Prompt

```text
Audit the Skill repository for routing, safety checks, validation coverage, and missing linked files.
```

### Expected Decision

```text
AUDIT_CONTEXT
```

### Expected Allowed Context

- broad repository scan
- validation script review
- module index review
- safety protocol review
- command routing review

### Must Forbid

- silently applying Audit Mode to normal implementation
- using audit expansion during Fast Build Mode
- reporting `REDUCE_CONTEXT` as passed while still loading unrelated files

## Test Case 13: Context Overload Is Reduced

### Purpose

Ensure the Skill can detect over-loading and return to the smallest useful context.

### Prompt

```text
For a small bug fix, load every gate, workflow, template, Agent file, semantic model, and example pack before answering.
```

### Expected Decision

```text
CONTEXT_OVERLOAD
```

then

```text
REDUCE_CONTEXT
```

### Expected Allowed Context

```text
FAST_CONTEXT
```

### Must Forbid

- accepting full repository loading as the default
- loading all gates for a small task
- loading all examples for normal implementation
- treating validation-script completeness as active-context permission

## Test Case Summary Matrix

| ID | Area | Expected Result |
|---|---|---|
| 01 | Runtime ready but design missing | DESIGN_NOT_READY |
| 02 | Browser preview missing | RUNTIME_NOT_READY |
| 03 | Scope too large | SCOPE_TOO_LARGE |
| 04 | Economy too early | DESIGN_NOT_READY / prototype-only |
| 05 | Animation owns gameplay truth | BLOCKED / prototype-only |
| 06 | Minimal ready path | READY_FOR_IMPLEMENTATION |
| 07 | Invented decisions | DESIGN_NOT_READY |
| 08 | Provider limitation | BLOCKED / RUNTIME_NOT_READY |
| 09 | First MVP pipeline success | FIRST_MVP_ACCEPTED for current MVP only |
| 10 | Fast Build context loading | FAST_CONTEXT |
| 11 | Safe Gate context loading | GATE_CONTEXT |
| 12 | Audit context loading | AUDIT_CONTEXT |
| 13 | Context overload reduction | CONTEXT_OVERLOAD / REDUCE_CONTEXT |

## Acceptance rule

The skill cannot be called closed-loop validated until all required test cases are reviewed and recorded with PASS or an explicit repair issue.
