# Risk Escalation System

Use this file when a project risk must be named, classified, escalated, blocked, accepted, or turned into an explicit decision before more work continues.

## Risk law

- A risk is not just a bug; it is a possibility of damaging cost, delay, instability, player harm, or business harm.
- If a serious risk is visible but not named, the team is already accepting it blindly.
- If no one knows who may accept the risk, the default decision is to stop advancement.

## Risk classes

- Product risk:
  - core loop not compelling
  - onboarding too weak
  - progression promise unclear
- Technical risk:
  - crash, memory, frame, save, sync, migration, platform, SDK, tooling instability
- Production risk:
  - scope explosion
  - owner confusion
  - vendor dependency
  - blocked pipeline
- Release risk:
  - rollback not ready
  - build provenance unclear
  - compliance or store readiness weak
- Live risk:
  - economy exploit
  - payment failure
  - support surge
  - event instability

## Severity ladder

- Low:
  - visible concern, limited blast radius, monitor and track
- Moderate:
  - meaningful cost or delay risk, requires owner and follow-up
- High:
  - major chance of milestone slip, player damage, or systemic instability
- Critical:
  - advancement should stop until explicitly accepted or mitigated

## Escalation triggers

- A risk crosses two or more systems.
- A risk threatens release date credibility.
- A risk threatens player data, payment, or progression integrity.
- A risk threatens platform approval or compliance.
- A risk has no clear owner after discussion.
- A risk keeps recurring across more than one milestone.

## Decision rules

- Low risk may be tracked by the working owner.
- Moderate risk must have a named owner and next review date.
- High risk must be escalated to a Lead Reviewer or stronger authority.
- Critical risk must block promotion, release, or rollout until explicitly accepted by the right approver.

## Acceptance authority

- Use [production/team-seniority.md](team-seniority.md) to map final authority.
- No Support Contributor or Independent Implementer may accept high-blast-radius risk alone.
- Product-shaping risk needs Producer or Lead Designer alignment.
- Core architecture or platform safety risk needs Technical Director or stronger alignment.
- Release or business-health risk needs Release / Operations Lead plus the relevant Director-level authority.

## Risk response options

- Mitigate now
- Narrow scope
- Delay milestone
- Change architecture or pipeline
- Add safeguard
- Accept explicitly with owner and watch trigger
- Stop the workstream

## Red flags

- "We know it is risky, but we will probably be fine."
- "Let us not raise this yet."
- "The team already spent too much time, so we cannot stop now."
- "We will remember this near release."
- "It is just one more exception."

## Risk escalation record

```md
# Risk Escalation Record

## Risk Title

## Risk Class
- product
- technical
- production
- release
- live

## Severity
- low
- moderate
- high
- critical

## Current Stage

## Affected Systems Or Workstreams

## Owner

## Escalated To

## Why This Risk Matters

## Trigger Or Evidence

## Immediate Containment

## Decision Needed

## Accepted By

## Follow-Up Date

## Blocked Advancement
- yes
- no
```
