# Module Index

Use this file to route a request into the correct module family before loading detailed rules.

## 1. Project framing and control

- [PRODUCTION_MODES.md](PRODUCTION_MODES.md): how strict the team should be right now
- [STAGES.md](STAGES.md): where the project is in time
- [VERSION_ROADMAP_SYSTEM.md](VERSION_ROADMAP_SYSTEM.md): why the current version exists and what proves promotion
- [PROJECT_MEMORY_SYSTEM.md](PROJECT_MEMORY_SYSTEM.md): stable project truth across sessions
- [README.md](README.md): English open-source entry, installation, commands, safety model, and first-MVP links
- [README.zh-CN.md](README.zh-CN.md): Chinese beginner entry, safe first prompts, and beginner boundaries
- [docs/quickstart-first-mvp.md](docs/quickstart-first-mvp.md): first-MVP command path from idea to release review
- [docs/open-source-roadmap.md](docs/open-source-roadmap.md): open-source polish roadmap and contribution priorities
- [docs/automation-validation.md](docs/automation-validation.md): GitHub Actions and local Skill docs validation guide
- [docs/release-strategy.md](docs/release-strategy.md): release lanes, release gates, blockers, and post-release review
- [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md): release readiness checklist for scope, docs, templates, validation, and release decision

## 2. Roles, authority, and handoff

- [ROLES.md](ROLES.md): what each role is responsible for
- [ROLE_STAGE_MATRIX.md](ROLE_STAGE_MATRIX.md): what each role does in each stage
- [OWNERSHIP.md](OWNERSHIP.md): who owns which asset class
- [TEAM_SENIORITY_SYSTEM.md](TEAM_SENIORITY_SYSTEM.md): who is senior enough to own or approve work
- [COLLAB_HANDOFF_SYSTEM.md](COLLAB_HANDOFF_SYSTEM.md): how internal, vendor, and AI-assisted handoffs must work
- [OUTSOURCING_COLLAB_RULES.md](OUTSOURCING_COLLAB_RULES.md): external collaboration boundaries
- [CONTRIBUTING.md](CONTRIBUTING.md): open-source contribution rules and review checklist
- [SECURITY.md](SECURITY.md): security and AI safety reporting policy
- [.github/ISSUE_TEMPLATE/bug_report.yml](.github/ISSUE_TEMPLATE/bug_report.yml): structured public bug report template
- [.github/ISSUE_TEMPLATE/feature_request.yml](.github/ISSUE_TEMPLATE/feature_request.yml): structured feature proposal template
- [.github/ISSUE_TEMPLATE/safety_report.yml](.github/ISSUE_TEMPLATE/safety_report.yml): public AI safety and path-scope report template
- [.github/ISSUE_TEMPLATE/documentation.yml](.github/ISSUE_TEMPLATE/documentation.yml): documentation request template
- [.github/ISSUE_TEMPLATE/config.yml](.github/ISSUE_TEMPLATE/config.yml): issue template routing configuration
- [.github/pull_request_template.md](.github/pull_request_template.md): PR scope, safety, validation, and release-impact checklist

## 3. Game definition and scope

- [GAME_CLASSIFIER_SYSTEM.md](GAME_CLASSIFIER_SYSTEM.md): classify the game before template choice
- [GAME_TYPE_TEMPLATES.md](GAME_TYPE_TEMPLATES.md): select the closest genre or loop template
- [EXAMPLE_PACK_EXPANSION_PLAN.md](EXAMPLE_PACK_EXPANSION_PLAN.md): expand example packs by selected game type without turning the skill into one universal template
- [GAME_PRODUCTION_READINESS_GATE.md](GAME_PRODUCTION_READINESS_GATE.md): decide whether the project is ready for real implementation, design repair, runtime repair, or scope reduction
- [FIRST_MVP_SUCCESS_PIPELINE.md](FIRST_MVP_SUCCESS_PIPELINE.md): proven first-MVP command chain from brief to `FIRST_MVP_ACCEPTED`
- [GAME_NUMERICAL_DESIGN.md](GAME_NUMERICAL_DESIGN.md): define gameplay numbers, difficulty, rewards, costs, and balance rules before implementation
- [GAME_ECONOMY_DESIGN.md](GAME_ECONOMY_DESIGN.md): define currencies, sources, sinks, rewards, upgrades, ads, shops, gacha boundaries, and economy validation before implementation
- [ANIMATION_PRESENTATION_RULES.md](ANIMATION_PRESENTATION_RULES.md): define animation states, UI motion, feedback, VFX, Spine/Tween/AnimationClip boundaries, and presentation validation before implementation
- [ASSET_POLICY.md](ASSET_POLICY.md): asset source, placeholder, import, and forbidden asset boundaries before implementation
- [MVP_PROTOTYPE_RULES.md](MVP_PROTOTYPE_RULES.md): cut to the first real playable product
- [PLAYBOOK_SYSTEM.md](PLAYBOOK_SYSTEM.md): recurring operating procedures
- [PRD_CONSTRAINTS.md](PRD_CONSTRAINTS.md): PRD structure and red flags
- [TASK_DECOMPOSITION_RULES.md](TASK_DECOMPOSITION_RULES.md): production-safe task splitting

