# Repository Structure Plan

Use this file to guide repository organization without breaking current Skill routing, Markdown links, validation, or user workflows.

## Purpose

The repository has grown from a small Skill into a production-control system with context rules, command routing, gates, design policies, runtime templates, examples, scripts, and Agent definitions.

The goal is to make the repository easier to scan and safer for AI agents to load without doing a risky one-shot file move.

## Current rule

Current root-level paths remain canonical until a specific migration batch is approved, implemented, validated, and documented.

Do not move files just because the future directory exists in this plan.

Do not rename or relocate `.scene`, `.prefab`, `.anim`, `.meta`, or live game-project files as part of Skill repository cleanup.

## Target directory model

```text
/
  SKILL.md
  README.md
  README.zh-CN.md
  CHANGELOG.md
  LICENSE
  package.json

  core/
    context/
    modes/
    commands/
    routing/

  protocols/
    safety/
    approval/
    runtime-proof/
    review/
    validation/

  production/
    stages/
    roles/
    ownership/
    planning/
    readiness/

  design/
    game-types/
    economy/
    numerical/
    animation/
    assets/
    characters/
    ui/

  architecture/
    cocos/
    level-system/
    runtime-templates/

  templates/
    workflows/
    checklists/
    reports/

  agents/
  examples/
  docs/
  scripts/
```

## Future module mapping

### Root entry files

- `SKILL.md`
- `README.md`
- `README.zh-CN.md`
- `CHANGELOG.md`
- `LICENSE`
- `package.json`

Root files should remain minimal and stable.

### `core/`

Future home for first-load and routing files:

- `SKILL_CONTEXT_SUMMARY.md`
- `CONTEXT_LOADING_POLICY.md`
- `SKILL_OPERATION_MODES.md`
- `COMMANDS.md`
- `MODULE_INDEX.md`

### `protocols/`

Home for migrated rule and proof protocols, with unmigrated protocols kept at their current root paths until their batch is approved:

- `protocols/ai-command-permissions.md`
- `protocols/write-approval.md`
- `protocols/cocos-dev-story-prewrite.md`
- `protocols/cocos-generated-meta.md`
- `protocols/runtime-proof.md`
- `protocols/git-diff-review.md`
- `protocols/skill-change-review.md`
- `protocols/skill-validation-loop.md`
- `protocols/skill-test-cases.md`
- `protocols/quality-gates.md`

### `production/`

Future home for project control and ownership:

- `production/modes.md`
- `production/stages.md`
- `production/roles.md`
- `production/role-stage-matrix.md`
- `production/ownership.md`
- `production/team-seniority.md`
- `production/project-memory.md`
- `production/game-readiness-gate.md`

### `design/`

Future home for game design boundaries:

- `design/game-classifier.md`
- `design/game-type-templates.md`
- `design/numerical-design.md`
- `design/economy-design.md`
- `design/animation-presentation.md`
- `design/asset-policy.md`
- `design/asset-semantic-model.md`
- `design/character-system.md`
- `design/ui-system-model.md`
- `design/ui-character-action-linkage.md`
- `design/character-animation-model.md`

### `architecture/`

Future home for Cocos and runtime architecture:

- `architecture/cocos-baseline-3-8-8.md`
- `architecture/cocos-rules.md`
- `architecture/project-structure.md`
- `architecture/template-system.md`
- `architecture/level-system.md`
- `architecture/level-system-extensions.md`
- `architecture/level-data-models.md`
- `architecture/level-config-schemas.md`
- `architecture/level-config-schema-extensions.md`
- `architecture/runtime-template-router.md`
- `assets/cocos-config-runtime-template/`
- `assets/cocos-level-runtime-template/`

### `templates/`

Future home for reusable non-runtime artifacts:

- `TEMPLATES.md`
- `LEVEL_TEMPLATES.md`
- `WORKFLOWS.md`
- `WORKFLOW_EXTENSIONS.md`
- `templates/checklists/core.md`
- `templates/checklists/extensions.md`
- `templates/reports/mvp-acceptance.md`
- `templates/reports/incident-postmortem.md`

## Migration phases

### Phase 0: Index-first stabilization

Status: completed.

- Keep all existing file paths unchanged.
- Add this plan to [MODULE_INDEX.md](MODULE_INDEX.md).
- Add validation coverage so the plan stays visible.
- Do not move files.

### Phase 1: Low-risk documentation migration

Status: in progress.

Move only small documentation groups after validation coverage exists.

Completed batch 1:

- `docs/open-source-roadmap.md` -> `docs/open-source/roadmap.md`
- `docs/release-strategy.md` -> `docs/release/strategy.md`
- `RELEASE_CHECKLIST.md` -> `docs/release/checklist.md`

Completed batch 2:

- `docs/provider-driven-local-cocos-proof.md` -> `docs/proof/provider-driven-local-cocos.md`
- `docs/codex-cocos-automation-proof.md` -> `docs/proof/codex-cocos-automation.md`
- `docs/first-wave-spawn-proof.md` -> `docs/proof/first-wave-spawn.md`

Completed batch 3:

- `docs/quickstart-first-mvp.md` -> `docs/quickstart/first-mvp.md`
- `docs/automation-validation.md` -> `docs/validation/automation.md`

Completed batch 4:

- `CHECKLISTS.md` -> `templates/checklists/core.md`
- `CHECKLIST_EXTENSIONS.md` -> `templates/checklists/extensions.md`
- `MVP_ACCEPTANCE_REPORT_TEMPLATE.md` -> `templates/reports/mvp-acceptance.md`
- `INCIDENT_POSTMORTEM_TEMPLATE.md` -> `templates/reports/incident-postmortem.md`

Completed batch 5:

- `QUICK_START.md` -> `docs/quickstart/general.md`
- `EXAMPLES.md` -> `docs/examples/general.md`
- `ROADMAP.md` -> `docs/open-source/project-roadmap.md`
- `UPDATE_MANIFEST.md` -> `docs/archive/update-manifest-v0.2.0.md`
- `README_AGENT_WORKFLOW_SECTION.md` -> `docs/archive/readme-agent-workflow-section.md`

Completed batch 6:

- `CODEX_WRITE_APPROVAL_PROTOCOL.md` -> `protocols/write-approval.md`
- `COCOS_DEV_STORY_PREWRITE_PROTOCOL.md` -> `protocols/cocos-dev-story-prewrite.md`
- `COCOS_GENERATED_META_POLICY.md` -> `protocols/cocos-generated-meta.md`

Completed batch 7:

- `AI_COMMAND_PERMISSION_RULES.md` -> `protocols/ai-command-permissions.md`
- `COCOS_PATH_SCOPED_RULES.md` -> `protocols/cocos-path-scope.md`
- `RUNTIME_PROOF_PROTOCOL.md` -> `protocols/runtime-proof.md`
- `GIT_DIFF_REVIEW_PROTOCOL.md` -> `protocols/git-diff-review.md`
- `SKILL_CHANGE_REVIEW_PROTOCOL.md` -> `protocols/skill-change-review.md`
- `SKILL_VALIDATION_LOOP.md` -> `protocols/skill-validation-loop.md`
- `SKILL_TEST_CASES.md` -> `protocols/skill-test-cases.md`
- `QUALITY_GATES.md` -> `protocols/quality-gates.md`
- `QUALITY_GATE_ALIGNMENT.md` -> `protocols/quality-gate-alignment.md`
- `COMMAND_ROUTING_ALIGNMENT.md` -> `protocols/command-routing-alignment.md`
- `COCOS_AUTOMATED_CHECKS.md` -> `protocols/cocos-automated-checks.md`
- `COCOS_HOOK_VALIDATION_PLAN.md` -> `protocols/cocos-hook-validation-plan.md`
- `COCOS_RESOURCE_RISK_MATRIX.md` -> `protocols/cocos-resource-risk-matrix.md`
- `SKILL_EXTENDED_SAFETY_TEST_CASES.md` -> `protocols/skill-extended-safety-test-cases.md`
- `SKILL_SELF_TEST_MODES.md` -> `protocols/skill-self-test-modes.md`
- `SKILL_SELF_TEST_RUN_REPORT.md` -> `protocols/skill-self-test-run-report.md`
- `SKILL_STATIC_AUDIT_REPORT.md` -> `protocols/skill-static-audit-report.md`
- `SKILL_INTEGRATION_AUDIT_REPORT.md` -> `protocols/skill-integration-audit-report.md`

Completed batch 8:

- `PRODUCTION_MODES.md` -> `production/modes.md`
- `STAGES.md` -> `production/stages.md`
- `ROLES.md` -> `production/roles.md`
- `ROLE_STAGE_MATRIX.md` -> `production/role-stage-matrix.md`
- `OWNERSHIP.md` -> `production/ownership.md`
- `TEAM_SENIORITY_SYSTEM.md` -> `production/team-seniority.md`
- `PROJECT_MEMORY_SYSTEM.md` -> `production/project-memory.md`
- `GAME_PRODUCTION_READINESS_GATE.md` -> `production/game-readiness-gate.md`
- `ACCEPTANCE_ARTIFACTS.md` -> `production/acceptance-artifacts.md`
- `MILESTONE_BURNDOWN_RULES.md` -> `production/milestone-burndown.md`
- `RISK_ESCALATION_SYSTEM.md` -> `production/risk-escalation.md`
- `REVIEW_SYSTEM.md` -> `production/review-system.md`
- `COST_BUDGET_MODEL.md` -> `production/cost-budget.md`
- `TECH_DEBT_REGISTER.md` -> `production/tech-debt-register.md`
- `RELEASE_PIPELINE_SYSTEM.md` -> `production/release-pipeline.md`
- `RELEASE_ROLLBACK_PLAYBOOK.md` -> `production/release-rollback.md`
- `OPERATIONS_DATA_SYSTEM.md` -> `production/operations-data.md`
- `PLATFORM_TARGET_RULES.md` -> `production/platform-targets.md`
- `MVP_PROTOTYPE_RULES.md` -> `production/mvp-prototype-rules.md`
- `PRD_CONSTRAINTS.md` -> `production/prd-constraints.md`
- `TASK_DECOMPOSITION_RULES.md` -> `production/task-decomposition.md`
- `PLAYBOOK_SYSTEM.md` -> `production/playbook-system.md`
- `OUTSOURCING_COLLAB_RULES.md` -> `production/outsourcing-collab-rules.md`
- `COLLAB_HANDOFF_SYSTEM.md` -> `production/collab-handoff-system.md`

