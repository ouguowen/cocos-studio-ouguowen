# Checklists

Use these checklists to run operational reviews without relying on memory.

## 1. Project Framing Checklist

- The project has a one-sentence core loop.
- The first-version promise is explicitly written.
- Explicit non-goals are written.
- Target platform is named.
- Producer, lead designer, and technical director concerns are visible.
- Major technical risks are listed.
- Major production risks are listed.
- Visual complexity matches team reality.
- The first milestone exists.
- The team knows what must be proven in prototype.

If any item is unclear:

- do not call the project ready for prototype

## 2. Gameplay Prototype Checklist

- The loop can be played from start to resolution.
- The player can understand the immediate goal.
- Input, action, feedback, and fail state are visible.
- The prototype is testing fun, not pretending to be final production.
- Only minimum HUD or debug UI exists.
- Placeholder asset rules are defined.
- The team can name what is fun.
- The team can name what is broken or dull.
- The biggest technical risk has been touched, not ignored.
- A go, change, or stop decision is recorded.

If these are not true:

- stay in prototype

## 3. Vertical Slice Checklist

- Slice scope is narrow and explicit.
- The slice covers one real end-to-end product segment.
- Architecture rules are frozen enough for scale-up.
- Asset ownership has been confirmed for slice assets.
- UI, gameplay, and visual quality bars are visible.
- The slice uses real project structure, not throwaway wiring.
- Config, scene, prefab, and resource rules are active.
- QA can describe what passes and what fails.
- The slice teaches the team how formal production should work.
- The slice does not secretly contain half the whole game.

If these are not true:

- do not call it production-ready

## 4. Formal Production Review Checklist

- Every major feature has a named owner.
- New assets have ownership and approval.
- Shared framework changes go through the proper owner.
- Bundle and loading rules are being followed.
- Config schema is not drifting uncontrolled.
- UI pages are not becoming rule dumps.
- Gameplay systems are not spreading through scene hacks.
- `update()` abuse is not growing unchecked.
- Technical debt is visible, named, and prioritized.
- QA has a live defect pool and regression rhythm.
- Producer priorities are current.
- Low-value features are not quietly stealing time from release goals.

If these are not true:

- production is drifting and needs intervention

## 5. Cocos Structure Audit Checklist

- `scripts/core` contains shared law, not feature clutter.
- `scripts/game` contains gameplay truth, not UI hacks.
- `scripts/data` separates config, runtime state, and persistence.
- `scripts/ui` owns interface flow, not deep gameplay truth.
- `scripts/view` supports presentation and does not own game rules.
- `scripts/resource` has clear load and release ownership.
- `scripts/input` converts input into commands or intents.
- Scene shell scripts are thin enough to remain orchestrators.
- Prefabs have stable structure and clear runtime purpose.
- Dynamic loading has a release plan.

If these are not true:

- the architecture is already degrading

## 6. QA Entry Checklist

- The build target is named.
- The feature or fix scope is named.
- The primary owner performed a self-check.
- Known blockers are disclosed.
- Acceptance criteria exist.
- Required configs and assets are present.
- Required pages or flows are reachable.
- Logging or debug visibility is sufficient for investigation.

If these are not true:

- QA should reject entry or mark it incomplete

## 7. Release Candidate Checklist

- Release scope is frozen enough to test seriously.
- Blocker bugs are closed or formally accepted.
- Critical defects are visible and triaged.
- Key first-session flow passes.
- Core gameplay loop passes.
- Core UI flows pass.
- Performance is within acceptable target range.
- Build metadata and channel settings are correct.
- Store materials and release notes are ready or tracked.
- Rollback or hotfix path exists.

If these are not true:

- do not call it a real release candidate

## 8. Launch Checklist

- Final smoke test has been run.
- Final build identifier is recorded.
- Channel or store target is confirmed.
- Producer approval exists.
- QA recommendation exists.
- Technical director approval exists.
- Release lead approval exists.
- First-week watchlist exists.
- Known accepted risks are written, not implied.
- The team knows who is watching what after launch.

If these are not true:

- delay the launch decision

## 9. Solo Studio Hat-Switch Checklist

- The current stage is named.
- The current hat is named.
- The current task has one owner role.
- The current hat is not bypassing another required gate.
- The deliverable before switching hats is explicit.
- The next hat is named.

If these are not true:

- the solo workflow is drifting into self-confusion

## 10. PRD Readiness Checklist

- The player problem is written.
- The business goal is written.
- Non-goals are explicit.
- Touched systems and assets are named.
- Telemetry needs are named.
- Rollout and rollback conditions are named.
- Acceptance criteria exist.
- Owner and approver are named.

If these are not true:

- the PRD is not ready for approval

## 11. Task Breakdown Checklist

- Every task has one primary owner.
- Every task has a reviewable output.
- Dependencies are visible.
- Acceptance conditions are explicit.
- Cross-discipline work is not hidden in one vague ticket.

If these are not true:

- the task list is not production-safe

## 12. Rollback Readiness Checklist

- Rollout owner is named.
- Rollback owner is named.
- Trigger metrics are named.
- Watch window is named.
- Rollback path is written.
- Player communication path is written.

