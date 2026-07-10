# Skill Operation Modes

## 1. Purpose

This document keeps the Skill useful during real production work by separating normal development flow from stage gates and full audits.

The goal is to move daily usage from audit-first, gate-heavy, report-heavy behavior toward build-first, safety-backed, result-focused behavior.

## 2. Core principle

The Skill should not behave like an auditor during normal development.

Default game development should be result-focused:

- read required context
- work within approved scope
- perform lightweight checks internally
- continue without unnecessary user interruption
- validate at meaningful milestones
- return concise final result

Safety is still mandatory, but safety gates must appear at the correct time.

Default boundary:

- Normal Skill discussion must not enter real game implementation by default.
- Skill maintenance and game implementation are separate modes unless the user explicitly asks for project work and approves the active project path and write scope.
- Do not use Cocos Creator, Cocos MCP, browser preview, or real Cocos project inspection by default.
- Runtime proof and proof-chain work are validation sandbox activities, not default product development.
- A passing proof slice does not authorize the next proof slice.
- `next recommended command` is optional advice only and never implicit approval or automatic continuation.

## 3. Fast Build Mode

Use Fast Build Mode for:

- concrete game feature implementation
- small UI feature
- small story step
- bug fix
- simple interaction
- approved dev story
- approved scene/script change

Rules:

- Do not ask for confirmation at every small step.
- Do not generate long reports after every micro-step.
- Do not stop just because a normal internal check passed.
- Continue automatically while the work remains inside the approved scope.
- Run lightweight validation internally.
- Report only final result unless a stop condition appears.
- Stay inside Skill repository context for Skill maintenance requests.
- Do not inspect real Cocos project files unless the user explicitly requests project work and provides or approves the active project path.
- Do not use Cocos/MCP/browser preview unless directly requested or required by an approved project implementation scope.
- Stop after each approved proof slice unless the user explicitly asks to continue.
- Do not treat `next recommended command` as permission to run that command.

Decision terms:

- `CONTINUE_AUTOMATICALLY`: work remains inside the approved scope and no stop condition appears.
- `STOP_FOR_APPROVAL`: a stop condition, approval boundary, or scope expansion appears.

Fast Build Mode may automatically:

- read relevant docs
- inspect project state
- implement approved files
- run local validation
- run preview validation when required
- fix small issues inside approved scope
- run `git status`, `git diff --name-only`, and `git diff --stat` checks
- commit and push only when the user already requested it or the active workflow requires it

For Skill maintenance, "project state" means the Skill repository state, not a real Cocos game project, unless the user explicitly approves project inspection.

Fast Build Mode must stop when:

- unapproved scene, prefab, or `.meta` appears
- unapproved runtime code appears
- external asset import appears
- `package.json`, `project.json`, settings, or `tsconfig` modification appears
- combat, economy, inventory, shop, gacha, save/load, or second chapter appears without approval
- browser preview fails and cannot be fixed inside approved scope
- git diff contains unexpected files
- dangerous Git command would be needed
- user approval is required by the pre-write protocol
- scope expansion is detected
- proof-chain work reaches the end of the approved proof slice and the user has not explicitly approved the next slice
- Skill maintenance would require real Cocos project inspection, Cocos/MCP, or browser preview without explicit approval

Fast Build Mode final output should stay short:

- done or blocked
- changed files
- preview result
- validation result
- commit hash if committed
- next step

### Compact output rule

Normal successful Fast Build responses should be compact by default.

Compact output reduces reporting verbosity only. It must not remove, weaken, rename, bypass, or make optional any safety gate, protocol, command, proof requirement, or stop condition. If compact output conflicts with safety completeness, safety completeness wins.

For small approved tasks, prefer this final shape:

1. Result
2. Changed files
3. Proof or validation result
4. Diff / git status result
5. Commit hash if committed
6. Next recommended command

The next recommended command is optional advice only. It must not be treated as approval, a hidden task, or permission to continue automatically.

Use longer reports only when:

- QA fails
- unexpected files appear
- browser proof fails
- diff scope is dirty or unknown
- release review or first MVP acceptance is requested
- Skill evolution, Skill validation, or repository audit is requested

Never skip:

- pre-write approval for scene, prefab, `.meta`, or runtime writes
- approved diff scope
- generated meta review
- browser proof when runtime visibility matters
- no fake proof
- stop on unexpected files
- no `git add .`
- no force push
- separation between Skill maintenance and real game implementation
- explicit approval before entering real Cocos project inspection or Cocos/MCP work

## 4. Safe Gate Mode

Use Safe Gate Mode for:

- design to implementation transition
- production readiness
- pre-write approval
- preview visibility gate
- QA review
- release review
- generated meta approval
- first MVP acceptance

Rules:

- A gate may be strict.
- A gate may require a checklist.
- A gate may stop and wait for user confirmation.
- A gate should run at stage boundaries, not between every small development step.

## 5. Audit Mode

Use Audit Mode for:

- Skill self-test
- repo safety audit
- open source polish
- release governance
- validation script review
- security review
- command routing audit

Rules:

- Audit Mode may be detailed.
- Audit Mode may generate long reports.
- Audit Mode may inspect items one by one.
- Do not use Audit Mode as the default for normal game development.

## 6. Mode selection rules

