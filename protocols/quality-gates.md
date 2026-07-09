# Quality Gates

Use these gates to decide whether work is allowed to advance.

## Skill Validation Gate

Use this gate before claiming the skill is closed-loop validated or safe for broad game development guidance.

- Skill validation uses [protocols/skill-validation-loop.md](skill-validation-loop.md) and [protocols/skill-test-cases.md](skill-test-cases.md).
- Skill validation mode is selected from [protocols/skill-self-test-modes.md](skill-self-test-modes.md).
- Safety-focused validation includes [protocols/skill-extended-safety-test-cases.md](skill-extended-safety-test-cases.md) and [protocols/cocos-hook-validation-plan.md](cocos-hook-validation-plan.md).
- Both allow-path tests and block-path tests have been run.
- Each test case records expected decision, actual decision, allowed command, forbidden actions, proof, and repair status.
- A single successful path is not treated as closed-loop validation.
- Failed test cases stop game implementation and create a repair task.
- Codex does not invent missing user decisions and then treat them as confirmed.
- Codex does not accept editor-only evidence as browser runtime proof.
- Codex does not expand beyond the allowed next command after a ready path.

If these are not true:

- the skill is not closed-loop validated
- broad game implementation should remain blocked

## Command Permission Gate

- File-writing work applies [protocols/ai-command-permissions.md](ai-command-permissions.md).
- Allowed scope, blocked scope, and escalation-only scope are explicit.
- The command does not treat local disk reachability as permission.

If these are not true:

- writing work is blocked

## Path Scope Gate

- Writable scope is explicit and reviewable.
- Changed paths remain inside the approved repository.
- `D:\CocosProjects\AI_Game_Studio_FirstGame`, `assets/scenes/**`, `assets/prefabs/**`, `assets/**/*.meta`, and actual game runtime code remain untouched for documentation-only tasks.
- Path review follows [protocols/cocos-path-scope.md](cocos-path-scope.md).

If these are not true:

- commit is blocked

## Skill Change Review Gate

- Skill-level rule changes follow [protocols/skill-change-review.md](skill-change-review.md).
- Safety linkage exists in `SKILL.md`, `core/commands.md`, `core/module-index.md`, and `protocols/quality-gates.md`.
- Integration audit output exists in [protocols/skill-integration-audit-report.md](skill-integration-audit-report.md).

If these are not true:

- Skill update approval is blocked

## Skill Evolution Gate

Use this gate when a request asks to improve, evolve, upgrade, extend, restructure, or make the Skill smarter.

PASS requires:

- evolution level is classified
- evidence is stated
- repeated vs one-off is stated
- context impact is reviewed
- Fast Build impact is reviewed
- repository structure impact is reviewed
- validation plan is stated
- rollback plan exists for E3/E4
- no automatic self-evolution

FAIL if any of these appear:

- change is based only on theoretical completeness
- one-off issue becomes permanent rule without evidence
- new root-level support doc is added
- Fast Build Mode becomes slower or more interruptive
- context loading expands by default
- E3/E4 change has no proposal or rollback plan
- AI modifies Skill automatically without user-approved evolution decision

Decision vocabulary:

- `EVOLUTION_READY`
- `EVOLUTION_NOT_READY`
- `EVOLUTION_RECORD_ONLY`
- `EVOLUTION_REJECTED`
- `EVOLUTION_ROLLBACK_REQUIRED`
- `EVOLUTION_CONTEXT_TOO_HEAVY`
- `EVOLUTION_FAST_BUILD_REGRESSION`

## Git Diff Review Gate

- Diff review follows [protocols/git-diff-review.md](git-diff-review.md).
- `git status`, `git diff --name-only`, and `git diff --stat` have been reviewed.
- Unexpected non-doc changes are absent.

If these are not true:

- commit is blocked

## Pre-write Approval Gate

Use this gate before `cocos-dev-story` writes implementation files.

