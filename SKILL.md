---
name: cocos-studio-ouguowen
description: Senior production system for multi-game-type Cocos Creator 3.8.8 development. Use when planning, scoping, structuring, staffing, reviewing, releasing, rescuing, or automation-driving a Cocos Creator 3.8.8 project that needs strict workflow control, clear ownership, level-data discipline, and production-safe architecture instead of ad hoc development.
---

# Cocos Studio Ouguowen

Use this skill as the lightweight operating entry for AI Game Studio and Cocos Creator 3.8.8 production work.

The entry file is intentionally small. It keeps the Skill定位, Task Router entry, core safety constraints, and routing rules in memory, then loads detailed production, validation, workflow, Agent, and architecture context only when the request directly needs it.

## Skill Positioning

This skill is for:

- Cocos Creator 3.8.8 game projects.
- AI Game Studio planning, scoping, implementation control, validation, release review, and safe Skill maintenance.
- Multi-game-type Cocos workflows, not a single fixed game template.
- Provider-neutral Cocos automation guidance when the user explicitly authorizes real project work.

This skill is not for:

- Cocos2d-x C++ engine guidance.
- Multi-engine game development.
- Importing the full Cocos manual.
- Treating one MCP, image tool, or automation provider as a core dependency.
- Turning Skill maintenance into real game implementation.

## Core Startup Context

Always start with the smallest useful context:

1. [core/context-summary.md](core/context-summary.md)
2. [core/context-loading-policy.md](core/context-loading-policy.md)
3. [core/operation-modes.md](core/operation-modes.md)

Then route through [core/module-index.md](core/module-index.md) only when a task needs detailed module selection.

Do not load the full Skill repository by default. Do not load all gates, workflows, templates, agents, semantic models, architecture files, or proof documents during normal Fast Build Mode.

Use:

- `FAST_CONTEXT` for normal implementation, small fixes, and Skill maintenance inside the approved repository scope.
- `GATE_CONTEXT` for pre-write approval, QA, release, stage transition, runtime proof, and safety gates.
- `AUDIT_CONTEXT` for repository audits, validation-script review, release governance, and Skill self-tests.

## Shared Context And Router Entry

AI Game Studio execution starts with a shared Blueprint context, then routes the task and activates only relevant Agents.

Shared Blueprint context lives in [blueprint/blueprint-manager.js](blueprint/blueprint-manager.js).
Incremental dependency impact lives in [dependency-graph/dependency-graph.js](dependency-graph/dependency-graph.js).
Routing policy lives in [config/task-routing.json](config/task-routing.json).
Runtime routing code lives in [task-router/task-router.js](task-router/task-router.js).
Adaptive execution routing chooses Fast Path or Full Pipeline from task complexity and dependency impact.
Execution Memory records route decisions in [execution-memory/execution-memory.js](execution-memory/execution-memory.js).
Execution Cache accelerates repeated routes in [execution-cache/execution-cache.js](execution-cache/execution-cache.js).
Fast Lane validation lives in [task-router/fast-execution-path.js](task-router/fast-execution-path.js).
Dynamic Agent activation lives in [agent-router/agent-router.js](agent-router/agent-router.js).

Default flow:

```text
Request
-> Blueprint Manager
-> Dependency Graph impact
-> Task Router
-> Adaptive Execution Router
-> Execution Cache
-> Execution Memory
-> Agent Router
-> Selected Agent Context
-> Executor or existing Studio Pipeline
```

Levels:

- `L0`: parameter, UI, copy, or configuration small change.
- `L1`: normal feature, interaction, component, page, or localized bug fix.
- `L2`: system-level, architectural, cross-module, runtime, framework, or pipeline work.
- `L3`: complete production, release, end-to-end, full game, or unknown broad request.

Execution paths:

- `L0` and `L1` may use Fast Lane when policy allows.
- Fast Lane may run only `blueprint-manager`, `task-router`, `agent-router`, `capability-loader`, `agent-executor`, and `validation-agent`.
- Fast Lane must bypass Planner, Task Graph, Scheduler, and Loop.
- `L2`, `L3`, unknown requests, release requests, production requests, and force-full signals must enter the existing Studio Pipeline.
- `execution_enabled` remains `false`; default execution mode remains `mock`.

Blueprint context is shared, versioned, and sectioned by Agent:

- `artist`: visual, assets, ui
- `cocos-programmer`: systems, code, components
- `game-designer`: design, gameplay
- `qa`: validation, test

Dependency impact maps Blueprint changes to affected Agents so small updates do
not reactivate unrelated roles.

## Operation Routing

Choose the operation mode before loading detailed rules:

- Fast Build Mode: normal implementation, small feature, bug fix, approved dev story, or focused Skill maintenance.
- Safe Gate Mode: pre-write approval, QA, release review, generated meta review, runtime proof, or stage transition.
- Audit Mode: Skill validation, repository audit, release governance, security review, or validation-script review.

Normal game development must not default to Audit Mode. Safety gates remain mandatory, but they should appear at stage boundaries or real stop conditions.

## Core Safety Constraints

Normal Skill discussion, planning, review, or maintenance must not enter real game implementation by default.

Do not use Cocos Creator, Cocos MCP, browser preview, local engine automation, external APIs, image providers, or real project inspection by default.

