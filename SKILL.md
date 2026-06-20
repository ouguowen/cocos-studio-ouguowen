---
name: cocos-studio-ouguowen
description: Senior production system for Cocos Creator 3.x game development. Use when planning, scoping, structuring, staffing, reviewing, releasing, or rescuing a Cocos project that needs strict workflow control, clear ownership, level-data discipline, and production-safe architecture instead of ad hoc development.
---

# Cocos Studio Ouguowen

Use this skill as the operating system for a Cocos Creator 3.x game project.

## Core stance

- Assume a senior team standard only.
- Do not recommend "write first, organize later".
- Do not allow undefined ownership, vague stage status, or unreviewed architecture drift.
- Treat a solo developer as a multi-role studio, not as a role-less workflow.

## Default execution order

1. Identify the current production mode. See [PRODUCTION_MODES.md](PRODUCTION_MODES.md).
2. Identify the current production stage. See [STAGES.md](STAGES.md).
3. Identify role, authority, and asset ownership. See [ROLES.md](ROLES.md), [ROLE_STAGE_MATRIX.md](ROLE_STAGE_MATRIX.md), [OWNERSHIP.md](OWNERSHIP.md), and [TEAM_SENIORITY_SYSTEM.md](TEAM_SENIORITY_SYSTEM.md).
4. Route the request through [MODULE_INDEX.md](MODULE_INDEX.md).
5. For most requests, open [WORKFLOWS.md](WORKFLOWS.md) first. Open [WORKFLOW_EXTENSIONS.md](WORKFLOW_EXTENSIONS.md) only for specialist flows.
6. For most project artifacts, open [TEMPLATES.md](TEMPLATES.md) first. Open [LEVEL_TEMPLATES.md](LEVEL_TEMPLATES.md) only for level-content artifacts.
7. If the request needs runtime code or subsystem boundaries, use [LEVEL_SYSTEM_ARCHITECTURE.md](LEVEL_SYSTEM_ARCHITECTURE.md). Open [LEVEL_SYSTEM_EXTENSIONS.md](LEVEL_SYSTEM_EXTENSIONS.md) only for advanced online, monetization, live-ops, social, or compliance systems.
8. If the request needs approval or stage advancement, apply [QUALITY_GATES.md](QUALITY_GATES.md), [CHECKLISTS.md](CHECKLISTS.md), and [REVIEW_SYSTEM.md](REVIEW_SYSTEM.md). Open [CHECKLIST_EXTENSIONS.md](CHECKLIST_EXTENSIONS.md) only for specialist reviews.
9. If the user asks to build one concrete module such as home page, battle page, shop page, bag page, HUD, or result page, apply [CHOICE_EXECUTION_PROTOCOL.md](CHOICE_EXECUTION_PROTOCOL.md) before implementation.
10. If delivery order, prerequisites, or step-skipping risk matters, apply [SEQUENTIAL_GATE_PROTOCOL.md](SEQUENTIAL_GATE_PROTOCOL.md) before advancing work.

## Non-negotiable rules

- No asset enters formal production without a defined owner, collaborators, and approver.
- No phase advances without entry criteria, outputs, and exit criteria.
- No major gameplay rule lives only in UI callbacks, animation resources, or random scene scripts.
- No shared framework module is modified casually during production.
- No Cocos project should rely on giant "god scripts", uncontrolled `update()` logic, or unmanaged dynamic loading.
- No single universal level CSV should be forced onto every game type.
- No single `LevelManager` should own config loading, level building, wave flow, spawning, objectives, rewards, UI, and scene logic.

## When responding

- Name the current production mode when strictness or scope control matters.
- Name the current stage when it matters.
- Name the responsible role when ownership matters.
- Call out violations directly when the request would break the system.
- Prefer concrete deliverables, boundaries, and acceptance criteria over generic advice.

## Common routing

- "How should we start this game?" -> stage selection, game classification, MVP, and first-session artifact.
- "What kind of game is this really?" -> game classifier before template or architecture choice.
- "What should this version actually prove?" -> version roadmap system before feature listing.
- "We need a fast prototype but do not want chaos." -> production mode selection before architecture advice.
- "Our project is getting messy." -> ownership audit, architecture audit, and missing gates.
- "Which architecture template fits?" -> classification before architecture template choice.
- "Build the Cocos structure." -> Cocos rules, project structure, and runtime boundaries.
- "Build this home page / shop / bag / battle HUD." -> choice execution protocol first, then continuous execution after option selection.
- "Do not skip steps / keep the project moving in order." -> sequential gate protocol before advancement.
- "How should levels be configured?" -> level data model selection before table design.
- "How should the level system be coded?" -> core level architecture before optional extensions.
- "Can we ship this?" -> quality gate and release gate review.
- "Write the PRD." -> PRD constraints before drafting.
- "Split this into tasks." -> task decomposition rules before issue writing.
- "How should we use AI on this project?" -> AI collaboration rules before delegating design or code work.
- "Review this professionally." -> review system before acceptance.
