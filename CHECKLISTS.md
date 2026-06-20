# Checklists

Use these core checklists to run high-frequency operational reviews. Open [CHECKLIST_EXTENSIONS.md](CHECKLIST_EXTENSIONS.md) only for specialist reviews.

## 1. Project Framing Checklist

- The project has a one-sentence core loop.
- The first-version promise is explicitly written.
- Explicit non-goals are written.
- Target platform is named.
- Major technical risks are listed.
- Major production risks are listed.
- The first milestone exists.

If any item is unclear:

- do not call the project ready for prototype

## 2. Gameplay Prototype Checklist

- The loop can be played from start to resolution.
- The player can understand the immediate goal.
- Input, action, feedback, and fail state are visible.
- The prototype is testing fun, not pretending to be final production.
- Placeholder asset rules are defined.
- The biggest technical risk has been touched.
- A go, change, or stop decision is recorded.

If these are not true:

- stay in prototype

## 3. Vertical Slice Checklist

- Slice scope is narrow and explicit.
- The slice covers one real end-to-end product segment.
- Architecture rules are frozen enough for scale-up.
- Asset ownership has been confirmed.
- The slice uses real project structure, not throwaway wiring.
- QA can describe what passes and what fails.

If these are not true:

- do not call it production-ready

## 4. Formal Production Review Checklist

- Every major feature has a named owner.
- New assets have ownership and approval.
- Shared framework changes go through the proper owner.
- Config schema is not drifting uncontrolled.
- Gameplay systems are not spreading through scene hacks.
- Technical debt is visible and prioritized.
- QA has a live defect pool and regression rhythm.

If these are not true:

- production is drifting and needs intervention

## 5. Cocos Structure Audit Checklist

- `scripts/core` contains shared law, not feature clutter.
- `scripts/game` contains gameplay truth, not UI hacks.
- `scripts/data` separates config, runtime state, and persistence.
- `scripts/ui` owns interface flow, not deep gameplay truth.
- Scene shell scripts remain thin orchestrators.
- Resource loading has clear ownership.

If these are not true:

- the architecture is already degrading

## 6. QA Entry Checklist

- The build target is named.
- The scope is named.
- Acceptance criteria exist.
- Required configs and assets are present.
- Required flows are reachable.
- Logging or debug visibility is sufficient.

If these are not true:

- QA should reject entry or mark it incomplete

## 7. Release Candidate Checklist

- Release scope is frozen enough to test seriously.
- Blocker bugs are closed or formally accepted.
- Key first-session flow passes.
- Core gameplay loop passes.
- Performance is within target range.
- Build metadata and channel settings are correct.
- Rollback or hotfix path exists.

If these are not true:

- do not call it a real release candidate

## 8. Launch Checklist

- Final smoke test has been run.
- Final build identifier is recorded.
- Channel or store target is confirmed.
- Producer, QA, and technical approvals exist.
- First-week watchlist exists.
- Known accepted risks are written.

If these are not true:

- delay the launch decision

## 9. First-Week Support Checklist

- Live blockers are sorted by severity and owner.
- Hotfix priorities are explicit.
- Compensation or support decisions are named and approved.
- Focused regression has been run on live-critical flows.
- Next watch owner and next review point are explicit.

If these are not true:

- do not call first-week support under control

## 10. Solo Studio Hat-Switch Checklist

- The current stage is named.
- The current hat is named.
- The current task has one owner role.
- The current hat is not bypassing another required gate.
- The deliverable before switching hats is explicit.

If these are not true:

- the solo workflow is drifting into self-confusion

## 11. MVP Scope Checklist

- The one-sentence fantasy is written.
- The repeated core loop is named.
- The MVP proves one real return reason.
- Out-of-scope systems are listed.
- Required systems only are named.
- Kill conditions are written.

If these are not true:

- the MVP is expanding without control

## 12. Game Classification Checklist

- Dominant repeatable player action is named.
- Main content unit is named.
- Progression structure is named.
- The closest game-type template is selected.
- The team is not classifying by art theme alone.

If these are not true:

- architecture and data design are premature

## 13. Project Memory Checklist

- Confirmed facts are separated from assumptions.
- Locked decisions are explicit.
- Open questions are visible.
- Accepted risks are written.
- Stale assumptions have been cleared.

If these are not true:

- the project context is drifting

## 14. Sequential Advancement Checklist

- The current step is named.
- The previous step's required outputs exist.
- The next step's prerequisites are already satisfied.
- Ownership for the current step is clear.
- Approver for the current step is clear when approval is required.
- Missing prerequisites are treated as blockers, not notes.

If these are not true:

- do not advance to the next step

## Checklist law

- Do not mark a checklist as passed when ownership is still unclear.
- Do not mark a checklist as passed when evidence is missing.
- Do not hide blockers inside “we will polish later”.
