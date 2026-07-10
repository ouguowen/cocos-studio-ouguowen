---
name: cocos-studio-ouguowen
description: Senior production system for multi-game-type Cocos Creator 3.8.8 development. Use when planning, scoping, structuring, staffing, reviewing, releasing, rescuing, or automation-driving a Cocos Creator 3.8.8 project that needs strict workflow control, clear ownership, level-data discipline, and production-safe architecture instead of ad hoc development.
---

# Cocos Studio Ouguowen

Use this skill as the operating system for Cocos Creator 3.8.8 game projects.

## Core stance

- Assume a senior team standard only.
- Do not recommend "write first, organize later".
- Do not allow undefined ownership, vague stage status, or unreviewed architecture drift.
- Treat a solo developer as a multi-role studio, not as a role-less workflow.
- Treat modern city attack-defense as the first example pack, not as the user's only game direction.
- Support multiple game types through classification and type-specific templates, not through one bloated universal flow.

## Scope boundary

This skill is for:

- Cocos Creator 3.8.8 projects.
- TypeScript/Cocos Creator scene, prefab, component, config, and workflow discipline.
- Multi-game-type AI Game Studio work, including attack-defense, tower defense, card battle, story level clear, idle growth, merge/collection, and other scoped templates when selected.
- Codex or other AI coding agents that need a controlled Cocos production brain.
- The currently available Cocos automation tool or MCP provider when local Cocos engine operations must be executed.

Default boundary:

- Normal Skill discussion, planning, review, or maintenance must not enter real game implementation by default.
- Skill maintenance and real game implementation are separate work modes. Do not cross from one into the other unless the user explicitly asks for project work and approves the active project path and write scope.
- Do not use Cocos Creator, Cocos MCP, browser preview, or real project inspection by default during Skill discussion or Skill maintenance.
- Do not inspect real Cocos project files unless the user explicitly asks for project work and provides or approves the active project path.
- Runtime proof and proof-chain work are validation sandbox activities, not default product development and not proof of a full MVP.
- Proof-chain work must stop after each approved proof slice unless the user explicitly asks to continue with the next slice.
- `next recommended command` is optional advice only. It is never implicit approval, never an instruction to continue automatically, and never a substitute for pre-write approval.

This skill is not for:

- Cocos2d-x C++ engine guidance.
- Multi-engine game development.
- A single fixed game template.
- A hard dependency on one commercial MCP plugin, one future official MCP plugin, or any provider-specific command dialect.
- Importing the full Cocos manual into the skill.
- Turning Skill maintenance requests into real game implementation.
- Treating validation sandbox proof chains as default product development.

## Context Loading routing

Before applying operation modes or detailed gates, load:

1. [core/context-summary.md](core/context-summary.md)
2. [core/context-loading-policy.md](core/context-loading-policy.md)
3. [core/operation-modes.md](core/operation-modes.md)

Then route through [core/module-index.md](core/module-index.md) only when needed.

Do not load the full Skill repository by default.
Do not load all gates, workflows, templates, agents, or semantic models during normal Fast Build Mode.
Do not load heavy protocol, index, agent, runtime proof, or game proof documents unless the current user request directly triggers them.

- Fast Build Mode should use `FAST_CONTEXT`.
- Safe Gate Mode should use `GATE_CONTEXT`.
- Audit Mode may use `AUDIT_CONTEXT`.

## Operation Mode routing

Before applying detailed gates, choose an operation mode from [core/operation-modes.md](core/operation-modes.md).

- Default for normal game development: Fast Build Mode.
- Default for stage transition: Safe Gate Mode.
- Default for Skill/repo validation: Audit Mode.
- Do not use Audit Mode as the default for normal game development.
- Do not interrupt the user repeatedly in Fast Build Mode.
- Do not generate full audit reports during normal implementation unless a stop condition appears.
- Safety gates remain mandatory, but they must be placed at stage boundaries or stop conditions.

## Map model routing