- When the user says implement, develop, fix, build a feature, continue development, `实现`, `开发`, `修复`, `做一个功能`, or `继续开发`, default to Fast Build Mode.
- When the user says check, validate, audit, self-test, score, release, QA, `检查`, `验证`, `审计`, `自测`, `评分`, `release`, or `QA`, use Safe Gate Mode or Audit Mode according to risk.
- When the user says do not be verbose, only give results, directly do it, `不要啰嗦`, `我只要结果`, or `直接做`, prefer Fast Build Mode while still respecting mandatory stop conditions.
- When the user asks to modify Skill repository rules, use Safe Gate Mode or Audit Mode.
- When the user asks for real Cocos game implementation, confirm production readiness and pre-write approval first; after an approved scope exists, use Fast Build Mode.
- When the user asks for Skill maintenance, use Skill repository context only and do not enter real Cocos project implementation by default.
- When the user asks for proof-chain validation, treat it as validation sandbox work and stop after the approved proof slice.

## 7. Interruption budget

Fast Build Mode:

- Each small task allows at most 0-1 user interruption.
- Only stop conditions interrupt the user.
- Normal internal validation must not interrupt the user.
- Normal file existence checks must not interrupt the user.
- Normal lint or static check pass must not interrupt the user.
- Normal clean `git status` must not interrupt the user.
- Normal preview pass must not interrupt the user and should be summarized only in the final result.
- Proof-chain validation must stop after the approved proof slice and should not proceed to the next slice without explicit user request.
- `next recommended command` does not count as user confirmation.

Safe Gate Mode:

- Each stage allows at most one confirmation.
- After confirmation, continue inside the confirmed scope without asking again for the same scope.

Audit Mode:

- Itemized reports are allowed.
- The response must make clear that the Skill is operating in Audit Mode.

## 8. Validation cadence

Fast Build Mode:

- pre-check: lightweight
- during work: internal only
- after work: preview, diff, and acceptance summary
- no repeated validation reports unless blocked

Safe Gate Mode:

- gate checklist
- gate decision
- next command
- compact gate output is allowed when the gate passes and no unexpected risk appears

Audit Mode:

- full checklist
- full report
- repair recommendation

## 9. Reporting style

Fast Build Mode final reports should contain at most:

1. Result
2. Files changed
3. Preview / runtime proof result
4. Validation result
5. Commit hash
6. Next step

Do not include during normal implementation:

- long explanations
- repeated lists of all gates
- repeated explanations of Skill principles
- reports after every small action
- confirmation prompts for every minor step

Pre-write approval and QA review may use compact output when they still include all required safety fields. A compact report is a presentation format, not a reduced gate.

## 10. Stop conditions

Stop and report `STOP_FOR_APPROVAL` when:

- the approved scope is unclear
- a required pre-write approval is missing
- a forbidden file class appears
- Cocos-generated `.meta` appears outside the approved scope
- external assets would be imported
- runtime code outside the approved file list would be changed
- project settings would be changed
- dangerous Git commands would be required
- preview proof fails and cannot be repaired inside scope
- implementation expands into blocked systems

## 11. Allowed automatic actions

When the current mode is Fast Build Mode and no stop condition appears, Codex may `CONTINUE_AUTOMATICALLY` with:

- reading required Skill docs
- checking current files and git state
- editing approved files
- running local validation
- running preview proof when already required by the approved scope
- fixing small issues inside the approved file list
- preparing a concise final result

`CONTINUE_AUTOMATICALLY` never crosses from Skill maintenance into real game implementation and never starts the next proof slice from a previous `next recommended command`.

## 12. User confirmation rules

- Pre-write approval should approve a scope, not one micro-action.
- After the user approves a scope, do not ask again for each small file edit, node creation, internal check, or preview pass.
- Ask again only when the scope changes, a new unapproved file appears, an unexpected `.meta` appears, a dangerous command is needed, an external asset import appears, or project settings would change.
- A `next recommended command` is not user approval.
- Each proof-chain slice needs its own explicit user request or approval before implementation continues.

## 13. Command mapping

- `cocos-fast-build` uses Fast Build Mode.
- `cocos-safe-gate` uses Safe Gate Mode.
- `cocos-audit-mode` uses Audit Mode.
- `cocos-dev-story-prewrite` uses Safe Gate Mode.
- Approved `cocos-dev-story` implementation uses Fast Build Mode.
- `cocos-qa-review`, `cocos-release-review`, and first MVP acceptance use Safe Gate Mode.
- Skill self-test, validation script review, and release governance use Audit Mode.

## 14. Examples

Fast Build Mode:

- User: "修复这个按钮点击后不显示结果。"
- Mode: Fast Build Mode.
- Expected behavior: inspect approved files, fix inside scope, run relevant validation, summarize result.

Safe Gate Mode:

- User: "进入第一条 dev story 写入前确认。"
- Mode: Safe Gate Mode.
- Expected behavior: output pre-write checklist and wait for approval.

Audit Mode:

- User: "检查这个 Skill 是否会过度打断。"
- Mode: Audit Mode.
- Expected behavior: run a structured audit and recommend repairs.

## 15. Anti-patterns

- Using Audit Mode as normal game development default.
- Treating every passed check as a user-facing checkpoint.
- Asking for approval after every minor edit inside an already approved scope.
- Repeating the same gate without new risk.
- Generating a long audit report after every implementation step.
- Continuing after a stop condition appears.
- Skipping mandatory pre-write approval, generated meta approval, or preview visibility requirements.
- Treating Skill maintenance as permission to inspect or modify a real Cocos project.
- Treating validation sandbox proof work as default product development.
- Treating `next recommended command` as automatic continuation.
