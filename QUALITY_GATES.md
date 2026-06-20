# Quality Gates

Use these gates to decide whether work is allowed to advance.

## Prototype Gate

- Core loop is playable from start to resolution.
- The player can understand goal, action, and feedback.
- The team can name at least one fun thing and one failing thing.
- Major unknowns are exposed, not hidden.

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

## Release Candidate Gate

- Blocking bugs are resolved or formally accepted.
- Key flows pass regression.
- Performance is within acceptable target range.
- Release materials and channel information are ready.

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