Completed batch 9:

- `GAME_CLASSIFIER_SYSTEM.md` -> `design/game-classifier.md`
- `GAME_TYPE_TEMPLATES.md` -> `design/game-type-templates.md`
- `EXAMPLE_PACK_EXPANSION_PLAN.md` -> `design/example-pack-expansion-plan.md`
- `GAME_NUMERICAL_DESIGN.md` -> `design/numerical-design.md`
- `GAME_ECONOMY_DESIGN.md` -> `design/economy-design.md`
- `ANIMATION_PRESENTATION_RULES.md` -> `design/animation-presentation.md`
- `ASSET_POLICY.md` -> `design/asset-policy.md`
- `ASSET_SEMANTIC_MODEL.md` -> `design/asset-semantic-model.md`
- `CHARACTER_SYSTEM.md` -> `design/character-system.md`
- `UI_SYSTEM_MODEL.md` -> `design/ui-system-model.md`
- `UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md` -> `design/ui-character-action-linkage.md`
- `CHARACTER_ANIMATION_MODEL.md` -> `design/character-animation-model.md`

Completed batch 10:

- `COCOS_3_8_8_BASELINE.md` -> `architecture/cocos-baseline-3-8-8.md`
- `COCOS_RULES.md` -> `architecture/cocos-rules.md`
- `PROJECT_STRUCTURE.md` -> `architecture/project-structure.md`
- `ARCHITECTURE_TEMPLATE_SYSTEM.md` -> `architecture/template-system.md`
- `LEVEL_SYSTEM_ARCHITECTURE.md` -> `architecture/level-system.md`
- `LEVEL_SYSTEM_EXTENSIONS.md` -> `architecture/level-system-extensions.md`
- `LEVEL_DATA_MODELS.md` -> `architecture/level-data-models.md`
- `LEVEL_CONFIG_SCHEMAS.md` -> `architecture/level-config-schemas.md`
- `LEVEL_CONFIG_SCHEMA_EXTENSIONS.md` -> `architecture/level-config-schema-extensions.md`
- `RUNTIME_TEMPLATE_ROUTER.md` -> `architecture/runtime-template-router.md`

Allowed candidates:

- release docs
- contribution docs
- open-source roadmap docs
- non-command checklists

Required proof:

- `python scripts/validate_skill_docs.py`
- `npm run check`
- `git diff --name-only`
- `git diff --stat`

### Phase 2: Protocol migration

Move approval, runtime proof, diff review, and validation protocols in small batches.

Each batch must update:

- `SKILL.md`
- `MODULE_INDEX.md`
- `COMMANDS.md`
- `scripts/validate_skill_docs.py`
- all relative Markdown links

### Phase 3: Design and architecture migration

Move design and architecture files only after command routing and validation coverage are stable.

Do not mix design-policy moves with runtime-template moves in the same batch.

### Phase 4: Runtime template review

Review `assets/cocos-config-runtime-template/` and `assets/cocos-level-runtime-template/` separately.

This phase may require package script updates and TypeScript validation.

## Migration batch rules

Every migration batch must:

1. name the source paths
2. name the target paths
3. update all links in the same commit
4. update validation checks
5. run local validation
6. report changed paths
7. confirm no live Cocos game project was modified

Forbidden in a structure batch:

- editing live game projects
- opening Cocos
- raw text editing `.scene`, `.prefab`, `.anim`, or `.meta`
- mixing unrelated gameplay design changes with file moves
- moving files without updating validation and links

## Success standard

Repository structure work is successful only when:

- current users can still follow existing entry points
- `SKILL.md` still loads lightweight context first
- `MODULE_INDEX.md` still routes by task family
- `python scripts/validate_skill_docs.py` passes
- `npm run check` passes when package validation is relevant
- no broken Markdown links are introduced
- no game project files are modified
