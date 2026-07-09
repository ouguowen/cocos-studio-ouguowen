# SKILL AI Game Studio Appendix

Add this appendix to `SKILL.md` when you want the skill entrypoint to route AI Game Studio requests.

## Routing files

When the user asks for AI Game Studio mode, load these files in order:

1. `AI_GAME_STUDIO_SYSTEM.md`
2. `COMMANDS.md`
3. `AGENT_REGISTRY.md`
4. `AGENT_MESSAGE_SCHEMA.md`
5. `AGENT_HANDOFF_PROTOCOL.md`
6. `GAME_STUDIO_WORKFLOWS.md`
7. `AGENT_AUDIT_LOG.md`

## Command routing

- `cocos-game-brief`: use `COMMANDS.md`, `TEMPLATES.md`, and `PROJECT_MEMORY_SYSTEM.md`
- `cocos-classify-game`: use `GAME_CLASSIFIER_SYSTEM.md` and `GAME_TYPE_TEMPLATES.md`
- `cocos-gdd`: use `PRD_CONSTRAINTS.md`, `GAME_TYPE_TEMPLATES.md`, and `TEMPLATES.md`
- `cocos-project-context`: use `PROJECT_MEMORY_SYSTEM.md`
- `cocos-game-architecture`: use `COCOS_RULES.md`, `PROJECT_STRUCTURE.md`, and `LEVEL_SYSTEM_ARCHITECTURE.md`
- `cocos-config-schema`: use `LEVEL_CONFIG_SCHEMAS.md` and `LEVEL_CONFIG_SCHEMA_EXTENSIONS.md`
- `cocos-create-story`: use `TASK_DECOMPOSITION_RULES.md` and `COMMANDS.md`
- `cocos-dev-story`: use `CHOICE_EXECUTION_PROTOCOL.md` and `SEQUENTIAL_GATE_PROTOCOL.md`
- `cocos-code-review`: use `REVIEW_SYSTEM.md`, `QUALITY_GATES.md`, and `templates/checklists/core.md`
- `cocos-quick-prototype`: use `MVP_PROTOTYPE_RULES.md` and `QUALITY_GATES.md`

## Operating guardrails

- Planning, implementation, and approval should be separated through named roles and review gates.
- Idea-to-code work should pass through classification and MVP truth first.
- MVP mode should stay small unless the user explicitly expands the scope.
- Suggested validation and executed validation should be reported separately.
