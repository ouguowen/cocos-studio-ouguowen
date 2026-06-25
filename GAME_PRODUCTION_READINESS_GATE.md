# Game Production Readiness Gate

Use this gate before Codex starts real game implementation, opens a long development sprint, creates many Cocos scripts, builds large scene/prefab structures, or attempts to make a playable game in one pass.

This gate exists to prevent blind execution. It decides whether the project is ready for implementation, still in design preparation, or blocked by missing proof.

## Readiness law

- Do not start real game development from a vague idea.
- Do not let Codex jump from concept to Cocos implementation without game type, MVP scope, architecture, numbers, economy, presentation, and validation rules.
- Do not treat local Cocos automation as proof that the game design is ready.
- Do not treat game design documents as proof that Cocos runtime can run.
- Do not treat editor Scene view visibility as browser runtime proof.
- A game can enter implementation only after both design readiness and runtime readiness are explicit.

## Required decision states

Every readiness review must end with one of these decisions:

```text
READY_FOR_IMPLEMENTATION
DESIGN_NOT_READY
RUNTIME_NOT_READY
SCOPE_TOO_LARGE
BLOCKED
```

Do not use vague statuses such as "mostly ready".

## Readiness checklist

### 1. Game identity

Required:

- selected game type
- dominant player action
- core fantasy
- target player
- first-version promise
- explicit non-goals

Gate rule:

- If the game type is not selected, do not choose architecture or data tables.

### 2. MVP scope

Required:

- one repeated core loop
- one success condition
- one fail condition
- one target session length
- one first playable goal
- cut list for out-of-scope systems
- kill conditions

Gate rule:

- If the MVP needs many systems to explain itself, reduce scope before implementation.

### 3. Numerical readiness

Required when values affect gameplay:

- Numerical Design Record
- player baseline
- enemy or obstacle families
- difficulty beats
- reward purpose
- placeholder status
- legal ranges
- validation rules

Gate rule:

- If balance-sensitive numbers are random or unexplained, implementation is prototype-only or blocked.

### 4. Economy readiness

Required when rewards, currencies, upgrades, shops, ads, stamina, gacha, inventory, or progression economy exist:

- Economy Design Record
- economy scope
- source/sink loop
- main reward moment
- main spend moment
- monetization in-scope or out-of-scope decision
- validation rules

Gate rule:

- If the economy is not needed for the MVP, keep it out.

### 5. Animation and presentation readiness

Required when animation, UI motion, VFX, combat feedback, Spine, AnimationClip, Tween, particles, or audio-visual timing exist:

- Animation Presentation Record
- gameplay state being represented
- trigger event
- exit condition
- fallback behavior
- placeholder status
- performance risk
- validation rules

Gate rule:

- If presentation owns gameplay truth, implementation is blocked.

### 6. Cocos architecture readiness

Required:

- scene structure
- script folder structure
- runtime system boundaries
- data/config boundary
- prefab ownership
- resource loading plan
- forbidden shortcuts

Gate rule:

- If a single manager owns config loading, spawning, objectives, rewards, UI, and scene logic, implementation is blocked.

### 7. Cocos runtime readiness

Required when local Cocos work is authorized:

- target Cocos Creator version confirmed
- project opens
- target scene exists or creation plan exists
- baseline scene can save
- browser preview can start
- Preview Visibility Gate passes for baseline marker when browser output matters
- automation provider capability and limitation are explicit

Gate rule:

- If browser preview cannot show the baseline marker, do not start gameplay MVP implementation.

### 8. Asset readiness

Required:

- placeholder asset policy
- naming rules
- asset owner
- approved asset source or generation path
- fallback policy

Gate rule:

- Missing final art is acceptable in prototype. Missing placeholder policy is not.

### 9. Task readiness

Required:

- first implementation story
- owner role
- files expected to change
- data/config expected to change
- acceptance criteria
- proof required
- blocker criteria

Gate rule:

- Do not start a large implementation without a dev-ready first story.

## Approved implementation start order

When the gate passes, use this order:

1. create or confirm Cocos project and target scene
2. pass Preview Visibility Gate with baseline marker
3. create minimal runtime shell
4. create first gameplay object or UI marker
5. wire one input/action/result loop
6. add only the minimum numbers needed for the loop
7. add only the minimum reward/progression needed for the loop
8. add placeholder feedback only if it improves readability
9. run browser preview proof
10. review against MVP Scope Gate and Prototype Gate

Do not start with shop, gacha, full animation trees, large config packs, or broad architecture scaffolding.

## Blocker categories

Use these blocker names:

- `missing_game_type`
- `missing_mvp_scope`
- `missing_numerical_design`
- `missing_economy_design`
- `missing_presentation_design`
- `missing_architecture_boundary`
- `preview_visibility_failed`
- `automation_provider_limited`
- `scope_too_large`
- `asset_policy_missing`
- `task_not_dev_ready`

## Readiness report

Use this artifact before starting real implementation.

```md
# Game Production Readiness Report

## Decision
- READY_FOR_IMPLEMENTATION / DESIGN_NOT_READY / RUNTIME_NOT_READY / SCOPE_TOO_LARGE / BLOCKED

## Game Identity

## MVP Scope

## Numerical Readiness

## Economy Readiness

## Animation / Presentation Readiness

## Cocos Architecture Readiness

## Cocos Runtime Readiness

## Asset Readiness

## First Implementation Story

## Required Proof

## Blockers

## Allowed Next Command

## Forbidden Next Actions
```

## PASS standard

The gate passes only when:

- game type is selected
- MVP scope is narrow
- numerical design is ready when values matter
- economy design is ready when reward/spend/progression matters
- animation presentation rules are ready when feedback/motion matters
- Cocos architecture boundaries are clear
- runtime readiness is proven or explicitly not required yet
- first implementation story is dev-ready
- proof requirements are explicit

## FAIL standard

The gate fails when:

- Codex would need to guess core game decisions
- the first playable depends on unbounded systems
- values, economy, or presentation are being invented without records
- Cocos preview proof is required but missing
- the first story is not small enough to execute and verify

## Gate decision law

- `READY_FOR_IMPLEMENTATION` allows the next implementation story only, not unlimited development.
- `DESIGN_NOT_READY` means continue design records before code.
- `RUNTIME_NOT_READY` means fix Cocos project, scene, preview, or automation proof before gameplay code.
- `SCOPE_TOO_LARGE` means cut the MVP.
- `BLOCKED` means stop and name the missing proof or missing authority.
