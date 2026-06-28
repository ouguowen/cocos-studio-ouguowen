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

This skill is not for:

- Cocos2d-x C++ engine guidance.
- Multi-engine game development.
- A single fixed game template.
- A hard dependency on one commercial MCP plugin, one future official MCP plugin, or any provider-specific command dialect.
- Importing the full Cocos manual into the skill.

## Default execution order

1. Identify the current production mode. See [PRODUCTION_MODES.md](PRODUCTION_MODES.md).
2. Identify the current production stage. See [STAGES.md](STAGES.md).
3. Identify role, authority, and asset ownership. See [ROLES.md](ROLES.md), [ROLE_STAGE_MATRIX.md](ROLE_STAGE_MATRIX.md), [OWNERSHIP.md](OWNERSHIP.md), and [TEAM_SENIORITY_SYSTEM.md](TEAM_SENIORITY_SYSTEM.md).
4. Route the request through [MODULE_INDEX.md](MODULE_INDEX.md).
5. If the request asks to debug, audit, validate, test, or close-loop test this skill itself, apply [SKILL_VALIDATION_LOOP.md](SKILL_VALIDATION_LOOP.md) and [SKILL_TEST_CASES.md](SKILL_TEST_CASES.md) before any game implementation.
6. If the request changes this Skill repository itself, apply [AI_COMMAND_PERMISSION_RULES.md](AI_COMMAND_PERMISSION_RULES.md), [COCOS_PATH_SCOPED_RULES.md](COCOS_PATH_SCOPED_RULES.md), [CODEX_WRITE_APPROVAL_PROTOCOL.md](CODEX_WRITE_APPROVAL_PROTOCOL.md), [GIT_DIFF_REVIEW_PROTOCOL.md](GIT_DIFF_REVIEW_PROTOCOL.md), and [SKILL_CHANGE_REVIEW_PROTOCOL.md](SKILL_CHANGE_REVIEW_PROTOCOL.md) before writing files.
7. For most requests, open [WORKFLOWS.md](WORKFLOWS.md) first. Open [WORKFLOW_EXTENSIONS.md](WORKFLOW_EXTENSIONS.md) only for specialist flows.
8. For most project artifacts, open [TEMPLATES.md](TEMPLATES.md) first. Open [LEVEL_TEMPLATES.md](LEVEL_TEMPLATES.md) only for level-content artifacts.
9. If engine-version-specific advice matters, apply [COCOS_3_8_8_BASELINE.md](COCOS_3_8_8_BASELINE.md) before giving engine guidance.
10. If the request asks to start real game implementation, create a playable game, open a large implementation sprint, or let Codex build broadly, apply [GAME_PRODUCTION_READINESS_GATE.md](GAME_PRODUCTION_READINESS_GATE.md) before implementation.
11. If the request includes gameplay stats, enemy stats, difficulty, cost, reward amount, progression speed, or balance-sensitive config, apply [GAME_NUMERICAL_DESIGN.md](GAME_NUMERICAL_DESIGN.md) before implementation.
12. If the request includes currencies, sources, sinks, upgrades, reward cadence, stamina, shop, ads, gacha, inventory value, progression economy, or monetization-sensitive systems, apply [GAME_ECONOMY_DESIGN.md](GAME_ECONOMY_DESIGN.md) before implementation.
13. If the request includes animation states, UI motion, tween effects, combat feedback, hit reactions, death flows, skill VFX, Spine, AnimationClip, particles, or audio-visual timing, apply [ANIMATION_PRESENTATION_RULES.md](ANIMATION_PRESENTATION_RULES.md) before implementation.
14. If the request needs local Cocos engine operation, resolve the current Cocos automation provider before execution. Use provider-neutral intent such as create scene, create node, add component, bind prefab, save scene, run preview, read Console, and return proof.
15. If browser preview output is required, apply the Preview Visibility Gate before script-runtime proof. Editor scene visibility does not prove browser runtime visibility.
16. If the request needs runtime proof, proof-channel selection, or a distinction between docs-only audit proof and game runtime proof, apply [RUNTIME_PROOF_PROTOCOL.md](RUNTIME_PROOF_PROTOCOL.md) before claiming completion.
17. If the request needs runtime code or subsystem boundaries, use [LEVEL_SYSTEM_ARCHITECTURE.md](LEVEL_SYSTEM_ARCHITECTURE.md). Open [LEVEL_SYSTEM_EXTENSIONS.md](LEVEL_SYSTEM_EXTENSIONS.md) only for advanced online, monetization, live-ops, social, or compliance systems.
18. If the request needs approval or stage advancement, apply [QUALITY_GATES.md](QUALITY_GATES.md), [CHECKLISTS.md](CHECKLISTS.md), and [REVIEW_SYSTEM.md](REVIEW_SYSTEM.md). Open [CHECKLIST_EXTENSIONS.md](CHECKLIST_EXTENSIONS.md) only for specialist reviews.
19. If the user asks to build one concrete module such as home page, battle page, shop page, bag page, HUD, or result page, apply [CHOICE_EXECUTION_PROTOCOL.md](CHOICE_EXECUTION_PROTOCOL.md) before implementation.
20. If delivery order, prerequisites, or step-skipping risk matters, apply [SEQUENTIAL_GATE_PROTOCOL.md](SEQUENTIAL_GATE_PROTOCOL.md) before advancing work.
21. If the user asks for AI Game Studio mode, multi-Agent work, command-based production, or Agent handoff, load [AI_GAME_STUDIO_SYSTEM.md](AI_GAME_STUDIO_SYSTEM.md), [COMMANDS.md](COMMANDS.md), [AGENT_REGISTRY.md](AGENT_REGISTRY.md), [AGENT_MESSAGE_SCHEMA.md](AGENT_MESSAGE_SCHEMA.md), [AGENT_HANDOFF_PROTOCOL.md](AGENT_HANDOFF_PROTOCOL.md), [GAME_STUDIO_WORKFLOWS.md](GAME_STUDIO_WORKFLOWS.md), [AGENT_AUDIT_LOG.md](AGENT_AUDIT_LOG.md), and [SKILL_INTEGRATION_AUDIT_REPORT.md](SKILL_INTEGRATION_AUDIT_REPORT.md).

