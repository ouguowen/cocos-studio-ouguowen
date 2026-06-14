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

## Checklist law

- A blank item is unresolved risk.
- "Probably fine" is not a pass condition.
- If the checklist reveals a stage mismatch, fix the stage problem before the feature problem.
