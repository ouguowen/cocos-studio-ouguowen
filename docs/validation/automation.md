# Automation Validation

This repository uses automated documentation validation to keep Cocos Studio Ouguowen safe and usable as an open-source Skill.

## Purpose

Automation validation checks that required Skill documents, command routes, safety protocols, Markdown links, and dangerous-rule guardrails remain intact.

Automation validation now also checks the context loading policy and lightweight context summary so the Skill does not regress to default full-repository loading as the file set grows.

Automation validation now checks the universal map model system, including map model routing, map space contracts, minimap/navigation boundaries, and command entries that prevent one-size-fits-all map design.

Validation now checks controlled Skill evolution governance, evolution proposal template, evolution gate vocabulary, and anti-automatic-self-evolution rules.

It protects the repository from accidental regressions such as:

- missing core docs
- missing repository structure planning rules
- missing context loading strategy or lightweight first-read memory
- regressions that push normal Skill usage back toward full default loading
- missing universal map model routing, map-space model, or minimap/navigation model
- missing controlled evolution governance, evolution proposal template, or anti-automatic-self-evolution rules
- broken relative Markdown links
- missing first-MVP pipeline references
- missing pre-write approval rules
- missing generated `.meta` safety rules
- positive instructions for dangerous commands
- missing issue templates or pull request template
- missing release strategy or release checklist
- missing UI, Character, Action, Animation, Skeleton, or Asset semantic linkage files
- missing ownership rules that keep UI, animation, skeleton, prefab, and assets from owning gameplay truth
- missing Skill Operation Modes or regression back to default audit mode or high-frequency interruption mode
- issue template config contact links that point to generic `https://github.com/` instead of real repository files

## When GitHub Actions runs

The workflow [../../.github/workflows/skill-docs-validate.yml](../../.github/workflows/skill-docs-validate.yml) runs on:

- `push`
- `pull_request`

The workflow uses:

- `ubuntu-latest`
- `actions/checkout`
- `actions/setup-python`
- Python 3.11

It runs:

```text
python scripts/validate_skill_docs.py
```

No npm install, third-party Python package, or external link checker is required.

## What the script checks

[../../scripts/validate_skill_docs.py](../../scripts/validate_skill_docs.py) uses only the Python standard library.

It checks:

1. required files
2. required content in core docs
3. relative Markdown links
4. command routing references
5. safety rule presence
6. dangerous pattern context
7. collaboration and release template presence
8. Issue template config contact links point to real repository files
9. UI, Character, Action, Animation, Skeleton, and Asset semantic linkage files exist
10. core ownership rules are preserved for request-only UI, controller-owned final state, character-owned action semantics, presentation-only animation, display-only skeleton, and behavior-free assets
11. Skill Operation Modes exist and preserve Fast Build Mode, Safe Gate Mode, Audit Mode, concise reporting, stop conditions, and interruption-budget rules
12. Context Loading Policy and Skill Context Summary preserve FAST_CONTEXT, GATE_CONTEXT, AUDIT_CONTEXT, trigger-based loading, and anti-overload rules
13. Repository Structure Plan preserves index-first migration, current canonical paths, batch migration rules, and validation requirements
14. Universal map model files preserve map model selection, map-space vocabulary, Cocos scene handoff, minimap/navigation rules, and anti-default-map safeguards
15. Controlled Skill evolution files preserve evidence-driven evolution, proposal requirements, rollback planning, Skill Evolution Gate vocabulary, and anti-automatic-self-evolution safeguards

## Required files

The validator requires key files such as:

