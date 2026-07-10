# Extended Module Index

Trigger-only, non-default reference index.

Do not load this file during normal Fast Build Mode. Load it only when the user
explicitly asks for extended routing, proof/example history, Agent workflows,
archive review, advanced templates, semantic deep docs, runtime template assets,
or Skill evolution/governance expansion.

This index preserves useful references without making them default product
development direction. It must not trigger Cocos/MCP use, browser preview, real
Cocos project inspection, or continuation of prior proof-chain work unless the
user explicitly requests that project work and approves the active project path
and write scope.

## 1. Agent and AI Game Studio workflows

- [agents/ai-game-studio-system.md](../agents/ai-game-studio-system.md): AI Game Studio structure
- [agents/registry.md](../agents/registry.md): Cocos Studio Agent registry
- [agents/handoff-protocol.md](../agents/handoff-protocol.md): Agent handoff protocol
- [agents/message-schema.md](../agents/message-schema.md): Agent message schema
- [agents/audit-log.md](../agents/audit-log.md): Agent audit log
- [agents/ai-collab-rules.md](../agents/ai-collab-rules.md): what AI may and may not own
- [production/collab-handoff-system.md](../production/collab-handoff-system.md): internal, vendor, and AI-assisted handoff rules
- [production/outsourcing-collab-rules.md](../production/outsourcing-collab-rules.md): external collaboration boundaries

## 2. Validation sandbox proof and examples

Proof and example content is validation sandbox context, not default product
development direction. It preserves evidence and example history only.

- [docs/proof/provider-driven-local-cocos.md](../docs/proof/provider-driven-local-cocos.md): local Cocos proof runbook for scene, prefab, binding, Console, and preview evidence
- [docs/proof/codex-cocos-automation.md](../docs/proof/codex-cocos-automation.md): Codex automation proof flow for provider-driven Cocos checks
- [docs/proof/first-wave-spawn.md](../docs/proof/first-wave-spawn.md): spawn-only proof history after config parsing
- [examples/attack-defense-city/README.md](../examples/attack-defense-city/README.md): attack-defense example pack and proof sandbox history
- [docs/success-cases/moonlight-delivery.md](../docs/success-cases/moonlight-delivery.md): Moonlight Delivery Chapter 1 Shell pipeline case
- [examples/moonlight-delivery/README.md](../examples/moonlight-delivery/README.md): Moonlight Delivery example entry

Prior AIGameStudioFirstGame / City Battle proof work must not be inspected,
continued, or treated as default direction unless explicitly requested as
approved project work.

## 3. Archive and historical records

- [docs/archive/update-manifest-v0.2.0.md](../docs/archive/update-manifest-v0.2.0.md): historical v0.2.0 update package manifest
- [docs/archive/readme-agent-workflow-section.md](../docs/archive/readme-agent-workflow-section.md): historical README workflow-section patch draft

Archive files are historical records. Do not delete files required by validation
or any module index without paired cleanup.

## 4. Advanced templates and runtime template assets

- [templates/workflows/core.md](../templates/workflows/core.md): high-frequency execution patterns
- [templates/workflows/extensions.md](../templates/workflows/extensions.md): specialist execution patterns
- [templates/core.md](../templates/core.md): common project artifacts
- [templates/level-templates.md](../templates/level-templates.md): level-specific design and runtime artifacts
- [templates/map-design-template.md](../templates/map-design-template.md): map model and map-space decision template
- [templates/checklists/core.md](../templates/checklists/core.md): review checklists
- [templates/checklists/extensions.md](../templates/checklists/extensions.md): specialist review checklists
- [templates/reports/mvp-acceptance.md](../templates/reports/mvp-acceptance.md): MVP acceptance report template
- [templates/reports/incident-postmortem.md](../templates/reports/incident-postmortem.md): post-incident review template
- [templates/prompts.md](../templates/prompts.md): recurring prompt patterns
- [architecture/runtime-template-router.md](../architecture/runtime-template-router.md): route requests to runtime template assets and scripts

## 5. Semantic and presentation deep docs

- [design/ui-character-action-linkage.md](../design/ui-character-action-linkage.md): UI input to action and visual feedback ownership chain
- [design/character-system.md](../design/character-system.md): character identity, behavior, action state, animation state, and skeleton boundary
- [design/ui-system-model.md](../design/ui-system-model.md): UI layer, control, feedback, binding, and request-only input semantics
- [design/character-animation-model.md](../design/character-animation-model.md): animation state, transition, event, and presentation boundaries
- [design/asset-semantic-model.md](../design/asset-semantic-model.md): asset meaning, ownership, import boundary, and behavior-free semantics
- [design/animation-presentation.md](../design/animation-presentation.md): animation states, UI motion, feedback, VFX, Spine/Tween/AnimationClip boundaries
- [design/asset-policy.md](../design/asset-policy.md): asset source, placeholder, import, and forbidden asset boundaries
- [design/numerical-design.md](../design/numerical-design.md): gameplay numbers, difficulty, rewards, costs, and balance rules
- [design/economy-design.md](../design/economy-design.md): currencies, sources, sinks, rewards, upgrades, ads, shops, gacha, and economy validation