When a request involves maps, scene space, world space, routes, regions, TileMap, Grid, minimap, navigation, paths, level space, or 16:9 map space, route through [architecture/map-model-router.md](architecture/map-model-router.md) first.

Then load only what the selected map model needs:

- [architecture/map-space-model.md](architecture/map-space-model.md)
- [architecture/minimap-navigation-model.md](architecture/minimap-navigation-model.md)
- [architecture/level-data-models.md](architecture/level-data-models.md)
- [architecture/level-config-schemas.md](architecture/level-config-schemas.md)
- [architecture/level-system.md](architecture/level-system.md)

Rules:

- Do not assume one map model fits every game.
- Do not design a concrete map before selecting the map model.
- Do not add minimap by default.
- Do not treat background art as the full map system.

## Evolution routing

When a request asks to improve, evolve, upgrade, extend, restructure, or make the Skill smarter, route through [core/evolution-system.md](core/evolution-system.md) first.

Rules:

- Do not evolve Skill from theoretical completeness alone.
- Do not allow automatic self-evolution.
- E3 / E4 changes require proposal, approval, validation, and rollback plan.
- Evolution must preserve Fast Build Mode and Context Loading Policy.

## Default execution order

1. Load lightweight context first: [core/context-summary.md](core/context-summary.md), [core/context-loading-policy.md](core/context-loading-policy.md), and [core/operation-modes.md](core/operation-modes.md).
2. Choose Fast Build Mode, Safe Gate Mode, or Audit Mode from [core/operation-modes.md](core/operation-modes.md) before applying detailed gates.
3. Identify the current production mode. See [production/modes.md](production/modes.md).
4. Identify the current production stage. See [production/stages.md](production/stages.md).
5. Identify role, authority, and asset ownership. See [production/roles.md](production/roles.md), [production/role-stage-matrix.md](production/role-stage-matrix.md), [production/ownership.md](production/ownership.md), and [production/team-seniority.md](production/team-seniority.md).
6. Route the request through [core/module-index.md](core/module-index.md) only when the current task needs detailed module selection.
7. If the request asks to debug, audit, validate, test, or close-loop test this skill itself, apply [protocols/skill-validation-loop.md](protocols/skill-validation-loop.md) and [protocols/skill-test-cases.md](protocols/skill-test-cases.md) before any game implementation.
8. If the request changes this Skill repository itself, apply [protocols/ai-command-permissions.md](protocols/ai-command-permissions.md), [protocols/cocos-path-scope.md](protocols/cocos-path-scope.md), [protocols/write-approval.md](protocols/write-approval.md), [protocols/git-diff-review.md](protocols/git-diff-review.md), and [protocols/skill-change-review.md](protocols/skill-change-review.md) before writing files.
9. For most requests, open [templates/workflows/core.md](templates/workflows/core.md) first. Open [templates/workflows/extensions.md](templates/workflows/extensions.md) only for specialist flows.
10. For most project artifacts, open [templates/core.md](templates/core.md) first. Open [templates/level-templates.md](templates/level-templates.md) only for level-content artifacts.
11. If engine-version-specific advice matters, apply [architecture/cocos-baseline-3-8-8.md](architecture/cocos-baseline-3-8-8.md) before giving engine guidance.
12. If the request asks to start real game implementation, create a playable game, open a large implementation sprint, or let Codex build broadly, apply [production/game-readiness-gate.md](production/game-readiness-gate.md) before implementation.
13. If the request includes gameplay stats, enemy stats, difficulty, cost, reward amount, progression speed, or balance-sensitive config, apply [design/numerical-design.md](design/numerical-design.md) before implementation.
14. If the request includes currencies, sources, sinks, upgrades, reward cadence, stamina, shop, ads, gacha, inventory value, progression economy, or monetization-sensitive systems, apply [design/economy-design.md](design/economy-design.md) before implementation.
15. If the request includes animation states, UI motion, tween effects, combat feedback, hit reactions, death flows, skill VFX, Spine, AnimationClip, particles, or audio-visual timing, apply [design/animation-presentation.md](design/animation-presentation.md) before implementation.
16. If the request involves UI interaction, character response, animation state, skeleton presentation, or asset-driven visual feedback, apply [design/ui-character-action-linkage.md](design/ui-character-action-linkage.md), [design/character-system.md](design/character-system.md), [design/ui-system-model.md](design/ui-system-model.md), [design/character-animation-model.md](design/character-animation-model.md), and [design/asset-semantic-model.md](design/asset-semantic-model.md). Do not implement UI-character-action linkage before the first implementation story and production readiness approve the scope.
17. If the request needs local Cocos engine operation, resolve the current Cocos automation provider before execution. Use provider-neutral intent such as create scene, create node, add component, bind prefab, save scene, run preview, read Console, and return proof.
18. If browser preview output is required, apply the Preview Visibility Gate before script-runtime proof. Editor scene visibility does not prove browser runtime visibility.
19. If the request needs runtime proof, proof-channel selection, or a distinction between docs-only audit proof and game runtime proof, apply [protocols/runtime-proof.md](protocols/runtime-proof.md) before claiming completion.
20. If the request needs runtime code or subsystem boundaries, use [architecture/level-system.md](architecture/level-system.md). Open [architecture/level-system-extensions.md](architecture/level-system-extensions.md) only for advanced online, monetization, live-ops, social, or compliance systems.
21. If the request needs approval or stage advancement, apply [protocols/quality-gates.md](protocols/quality-gates.md), [templates/checklists/core.md](templates/checklists/core.md), and [production/review-system.md](production/review-system.md). Open [templates/checklists/extensions.md](templates/checklists/extensions.md) only for specialist reviews.
22. If the user asks to build one concrete module such as home page, battle page, shop page, bag page, HUD, or result page, apply [protocols/choice-execution.md](protocols/choice-execution.md) before implementation.
23. If delivery order, prerequisites, or step-skipping risk matters, apply [protocols/sequential-gate.md](protocols/sequential-gate.md) before advancing work.
24. If the user asks for AI Game Studio mode, multi-Agent work, command-based production, or Agent handoff, load [agents/ai-game-studio-system.md](agents/ai-game-studio-system.md), [core/commands.md](core/commands.md), [agents/registry.md](agents/registry.md), [agents/message-schema.md](agents/message-schema.md), [agents/handoff-protocol.md](agents/handoff-protocol.md), [templates/workflows/game-studio.md](templates/workflows/game-studio.md), [agents/audit-log.md](agents/audit-log.md), and [protocols/skill-integration-audit-report.md](protocols/skill-integration-audit-report.md).
25. If a project moves from design into the first real MVP implementation, apply [production/first-mvp-success-pipeline.md](production/first-mvp-success-pipeline.md) before starting implementation.
26. Before `cocos-dev-story` writes scene, script, prefab, meta, or runtime files, apply [protocols/cocos-dev-story-prewrite.md](protocols/cocos-dev-story-prewrite.md) and stop at `PRE_WRITE_APPROVAL_REQUIRED` until the user confirms.
27. If Cocos Creator generates `.meta` files outside the approved diff scope, apply [protocols/cocos-generated-meta.md](protocols/cocos-generated-meta.md), stop, and request user confirmation before staging or committing.