- `README.md`
- `README.zh-CN.md`
- `SKILL.md`
- `core/commands.md`
- `core/module-index.md`
- `protocols/quality-gates.md`
- `package.json`
- `docs/structure/repository-structure-plan.md`
- `core/context-loading-policy.md`
- `core/context-summary.md`
- `core/operation-modes.md`
- `design/ui-character-action-linkage.md`
- `design/character-system.md`
- `design/ui-system-model.md`
- `design/character-animation-model.md`
- `design/asset-semantic-model.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `production/first-mvp-success-pipeline.md`
- `protocols/cocos-dev-story-prewrite.md`
- `protocols/cocos-generated-meta.md`
- `templates/reports/mvp-acceptance.md`
- `docs/success-cases/moonlight-delivery.md`
- `docs/quickstart/first-mvp.md`
- `docs/open-source/roadmap.md`
- `docs/validation/automation.md`
- `docs/release/strategy.md`
- `docs/release/checklist.md`
- `scripts/check-generated-artifacts.js`
- `.github/ISSUE_TEMPLATE/bug_report.yml`
- `.github/ISSUE_TEMPLATE/feature_request.yml`
- `.github/ISSUE_TEMPLATE/safety_report.yml`
- `.github/ISSUE_TEMPLATE/documentation.yml`
- `.github/ISSUE_TEMPLATE/config.yml`
- `.github/pull_request_template.md`
- `examples/moonlight-delivery/README.md`

## Markdown links

The validator scans relative Markdown links in `.md` files.

It ignores:

- `http://`
- `https://`
- `mailto:`
- pure anchors such as `#section`

It removes `#anchor` fragments before checking whether the target file exists.

## Command routing checks

The validator checks that core command and pipeline terms remain present, including:

- `cocos-asset-policy`
- `cocos-first-implementation-story`
- `cocos-dev-story-prewrite`
- `cocos-dev-story`
- `cocos-qa-review`
- `cocos-release-review`
- `READY_FOR_IMPLEMENTATION`
- `PRE_WRITE_APPROVAL_REQUIRED`
- `QA_PASS`
- `FIRST_MVP_ACCEPTED`

## Safety rule checks

The validator checks that core safety protocols still contain:

- pre-write approval before implementation
- explicit user approval
- generated `.meta` review
- browser preview proof
- Preview Visibility Gate
- QA and first-MVP acceptance gates
- UI-Character Linkage Gate
- Developer Experience Gate
- Interruption Budget Gate
- request-only UI input
- controller-owned final state
- character behavior to action-state mapping
- animation as presentation only
- skeleton as display only
- assets that do not create behavior or gameplay systems
- Fast Build / Safe Gate / Audit Mode routing so normal development does not fall back to default audit behavior or frequent user interruptions

## Dangerous pattern checks

The validator scans Markdown files for dangerous phrases. Do not use these as positive instructions:

- `git reset --hard`
- `git push --force`
- `git add .`
- `rm -rf`
- raw text edits to Cocos serialized files
- bypassing pre-write approval
- treating editor hierarchy as enough proof

It allows these phrases only when nearby text clearly frames them as forbidden, blocked, or requiring explicit user confirmation.

## Local run

Run from the repository root:

```text
python scripts/validate_skill_docs.py
```

Expected success output:

```text
Skill docs validation started
PASS required_files_exist
PASS required_content_checks
PASS markdown_link_check
PASS safety_rule_checks
PASS dangerous_pattern_checks
Skill docs validation PASS
```

## What this validation does not do

Automation validation does not:

- open Cocos Creator
- modify any game project
- create scenes
- create prefabs
- modify `.meta`
- write game runtime code
- validate real browser preview
- prove that a Cocos game runs

It validates Skill documentation and safety rules only.

## Side-effect-free package check

`npm run check` validates the example level config, generated artifact pipeline, and runtime template without writing generated outputs into the repository.

Manual generation remains available through:

```text
npm run export:example
npm run types:example
```

## Handling failures

When the workflow fails:

1. Read the failing check group.
2. Fix the listed file or missing link.
3. If a dangerous pattern is intentional, rewrite the surrounding text so the safety context is clear.
4. Run the script locally.
5. Commit only after the script reports `Skill docs validation PASS`.
