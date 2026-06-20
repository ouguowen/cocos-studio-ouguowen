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

## Delivery assets

- For PRD structure and red flags, see [PRD_CONSTRAINTS.md](PRD_CONSTRAINTS.md).
- For task-card decomposition, see [TASK_DECOMPOSITION_RULES.md](TASK_DECOMPOSITION_RULES.md).
- For acceptance evidence packs, see [ACCEPTANCE_ARTIFACTS.md](ACCEPTANCE_ARTIFACTS.md).
- For QA coverage planning, see [TEST_MATRIX.md](TEST_MATRIX.md).
- For rollback discipline, see [RELEASE_ROLLBACK_PLAYBOOK.md](RELEASE_ROLLBACK_PLAYBOOK.md).
- For debt tracking, see [TECH_DEBT_REGISTER.md](TECH_DEBT_REGISTER.md).
- For postmortems, see [INCIDENT_POSTMORTEM_TEMPLATE.md](INCIDENT_POSTMORTEM_TEMPLATE.md).
- For budget planning, see [COST_BUDGET_MODEL.md](COST_BUDGET_MODEL.md).
- For outsourcing rules, see [OUTSOURCING_COLLAB_RULES.md](OUTSOURCING_COLLAB_RULES.md).
- For milestone burndown, see [MILESTONE_BURNDOWN_RULES.md](MILESTONE_BURNDOWN_RULES.md).
- For MVP scope locking, see [MVP_PROTOTYPE_RULES.md](MVP_PROTOTYPE_RULES.md).
- For genre-starting structures, see [GAME_TYPE_TEMPLATES.md](GAME_TYPE_TEMPLATES.md).
- For AI teammate control, see [AI_COLLAB_RULES.md](AI_COLLAB_RULES.md).
- For submission, rollout, and hotfix planning, see [RELEASE_PIPELINE_SYSTEM.md](RELEASE_PIPELINE_SYSTEM.md).
- For platform-specific delivery rules, see [PLATFORM_TARGET_RULES.md](PLATFORM_TARGET_RULES.md).
- For retention, monetization, ad, event, and economy review, see [OPERATIONS_DATA_SYSTEM.md](OPERATIONS_DATA_SYSTEM.md).
- For ownership authority and seniority control, see [TEAM_SENIORITY_SYSTEM.md](TEAM_SENIORITY_SYSTEM.md).
- For internal, external, and AI-assisted handoff records, see [COLLAB_HANDOFF_SYSTEM.md](COLLAB_HANDOFF_SYSTEM.md).
- For milestone ladder and version-purpose records, see [VERSION_ROADMAP_SYSTEM.md](VERSION_ROADMAP_SYSTEM.md).
- For risk naming, escalation, and acceptance records, see [RISK_ESCALATION_SYSTEM.md](RISK_ESCALATION_SYSTEM.md).
- For game classification records, see [GAME_CLASSIFIER_SYSTEM.md](GAME_CLASSIFIER_SYSTEM.md).
- For repeatable operating procedures, see [PLAYBOOK_SYSTEM.md](PLAYBOOK_SYSTEM.md).
- For architecture family selection, see [ARCHITECTURE_TEMPLATE_SYSTEM.md](ARCHITECTURE_TEMPLATE_SYSTEM.md).
- For recurring AI request phrasing, see [PROMPT_LIBRARY.md](PROMPT_LIBRARY.md).
- For stable project facts across sessions, see [PROJECT_MEMORY_SYSTEM.md](PROJECT_MEMORY_SYSTEM.md).
- For formal review records, see [REVIEW_SYSTEM.md](REVIEW_SYSTEM.md).

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

## 10. Level Runtime Architecture Template

Use before implementing the level system in Cocos Creator 3.x.

```md
# Level Runtime Architecture

## Game Type

## Selected Level Data Model

## Runtime Entry Component

## Config Files Used

## Required Files

## Config Layer
- ConfigTypes:
- ConfigIndex:
- ConfigManager:

## Runtime Layer
- LevelTypes:
- LevelRuntime:
- LevelBuilder:
- LevelFlowController:

## Systems
- WaveSystem:
- SpawnSystem:
- ObjectiveSystem:
- RewardSystem:

## Scene Bridge
- MapPointRegistry:
- MapPointComponent:

## Actor Creation
- EnemyFactory:
- EnemyActor:

## Event Flow

## What Must Not Be Owned By LevelFlowController

## QA Acceptance

## Technical Director Review Notes
```

## 11. Level Config Schema Change Template

Use when adding, changing, deprecating, or removing a level config field.

```md
# Level Config Schema Change

## Table

## Field Name

## Change Type
- add
- modify
- deprecate
- remove

## Requested By

## Owner

## Reason

## Gameplay Meaning

## Data Type

## Required

## Allowed Values

## Default Value

## Affected Existing Rows

## Runtime Impact

## Tooling Impact

## QA Impact

## Validation Rule

## Migration Plan

## Approval
- Lead Designer:
- Lead Programmer:
- Technical Director:
- QA Lead:
```

## 12. Project Memory Template

Use when starting a new project, locking a milestone, or refreshing the team's stable project truth.

```md
# Project Memory

## Confirmed Facts
- Current stage:
- Current production mode:
- Current milestone:
- Classified game type:
- Primary platform:
- Current owner map:

## MVP Truth
- One-sentence fantasy:
- Repeated core loop:
- Must-prove items:
- Explicit non-goals:

## Locked Decisions
- Architecture:
- Level or content model:
- Platform constraints:
- Release assumptions:

## Active Assumptions

## Open Questions

## Accepted Risks

## Blocked Items

## Next Review Date
```

## 13. First Session Kickoff Template

Use when the team is using this skill on a brand-new project and needs one clean starting record.

```md
# First Session Kickoff

## Project Name

## Current Stage

## Current Production Mode

## Dominant Player Action

## Main Content Unit

## Classified Game Type

## One-Sentence Fantasy

## First-Version Promise

## Explicit Non-Goals

## MVP Must Prove

## Primary Platform Target

## Top Technical Risks

## Top Production Risks

## Current Milestone Purpose

## Next Required Documents
- Project Memory
- MVP Record
- Version Roadmap Record
- Level Data Model Selection or equivalent
```