- The implementation story is dev-ready.
- Production readiness is `READY_FOR_IMPLEMENTATION`.
- [protocols/cocos-dev-story-prewrite.md](cocos-dev-story-prewrite.md) has been applied.
- Exact files to create or modify are listed.
- Files that must not be touched are listed.
- Runtime validation plan is listed.
- Rollback plan is listed.
- Expected git diff scope is listed.
- Cocos Creator / MCP usage plan is listed when local engine work is needed.
- Browser preview proof plan is listed when UI or gameplay must be visible.
- Final pre-write decision is `PRE_WRITE_APPROVAL_REQUIRED` or `PRE_WRITE_BLOCKED`.
- The user explicitly approves before implementation begins.

If these are not true:

- file writes are blocked
- scene/script/meta creation is blocked
- commit and push are blocked

## Cocos Generated Meta Gate

Use this gate when Cocos Creator creates `.meta` files during implementation.

- Generated `.meta` files are directly tied to approved new files or new folders.
- Generated `.meta` paths are listed in the approved diff scope.
- Unexpected generated `.meta` files cause Codex to stop and report.
- User confirmation is required before adding unexpected generated `.meta` to the approved scope.
- Unrelated `.meta` files are not modified.
- `.scene`, `.prefab`, and `.meta` files are not raw text edited.
- Rollback does not use `git reset --hard` unless the user explicitly confirms.

If these are not true:

- staging is blocked
- commit is blocked
- implementation must stop for user approval or repair

## Prototype Gate

- Core loop is playable from start to resolution.
- The player can understand goal, action, and feedback.
- The team can name at least one fun thing and one failing thing.
- Major unknowns are exposed, not hidden.

## Game Production Readiness Gate

Use this gate before Codex starts real game implementation, opens a large development sprint, creates many Cocos scripts, builds large scene/prefab structures, or attempts to make a playable game in one pass.

- Game identity is explicit: selected game type, dominant player action, core fantasy, target player, first-version promise, and non-goals.
- MVP scope is narrow: one repeated loop, one success condition, one fail condition, one target session length, one first playable goal, and a cut list.
- Numerical readiness exists when gameplay values matter.
- Economy readiness exists when rewards, currencies, upgrades, shops, ads, stamina, gacha, inventory, or progression economy matter.
- Animation and presentation readiness exists when animation, UI motion, VFX, combat feedback, Spine, Tween, AnimationClip, particles, or audio-visual timing matter.
- Cocos architecture boundaries are clear: scene structure, script structure, runtime systems, data/config boundary, prefab ownership, resource loading plan, and forbidden shortcuts.
- Cocos runtime readiness is proven when local implementation is authorized: target Cocos version, project open, scene saved, browser preview available, and Preview Visibility Gate passed when browser output matters.
- Asset placeholder policy and naming policy exist.
- First implementation story is dev-ready with expected files, data/config changes, acceptance criteria, proof requirements, and blocker criteria.

If these are not true:

- do not start broad implementation
- return DESIGN_NOT_READY, RUNTIME_NOT_READY, SCOPE_TOO_LARGE, or BLOCKED instead of pretending the project is ready

## Preview Visibility Gate

Use this gate before script-runtime proof, first-playable proof, or browser-preview acceptance.

- The intended Cocos scene is the scene being previewed.
- The scene is saved before preview.
- Camera, Canvas, UI layer, active state, position, scale, color, and visibility have been checked when UI is expected.
- A baseline marker such as a simple Label or visible gameplay object appears in the browser preview, not only in the editor scene view.
- Editor hierarchy, Inspector state, and scene snapshot are supporting evidence only; they do not replace browser runtime visibility.
- If the baseline marker is not visible in browser preview, script-runtime proof and gameplay proof must stop and report Preview Visibility Gate as failed or blocked.
- If the automation provider cannot capture browser pixels or browser runtime logs, the limitation must be declared instead of marking runtime proof as passed.