## 6. Advanced architecture and live operations

- [architecture/map-space-model.md](../architecture/map-space-model.md): viewport, world space, layers, camera, scene structure, and map binding
- [architecture/minimap-navigation-model.md](../architecture/minimap-navigation-model.md): minimap, navigation hints, reveal, markers, and route guidance decisions
- [architecture/level-config-schema-extensions.md](../architecture/level-config-schema-extensions.md): optional support tables for wave-spawn projects
- [architecture/level-system-extensions.md](../architecture/level-system-extensions.md): optional advanced systems for live service or large-scope games
- [production/test-matrix.md](../production/test-matrix.md): coverage planning
- [production/acceptance-artifacts.md](../production/acceptance-artifacts.md): evidence before sign-off
- [production/release-pipeline.md](../production/release-pipeline.md): build lanes, rollout, and hotfix planning
- [production/release-rollback.md](../production/release-rollback.md): rollback discipline
- [production/platform-targets.md](../production/platform-targets.md): Android, iOS, web, mini-game, and package differences
- [production/operations-data.md](../production/operations-data.md): retention, monetization, ad, event, and economy review
- [production/tech-debt-register.md](../production/tech-debt-register.md): debt ownership and repayment triggers
- [production/cost-budget.md](../production/cost-budget.md): cost control
- [production/milestone-burndown.md](../production/milestone-burndown.md): convergence tracking
- [production/risk-escalation.md](../production/risk-escalation.md): escalation triggers

## 7. Governance, validation, and evolution extras

- [docs/open-source/extension-boundary.md](../docs/open-source/extension-boundary.md): trigger-only core/extension boundary, promotion rules, rollback discipline, and multi-engine separation
- [docs/open-source/v1.0-architecture-convergence-report.md](../docs/open-source/v1.0-architecture-convergence-report.md): trigger-only v1.0 convergence status, layer structure, cleanup position, and next-stage recommendations
- [core/evolution-system.md](evolution-system.md): controlled Skill evolution levels, evidence, context impact checks, validation, and rollback
- [templates/evolution-proposal-template.md](../templates/evolution-proposal-template.md): E3 / E4 Skill evolution proposal template
- [protocols/skill-validation-loop.md](../protocols/skill-validation-loop.md): closed-loop QA process for testing this Skill
- [protocols/skill-test-cases.md](../protocols/skill-test-cases.md): repeatable pass/fail Skill behavior tests
- [protocols/skill-self-test-modes.md](../protocols/skill-self-test-modes.md): static, routing, gate, runtime, audit, safety, diff, and Agent checks
- [protocols/skill-extended-safety-test-cases.md](../protocols/skill-extended-safety-test-cases.md): extended safety tests
- [protocols/command-routing-alignment.md](../protocols/command-routing-alignment.md): command routing alignment checklist
- [protocols/quality-gate-alignment.md](../protocols/quality-gate-alignment.md): quality gate alignment checklist
- [protocols/cocos-generated-meta.md](../protocols/cocos-generated-meta.md): companion `.meta` approval and stop rules
- [protocols/cocos-hook-validation-plan.md](../protocols/cocos-hook-validation-plan.md): hook-inspired validation plan
- [protocols/cocos-automated-checks.md](../protocols/cocos-automated-checks.md): automated check loop
- [protocols/cocos-resource-risk-matrix.md](../protocols/cocos-resource-risk-matrix.md): resource risk classification
- [protocols/choice-execution.md](../protocols/choice-execution.md): short-option selection followed by continuous module execution
- [protocols/sequential-gate.md](../protocols/sequential-gate.md): prerequisite-first advancement and anti-step-skipping control
- [protocols/advancement-chain-map.md](../protocols/advancement-chain-map.md): prerequisite chains for projects, modules, level systems, features, and release
- [protocols/skill-integration-audit-report.md](../protocols/skill-integration-audit-report.md): integrated-scope audit artifact for Skill maintenance updates

## 8. Open-source contribution support

- [CONTRIBUTING.md](../CONTRIBUTING.md): contribution rules and review checklist
- [SECURITY.md](../SECURITY.md): security and AI safety reporting policy
- [.github/ISSUE_TEMPLATE/bug_report.yml](../.github/ISSUE_TEMPLATE/bug_report.yml): bug report template
- [.github/ISSUE_TEMPLATE/feature_request.yml](../.github/ISSUE_TEMPLATE/feature_request.yml): feature proposal template
- [.github/ISSUE_TEMPLATE/safety_report.yml](../.github/ISSUE_TEMPLATE/safety_report.yml): AI safety and path-scope report template
- [.github/ISSUE_TEMPLATE/documentation.yml](../.github/ISSUE_TEMPLATE/documentation.yml): documentation request template
- [.github/ISSUE_TEMPLATE/config.yml](../.github/ISSUE_TEMPLATE/config.yml): issue template routing configuration
- [.github/pull_request_template.md](../.github/pull_request_template.md): PR scope, safety, validation, and release-impact checklist
