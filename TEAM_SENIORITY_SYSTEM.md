# Team Seniority System

Use this file when the team is defining who may own work, who may review work, what seniority is required per task, or how to keep a "senior-only standard" in a solo or small studio.

## Seniority law

- A role name and a capability level are different things.
- Critical ownership belongs to capability, not to job title appearance.
- If a contributor cannot define, defend, review, and stabilize the work, they are not the true owner yet.

## Operating stance

- This skill assumes senior production standards by default.
- For core architecture, release, economy, progression, config schema, and live-ops decisions, the minimum safe owner is `Senior Owner`.
- If a contributor is below that bar, treat them as support capacity under explicit review, not as autonomous ownership.

## Capability levels

### 1. Support Contributor

- Can execute clearly scoped tasks.
- Can prepare assets, data, or code under an existing pattern.
- Cannot define architecture, product law, release law, or acceptance law alone.
- Cannot approve changes to shared foundations.

### 2. Independent Implementer

- Can complete bounded features with review.
- Can follow an established architecture and content pipeline.
- Can identify obvious edge cases and integration needs.
- Still requires a stronger owner for system law, schema law, or release-risk work.

### 3. Senior Owner

- Can own a system, asset family, or production stream end to end.
- Can write or refine standards, not just follow them.
- Can anticipate cross-system risk and define acceptance.
- Can review other contributors and stop unsafe work.

### 4. Lead Reviewer

- Can govern multiple related systems or disciplines.
- Can decide tradeoffs between quality, scope, and schedule inside their area.
- Can approve changes to shared rules, pipelines, and reusable foundations.
- Can decide whether exceptions are acceptable or must be rejected.

### 5. Director Approver

- Can decide product-level or studio-level risk acceptance.
- Can override local priorities when architecture, release safety, or business health is threatened.
- Owns final approval on irreversible or high-blast-radius decisions.

## Minimum safe ownership by work type

- Core loop definition: Senior Owner minimum, Lead Reviewer preferred.
- Economy and reward structure: Senior Owner minimum, Lead Reviewer preferred.
- Config schema and validation rules: Senior Owner minimum.
- Shared framework and scene shell: Senior Owner minimum, Lead Reviewer preferred.
- Release pipeline and rollback decisions: Senior Owner minimum, Director Approver on final risk.
- Platform compliance and SDK policy: Senior Owner minimum.
- Live-ops offer, event, and economy-impact changes: Senior Owner minimum.
- Player-facing copy polish, placeholder asset prep, repetitive config entry, and bounded implementation: Support Contributor or Independent Implementer is acceptable under review.

## Review authority rules

- Support Contributor output must always flow through a Senior Owner or stronger reviewer.
- Independent Implementer output may be merged only when a Senior Owner or stronger reviewer confirms it.
- Senior Owner output may still require Lead Reviewer or Director Approver sign-off when blast radius is high.
- No one self-approves release-risk work without matching approval authority.

## Red flags

- "They are fast, so let them own the framework."
- "They wrote most of the code, so they should approve it too."
- "The design is detailed enough; we do not need a stronger reviewer."
- "We can let junior ownership happen now and clean it later."
- "AI wrote the first pass, so no human owner is needed yet."

## Solo studio mapping

- One human may wear many hats.
- But each hat must still declare its capability level honestly.
- If the same person is below `Senior Owner` capability in a category, they must slow down, narrow scope, or seek stricter review artifacts instead of pretending authority exists.
- AI assistance defaults to `Support Contributor` level unless explicitly reviewed and adopted by a human owner.

## Seniority assignment record

```md
# Seniority Assignment Record

## Workstream

## Role

## Named Person Or Agent

## Capability Level
- Support Contributor
- Independent Implementer
- Senior Owner
- Lead Reviewer
- Director Approver

## What This Contributor May Own

## What This Contributor May Not Approve

## Required Reviewer

## Escalation Trigger

## Notes
```