## Cocos automation provider policy

Use this policy only when the user already has, requests, or authorizes a Cocos Creator automation tool/MCP provider.

- Treat the provider as an execution channel, not as the identity of this skill.
- Do not hard-code one commercial MCP provider, one official MCP provider, or one tool-specific command vocabulary into core instructions.
- Prefer capability-based intents: open project, inspect hierarchy, create scene, create node, add component, set property, bind reference, create prefab, save scene, run preview, read Console, return screenshot/proof.
- If a Cocos official automation MCP becomes available later, it may replace the current provider without changing this skill's core production logic.
- If no automation provider is available, fall back to manual Cocos Creator steps without changing the task scope.
- Local Cocos validation is still a result gate when runtime behavior matters, but it can be automation-provider-driven rather than manually clicked by the user.
- Do not expand the skill with provider-specific protocol files unless the user explicitly asks for that provider to become part of the repository.
- Do not use provider availability to bypass [AI_COMMAND_PERMISSION_RULES.md](AI_COMMAND_PERMISSION_RULES.md) or [COCOS_PATH_SCOPED_RULES.md](COCOS_PATH_SCOPED_RULES.md).

## Skill validation law

Use this law when the user is testing, debugging, auditing, or trying to close-loop validate this skill.

- Skill validation is not game development.
- Do not treat one successful ready path as closed-loop validation.
- Run both block-path tests and allow-path tests.
- A skill test must state expected decision, actual decision, allowed command, forbidden actions, proof, result, and repair needs.
- Do not continue implementation when a skill test fails.
- Route skill validation through [SKILL_VALIDATION_LOOP.md](SKILL_VALIDATION_LOOP.md), [SKILL_TEST_CASES.md](SKILL_TEST_CASES.md), [SKILL_SELF_TEST_MODES.md](SKILL_SELF_TEST_MODES.md), [SKILL_EXTENDED_SAFETY_TEST_CASES.md](SKILL_EXTENDED_SAFETY_TEST_CASES.md), [COCOS_HOOK_VALIDATION_PLAN.md](COCOS_HOOK_VALIDATION_PLAN.md), and [COCOS_AUTOMATED_CHECKS.md](COCOS_AUTOMATED_CHECKS.md).

## Preview visibility law

Use this law when browser preview, runtime UI visibility, script runtime proof, or first playable proof matters.

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
- If a number affects difficulty, progression, or reward, route through [GAME_NUMERICAL_DESIGN.md](GAME_NUMERICAL_DESIGN.md).
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
- If game type, MVP scope, numerical design, economy design, presentation design, architecture, runtime proof, or first story are missing, apply [GAME_PRODUCTION_READINESS_GATE.md](GAME_PRODUCTION_READINESS_GATE.md).
- Do not start gameplay MVP implementation when Preview Visibility Gate is required but not passed.
- Do not use local Cocos automation as a substitute for missing game design readiness.

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