Inspect or modify a real Cocos project only when the user explicitly asks for project work and approves:

- active project path
- write scope
- forbidden files
- runtime proof expectation
- generated `.meta` handling
- rollback plan

Before real scene, prefab, `.meta`, runtime code, or project-file writes, load [protocols/cocos-dev-story-prewrite.md](protocols/cocos-dev-story-prewrite.md) and [protocols/write-approval.md](protocols/write-approval.md). Stop until explicit approval is present.

If generated `.meta` files appear outside approved scope, load [protocols/cocos-generated-meta.md](protocols/cocos-generated-meta.md) and stop for confirmation.

Runtime proof is validation sandbox work unless tied to an explicitly approved implementation story. Browser preview proof must not be replaced by editor hierarchy or script lifecycle assumptions.

Proof-chain work must stop after each approved proof slice unless the user explicitly asks to continue.

## On-Demand Context Map

Load these only when directly triggered:

- Detailed production rules: [production/game-readiness-gate.md](production/game-readiness-gate.md), [production/first-mvp-success-pipeline.md](production/first-mvp-success-pipeline.md), [production/review-system.md](production/review-system.md), [production/task-decomposition.md](production/task-decomposition.md)
- Validation rules: [protocols/quality-gates.md](protocols/quality-gates.md), [protocols/runtime-proof.md](protocols/runtime-proof.md), [protocols/skill-validation-loop.md](protocols/skill-validation-loop.md), [protocols/skill-test-cases.md](protocols/skill-test-cases.md)
- Workflow instructions: [templates/workflows/core.md](templates/workflows/core.md), [templates/workflows/extensions.md](templates/workflows/extensions.md), [templates/workflows/game-studio.md](templates/workflows/game-studio.md)
- Agent instructions: [agents/ai-game-studio-system.md](agents/ai-game-studio-system.md), [agents/registry.md](agents/registry.md), [agents/message-schema.md](agents/message-schema.md), [agents/handoff-protocol.md](agents/handoff-protocol.md), [agents/audit-log.md](agents/audit-log.md)
- Architecture rules: [architecture/cocos-baseline-3-8-8.md](architecture/cocos-baseline-3-8-8.md), [architecture/cocos-rules.md](architecture/cocos-rules.md), [architecture/project-structure.md](architecture/project-structure.md), [architecture/level-system.md](architecture/level-system.md), [architecture/map-model-router.md](architecture/map-model-router.md)
- Design-specific gates: [design/numerical-design.md](design/numerical-design.md), [design/economy-design.md](design/economy-design.md), [design/animation-presentation.md](design/animation-presentation.md), [design/ui-character-action-linkage.md](design/ui-character-action-linkage.md), [design/asset-policy.md](design/asset-policy.md)
- Skill evolution: [core/evolution-system.md](core/evolution-system.md), [templates/evolution-proposal-template.md](templates/evolution-proposal-template.md), [protocols/skill-change-review.md](protocols/skill-change-review.md)

Use [core/module-index-extended.md](core/module-index-extended.md) only for extended routing, proof history, Agent workflows, archive review, advanced templates, semantic deep docs, runtime template assets, or governance expansion.

## Common Routing Signals

- "small UI/config/copy change" -> Task Router `L0`, Fast Lane if policy allows.
- "feature/component/page/bug fix" -> Task Router `L1`, Fast Lane if policy allows.
- "system/runtime/framework/refactor/pipeline" -> Task Router `L2`, full Studio Pipeline.
- "complete game/release/end-to-end/production/from scratch" -> Task Router `L3`, full Studio Pipeline.
- "map/minimap/route/grid/world space" -> [architecture/map-model-router.md](architecture/map-model-router.md).
- "numbers/difficulty/reward/cost/balance" -> [design/numerical-design.md](design/numerical-design.md).
- "currency/shop/gacha/economy/monetization" -> [design/economy-design.md](design/economy-design.md).
- "animation/VFX/tween/Spine/audio-visual timing" -> [design/animation-presentation.md](design/animation-presentation.md).
- "real Cocos implementation/dev story" -> [protocols/cocos-dev-story-prewrite.md](protocols/cocos-dev-story-prewrite.md) before writes.
- "test/debug/close-loop validate this skill" -> [protocols/skill-validation-loop.md](protocols/skill-validation-loop.md).
- "evolve/upgrade/restructure the Skill" -> [core/evolution-system.md](core/evolution-system.md).

## Provider Policy

Cocos automation providers, MCP providers, image providers, code providers, and external tools are execution channels, not this skill's identity.

Do not hard-code one provider into core guidance. Prefer provider-neutral intents such as inspect hierarchy, create scene, create node, add component, bind prefab, save scene, run preview, read Console, and return proof.

Provider availability must not bypass write approval, Cocos path scope, generated meta review, runtime proof, or Git diff review.

## Response Rules

When strictness matters, name the operation mode, stage, and responsible role.

Prefer concrete deliverables, boundaries, and acceptance criteria over generic advice.

Keep Fast Build reports compact: result, changed files, validation/proof, git status, and next recommended command when useful.

Treat `next recommended command` as optional advice only. It is never implicit approval and never permission to continue automatically.

Safety completeness always wins over compact output.