## Cocos automation provider policy

Use this policy only when the user already has, requests, or authorizes a Cocos Creator automation tool/MCP provider.

- Treat the provider as an execution channel, not as the identity of this skill.
- Do not use Cocos Creator automation, Cocos MCP, browser preview, or real Cocos project inspection during normal Skill discussion or Skill maintenance.
- Use Cocos automation only after the user explicitly asks for project work and provides or approves the active project path.
- Do not hard-code one commercial MCP provider, one official MCP provider, or one tool-specific command vocabulary into core instructions.
- Prefer capability-based intents: open project, inspect hierarchy, create scene, create node, add component, set property, bind reference, create prefab, save scene, run preview, read Console, return screenshot/proof.
- If a Cocos official automation MCP becomes available later, it may replace the current provider without changing this skill's core production logic.
- If no automation provider is available, fall back to manual Cocos Creator steps without changing the task scope.
- Local Cocos validation is still a result gate when runtime behavior matters, but it can be automation-provider-driven rather than manually clicked by the user.
- Do not expand the skill with provider-specific protocol files unless the user explicitly asks for that provider to become part of the repository.
- Do not use provider availability to bypass [protocols/ai-command-permissions.md](protocols/ai-command-permissions.md) or [protocols/cocos-path-scope.md](protocols/cocos-path-scope.md).

