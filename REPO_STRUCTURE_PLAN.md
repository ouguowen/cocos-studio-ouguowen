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

Future home for rule and proof protocols:

- `AI_COMMAND_PERMISSION_RULES.md`
- `CODEX_WRITE_APPROVAL_PROTOCOL.md`
- `COCOS_DEV_STORY_PREWRITE_PROTOCOL.md`
- `COCOS_GENERATED_META_POLICY.md`
- `RUNTIME_PROOF_PROTOCOL.md`
- `GIT_DIFF_REVIEW_PROTOCOL.md`
- `SKILL_CHANGE_REVIEW_PROTOCOL.md`
- `SKILL_VALIDATION_LOOP.md`
- `SKILL_TEST_CASES.md`
- `QUALITY_GATES.md`

### `production/`

Future home for project control and ownership:

- `PRODUCTION_MODES.md`
- `STAGES.md`
- `ROLES.md`
- `ROLE_STAGE_MATRIX.md`
- `OWNERSHIP.md`
- `TEAM_SENIORITY_SYSTEM.md`
- `PROJECT_MEMORY_SYSTEM.md`
- `GAME_PRODUCTION_READINESS_GATE.md`

### `design/`

Future home for game design boundaries:

- `GAME_CLASSIFIER_SYSTEM.md`
- `GAME_TYPE_TEMPLATES.md`
- `GAME_NUMERICAL_DESIGN.md`
- `GAME_ECONOMY_DESIGN.md`
- `ANIMATION_PRESENTATION_RULES.md`
- `ASSET_POLICY.md`
- `ASSET_SEMANTIC_MODEL.md`
- `CHARACTER_SYSTEM.md`
- `UI_SYSTEM_MODEL.md`
- `UI_CHARACTER_ACTION_LINKAGE_SYSTEM.md`
- `CHARACTER_ANIMATION_MODEL.md`

### `architecture/`

Future home for Cocos and runtime architecture:

- `COCOS_3_8_8_BASELINE.md`
- `COCOS_RULES.md`
- `PROJECT_STRUCTURE.md`
- `ARCHITECTURE_TEMPLATE_SYSTEM.md`
- `LEVEL_SYSTEM_ARCHITECTURE.md`
- `LEVEL_SYSTEM_EXTENSIONS.md`
- `LEVEL_DATA_MODELS.md`
- `LEVEL_CONFIG_SCHEMAS.md`
- `LEVEL_CONFIG_SCHEMA_EXTENSIONS.md`
- `RUNTIME_TEMPLATE_ROUTER.md`
- `assets/cocos-config-runtime-template/`
- `assets/cocos-level-runtime-template/`

### `templates/`

Future home for reusable non-runtime artifacts:

- `TEMPLATES.md`
- `LEVEL_TEMPLATES.md`
- `WORKFLOWS.md`
- `WORKFLOW_EXTENSIONS.md`
- `CHECKLISTS.md`
- `CHECKLIST_EXTENSIONS.md`
- `MVP_ACCEPTANCE_REPORT_TEMPLATE.md`
- `INCIDENT_POSTMORTEM_TEMPLATE.md`

## Migration phases

### Phase 0: Index-first stabilization

Status: current phase.

- Keep all existing file paths unchanged.
- Add this plan to [MODULE_INDEX.md](MODULE_INDEX.md).
- Add validation coverage so the plan stays visible.
- Do not move files.

### Phase 1: Low-risk documentation migration

Move only small documentation groups after validation coverage exists.

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
