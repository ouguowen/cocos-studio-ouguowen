---
name: cocos-studio-ouguowen
description: Provides a senior-level production system for Cocos Creator 3.x games, covering stage gates, role boundaries, asset ownership, quality gates, and engineering discipline. Use when planning, building, reviewing, rescuing, or coordinating a Cocos Creator 3.x game and when the user wants strict workflows instead of ad hoc development.
---

# Cocos Studio Ouguowen

Use this skill as the operating system for a Cocos Creator 3.x game project.

## Core stance

- Assume a senior team standard only.
- Do not recommend "write first, organize later".
- Do not allow undefined ownership, vague stage status, or unreviewed architecture drift.
- Treat a solo developer as a multi-role studio, not as a role-less workflow.

## Default execution order

1. Identify the current production stage. See [STAGES.md](STAGES.md).
2. Identify the primary responsible role for the request. See [ROLES.md](ROLES.md).
   For stage-by-stage execution detail, see [ROLE_STAGE_MATRIX.md](ROLE_STAGE_MATRIX.md).
3. Identify the affected assets and ownership rules. See [OWNERSHIP.md](OWNERSHIP.md).
4. Apply Cocos Creator 3.x engineering and architecture rules. See [COCOS_RULES.md](COCOS_RULES.md).
   For the default project blueprint, see [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md).
5. If level, content, wave, map, room, puzzle, quest, or procedural data is involved, choose the correct level data model. See [LEVEL_DATA_MODELS.md](LEVEL_DATA_MODELS.md).
6. Check stage gates and quality gates before approving work. See [QUALITY_GATES.md](QUALITY_GATES.md).
   For execution checklists, see [CHECKLISTS.md](CHECKLISTS.md).
7. Follow the execution pattern for the situation. See [WORKFLOWS.md](WORKFLOWS.md).
8. If the user needs an applied pattern, use [EXAMPLES.md](EXAMPLES.md).
9. If the user needs concrete project artifacts, use [TEMPLATES.md](TEMPLATES.md).

## Non-negotiable rules

- No asset enters formal production without a defined owner, collaborators, and approver.
- No phase advances without entry criteria, outputs, and exit criteria.
- No major gameplay rule lives only in UI callbacks, animation resources, or random scene scripts.
- No shared framework module is modified casually during production.
- No Cocos project should rely on giant "god scripts", uncontrolled `update()` logic, or unmanaged dynamic loading.
- No single universal level CSV should be forced onto every game type.

## When responding

- Name the current stage when it matters.
- Name the responsible role when ownership matters.
- Call out violations directly when the request would break the system.
- Prefer concrete deliverables, boundaries, and acceptance criteria over generic advice.

## Common routing

- "How should we start this game?" -> stage selection, role kickoff, first deliverables.
- "Our project is getting messy." -> ownership audit, architecture audit, missing gates.
- "Who should own this asset?" -> ownership lookup and approval path.
- "Build the Cocos structure." -> apply the Cocos rules and stage constraints.
- "Can we ship this?" -> quality gate and release gate review.
- "How should levels be configured?" -> level data model selection before table design.