## 4. Architecture and content systems

- [COCOS_3_8_8_BASELINE.md](COCOS_3_8_8_BASELINE.md): engine-version baseline for Cocos Creator 3.8.8
- [COCOS_RULES.md](COCOS_RULES.md): engineering law for Cocos Creator 3.8.8
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md): default project layout
- [ARCHITECTURE_TEMPLATE_SYSTEM.md](ARCHITECTURE_TEMPLATE_SYSTEM.md): choose a matching runtime blueprint family
- [UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md](UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md): UI input, behavior request, character intent, action state, animation state, visual output, and UI feedback ownership chain
- [CHARACTER_SYSTEM.md](CHARACTER_SYSTEM.md): character identity, behavior, action state, animation state, skeleton boundary, and asset binding boundary
- [UI_SYSTEM_MODEL.md](UI_SYSTEM_MODEL.md): UI layer, control, feedback, binding, and request-only input semantics
- [CHARACTER_ANIMATION_MODEL.md](CHARACTER_ANIMATION_MODEL.md): character animation state, transition, event, and presentation boundaries
- [ASSET_SEMANTIC_MODEL.md](ASSET_SEMANTIC_MODEL.md): asset meaning, ownership, import boundary, and behavior-free asset semantics
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
- [docs/first-wave-spawn-proof.md](docs/first-wave-spawn-proof.md): first narrow gameplay proof for spawn-only behavior after config parsing
- [RELEASE_PIPELINE_SYSTEM.md](RELEASE_PIPELINE_SYSTEM.md): build lanes, rollout, and hotfix planning
- [docs/release-strategy.md](docs/release-strategy.md): open-source Skill release strategy and blockers
- [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md): final release checklist before tag or announcement
- [MVP_ACCEPTANCE_REPORT_TEMPLATE.md](MVP_ACCEPTANCE_REPORT_TEMPLATE.md): `FIRST_MVP_ACCEPTANCE_REPORT.md` template and release decision vocabulary
- [SUCCESS_CASE_MOONLIGHT_DELIVERY.md](SUCCESS_CASE_MOONLIGHT_DELIVERY.md): successful Moonlight Delivery Chapter 1 Shell pipeline case, not a universal genre template
- [examples/moonlight-delivery/README.md](examples/moonlight-delivery/README.md): example entry for the Moonlight Delivery success case
- [PLATFORM_TARGET_RULES.md](PLATFORM_TARGET_RULES.md): Android, iOS, web, mini-game, and package differences
- [RELEASE_ROLLBACK_PLAYBOOK.md](RELEASE_ROLLBACK_PLAYBOOK.md): rollback discipline
- [OPERATIONS_DATA_SYSTEM.md](OPERATIONS_DATA_SYSTEM.md): retention, monetization, ad, event, and economy review

## 6. Governance, risk, and review