- `cocos-game-brief` -> [COMMANDS.md](COMMANDS.md), [TEMPLATES.md](TEMPLATES.md), [PROJECT_MEMORY_SYSTEM.md](PROJECT_MEMORY_SYSTEM.md)
- `cocos-classify-game` -> [GAME_CLASSIFIER_SYSTEM.md](GAME_CLASSIFIER_SYSTEM.md), [GAME_TYPE_TEMPLATES.md](GAME_TYPE_TEMPLATES.md)
- `cocos-gdd` -> [PRD_CONSTRAINTS.md](PRD_CONSTRAINTS.md), [GAME_TYPE_TEMPLATES.md](GAME_TYPE_TEMPLATES.md), [TEMPLATES.md](TEMPLATES.md)
- `cocos-numerical-design` -> [GAME_NUMERICAL_DESIGN.md](GAME_NUMERICAL_DESIGN.md), [LEVEL_CONFIG_SCHEMAS.md](LEVEL_CONFIG_SCHEMAS.md), [QUALITY_GATES.md](QUALITY_GATES.md)
- `cocos-economy-design` -> [GAME_ECONOMY_DESIGN.md](GAME_ECONOMY_DESIGN.md), [GAME_NUMERICAL_DESIGN.md](GAME_NUMERICAL_DESIGN.md), [LEVEL_SYSTEM_EXTENSIONS.md](LEVEL_SYSTEM_EXTENSIONS.md), [QUALITY_GATES.md](QUALITY_GATES.md)
- `cocos-animation-design` -> [ANIMATION_PRESENTATION_RULES.md](ANIMATION_PRESENTATION_RULES.md), [COCOS_RULES.md](COCOS_RULES.md), [QUALITY_GATES.md](QUALITY_GATES.md)
- `cocos-production-readiness` -> [GAME_PRODUCTION_READINESS_GATE.md](GAME_PRODUCTION_READINESS_GATE.md), [MVP_PROTOTYPE_RULES.md](MVP_PROTOTYPE_RULES.md), [GAME_NUMERICAL_DESIGN.md](GAME_NUMERICAL_DESIGN.md), [GAME_ECONOMY_DESIGN.md](GAME_ECONOMY_DESIGN.md), [ANIMATION_PRESENTATION_RULES.md](ANIMATION_PRESENTATION_RULES.md), [QUALITY_GATES.md](QUALITY_GATES.md)
- `cocos-skill-self-test` -> [SKILL_VALIDATION_LOOP.md](SKILL_VALIDATION_LOOP.md), [SKILL_TEST_CASES.md](SKILL_TEST_CASES.md), [QUALITY_GATES.md](QUALITY_GATES.md)
- `cocos-skill-integration-audit` -> [AI_COMMAND_PERMISSION_RULES.md](AI_COMMAND_PERMISSION_RULES.md), [COCOS_PATH_SCOPED_RULES.md](COCOS_PATH_SCOPED_RULES.md), [GIT_DIFF_REVIEW_PROTOCOL.md](GIT_DIFF_REVIEW_PROTOCOL.md), [SKILL_CHANGE_REVIEW_PROTOCOL.md](SKILL_CHANGE_REVIEW_PROTOCOL.md), [SKILL_INTEGRATION_AUDIT_REPORT.md](SKILL_INTEGRATION_AUDIT_REPORT.md)
- `cocos-project-context` -> [PROJECT_MEMORY_SYSTEM.md](PROJECT_MEMORY_SYSTEM.md)
- `cocos-game-architecture` -> [COCOS_RULES.md](COCOS_RULES.md), [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md), [LEVEL_SYSTEM_ARCHITECTURE.md](LEVEL_SYSTEM_ARCHITECTURE.md)
- `cocos-config-schema` -> [LEVEL_CONFIG_SCHEMAS.md](LEVEL_CONFIG_SCHEMAS.md), [LEVEL_CONFIG_SCHEMA_EXTENSIONS.md](LEVEL_CONFIG_SCHEMA_EXTENSIONS.md)
- `cocos-create-story` -> [TASK_DECOMPOSITION_RULES.md](TASK_DECOMPOSITION_RULES.md), [COMMANDS.md](COMMANDS.md)
- `cocos-dev-story` -> [CHOICE_EXECUTION_PROTOCOL.md](CHOICE_EXECUTION_PROTOCOL.md), [SEQUENTIAL_GATE_PROTOCOL.md](SEQUENTIAL_GATE_PROTOCOL.md)
- `cocos-code-review` -> [REVIEW_SYSTEM.md](REVIEW_SYSTEM.md), [QUALITY_GATES.md](QUALITY_GATES.md), [CHECKLISTS.md](CHECKLISTS.md)
- `cocos-quick-prototype` -> [MVP_PROTOTYPE_RULES.md](MVP_PROTOTYPE_RULES.md), [QUALITY_GATES.md](QUALITY_GATES.md)

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