## Skill validation law

Use this law when the user is testing, debugging, auditing, or trying to close-loop validate this skill.

- Skill validation is not game development.
- Do not treat one successful ready path as closed-loop validation.
- Run both block-path tests and allow-path tests.
- A skill test must state expected decision, actual decision, allowed command, forbidden actions, proof, result, and repair needs.
- Do not continue implementation when a skill test fails.
- Route skill validation through [protocols/skill-validation-loop.md](protocols/skill-validation-loop.md), [protocols/skill-test-cases.md](protocols/skill-test-cases.md), [protocols/skill-self-test-modes.md](protocols/skill-self-test-modes.md), [protocols/skill-extended-safety-test-cases.md](protocols/skill-extended-safety-test-cases.md), [protocols/cocos-hook-validation-plan.md](protocols/cocos-hook-validation-plan.md), and [protocols/cocos-automated-checks.md](protocols/cocos-automated-checks.md).

## Preview visibility law

Use this law when browser preview, runtime UI visibility, script runtime proof, or first playable proof matters.

- Runtime proof is validation sandbox work unless the user has explicitly approved a real implementation story. It must not become a default continuation path.
- A passing proof slice authorizes only that slice. Stop after each proof slice and wait for explicit continuation before starting another proof slice.
- Editor scene visibility is not enough proof.
- Browser preview visibility must be proven with a baseline UI or gameplay marker before script-runtime proof can pass.
- If the editor shows a Label or UI marker but the browser preview does not, stop script verification and enter Preview Visibility Gate.
- Do not accept script `onLoad()` or `start()` proof based only on editor hierarchy, inspector state, or component attachment.
- If browser runtime logs are not readable through the current automation provider, require visual runtime proof or a declared blocker.
- Do not proceed to gameplay MVP implementation until the baseline preview marker is visible in browser preview.

## Numerical design law

Use this law when Codex is asked to create or change enemy stats, player stats, wave timing, spawn count, rewards, costs, upgrade values, damage, health, speed, cooldowns, or difficulty curves.

- Do not let Codex invent final gameplay numbers without design intent.
- Prototype numbers are allowed, but must be labeled as placeholders.
- Every important number needs a purpose and a legal range before it enters config.
- If a number affects difficulty, progression, or reward, route through [design/numerical-design.md](design/numerical-design.md).
- Do not continue to full gameplay implementation when balance-sensitive values are random or unexplained.

## Economy design law

Use this law when Codex is asked to create or change currencies, source/sink loops, rewards, upgrades, stamina/energy, shops, ads, gacha, inventory value, or monetization-sensitive systems.

- Do not add an economy until the core loop has a reason to produce and spend value.
- Keep MVP economy to none, score-only, one soft currency, one reward, or one simple upgrade track unless the selected game type requires more.
- Every currency needs a purpose, source, sink, cap or no-cap rule, persistence rule, and validation rule.
- Monetization is not in scope unless explicitly approved by product/design ownership.
- If economy values affect balance, apply numerical design first.
- Do not continue to economy implementation when sources, sinks, reward cadence, and current stage justification are missing.

## Animation presentation law

Use this law when Codex is asked to create or change actor animation states, UI tweens, feedback effects, combat VFX, Spine, AnimationClip, particles, transitions, or audio-visual timing.

