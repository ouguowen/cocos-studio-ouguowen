# Module Index

Default lightweight router for Fast Build Mode.

Use this file only to choose the next small set of documents. Do not load the
whole Skill repository from here. Heavy, historical, proof, agent, example,
semantic, runtime-template, and advanced governance references live in
[core/module-index-extended.md](module-index-extended.md), which is trigger-only
and non-default.

Fast Build Mode must not load the extended index unless the user explicitly asks
for extended routing, proof/example history, Agent workflows, archive review,
advanced templates, semantic deep docs, runtime template assets, or Skill
evolution/governance expansion.

## 1. Default entry and context

- [SKILL.md](../SKILL.md): top-level scope, default boundary, routing, and safety laws
- [core/context-summary.md](context-summary.md): lightweight first-read memory
- [core/context-loading-policy.md](context-loading-policy.md): context budget and anti-overload rules
- [core/operation-modes.md](operation-modes.md): Fast Build, Safe Gate, and Audit Mode routing
- [core/commands.md](commands.md): command names and lightweight command routing

## 2. User-facing onboarding and v1.0 direction

- [README.md](../README.md): English entry, install, commands, safety model, and first-MVP links
- [README.zh-CN.md](../README.zh-CN.md): Chinese beginner entry, safe first prompts, and beginner boundaries
- [docs/quickstart/general.md](../docs/quickstart/general.md): beginner setup and first Skill-loading checks
- [docs/quickstart/first-mvp.md](../docs/quickstart/first-mvp.md): first-MVP command path with prewrite approval visible
- [docs/open-source/v1.0-skill-definition.md](../docs/open-source/v1.0-skill-definition.md): v1.0 endpoint, default boundary, cleanup rules, and non-runtime claims

## 3. Scope, planning, and game type routing

- [design/game-classifier.md](../design/game-classifier.md): classify the game before template choice
- [design/game-type-templates.md](../design/game-type-templates.md): select the closest genre or loop template
- [production/game-readiness-gate.md](../production/game-readiness-gate.md): decide whether real implementation is ready, blocked, or needs scope repair
- [production/first-mvp-success-pipeline.md](../production/first-mvp-success-pipeline.md): first-MVP command chain from brief to acceptance
- [production/task-decomposition.md](../production/task-decomposition.md): production-safe task splitting

## 4. Core architecture and Cocos structure

- [architecture/cocos-baseline-3-8-8.md](../architecture/cocos-baseline-3-8-8.md): Cocos Creator 3.8.8 baseline
- [architecture/cocos-rules.md](../architecture/cocos-rules.md): Cocos engineering rules
- [architecture/project-structure.md](../architecture/project-structure.md): default project layout
- [architecture/template-system.md](../architecture/template-system.md): runtime blueprint family selection
- [architecture/map-model-router.md](../architecture/map-model-router.md): map-model selection before concrete map design
- [architecture/level-data-models.md](../architecture/level-data-models.md): content and level data model selection
- [architecture/level-config-schemas.md](../architecture/level-config-schemas.md): common wave-spawn and stage-table schemas
- [architecture/level-system.md](../architecture/level-system.md): core runtime implementation boundaries

## 5. Safety, approval, proof, and review gates

- [protocols/write-approval.md](../protocols/write-approval.md): file write approval protocol
- [protocols/cocos-dev-story-prewrite.md](../protocols/cocos-dev-story-prewrite.md): required pre-write checklist before real project writes
- [protocols/cocos-path-scope.md](../protocols/cocos-path-scope.md): approved path and Cocos project scope control
- [protocols/ai-command-permissions.md](../protocols/ai-command-permissions.md): AI command allow/block rules
- [protocols/runtime-proof.md](../protocols/runtime-proof.md): runtime proof and proof-channel honesty
- [protocols/quality-gates.md](../protocols/quality-gates.md): promotion and approval gates
- [protocols/git-diff-review.md](../protocols/git-diff-review.md): Git diff review protocol
- [protocols/skill-change-review.md](../protocols/skill-change-review.md): Skill repository change review
- [production/review-system.md](../production/review-system.md): formal gate review rules

## 6. Validation, release, and repository health

- [scripts/validate_skill_docs.py](../scripts/validate_skill_docs.py): docs, links, commands, and safety validation
- [.github/workflows/ci.yml](../.github/workflows/ci.yml): canonical CI workflow for docs validation, pnpm checks, and the complete test suite
- [docs/validation/automation.md](../docs/validation/automation.md): local and GitHub Actions validation guide
- [docs/release/strategy.md](../docs/release/strategy.md): release lanes, gates, blockers, and post-release review
- [docs/release/checklist.md](../docs/release/checklist.md): release readiness checklist
- [docs/open-source/project-roadmap.md](../docs/open-source/project-roadmap.md): version-level roadmap and completed capability history

## 7. Extended routing trigger

Load [core/module-index-extended.md](module-index-extended.md) only when the
request explicitly needs one of these non-default areas:

- Agent team or AI Game Studio handoff workflows
- runtime proof history, local Cocos proof docs, or attack-defense examples
- archive/history review
- advanced templates, runtime template assets, or semantic-model deep docs
- Skill evolution, governance extras, or repository architecture convergence

The extended index preserves useful references without making them part of the
default Fast Build Mode context.

## 8. Trigger-only preservation anchors

These anchors keep validation aware that the references still exist after the
index split. They are not default loading instructions. For details, load
[core/module-index-extended.md](module-index-extended.md) only when explicitly
triggered.

- Trigger-only structure/contribution/history anchors: `docs/structure/repository-structure-plan.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/open-source/roadmap.md`, `docs/examples/general.md`, `docs/archive/update-manifest-v0.2.0.md`, `docs/archive/readme-agent-workflow-section.md`
- Trigger-only GitHub template anchors: `.github/ISSUE_TEMPLATE/bug_report.yml`, `.github/ISSUE_TEMPLATE/feature_request.yml`, `.github/ISSUE_TEMPLATE/safety_report.yml`, `.github/ISSUE_TEMPLATE/documentation.yml`, `.github/ISSUE_TEMPLATE/config.yml`, `.github/pull_request_template.md`
- Trigger-only proof/example anchors: `examples/moonlight-delivery/README.md`, `templates/reports/mvp-acceptance.md`, `docs/success-cases/moonlight-delivery.md`
- Trigger-only safety/deep-design anchors: `protocols/cocos-generated-meta.md`, `design/ui-character-action-linkage.md`, `design/character-system.md`, `design/ui-system-model.md`, `design/character-animation-model.md`, `design/asset-semantic-model.md`
- Trigger-only map/evolution anchors: `architecture/map-space-model.md`, `architecture/minimap-navigation-model.md`, `templates/map-design-template.md`, `core/evolution-system.md`, `templates/evolution-proposal-template.md`
