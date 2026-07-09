# Quality Gate Alignment

Use this file as the canonical checklist for the safety and integration gates added during the Skill alignment repair. `protocols/quality-gates.md` should remain consistent with this file.

## Command Safety Gate

Entry condition: AI command execution, shell use, Git use, deletion, or file-system operation.

Required proof:

- requested command
- allow/block rule
- safe alternative when blocked
- next allowed command

Pass condition: the command is allowed or safely constrained.

Block condition: the command has destructive, secret-reading, history-rewrite, or unapproved scope risk.

Next allowed command: `cocos-diff-review`, `cocos-write-approval`, or safe inspection.

## Write Approval Gate

Entry condition: file write, multi-file edit, broad update, or high-risk file change.

Required proof:

- changed file plan
- reason for each change
- forbidden files
- validation plan
- risk classification

Pass condition: scope and validation are explicit.

Block condition: silent broad edit, scope expansion, or missing validation plan.

Next allowed command: approved write or repair.

## Cocos Path Risk Gate

Entry condition: changes under Cocos scripts, config, scenes, prefabs, or meta files.

Required proof:

- path classification
- owner
- required gate
- validation method

Pass condition: risk is classified and the required proof path is named.

Block condition: UI owns gameplay truth, meta batch change, scene/prefab change without proof, or browser proof overclaim.

Next allowed command: risk repair, runtime proof, or relevant design gate.

## Automated Checks Gate

Entry condition: session start, write, runtime check, commit, push, or stop summary.

Required proof:

- check stage
- check result
- blocker list
- next allowed command

Pass condition: the check passes or an honest blocker is declared.

Block condition: mode unclear, high-risk path unreviewed, or runtime proof missing.

Next allowed command: next check or repair.

## Resource Risk Gate

Entry condition: changed file list exists.

Required proof:

- LOW / MEDIUM / HIGH / CRITICAL classification
- reason for HIGH or CRITICAL changes
- validation plan for risky files

Pass condition: HIGH and CRITICAL changes have reason and validation.

Block condition: unexplained HIGH or CRITICAL change.

Next allowed command: write approval or diff review.

## Git Diff Review Gate

Entry condition: before commit or push.

Required proof:

- repository status review
- changed file names review
- diff statistics review
- risk summary

Pass condition: changed, added, deleted, high-risk, and runtime-sensitive files are explained.

Block condition: unexplained delete, unexplained meta change, unverified scene/prefab change, or forced remote history rewrite.

Next allowed command: commit, repair, or self-test.

## Runtime Proof Gate

Entry condition: runtime, browser preview, Console proof, screenshot, or runtime marker claim.

Required proof:

- browser preview marker or declared blocker
- proof channel
- provider limitation when applicable

Pass condition: browser runtime marker is visible or blocker is honest.

Block condition: editor-only proof, hierarchy-only proof, or missing marker.

Next allowed command: runtime repair or production readiness review.

## Skill Change Review Gate

Entry condition: Skill core, gate, routing, Agent, or self-test file changes.

Required proof:

- changed Skill files
- reason
- required self-test mode
- test result or repair record

Pass condition: relevant self-test mode passes or repair is recorded.

Block condition: validation claim without self-test.

Next allowed command: `cocos-skill-self-test`.

## Extended Safety Self-Test Gate

Entry condition: changes to command safety, write approval, path rules, automated checks, diff review, runtime proof, Skill change review, or Agent routing.

Required proof:

- `cocos-skill-self-test --safety`
- relevant `--runtime`, `--diff`, or `--agent` mode when applicable

Pass condition: applicable extended safety cases pass.

Block condition: any extended safety case fails or safety-sensitive file changes without relevant self-test.

Next allowed command: repair failed case or continue only after pass.
