# Module Index

Use this file to route a request into the correct module family before loading detailed rules.

## 1. Project framing and control

- [PRODUCTION_MODES.md](PRODUCTION_MODES.md): how strict the team should be right now
- [STAGES.md](STAGES.md): where the project is in time
- [VERSION_ROADMAP_SYSTEM.md](VERSION_ROADMAP_SYSTEM.md): why the current version exists and what proves promotion
- [PROJECT_MEMORY_SYSTEM.md](PROJECT_MEMORY_SYSTEM.md): stable project truth across sessions
- [README.zh-CN.md](README.zh-CN.md): Chinese beginner entry, safe first prompts, and beginner boundaries

## 2. Roles, authority, and handoff

- [ROLES.md](ROLES.md): what each role is responsible for
- [ROLE_STAGE_MATRIX.md](ROLE_STAGE_MATRIX.md): what each role does in each stage
- [OWNERSHIP.md](OWNERSHIP.md): who owns which asset class
- [TEAM_SENIORITY_SYSTEM.md](TEAM_SENIORITY_SYSTEM.md): who is senior enough to own or approve work
- [COLLAB_HANDOFF_SYSTEM.md](COLLAB_HANDOFF_SYSTEM.md): how internal, vendor, and AI-assisted handoffs must work
- [OUTSOURCING_COLLAB_RULES.md](OUTSOURCING_COLLAB_RULES.md): external collaboration boundaries

## 3. Game definition and scope

- [GAME_CLASSIFIER_SYSTEM.md](GAME_CLASSIFIER_SYSTEM.md): classify the game before template choice
- [GAME_TYPE_TEMPLATES.md](GAME_TYPE_TEMPLATES.md): select the closest genre or loop template
- [EXAMPLE_PACK_EXPANSION_PLAN.md](EXAMPLE_PACK_EXPANSION_PLAN.md): expand example packs by selected game type without turning the skill into one universal template
- [GAME_PRODUCTION_READINESS_GATE.md](GAME_PRODUCTION_READINESS_GATE.md): decide whether the project is ready for real implementation, design repair, runtime repair, or scope reduction
- [GAME_NUMERICAL_DESIGN.md](GAME_NUMERICAL_DESIGN.md): define gameplay numbers, difficulty, rewards, costs, and balance rules before implementation
- [GAME_ECONOMY_DESIGN.md](GAME_ECONOMY_DESIGN.md): define currencies, sources, sinks, rewards, upgrades, ads, shops, gacha boundaries, and economy validation before implementation
- [ANIMATION_PRESENTATION_RULES.md](ANIMATION_PRESENTATION_RULES.md): define animation states, UI motion, feedback, VFX, Spine/Tween/AnimationClip boundaries, and presentation validation before implementation
- [MVP_PROTOTYPE_RULES.md](MVP_PROTOTYPE_RULES.md): cut to the first real playable product
- [PLAYBOOK_SYSTEM.md](PLAYBOOK_SYSTEM.md): recurring operating procedures
- [PRD_CONSTRAINTS.md](PRD_CONSTRAINTS.md): PRD structure and red flags
- [TASK_DECOMPOSITION_RULES.md](TASK_DECOMPOSITION_RULES.md): production-safe task splitting

## 4. Architecture and content systems

- [COCOS_3_8_8_BASELINE.md](COCOS_3_8_8_BASELINE.md): engine-version baseline for Cocos Creator 3.8.8
- [COCOS_RULES.md](COCOS_RULES.md): engineering law for Cocos Creator 3.8.8
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md): default project layout
- [ARCHITECTURE_TEMPLATE_SYSTEM.md](ARCHITECTURE_TEMPLATE_SYSTEM.md): choose a matching runtime blueprint family
- [LEVEL_DATA_MODELS.md](LEVEL_DATA_MODELS.md): choose the right content and level data model
- [LEVEL_CONFIG_SCHEMAS.md](LEVEL_CONFIG_SCHEMAS.md): common wave-spawn and stage-table schemas
- [LEVEL_CONFIG_SCHEMA_EXTENSIONS.md](LEVEL_CONFIG_SCHEMA_EXTENSIONS.md): optional support tables for wave-spawn projects
- [LEVEL_TEMPLATES.md](LEVEL_TEMPLATES.md): level-specific design and runtime artifacts
- [LEVEL_SYSTEM_ARCHITECTURE.md](LEVEL_SYSTEM_ARCHITECTURE.md): core runtime implementation boundaries
- [LEVEL_SYSTEM_EXTENSIONS.md](LEVEL_SYSTEM_EXTENSIONS.md): optional advanced systems for live service or large-scope games
- [RUNTIME_TEMPLATE_ROUTER.md](RUNTIME_TEMPLATE_ROUTER.md): map requests to the right runtime template assets and scripts

