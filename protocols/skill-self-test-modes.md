# Skill Self-Test Modes

Use this file to choose the correct `cocos-skill-self-test` mode.

## Mode law

- A mode passes only when every required case in that mode passes.
- A failed block-path case blocks release of the Skill update.
- Core validation and extended safety validation are related but not interchangeable.
- Use the narrowest mode that covers the changed files; use `--all` before broad release claims.

## `static`

Purpose: Check Skill file structure and required files.

Required input:

- expected file list
- current repository file list

Required test files:

- `SKILL.md`
- `core/module-index.md`
- `core/commands.md`

Required output:

- present files
- missing files
- duplicate candidates
- PASS / FAIL / NEEDS_REPAIR

Pass condition:

- required files exist and are indexed where expected

Block condition:

- required Skill core files are missing

## `routing`

Purpose: Check command routing consistency.

Required input:

- command name
- expected module files

Required test files:

- `SKILL.md`
- `core/commands.md`
- `core/module-index.md`

Required output:

- routing found in `SKILL.md`
- command definition found in `core/commands.md`
- module index entry found when required
- PASS / FAIL / NEEDS_REPAIR

Pass condition:

- command routes to the correct rule files

Block condition:

- command exists in one registry but is missing from another required registry

## `gate`

Purpose: Check quality gates block incorrect advancement.

Required input:

- changed rule or requested advancement
- expected gate

Required test files:

- `protocols/quality-gates.md`
- `protocols/skill-test-cases.md`
- `protocols/skill-extended-safety-test-cases.md`

Required output:

- gate used
- required proof
- pass condition
- block condition
- next allowed command

Pass condition:

- gate has enough proof rules to block unsafe advancement

Block condition:

- a gate is missing or cannot block its target failure case

## `runtime`

Purpose: Check Preview Visibility Gate and runtime proof behavior.

Required input:

- runtime claim
- available proof
- provider limitation if any

Required test files:

- `protocols/runtime-proof.md`
- `protocols/quality-gates.md`

Required output:

- proof channel
- browser preview marker status
- blocker status
- runtime decision

Pass condition:

- editor-only evidence is not accepted as browser proof

Block condition:

- runtime success is claimed without browser marker or declared blocker

## `pipeline`

Purpose: Check the first-MVP path from design artifacts through pre-write approval, implementation proof, QA, and release acceptance.

Required input:

- selected MVP type
- approved first implementation story
- expected implementation file scope
- expected generated companion meta scope
- browser preview proof requirement
- QA and release decisions

Required test files:

- `production/first-mvp-success-pipeline.md`
- `protocols/cocos-dev-story-prewrite.md`
- `protocols/cocos-generated-meta.md`
- `templates/reports/mvp-acceptance.md`
- `protocols/skill-test-cases.md`

Required output:

- command chain result
- pre-write approval result
- generated meta stop/resume result
- browser preview proof result
- QA decision
- release decision
- scope expansion check
- PASS / FAIL / NEEDS_REPAIR

Pass condition:

- Test Case 09 passes and `FIRST_MVP_ACCEPTED` is limited to the current MVP only.

Block condition:

- implementation starts before pre-write approval
- unapproved generated `.meta` is committed
- browser proof is replaced by editor-only evidence
- `QA_PASS` is skipped
- first MVP acceptance is treated as full-game completion

## `audit`

Purpose: Check scope drift, duplicated rules, missing index entries, and unsafe expansion.

Required input:

- changed files
- audit target

Required test files:

- `protocols/skill-integration-audit-report.md`
- `core/module-index.md`
- `protocols/quality-gates.md`

Required output:

- missing files
- routing gaps
- gate gaps
- duplicate/conflict risks
- final decision

Pass condition:

- integration report is complete and no blocking gaps remain

Block condition:

- audit report is missing or shows unresolved blockers

## `safety`

Purpose: Check command safety, write approval, path risk, and high-risk operations.

Required input:

- requested command or file change
- target paths
- expected decision

Required test files:

- `protocols/skill-extended-safety-test-cases.md`
- `protocols/ai-command-permissions.md`
- `protocols/write-approval.md`
- `protocols/cocos-path-scope.md`
- `protocols/cocos-resource-risk-matrix.md`

Required output:

- S01-S08 results where applicable
- forbidden action result
- required repair if failed

Pass condition:

- all applicable safety cases pass

Block condition:

- any applicable safety case fails

## `diff`

Purpose: Check Git diff review before commit and push.

Required input:

- repository status
- changed file names
- diff statistics

Required test files:

- `protocols/git-diff-review.md`

Required output:

- changed files
- deleted files
- high-risk files
- commit allowed or blocked decision

Pass condition:

- risky changes are named and justified before commit

Block condition:

- commit proceeds without diff review or unexplained high-risk changes exist

## `agent`

Purpose: Check Agent registry, handoff, and authority boundaries.

Required input:

- changed Agent files
- expected Agent count
- handoff updates

Required test files:

- `agents/registry.md`
- `agents/handoff-protocol.md`
- `agents/ai-game-studio-system.md`

Required output:

- Agent count
- Agent names
- authority gaps
- handoff gaps
- audit result

Pass condition:

- Agent count, authority boundaries, outputs, and handoffs are valid

Block condition:

- vague Agents, missing boundaries, or handoff without artifact

## Command forms

```text
cocos-skill-self-test --core
cocos-skill-self-test --safety
cocos-skill-self-test --runtime
cocos-skill-self-test --pipeline
cocos-skill-self-test --diff
cocos-skill-self-test --agent
cocos-skill-self-test --all
```

- `--core` uses `protocols/skill-test-cases.md`.
- `--safety` uses `protocols/skill-extended-safety-test-cases.md`.
- `--runtime` uses `protocols/runtime-proof.md` and Preview Visibility Gate.
- `--pipeline` uses `production/first-mvp-success-pipeline.md` and Test Case 09.
- `--diff` uses `protocols/git-diff-review.md`.
- `--agent` uses `agents/registry.md` and `agents/handoff-protocol.md`.
- `--all` runs core plus extended safety, runtime, diff, and Agent checks.

## Change mapping

- Changing Skill core files requires at least `--core`.
- Changing command safety, path rules, diff review, runtime proof, or Skill change review requires `--safety`.
- Changing Agent files requires `--agent`.
- Changing runtime proof rules requires `--runtime`.
- Changing diff review requires `--diff`.
- Changing first-MVP command flow, pre-write approval, generated meta policy, QA review, or release acceptance requires `--pipeline`.
