# Changelog

All notable changes to `cocos-studio-ouguowen` will be documented in this file.

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
