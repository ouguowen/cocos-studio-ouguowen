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

## PRD Approval Gate

- Player problem and business goal are explicit.
- Non-goals are explicit.
- Systems, assets, telemetry, and rollout impact are named.
- Acceptance criteria exist.

## Task Execution Gate

- Work is decomposed into owner-clear tasks.
- Task dependencies are visible.
- Acceptance conditions are explicit.

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