If these are not true:

- the release is not rollback-ready

## 13. Tech Debt Review Checklist

- Every debt item has an owner.
- Impact is named.
- Repayment trigger is named.
- Target stage is named.
- Exit condition is named.

If these are not true:

- the debt register is decorative, not actionable

## 14. Outsourcing Delivery Checklist

- Internal owner is named.
- Review owner is named.
- File format and naming rules are explicit.
- Acceptance criteria are explicit.
- Integration owner is named.

If these are not true:

- the vendor handoff is not production-safe

## 15. Milestone Burndown Checklist

- Total committed scope is visible.
- Added scope is visible.
- Blocked scope is visible.
- Burn risks are named.
- Delivery probability is stated honestly.

If these are not true:

- milestone reporting is hiding convergence risk

## 16. MVP Scope Checklist

- The one-sentence fantasy is written.
- The repeated core loop is named.
- The MVP proves one real return reason, not many weak ones.
- Explicitly out-of-scope systems are listed.
- Required systems only are named.
- Kill conditions are written.

If these are not true:

- the MVP is expanding before it is proven

## 17. Game Type Fit Checklist

- The dominant player action is named.
- The main content unit is named.
- The progression structure is named.
- The selected template matches the real loop, not just theme.
- The chosen config model fits the template.

If these are not true:

- the project is forcing the wrong production pattern

## 18. AI Collaboration Control Checklist

- Human owner is named.
- Review owner is named.
- Stage and deliverable are named before AI use.
- AI decision boundaries are explicit.
- Suggested tests and executed tests are not mixed together.
- Adopted AI output has been reviewed, not trusted by appearance.

If these are not true:

- AI usage is adding unowned risk

## 19. Release Pipeline Checklist

- Build lane is named explicitly.
- Version and build identifier are recorded.
- Source snapshot is recorded.
- Channel and platform targets are explicit.
- Remote-config or feature-flag dependencies are explicit.
- Data-migration dependencies are explicit.
- Watch owner is named.
- Rollback path is known.

If these are not true:

- the release pipeline is not under control

## 20. Platform Target Checklist

- Primary launch platform is explicit.
- Allowed platform differences are explicit.
- Input model is reviewed per platform.
- Performance target is reviewed per platform.
- Package budget is reviewed per platform.
- SDK, permission, and review constraints are visible.
- Save and analytics consistency rules are explicit.

If these are not true:

- platform scope is still accidental

## 21. Operations Data Checklist

- Current business hypothesis is explicit.
- Retention metrics are reviewed with context.
- Monetization metrics are reviewed with trust risk.
- Ad metrics are reviewed with fatigue risk.
- Economy faucet and sink health are reviewed.
- Event outcomes are checked beyond participation only.
- Follow-up owner is named.

If these are not true:

- the team is reading numbers without control

## 22. Ownership Authority Checklist

- Role name and capability level are both explicit.
- Core ownership below Senior Owner level is challenged, not assumed.
- Reviewer authority matches blast radius.
- Approval authority is explicit for release, economy, config-law, and framework work.
- AI or junior-like assistance is not treated as final ownership.

If these are not true:

- authority is decorative and risk is unowned

## 23. Handoff Safety Checklist

- Source owner is explicit.
- Receiving owner is explicit.
- Review owner is explicit.
- Included and excluded artifacts are explicit.
- Dependency assumptions are visible.
- Validation evidence exists.
- Rejection conditions are explicit.
- Unresolved work is not silently dumped downstream.

If these are not true:

- the handoff is not production-safe

## 24. Version Roadmap Checklist

- Current milestone is explicit.
- Next milestone is explicit.
- The current milestone has one clear proof obligation.
- Promotion conditions are explicit.
- Out-of-scope items are explicit.
- Kill or delay conditions are explicit.
- The roadmap is not pretending two different stages are the same.

If these are not true:

- the roadmap is decorative and not decision-safe

## 25. Risk Escalation Checklist

- Risk class is explicit.
- Severity is explicit.
- Owner is explicit.
- Escalation authority is explicit.
- Evidence or trigger is explicit.
- Response path is explicit.
- Critical risk is not continuing without written acceptance.

If these are not true:

- the team is carrying blind risk

## 26. Game Classification Checklist

- Dominant player action is explicit.
- Main content unit is explicit.
- Primary class is explicit.
- Secondary class is explicit when hybrid.
- Wrong template choices are explicitly rejected.

If these are not true:

- the project is routing from vibes

## 27. Project Memory Checklist

- Confirmed facts are separated from assumptions.
- Current stage and milestone truth are recorded.
- Accepted risks are recorded.
- Stale assumptions are reviewed.
- Memory is updated after major decisions.

If these are not true:

- the project is relying on conversational drift

## 28. Formal Review Checklist

- Review scope is explicit.
- Findings are listed before summary.
- Blockers are explicit.
- Residual risk is explicit.
- Approval status is explicit.

If these are not true:

- the review is not functioning as a gate

## Checklist law

- A blank item is unresolved risk.
- "Probably fine" is not a pass condition.
- If the checklist reveals a stage mismatch, fix the stage problem before the feature problem.
