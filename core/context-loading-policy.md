# Context Loading Policy

## Purpose

This document prevents the Skill from becoming slow, verbose, or context-heavy as the repository grows.

The Skill must load the smallest useful context for the current task instead of defaulting to full-repository reading.

## Core principle

Do not load every rule file by default.

Use:

1. `core/context-summary.md` as the lightweight first memory.
2. `core/operation-modes.md` to choose Fast Build Mode, Safe Gate Mode, or Audit Mode.
3. `core/module-index.md` only to route into the smallest required module family.
4. Detailed protocol files only when the task triggers their scope.

Default scope boundary:

- Skill discussion and Skill maintenance must not load real game implementation context by default.
- Do not use Cocos Creator, Cocos MCP, browser preview, runtime proof tools, or real project file inspection as part of default context loading.
- Inspect real Cocos project files only when the user explicitly requests project work and provides or approves the active project path.
- Runtime proof and proof-chain documents are validation sandbox context. Load them only when runtime proof is directly requested or an approved implementation story requires it.
- A `next recommended command` is optional advice only and must not trigger additional context loading or automatic continuation.

## Context loading stages

### Stage 1: Lightweight memory

Always start with:

- `core/context-summary.md`
- `core/operation-modes.md`

This gives the agent the current operating rules without loading the full Skill repository.

### Stage 2: Command routing

Load only the relevant command section from:

- `core/commands.md`

Do not load every command when one command is enough.

### Stage 3: Module routing

Use `core/module-index.md` to choose the smallest module family.

Load only the files that are required by the selected task.

### Stage 4: Detailed rules

Load detailed protocol files only when triggered by task scope, risk, or stage.

### Stage 5: Audit expansion

Full repository scanning is allowed only in Audit Mode, Skill self-test, release governance, or validation-script review.

## Fast Build Mode context budget

Fast Build Mode should normally load no more than:

1. `core/context-summary.md`
2. `core/operation-modes.md`
3. one command section from `core/commands.md`
4. one to three task-specific protocol files

Fast Build Mode must not load all gates, all workflows, all templates, all agents, or all semantic models unless the task explicitly triggers them.
Fast Build Mode must also avoid heavy protocol, index, agent, runtime proof, and game proof documents unless they are directly triggered by the current user request.
For Skill maintenance, Fast Build Mode should stay inside Skill repository context and must not inspect real Cocos project files by default.

## Safe Gate Mode context budget

Safe Gate Mode may load:

- the relevant gate file
- the relevant approval protocol
- the relevant runtime proof or diff review protocol
- `protocols/quality-gates.md` when a gate decision is required

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

- `design/numerical-design.md`: numbers, difficulty, rewards, costs, balance.
- `design/economy-design.md`: currency, shop, gacha, inventory value, stamina, monetization.
- `design/animation-presentation.md`: animation, tween, VFX, Spine, particles, audio-visual timing.
- `design/ui-character-action-linkage.md`: UI input, character response, action state, animation state, skeleton presentation.
- `protocols/cocos-dev-story-prewrite.md`: before approved dev-story implementation writes scene, script, prefab, meta, or runtime files.
- `protocols/runtime-proof.md`: when runtime proof or preview proof is claimed.
- `protocols/cocos-generated-meta.md`: when generated meta appears or diff scope includes generated companion meta.

Do not load runtime-proof or game proof documentation merely because a previous response included a proof result or a next recommended command.
Proof-chain validation context expires after the approved proof slice unless the user explicitly asks to continue.

## Forbidden default behavior

The Skill must not:

- load every file before every answer
- load heavy protocol, index, agent, runtime proof, or game proof docs without a direct trigger
- run full Audit Mode during normal development
- inspect real Cocos project files without explicit project-work request and approved active path
- use Cocos Creator, Cocos MCP, or browser preview during normal Skill discussion or Skill maintenance
- treat ordinary internal checks as user-facing checkpoints
- repeatedly explain all gates during Fast Build Mode
- load all Agent files unless multi-Agent work is requested
- load all semantic models unless the task touches those semantics
- treat runtime proof as default product development
- treat `next recommended command` as implicit approval or automatic continuation
- use validation-script completeness as a reason to overload the active context

## Required loading behavior

Before answering or executing, choose:

- `FAST_CONTEXT`: only the summary, operation mode, command section, and directly relevant protocols.
- `GATE_CONTEXT`: summary, operation mode, selected gate, and selected approval/proof files.
- `AUDIT_CONTEXT`: broad scan for repository, Skill, release, or safety audits.

## Decision vocabulary

- `FAST_CONTEXT`: use for normal game development and approved small implementation work.
- `FAST_CONTEXT`: for Skill maintenance means lightweight Skill docs only; no real Cocos project inspection unless directly requested and approved.
- `GATE_CONTEXT`: use for stage transitions, pre-write approval, preview proof, QA, and release review.
- `AUDIT_CONTEXT`: use for Skill validation, repo audit, release governance, and safety review.
- `CONTEXT_OVERLOAD`: too many files are being loaded for the task.
- `REDUCE_CONTEXT`: stop expanding context and return to the smallest useful set.

## Compliance rule

If the task can be done with fewer files, use fewer files.

More documentation is not automatically better context.

The Skill is successful when it preserves safety while staying fast, focused, and useful during real game development.
