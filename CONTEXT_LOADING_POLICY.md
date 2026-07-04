# Context Loading Policy

## Purpose

This document prevents the Skill from becoming slow, verbose, or context-heavy as the repository grows.

The Skill must load the smallest useful context for the current task instead of defaulting to full-repository reading.

## Core principle

Do not load every rule file by default.

Use:

1. `SKILL_CONTEXT_SUMMARY.md` as the lightweight first memory.
2. `SKILL_OPERATION_MODES.md` to choose Fast Build Mode, Safe Gate Mode, or Audit Mode.
3. `MODULE_INDEX.md` only to route into the smallest required module family.
4. Detailed protocol files only when the task triggers their scope.

## Context loading stages

### Stage 1: Lightweight memory

Always start with:

- `SKILL_CONTEXT_SUMMARY.md`
- `SKILL_OPERATION_MODES.md`

This gives the agent the current operating rules without loading the full Skill repository.

### Stage 2: Command routing

Load only the relevant command section from:

- `COMMANDS.md`

Do not load every command when one command is enough.

### Stage 3: Module routing

Use `MODULE_INDEX.md` to choose the smallest module family.

Load only the files that are required by the selected task.

### Stage 4: Detailed rules

Load detailed protocol files only when triggered by task scope, risk, or stage.

### Stage 5: Audit expansion

Full repository scanning is allowed only in Audit Mode, Skill self-test, release governance, or validation-script review.

## Fast Build Mode context budget

Fast Build Mode should normally load no more than:

1. `SKILL_CONTEXT_SUMMARY.md`
2. `SKILL_OPERATION_MODES.md`
3. one command section from `COMMANDS.md`
4. one to three task-specific protocol files

Fast Build Mode must not load all gates, all workflows, all templates, all agents, or all semantic models unless the task explicitly triggers them.

## Safe Gate Mode context budget

Safe Gate Mode may load:

- the relevant gate file
- the relevant approval protocol
- the relevant runtime proof or diff review protocol
- `QUALITY_GATES.md` when a gate decision is required

It should still avoid full repository loading.

## Audit Mode context budget

Audit Mode may load broadly.

Audit Mode is appropriate for:

- Skill self-test
- repository safety review
- command routing audit
- release governance
- validation script review
- open-source polish

Audit Mode must clearly state that it is operating in Audit Mode.

## Trigger-based loading

Load these files only when triggered:

- `GAME_NUMERICAL_DESIGN.md`: numbers, difficulty, rewards, costs, balance.
- `GAME_ECONOMY_DESIGN.md`: currency, shop, gacha, inventory value, stamina, monetization.
- `ANIMATION_PRESENTATION_RULES.md`: animation, tween, VFX, Spine, particles, audio-visual timing.
- `UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md`: UI input, character response, action state, animation state, skeleton presentation.
- `COCOS_DEV_STORY_PREWRITE_PROTOCOL.md`: before approved dev-story implementation writes scene, script, prefab, meta, or runtime files.
- `RUNTIME_PROOF_PROTOCOL.md`: when runtime proof or preview proof is claimed.
- `COCOS_GENERATED_META_POLICY.md`: when generated meta appears or diff scope includes generated companion meta.

## Forbidden default behavior

The Skill must not:

- load every file before every answer
- run full Audit Mode during normal development
- treat ordinary internal checks as user-facing checkpoints
- repeatedly explain all gates during Fast Build Mode
- load all Agent files unless multi-Agent work is requested
- load all semantic models unless the task touches those semantics
- use validation-script completeness as a reason to overload the active context

## Required loading behavior

Before answering or executing, choose:

- `FAST_CONTEXT`: only the summary, operation mode, command section, and directly relevant protocols.
- `GATE_CONTEXT`: summary, operation mode, selected gate, and selected approval/proof files.
- `AUDIT_CONTEXT`: broad scan for repository, Skill, release, or safety audits.

## Decision vocabulary

- `FAST_CONTEXT`: use for normal game development and approved small implementation work.
- `GATE_CONTEXT`: use for stage transitions, pre-write approval, preview proof, QA, and release review.
- `AUDIT_CONTEXT`: use for Skill validation, repo audit, release governance, and safety review.
- `CONTEXT_OVERLOAD`: too many files are being loaded for the task.
- `REDUCE_CONTEXT`: stop expanding context and return to the smallest useful set.

## Compliance rule

If the task can be done with fewer files, use fewer files.

More documentation is not automatically better context.

The Skill is successful when it preserves safety while staying fast, focused, and useful during real game development.
