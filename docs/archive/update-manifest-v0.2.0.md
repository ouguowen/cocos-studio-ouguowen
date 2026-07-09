# Cocos AI Game Studio Update v0.2.0

This update upgrades `cocos-studio-ouguowen` from a production-system skill into a clearer AI Game Studio workflow package.

## Additive files

Copy these files into the repository root:

- `AI_GAME_STUDIO_SYSTEM.md`
- `COMMANDS.md`
- `AGENT_REGISTRY.md`
- `AGENT_MESSAGE_SCHEMA.md`
- `AGENT_HANDOFF_PROTOCOL.md`
- `AGENT_AUDIT_LOG.md`
- `templates/workflows/game-studio.md`
- `QUICK_START.md`
- `package.json`
- `README_AGENT_WORKFLOW_SECTION.md`
- `SKILL_APPENDIX_PATCH.md`
- `agents/game-studio/*.yaml`
- `examples/attack-defense-city/level-config/*.csv`
- `examples/attack-defense-city/README.md`

## Intended result

After applying this update, the skill should support:

1. Agent roles
2. Workflow commands
3. Handoff messages
4. Audit logs
5. A beginner-friendly attack-defense example
6. NPM scripts for config validation and runtime template checks

## Safe application rule

This package is mostly additive. If your repository already has a file with the same name, compare before overwriting.
