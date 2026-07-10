# Module Index

Use this file to route a request into the correct module family before loading detailed rules.

## 1. Project framing and control

- [core/context-summary.md](context-summary.md): lightweight first-read memory
- [core/context-loading-policy.md](context-loading-policy.md): context budget and anti-overload rules
- [docs/structure/repository-structure-plan.md](../docs/structure/repository-structure-plan.md): staged repository organization plan that keeps current paths canonical until migration batches are approved
- [production/modes.md](../production/modes.md): how strict the team should be right now
- [production/stages.md](../production/stages.md): where the project is in time
- [production/version-roadmap.md](../production/version-roadmap.md): why the current version exists and what proves promotion
- [production/project-memory.md](../production/project-memory.md): stable project truth across sessions
- [README.md](../README.md): English open-source entry, installation, commands, safety model, and first-MVP links
- [README.zh-CN.md](../README.zh-CN.md): Chinese beginner entry, safe first prompts, and beginner boundaries
- [docs/quickstart/general.md](../docs/quickstart/general.md): beginner setup and first Skill-loading checks
- [docs/quickstart/first-mvp.md](../docs/quickstart/first-mvp.md): first-MVP command path from idea to release review
- [docs/open-source/roadmap.md](../docs/open-source/roadmap.md): open-source polish roadmap and contribution priorities
- [docs/open-source/project-roadmap.md](../docs/open-source/project-roadmap.md): version-level AI Game Studio roadmap and completed capability history
- [docs/validation/automation.md](../docs/validation/automation.md): GitHub Actions and local Skill docs validation guide
- [docs/release/strategy.md](../docs/release/strategy.md): release lanes, release gates, blockers, and post-release review
- [docs/release/checklist.md](../docs/release/checklist.md): release readiness checklist for scope, docs, templates, validation, and release decision
- [docs/archive/update-manifest-v0.2.0.md](../docs/archive/update-manifest-v0.2.0.md): historical v0.2.0 update package manifest
- [docs/archive/readme-agent-workflow-section.md](../docs/archive/readme-agent-workflow-section.md): historical README workflow-section patch draft

## 2. Roles, authority, and handoff

- [production/roles.md](../production/roles.md): what each role is responsible for
- [production/role-stage-matrix.md](../production/role-stage-matrix.md): what each role does in each stage
- [production/ownership.md](../production/ownership.md): who owns which asset class
- [production/team-seniority.md](../production/team-seniority.md): who is senior enough to own or approve work
- [production/collab-handoff-system.md](../production/collab-handoff-system.md): how internal, vendor, and AI-assisted handoffs must work
- [production/outsourcing-collab-rules.md](../production/outsourcing-collab-rules.md): external collaboration boundaries
- [CONTRIBUTING.md](../CONTRIBUTING.md): open-source contribution rules and review checklist
- [SECURITY.md](../SECURITY.md): security and AI safety reporting policy
- [.github/ISSUE_TEMPLATE/bug_report.yml](../.github/ISSUE_TEMPLATE/bug_report.yml): structured public bug report template
- [.github/ISSUE_TEMPLATE/feature_request.yml](../.github/ISSUE_TEMPLATE/feature_request.yml): structured feature proposal template
- [.github/ISSUE_TEMPLATE/safety_report.yml](../.github/ISSUE_TEMPLATE/safety_report.yml): public AI safety and path-scope report template
- [.github/ISSUE_TEMPLATE/documentation.yml](../.github/ISSUE_TEMPLATE/documentation.yml): documentation request template
- [.github/ISSUE_TEMPLATE/config.yml](../.github/ISSUE_TEMPLATE/config.yml): issue template routing configuration
- [.github/pull_request_template.md](../.github/pull_request_template.md): PR scope, safety, validation, and release-impact checklist

## 3. Game definition and scope

- [design/game-classifier.md](../design/game-classifier.md): classify the game before template choice
- [design/game-type-templates.md](../design/game-type-templates.md): select the closest genre or loop template
- [design/example-pack-expansion-plan.md](../design/example-pack-expansion-plan.md): expand example packs by selected game type without turning the skill into one universal template
- [docs/examples/general.md](../docs/examples/general.md): applied workflow examples for common Cocos Studio situations
- [production/game-readiness-gate.md](../production/game-readiness-gate.md): decide whether the project is ready for real implementation, design repair, runtime repair, or scope reduction
- [production/first-mvp-success-pipeline.md](../production/first-mvp-success-pipeline.md): proven first-MVP command chain from brief to `FIRST_MVP_ACCEPTED`
- [design/numerical-design.md](../design/numerical-design.md): define gameplay numbers, difficulty, rewards, costs, and balance rules before implementation
- [design/economy-design.md](../design/economy-design.md): define currencies, sources, sinks, rewards, upgrades, ads, shops, gacha boundaries, and economy validation before implementation
- [design/animation-presentation.md](../design/animation-presentation.md): define animation states, UI motion, feedback, VFX, Spine/Tween/AnimationClip boundaries, and presentation validation before implementation
- [design/asset-policy.md](../design/asset-policy.md): asset source, placeholder, import, and forbidden asset boundaries before implementation
- [production/mvp-prototype-rules.md](../production/mvp-prototype-rules.md): cut to the first real playable product
- [production/playbook-system.md](../production/playbook-system.md): recurring operating procedures
- [production/prd-constraints.md](../production/prd-constraints.md): PRD structure and red flags
- [production/task-decomposition.md](../production/task-decomposition.md): production-safe task splitting