## Runtime Proof Gate

- Proof channel selection follows [protocols/runtime-proof.md](runtime-proof.md).
- Documentation-only work uses diff or audit proof, not fake runtime proof.
- If runtime evidence is required but unavailable, the result is `BLOCKED` or `NOT_APPLICABLE`, not passed.

If these are not true:

- proof claims are blocked

## Numerical Design Gate

Use this gate before implementing or changing stats, difficulty, rewards, costs, upgrades, wave timing, enemy tuning, or balance-sensitive config.

- The selected game type is explicit.
- The loop being tested is explicit.
- The intended player feeling is written before values are generated.
- Prototype placeholder numbers are labeled as placeholders.
- Every balance-sensitive field has a purpose.
- Legal ranges exist for generated or edited numeric config fields.
- Difficulty spikes, reward inflation, and cost/reward skips have been checked.
- No UI value or animation timing is treated as the only source of numeric truth.
- The next implementation story cannot accidentally treat fake balance as final balance.

If these are not true:

- numerical work is blocked or remains prototype-only

## Economy Design Gate

Use this gate before implementing or changing currencies, rewards, sources, sinks, upgrades, stamina/energy, inventory value, shops, ads, gacha, or monetization-sensitive systems.

- The economy has a reason to exist in the selected game type.
- The core loop, return reason, main reward moment, and main spend moment are explicit.
- Each currency has a purpose, source, sink, cap or no-cap rule, and persistence rule.
- Source and sink relationships are clear enough to explain in one minute.
- The current production stage justifies the economy scope.
- Monetization is explicitly in scope or out of scope.
- Prototype economy values are labeled as placeholders.
- Source/sink validation, reward inflation validation, upgrade affordability validation, and progression skip validation are defined when relevant.
- Ads, shops, or gacha are not introduced before approval and product justification.

If these are not true:

- economy work is blocked or remains prototype-only

## Animation Presentation Gate

Use this gate before implementing or changing animation states, UI motion, hit feedback, combat VFX, death flows, skill effects, Spine, AnimationClip, Tween, particles, or audio-visual timing.

- The gameplay state being represented is explicit.
- The player-facing purpose is explicit.
- Trigger event and exit condition are defined.
- Presentation does not own gameplay truth.
- Placeholder status is clear.
- Naming and fallback behavior are defined.
- Animation, VFX, and UI motion do not hide player input, gameplay consequence, objective progress, or reward/loss result.
- Browser/runtime proof or a declared blocker exists when the effect must be seen in preview.
- Performance risk is considered for repeated or dense effects.

If these are not true:

- animation or presentation work is blocked or remains prototype-only

## UI-Character Linkage Gate

Use this gate before approving UI-character-action linkage, character response feedback, action-to-animation mapping, skeleton presentation, or asset-driven visual feedback.

PASS requires:

- UI input is request-only.
- Controller/domain logic owns final state.
- Character behavior maps to action state.
- Animation only represents action state.
- Skeleton only presents animation.
- Asset imports do not create gameplay systems.
- Forbidden ownership is absent.

FAIL if any of these appear:

- UI directly owns completion/reward/result.
- Animation event owns gameplay result.
- Skeleton, prefab, or asset owns final state.
- Button callback bypasses controller logic.
- Combat/action expansion appears without approval.

If this gate does not pass:

- UI-character-action linkage work is blocked or remains design-only
- implementation cannot start without production readiness and pre-write approval

## Developer Experience Gate

Use this gate when reviewing whether the Skill is helping normal implementation move quickly without weakening safety.

PASS requires:

- normal development uses Fast Build Mode
- unnecessary interruptions are avoided
- validation happens at meaningful milestones
- reports are concise during implementation
- stop conditions still stop unsafe work
- audit mode is not used for normal development by default

FAIL if any of these appear:

- Codex asks for confirmation after every minor step
- Codex generates full audit reports during every implementation step
- Codex repeats the same gate without new risk
- Codex blocks progress after harmless internal validation
- Codex treats every check as a user-facing checkpoint
- Codex skips mandatory stop conditions

## Interruption Budget Gate

Use this gate when checking whether confirmations and reports are paced correctly.

PASS requires:

- Fast Build task has no interruption unless stop condition appears
- Safe Gate task has at most one confirmation per stage
- Audit Mode clearly declares that it is audit mode

FAIL if any of these appear:

- Fast Build Mode interrupts after ordinary internal checks
- Safe Gate Mode asks repeated confirmations for the same approved scope
- Audit Mode is applied silently to normal implementation work

## Vertical Slice Gate

- The slice feels like a real product segment.
- Architecture is stable enough for scale-up.
- Visual, UI, gameplay, and pacing quality bars are visible.
- Ownership and production rules are already in use.

## Production Feature Gate

- The feature has an owner.
- The feature respects architecture and ownership rules.
- Config, UI, gameplay, and content integration are testable.
- Review or approval path is defined.

## QA Entry Gate

- Build target is identified.
- Scope of what changed is identified.
- Basic self-check has been done by the implementing owner.
- Known blockers are declared instead of hidden.

## QA Review Gate

Use this gate after a dev story and before release review.

- Tested commit is named.
- Tested scene or entry point is named.
- Tested script or runtime controller is named when applicable.
- Browser preview proof is present for playable MVPs.
- Preview Visibility Gate result is `PASS` before `QA_PASS`.
- Acceptance criteria are checked one by one.
- Forbidden scope is checked.
- Git status is checked.
- QA decision is `QA_PASS`, `QA_FAIL`, or `QA_BLOCKED`.

If these are not true:

- release review is blocked
- `QA_PASS` cannot be claimed

## Release Candidate Gate

- Blocking bugs are resolved or formally accepted.
- Key flows pass regression.
- Performance is within acceptable target range.
- Release materials and channel information are ready.

## First MVP Acceptance Gate

Use this gate after `QA_PASS` when deciding whether the first MVP is accepted.

- QA report exists and decision is `QA_PASS`.
- Preview Visibility Gate is `PASS` for the current MVP.
- Implementation commit is named.
- Implemented scope matches the approved story.
- Forbidden scope is absent.
- Known limitations are listed.
- The report states what acceptance does not mean.
- Release decision is `FIRST_MVP_ACCEPTED`, `FIRST_MVP_NOT_ACCEPTED`, or `RELEASE_BLOCKED`.

If these are not true:

- first MVP acceptance is blocked
- `FIRST_MVP_ACCEPTED` cannot be claimed

## Launch Gate

- Smoke test for key flows passes.
- Version, build, and channel records are correct.
- Rollback or hotfix path exists.
- Release approval is explicit.

## First-Week Support Gate

- Live blockers are triaged by severity and owner.
- Hotfix candidates have rollback thinking and focused regression.
- Compensation or player-support actions have explicit approval.
- The next watch owner and next review point are explicit.

## PRD Approval Gate

- Player problem and business goal are explicit.
- Non-goals are explicit.
- Systems, assets, telemetry, and rollout impact are named.
- Acceptance criteria exist.

## MVP Scope Gate

- One repeated loop is clearly defined.
- Supporting systems are cut to minimum required proof.
- Out-of-scope items are explicit.
- Kill conditions are written.

## Task Execution Gate

- Work is decomposed into owner-clear tasks.
- Task dependencies are visible.
- Acceptance conditions are explicit.

## Sequential Advancement Gate

- The current step is explicit.
- Required outputs from the previous step exist.
- Prerequisites are complete, not assumed.
- Advancement is not being justified by "we will fix it later".
- If a blocker exists, the next required repair action is explicit.

## AI Collaboration Gate

- Human owner and review owner are explicit.
- AI decision boundaries are explicit.
- Adopted output has been reviewed against stage and scope.
- AI-generated suggestions are not mislabeled as executed evidence.

