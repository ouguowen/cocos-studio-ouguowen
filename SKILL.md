---
name: cocos-studio-ouguowen
description: Provides a senior-level production system for Cocos Creator 3.x games, covering game classification, playbooks, architecture templates, prompt patterns, project memory, review gates, production modes, stage gates, role boundaries, asset ownership, project structure, MVP prototype rules, AI collaboration rules, release and platform targeting, operations-data loops, level data models, CSV or sheet config schemas, runtime architecture, and quality discipline. Use when planning, prototyping, classifying, scoping, structuring, staffing, reviewing, rescuing, scaling, releasing, operating, or stabilizing a Cocos Creator 3.x game, especially for solo studios, level-heavy projects, content pipelines, config-table design, anti-chaos refactors, or strict workflow control instead of ad hoc development.
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
5. If the request needs runtime code, config integration, or subsystem baselines, use [RUNTIME_TEMPLATE_ROUTER.md](RUNTIME_TEMPLATE_ROUTER.md).
6. If the request needs approval or advancement, apply [QUALITY_GATES.md](QUALITY_GATES.md), [CHECKLISTS.md](CHECKLISTS.md), and [REVIEW_SYSTEM.md](REVIEW_SYSTEM.md).
7. Use [WORKFLOWS.md](WORKFLOWS.md) for situation-specific execution, [TEMPLATES.md](TEMPLATES.md) for artifacts, and [EXAMPLES.md](EXAMPLES.md) for applied patterns.

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

- "What kind of game is this really?" -> game classifier before template or MVP choice.
- "What should this next version actually prove?" -> version roadmap system before feature listing.
- "How should we start this game?" -> stage selection, role kickoff, first deliverables.
- "We need a fast prototype but do not want chaos." -> production mode selection before architecture advice.
- "Our project is getting messy." -> ownership audit, architecture audit, missing gates.
- "Which architecture template fits?" -> classification before architecture template choice.
- "Who should own this asset?" -> ownership lookup and approval path.
- "Who is senior enough to own this?" -> team seniority system before assigning authority.
- "Build the Cocos structure." -> apply the Cocos rules and stage constraints.
- "How should levels be configured?" -> level data model selection before table design.
- "How should the level system be coded?" -> level system architecture and runtime template router before implementation.
- "Can we ship this?" -> quality gate and release gate review.
- "What fields should the level CSVs use?" -> level config schema reference.
- "Check these CSV tables." -> run the level config validator, then report owner and fix path.
- "Write the PRD." -> PRD constraints before drafting.
- "Split this into tasks." -> task decomposition rules before issue writing.
- "How do we accept this feature?" -> acceptance artifacts before sign-off.
- "What should QA cover?" -> test matrix before approval.
- "How do we roll back safely?" -> release rollback playbook before shipping.
- "Track our tech debt." -> debt register before cleanup planning.
- "Write the postmortem." -> incident postmortem template before blame-free discussion drifts.
- "How do we budget this work?" -> cost budget model before commitment.
- "How do we work with outsourcing?" -> outsourcing collaboration rules before vendor kickoff.
- "Are we burning down the milestone?" -> milestone burndown rules before status reporting.
- "What should the MVP include?" -> MVP prototype rules before adding more systems.
- "What game template fits this idea?" -> game type templates before architecture and table design.
- "How should we use AI on this project?" -> AI collaboration rules before delegating design or code work.
- "How should we release this build?" -> release pipeline system before submission or rollout planning.
- "How should this game differ by platform?" -> platform target rules before export or store planning.
- "How do we judge retention or revenue changes?" -> operations data system before feature conclusions.
- "How should this handoff be done?" -> collaboration handoff system before accepting delivery.
- "Is this serious enough to stop the project?" -> risk escalation system before passive acceptance.
- "Do we have a playbook for this?" -> playbook system before improvising.
- "Give me the right prompt for this task." -> prompt library before ad hoc AI requests.
- "What should we remember about this project?" -> project memory system before context drifts.
- "Review this professionally." -> review system before acceptance.