## 4. Architecture and content systems

- [architecture/cocos-baseline-3-8-8.md](../architecture/cocos-baseline-3-8-8.md): engine-version baseline for Cocos Creator 3.8.8
- [architecture/cocos-rules.md](../architecture/cocos-rules.md): engineering law for Cocos Creator 3.8.8
- [architecture/project-structure.md](../architecture/project-structure.md): default project layout
- [architecture/template-system.md](../architecture/template-system.md): choose a matching runtime blueprint family
- [architecture/map-model-router.md](../architecture/map-model-router.md): select the correct universal map model before concrete map design
- [architecture/map-space-model.md](../architecture/map-space-model.md): define viewport, world space, layers, camera, Cocos scene structure, and runtime map binding
- [architecture/minimap-navigation-model.md](../architecture/minimap-navigation-model.md): decide whether minimap, navigation hints, reveal, markers, or route guidance are needed
- [design/ui-character-action-linkage.md](../design/ui-character-action-linkage.md): UI input, behavior request, character intent, action state, animation state, visual output, and UI feedback ownership chain
- [design/character-system.md](../design/character-system.md): character identity, behavior, action state, animation state, skeleton boundary, and asset binding boundary
- [design/ui-system-model.md](../design/ui-system-model.md): UI layer, control, feedback, binding, and request-only input semantics
- [design/character-animation-model.md](../design/character-animation-model.md): character animation state, transition, event, and presentation boundaries
- [design/asset-semantic-model.md](../design/asset-semantic-model.md): asset meaning, ownership, import boundary, and behavior-free asset semantics
- [architecture/level-data-models.md](../architecture/level-data-models.md): choose the right content and level data model
- [architecture/level-config-schemas.md](../architecture/level-config-schemas.md): common wave-spawn and stage-table schemas
- [architecture/level-config-schema-extensions.md](../architecture/level-config-schema-extensions.md): optional support tables for wave-spawn projects
- [templates/level-templates.md](../templates/level-templates.md): level-specific design and runtime artifacts
- [templates/map-design-template.md](../templates/map-design-template.md): map model selection and map-space decision template
- [architecture/level-system.md](../architecture/level-system.md): core runtime implementation boundaries
- [architecture/level-system-extensions.md](../architecture/level-system-extensions.md): optional advanced systems for live service or large-scope games
- [architecture/runtime-template-router.md](../architecture/runtime-template-router.md): map requests to the right runtime template assets and scripts

## 5. Delivery, release, and live operations

- [production/test-matrix.md](../production/test-matrix.md): coverage planning
- [production/acceptance-artifacts.md](../production/acceptance-artifacts.md): evidence before sign-off
- [docs/proof/provider-driven-local-cocos.md](../docs/proof/provider-driven-local-cocos.md): local Cocos proof runbook for scene, prefab, binding, Console, and preview evidence
- [docs/proof/codex-cocos-automation.md](../docs/proof/codex-cocos-automation.md): Codex local automation proof flow for Cocos provider-driven validation
- [docs/proof/first-wave-spawn.md](../docs/proof/first-wave-spawn.md): first narrow gameplay proof for spawn-only behavior after config parsing
- [production/release-pipeline.md](../production/release-pipeline.md): build lanes, rollout, and hotfix planning
- [docs/release/strategy.md](../docs/release/strategy.md): open-source Skill release strategy and blockers
- [docs/release/checklist.md](../docs/release/checklist.md): final release checklist before tag or announcement
- [templates/reports/mvp-acceptance.md](../templates/reports/mvp-acceptance.md): `FIRST_MVP_ACCEPTANCE_REPORT.md` template and release decision vocabulary
- [docs/success-cases/moonlight-delivery.md](../docs/success-cases/moonlight-delivery.md): successful Moonlight Delivery Chapter 1 Shell pipeline case, not a universal genre template
- [examples/moonlight-delivery/README.md](../examples/moonlight-delivery/README.md): example entry for the Moonlight Delivery success case
- [production/platform-targets.md](../production/platform-targets.md): Android, iOS, web, mini-game, and package differences
- [production/release-rollback.md](../production/release-rollback.md): rollback discipline
- [production/operations-data.md](../production/operations-data.md): retention, monetization, ad, event, and economy review

## 6. Governance, risk, and review

- [protocols/quality-gates.md](../protocols/quality-gates.md): promotion and approval gates
- [protocols/quality-gate-alignment.md](../protocols/quality-gate-alignment.md): canonical alignment checklist for safety and integration gates
- [templates/checklists/core.md](../templates/checklists/core.md): review checklists
- [templates/checklists/extensions.md](../templates/checklists/extensions.md): specialist review checklists
- [production/tech-debt-register.md](../production/tech-debt-register.md): debt ownership and repayment triggers
- [production/cost-budget.md](../production/cost-budget.md): cost control
- [templates/reports/incident-postmortem.md](../templates/reports/incident-postmortem.md): post-incident review
- [production/milestone-burndown.md](../production/milestone-burndown.md): convergence tracking
- [production/risk-escalation.md](../production/risk-escalation.md): when the team must stop and escalate
- [production/review-system.md](../production/review-system.md): formal gate review rules