## Release Pipeline Gate

- Build lane is explicit.
- Build provenance is recorded.
- Channel and platform targets are explicit.
- Rollout and rollback paths both exist.
- Watch ownership exists for post-launch signals.

## Platform Target Gate

- Primary platform is explicit.
- Platform-specific constraints are visible.
- Performance and package expectations exist per target.
- SDK, permission, and compliance differences are visible.
- Cross-platform consistency rules are explicit.

## Operations Data Gate

- Business hypothesis is explicit.
- Retention, monetization, ads, and economy are reviewed together when relevant.
- Metrics have owners and follow-up actions.
- Short-term uplift is not confused with healthy player behavior.

## Ownership Authority Gate

- Ownership authority matches capability, not just title.
- Critical work has Senior Owner or stronger ownership.
- Reviewer and approver authority are explicit.
- High-blast-radius work is not self-approved below the required level.

## Handoff Gate

- Source, receiving, and review ownership are explicit.
- Included scope and excluded scope are explicit.
- Integration assumptions are visible.
- Validation evidence exists before acceptance.
- Downstream cleanup is not being used as hidden scope transfer.

## Version Roadmap Gate

- The milestone purpose is explicit.
- Promotion conditions are explicit.
- Out-of-scope items are explicit.
- The next milestone proves something different from the current one.
- The roadmap supports an actual decision, not only a schedule.

## Risk Escalation Gate

- Serious risk is named, not implied.
- Risk class and severity are explicit.
- Owner and escalation authority are explicit.
- Critical risk is either mitigated, blocked, or explicitly accepted by the right authority.
- Advancement is not continuing on undocumented hope.

## Game Classification Gate

- Primary game class is explicit.
- Hybrid status is explicit when relevant.
- Template and data-model routing follows the classification.
- Theme is not being used as the primary classifier.

## Project Memory Gate

- Current project truth is recorded.
- Confirmed facts and assumptions are separated.
- Accepted risks are recorded.
- Memory is current enough to guide the next decision.

## Formal Review Gate

- Findings are explicit.
- Blockers are explicit.
- Approval status is explicit.
- Residual risk is explicit.
- Review is being used as a decision gate, not as theater.

## Rollback Gate

- Trigger metrics are named.
- Rollback owner is named.
- Rollback path is written and reviewable.
- Communication path exists.

## Debt Review Gate

- Critical debt has an owner.
- Repayment trigger is defined.
- Release-risk debt is either accepted explicitly or scheduled.

## Milestone Control Gate

- Burn risks are visible.
- Added scope is visible.
- Probability of hitting date is called honestly.
- Escalation path exists if the milestone is slipping.

## Defect severity guidance

- Blocker: prevents shipping or breaks a key user flow.
- Critical: major user-facing failure with serious impact, but not always a full stop.
- Major: meaningful degradation that should be fixed before confidence is claimed.
- Minor: local issue with limited impact.
- Trivial: polish issue with low immediate risk.

## Gate law

- "Mostly done" does not pass a gate.
- If acceptance criteria are undefined, the work is not ready for approval.
- If ownership is unclear, gate status should default to blocked.
- If prerequisites are missing, advancement should default to blocked.
- If browser preview visibility is required but not proven, script-runtime and gameplay proof should default to blocked.
- If balance-sensitive numbers do not have purpose and legal ranges, gameplay implementation should default to blocked or prototype-only.
- If currencies, rewards, sources, sinks, or monetization do not have stage justification and validation rules, economy implementation should default to blocked or prototype-only.
- If presentation owns gameplay truth or lacks trigger, exit, fallback, and runtime visibility proof when required, animation implementation should default to blocked or prototype-only.
- If production readiness is not READY_FOR_IMPLEMENTATION, broad game implementation should default to blocked.
- If skill validation has not passed required self-test cases, the skill should not be called closed-loop validated.
