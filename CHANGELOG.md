# Changelog

All notable changes to `cocos-studio-ouguowen` will be documented in this file.

## Unreleased

### Added

- Added `docs/structure/repository-structure-plan.md` for staged repository organization without moving current canonical paths.
- Added `design/asset-policy.md` for placeholder, external, generated, and Cocos asset approval boundaries.
- Added context loading behavior test cases for `FAST_CONTEXT`, `GATE_CONTEXT`, `AUDIT_CONTEXT`, `CONTEXT_OVERLOAD`, and `REDUCE_CONTEXT`.
- Added a side-effect-free generated artifact check for package validation.
- Added `core/context-loading-policy.md` to define context budgets, trigger-based loading, and anti-overload rules.
- Added `core/context-summary.md` as the lightweight first-read memory for normal development sessions.
- Added `core/operation-modes.md` to define Fast Build Mode, Safe Gate Mode, and Audit Mode.
- Added Developer Experience Gate and Interruption Budget Gate.
- Added UI-Character-Action linkage system.
- Added `design/character-system.md` as the unified character behavior/action/skeleton boundary.
- Added GitHub issue templates for bug reports, feature requests, safety reports, documentation requests, and issue routing config.
- Added `.github/pull_request_template.md` with scope, safety, validation, and release-impact checks.
- Added `docs/release/strategy.md` and `docs/release/checklist.md` for open-source release planning and release readiness review.
- Added GitHub Actions Skill Docs Validation workflow.
- Added `scripts/validate_skill_docs.py` for required docs, links, command routing, and safety regression checks.
- Added automation validation documentation.
- Added open-source polish docs: `CONTRIBUTING.md`, `SECURITY.md`, `docs/quickstart/first-mvp.md`, `docs/open-source/roadmap.md`, and `examples/moonlight-delivery/README.md`.
- Added a Moonlight Delivery example entry that frames the case as pipeline proof, not the only game type.
- Added first MVP success pipeline based on Moonlight Delivery Chapter 1 Shell.
- Added `production/first-mvp-success-pipeline.md` for the command chain from brief to `FIRST_MVP_ACCEPTED`.
- Added `protocols/cocos-dev-story-prewrite.md` for `cocos-dev-story` pre-write approval.
- Added `protocols/cocos-generated-meta.md` for Cocos-generated companion meta review and approval.
- Added `templates/reports/mvp-acceptance.md` for first MVP release acceptance reports.
- Added `docs/success-cases/moonlight-delivery.md` as a successful pipeline case without making story games the only template.
- Added `cocos-asset-policy`, `cocos-first-implementation-story`, `cocos-dev-story-prewrite`, `cocos-qa-review`, and `cocos-release-review` command definitions.
- Added Pre-write Approval Gate, Cocos Generated Meta Gate, QA Review Gate, and First MVP Acceptance Gate.
- Added first MVP pipeline success self-test coverage.
- Added `design/numerical-design.md` for gameplay stats, difficulty, rewards, costs, placeholder values, legal ranges, and balance validation rules.
- Added `cocos-numerical-design` command routing.
- Added `Numerical Design Gate` to `protocols/quality-gates.md`.
- Added `design/economy-design.md` for currencies, sources, sinks, reward cadence, upgrades, stamina/energy, ads, shops, gacha boundaries, and economy validation rules.
- Added `cocos-economy-design` command routing.
- Added `Economy Design Gate` to `protocols/quality-gates.md`.
- Added `design/animation-presentation.md` for actor animation states, UI motion, combat feedback, VFX, Spine/Tween/AnimationClip boundaries, and presentation validation.
- Added `cocos-animation-design` command routing.
- Added `Animation Presentation Gate` to `protocols/quality-gates.md`.
- Added `production/game-readiness-gate.md` for deciding whether Codex may start real implementation, continue design repair, fix runtime readiness, reduce scope, or stop as blocked.
- Added `cocos-production-readiness` command routing.
- Added `Game Production Readiness Gate` to `protocols/quality-gates.md`.
- Added `protocols/skill-validation-loop.md` for closed-loop QA of the skill itself.
- Added `protocols/skill-test-cases.md` with repeatable block-path and allow-path self-test cases.
- Added `cocos-skill-self-test` command routing.
- Added `Skill Validation Gate` to `protocols/quality-gates.md`.
- Synchronized `protocols/skill-validation-loop.md` with the full eight-case Skill self-test set.
- Added command safety, Cocos path scope, write approval, automated checks, resource risk, diff review, runtime proof, Skill change review, and extended safety self-test documents.
- Added `protocols/command-routing-alignment.md` as the canonical safety and Agent command routing checklist.
- Added `protocols/quality-gate-alignment.md` as the canonical safety and integration gate checklist.

### Changed

