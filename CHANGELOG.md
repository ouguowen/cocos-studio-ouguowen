# Changelog

All notable changes to `cocos-studio-ouguowen` will be documented in this file.

## Unreleased

### Added

- Added open-source polish docs: `CONTRIBUTING.md`, `SECURITY.md`, `docs/quickstart-first-mvp.md`, `docs/open-source-roadmap.md`, and `examples/moonlight-delivery/README.md`.
- Added a Moonlight Delivery example entry that frames the case as pipeline proof, not the only game type.
- Added first MVP success pipeline based on Moonlight Delivery Chapter 1 Shell.
- Added `FIRST_MVP_SUCCESS_PIPELINE.md` for the command chain from brief to `FIRST_MVP_ACCEPTED`.
- Added `COCOS_DEV_STORY_PREWRITE_PROTOCOL.md` for `cocos-dev-story` pre-write approval.
- Added `COCOS_GENERATED_META_POLICY.md` for Cocos-generated companion meta review and approval.
- Added `MVP_ACCEPTANCE_REPORT_TEMPLATE.md` for first MVP release acceptance reports.
- Added `SUCCESS_CASE_MOONLIGHT_DELIVERY.md` as a successful pipeline case without making story games the only template.
- Added `cocos-asset-policy`, `cocos-first-implementation-story`, `cocos-dev-story-prewrite`, `cocos-qa-review`, and `cocos-release-review` command definitions.
- Added Pre-write Approval Gate, Cocos Generated Meta Gate, QA Review Gate, and First MVP Acceptance Gate.
- Added first MVP pipeline success self-test coverage.
- Added `GAME_NUMERICAL_DESIGN.md` for gameplay stats, difficulty, rewards, costs, placeholder values, legal ranges, and balance validation rules.
- Added `cocos-numerical-design` command routing.
- Added `Numerical Design Gate` to `QUALITY_GATES.md`.
- Added `GAME_ECONOMY_DESIGN.md` for currencies, sources, sinks, reward cadence, upgrades, stamina/energy, ads, shops, gacha boundaries, and economy validation rules.
- Added `cocos-economy-design` command routing.
- Added `Economy Design Gate` to `QUALITY_GATES.md`.
- Added `ANIMATION_PRESENTATION_RULES.md` for actor animation states, UI motion, combat feedback, VFX, Spine/Tween/AnimationClip boundaries, and presentation validation.
- Added `cocos-animation-design` command routing.
- Added `Animation Presentation Gate` to `QUALITY_GATES.md`.
- Added `GAME_PRODUCTION_READINESS_GATE.md` for deciding whether Codex may start real implementation, continue design repair, fix runtime readiness, reduce scope, or stop as blocked.
- Added `cocos-production-readiness` command routing.
- Added `Game Production Readiness Gate` to `QUALITY_GATES.md`.
- Added `SKILL_VALIDATION_LOOP.md` for closed-loop QA of the skill itself.
- Added `SKILL_TEST_CASES.md` with repeatable block-path and allow-path self-test cases.
- Added `cocos-skill-self-test` command routing.
- Added `Skill Validation Gate` to `QUALITY_GATES.md`.
- Synchronized `SKILL_VALIDATION_LOOP.md` with the full eight-case Skill self-test set.
- Added command safety, Cocos path scope, write approval, automated checks, resource risk, diff review, runtime proof, Skill change review, and extended safety self-test documents.
- Added `COMMAND_ROUTING_ALIGNMENT.md` as the canonical safety and Agent command routing checklist.
- Added `QUALITY_GATE_ALIGNMENT.md` as the canonical safety and integration gate checklist.

### Changed

- Updated `README.md` to clarify project positioning, installation, core commands, safety model, automation provider stance, and first-MVP path.
- Reworked `README.zh-CN.md` as a readable Chinese beginner entry with installation, MVP path, command list, safety model, and Moonlight Delivery case links.
- Updated `MODULE_INDEX.md` with open-source docs, contribution/security docs, first-MVP quickstart, roadmap, and Moonlight Delivery example entry.
- Updated command routing and quality gates for QA/release closure.
- Updated runtime proof rules so first-MVP browser preview proof must show title/objective/action/result style visibility when applicable.
- Updated write approval and path scope rules so unapproved Cocos-generated `.meta` files require a stop-and-confirm step.
- Updated `QUICK_START.md` with a provider-driven AI Game Studio startup prompt.
- Added a quick check that separates the reusable multi-game-type Skill from the currently selected game type.
- Added a provider-driven proof workflow that treats the current Cocos automation tool/MCP provider as an execution channel.
- Added Preview Visibility Gate routing to `SKILL.md` so script-runtime proof cannot bypass browser-preview visibility.
- Added `Preview Visibility Gate` to `QUALITY_GATES.md`.
- Added `Cocos Preview Visibility Checklist` to `CHECKLISTS.md`.
- Clarified that editor Scene view visibility is not the same as browser runtime visibility.
- Routed balance-sensitive work through numerical design before config or implementation.
- Routed economy-sensitive work through economy design before config or implementation.
- Routed presentation-sensitive work through animation presentation rules before implementation.
- Routed broad game implementation through production readiness before Cocos development.
- Updated `GAME_STUDIO_WORKFLOWS.md` so new-game and MVP workflows include production readiness before implementation.
- Routed skill debugging and closed-loop validation through dedicated self-test cases before any game implementation.
- Aligned `AGENT_REGISTRY.md`, `AGENT_HANDOFF_PROTOCOL.md`, and `AI_GAME_STUDIO_SYSTEM.md` to the planned 12-Agent Cocos Studio structure.
- Expanded `SKILL_EXTENDED_SAFETY_TEST_CASES.md` from the previous partial cases to S01-S08.
- Expanded `SKILL_SELF_TEST_MODES.md` to static, routing, gate, runtime, audit, safety, diff, and agent modes.
- Updated `MODULE_INDEX.md` to index safety, audit, runtime, diff, Agent, and alignment files.
- Updated `SKILL_INTEGRATION_AUDIT_REPORT.md` with the second-pass alignment decision.

## v0.3.0-alpha.7 - 2026-06-23

### Changed

- Clarified that the skill is a multi-game-type Cocos Creator 3.8.8 AI Game Studio, not a single attack-defense game template.
- Clarified that the modern city attack-defense pack is the first example pack and validation sample, not the user's fixed only game direction.
- Added provider-neutral Cocos automation policy to `SKILL.md` without binding the skill to one commercial MCP provider or a future official provider.
- Added command-level automation provider rules to `COMMANDS.md` for local Cocos execution proof.
- Clarified in `AI_GAME_STUDIO_SYSTEM.md` that automation tools/MCP providers are execution channels, not the identity of the skill.
- Updated `package.json` version to `0.3.0-alpha.7`.

### Still not included

- A provider-specific MCP protocol layer.
- A hard dependency on any one Cocos automation plugin.
- Cocos2d-x guidance.
- Multi-engine support.
