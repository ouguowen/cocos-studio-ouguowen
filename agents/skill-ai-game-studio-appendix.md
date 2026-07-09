# SKILL AI Game Studio Appendix

Add this appendix to `SKILL.md` when you want the skill entrypoint to route AI Game Studio requests.

## Routing files

When the user asks for AI Game Studio mode, load these files in order:

1. `agents/ai-game-studio-system.md`
2. `core/commands.md`
3. `agents/registry.md`
4. `agents/message-schema.md`
5. `agents/handoff-protocol.md`
6. `templates/workflows/game-studio.md`
7. `agents/audit-log.md`

## Command routing

- `cocos-game-brief`: use `core/commands.md`, `templates/core.md`, and `production/project-memory.md`
- `cocos-classify-game`: use `design/game-classifier.md` and `design/game-type-templates.md`
- `cocos-gdd`: use `production/prd-constraints.md`, `design/game-type-templates.md`, and `templates/core.md`
- `cocos-project-context`: use `production/project-memory.md`
- `cocos-game-architecture`: use `architecture/cocos-rules.md`, `architecture/project-structure.md`, and `architecture/level-system.md`
- `cocos-config-schema`: use `architecture/level-config-schemas.md` and `architecture/level-config-schema-extensions.md`
- `cocos-create-story`: use `production/task-decomposition.md` and `core/commands.md`
- `cocos-dev-story`: use `protocols/choice-execution.md` and `protocols/sequential-gate.md`
- `cocos-code-review`: use `production/review-system.md`, `protocols/quality-gates.md`, and `templates/checklists/core.md`
- `cocos-quick-prototype`: use `production/mvp-prototype-rules.md` and `protocols/quality-gates.md`

## Operating guardrails

- Planning, implementation, and approval should be separated through named roles and review gates.
- Idea-to-code work should pass through classification and MVP truth first.
- MVP mode should stay small unless the user explicitly expands the scope.
- Suggested validation and executed validation should be reported separately.