- Presentation must express gameplay state, not own gameplay truth.
- Every repeated animation needs a named state, trigger, exit rule, and fallback behavior.
- UI animation must clarify feedback and navigation, not hide state changes.
- Damage, death, reward grant, level clear, and economy changes must not exist only inside animation callbacks.
- Placeholder presentation is allowed, but must be labeled as placeholder.
- If an effect must be seen in runtime, browser preview proof or a declared blocker is required.

## Game production readiness law

Use this law when Codex is asked to build a playable game, start broad implementation, or move from design into real Cocos development.

- Real implementation requires both design readiness and runtime readiness.
- Codex may start only the next approved implementation story, not unlimited development.
- If game type, MVP scope, numerical design, economy design, presentation design, architecture, runtime proof, or first story are missing, apply [production/game-readiness-gate.md](production/game-readiness-gate.md).
- Do not start gameplay MVP implementation when Preview Visibility Gate is required but not passed.
- Do not use local Cocos automation as a substitute for missing game design readiness.
- The first real MVP path should follow [production/first-mvp-success-pipeline.md](production/first-mvp-success-pipeline.md).
- `READY_FOR_IMPLEMENTATION` authorizes only one approved story and must not be treated as game completion.
- `FIRST_MVP_ACCEPTED` means the current MVP story is accepted. It does not mean the full game is complete or that scope may expand.
- `cocos-dev-story` requires the pre-write approval protocol before file creation or modification.
- Cocos-generated companion meta is allowed only when it is directly related to approved files/folders and is included in the approved diff scope.

## Non-negotiable rules

- No asset enters formal production without a defined owner, collaborators, and approver.
- No phase advances without entry criteria, outputs, and exit criteria.
- No major gameplay rule lives only in UI callbacks, animation resources, or random scene scripts.
- No shared framework module is modified casually during production.
- No Cocos project should rely on giant "god scripts", uncontrolled `update()` logic, or unmanaged dynamic loading.
- No single universal level CSV should be forced onto every game type.
- No single `LevelManager` should own config loading, level building, wave flow, spawning, objectives, rewards, UI, and scene logic.
- No automation provider result is accepted as complete without proof appropriate to the task: hierarchy, bindings, Console, preview output, generated files, or PASS/FAIL gate notes.

## AI Game Studio routing

Use AI Game Studio mode when the request mentions Agent teams, workflow commands, project memory, handoff logs, automation providers, MCP-driven Cocos execution, or studio-style production.

Common command routing:

- `cocos-game-brief` -> [core/commands.md](core/commands.md), [templates/core.md](templates/core.md), [production/project-memory.md](production/project-memory.md)
- `cocos-classify-game` -> [design/game-classifier.md](design/game-classifier.md), [design/game-type-templates.md](design/game-type-templates.md)
- `cocos-gdd` -> [production/prd-constraints.md](production/prd-constraints.md), [design/game-type-templates.md](design/game-type-templates.md), [templates/core.md](templates/core.md)
- `cocos-numerical-design` -> [design/numerical-design.md](design/numerical-design.md), [architecture/level-config-schemas.md](architecture/level-config-schemas.md), [protocols/quality-gates.md](protocols/quality-gates.md)
- `cocos-economy-design` -> [design/economy-design.md](design/economy-design.md), [design/numerical-design.md](design/numerical-design.md), [architecture/level-system-extensions.md](architecture/level-system-extensions.md), [protocols/quality-gates.md](protocols/quality-gates.md)
- `cocos-animation-design` -> [design/animation-presentation.md](design/animation-presentation.md), [architecture/cocos-rules.md](architecture/cocos-rules.md), [protocols/quality-gates.md](protocols/quality-gates.md)
- `cocos-character-system-design` -> [design/character-system.md](design/character-system.md), [design/character-animation-model.md](design/character-animation-model.md), [design/asset-semantic-model.md](design/asset-semantic-model.md), [protocols/quality-gates.md](protocols/quality-gates.md)
- `cocos-ui-character-linkage` -> [design/ui-character-action-linkage.md](design/ui-character-action-linkage.md), [design/ui-system-model.md](design/ui-system-model.md), [design/character-system.md](design/character-system.md), [design/character-animation-model.md](design/character-animation-model.md), [design/asset-semantic-model.md](design/asset-semantic-model.md), [protocols/quality-gates.md](protocols/quality-gates.md)
- `cocos-asset-policy` -> [design/asset-policy.md](design/asset-policy.md), [protocols/cocos-resource-risk-matrix.md](protocols/cocos-resource-risk-matrix.md), [protocols/cocos-path-scope.md](protocols/cocos-path-scope.md)
- `cocos-production-readiness` -> [production/game-readiness-gate.md](production/game-readiness-gate.md), [production/mvp-prototype-rules.md](production/mvp-prototype-rules.md), [design/numerical-design.md](design/numerical-design.md), [design/economy-design.md](design/economy-design.md), [design/animation-presentation.md](design/animation-presentation.md), [protocols/quality-gates.md](protocols/quality-gates.md)
- `cocos-skill-self-test` -> [protocols/skill-validation-loop.md](protocols/skill-validation-loop.md), [protocols/skill-test-cases.md](protocols/skill-test-cases.md), [protocols/quality-gates.md](protocols/quality-gates.md)
- `cocos-skill-integration-audit` -> [protocols/ai-command-permissions.md](protocols/ai-command-permissions.md), [protocols/cocos-path-scope.md](protocols/cocos-path-scope.md), [protocols/git-diff-review.md](protocols/git-diff-review.md), [protocols/skill-change-review.md](protocols/skill-change-review.md), [protocols/skill-integration-audit-report.md](protocols/skill-integration-audit-report.md)
- `cocos-project-context` -> [production/project-memory.md](production/project-memory.md)
- `cocos-game-architecture` -> [architecture/cocos-rules.md](architecture/cocos-rules.md), [architecture/project-structure.md](architecture/project-structure.md), [architecture/level-system.md](architecture/level-system.md)
- `cocos-config-schema` -> [architecture/level-config-schemas.md](architecture/level-config-schemas.md), [architecture/level-config-schema-extensions.md](architecture/level-config-schema-extensions.md)
- `cocos-map-model` -> [architecture/map-model-router.md](architecture/map-model-router.md), [design/game-classifier.md](design/game-classifier.md)
- `cocos-map-space-design` -> [architecture/map-model-router.md](architecture/map-model-router.md), [architecture/map-space-model.md](architecture/map-space-model.md)
- `cocos-minimap-navigation` -> [architecture/map-model-router.md](architecture/map-model-router.md), [architecture/minimap-navigation-model.md](architecture/minimap-navigation-model.md)
- `cocos-skill-evolution` -> [core/evolution-system.md](core/evolution-system.md), [protocols/quality-gates.md](protocols/quality-gates.md)
- `cocos-evolution-proposal` -> [core/evolution-system.md](core/evolution-system.md), [templates/evolution-proposal-template.md](templates/evolution-proposal-template.md)
- `cocos-evolution-review` -> [core/evolution-system.md](core/evolution-system.md), [protocols/skill-change-review.md](protocols/skill-change-review.md)
- `cocos-create-story` -> [production/task-decomposition.md](production/task-decomposition.md), [core/commands.md](core/commands.md)
- `cocos-first-implementation-story` -> [production/task-decomposition.md](production/task-decomposition.md), [production/mvp-prototype-rules.md](production/mvp-prototype-rules.md), [production/game-readiness-gate.md](production/game-readiness-gate.md)
- `cocos-dev-story-prewrite` -> [protocols/cocos-dev-story-prewrite.md](protocols/cocos-dev-story-prewrite.md), [protocols/write-approval.md](protocols/write-approval.md), [protocols/cocos-path-scope.md](protocols/cocos-path-scope.md)
- `cocos-dev-story` -> [protocols/choice-execution.md](protocols/choice-execution.md), [protocols/sequential-gate.md](protocols/sequential-gate.md), [protocols/cocos-dev-story-prewrite.md](protocols/cocos-dev-story-prewrite.md), [protocols/cocos-generated-meta.md](protocols/cocos-generated-meta.md), [protocols/runtime-proof.md](protocols/runtime-proof.md)
- `cocos-qa-review` -> [protocols/quality-gates.md](protocols/quality-gates.md), [protocols/runtime-proof.md](protocols/runtime-proof.md), [production/first-mvp-success-pipeline.md](production/first-mvp-success-pipeline.md)
- `cocos-release-review` -> [protocols/quality-gates.md](protocols/quality-gates.md), [templates/reports/mvp-acceptance.md](templates/reports/mvp-acceptance.md), [production/first-mvp-success-pipeline.md](production/first-mvp-success-pipeline.md)
- `cocos-code-review` -> [production/review-system.md](production/review-system.md), [protocols/quality-gates.md](protocols/quality-gates.md), [templates/checklists/core.md](templates/checklists/core.md)
- `cocos-quick-prototype` -> [production/mvp-prototype-rules.md](production/mvp-prototype-rules.md), [protocols/quality-gates.md](protocols/quality-gates.md)