## 7. Skill governance and evolution

Use this section only when a request asks to improve, evolve, upgrade, optimize, extend, restructure, or change the Skill itself.

Do not load this section by default for normal game development, `cocos-dev-story`, `cocos-qa-review`, runtime proof, commit, or push.

- [core/evolution-system.md](evolution-system.md): trigger-only controlled Skill evolution levels, evidence requirements, context impact checks, validation, and rollback governance
- [templates/evolution-proposal-template.md](../templates/evolution-proposal-template.md): proposal template for E3 / E4 Skill evolution decisions

## 8. AI-assisted work

- [core/context-summary.md](context-summary.md): lightweight first-read memory
- [core/context-loading-policy.md](context-loading-policy.md): context budget and anti-overload rules
- [agents/ai-collab-rules.md](../agents/ai-collab-rules.md): what AI may and may not own
- [core/operation-modes.md](operation-modes.md): Fast Build, Safe Gate, and Audit Mode routing for development experience
- [production/one-shot-game-build.md](../production/one-shot-game-build.md): continuous one-request MVP chain that still obeys gates and proof rules
- [protocols/skill-validation-loop.md](../protocols/skill-validation-loop.md): closed-loop QA process for testing this skill itself
- [protocols/skill-test-cases.md](../protocols/skill-test-cases.md): repeatable pass/fail test cases for skill behavior
- [protocols/skill-self-test-modes.md](../protocols/skill-self-test-modes.md): self-test modes for static, routing, gate, runtime, audit, safety, diff, and Agent checks
- [protocols/skill-extended-safety-test-cases.md](../protocols/skill-extended-safety-test-cases.md): extended safety tests S01-S08
- [protocols/command-routing-alignment.md](../protocols/command-routing-alignment.md): canonical alignment checklist for safety, runtime, diff, and Agent command routing
- [protocols/ai-command-permissions.md](../protocols/ai-command-permissions.md): command allow/block rules for AI agents
- [protocols/cocos-path-scope.md](../protocols/cocos-path-scope.md): Cocos path-level ownership and risk rules
- [protocols/write-approval.md](../protocols/write-approval.md): file write approval protocol
- [protocols/cocos-dev-story-prewrite.md](../protocols/cocos-dev-story-prewrite.md): required pre-write approval checklist for `cocos-dev-story`
- [protocols/cocos-generated-meta.md](../protocols/cocos-generated-meta.md): Cocos-generated companion `.meta` approval and stop rules
- [protocols/cocos-hook-validation-plan.md](../protocols/cocos-hook-validation-plan.md): hook-inspired validation plan
- [protocols/cocos-automated-checks.md](../protocols/cocos-automated-checks.md): automated check loop
- [protocols/cocos-resource-risk-matrix.md](../protocols/cocos-resource-risk-matrix.md): resource risk classification
- [protocols/git-diff-review.md](../protocols/git-diff-review.md): Git diff review protocol
- [protocols/runtime-proof.md](../protocols/runtime-proof.md): runtime proof protocol
- [protocols/skill-change-review.md](../protocols/skill-change-review.md): Skill change review protocol
- [protocols/skill-integration-audit-report.md](../protocols/skill-integration-audit-report.md): integrated-scope audit artifact for Skill maintenance updates
- [templates/prompts.md](../templates/prompts.md): high-signal recurring prompt patterns
- [protocols/choice-execution.md](../protocols/choice-execution.md): short-option selection followed by continuous module execution
- [protocols/sequential-gate.md](../protocols/sequential-gate.md): prerequisite-first advancement and anti-step-skipping control
- [protocols/advancement-chain-map.md](../protocols/advancement-chain-map.md): exact prerequisite chains for projects, modules, level systems, features, and release
- [templates/workflows/core.md](../templates/workflows/core.md): high-frequency execution patterns
- [templates/workflows/extensions.md](../templates/workflows/extensions.md): specialist execution patterns
- [scripts/validate_skill_docs.py](../scripts/validate_skill_docs.py): standard-library validation script for docs, links, commands, and safety rules
- [.github/workflows/skill-docs-validate.yml](../.github/workflows/skill-docs-validate.yml): GitHub Actions workflow for Skill docs validation

## 8. AI Game Studio Agents

- [agents/registry.md](../agents/registry.md): 12-Agent Cocos Studio registry
- [agents/handoff-protocol.md](../agents/handoff-protocol.md): Agent handoff protocol
- [agents/ai-game-studio-system.md](../agents/ai-game-studio-system.md): AI Game Studio structure
- [agents/audit-log.md](../agents/audit-log.md): Agent audit log
- [agents/message-schema.md](../agents/message-schema.md): Agent message schema