## 5. Delivery, release, and live operations

- [TEST_MATRIX.md](TEST_MATRIX.md): coverage planning
- [ACCEPTANCE_ARTIFACTS.md](ACCEPTANCE_ARTIFACTS.md): evidence before sign-off
- [docs/provider-driven-local-cocos-proof.md](docs/provider-driven-local-cocos-proof.md): local Cocos proof runbook for scene, prefab, binding, Console, and preview evidence
- [docs/codex-cocos-automation-proof.md](docs/codex-cocos-automation-proof.md): Codex local automation proof flow for Cocos provider-driven validation
- [RELEASE_PIPELINE_SYSTEM.md](RELEASE_PIPELINE_SYSTEM.md): build lanes, rollout, and hotfix planning
- [PLATFORM_TARGET_RULES.md](PLATFORM_TARGET_RULES.md): Android, iOS, web, mini-game, and package differences
- [RELEASE_ROLLBACK_PLAYBOOK.md](RELEASE_ROLLBACK_PLAYBOOK.md): rollback discipline
- [OPERATIONS_DATA_SYSTEM.md](OPERATIONS_DATA_SYSTEM.md): retention, monetization, ad, event, and economy review

## 6. Governance, risk, and review

- [QUALITY_GATES.md](QUALITY_GATES.md): promotion and approval gates
- [CHECKLISTS.md](CHECKLISTS.md): review checklists
- [CHECKLIST_EXTENSIONS.md](CHECKLIST_EXTENSIONS.md): specialist review checklists
- [TECH_DEBT_REGISTER.md](TECH_DEBT_REGISTER.md): debt ownership and repayment triggers
- [COST_BUDGET_MODEL.md](COST_BUDGET_MODEL.md): cost control
- [INCIDENT_POSTMORTEM_TEMPLATE.md](INCIDENT_POSTMORTEM_TEMPLATE.md): post-incident review
- [MILESTONE_BURNDOWN_RULES.md](MILESTONE_BURNDOWN_RULES.md): convergence tracking
- [RISK_ESCALATION_SYSTEM.md](RISK_ESCALATION_SYSTEM.md): when the team must stop and escalate
- [REVIEW_SYSTEM.md](REVIEW_SYSTEM.md): formal gate review rules

## 7. AI-assisted work

- [AI_COLLAB_RULES.md](AI_COLLAB_RULES.md): what AI may and may not own
- [ONE_SHOT_GAME_BUILD.md](ONE_SHOT_GAME_BUILD.md): continuous one-request MVP chain that still obeys gates and proof rules
- [SKILL_VALIDATION_LOOP.md](SKILL_VALIDATION_LOOP.md): closed-loop QA process for testing this skill itself
- [SKILL_TEST_CASES.md](SKILL_TEST_CASES.md): repeatable pass/fail test cases for skill behavior
- [PROMPT_LIBRARY.md](PROMPT_LIBRARY.md): high-signal recurring prompt patterns
- [CHOICE_EXECUTION_PROTOCOL.md](CHOICE_EXECUTION_PROTOCOL.md): short-option selection followed by continuous module execution
- [SEQUENTIAL_GATE_PROTOCOL.md](SEQUENTIAL_GATE_PROTOCOL.md): prerequisite-first advancement and anti-step-skipping control
- [ADVANCEMENT_CHAIN_MAP.md](ADVANCEMENT_CHAIN_MAP.md): exact prerequisite chains for projects, modules, level systems, features, and release
- [WORKFLOWS.md](WORKFLOWS.md): high-frequency execution patterns
- [WORKFLOW_EXTENSIONS.md](WORKFLOW_EXTENSIONS.md): specialist execution patterns