- Migrated Agent system docs, execution-chain protocols, first-MVP pipeline, success case, test matrix, version roadmap, and repository structure plan into organized folders.
- Migrated context loading, operation mode, command routing, and module index documents into `core/`.
- Migrated reusable templates, level templates, workflow templates, and prompt patterns into `templates/`.
- Migrated Cocos baseline, project structure, level-system, config schema, and runtime template routing documents into `architecture/`.
- Migrated game design, numerical, economy, animation, asset, character, and UI boundary documents into `design/`.
- Migrated production, release, role, ownership, planning, risk, and operations documents into `production/`.
- Migrated safety, validation, audit, runtime proof, diff review, and quality gate documents into `protocols/`.
- Migrated write approval, dev-story pre-write, and generated meta protocols into `protocols/`.
- Migrated quick start, general examples, project roadmap, and historical update drafts into `docs/quickstart/`, `docs/examples/`, `docs/open-source/`, and `docs/archive/`.
- Migrated checklist and report templates into `templates/checklists/` and `templates/reports/`.
- Migrated quickstart and automation validation docs into `docs/quickstart/` and `docs/validation/`.
- Migrated local proof runbooks into `docs/proof/`.
- Migrated open-source roadmap and release docs into staged `docs/open-source/` and `docs/release/` folders.
- Updated `core/module-index.md` and docs validation coverage to include the repository structure plan.
- Updated `npm run check` so it validates generated artifacts through a temporary directory instead of writing repository outputs.
- Updated `scripts/validate_skill_docs.py` to require `design/asset-policy.md`, remove the deferred asset-policy link exception, and merge duplicate pre-write safety checks.
- Integrated context loading policy and lightweight context summary into Skill routing, module index, and validation checks.
- Updated context guidance so normal development starts with a lightweight summary and expands only by trigger.
- Updated cocos-dev-story workflow so implementation after approved pre-write scope runs in Fast Build Mode.
- Updated write approval and runtime proof protocols to avoid repeated confirmation and repeated proof reports during normal development.
- Updated validation script to enforce operation mode rules.
- Updated UI, character animation, and asset semantic models with ownership and linkage rules.
- Updated command routing, quality gates, module index, and validation script for semantic linkage checks.
- Fixed Issue Template contact links to point to SECURITY.md, CONTRIBUTING.md, and first-MVP quickstart.
- Updated validation script to reject generic GitHub contact links in issue template config.
- Updated README, README.zh-CN, CONTRIBUTING, MODULE_INDEX, and automation validation docs with collaboration template and release strategy links.
- Updated `scripts/validate_skill_docs.py` to require the collaboration templates, release strategy, and release checklist.
- Updated README, Chinese README, MODULE_INDEX, and CONTRIBUTING with validation guidance.
- Updated `README.md` to clarify project positioning, installation, core commands, safety model, automation provider stance, and first-MVP path.
- Reworked `README.zh-CN.md` as a readable Chinese beginner entry with installation, MVP path, command list, safety model, and Moonlight Delivery case links.
- Updated `core/module-index.md` with open-source docs, contribution/security docs, first-MVP quickstart, roadmap, and Moonlight Delivery example entry.
- Updated command routing and quality gates for QA/release closure.
- Updated runtime proof rules so first-MVP browser preview proof must show title/objective/action/result style visibility when applicable.
- Updated write approval and path scope rules so unapproved Cocos-generated `.meta` files require a stop-and-confirm step.
- Updated `docs/quickstart/general.md` with a provider-driven AI Game Studio startup prompt.
- Added a quick check that separates the reusable multi-game-type Skill from the currently selected game type.
- Added a provider-driven proof workflow that treats the current Cocos automation tool/MCP provider as an execution channel.
- Added Preview Visibility Gate routing to `SKILL.md` so script-runtime proof cannot bypass browser-preview visibility.
- Added `Preview Visibility Gate` to `protocols/quality-gates.md`.
- Added `Cocos Preview Visibility Checklist` to `templates/checklists/core.md`.
- Clarified that editor Scene view visibility is not the same as browser runtime visibility.
- Routed balance-sensitive work through numerical design before config or implementation.
- Routed economy-sensitive work through economy design before config or implementation.
- Routed presentation-sensitive work through animation presentation rules before implementation.
- Routed broad game implementation through production readiness before Cocos development.
- Updated `templates/workflows/game-studio.md` so new-game and MVP workflows include production readiness before implementation.
- Routed skill debugging and closed-loop validation through dedicated self-test cases before any game implementation.
- Aligned `agents/registry.md`, `agents/handoff-protocol.md`, and `agents/ai-game-studio-system.md` to the planned 12-Agent Cocos Studio structure.
- Expanded `protocols/skill-extended-safety-test-cases.md` from the previous partial cases to S01-S08.
- Expanded `protocols/skill-self-test-modes.md` to static, routing, gate, runtime, audit, safety, diff, and agent modes.
- Updated `core/module-index.md` to index safety, audit, runtime, diff, Agent, and alignment files.
- Updated `protocols/skill-integration-audit-report.md` with the second-pass alignment decision.

## v0.3.0-alpha.7 - 2026-06-23

### Changed