## When responding

- Name the current production mode when strictness or scope control matters.
- Name the current stage when it matters.
- Name the responsible role when ownership matters.
- Call out violations directly when the request would break the system.
- Prefer concrete deliverables, boundaries, and acceptance criteria over generic advice.
- Distinguish between the reusable multi-game-type skill and the current selected example game type.
- Distinguish between local validation as a gate and manual clicking as an implementation detail.
- Distinguish between editor scene proof and browser runtime proof.
- Distinguish between prototype placeholder numbers and production-ready balance.
- Distinguish between core-loop rewards and full economy systems.
- Distinguish between gameplay truth and presentation state.
- Distinguish between design readiness and runtime readiness.
- Distinguish between skill validation and game project validation.
- Treat `next recommended command` as optional advice only, not implicit approval or automatic continuation.

## Common routing

- "Test / debug / close-loop validate this skill." -> Skill Validation Loop and Skill Test Cases before any game implementation.
- "How should we start this game?" -> stage selection, game classification, MVP, numerical design when values matter, economy design when reward/spend loops matter, production readiness, and first-session artifact.
- "What kind of game is this really?" -> game classifier before template or architecture choice.
- "What should this version actually prove?" -> version roadmap system before feature listing.
- "We need a fast prototype but do not want chaos." -> production mode selection before architecture advice.
- "Our project is getting messy." -> ownership audit, architecture audit, and missing gates.
- "Which architecture template fits?" -> classification before architecture template choice.
- "Build the Cocos structure." -> Cocos rules, project structure, runtime boundaries, automation provider policy, and Preview Visibility Gate when local execution is authorized.
- "Build this home page / shop / bag / battle HUD." -> choice execution protocol first, then continuous execution after option selection.
- "Balance this enemy / wave / reward / cost." -> numerical design record and Numerical Design Gate before config or code changes.
- "Design currencies / rewards / shop / ads / gacha / upgrades." -> economy design record and Economy Design Gate before implementation.
- "Design animation / UI motion / hit feedback / VFX / Spine / Tween." -> animation presentation record and Animation Presentation Gate before implementation.
- "Build the game / start the playable / let Codex develop it." -> Game Production Readiness Report before implementation.
- "Do not skip steps / keep the project moving in order." -> sequential gate protocol before advancement.
- "How should levels be configured?" -> level data model selection before table design.
- "How should the level system be coded?" -> core level architecture before optional extensions.
- "Can we ship this?" -> quality gate and release gate review.
- "Write the PRD." -> PRD constraints before drafting.
- "Split this into tasks." -> task decomposition rules before issue writing.
- "How should we use AI on this project?" -> AI collaboration rules before delegating design or code work.
- "Review this professionally." -> review system before acceptance.
- "Run AI Game Studio mode." -> AI Game Studio system, command registry, Agent registry, handoff protocol, and audit log before execution.
