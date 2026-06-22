# Changelog

All notable changes to `cocos-studio-ouguowen` will be documented in this file.

## v0.3.0-alpha.6 - 2026-06-22

### Added

- Added local Cocos execution package.
- Added Windows local execution steps.
- Added local Cocos project creation checklist.
- Added guide for what evidence to send back to AI.
- Added editor proof report template.
- Added blocker troubleshooting guide.

### Changed

- Simplified example pack README into grouped reading sections.
- Updated `package.json` version to `0.3.0-alpha.6`.

### Still not included

- Actual local Cocos Creator execution by the assistant.
- Verified editor screenshots.
- Filled proof report from a real local editor run.

## v0.3.0-alpha.5 - 2026-06-22

### Added

- Added local Codex handoff prompt for creating or updating a Cocos Creator project from the example pack.
- Added reference stub copy checklist.
- Added Cocos editor run validation log template.
- Added scene screenshot proof list.
- Added demo skeleton limitations document.

### Changed

- Updated the example pack README to include demo productionization reading steps.
- Updated `package.json` version to `0.3.0-alpha.5`.

### Still not included

- A verified Cocos Editor run.
- Actual proof screenshots.
- Real `.scene` and `.prefab` files created inside Cocos Creator.

## v0.3.0-alpha.4 - 2026-06-22

### Added

- Added Cocos demo skeleton documentation folder.
- Added target Cocos project structure guide.
- Added scripts placement guide.
- Added prefabs placement guide.
- Added scene assembly checklist.
- Added runnable demo QA gate.
- Added skeleton `.gitkeep` placeholders for scenes, scripts, prefabs, and config folders.

### Changed

- Updated the example pack README to include the demo skeleton reading steps.
- Updated `package.json` version to `0.3.0-alpha.4`.

### Still not included

- A fully created Cocos Creator project.
- Real `.scene` and `.prefab` assets created inside Cocos Creator.
- Verified runtime execution inside the Cocos editor.

## v0.3.0-alpha.3 - 2026-06-22

### Added

- Added Cocos Creator 3.8.8 setup guide for the Attack Defense City example pack.
- Added scene-node checklist.
- Added placeholder prefab rules.
- Added first playable QA checklist.

### Changed

- Updated the example pack README to include the Cocos setup guide reading steps.
- Updated `package.json` version to `0.3.0-alpha.3`.

### Still not included

- A directly importable Cocos Creator project.
- Real Cocos scene and prefab files.
- Production-ready runtime implementation.

## v0.3.0-alpha.2 - 2026-06-22

### Added

- Added Cocos reference stub folder for the Attack Defense City example pack.
- Added `MapPointComponent.ts` reference stub.
- Added `MapPointRegistry.ts` reference stub.
- Added `EnemyPrefabRegistry.ts` reference stub.
- Added `LevelRuntimeFacade.ts` reference stub.
- Added `AttackDefenseCityBootstrap.ts` reference stub.

### Changed

- Updated the example pack README to include the Cocos reference stub reading step.

### Still not included

- A directly importable Cocos Creator project.
- Real Cocos scene and prefab files.
- Production-ready runtime implementation.

## v0.3.0-alpha.1 - 2026-06-22

### Added

- Added Attack Defense City example pack foundation.
- Added example pack design brief, Mini GDD, and acceptance criteria.
- Added Cocos config-to-runtime mapping guide.
- Added Cocos scene and prefab binding guide.
- Added full Agent handoff chain example.
- Added quick prototype transcript example.
- Added PASS / FAIL validation examples.
- Added scoped Cocos Dev Story task cards.
- Added Cocos Dev Story issue template.

### Changed

- Clarified that `examples/attack-defense-city` is a modern city attack-defense example pack, not the user's fixed final game direction.
- Updated Quick Start to use example-pack wording.
- Updated `package.json` version to `0.3.0-alpha.1`.
- Updated `npm run check` to include TypeScript config type generation.
- Simplified GitHub Actions validation triggers.
- Ignored generated example artifacts in `.gitignore`.

### Still not included

- A directly importable Cocos Creator project.
- Real Cocos scene and prefab files.
- Runtime wiring code for the example pack.

## v0.2.0 - 2026-06-22

### Added

- Added AI Game Studio system model based on `AI Agent + Workflow + Knowledge`.
- Added command registry for repeatable Cocos AI Game Studio workflows.
- Added Agent registry for `cocos-producer`, `cocos-game-designer`, `cocos-architect`, `cocos-dev`, `cocos-qa`, and `cocos-solo-dev`.
- Added Agent handoff message schema.
- Added Agent handoff protocol.
- Added Agent audit log template.
- Added Game Studio workflow definitions.
- Added beginner `QUICK_START.md`.
- Added `package.json` with validation scripts.
- Added GitHub Actions validation workflow.
- Added modern city attack-defense example level config.

### Changed

- Updated `README.md` to document AI Game Studio Mode.
- Updated `SKILL.md` to route AI Game Studio, multi-Agent, command workflow, and handoff requests through the new system files.

### Validation

- GitHub Actions workflow `Validate Cocos Studio Skill` passed on the v0.2.0 PR branch before merge.

## v0.1.x - Before 2026-06-22

### Existing foundation

- Cocos Creator 3.8.8 production-system skill.
- Game classification and MVP scope discipline.
- Production mode and stage control.
- Role ownership and approval boundaries.
- Cocos project structure and runtime architecture rules.
- Level data models and config-table discipline.
- Quality gates, checklists, review system, release/rollback, and AI collaboration rules.