- [QUALITY_GATES.md](QUALITY_GATES.md): promotion and approval gates
- [QUALITY_GATE_ALIGNMENT.md](QUALITY_GATE_ALIGNMENT.md): canonical alignment checklist for safety and integration gates
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
- [SKILL_OPERATION_MODES.md](SKILL_OPERATION_MODES.md): Fast Build, Safe Gate, and Audit Mode routing for development experience
- [ONE_SHOT_GAME_BUILD.md](ONE_SHOT_GAME_BUILD.md): continuous one-request MVP chain that still obeys gates and proof rules
- [SKILL_VALIDATION_LOOP.md](SKILL_VALIDATION_LOOP.md): closed-loop QA process for testing this skill itself
- [SKILL_TEST_CASES.md](SKILL_TEST_CASES.md): repeatable pass/fail test cases for skill behavior
- [SKILL_SELF_TEST_MODES.md](SKILL_SELF_TEST_MODES.md): self-test modes for static, routing, gate, runtime, audit, safety, diff, and Agent checks
- [SKILL_EXTENDED_SAFETY_TEST_CASES.md](SKILL_EXTENDED_SAFETY_TEST_CASES.md): extended safety tests S01-S08
- [COMMAND_ROUTING_ALIGNMENT.md](COMMAND_ROUTING_ALIGNMENT.md): canonical alignment checklist for safety, runtime, diff, and Agent command routing
- [AI_COMMAND_PERMISSION_RULES.md](AI_COMMAND_PERMISSION_RULES.md): command allow/block rules for AI agents
- [COCOS_PATH_SCOPED_RULES.md](COCOS_PATH_SCOPED_RULES.md): Cocos path-level ownership and risk rules
- [CODEX_WRITE_APPROVAL_PROTOCOL.md](CODEX_WRITE_APPROVAL_PROTOCOL.md): file write approval protocol
- [COCOS_DEV_STORY_PREWRITE_PROTOCOL.md](COCOS_DEV_STORY_PREWRITE_PROTOCOL.md): required pre-write approval checklist for `cocos-dev-story`
- [COCOS_GENERATED_META_POLICY.md](COCOS_GENERATED_META_POLICY.md): Cocos-generated companion `.meta` approval and stop rules
- [COCOS_HOOK_VALIDATION_PLAN.md](COCOS_HOOK_VALIDATION_PLAN.md): hook-inspired validation plan
- [COCOS_AUTOMATED_CHECKS.md](COCOS_AUTOMATED_CHECKS.md): automated check loop
- [COCOS_RESOURCE_RISK_MATRIX.md](COCOS_RESOURCE_RISK_MATRIX.md): resource risk classification
- [GIT_DIFF_REVIEW_PROTOCOL.md](GIT_DIFF_REVIEW_PROTOCOL.md): Git diff review protocol
- [RUNTIME_PROOF_PROTOCOL.md](RUNTIME_PROOF_PROTOCOL.md): runtime proof protocol
- [SKILL_CHANGE_REVIEW_PROTOCOL.md](SKILL_CHANGE_REVIEW_PROTOCOL.md): Skill change review protocol
- [SKILL_INTEGRATION_AUDIT_REPORT.md](SKILL_INTEGRATION_AUDIT_REPORT.md): integrated-scope audit artifact for Skill maintenance updates
- [PROMPT_LIBRARY.md](PROMPT_LIBRARY.md): high-signal recurring prompt patterns
- [CHOICE_EXECUTION_PROTOCOL.md](CHOICE_EXECUTION_PROTOCOL.md): short-option selection followed by continuous module execution
- [SEQUENTIAL_GATE_PROTOCOL.md](SEQUENTIAL_GATE_PROTOCOL.md): prerequisite-first advancement and anti-step-skipping control
- [ADVANCEMENT_CHAIN_MAP.md](ADVANCEMENT_CHAIN_MAP.md): exact prerequisite chains for projects, modules, level systems, features, and release
- [WORKFLOWS.md](WORKFLOWS.md): high-frequency execution patterns
- [WORKFLOW_EXTENSIONS.md](WORKFLOW_EXTENSIONS.md): specialist execution patterns
- [scripts/validate_skill_docs.py](scripts/validate_skill_docs.py): standard-library validation script for docs, links, commands, and safety rules
- [.github/workflows/skill-docs-validate.yml](.github/workflows/skill-docs-validate.yml): GitHub Actions workflow for Skill docs validation

## 8. AI Game Studio Agents

- [AGENT_REGISTRY.md](AGENT_REGISTRY.md): 12-Agent Cocos Studio registry
- [AGENT_HANDOFF_PROTOCOL.md](AGENT_HANDOFF_PROTOCOL.md): Agent handoff protocol
- [AI_GAME_STUDIO_SYSTEM.md](AI_GAME_STUDIO_SYSTEM.md): AI Game Studio structure
- [AGENT_AUDIT_LOG.md](AGENT_AUDIT_LOG.md): Agent audit log
- [AGENT_MESSAGE_SCHEMA.md](AGENT_MESSAGE_SCHEMA.md): Agent message schema
