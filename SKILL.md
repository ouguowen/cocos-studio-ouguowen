---
name: cocos-studio-ouguowen
description: Provides a senior-level production system for Cocos Creator 3.x games, covering production modes, stage gates, role boundaries, asset ownership, project structure, level data models, CSV or sheet config schemas, runtime architecture, and quality discipline. Use when planning, prototyping, structuring, staffing, reviewing, rescuing, or scaling a Cocos Creator 3.x game, especially for solo studios, level-heavy projects, content pipelines, config-table design, anti-chaos refactors, or strict workflow control instead of ad hoc development.
---

# Cocos Studio Ouguowen

Use this skill as the operating system for a Cocos Creator 3.x game project.

## Core stance

- Assume a senior team standard only.
- Do not recommend "write first, organize later".
- Do not allow undefined ownership, vague stage status, or unreviewed architecture drift.
- Treat a solo developer as a multi-role studio, not as a role-less workflow.

## Default execution order

1. Identify the current production mode before giving process advice. See [PRODUCTION_MODES.md](PRODUCTION_MODES.md).
2. Identify the current production stage. See [STAGES.md](STAGES.md).
3. Identify the primary responsible role for the request. See [ROLES.md](ROLES.md).
   For stage-by-stage execution detail, see [ROLE_STAGE_MATRIX.md](ROLE_STAGE_MATRIX.md).
4. Identify the affected assets and ownership rules. See [OWNERSHIP.md](OWNERSHIP.md).
5. Apply Cocos Creator 3.x engineering and architecture rules. See [COCOS_RULES.md](COCOS_RULES.md).
   For the default project blueprint, see [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md).
6. If level, content, wave, map, room, puzzle, quest, or procedural data is involved, choose the correct level data model. See [LEVEL_DATA_MODELS.md](LEVEL_DATA_MODELS.md).
   For concrete CSV/table fields, see [LEVEL_CONFIG_SCHEMAS.md](LEVEL_CONFIG_SCHEMAS.md).
   For Cocos runtime implementation boundaries, see [LEVEL_SYSTEM_ARCHITECTURE.md](LEVEL_SYSTEM_ARCHITECTURE.md).
   If the user wants table validation, use `scripts/validate-level-config.js` against the level-data directory.
   If the user wants runtime-ready generated JSON, use `scripts/export-level-config.js`.
   If the user wants generated `ConfigTypes.ts`, use `scripts/export-level-types.js`.
   If the user wants a ready integration skeleton for `ConfigIndex.ts` and `ConfigManager.ts`, reuse `assets/cocos-config-runtime-template/`.
   If the user wants a level runtime skeleton for `LevelTypes.ts`, `LevelRuntime.ts`, or `LevelBuilder.ts`, reuse `assets/cocos-level-runtime-template/`.
   If the user wants wave, spawn, or objective system skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants reward flow or top-level level orchestration skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants map-point bridge or enemy creation bridge skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants enemy actor lifecycle or stable resource-manifest skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants event-bus, object-pool, or resource-loader skeletons for Cocos runtime infrastructure, reuse `assets/cocos-level-runtime-template/`.
   If the user wants meta progression, level result persistence, or reward grant pipeline skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants save repository, snapshot codec, chapter unlock policy, or guide progression skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants currency wallet, inventory, shop purchase, quest tracker, or activity-state skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants character growth, equipment loadout, stat aggregation, drop-table, or gacha skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants rewarded-ad, IAP catalog, order ledger, or monetization fulfillment skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants remote-config, feature-flag, experiment, or hotfix-control skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants analytics, telemetry, session tracking, funnel tracking, or dispatch pipeline skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants friend, leaderboard, guild, mailbox, or notification skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants support-ticket, player-report, moderation, risk-flag, or consent skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants offline-cache, sync-queue, retry-policy, purchase-recovery, or server-sync skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants server-contract, sync-snapshot, sync-snapshot-codec, or conflict-resolution skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants auth-session, account-binding, cloud-save-manifest, cloud-save-merge, or cloud-save-sync skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants announcement-board, event-calendar, daily-check-in, mail-reward-delivery, or environment-switchboard skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants compensation-grant, appeal-case, ops-command, GM-permission, or gray-release skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants battle-replay, anti-cheat-evidence, crash-recovery, analytics-audit, or version-migration skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants localization, sensitive-word-filter, onboarding-flow, tutorial-scenario, or experiment-control skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants audio-bus, motion-sequence, accessibility-profile, device-tier, or asset-bundle-partition skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants reconnect, heartbeat, matchmaking, PVP-settlement-guard, or bot-backfill skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants payment-risk, ban-enforcement, social-relationship-graph, squad-season, or metrics-schema-contract skeletons, reuse `assets/cocos-level-runtime-template/`.
   If the user wants new-user-purchase-funnel, recall-campaign, ad-monetization-experiment, UGC-moderation, or support-SLA skeletons, reuse `assets/cocos-level-runtime-template/`.
   When changing runtime templates, validate them with `scripts/validate-runtime-template.js`.
7. Check stage gates and quality gates before approving work. See [QUALITY_GATES.md](QUALITY_GATES.md).
   For execution checklists, see [CHECKLISTS.md](CHECKLISTS.md).
8. Follow the execution pattern for the situation. See [WORKFLOWS.md](WORKFLOWS.md).
9. If the user needs an applied pattern, use [EXAMPLES.md](EXAMPLES.md).
10. If the user needs concrete project artifacts, use [TEMPLATES.md](TEMPLATES.md).
11. If the user is writing or reviewing PRDs, use [PRD_CONSTRAINTS.md](PRD_CONSTRAINTS.md).
12. If the user is breaking work into production tasks, use [TASK_DECOMPOSITION_RULES.md](TASK_DECOMPOSITION_RULES.md).
13. If the user needs acceptance proof or QA evidence, use [ACCEPTANCE_ARTIFACTS.md](ACCEPTANCE_ARTIFACTS.md).
14. If the user needs test coverage planning, use [TEST_MATRIX.md](TEST_MATRIX.md).
15. If the user needs rollout or rollback discipline, use [RELEASE_ROLLBACK_PLAYBOOK.md](RELEASE_ROLLBACK_PLAYBOOK.md).
16. If the user needs debt tracking, use [TECH_DEBT_REGISTER.md](TECH_DEBT_REGISTER.md).
17. If the user needs incident review, use [INCIDENT_POSTMORTEM_TEMPLATE.md](INCIDENT_POSTMORTEM_TEMPLATE.md).
18. If the user needs cost control, use [COST_BUDGET_MODEL.md](COST_BUDGET_MODEL.md).
19. If the user needs external vendor rules, use [OUTSOURCING_COLLAB_RULES.md](OUTSOURCING_COLLAB_RULES.md).
20. If the user needs milestone convergence tracking, use [MILESTONE_BURNDOWN_RULES.md](MILESTONE_BURNDOWN_RULES.md).

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

- "How should we start this game?" -> stage selection, role kickoff, first deliverables.
- "We need a fast prototype but do not want chaos." -> production mode selection before architecture advice.
- "Our project is getting messy." -> ownership audit, architecture audit, missing gates.
- "Who should own this asset?" -> ownership lookup and approval path.
- "Build the Cocos structure." -> apply the Cocos rules and stage constraints.
- "Can we ship this?" -> quality gate and release gate review.
- "How should levels be configured?" -> level data model selection before table design.
- "What fields should the level CSVs use?" -> level config schema reference.
- "Check these CSV tables." -> run the level config validator, then report owner and fix path.
- "How should the level system be coded?" -> level system architecture before implementation.
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
