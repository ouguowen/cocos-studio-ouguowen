# Templates

Use these templates to create project artifacts that match the production system.

## 1. Project Framing Template

Use when the project is not yet allowed to enter prototype work.

```md
# Project Framing

## Project Name

## Producer

## Lead Designer

## Technical Director

## Target Platform

## Target Player

## Core Loop

## First-Version Promise

## Explicit Non-Goals

## Visual Complexity Target

## Technical Risks

## Production Risks

## First Milestone

## Exit Criteria
- The core loop is clear.
- First-version scope is bounded.
- The project has named risks.
```

## 2. Gameplay Prototype Template

Use when the team must prove fun and viability, not polish.

```md
# Gameplay Prototype

## Prototype Goal

## Stage Owner

## Core Questions To Answer
- Is the loop fun?
- Is the feedback readable?
- What breaks first?

## Must-Have Systems

## Placeholder Asset Rules

## Minimum HUD

## Known Technical Constraints

## Known Design Risks

## Test Plan

## Findings

## Go / Change / Stop Decision
```

## 3. Vertical Slice Template

Use when the project must prove product-grade execution on a small slice.

```md
# Vertical Slice

## Slice Goal

## Producer Scope Lock

## Core Flow Covered

## Systems Included

## Systems Explicitly Deferred

## Visual Quality Bar

## UI Quality Bar

## Gameplay Quality Bar

## Technical Rules Frozen In This Slice

## Asset Ownership Confirmed

## Acceptance Checklist
- Feels like a real game segment
- Uses production-grade structure
- Can guide formal production standards

## Slice Decision
```

## 4. Formal Production Feature Template

Use when implementing a real feature in a production-stage project.

```md
# Feature Record

## Feature Name

## Stage

## Primary Owner

## Collaborators

## Approver

## Player-Facing Purpose

## Systems Touched

## Assets Touched

## Config Needed

## UI Needed

## Performance Risk

## QA Entry Conditions

## Acceptance Criteria

## Known Non-Goals
```

## 5. Asset Ownership Record Template

Use when a new asset class or important asset package appears.

```md
# Asset Ownership Record

## Asset Name

## Asset Class

## Primary Owner

## Collaborators

## Approver

## Runtime Role

## Source Files

## Integration Rules

## Naming Rules

## Load Owner

## Release Owner

## Forbidden Changes
```

## 6. QA Gate Template

Use before accepting a feature, slice, or release candidate.

```md
# QA Gate

## Build Target

## Scope Under Test

## Stage

## Gate Type

## Test Coverage

## Blockers

## Critical Defects

## Major Defects

## Known Accepted Risks

## Regression Result

## Recommendation
- Pass
- Pass with accepted risk
- Block
```

## 7. Release Readiness Template

Use before calling a build shippable.

```md
# Release Readiness

## Version

## Build Identifier

## Channel

## Producer Approval

## QA Recommendation

## Technical Director Approval

## Release Lead Approval

## Key Flow Smoke Result

## Blocking Issues Remaining

## Accepted Risks

## Store Materials Ready

## Rollback Or Hotfix Path

## First-Week Watchlist

## Final Decision
```

## 8. Solo Studio Hat Switch Template

Use when one person is running multiple roles and needs discipline.

```md
# Solo Hat Switch

## Current Task

## Current Stage

## Current Hat
- Producer
- Lead Designer
- Technical Director
- Lead Programmer
- Gameplay Programmer
- UI Programmer
- Art Director
- Animation Lead
- Technical Artist
- Level Designer
- QA Lead
- Release / Operations Lead

## What This Hat Owns Right Now

## What This Hat Must Not Bypass

## Deliverable Before Switching Hats

## Next Hat
```

## Template law

- Do not accept a document that lacks owner, scope, or exit criteria.
- Do not accept a feature record without named assets and approval.
- Do not accept a release record without smoke coverage and risk disclosure.

## 9. Level Data Model Selection Template

Use before designing level CSVs or config tables.

```md
# Level Data Model Selection

## Game Type

## Primary Content Pattern
- wave spawn
- puzzle mechanism
- platform segment
- roguelite room pool
- quest driven
- exploration region
- endless generator
- economy challenge
- hybrid

## Player Progression
- linear
- branching
- run-based
- open exploration
- endless

## Main Designer-Tuned Variables

## Fixed Authored Data

## Generated Data

## Primary Data Model

## Secondary Data Model

## Tables To Start With

## Tables To Avoid For Now

## Runtime Owner

## Content Owner

## Validation Requirements

## Cocos Runtime Flow
```
