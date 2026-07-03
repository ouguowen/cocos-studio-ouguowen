# Automation Validation

This repository uses automated documentation validation to keep Cocos Studio Ouguowen safe and usable as an open-source Skill.

## Purpose

Automation validation checks that required Skill documents, command routes, safety protocols, Markdown links, and dangerous-rule guardrails remain intact.

It protects the repository from accidental regressions such as:

- missing core docs
- broken relative Markdown links
- missing first-MVP pipeline references
- missing pre-write approval rules
- missing generated `.meta` safety rules
- positive instructions for dangerous commands
- missing issue templates or pull request template
- missing release strategy or release checklist

## When GitHub Actions runs

The workflow [../.github/workflows/skill-docs-validate.yml](../.github/workflows/skill-docs-validate.yml) runs on:

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

[../scripts/validate_skill_docs.py](../scripts/validate_skill_docs.py) uses only the Python standard library.

It checks:

1. required files
2. required content in core docs
3. relative Markdown links
4. command routing references
5. safety rule presence
6. dangerous pattern context
7. collaboration and release template presence

## Required files

The validator requires key files such as:

- `README.md`
- `README.zh-CN.md`
- `SKILL.md`
- `COMMANDS.md`
- `MODULE_INDEX.md`
- `QUALITY_GATES.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `FIRST_MVP_SUCCESS_PIPELINE.md`
- `COCOS_DEV_STORY_PREWRITE_PROTOCOL.md`
- `COCOS_GENERATED_META_POLICY.md`
- `MVP_ACCEPTANCE_REPORT_TEMPLATE.md`
- `SUCCESS_CASE_MOONLIGHT_DELIVERY.md`
- `docs/quickstart-first-mvp.md`
- `docs/open-source-roadmap.md`
- `docs/automation-validation.md`
- `docs/release-strategy.md`
- `RELEASE_CHECKLIST.md`
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

## Handling failures

When the workflow fails:

1. Read the failing check group.
2. Fix the listed file or missing link.
3. If a dangerous pattern is intentional, rewrite the surrounding text so the safety context is clear.
4. Run the script locally.
5. Commit only after the script reports `Skill docs validation PASS`.
