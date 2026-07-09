# PRD Constraints

Use this file when a request is still at the idea, feature, event, system, or milestone definition stage.

## Non-negotiable PRD sections

Every serious PRD must name:

- player problem
- business goal
- target segment
- current production stage
- first-version scope
- explicit non-goals
- core user flow
- touched systems
- touched assets
- config or table changes
- telemetry needs
- monetization impact
- rollout plan
- kill or rollback condition
- acceptance criteria
- owner and approver

## PRD rules

- Do not approve a PRD that says "improve experience" without naming which player behavior should change.
- Do not approve a PRD that names rewards, prices, or rates without naming the owner of those values.
- Do not approve a PRD that changes onboarding, economy, or live events without naming telemetry.
- Do not approve a PRD that changes runtime behavior without naming config, asset, and QA impact.
- Do not approve a PRD that introduces a feature with no non-goals.
- Do not approve a PRD that affects release risk but omits rollout and rollback paths.

## Senior PRD red flags

- "Will polish later" is hiding missing scope discipline.
- "Tech will decide" is hiding missing product ownership.
- "Can reuse old UI" without naming the exact page is not a plan.
- "Simple backend support" without protocol, state, or error cases is not a requirement.
- "Track data later" is a release-risk statement.

## PRD skeleton

```md
# PRD

## Feature Name

## Producer

## Primary Owner

## Stage

## Player Problem

## Business Goal

## Target Segment

## First-Version Scope

## Explicit Non-Goals

## Core User Flow

## Systems Touched

## Assets Touched

## Config Or Schema Changes

## Telemetry Requirements

## Monetization Impact

## Rollout Plan

## Kill Or Rollback Condition

## Acceptance Criteria

## Risks

## Approver
```
